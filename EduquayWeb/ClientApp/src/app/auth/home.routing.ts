import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeLayoutComponent } from '../_layout/home-layout/home-layout.component';
import { LoginComponent } from "./login/login.component";
import { AboutUsComponent } from "./../landing-page/about-us/about-us.component";
import { AboutProgramComponent } from './../landing-page/about-program/about-program.component';
import { ImportantLinksComponent } from './../landing-page/important-links/important-links.component';
import { GetOtpComponent } from './../auth/forgot-password/get-otp/get-otp.component';
import { ResetLoginComponent } from './../auth/reset-login/reset-login/reset-login.component';
import { HplcLoginComponent } from './../auth/hplclogin/hplclogin.component';

const routes: Routes = [
  {
    path: '', component: HomeLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, pathMatch: 'full'},
      { path: 'about', component: AboutUsComponent, pathMatch: 'full'},
      { path: 'aboutprogram', component: AboutProgramComponent, pathMatch: 'full'},
      { path: 'importantlinks', component: ImportantLinksComponent, pathMatch: 'full'},
      { path: 'forgotpassword', component: GetOtpComponent, pathMatch: 'full'},
      { path: 'resetlogin', component: ResetLoginComponent, pathMatch: 'full'},
      { path: 'hplclogin', component: HplcLoginComponent, pathMatch: 'full'}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { 
  
}
