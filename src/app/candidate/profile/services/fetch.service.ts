import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }

  postProfile(username: string,data: any){
    
    const postUrl = `${environment.postProfileUrl}/${username}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('cur_token'))}`
    })
    return this.http.post(postUrl,data,{headers})
  }
}
