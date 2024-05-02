import { Component, Input } from '@angular/core';
import { FetchService } from '../services/fetch.service';
import { Subscription, catchError, map, of } from 'rxjs';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { isMainLoading } from '../store/mainloading/mainload.selector'
import { mainLoadAction } from '../store/mainloading/mainload.actions';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-applied',
  templateUrl: './applied.component.html',
  styleUrls: ['./applied.component.scss']
})

export class AppliedComponent {
   allApplied: any=[]
   isMainLoading: boolean | null = true
   loadingSubcription: Subscription;

   @Input('jobs') jobStreetJobs: any;

  constructor(private fetch: FetchService, private store: Store,private router: Router,
    private messageService: MessageService){}
    ngOnInit(){
      this.loadingSubcription = this.store.select(isMainLoading).subscribe(data => {
          this.isMainLoading = data
          console.log("In applied",this.isMainLoading)
      })
      console.log(this.jobStreetJobs)
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
              this.allApplied = this.allApplied.filter((job:any) => job.applicationId !== applicationId)
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

    ngOnDestroy(){
      if(this.loadingSubcription){
        this.loadingSubcription.unsubscribe()
      }
    }
}
