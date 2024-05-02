import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { mainLoadAction } from '../store/mainloading/mainload.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private store: Store,private http: HttpClient) { }

  getAppliedJobs(){
    this.store.dispatch(mainLoadAction({status: true}))
    const fetchUrl = environment.appliedUrl
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('cur_token'))}`
    })
    return this.http.get(fetchUrl,{headers})
}

 getApplied(){
    this.getAppliedJobs()
 }

  withDraw(applicationId: string){
    const withDrawUrl = `${environment.withDrawUrl}/${applicationId}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('cur_token'))}`
    })
    return this.http.delete(withDrawUrl,{headers})
    
  }
}
