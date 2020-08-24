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
import { AssociatedANMComponent } from "./chc-module/registration/shared/associated-anm/associated-anm.component";
import { from } from "rxjs";
import { SpouseResolverService } from "./shared/anm-module/registration/spouse/spouse-resolver.service";
import { CHCSampleResolverService } from "./shared/chc-sample/chc-sample-resolver.service";
import { CHCPickAndPackResolverService } from "./shared/centrallab/central-pickandpack-resolver.service";
import { TimeoutExpiryResolverService } from "./shared/anm-module/notifications/timeout-expiry/timeout-expiry-resolver.service";
import { UnsentSamplesResolverService } from "./shared/anm-module/notifications/unsent-samples/unsent-samples-resolver.service";
import { ChcSampleCollectionComponent } from "./chc-module/chc-sample-collection/chc-sample-collection.component";

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
import { CHCupdateSSTReceivedService } from "./shared/chc-sample/chc-update-sst-resolver.service";
import { ChcPicknpackResolverService } from "./shared/chc-module/chc-pickandpack/chc-picknpack-resolver.service";
import { ChcShipmentlogComponent } from "./chc-module/chc-shipmentlog/chc-shipmentlog.component";
import { ChcShipmentlogResolverService } from "./shared/chc-module/chc-shipmentlog/chc-shipmentlog-resolver.service";
import { ChcViewShipmentdetailsComponent } from "./chc-module/chc-view-shipmentdetails/chc-view-shipmentdetails.component";
import { ChcSubjectProfileComponent } from "./chc-module/chc-subject-profile/chc-subject-profile.component";
import { ChcNotificationComponent } from "./chc-module/chc-notification/chc-notification/chc-notification.component";
import { ChcDamagedSamplesComponent } from "./chc-module/chc-notification/chc-damaged-samples/chc-damaged-samples.component";
import { ChcUnsentSamplesComponent } from "./chc-module/chc-notification/chc-unsent-samples/chc-unsent-samples.component";
import { ChcTimeoutSamplesComponent } from "./chc-module/chc-notification/chc-timeout-samples/chc-timeout-samples.component";
import { ChcDamagedsamplesResolverService } from "./shared/chc-module/chc-damagedsamples-resolver.service";
import { ChcUnsentSamplesResolverService } from "./shared/chc-module/chc-unsent-samples/chc-unsent-samples-resolver.service";
import { ChcTimeoutsamplesResolverService } from "./shared/chc-module/chc-timeoutsamples-resolver.service";
import { ChcPositiveSubjectComponent } from "./chc-module/chc-notification/chc-positive-subject/chc-positive-subject.component";
import { ChcPositiveSubjectResolverService } from "./shared/chc-module/chc-positive-subject/chc-positive-subject-resolver.service";

import { CentrallabSampleResolverService } from "./shared/centrallab/central-sample-resolver.service";
import { CentrallabShipmentResolverService } from "./shared/centrallab/central-shipment-resolver.service";
import { CentralupdateHPLCService } from "./shared/centrallab/central-update-hplc-resolver.service";
import { CentralSampleRcptMainComponent } from "./central-lab/sample-rcpt/central-sample-rcpt-main/central-sample-rcpt-main.component";
import { CentralSampleRcptComponent } from "./central-lab/sample-rcpt/central-sample-rec/central-sample-rec.component";
import { CentralHPLCupdateComponent } from "./central-lab/HPLC-update/central-update-hplc/central-update-hplc.component";
import { CentralReceivedSampleComponent } from "./central-lab/HPLC-update/central-update-hplc-received/central-update-hplc-received.component";
import { CentralHPLCUploadComponent } from "./central-lab/HPLC-update/central-update-hplc-upload/central-update-hplc-upload.component";

import { MolecularSampleRcptMainComponent } from "./molecular-lab/sample-rcpt/molecular-sample-rcpt-main/molecular-sample-rcpt-main.component";
import { MolecularSampleRcptComponent } from "./molecular-lab/sample-rcpt/molecular-sample-rec/molecular-sample-rec.component";
import { ChcSamplePickpackComponent } from "./chc-sample-module/chc-sample-pickpack/chc-sample-pickpack.component";
import { CheSpouseComponent } from "./shared/chc-module/che-spouse/che-spouse.component";
import { AnmSpouseComponent } from "./shared/anm-module/registration/anm-spouse/anm-spouse.component";

import { DiagosisHPLCmainComponent } from "./pathologist/diagnosis/diagnosis-hplc-main/diagnosis-hplc-main.component";
import { DiagnosisHPLCAbnormaComponent } from "./pathologist/diagnosis/diagnosis-hplc-abnormal/diagnosis-hplc-abnormal.component";
import { DiagosisReportComponent } from "./pathologist/diagnosis/diagnosis-report/diagnosis-report.component";
import { DiagosisReportmainComponent } from "./pathologist/diagnosis/diagnosis-report-main/diagnosis-report-main.component";
import { ChcSamplePickpackResolverService } from "./shared/chc-sample/chc-sample-pickpack/chc-sample-pickpack-resolver.service";

import { PathoHPLCService } from "./shared/pathologist/patho-hplc-resolver.service";


import { CentralPickAndPackComponent } from "./central-lab/pickandpack/central-pick-pack-main/central-pick-pack-main.component";
import { CentralPickPackPendingComponent } from "./central-lab/pickandpack/central-pick-pack-pending/central-pick-pack-pending.component";
import { CentralPickPackStartComponent } from "./central-lab/pickandpack/central-pick-pack-start/central-pick-pack-start.component"

import { ChcSampleShipmentlogComponent } from "./chc-sample-module/chc-sample-shipmentlog/chc-sample-shipmentlog.component";
import { ChcSampleShipmentlogResolverService } from "./shared/chc-sample/chc-sample-shipmentlog/chc-sample-shipmentlog-resolver.service";

import { CentralShipmentMainComponent } from "./central-lab/shipment-log/central-shipment-log-main/central-shipment-log-main.component";
import { CentralCentralShipmentComponent } from "./central-lab/shipment-log/central-shipment-log/central-shipment-log.component";
import { ChcSampleViewShipmentComponent } from "./chc-sample-module/chc-sample-view-shipment/chc-sample-view-shipment.component";
// import { ChcPendingPickpackComponent } from "./chc-sample-module/chc-sample-pickpack/chc-pending-pickpack/chc-pending-pickpack.component";
import { ChcStartPickpackComponent } from "./chc-sample-module/chc-sample-pickpack/chc-start-pickpack/chc-start-pickpack.component";
import { ChcPendingPickpackComponent } from "./chc-sample-module/chc-sample-pickpack/chc-pending-pickpack/chc-pending-pickpack.component";
import { PageUnderDevelopementComponent } from "./page-under-developement/page-under-developement.component";

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
    data: {
      breadcrumb: 'Home'
    },
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full',
      data: {
        breadcrumb: 'Home'
      },  },
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
      {
        path: 'anm-notification', component: AnmNotificationComponent, data:{breadcrumb: 'ANM-Notification'},
        children: [
          { path: '', component: AnmDamagedSamplesComponent, pathMatch: 'full', data:{breadcrumb: 'Damaged Samples'}, resolve:{damagedSamplesData: DamagedSamplesResolverService}},
          { path: 'unsent', component: AnmUnsentSamplesComponent, pathMatch: 'full', data:{breadcrumb: 'Unsent Samples'}, resolve:{unsentSamplesData: UnsentSamplesResolverService}},
          { path: 'timeout', component: AnmTimeoutSamplesComponent, pathMatch: 'full', resolve:{timeoutSamplesData: TimeoutExpiryResolverService}},
          { path: 'positive', component: AnmPositiveSubjectsComponent, pathMatch: 'full', resolve:{positiveSubjectData: PositiveSubjectsResolverService} },
          { path: 'pndreferral', component: AnmPndReferralComponent, pathMatch: 'full' },
          { path: 'mtpreferral', component: AnmMtpReferralComponent, pathMatch: 'full' },
          { path: 'updatechc', component: AnmUpdateChcComponent, pathMatch: 'full' },
          { path: 'postmtp', component: AnmPostMtpFollowupComponent, pathMatch: 'full' }
        ]
      },
      {
        path: 'chc-notification', component: ChcNotificationComponent,
        children: [
          { path: '', component: ChcDamagedSamplesComponent, pathMatch: 'full', resolve:{chcdamagedSamplesData: ChcDamagedsamplesResolverService}},
          { path: 'chc-unsent', component: ChcUnsentSamplesComponent, pathMatch: 'full', resolve:{chcunsentSamplesData: ChcUnsentSamplesResolverService}},
          { path: 'chc-timeout', component: ChcTimeoutSamplesComponent, pathMatch: 'full', resolve:{chctimeoutSamplesData: ChcTimeoutsamplesResolverService}},
          { path: 'chc-positive', component: ChcPositiveSubjectComponent, pathMatch: 'full', resolve:{chcpositiveSubjectData: ChcPositiveSubjectResolverService} },
        ]
      },
      {
        path: 'chc-subregn', component: CheSubjectRegistrationComponent,
        children:[
          {path: '', component: ChcwalkinRegistrationComponent, pathMatch: 'full'},
          {path: 'awreg', component: ChcpregnantRegistrationComponent, pathMatch: 'full'},
          {path: 'spouse', component: CheSpouseRegistrationComponent, pathMatch: 'full'},
          {path: 'student', component: ChcStudentRegistrationComponent, pathMatch: 'full'},
          {path: 'walkin', component: ChcwalkinRegistrationComponent, pathMatch: 'full'}
        ]
      },
      { path: 'chc-sample-collection', component: ChcSampleCollectionComponent, resolve: {chcSampleCollectionData: ChcSampleCollectionResolverService} },
      { path: 'chc-pickandpack', component: ChcPicknpackComponent, resolve: {chcpicknpackData: ChcPicknpackResolverService}},
      { path: 'chc-shipmentlog', component: ChcShipmentlogComponent, resolve: {chcshipmentLogData: ChcShipmentlogResolverService}},
      { path: 'chc-viewshipment', component: ChcViewShipmentdetailsComponent, pathMatch: 'full'},
      { path: 'chc-subjectprofile', component: ChcSubjectProfileComponent},
      
      {
        path: 'chc-sample', component: CHCSampleRcptProComponent,
        children:[
          {path: '', component: CHCSampleRcptComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCSampleResolverService}}
        ]
      },
      { path: 'chc-sample-pickpack', component: ChcSamplePickpackComponent, resolve: {chcpickpackSamplesData: ChcSamplePickpackResolverService}},
      { path: 'chc-sample-shipmentlog', component: ChcSampleShipmentlogComponent, resolve: {chcsampleshipmentLogData: ChcSampleShipmentlogResolverService}},
      { path: 'chc-sample-viewshipment', component: ChcSampleViewShipmentComponent, pathMatch: 'full'},
      // {
      //   path: 'chc-sample-pickpack', component: ChcSamplePickpackComponent,
      //   children:[
      //     {path: '', component: ChcPendingPickpackComponent, pathMatch: 'full', resolve: {chcpickpackSamplesData: ChcSamplePickpackResolverService}},
      //     {path: 'start', component: ChcStartPickpackComponent, pathMatch: 'full', resolve: {chcpickpackSamplesData: ChcSamplePickpackResolverService}}
      //   ]
      // },
      // {
      //   path: 'chc-sample-pickpack', component: ChcSamplePickpackComponent,
      //   children:[
      //     {path: '', component: ChcPendingPickpackComponent, pathMatch: 'full', resolve: {chcpickpackSamplesData: ChcSamplePickpackResolverService}},
      //     {path: 'startpickpack', component: ChcStartPickpackComponent, pathMatch: 'full', resolve: {chcpickpackSamplesData: ChcSamplePickpackResolverService}},

      //   ]
      // },
      {
        path: 'chc-update-sst', component: CHCUpdateSSTComponent,
        children:[
          {path: '', component: SSTReceivedSampleComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCupdateSSTReceivedService}},
          {path: 'positive', component: SSTUpdatePositiveComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCupdateSSTReceivedService}},
          {path: 'negative', component: SSTUpdateNegativeComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCupdateSSTReceivedService}}
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
        path: 'central-update-hplc', component: CentralHPLCupdateComponent,
        children:[
          {path: '', component: CentralReceivedSampleComponent, pathMatch: 'full', resolve: {positiveSubjects: CentralupdateHPLCService}},
          {path: 'upload', component: CentralHPLCUploadComponent, pathMatch: 'full', resolve: {positiveSubjects: CentralupdateHPLCService}}
        ]
      },
      {
        path: 'pathologist-hplc', component: DiagosisHPLCmainComponent,
        children:[
          {path: 'normal', component: DiagnosisHPLCAbnormaComponent, pathMatch: 'full', resolve: {positiveSubjects: PathoHPLCService}},
          {path: 'abnormal', component: DiagnosisHPLCAbnormaComponent, pathMatch: 'full', resolve: {positiveSubjects: PathoHPLCService}},
          {path: 'report', component: DiagosisReportComponent, pathMatch: 'full', resolve: {positiveSubjects: CentralupdateHPLCService}}
        ]
      },
      {
        path: 'central-pickpack', component: CentralPickAndPackComponent,
        children:[
          {path: '', component: CentralPickPackPendingComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCPickAndPackResolverService}},
          {path: 'start', component: CentralPickPackStartComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCPickAndPackResolverService}}
        ]
      },
      {
        path: 'pathologist-hplc-report', component: DiagosisReportmainComponent,
        children:[
          {path: '', component: DiagosisReportComponent, pathMatch: 'full', resolve: {positiveSubjects: CentralupdateHPLCService}}
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
      {
        path: 'centrallab', component: CentralSampleRcptMainComponent,
        children:[
          {path: '', component: CentralSampleRcptComponent, pathMatch: 'full', resolve: {positiveSubjects: CentrallabSampleResolverService}}
        ]
      },
      {
        path: 'central-shipment', component: CentralShipmentMainComponent,
        children:[
          {path: '', component: CentralCentralShipmentComponent, pathMatch: 'full', resolve: {positiveSubjects: CentrallabShipmentResolverService}}
        ]
      },
      {
        path: 'molecularlab', component: MolecularSampleRcptMainComponent,
        children:[
          {path: '', component: MolecularSampleRcptComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCSampleResolverService}}
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
  // { path: 'notfound', component: NotfoundComponent },
  { path: 'underconstruction', component: PageUnderDevelopementComponent },
  { path: '**', redirectTo: '/underconstruction' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [
  LoadScriptDirective,
  NotfoundComponent,
  PageUnderDevelopementComponent,
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
  SSTUpdateNegativeComponent,
  ChcShipmentlogComponent,
  ChcViewShipmentdetailsComponent,
  AssociatedANMComponent,
  ChcDamagedSamplesComponent,
  ChcNotificationComponent,
  ChcUnsentSamplesComponent,
  ChcTimeoutSamplesComponent,
  ChcPositiveSubjectComponent,
  CentralSampleRcptMainComponent,
  CentralSampleRcptComponent,
  CentralHPLCupdateComponent,
  CentralReceivedSampleComponent,
  CentralHPLCUploadComponent,
  MolecularSampleRcptMainComponent,
  MolecularSampleRcptComponent,
  ChcSamplePickpackComponent,
  CheSpouseComponent,
  AnmSpouseComponent, 
  AnmSpouseComponent,
  DiagosisHPLCmainComponent,
  DiagnosisHPLCAbnormaComponent,
  DiagosisReportComponent,
  DiagosisReportmainComponent,
  ChcSampleShipmentlogComponent,
  ChcSampleViewShipmentComponent,
  CentralPickAndPackComponent,
  CentralPickPackPendingComponent,
  CentralPickPackStartComponent,
  ChcSampleShipmentlogComponent,
  CentralShipmentMainComponent,
  CentralCentralShipmentComponent,
  ChcPendingPickpackComponent,
  ChcStartPickpackComponent
];


