import { Injectable } from '@angular/core';
import {data} from '../../../../../data'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }

  getLatestJobs(){
    const latestUrl = environment.latestJobsUrl
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('cur_token'))}`
    })
    return this.http.get(latestUrl,{headers})
  }


  getViewJob(jobId: string){
    const viewUrl = `${environment.viewJobUrl}/${jobId}`
    const mainToken =  environment.mainToken
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${mainToken}`
    })

    return this.http.get(viewUrl,{headers})
    
  }
  getJobsData(){
    return data;
  }
}
