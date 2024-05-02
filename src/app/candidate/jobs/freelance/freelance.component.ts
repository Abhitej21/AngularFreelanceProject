import { FreelanceJob } from './../models/freelanceJob.model';
// import { isMainLoading } from './../state/main-loading/mainload.selector';
import { Store } from '@ngrx/store';
import { FetchService } from './../services/fetch.service';
import { Component } from '@angular/core';
import { Subscription, catchError, map, of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-freelance',
  templateUrl: './freelance.component.html',
  styleUrls: ['./freelance.component.scss']
})
export class FreelanceComponent {

  latestJobs: FreelanceJob[] = [];
  isLatestLoading: boolean = true;
  fetchSubscription: Subscription;

  constructor(private fetch: FetchService, private store: Store,private messageService: MessageService){}

  ngOnInit(){ 

    this.fetchSubscription = this.fetch.getLatestJobs().pipe(map((res) => res),catchError((err) => {
      this.isLatestLoading = false;
      this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message});
      return of([])
    })).subscribe((data: any) => {
      setTimeout(() => {
        this.isLatestLoading = false;
      },2000)
      console.log(data)
      this.latestJobs = data
    })
  }

  ngOnDestroy(){
    if(this.fetchSubscription){
      this.fetchSubscription.unsubscribe()
    }
  }

}
