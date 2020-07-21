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
import { AnmUpdateChcComponent } from './anm-module/anm-update-chc/anm-update-chc.component';
import { AnmSubjectRegistrationComponent } from "./anm-module/registration/anm-subject-registration/anm-subject-registration.component";
import { AnmAwRegistrationComponent } from "./anm-module/registration/anm-aw-registration/anm-aw-registration.component";
import { AnmSpouseRegistrationComponent } from "./anm-module/registration/anm-spouse-registration/anm-spouse-registration.component";
import { AnmStudentRegistrationComponent } from "./anm-module/registration/anm-student-registration/anm-student-registration.component";
import { AnmWalkinLt18RegistrationComponent } from "./anm-module/registration/anm-walkin-lt18-registration/anm-walkin-lt18-registration.component";
import { AnmWalkinGt18RegistrationComponent } from "./anm-module/registration/anm-walkin-gt18-registration/anm-walkin-gt18-registration.component";
import { AnmPickandPackComponent } from './anm-module/anm-pickandpack/anm-pickandpack.component';
import { AnmShipmentComponent } from './anm-module/anm-shipment/anm-shipment.component';
import { AnmSubjectProfileComponent } from './anm-module/anm-subject-profile/anm-subject-profile.component';
import { AnmViewShipmentdetailsComponent } from "./anm-module/anm-view-shipmentdetails/anm-view-shipmentdetails.component";
import { SampleCollectionResolverService } from "./shared/anm-module/sample-collection-resolver.service";
import { ShipmentlogResolverService } from "./shared/anm-module/shipmentlog/shipmentlog-resolver.service";
import { PicknpackResolverService } from "./shared/anm-module/picnpack/picknpack-resolver.service";
import { DamagedSamplesResolverService } from "./shared/anm-module/notifications/damaged-samples/damaged-samples-resolver.service";


import { CheSubjectRegistrationComponent } from './chc-module/registration/chc-subject-registration/chc-subject-registration.component'
import { WalkinRegistrationComponent } from './chc-module/registration/walkin-registration/walkin-registration.component';
import { ChcpregnantRegistrationComponent } from "./chc-module/registration/shared/pregnant-registration/pregnant-registration.component";
import { ChcStudentRegistrationComponent } from "./chc-module/registration/shared/chc-student-registration/chc-student-registration.component";
import { CheSpouseRegistrationComponent } from "./chc-module/registration/shared/che-spouse-registration/che-spouse-registration.component";
import { ChcwalkinRegistrationComponent } from "./chc-module/registration/shared/walk-in-registration/walk-in-registration.component";
import { from } from "rxjs";
import { SpouseResolverService } from "./shared/anm-module/registration/spouse/spouse-resolver.service";
import { CHCSampleResolverService } from "./shared/chc-sample/chc-sample-resolver.service";
import { TimeoutExpiryResolverService } from "./shared/anm-module/notifications/timeout-expiry/timeout-expiry-resolver.service";
import { UnsentSamplesResolverService } from "./shared/anm-module/notifications/unsent-samples/unsent-samples-resolver.service";
import { ChcSampleCollectionComponent } from "./chc-module/sample-collection/chc-sample-collection.component";

import { CHCSampleRcptComponent } from "./chc-sample-module/chc-sample-rec/chc-sample-rec.component";
import { CHCSampleRcptProComponent } from "./chc-sample-module/chc-sample-rcpt-pro/chc-sample-rcpt-pro.component";
import { CHCUpdateCBCComponent } from "./chc-sample-module/cbc-update/chc-update-cbc/chc-update-cbc.component";
import { CBCReceivedSampleComponent } from "./chc-sample-module/cbc-update/chc-update-cbc-received/chc-update-cbc-received.component";
import { CBCUploadComponent } from "./chc-sample-module/cbc-update/chc-update-cbc-upload/chc-update-cbc-upload.component";
import { AnmPostMtpFollowupComponent } from "./anm-module/anm-post-mtp-followup/anm-post-mtp-followup.component";
import { CHCupdateReceivedService } from "./shared/chc-sample/chc-update-cbc-resolver.service";
import { PositiveSubjectsResolverService } from "./shared/anm-module/positive-subjects/positive-subjects-resolver.service";

import { CHCUpdateSSTComponent } from "./chc-sample-module/sst-update/chc-update-sst/chc-update-sst.component";
import { SSTReceivedSampleComponent } from "./chc-sample-module/sst-update/chc-update-sst-received/chc-update-sst-received.component";
import { SSTUpdatePositiveComponent } from "./chc-sample-module/sst-update/chc-update-sst-positive/chc-update-sst-positive.component";
import { SSTUpdateNegativeComponent } from "./chc-sample-module/sst-update/chc-update-sst-negative/chc-update-sst-negative.component";
import { ChcSampleCollectionResolverService } from "./shared/chc-module/sample-collection/chc-sample-collection-resolver.service";
import { ChcPicknpackComponent } from "./chc-module/chc-picknpack/chc-picknpack.component";

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
          { path: '', component: AnmDamagedSamplesComponent, pathMatch: 'full', resolve:{damagedSamplesData: DamagedSamplesResolverService}},
          { path: 'unsent', component: AnmUnsentSamplesComponent, pathMatch: 'full', resolve:{unsentSamplesData: UnsentSamplesResolverService}},
          { path: 'timeout', component: AnmTimeoutSamplesComponent, pathMatch: 'full', resolve:{timeoutSamplesData: TimeoutExpiryResolverService}},
          { path: 'positive', component: AnmPositiveSubjectsComponent, pathMatch: 'full', resolve:{positiveSubjectData: PositiveSubjectsResolverService} },
          { path: 'pndreferral', component: AnmPndReferralComponent, pathMatch: 'full' },
          { path: 'mtpreferral', component: AnmMtpReferralComponent, pathMatch: 'full' },
          { path: 'updatechc', component: AnmUpdateChcComponent, pathMatch: 'full' },
          { path: 'postmtp', component: AnmPostMtpFollowupComponent, pathMatch: 'full' }
        ]
      },
      {
        path: 'chc-subregn', component: CheSubjectRegistrationComponent,
        children:[
          {path: '', component: WalkinRegistrationComponent, pathMatch: 'full'},
          {path: 'awreg', component: WalkinRegistrationComponent, pathMatch: 'full'},
          {path: 'spouse', component: AnmSpouseRegistrationComponent, pathMatch: 'full'},
          {path: 'student', component: AnmStudentRegistrationComponent, pathMatch: 'full'},
          {path: 'walkin', component: AnmWalkinLt18RegistrationComponent, pathMatch: 'full'},
          {path: 'otherwalkin', component: AnmWalkinGt18RegistrationComponent, pathMatch: 'full'},
        ]
      },
      { path: 'chc-sample-collection', component: SampleCollectionComponent, resolve: {chcSampleCollectionData: ChcSampleCollectionResolverService} },
      { path: 'chc-pickandpack', component: ChcPicknpackComponent},
      
      {
        path: 'chc-sample', component: CHCSampleRcptProComponent,
        children:[
          {path: '', component: CHCSampleRcptComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCSampleResolverService}}
        ]
      },
      {
        path: 'chc-update-sst', component: CHCUpdateSSTComponent,
        children:[
          {path: '', component: SSTReceivedSampleComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCupdateReceivedService}},
          {path: 'positive', component: SSTUpdatePositiveComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCupdateReceivedService}},
          {path: 'negative', component: SSTUpdateNegativeComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCupdateReceivedService}}
        ]
      },
      {
        path: 'chc-update-cbc', component: CHCUpdateCBCComponent,
        children:[
          {path: '', component: CBCReceivedSampleComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCupdateReceivedService}},
          {path: 'upload', component: CBCUploadComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCupdateReceivedService}}
        ]
      },
      {
        path: 'anm-subregn', component: AnmSubjectRegistrationComponent,
        children:[
          {path: '', component: AnmAwRegistrationComponent, pathMatch: 'full'},
          {path: 'awreg', component: AnmAwRegistrationComponent, pathMatch: 'full'},
          {path: 'spouse', component: AnmSpouseRegistrationComponent, pathMatch: 'full', resolve: {positiveSubjects: SpouseResolverService}},
          {path: 'student', component: AnmStudentRegistrationComponent, pathMatch: 'full'},
          {path: 'walkin', component: AnmWalkinLt18RegistrationComponent, pathMatch: 'full'},
          {path: 'otherwalkin', component: AnmWalkinGt18RegistrationComponent, pathMatch: 'full'},
        ]

      },
      { path: 'anm-sample-collection', component: SampleCollectionComponent, resolve: {sampleCollectionData: SampleCollectionResolverService} },
      { path: 'anm-sample-collection/:subtype', component: SampleCollectionComponent, resolve: {sampleCollectionData: SampleCollectionResolverService} },
      //{ path: 'test/:id', component: AboutComponent }
      { path: 'anm-pickpack', component: AnmPickandPackComponent, resolve: {picknpackData: PicknpackResolverService} },
      { path: 'anm-shipment', component: AnmShipmentComponent, resolve: {shipmentLogData: ShipmentlogResolverService } },
      { path: 'anm-subprofile', component: AnmSubjectProfileComponent },
      { path: 'anm-viewshipment', component: AnmViewShipmentdetailsComponent, pathMatch: 'full'},
     
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
  AnmUpdateChcComponent,
  AnmPostMtpFollowupComponent,
  SampleCollectionComponent,
  AnmPickandPackComponent,
  AnmShipmentComponent,
  AnmSubjectProfileComponent,
  AnmSubjectRegistrationComponent,
  AnmAwRegistrationComponent,
  AnmSpouseRegistrationComponent,
  AnmStudentRegistrationComponent,
  AnmWalkinLt18RegistrationComponent,
  AnmWalkinGt18RegistrationComponent,
  AnmViewShipmentdetailsComponent,
  ChcSampleCollectionComponent,
  WalkinRegistrationComponent,
  CheSubjectRegistrationComponent,
  ChcpregnantRegistrationComponent,
  ChcStudentRegistrationComponent,
  CheSpouseRegistrationComponent,
  ChcwalkinRegistrationComponent,
  CHCSampleRcptComponent,
  CHCSampleRcptProComponent,
  ChcPicknpackComponent,
  CHCUpdateCBCComponent,
  CBCReceivedSampleComponent,
  CBCUploadComponent,
  CHCUpdateSSTComponent,
  SSTReceivedSampleComponent,
  SSTUpdatePositiveComponent,
  SSTUpdateNegativeComponent
];
