
import { apply } from '../store/apply/apply.reducer';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FetchService } from '../services/fetch.service';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-each-applied',
  templateUrl: './each-applied.component.html',
  styleUrls: ['./each-applied.component.scss']
})
export class EachAppliedComponent {

  APPLICATION_STATUS = {
    1: 'Pending',
    2: 'Accepted',
    0: 'Rejected',
  }

  @Output() delete : EventEmitter<string> = new EventEmitter();
  
  @Input('eachJob') appliedJobs: any = {};

  @Input('isFreelance') isFreelance: boolean;

  applicationStatus: number | null = null;
  constructor(private router: Router){

  }
  ngOnInit(){
    this.applicationStatus = this.APPLICATION_STATUS[this.appliedJobs.status]
  }

  withDraw(){
      this.delete.emit(this.appliedJobs.applicationId)
  }  

  view(jobId: string){
    this.router.navigateByUrl('/view/'+this.appliedJobs.jobData.id)
  }

}
