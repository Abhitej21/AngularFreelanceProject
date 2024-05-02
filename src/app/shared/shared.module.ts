import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { MainloaderComponent } from './mainloader/mainloader.component';
import { CommonloaderComponent } from './commonloader/commonloader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LandingComponent,
    MainloaderComponent,
    CommonloaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    LandingComponent,
    MainloaderComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonloaderComponent
  ]
})
export class SharedModule { }
