import { Store } from '@ngrx/store';
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from '../auth/auth.action'
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Route, Router } from "@angular/router";
import { MessageService } from 'primeng/api';
import { actionState, loadingAction } from '../loginLoading/loading.action';
import { loading } from '../loginLoading/loading.selector';

@Injectable()
export class AuthEffect{
    actions$ = inject(Actions)
    url = 'http://localhost:8000/login'
    constructor(private http: HttpClient,private route: Router,
        private store: Store,
        private messageService: MessageService){}
    loginRequest$ = createEffect(() => 
        this.actions$.pipe(
        ofType(AuthActions.loginRequest),
            switchMap((action) => {
                const userDetails = {
                    username: action.username,
                    password: action.password
                }
                return this.http.post(this.url,userDetails).pipe(
                    map((data: any) => {
                        console.log(data)
                        
                        this.store.dispatch(loadingAction({status: false}))
                        if(data.userExists === false){
                            this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid Credentials' });
                            return AuthActions.loginFailure({error: data.message})
                        }
                        const res = {
                            username: action.username,
                            message: data.message,
                            token: data.token
                        }
    
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Hurray Login Successful' });
                        return AuthActions.loginSuccess({data: res})
                    }),
                    catchError(error => {
                        this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Unknown Error' });
                        return of(AuthActions.loginFailure({error: error}))
                        }
                    )
                )
            })
        )
    )

    loginSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(({data}) => {
                console.log(data)
                localStorage.setItem('cur_token',JSON.stringify(data.token))
                localStorage.setItem('cur_username',JSON.stringify(data.username))
                // alert(`Login successful, Welcome ${data.username}`)
                setTimeout(() => {
                    this.route.navigate(['/cand/profile/user/Abhiteja21'])
                },2000)
            })
        )
    },{dispatch: false})

    

}