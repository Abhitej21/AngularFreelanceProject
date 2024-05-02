
import { catchError, map, of } from 'rxjs';
import { FetchService } from '../services/fetch.service';
import { initialState } from './../../auth/store/auth/auth.reducer';
import { Component, Input } from '@angular/core';
import {  MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-freelance',
  templateUrl: './freelance.component.html',
  styleUrls: ['./freelance.component.scss']
})
export class FreelanceComponent {
  isFreelanceLoading: boolean = false;

  @Input('jobs') freelanceJobs: any;
  

  constructor(private fetch: FetchService){}

  ngOnInit(){

  }


  withDraw(applicationId: string){
    Swal.fire({  
      title: 'Withdraw Application',  
      text: 'Are you sure you want to withdraw the application for this Job Post?',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, withdraw',  
      cancelButtonText: 'Cancel'  
    }).then((result) => { 
      if (result.value) { 
        this.fetch.withDraw(applicationId).pipe(map((res) => res)).subscribe((res) => {
          console.log(res['message'])
          if(res["message"]){
            this.freelanceJobs = this.freelanceJobs.filter((job:any) => job.applicationId !== applicationId)
            Swal.fire(  
              'Deleted!',  
              'Your withdrawn has been successful.',  
              'success'  
            )
          }
        }) 
          
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Cancelled',  
          'Your Job Post is Safe :)',  
          'error'  
        )  
      }  
    })  
  }
}
