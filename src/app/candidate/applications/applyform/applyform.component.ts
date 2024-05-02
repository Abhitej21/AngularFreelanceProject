import { ApplyState, apply } from '../store/apply/apply.reducer';
import { Component, ViewChild } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ApplyActions from '../store/apply/apply.action'
import { Subscription, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applyform',
  templateUrl: './applyform.component.html',
  styleUrls: ['./applyform.component.scss']
})
export class ApplyformComponent {

  isLoading: boolean = true;
  routerSubscription: Subscription;
  applySubscription: Subscription;

  applyForm: any = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    bio: '',
    position: '',
    startdate: '',
    resume: '',
    coverLetter: '',
  }

  constructor(private store: Store<{applyInitialState : ApplyState}>,private router: ActivatedRoute) {

  }
  
  
  ngOnInit(){
    this.applySubscription = this.store.select(apply).subscribe((data:any) => {
      this.isLoading = false
      if(data.prevData===undefined) return

      const res = data.prevData
      this.applyForm = {
        ...this.applyForm,
        firstname: res.firstName,
        lastname: res.lastName,
        email: res.email,
        phone: res.phone,
        bio: res.userBio,
        position: data.jobTitle
        // position: res.position,
      }
    })
    this.routerSubscription = this.router.queryParams.subscribe((params) => {
      this.store.dispatch(ApplyActions.applyRequest({jobId: params['id']}))
    })
  }

  submitForm(){
    
  }

  ngOnDestroy(){
    if(this.routerSubscription){
      this.routerSubscription.unsubscribe()
    }
    if(this.applySubscription){
      this.applySubscription.unsubscribe()
    }
  }
}
