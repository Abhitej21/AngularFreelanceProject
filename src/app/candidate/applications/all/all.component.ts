import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FetchService } from '../services/fetch.service';
import { Subscription, catchError, map, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { isMainLoading } from '../store/mainloading/mainload.selector';
import { mainLoadAction } from '../store/mainloading/mainload.actions';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent {

  allJobs: any = []
  myJobs: any = [];
  freelanceJobs: any = [];
  isLoading: boolean;
  loadingSubscription: Subscription;

  constructor(private fetch: FetchService,private store: Store,
    private messageService: MessageService,
    private router: Router
    ){}

  ngOnInit(){
    
    this.loadingSubscription = this.store.select(isMainLoading).subscribe((data) => {
      this.isLoading = data

    })
    this.fetch.getAppliedJobs().pipe(map((data: any) => {
      this.store.dispatch(mainLoadAction({status: false}))
      let list = []
      let free = Object.values(data.data)
      let myjobs = Object.values(data.formData)
      for(let job of free){
        list.push(job)
        this.freelanceJobs.push(job)
      }
      for(let job of myjobs){
        list.push(job)
        this.myJobs.push(job)
      }     
      console.log(this.myJobs)
      console.log(list)
      return list 
    }),catchError((err: any) => {
      if(err.error.error === 'jwt expired' || err.error.error === 'jwt malformed'){
        this.messageService.add({severity: 'error', summary: 'Session Expired', detail: 'Unfortunately, the session has expired :-(' })
        localStorage.removeItem('cur_token')
        setTimeout(() => {
          this.router.navigateByUrl('/login')
        },1000)
      }
      return of([])
    })).subscribe(res => {
      this.allJobs = res 
    })
  }

  ngOnDestroy(){
    if(this.loadingSubscription){
      this.loadingSubscription.unsubscribe()
    }
  }
}
