import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { HomeHeaderComponent } from './_layout/home-header/home-header.component';
import { HomeLayoutComponent } from './_layout/home-layout/home-layout.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';

import { DashboardComponent } from './dashboard/dashboard.component';



import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { LoginComponent } from "./auth/login/login.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { AuthGuard } from "./shared/auth.guard";
import { SiteSidebarComponent } from "./_layout/site-sidebar/site-sidebar.component";
import { LoadScriptDirective } from "./shared/load-script.directive";
import { SampleCollectionComponent } from "./anm-module/sample-collection/sample-collection.component";
import { AnmNotificationComponent } from "./anm-module/anm-notification/anm-notification.component";
import { AnmDamagedSamplesComponent } from './anm-module/anm-damaged-samples/anm-damaged-samples.component';
import { AnmUnsentSamplesComponent } from './anm-module/anm-unsent-samples/anm-unsent-samples.component';
import { AnmTimeoutSamplesComponent } from './anm-module/anm-timeout-samples/anm-timeout-samples.component';
import { AnmPositiveSubjectsComponent } from './anm-module/anm-positive-subjects/anm-positive-subjects.component';
import { AnmPndReferralComponent } from './anm-module/anm-pnd-referral/anm-pnd-referral.component';
import { AnmMtpReferralComponent } from './anm-module/anm-mtp-referral/anm-mtp-referral.component';
import { AnmSubjectRegistrationComponent } from "./anm-module/registration/anm-subject-registration/anm-subject-registration.component";
import { AnmAwRegistrationComponent } from "./anm-module/registration/anm-aw-registration/anm-aw-registration.component";
import { AnmSpouseRegistrationComponent } from "./anm-module/registration/anm-spouse-registration/anm-spouse-registration.component";
import { AnmStudentRegistrationComponent } from "./anm-module/registration/anm-student-registration/anm-student-registration.component";
import { AnmWalkinLt18RegistrationComponent } from "./anm-module/registration/anm-walkin-lt18-registration/anm-walkin-lt18-registration.component";
import { AnmWalkinGt18RegistrationComponent } from "./anm-module/registration/anm-walkin-gt18-registration/anm-walkin-gt18-registration.component";



const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  {
    path: 'login',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: LoginComponent, pathMatch: 'full'}
    ]
  },
  //Site routes goes here 
  {
    path: 'app',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
      {
        path: 'anm-notification', component: AnmNotificationComponent,
        children: [
          { path: '', component: AnmDamagedSamplesComponent, pathMatch: 'full' },
          { path: 'unsent', component: AnmUnsentSamplesComponent, pathMatch: 'full' },
          { path: 'timeout', component: AnmTimeoutSamplesComponent, pathMatch: 'full' },
          { path: 'positive', component: AnmPositiveSubjectsComponent, pathMatch: 'full' },
          { path: 'pndreferral', component: AnmPndReferralComponent, pathMatch: 'full' },
          { path: 'mtpreferral', component: AnmMtpReferralComponent, pathMatch: 'full' },
        ]
      },
      {
        path: 'anm-subregn', component: AnmSubjectRegistrationComponent,
        children:[
          {path: '', component: AnmAwRegistrationComponent, pathMatch: 'full'},
          {path: 'awreg', component: AnmAwRegistrationComponent, pathMatch: 'full'},
          {path: 'spouse', component: AnmSpouseRegistrationComponent, pathMatch: 'full'},
          {path: 'student', component: AnmStudentRegistrationComponent, pathMatch: 'full'},
          {path: 'walkin', component: AnmWalkinLt18RegistrationComponent, pathMatch: 'full'},
          {path: 'otherwalkin', component: AnmWalkinGt18RegistrationComponent, pathMatch: 'full'},
        ]

      },
      { path: 'anm-sample-collection', component: SampleCollectionComponent },
      //{ path: 'test/:id', component: AboutComponent }
    ]
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [
  LoadScriptDirective,
  NotfoundComponent,
  HomeComponent,
  CounterComponent,
  FetchDataComponent,
  LoginComponent,
  HomeHeaderComponent,
  HomeLayoutComponent,
  SiteHeaderComponent,
  SiteLayoutComponent,
  SiteSidebarComponent,
  DashboardComponent,
  AnmNotificationComponent,
  AnmDamagedSamplesComponent,
  AnmUnsentSamplesComponent,
  AnmTimeoutSamplesComponent,
  AnmPositiveSubjectsComponent,
  AnmPndReferralComponent,
  AnmMtpReferralComponent,
  SampleCollectionComponent,
  AnmSubjectRegistrationComponent,
  AnmAwRegistrationComponent,
  AnmSpouseRegistrationComponent,
  AnmStudentRegistrationComponent,
  AnmWalkinLt18RegistrationComponent,
  AnmWalkinGt18RegistrationComponent,

];
