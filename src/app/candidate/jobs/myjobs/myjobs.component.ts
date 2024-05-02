import { Job } from './../models/job.model';
import { FetchService } from './../services/fetch.service';
import { Component } from '@angular/core';



@Component({
  selector: 'app-myjobs',
  templateUrl: './myjobs.component.html',
  styleUrls: ['./myjobs.component.scss']
})
export class MyJobsComponent {
  allJobs: Job[];
  p: number = 1;
  itemsPerPage: number = 5;
  totalProducts: number;
  isLoading: boolean = true;

  constructor(private fetch: FetchService){

  }
  ngOnInit(){
      
      setTimeout(() => {
        this.allJobs = this.fetch.getJobsData()
        this.isLoading = false
        this.totalProducts = this.allJobs.length;
      },1000)
  }

}
