import { loading } from '../store/loginLoading/loading.selector';
import { actionState, loadingAction } from '../store/loginLoading/loading.action';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth/auth.action'
import {MessageService} from 'primeng/api'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
// import { actionState } from '../state/loading/loading.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginLeft: string = '50px';
  signupLeft: string = '450px';
  buttonLeft: string = '0px';
  username: string = "";
  password: string = "";
  signUpForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  isShow: boolean = false;
  isLoading: boolean | null = null;

  toggleShow(){
    this.isShow =!this.isShow;
  }

  constructor(private http: HttpClient,private store: Store,private loginService: LoginService , private messageService : MessageService){
    this.signUpForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      acceptTerms: new FormControl(false,[Validators.requiredTrue]),
      confirm: new FormControl('',[Validators.required])

    });
  }

  ngOnInit(){
    this.store.select(loading).subscribe((res) => {
      // console.log(res)
      this.isLoading = res 
      // console.log(this.isLoading)
    })
  }
  signup(): void {
    this.loginLeft = '-400px';  
    this.signupLeft = '50px';   
    this.buttonLeft = '110px';  
  }

  login(): void {
    this.loginLeft = '50px';   
    this.signupLeft = '450px'; 
    this.buttonLeft = '0px'; 
  }

  loginObj:any = {
    username: this.username,
    password: this.password,
  }
  onLogin(){
    this.store.dispatch(loadingAction({status: true}))
    this.store.dispatch(AuthActions.loginRequest({username: this.username,password: this.password}))
    this.username = ''
    this.password = ''
    // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successful' });
  }

  get f(){return this.signUpForm.controls}
  onSignUp(){
    this.submitted = true;
    if(this.signUpForm.invalid){
      return;
    }
    const signUpDetails = {
      username: this.signUpForm.controls['username'].value,
      email: this.signUpForm.controls['email'].value,
      password: this.signUpForm.controls['password'].value,
      confirm: this.signUpForm.controls['confirm'].value
      // acceptTerms: this.signUpForm.controls.acceptTerms.value,
    }


    this.store.dispatch(loadingAction({status: true}))
    this.loginService.signUp(signUpDetails).pipe(map((res:any) => res)).subscribe((res) => {
      setTimeout(() => {
        this.store.dispatch(loadingAction({status: false}))
      },500)
      if(res['alreadyExists'] === true){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User already exists' });
        return;
      }
      if(res['mailExists']===true){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email already exists' });
        return;
      }
      this.messageService.add({ severity:'success', summary: 'Success', detail: 'Signup Successful' });
      return;
    })
    this.onReset()
  }

  onReset(){
    this.signUpForm.reset()
    this.submitted = false;
  }
}
