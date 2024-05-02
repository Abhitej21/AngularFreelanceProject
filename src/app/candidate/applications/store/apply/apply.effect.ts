import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MessageService } from "primeng/api";
import * as ApplyActions from '../apply/apply.action'
import { map, switchMap } from "rxjs";


@Injectable()
export class ApplyEffect{
    actions$ = inject(Actions)
    constructor(private http: HttpClient,private messageService: MessageService,private route: Router){
        
    }
    
    applyRequest$ = createEffect(() => 
         this.actions$.pipe(
            ofType(ApplyActions.applyRequest),
            switchMap((action) => {
                let url = 'http://localhost:8000/apply/'
                let token = localStorage.getItem('cur_token')
                token = JSON.parse(token)
                const headers = new HttpHeaders({
                'authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                }) 
                console.log(token)
                return this.http.get(url+action.jobId,{headers}).pipe(
                    map((data) => {
                        
                        console.log(data)
                        return ApplyActions.applySuccess({data: data})
                    })
                )
                
            })
        )
    )
}   