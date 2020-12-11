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
import {  CHCCBCupdateReceivedService } from "./shared/chc-sample/chc-update-cbc-chc-resolver.service";

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
import { CentralupdateHPLCNewService } from "./shared/centrallab/central-update-hplc-new-resolver.service";
import { PathoHPLCsrpathoService } from "./shared/centrallab/central-update-hplc-patho-resolver.service";

import { CentralSampleRcptMainComponent } from "./central-lab/sample-rcpt/central-sample-rcpt-main/central-sample-rcpt-main.component";
import { CentralSampleRcptComponent } from "./central-lab/sample-rcpt/central-sample-rec/central-sample-rec.component";
import { CentralHPLCupdateComponent } from "./central-lab/HPLC-update/central-update-hplc/central-update-hplc.component";
import { CentralReceivedSampleComponent } from "./central-lab/HPLC-update/central-update-hplc-received/central-update-hplc-received.component";
import { CentralHPLCUploadComponent } from "./central-lab/HPLC-update/central-update-hplc-upload/central-update-hplc-upload.component";
import { CentralLabReportResolverService } from "./shared/centrallab/centrallab-report-resolver.service";

import { MolecularSampleRcptMainComponent } from "./molecular-lab/sample-rcpt/molecular-sample-rcpt-main/molecular-sample-rcpt-main.component";
import { MolecularSampleRcptComponent } from "./molecular-lab/sample-rcpt/molecular-sample-rec/molecular-sample-rec.component";
import { ChcSamplePickpackComponent } from "./chc-sample-module/chc-sample-pickpack/chc-sample-pickpack.component";
import { CheSpouseComponent } from "./shared/chc-module/che-spouse/che-spouse.component";
import { AnmSpouseComponent } from "./shared/anm-module/registration/anm-spouse/anm-spouse.component";

import { DiagosisHPLCmainComponent } from "./pathologist/diagnosis/diagnosis-hplc-main/diagnosis-hplc-main.component";
import { DiagnosisHPLCAbnormaComponent } from "./pathologist/diagnosis/diagnosis-hplc-abnormal/diagnosis-hplc-abnormal.component";
import {DiagnosisHPLCAbEditComponent } from "./pathologist/diagnosis/diagnosis-hplc-edit/diagnosis-hplc-edit.component";
import { DiagosisReportComponent } from "./pathologist/diagnosis/diagnosis-report/diagnosis-report.component";
import { DiagosisReportComponent1 } from "./pathologist/diagnosis/diagnosis-report-old/diagnosis-report.component";
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
import { AboutUsComponent } from "./landing-page/about-us/about-us.component";
import { AboutProgramComponent } from "./landing-page/about-program/about-program.component";
import { ImportantLinksComponent } from "./landing-page/important-links/important-links.component";
import { ChcSubjectProfileListComponent } from "./chc-module/chc-subject-profile-list/chc-subject-profile-list.component";
import { AnmSubjectProfileListComponent } from "./anm-module/anm-subject-profile-list/anm-subject-profile-list.component";
import { PrePndtcMainComponent } from "./pndtc/schedule/pre-pndtc-main/pre-pndtc-main.component";
import { PrePndtcToBeScheduledComponent } from "./pndtc/schedule/pre-pndtc-to-be-scheduled/pre-pndtc-to-be-scheduled.component";
import { PrePndtcScheduledComponent } from "./pndtc/schedule/pre-pndtc-scheduled/pre-pndtc-scheduled.component";
import { CounsellingPrePndtMainComponent } from "./pndtc/counselling-pre-pndt/counselling-pre-pndt-main/counselling-pre-pndt-main.component";
import { ToBeCounselledComponent } from "./pndtc/counselling-pre-pndt/to-be-counselled/to-be-counselled.component";
import { CounselledDecisionYesComponent } from "./pndtc/counselling-pre-pndt/counselled-decision-yes/counselled-decision-yes.component";
import { CounselledDecisionNoComponent } from "./pndtc/counselling-pre-pndt/counselled-decision-no/counselled-decision-no.component";
import { CounselledDecisionAwaitedComponent } from "./pndtc/counselling-pre-pndt/counselled-decision-awaited/counselled-decision-awaited.component";
import { UpdateDetailTestresultsComponent } from "./pndtc/counselling-pre-pndt/update-detail-testresults/update-detail-testresults.component";
import { UpdateDecisionNoPndtComponent } from "./pndtc/counselling-pre-pndt/update-decision-no-pndt/update-decision-no-pndt.component";
import { UpdateDecisionYesPndtComponent } from "./pndtc/counselling-pre-pndt/update-decision-yes-pndt/update-decision-yes-pndt.component";
import { UpdateDecisionPendingPndtComponent } from "./pndtc/counselling-pre-pndt/update-decision-pending-pndt/update-decision-pending-pndt.component";
import { SchedulePostPndtcMainComponent } from "./pndtc/schedule-post-pndtc/schedule-post-pndtc-main/schedule-post-pndtc-main.component";
import { SchedulePostPndtcScheduledComponent } from "./pndtc/schedule-post-pndtc/schedule-post-pndtc-scheduled/schedule-post-pndtc-scheduled.component";
import { SchedulePostPndtcToBeScheduledComponent } from "./pndtc/schedule-post-pndtc/schedule-post-pndtc-to-be-scheduled/schedule-post-pndtc-to-be-scheduled.component";
import { CounsellingPostPndtMainComponent } from "./pndtc/counselling-post-pndt/counselling-post-pndt-main/counselling-post-pndt-main.component";
import { ToBePostPndtCounselledComponent } from "./pndtc/counselling-post-pndt/to-be-post-pndt-counselled/to-be-post-pndt-counselled.component";
import { PostPndtcTestresultsComponent } from "./pndtc/counselling-post-pndt/post-pndtc-testresults/post-pndtc-testresults.component";
import { PostCounsellingDecisionYesComponent } from "./pndtc/counselling-post-pndt/post-counselling-decision-yes/post-counselling-decision-yes.component";
import { PostCounsellingDecisionNoComponent } from "./pndtc/counselling-post-pndt/post-counselling-decision-no/post-counselling-decision-no.component";
import { PostCounsellingDecisionPendingComponent } from "./pndtc/counselling-post-pndt/post-counselling-decision-pending/post-counselling-decision-pending.component";
import { PostPndtcDecisionYesComponent } from "./pndtc/counselling-post-pndt/post-pndtc-decision-yes/post-pndtc-decision-yes.component";

import { PndTestingMainComponent } from "./pndtc/pnd-testing/pnd-testing-main/pnd-testing-main.component";
import { pndTestingComponent } from './pndtc/pnd-testing/pnd-testing/pnd-testing.component';
import { PNDTCPendingResolverService } from "./shared/pndtc/pndtc-pending-resolver.service";
import { PNDTCCompletedResolverService } from "./shared/pndtc/pndtc-completed-resolver.service";

import { PndTestingResultsMainComponent } from "./pndtc/pnd-testing/pnd-testing-results-main/pnd-testing-results-main.component";
import { PNDTestingResultsComponent } from "./pndtc/pnd-testing/pnd-testing-results/pnd-testing-results.component";
import { pndNotCompleteComponent } from "./pndtc/pnd-testing/pnd-not-complete/pnd-not-complete.component";
import { PostPndtcDecisionNoComponent } from "./pndtc/counselling-post-pndt/post-pndtc-decision-no/post-pndtc-decision-no.component";
import { PostPndtcDecisionAwaitedComponent } from "./pndtc/counselling-post-pndt/post-pndtc-decision-awaited/post-pndtc-decision-awaited.component";

import { PndTestingSummaryMainComponent } from "./pndtc/pnd-testing/pnd-testing-summary-main/pnd-testing-summary-main.component";
import { pndTestingSummaryComponent } from "./pndtc/pnd-testing/pnd-testing-summary/pnd-testing-summary.component";
import { PNDTCSummaryResolverService } from "./shared/pndtc/pndtc-summary-resolver.service";
import { PndSummaryViewComponent } from "./pndtc/pnd-testing/pnd-testing-summary-view/pnd-testing-summary-view.component";
import { PndSummaryViewMainComponent } from "./pndtc/pnd-testing/pnd-testing-summary-view-main/pnd-testing-summary-view-main.component";

import { MTPServicMainComponent } from "./mtp/mtp-service/mtp-service-main/mtp-service-main.component";
import { MTPPendingComponent } from "./mtp/mtp-service/mtp-sevice-pending/mtp-sevice-pending.component";
import { MTPServiceCompletedComponent } from "./mtp/mtp-service/mtp-sevice-completed/mtp-sevice-completed.component";
import { MTPPendingResolverService } from "./shared/mtp/mtp-pending-resolver.service";
import { MTPCompletedResolverService } from "./shared/mtp/mtp-completed-resolver.service";
import { MTPTestingResultsComponent } from "./mtp/mtp-service/mtp-testing-results/mtp-testing-results.component";
import { MtpTestingResultsMainComponent } from "./mtp/mtp-service/mtp-testing-results-main/mtp-testing-results-main.component";
import { MtpTestingSummaryMainComponent } from "./mtp/mtp-service/mtp-testing-summary-main/mtp-testing-summary-main.component";
import { mtpTestingSummaryComponent } from "./mtp/mtp-service/mtp-testing-summary/mtp-testing-summary.component";
import { MTPSummaryResolverService } from "./shared/mtp/mtp-summary-resolver.service";
import { MtpSummaryViewMainComponent } from "./mtp/mtp-service/mtp-testing-summary-view-main/mtp-testing-summary-view-main.component";
import { MtpSummaryViewComponent } from "./mtp/mtp-service/mtp-testing-summary-view/mtp-testing-summary-view.component";
import { DistrictCoordinatorMainComponent } from "./district-coordinator/district-coordinator-main/district-coordinator-main.component";
import { DamagedSamplesComponent } from "./district-coordinator/damaged-samples/damaged-samples.component";
import { UnsentSamplesComponent } from "./district-coordinator/unsent-samples/unsent-samples.component";
import { SampleTimeoutComponent } from "./district-coordinator/sample-timeout/sample-timeout.component";
import { PositiveSubjectsComponent } from "./district-coordinator/positive-subjects/positive-subjects.component";
import { PndtReferralComponent } from "./district-coordinator/pndt-referral/pndt-referral.component";
import { MtpReferralComponent } from "./district-coordinator/mtp-referral/mtp-referral.component";
import { PostMtpFollowupComponent } from "./district-coordinator/post-mtp-followup/post-mtp-followup.component";


import { ReportSampleStatusComponent } from "./molecular-lab/repot-sample-status/repot-sample-status/repot-sample-status.component";
import { ReportSampleStatusMainComponent } from "./molecular-lab/repot-sample-status/repot-sample-status-main/repot-sample-status-main.component";
import { UpdateMolResultComponent } from "./molecular-lab/update-mol-result/update-mol-result/update-mol-result.component";
import { UpdateMolResultMainComponent } from "./molecular-lab/update-mol-result/update-mol-result-main/update-mol-result-main.component";

import { ViewCaseSheetComponent } from "./molecular-lab/view-case-sheet/view-case-sheet/view-case-sheet.component";
import { ViewCaseSheetMainComponent } from "./molecular-lab/view-case-sheet/view-case-sheet-main/view-case-sheet-maincomponent";


import { CentralLabreportSampleStatusComponent } from "./central-lab/repot-sample-status/repot-sample-status/repot-sample-status.component";
import { CentralLabreportSampleStatusMainComponent } from "./central-lab/repot-sample-status/repot-sample-status-main/repot-sample-status-main.component";
import { CHCreportSampleStatusComponent } from "./chc-sample-module/repot-sample-status/repot-sample-status/repot-sample-status.component";
import { CHCreportSampleStatusMainComponent } from "./chc-sample-module/repot-sample-status/repot-sample-status-main/repot-sample-status-main.component";
import { updateMolResultViewMainComponent } from "./molecular-lab/update-mol-result/update-mol-result-view-main/update-mol-result-view-main.component";
import { UpdateMolResultViewComponent } from "./molecular-lab/update-mol-result/update-mol-result-view/update-mol-result-view.component";
import { MLSampleRcptResolverService } from "./shared/molecularlab/ml-sample-rcpt-resolver.service";
import { MLUpdateMolResultResolverService } from "./shared/molecularlab/ml-update-mol-result-resolver.service";
import { MolucularLabReportResolverService } from "./shared/molecularlab/mi-report-resolver.service";

import { CHCReportResolverService } from "./shared/chc-sample/chc-report-resolver.service";
import { ToBeSchedulingResolverService } from "./shared/pndtc/schedule-pre-pndtc/to-be-scheduling-resolver.service";
import { ScheduledResolverService } from "./shared/pndtc/schedule-pre-pndtc/scheduled-resolver.service";
import { PostSchedulingResolverService } from "./shared/pndtc/schedule-post-pndtc/post-scheduling-resolver.service";
import { PostScheduledResolverService } from "./shared/pndtc/schedule-post-pndtc/post-scheduled-resolver.service";

import { HPLCUpdateNewComponent } from "./central-lab/HPLC-update-new/HPLC-update-new/HPLC-update-new.component";
import { HPLCReceivedNewComponent } from './central-lab/HPLC-update-new/HPLC-update-new-received/HPLC-update-new-received.component';
import { CHCUpdateCBCCHCComponent } from "./chc-sample-module/cbc-update-chc/chc-update-cbc-chc/chc-update-cbc-chc.component";
import { CBCCHCReceivedSampleComponent } from "./chc-sample-module/cbc-update-chc/chc-update-cbc-received/chc-update-cbc-chc-received.component";
import { GetOtpComponent } from "./auth/forgot-password/get-otp/get-otp.component";
import { AnmChcSubjectProfileComponent } from "./shared/anm-module/anm-chc-subject-profile/anm-chc-subject-profile.component";

import { PathoreportSampleStatusComponent } from "./pathologist/repot-sample-status/patho-repot-sample-status/patho-repot-sample-status.component";
import { PathoreportSampleStatusMainComponent } from './pathologist/repot-sample-status/patho-repot-sample-status-main/patho-repot-sample-status-main.component';
import { PathoReportResolverService } from "./shared/pathologist/patho-report-resolver.service";

import { ViewPathoReportComponent } from "./pathologist/view-report-sample/view-report-sample/view-report-sample.component";
import { ViewReportPathoMainMainComponent } from "./pathologist/view-report-sample/view-report-sample-main/view-report-sample-main.component";
import { ResetLoginComponent } from "./auth/reset-login/reset-login/reset-login.component";

import { CHCNotificationMainComponent } from "./chc-sample-module/chc-notification/chc-notification-main/chc-notification-main.component";
import { AnmSubjectProfileTrackingComponent } from "./anm-module/anm-subject-profile-tracking/anm-subject-profile-tracking.component";

import { ViewCLReportComponent } from "./central-lab/view-report-sample/cl-view-report-sample/cl-view-report-sample.component";
import { ViewReportCLMainMainComponent } from "./central-lab/view-report-sample/cl-view-report-sample-main/cl-view-report-sample-main.component";
import { SubjectTrackerComponent } from "./anm-module/subject-tracker/subject-tracker.component";

import { CentralNotificationMainComponent } from "./central-lab/central-notification/central-notification-main/central-notification-main.component";
import { StateComponent } from "./admin/state/state.component";
import { DistrictComponent } from "./admin/district/district.component";
import { BlockComponent } from "./admin/block/block.component";
import { ChcComponent } from "./admin/chc/chc.component";
import { DiagnosisHPLCPathoComponent } from "./pathologist/diagnosis/diagnosis-hplc-patho/diagnosis-hplc-patho.component";
//import { DiagnosisHPLCPathoComponent } from "./pathologist/diagnosis/diagnosis-hplc-patho/diagnosis-hplc-patho.component";
const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  {
    path: 'home',
    component: HomeLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, pathMatch: 'full'},
      { path: 'about', component: AboutUsComponent, pathMatch: 'full'},      
      { path: 'aboutprogram', component: AboutProgramComponent, pathMatch: 'full'},
      { path: 'importantlinks', component: ImportantLinksComponent, pathMatch: 'full'},
      { path: 'forgotpassword', component: GetOtpComponent, pathMatch: 'full'},
      { path: 'resetlogin', component: ResetLoginComponent, pathMatch: 'full'}
    ]
  },

  //Site routes goes here 
  {
    path: 'app',
    component: SiteLayoutComponent,
    
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full',
       },
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
      {
        path: 'anm-notification', component: AnmNotificationComponent,
        children: [
          { path: '', component: AnmDamagedSamplesComponent, pathMatch: 'full'},  //resolve:{damagedSamplesData: DamagedSamplesResolverService}},
          { path: 'unsent', component: AnmUnsentSamplesComponent, pathMatch: 'full'}, // resolve:{unsentSamplesData: UnsentSamplesResolverService}
          { path: 'timeout', component: AnmTimeoutSamplesComponent, pathMatch: 'full'}, //resolve:{timeoutSamplesData: TimeoutExpiryResolverService}},
          { path: 'positive', component: AnmPositiveSubjectsComponent, pathMatch: 'full'}, //resolve:{positiveSubjectData: PositiveSubjectsResolverService} },
          { path: 'pndreferral', component: AnmPndReferralComponent, pathMatch: 'full' },
          { path: 'mtpreferral', component: AnmMtpReferralComponent, pathMatch: 'full' },
          { path: 'updatechc', component: AnmUpdateChcComponent, pathMatch: 'full' },
          { path: 'postmtp', component: AnmPostMtpFollowupComponent, pathMatch: 'full' }
        ]
      },
      {
        path: 'chc-notification', component: ChcNotificationComponent,
        children: [
          { path: '', component: ChcDamagedSamplesComponent, pathMatch: 'full'}, // resolve:{chcdamagedSamplesData: ChcDamagedsamplesResolverService}
          { path: 'chc-unsent', component: ChcUnsentSamplesComponent, pathMatch: 'full' }, // resolve:{chcunsentSamplesData: ChcUnsentSamplesResolverService}
          { path: 'chc-timeout', component: ChcTimeoutSamplesComponent, pathMatch: 'full'}, // resolve:{chctimeoutSamplesData: ChcTimeoutsamplesResolverService}
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
      { path: 'chc-sample-collection', component: ChcSampleCollectionComponent }, // resolve: {chcSampleCollectionData: ChcSampleCollectionResolverService} 
      { path: 'chc-sample-collection/:subtype', component: ChcSampleCollectionComponent }, // resolve: {chcSampleCollectionData: ChcSampleCollectionResolverService}
      { path: 'chc-pickandpack', component: ChcPicknpackComponent}, // resolve: {chcpicknpackData: ChcPicknpackResolverService}
      { path: 'chc-shipmentlog', component: ChcShipmentlogComponent }, // resolve: {chcshipmentLogData: ChcShipmentlogResolverService}
      { path: 'chc-viewshipment', component: ChcViewShipmentdetailsComponent, pathMatch: 'full'},
      { path: 'chc-viewsubjectprofile', component: ChcSubjectProfileComponent, pathMatch: 'full'},
      { path: 'chc-subjectprofile', component: ChcSubjectProfileListComponent},
      { path: 'anm-subjecttracker', component: SubjectTrackerComponent},
      { path: 'add-state', component: StateComponent, pathMatch: 'full'},
      { path: 'add-district', component: DistrictComponent, pathMatch: 'full'},
      { path: 'add-block', component: BlockComponent, pathMatch: 'full'},
      { path: 'add-chc', component: ChcComponent, pathMatch: 'full'},
      
      {
        path: 'chc-sample', component: CHCSampleRcptProComponent,
        children:[
          {path: '', component: CHCSampleRcptComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCSampleResolverService}}
        ]
      },

      {
        path: 'chcmodule-notification', component: CHCNotificationMainComponent,
        children:[
          {path: '', component: CHCSampleRcptComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCSampleResolverService}},
          {path: 'notiication-cbc-update', component: CBCCHCReceivedSampleComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCCBCupdateReceivedService}},
          /*{path: '', component: CHCSampleRcptComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCSampleResolverService}}*/
        ]
      },
      {
        path: 'central-notification', component: CentralNotificationMainComponent,
        children:[
          {path: '', component: CentralSampleRcptComponent, pathMatch: 'full', resolve: {positiveSubjects: CentrallabSampleResolverService}},
          {path: 'notification-hplc-update', component: HPLCReceivedNewComponent, pathMatch: 'full', resolve: {positiveSubjects: CentralupdateHPLCNewService}},
          {path: 'notiication-cbc-update', component: CBCCHCReceivedSampleComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCCBCupdateReceivedService}},
          /*{path: '', component: CHCSampleRcptComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCSampleResolverService}}*/
        ]
      },
      { path: 'chc-sample-pickpack', component: ChcSamplePickpackComponent}, //resolve: {chcpickpackSamplesData: ChcSamplePickpackResolverService}
      { path: 'chc-sample-shipmentlog', component: ChcSampleShipmentlogComponent}, // resolve: {chcsampleshipmentLogData: ChcSampleShipmentlogResolverService}
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
      /*{
        path: 'chc-update-cbc', component: CHCUpdateCBCComponent,
        children:[
          {path: '', component: CBCReceivedSampleComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCupdateReceivedService}},
          {path: 'upload', component: CBCUploadComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCupdateReceivedService}}
        ]
      },*/
      {
        path: 'chc-update-cbc', component: CHCUpdateCBCCHCComponent,
        children:[
          {path: '', component: CBCCHCReceivedSampleComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCCBCupdateReceivedService}},
          
        ]
      },
      {
        path: 'central-update-hplc', component: HPLCUpdateNewComponent,
        children:[
          {path: '', component: HPLCReceivedNewComponent, pathMatch: 'full', resolve: {positiveSubjects: CentralupdateHPLCNewService}},
          
        ]
      },
      /*{
        path: 'central-update-hplc', component: CentralHPLCupdateComponent,
        children:[
          {path: '', component: CentralReceivedSampleComponent, pathMatch: 'full', resolve: {positiveSubjects: CentralupdateHPLCService}},
          {path: 'upload', component: CentralHPLCUploadComponent, pathMatch: 'full', resolve: {positiveSubjects: CentralupdateHPLCService}}
        ]
      },*/
      {
        path: 'pathologist-hplc', component: DiagosisHPLCmainComponent,
        children:[
          {path: 'normal', component: DiagnosisHPLCAbnormaComponent, pathMatch: 'full', resolve: {positiveSubjects: PathoHPLCService}},
          {path: 'abnormal', component: DiagnosisHPLCAbnormaComponent, pathMatch: 'full', resolve: {positiveSubjects: PathoHPLCService}},
          {path: 'edit', component: DiagnosisHPLCAbEditComponent, pathMatch: 'full', resolve: {positiveSubjects: PathoHPLCService}},
          {path: 'report', component: DiagosisReportComponent, pathMatch: 'full', resolve: {positiveSubjects: CentralupdateHPLCService}},
          {path: 'patho', component: DiagnosisHPLCPathoComponent, pathMatch: 'full', resolve: {positiveSubjects: PathoHPLCService}},
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
        path: 'pathologist-hplc-report/:pagename', component: DiagosisReportmainComponent,
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
        path: 'centrallab-report', component: CentralLabreportSampleStatusMainComponent,
        children:[
          {path: '', component: CentralLabreportSampleStatusComponent, pathMatch: 'full', resolve: {pndtcTesting: CentralLabReportResolverService}}
        ]
      },
      {
        path: 'chc-report', component: CHCreportSampleStatusMainComponent,
        children:[
          {path: '', component: CHCreportSampleStatusComponent, pathMatch: 'full', resolve: {pndtcTesting: CHCReportResolverService}}
        ]
      },{
        path: 'patho-report', component: PathoreportSampleStatusMainComponent,
        children:[
          {path: '', component: PathoreportSampleStatusComponent, pathMatch: 'full', resolve: {pndtcTesting: PathoReportResolverService}}
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
          {path: '', component: MolecularSampleRcptComponent, pathMatch: 'full', resolve: {mlSampleData: MLSampleRcptResolverService}}
        ]
      },
      {
        path: 'molecular-report', component: ReportSampleStatusMainComponent,
        children:[
          {path: '', component: ReportSampleStatusComponent, pathMatch: 'full', resolve: {mlReport: MolucularLabReportResolverService}}
        ]
      },{
        path: 'update-molecular-result', component: UpdateMolResultMainComponent,
        children:[
          {path: '', component: UpdateMolResultComponent, pathMatch: 'full', resolve: {mlSampleData: MLUpdateMolResultResolverService}}
        ]
      },{
        path: 'update-molecular-casesheet', component: updateMolResultViewMainComponent,
        children:[
          {path: '', component: UpdateMolResultViewComponent, pathMatch: 'full'}
        ]
      },
      {
        path: 'schedule-pre-pndtc', component: PrePndtcMainComponent,
        children:[
          {path: '', component: PrePndtcToBeScheduledComponent, pathMatch: 'full', resolve: {tobeScheduling: ToBeSchedulingResolverService}},
          {path: 'scheduled', component: PrePndtcScheduledComponent, pathMatch: 'full', resolve: {preScheduled: ScheduledResolverService}}
        ]
      },
      {
        path: 'pndtc-testing', component: PndTestingMainComponent,
        children:[
          {path: '', component: pndTestingComponent, pathMatch: 'full', resolve: {pndtcTesting: PNDTCPendingResolverService}},
          {path: 'notcompleted', component: pndNotCompleteComponent, pathMatch: 'full', resolve: {pndtcTesting: PNDTCCompletedResolverService}}
        ]
      },
      {
        path: 'pndtc-testing-result', component: PndTestingResultsMainComponent,
        children:[
          {path: '', component: PNDTestingResultsComponent, pathMatch: 'full'}
        ]
      },
      {
        path: 'pndtc-summary', component: PndTestingSummaryMainComponent,
        children:[
          {path: '', component: pndTestingSummaryComponent, pathMatch: 'full', resolve: {pndtcTesting: PNDTCSummaryResolverService}}
        ]
      },
      {
        path: 'mtp-service', component: MTPServicMainComponent,
        children:[
          {path: '', component: MTPPendingComponent, pathMatch: 'full', resolve: {MTPTesting: MTPPendingResolverService}},
          {path: 'completed', component: MTPServiceCompletedComponent, pathMatch: 'full', resolve: {MTPTesting: MTPCompletedResolverService}}
        ]
      },
      {
        path: 'mtp-testing-result', component: MtpTestingResultsMainComponent,
        children:[
          {path: '', component: MTPTestingResultsComponent, pathMatch: 'full'}
        ]
      },{
        path: 'view-case-sheet', component: ViewCaseSheetMainComponent,
        children:[
          {path: '', component: ViewCaseSheetComponent, pathMatch: 'full'}
        ]
      },
      {
        path: 'mtp-summary', component: MtpTestingSummaryMainComponent,
        children:[
          {path: '', component: mtpTestingSummaryComponent, pathMatch: 'full', resolve: {mtpTestingData: MTPSummaryResolverService}}
        ]
      },
      {
        path: 'view-mtp-summary', component: MtpSummaryViewMainComponent,
        children:[
          {path: '', component: MtpSummaryViewComponent, pathMatch: 'full'}
        ]
      },
      {
        path: 'view-pndtc-summary', component: PndSummaryViewMainComponent,
        children:[
          {path: '', component: PndSummaryViewComponent, pathMatch: 'full'}
        ]
      },{
        path: 'view-Patho-report', component: ViewReportPathoMainMainComponent,
        children:[
          {path: '', component: ViewPathoReportComponent, pathMatch: 'full'}
        ]
      },{
        path: 'view-CL-report', component: ViewReportCLMainMainComponent,
        children:[
          {path: '', component: ViewCLReportComponent, pathMatch: 'full'}
        ]
      },
      
      /*{
        path: 'view-pndtc-summary', component: PndSummaryViewComponent,
      },*/
      {
        path: 'counselling-pre-pndt', component: CounsellingPrePndtMainComponent,
        children:[
          {path: '', component: ToBeCounselledComponent, pathMatch: 'full'},
          {path: 'counselledyes', component: CounselledDecisionYesComponent, pathMatch: 'full'},
          {path: 'counselledno', component: CounselledDecisionNoComponent, pathMatch: 'full'},
          {path: 'counselledawaited', component: CounselledDecisionAwaitedComponent, pathMatch: 'full'}
        ]
      },
      { path: 'update-pre-pndtc', component: UpdateDetailTestresultsComponent },
      { path: 'update-pre-pndtc-no', component: UpdateDecisionNoPndtComponent },
      { path: 'update-pre-pndtc-awaited', component: UpdateDecisionPendingPndtComponent },
      { path: 'update-pre-pndtc-yes', component: UpdateDecisionYesPndtComponent },
      {
        path: 'schedule-post-pndtc', component: SchedulePostPndtcMainComponent,
        children:[
          {path: '', component: SchedulePostPndtcToBeScheduledComponent, pathMatch: 'full', resolve: {postScheduling: PostSchedulingResolverService}},
          {path: 'scheduled', component: SchedulePostPndtcScheduledComponent, pathMatch: 'full', resolve: {postScheduled: PostScheduledResolverService}},
        ]
      },
      {
        path: 'counselling-post-pndt', component: CounsellingPostPndtMainComponent,
        children:[
          {path: '', component: ToBePostPndtCounselledComponent, pathMatch: 'full'},
          {path: 'counselledyes', component: PostCounsellingDecisionYesComponent, pathMatch: 'full'},
          {path: 'counselledno', component: PostCounsellingDecisionNoComponent, pathMatch: 'full'},
          {path: 'counselledawaited', component: PostCounsellingDecisionPendingComponent, pathMatch: 'full'}
        ]
      },
      { path: 'update-post-pndtc', component: PostPndtcTestresultsComponent },
      { path: 'update-post-pndtc-no', component: PostPndtcDecisionNoComponent },
      { path: 'update-post-pndtc-awaited', component: PostPndtcDecisionAwaitedComponent },
      { path: 'update-post-pndtc-yes', component: PostPndtcDecisionYesComponent },

      { path: 'anm-sample-collection', component: SampleCollectionComponent }, // resolve: {sampleCollectionData: SampleCollectionResolverService}
      { path: 'anm-sample-collection/:subtype', component: SampleCollectionComponent }, // resolve: {sampleCollectionData: SampleCollectionResolverService}
      //{ path: 'test/:id', component: AboutComponent }
      { path: 'anm-pickpack', component: AnmPickandPackComponent },  // resolve: {picknpackData: PicknpackResolverService}
      { path: 'anm-shipment', component: AnmShipmentComponent }, // resolve: {shipmentLogData: ShipmentlogResolverService }
      { path: 'anm-viewsubjectprofile', component: AnmSubjectProfileComponent, pathMatch: 'full'},
      { path: 'chc-reg-viewsubjectprofile', component: AnmChcSubjectProfileComponent, pathMatch: 'full'},
      { path: 'anm-subprofile', component: AnmSubjectProfileListComponent },
      { path: 'anm-viewshipment', component: AnmViewShipmentdetailsComponent, pathMatch: 'full'},
      {path: 'anm-profiletracking', component: AnmSubjectProfileTrackingComponent},
      { path: 'dc-notification', component: DistrictCoordinatorMainComponent,
      children:[
        {path: '', component: DamagedSamplesComponent, pathMatch: 'full'},
        {path: 'unsent-samples', component: UnsentSamplesComponent, pathMatch: 'full'},
        {path: 'sample-timeout', component: SampleTimeoutComponent, pathMatch: 'full'},
        {path: 'positive-subjects', component: PositiveSubjectsComponent, pathMatch: 'full'},
        {path: 'pndt-referral', component: PndtReferralComponent, pathMatch: 'full'},
        {path: 'mtp-referral', component: MtpReferralComponent, pathMatch: 'full'},
        {path: 'postmtp-follow-up', component: PostMtpFollowupComponent, pathMatch: 'full'}
      ]
      },
      
     
    ]
  },

  { path: '', redirectTo: '/home/login', pathMatch: 'full' },
  // { path: 'notfound', component: NotfoundComponent },
  { path: 'pageunderconstruction', component: PageUnderDevelopementComponent },
  { path: '**', redirectTo: '/pageunderconstruction' },
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
  AboutUsComponent,
  AboutProgramComponent,
  ImportantLinksComponent,
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
  AnmSubjectProfileListComponent,
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
  ChcStartPickpackComponent,
  ChcSubjectProfileListComponent,
  DiagnosisHPLCAbEditComponent,
  PrePndtcMainComponent,
  PrePndtcToBeScheduledComponent,
  PrePndtcScheduledComponent,
  PndTestingMainComponent,
  pndTestingComponent,
  PndTestingResultsMainComponent,
  PNDTestingResultsComponent,
  pndNotCompleteComponent,
  UpdateDetailTestresultsComponent,
  UpdateDecisionNoPndtComponent,
  UpdateDecisionYesPndtComponent,
  UpdateDecisionPendingPndtComponent,
  SchedulePostPndtcMainComponent,
  SchedulePostPndtcScheduledComponent,
  SchedulePostPndtcToBeScheduledComponent,
  PndTestingSummaryMainComponent,
  pndTestingSummaryComponent,
  PndSummaryViewComponent,
  PndSummaryViewMainComponent,
  CounsellingPostPndtMainComponent,
  ToBePostPndtCounselledComponent,
  PostPndtcTestresultsComponent,
  PostCounsellingDecisionYesComponent,
  PostCounsellingDecisionNoComponent,
  PostCounsellingDecisionPendingComponent,
  PostPndtcDecisionYesComponent,
  MTPServicMainComponent,
  MTPPendingComponent,
  MTPServiceCompletedComponent,
  MTPTestingResultsComponent,
  MtpTestingResultsMainComponent,
  MtpTestingSummaryMainComponent,
  mtpTestingSummaryComponent,
  MtpSummaryViewMainComponent,
  MtpSummaryViewComponent,
  PostPndtcDecisionNoComponent,
  PostPndtcDecisionAwaitedComponent,
  DistrictCoordinatorMainComponent,
  DamagedSamplesComponent,
  UnsentSamplesComponent,
  SampleTimeoutComponent,
  PositiveSubjectsComponent,
  PndtReferralComponent,
  MtpReferralComponent,
  PostMtpFollowupComponent,
  ReportSampleStatusComponent,
  ReportSampleStatusMainComponent,
  UpdateMolResultComponent,
  UpdateMolResultMainComponent,
  ViewCaseSheetComponent,
  ViewCaseSheetMainComponent,
  CentralLabreportSampleStatusComponent,
  CentralLabreportSampleStatusMainComponent,
  CHCreportSampleStatusComponent,
  CHCreportSampleStatusMainComponent,
  updateMolResultViewMainComponent,
  UpdateMolResultViewComponent,
  CHCUpdateCBCCHCComponent,
  CBCCHCReceivedSampleComponent,
  HPLCUpdateNewComponent,
  HPLCReceivedNewComponent,
  DiagosisReportComponent1,
  GetOtpComponent,
  ChcSubjectProfileComponent,
  AnmChcSubjectProfileComponent,
  PathoreportSampleStatusComponent,
  PathoreportSampleStatusMainComponent,
  ViewReportPathoMainMainComponent,
  ViewPathoReportComponent,
  ResetLoginComponent,
  CHCNotificationMainComponent,
  AnmSubjectProfileTrackingComponent,
  ViewCLReportComponent,
  ViewReportCLMainMainComponent,
  SubjectTrackerComponent,
  CentralNotificationMainComponent,
  StateComponent,
  DistrictComponent,
  BlockComponent,
  ChcComponent,
  DiagnosisHPLCPathoComponent

];


