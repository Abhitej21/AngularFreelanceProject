import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { FreelanceComponent } from './freelance/freelance.component';
import { MyJobsComponent } from './myjobs/myjobs.component';
import { JobcardComponent } from './jobcard/jobcard.component';
import { LatesteachComponent } from './latesteach/latesteach.component';
import { AllComponent } from './all/all.component';
import { RouterModule } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewjobComponent } from './viewjob/viewjob.component';
import { SimilarComponent } from './similar/similar.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MyJobsComponent,
    JobcardComponent,
    FreelanceComponent,
    LatesteachComponent,
    JobsComponent,
    AllComponent,
    ViewjobComponent,
    SimilarComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    RouterModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class JobsModule { }
