import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationsComponent } from './applications.component';
import { AppliedComponent } from './applied/applied.component';
import { AllComponent } from './all/all.component';
import { FreelanceComponent } from './freelance/freelance.component';
import { LandingComponent } from 'src/app/shared/landing/landing.component';
import { ApplyformComponent } from './applyform/applyform.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsComponent,
    children: [
      {
        path: 'all',
        component: AllComponent,
      },
      {
        path: 'apply',
        component: ApplyformComponent
      }
      // {
      //   path: 'applied',
      //   component: AppliedComponent
      // },
      // {
      //   path: 'freelance',
      //   component: FreelanceComponent
      // },
      // {
      //   path: 'landing',
      //   component: LandingComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
