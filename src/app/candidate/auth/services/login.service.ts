import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = environment.loginUrl

  constructor(private http: HttpClient) { 

  }

  login(username:string,password: string){
    const loginObj = {
      username,
      password
    }
    this.http.post(this.url, loginObj).subscribe(
      (data) => {
        const token = data 
        localStorage.setItem('token', JSON.stringify(token))
      },
      (error) => {
        console.log(error);
      }
    )
  }

  signUp(signUpDetails: any){
    const signUpUrl = environment.signUpUrl
    return this.http.post(signUpUrl,signUpDetails)
  }

  forgot(email: string){
    const forgotUrl = environment.forgotUrl
     return this.http.post(forgotUrl,{email});
  }
}
