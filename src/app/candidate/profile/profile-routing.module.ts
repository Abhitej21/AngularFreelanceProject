import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'profile',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'user/:id',
  //   component: UserComponent
  // }
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'user/:id',
        component: UserComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
