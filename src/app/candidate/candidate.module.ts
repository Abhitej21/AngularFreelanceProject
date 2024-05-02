import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    SharedModule
  ]
})
export class CandidateModule { }
