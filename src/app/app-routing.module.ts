import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './shared/landing/landing.component';

const routes: Routes = [  
  {
    path: '',
    redirectTo: 'cand',
    pathMatch: 'full',
  },
  {
    path: 'cand',
    loadChildren: () => import('./candidate/candidate.module').then(m => m.CandidateModule)
  },
  {
    path: 'landing',
    component: LandingComponent,
    title: 'JobStreet | Landing Page'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
