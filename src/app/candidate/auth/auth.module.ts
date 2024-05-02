import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './loader/loader.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';
import {  EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './store/auth/auth.effects';
import { AuthComponent } from './auth.component';
import { loadingReducer } from './store/loginLoading/loading.reducer';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    LoaderComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    StoreModule.forFeature('loader',loadingReducer),
    StoreModule.forFeature('auth',authReducer),
    EffectsModule.forFeature([AuthEffect])
  ],
  providers: []
})
export class AuthModule { }
