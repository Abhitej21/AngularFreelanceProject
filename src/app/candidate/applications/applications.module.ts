import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { AppliedComponent } from './applied/applied.component';
import { AllComponent } from './all/all.component';
import { FreelanceComponent } from './freelance/freelance.component';
import { EachAppliedComponent } from './each-applied/each-applied.component';
import { SharedModule } from 'primeng/api';
import { CandidateModule } from '../candidate.module';
import { StoreModule } from '@ngrx/store';
import { mainLoadReducer } from './store/mainloading/mainload.reducer';
import { ApplyformComponent } from './applyform/applyform.component';
import { applyReducer } from './store/apply/apply.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ApplyEffect } from './store/apply/apply.effect';


@NgModule({
  declarations: [
    ApplicationsComponent,
    AppliedComponent,
    AllComponent,
    FreelanceComponent,
    EachAppliedComponent,
    ApplyformComponent
  ],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    CandidateModule,
    SharedModule,
    StoreModule.forFeature('mainload',mainLoadReducer),
    StoreModule.forFeature('apply',applyReducer),
    EffectsModule.forFeature([ApplyEffect])
  ]
})
export class ApplicationsModule { }
