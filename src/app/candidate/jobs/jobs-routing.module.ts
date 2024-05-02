import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { MyJobsComponent } from './myjobs/myjobs.component';
import { FreelanceComponent } from '../applications/freelance/freelance.component';
import { AllComponent } from './all/all.component';
import { ViewjobComponent } from './viewjob/viewjob.component';

const routes: Routes = [
  {
    path: '',
    component: JobsComponent,
    children: [
      {
        path: 'all',
        component: AllComponent
      },
      {
        path: 'myjobs',
        component: MyJobsComponent,
      },
      {
        path: 'freelance',
        component: FreelanceComponent,
      },
      {
        path: 'view',
        component: ViewjobComponent 
      },
      
      {
        path: '**',
        redirectTo: 'all',
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
