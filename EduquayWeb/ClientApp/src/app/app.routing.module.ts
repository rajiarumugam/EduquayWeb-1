import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
//import { CounsellorreportListComponent } from "./pndtc/counsellor-report-list/counsellor-report-list.component";
//import { HomeHeaderComponent } from './_layout/home-header/home-header.component';
//import { HomeLayoutComponent } from './_layout/home-layout/home-layout.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
//import { DistrictreportListComponent } from "./district-coordinator/district-report-list/district-report-list.component";
import { DashboardComponent } from './dashboard/dashboard.component';
/*import { PathoreportSampleStatusMainPrintComponentDC } from "./district-coordinator/repot-patho-sample-status/patho-repot-sample-status-print-main/patho-repot-sample-status-print-main.component";
import { PathoreportSampleStatusPrintComponentDC } from "./district-coordinator/repot-patho-sample-status/patho-repot-sample-status-print/patho-repot-sample-status-print.component";*/
import { PathoreportSampleStatusPrintComponentANM } from "./anm-module/repot-patho-sample-status/patho-repot-sample-status-print/patho-repot-sample-status-print.component";
import { PathoreportSampleStatusMainPrintComponentANM } from "./anm-module/repot-patho-sample-status/patho-repot-sample-status-print-main/patho-repot-sample-status-print-main.component";
import { CounsellorPhcreportListComponent } from "./pndtc/counsellor-phc-report-list/counsellor-phc-report-list.component";
//import { CounterComponent } from "./counter/counter.component";
//import { FetchDataComponent } from "./fetch-data/fetch-data.component";
//import { LoginComponent } from "./auth/login/login.component";
//import { HplcLoginComponent } from './auth/hplclogin/hplclogin.component';
import { NotfoundComponent } from "./notfound/notfound.component";
import { AuthGuard } from "./shared/auth.guard";
//import { SiteSidebarComponent } from "./_layout/site-sidebar/site-sidebar.component";

import { SampleCollectionComponent } from "./anm-module/sample-collection/sample-collection.component";
/*import { AnmNotificationComponent } from "./anm-module/anm-notification/anm-notification.component";
import { AnmDamagedSamplesComponent } from './anm-module/anm-damaged-samples/anm-damaged-samples.component';
import { AnmUnsentSamplesComponent } from './anm-module/anm-unsent-samples/anm-unsent-samples.component';
import { AnmTimeoutSamplesComponent } from './anm-module/anm-timeout-samples/anm-timeout-samples.component';
import { AnmPositiveSubjectsComponent } from './anm-module/anm-positive-subjects/anm-positive-subjects.component';
import { AnmPndReferralComponent } from './anm-module/anm-pnd-referral/anm-pnd-referral.component';
import { AnmMtpReferralComponent } from './anm-module/anm-mtp-referral/anm-mtp-referral.component';
import { AnmUpdateChcComponent } from './anm-module/anm-update-chc/anm-update-chc.component';*/

/*import { AnmSubjectRegistrationComponent } from "./anm-module/registration/anm-subject-registration/anm-subject-registration.component";
import { AnmAwRegistrationComponent } from "./anm-module/registration/anm-aw-registration/anm-aw-registration.component";
import { AnmSpouseRegistrationComponent } from "./anm-module/registration/anm-spouse-registration/anm-spouse-registration.component";
import { AnmStudentRegistrationComponent } from "./anm-module/registration/anm-student-registration/anm-student-registration.component";*/
//import { AnmWalkinLt18RegistrationComponent } from "./anm-module/registration/anm-walkin-lt18-registration/anm-walkin-lt18-registration.component";
//import { AnmWalkinGt18RegistrationComponent } from "./anm-module/registration/anm-walkin-gt18-registration/anm-walkin-gt18-registration.component";
//import { AnmUpdateChcComponent } from './anm-module/anm-update-chc/anm-update-chc.component';
//import { AnmAwRegistrationComponent } from "./anm-module/registration/anm-aw-registration/anm-aw-registration.component";
// import { AnmAwRegistrationComponent } from "./registration/anm-aw-registration/anm-aw-registration.component";
import { AnmPickandPackComponent } from './anm-module/anm-pickandpack/anm-pickandpack.component';
import { AnmShipmentComponent } from './anm-module/anm-shipment/anm-shipment.component';
//import { AnmSubjectProfileComponent } from './anm-module/anm-subject-profile/anm-subject-profile.component';
import { AnmViewShipmentdetailsComponent } from "./anm-module/anm-view-shipmentdetails/anm-view-shipmentdetails.component";
import { SampleCollectionResolverService } from "./shared/anm-module/sample-collection-resolver.service";
import { ShipmentlogResolverService } from "./shared/anm-module/shipmentlog/shipmentlog-resolver.service";
import { PicknpackResolverService } from "./shared/anm-module/picnpack/picknpack-resolver.service";
import { DamagedSamplesResolverService } from "./shared/anm-module/notifications/damaged-samples/damaged-samples-resolver.service";


import { CounsellorMtpreportListComponent } from "./pndtc/counsellor-mtp-report-list/counsellor-mtp-report-list.component";
import { HPLCComponent } from "./admin/hplc/hplc.component";
import { BlockSubjectRegistrationComponent } from './chc-module/registration/block-subject-registration/block-subject-registration.component';
import { WalkinRegistrationComponent } from './chc-module/registration/walkin-registration/walkin-registration.component';
//import { ChcpregnantRegistrationComponent } from "./chc-module/registration/shared/pregnant-registration/pregnant-registration.component";
//import { ChcStudentRegistrationComponent } from "./chc-module/registration/shared/chc-student-registration/chc-student-registration.component";
//import { CheSpouseRegistrationComponent } from "./chc-module/registration/shared/che-spouse-registration/che-spouse-registration.component";
//import { ChcwalkinRegistrationComponent } from "./chc-module/registration/shared/walk-in-registration/walk-in-registration.component";
//import { AssociatedANMComponent } from "./chc-module/registration/shared/associated-anm/associated-anm.component";
import { from } from "rxjs";
import { SpouseResolverService } from "./shared/anm-module/registration/spouse/spouse-resolver.service";
import { CHCSampleResolverService } from "./shared/chc-sample/chc-sample-resolver.service";
import { CHCPickAndPackResolverService } from "./shared/centrallab/central-pickandpack-resolver.service";
import { TimeoutExpiryResolverService } from "./shared/anm-module/notifications/timeout-expiry/timeout-expiry-resolver.service";
import { UnsentSamplesResolverService } from "./shared/anm-module/notifications/unsent-samples/unsent-samples-resolver.service";
//import { ChcSampleCollectionComponent } from "./chc-module/chc-sample-collection/chc-sample-collection.component";

import { CHCSampleRcptComponent } from "./chc-sample-module/chc-sample-rec/chc-sample-rec.component";
import { CHCSampleRcptProComponent } from "./chc-sample-module/chc-sample-rcpt-pro/chc-sample-rcpt-pro.component";
import { CHCUpdateCBCComponent } from "./chc-sample-module/cbc-update/chc-update-cbc/chc-update-cbc.component";
import { CBCReceivedSampleComponent } from "./chc-sample-module/cbc-update/chc-update-cbc-received/chc-update-cbc-received.component";
import { CBCUploadComponent } from "./chc-sample-module/cbc-update/chc-update-cbc-upload/chc-update-cbc-upload.component";
//import { AnmPostMtpFollowupComponent } from "./anm-module/anm-post-mtp-followup/anm-post-mtp-followup.component";
import { CHCupdateReceivedService } from "./shared/chc-sample/chc-update-cbc-resolver.service";
import { PositiveSubjectsResolverService } from "./shared/anm-module/positive-subjects/positive-subjects-resolver.service";
import {  CHCCBCupdateReceivedService } from "./shared/chc-sample/chc-update-cbc-chc-resolver.service";
import { AnmStudentRegistrationComponent } from "./anm-module/registration/anm-student-registration/anm-student-registration.component";
// import { AnmStudentRegistrationComponent } from "./registration/anm-student-registration/anm-student-registration.component";
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
//import { ChcSubjectProfileComponent } from "./chc-module/chc-subject-profile/chc-subject-profile.component";
//import { ChcNotificationComponent } from "./chc-module/chc-notification/chc-notification/chc-notification.component";
//import { ChcDamagedSamplesComponent } from "./chc-module/chc-notification/chc-damaged-samples/chc-damaged-samples.component";
//import { ChcUnsentSamplesComponent } from "./chc-module/chc-notification/chc-unsent-samples/chc-unsent-samples.component";
//import { ChcTimeoutSamplesComponent } from "./chc-module/chc-notification/chc-timeout-samples/chc-timeout-samples.component";
import { ChcDamagedsamplesResolverService } from "./shared/chc-module/chc-damagedsamples-resolver.service";
import { ChcUnsentSamplesResolverService } from "./shared/chc-module/chc-unsent-samples/chc-unsent-samples-resolver.service";
import { ChcTimeoutsamplesResolverService } from "./shared/chc-module/chc-timeoutsamples-resolver.service";
//import { ChcPositiveSubjectComponent } from "./chc-module/chc-notification/chc-positive-subject/chc-positive-subject.component";
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

/*import { MolecularSampleRcptMainComponent } from "./molecular-lab/sample-rcpt/molecular-sample-rcpt-main/molecular-sample-rcpt-main.component";
import { MolecularSampleRcptComponent } from "./molecular-lab/sample-rcpt/molecular-sample-rec/molecular-sample-rec.component";*/
import { ChcSamplePickpackComponent } from "./chc-sample-module/chc-sample-pickpack/chc-sample-pickpack.component";
//import { CheSpouseComponent } from "./shared/chc-module/che-spouse/che-spouse.component";
//import { AnmSpouseComponent } from "./shared/anm-module/registration/anm-spouse/anm-spouse.component";

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
import { StatereportListComponent } from "./pathologist/state-report-list/state-report-list.component";
import { CentralShipmentMainComponent } from "./central-lab/shipment-log/central-shipment-log-main/central-shipment-log-main.component";
import { CentralCentralShipmentComponent } from "./central-lab/shipment-log/central-shipment-log/central-shipment-log.component";
import { ChcSampleViewShipmentComponent } from "./chc-sample-module/chc-sample-view-shipment/chc-sample-view-shipment.component";
// import { ChcPendingPickpackComponent } from "./chc-sample-module/chc-sample-pickpack/chc-pending-pickpack/chc-pending-pickpack.component";
import { ChcStartPickpackComponent } from "./chc-sample-module/chc-sample-pickpack/chc-start-pickpack/chc-start-pickpack.component";
import { ChcPendingPickpackComponent } from "./chc-sample-module/chc-sample-pickpack/chc-pending-pickpack/chc-pending-pickpack.component";
import { PageUnderDevelopementComponent } from "./page-under-developement/page-under-developement.component";
//import { AboutUsComponent } from "./landing-page/about-us/about-us.component";
//import { AboutProgramComponent } from "./landing-page/about-program/about-program.component";
//import { ImportantLinksComponent } from "./landing-page/important-links/important-links.component";
//import { ChcSubjectProfileListComponent } from "./chc-module/chc-subject-profile-list/chc-subject-profile-list.component";
import { AnmSubjectProfileListComponent } from "./anm-module/anm-subject-profile-list/anm-subject-profile-list.component";
//import { PrePndtcMainComponent } from "./pndtc/schedule/pre-pndtc-main/pre-pndtc-main.component";
//import { PrePndtcToBeScheduledComponent } from "./pndtc/schedule/pre-pndtc-to-be-scheduled/pre-pndtc-to-be-scheduled.component";
//import { PrePndtcScheduledComponent } from "./pndtc/schedule/pre-pndtc-scheduled/pre-pndtc-scheduled.component";
//import { CounsellingPrePndtMainComponent } from "./pndtc/counselling-pre-pndt/counselling-pre-pndt-main/counselling-pre-pndt-main.component";
//import { ToBeCounselledComponent } from "./pndtc/counselling-pre-pndt/to-be-counselled/to-be-counselled.component";
//import { CounselledDecisionYesComponent } from "./pndtc/counselling-pre-pndt/counselled-decision-yes/counselled-decision-yes.component";
//import { CounselledDecisionNoComponent } from "./pndtc/counselling-pre-pndt/counselled-decision-no/counselled-decision-no.component";
//import { CounselledDecisionAwaitedComponent } from "./pndtc/counselling-pre-pndt/counselled-decision-awaited/counselled-decision-awaited.component";
import { UpdateDetailTestresultsComponent } from "./pndtc/counselling-pre-pndt/update-detail-testresults/update-detail-testresults.component";
import { UpdateDecisionNoPndtComponent } from "./pndtc/counselling-pre-pndt/update-decision-no-pndt/update-decision-no-pndt.component";
import { UpdateDecisionYesPndtComponent } from "./pndtc/counselling-pre-pndt/update-decision-yes-pndt/update-decision-yes-pndt.component";
import { UpdateDecisionPendingPndtComponent } from "./pndtc/counselling-pre-pndt/update-decision-pending-pndt/update-decision-pending-pndt.component";
//import { SchedulePostPndtcMainComponent } from "./pndtc/schedule-post-pndtc/schedule-post-pndtc-main/schedule-post-pndtc-main.component";
//import { SchedulePostPndtcScheduledComponent } from "./pndtc/schedule-post-pndtc/schedule-post-pndtc-scheduled/schedule-post-pndtc-scheduled.component";
//import { SchedulePostPndtcToBeScheduledComponent } from "./pndtc/schedule-post-pndtc/schedule-post-pndtc-to-be-scheduled/schedule-post-pndtc-to-be-scheduled.component";
//import { CounsellingPostPndtMainComponent } from "./pndtc/counselling-post-pndt/counselling-post-pndt-main/counselling-post-pndt-main.component";
//import { ToBePostPndtCounselledComponent } from "./pndtc/counselling-post-pndt/to-be-post-pndt-counselled/to-be-post-pndt-counselled.component";
import { PostPndtcTestresultsComponent } from "./pndtc/counselling-post-pndt/post-pndtc-testresults/post-pndtc-testresults.component";
//import { PostCounsellingDecisionYesComponent } from "./pndtc/counselling-post-pndt/post-counselling-decision-yes/post-counselling-decision-yes.component";
//import { PostCounsellingDecisionNoComponent } from "./pndtc/counselling-post-pndt/post-counselling-decision-no/post-counselling-decision-no.component";
//import { PostCounsellingDecisionPendingComponent } from "./pndtc/counselling-post-pndt/post-counselling-decision-pending/post-counselling-decision-pending.component";
import { PostPndtcDecisionYesComponent } from "./pndtc/counselling-post-pndt/post-pndtc-decision-yes/post-pndtc-decision-yes.component";

//import { PndTestingMainComponent } from "./pndtc/pnd-testing/pnd-testing-main/pnd-testing-main.component";
//import { pndTestingComponent } from './pndtc/pnd-testing/pnd-testing/pnd-testing.component';
//import { PNDTCPendingResolverService } from "./shared/pndtc/pndtc-pending-resolver.service";
//import { PNDTCCompletedResolverService } from "./shared/pndtc/pndtc-completed-resolver.service";

import { PndTestingResultsMainComponent } from "./pndtc/pnd-testing/pnd-testing-results-main/pnd-testing-results-main.component";
import { PNDTestingResultsComponent } from "./pndtc/pnd-testing/pnd-testing-results/pnd-testing-results.component";
//import { pndNotCompleteComponent } from "./pndtc/pnd-testing/pnd-not-complete/pnd-not-complete.component";
import { PostPndtcDecisionNoComponent } from "./pndtc/counselling-post-pndt/post-pndtc-decision-no/post-pndtc-decision-no.component";
import { PostPndtcDecisionAwaitedComponent } from "./pndtc/counselling-post-pndt/post-pndtc-decision-awaited/post-pndtc-decision-awaited.component";

//import { PndTestingSummaryMainComponent } from "./pndtc/pnd-testing/pnd-testing-summary-main/pnd-testing-summary-main.component";
//import { pndTestingSummaryComponent } from "./pndtc/pnd-testing/pnd-testing-summary/pnd-testing-summary.component";
//import { PNDTCSummaryResolverService } from "./shared/pndtc/pndtc-summary-resolver.service";
import { PndSummaryViewComponent } from "./pndtc/pnd-testing/pnd-testing-summary-view/pnd-testing-summary-view.component";
import { PndSummaryViewMainComponent } from "./pndtc/pnd-testing/pnd-testing-summary-view-main/pnd-testing-summary-view-main.component";
import { CounsellorChcreportListComponent } from "./pndtc/counsellor-chc-report-list/counsellor-chc-report-list.component";
/*import { MTPServicMainComponent } from "./mtp/mtp-service/mtp-service-main/mtp-service-main.component";
import { MTPPendingComponent } from "./mtp/mtp-service/mtp-sevice-pending/mtp-sevice-pending.component";
import { MTPServiceCompletedComponent } from "./mtp/mtp-service/mtp-sevice-completed/mtp-sevice-completed.component";
import { MTPPendingResolverService } from "./shared/mtp/mtp-pending-resolver.service";
import { MTPCompletedResolverService } from "./shared/mtp/mtp-completed-resolver.service";*/
import { MTPTestingResultsComponent } from "./mtp/mtp-service/mtp-testing-results/mtp-testing-results.component";
import { MtpTestingResultsMainComponent } from "./mtp/mtp-service/mtp-testing-results-main/mtp-testing-results-main.component";
//import { MtpTestingSummaryMainComponent } from "./mtp/mtp-service/mtp-testing-summary-main/mtp-testing-summary-main.component";
//import { mtpTestingSummaryComponent } from "./mtp/mtp-service/mtp-testing-summary/mtp-testing-summary.component";
import { MTPSummaryResolverService } from "./shared/mtp/mtp-summary-resolver.service";
import { MtpSummaryViewMainComponent } from "./mtp/mtp-service/mtp-testing-summary-view-main/mtp-testing-summary-view-main.component";
import { MtpSummaryViewComponent } from "./mtp/mtp-service/mtp-testing-summary-view/mtp-testing-summary-view.component";
/*import { DistrictCoordinatorMainComponent } from "./district-coordinator/district-coordinator-main/district-coordinator-main.component";
import { DamagedSamplesComponent } from "./district-coordinator/damaged-samples/damaged-samples.component";
import { UnsentSamplesComponent } from "./district-coordinator/unsent-samples/unsent-samples.component";
import { SampleTimeoutComponent } from "./district-coordinator/sample-timeout/sample-timeout.component";
import { PositiveSubjectsComponent } from "./district-coordinator/positive-subjects/positive-subjects.component";
import { PndtReferralComponent } from "./district-coordinator/pndt-referral/pndt-referral.component";
import { MtpReferralComponent } from "./district-coordinator/mtp-referral/mtp-referral.component";
import { PostMtpFollowupComponent } from "./district-coordinator/post-mtp-followup/post-mtp-followup.component";
*/

/*import { ReportSampleStatusComponent } from "./molecular-lab/repot-sample-status/repot-sample-status/repot-sample-status.component";
import { ReportSampleStatusMainComponent } from "./molecular-lab/repot-sample-status/repot-sample-status-main/repot-sample-status-main.component";*/
import { UpdateMolResultComponent } from "./molecular-lab/update-mol-result/update-mol-result/update-mol-result.component";
import { UpdateMolResultMainComponent } from "./molecular-lab/update-mol-result/update-mol-result-main/update-mol-result-main.component";

import { ViewCaseSheetComponent } from "./molecular-lab/view-case-sheet/view-case-sheet/view-case-sheet.component";
import { ViewCaseSheetMainComponent } from "./molecular-lab/view-case-sheet/view-case-sheet-main/view-case-sheet-maincomponent";
import { AVDComponent } from "./admin/avd/avd.component";

// import { UserRoleComponent } from "./admin/User-role/User-role.component";

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
//import { ScheduledResolverService } from "./shared/pndtc/schedule-pre-pndtc/scheduled-resolver.service";
//import { PostSchedulingResolverService } from "./shared/pndtc/schedule-post-pndtc/post-scheduling-resolver.service";
//import { PostScheduledResolverService } from "./shared/pndtc/schedule-post-pndtc/post-scheduled-resolver.service";

import { HPLCUpdateNewComponent } from "./central-lab/HPLC-update-new/HPLC-update-new/HPLC-update-new.component";
import { HPLCReceivedNewComponent } from './central-lab/HPLC-update-new/HPLC-update-new-received/HPLC-update-new-received.component';
import { CHCUpdateCBCCHCComponent } from "./chc-sample-module/cbc-update-chc/chc-update-cbc-chc/chc-update-cbc-chc.component";
import { CBCCHCReceivedSampleComponent } from "./chc-sample-module/cbc-update-chc/chc-update-cbc-received/chc-update-cbc-chc-received.component";
//import { GetOtpComponent } from "./auth/forgot-password/get-otp/get-otp.component";
//import { AnmChcSubjectProfileComponent } from "./shared/anm-module/anm-chc-subject-profile/anm-chc-subject-profile.component";

import { PathoreportSampleStatusComponent } from "./pathologist/repot-sample-status/patho-repot-sample-status/patho-repot-sample-status.component";
import { PathoreportSampleStatusMainComponent } from './pathologist/repot-sample-status/patho-repot-sample-status-main/patho-repot-sample-status-main.component';
import { PathoReportResolverService } from "./shared/pathologist/patho-report-resolver.service";
import { PathoReportPrintResolverService } from "./shared/pathologist/patho-report-print-resolver.service";
import { ViewPathoReportComponent } from "./pathologist/view-report-sample/view-report-sample/view-report-sample.component";
import { ViewReportPathoMainMainComponent } from "./pathologist/view-report-sample/view-report-sample-main/view-report-sample-main.component";
//import { ResetLoginComponent } from "./auth/reset-login/reset-login/reset-login.component";

import { CHCNotificationMainComponent } from "./chc-sample-module/chc-notification/chc-notification-main/chc-notification-main.component";
import { AnmSubjectProfileTrackingComponent } from "./anm-module/anm-subject-profile-tracking/anm-subject-profile-tracking.component";

import { ViewCLReportComponent } from "./central-lab/view-report-sample/cl-view-report-sample/cl-view-report-sample.component";
import { ViewReportCLMainMainComponent } from "./central-lab/view-report-sample/cl-view-report-sample-main/cl-view-report-sample-main.component";
import { SubjectTrackerComponent } from "./anm-module/subject-tracker/subject-tracker.component";
 import { MTPComponent } from "./admin/mtp/mtp.component";
import { CentralNotificationMainComponent } from "./central-lab/central-notification/central-notification-main/central-notification-main.component";
// import { StateComponent } from "./admin/state/state.component";
import { DistrictComponent } from "./admin/district/district.component";
import { BlockComponent } from "./admin/block/block.component";
import { ChcComponent } from "./admin/chc/chc.component";
import { DiagnosisHPLCPathoComponent } from "./pathologist/diagnosis/diagnosis-hplc-patho/diagnosis-hplc-patho.component";
import { PhcComponent } from "./admin/phc/phc.component";
import { ScComponent } from "./admin/sc/sc.component";
import { RiPointComponent } from "./admin/ri-point/ri-point.component";
import { GvtIdTypeComponent } from "./admin/gvt-id-type/gvt-id-type.component";
//import { DiagnosisHPLCPathoComponent } from "./pathologist/diagnosis/diagnosis-hplc-patho/diagnosis-hplc-patho.component";
import { AnmSpouseRegistrationComponent } from "./anm-module/registration/anm-spouse-registration/anm-spouse-registration.component";
// import { AnmSpouseRegistrationComponent } from "./registration/anm-spouse-registration/anm-spouse-registration.component";
import { NHMreportListComponent } from "./nhm/nhm-report-list/nhm-report-list.component";
// import { UserTypeComponent } from "./admin/user-type/user-type.component";

import { PathoreportSampleStatusMainPrintComponent } from "./pathologist/repot-patho-sample-status/patho-repot-sample-status-print-main/patho-repot-sample-status-print-main.component";

import { UsersComponent } from "./admin/users/users.component";
// import { AdminUsersListComponent } from "./admin/admin-users-list/admin-users-list.component";

import { PathoreportSampleStatusPrintComponent } from "./pathologist/repot-patho-sample-status/patho-repot-sample-status-print/patho-repot-sample-status-print.component";


import { PathoreportSampleStatusMainPrintComponentNHM } from "./nhm/repot-patho-sample-status/patho-repot-sample-status-print-main/patho-repot-sample-status-print-main.component";

import { PathoreportSampleStatusPrintComponentNHM } from "./nhm/repot-patho-sample-status/patho-repot-sample-status-print/patho-repot-sample-status-print.component";

import { ANMreportListComponent } from "./anm-module/anm-report-list/anm-report-list.component";
import { AnmReportProfileComponent } from "./anm-module/anm-report-view-profile/anm-report-view-profile.component";
import { CHCreportListComponent } from "./chc-module/chc-report-list/chc-report-list.component";


/*import { CSVspecimenComponent } from "./pndtc/counselling-pre-pndt/csv-specimen/csv-specimen.component";
import { CSVSpecimenMainComponent } from "./pndtc/counselling-pre-pndt/csv-specimen-main/csv-specimen-main.component";
import { CSVspecimenStartComponent } from "./pndtc/counselling-pre-pndt/csv-specimen-start/csv-specimen-start.component";*/

import { ScheduleShipmentMainComponent } from "./pndtc/shipment-log/schedule-shipment-log-main/schedule-shipment-log-main.component";
import { ScheduleShipmentComponent } from "./pndtc/shipment-log/schedule-shipment-log/schedule-shipment-log.component";
import { pndtcShipmentResolverService } from  "./shared/pndtc/shipment-resolver.service";

/*import { MolecularSampleRcptCVCComponent } from "./molecular-lab/sample-rcpt-cvs/molecular-sample-rec-cvc/molecular-sample-rec-cvc.component";
import { MolecularSampleRcptCVCMainComponent } from "./molecular-lab/sample-rcpt-cvs/molecular-sample-rcpt-cvc-main/molecular-sample-rcpt-cvc-main.component";*/
import { MLSampleRcptCSVResolverService } from "./shared/molecularlab/ml-sample-rcpt-csv-resolver.servic";
import { ViewResultMLComponent } from "./molecular-lab-results/hplc-pos-bloodsamples/view-results-ML/view-results-ML.component";

//import { UpdatePregnacyMainComponent } from "./Haematologist/update-pregnacy-main/update-pregnacy-main.component";
//import { UpdatePregnacyComponent } from "./Haematologist/update-pregnacy/update-pregnacy.component";
import { UpdatePregnacyTestresultsComponent } from "./Haematologist/update-pregnacy-testresults/update-pregnacy-testresults.component";

import { BarcodeCorrectionMainComponent } from "./errorcorrection/barcode-correction/barcode-correction-main/barcode-correction-main.component";
import { BarcodeCorrectionComponent } from "./errorcorrection/barcode-correction/barcode-correction/barcode-correction.component";
import { errorcodeResolverService } from "./shared/errorcorrection/errorcode-resolver.service";
import { BarcodePendingComponent } from "./errorcorrection/barcode-correction/barcode-pending/barcode-pending.component";

import { RCHCorrectionMainComponent } from "./errorcorrection/rch/rch-correction-main/rch-correction-main.component";
import { RCHCorrectionComponent } from "./errorcorrection/rch/rch-correction/rch-correction.component";

import { LMPCorrectionMainComponent } from "./errorcorrection/lmp/lmp-correction-main/lmp-correction-main.component";
import { LMPCorrectionComponent} from "./errorcorrection/lmp/lmp-correction/lmp-correction.component";
import { SSTCorrectionComponent } from "./errorcorrection/sst/sst-correction/sst-correction.component";
import { SSTCorrectionMainComponent } from "./errorcorrection/sst/sst-correction-main/sst-correction-main.component";

import { LMPReportComponent } from "./errorreport/lmp/lmp-report/lmp-report.component";
import { LMPReportMainComponent} from "./errorreport/lmp/lmp-report-main/lmp-report-main.component";
import { BarcodeReportComponent } from "./errorreport/barcode/barcode-report/barcode-report.component";
import { BarcodeReportMainComponent } from "./errorreport/barcode/barcode-report-main/barcode-report-main.component";
import { RCHReportComponent } from "./errorreport/rch/rch-report/rch-report.component";
import { RCHReportMainComponent } from "./errorreport/rch/rch-report-main/rch-report-main.component";
import { SSTReportComponent } from "./errorreport/sst/sst-report/sst-report.component";

import { SSTReportMainComponent } from "./errorreport/sst/sst-report-main/sst-report-main.component";
//import { HPLCReportsMainComponent } from "./molecular-lab-results/hplc-pos-bloodsamples/hplc-pos-bloodsamples-reports-print-main/hplc-pos-bloodsamples-reports-print-main.component";
//import { CVSReportsMainComponent } from "./molecular-lab-results/cvs-specimen/cvs-specimen-reports-print-main/cvs-specimen-reports-print-main.component";
//import { CVSPosPrintComponent } from "./molecular-lab-results/cvs-specimen/cvs-specimen-reports-print/cvs-specimen-reports-print.component";


//import { BlockAwRegistrationComponent } from "./anm-module/block-registration/block-aw-registration/block-aw-registration.component";
//import { BlockSubjecttRegistrationComponent } from "./anm-module/block-registration/block-subject-registration/block-subject-registration.component";
//import { BlockStudentRegistrationComponent } from "./anm-module/block-registration/block-student-registration/block-student-registration.component";
//import { blockSpouseRegistrationComponent } from './anm-module/block-registration/block-spouse-registration/block-spouse-registration.component';

import { NHMScreenRegistrationComponent } from "./anm-module/nhm-monthly-indicators/nhm-screen-registration/nhm-screen-registration.component";


import { BlockSampleCollectionComponent } from './anm-module/block-sample-collection/block-sample-collection.component';
import { BlockPicknpackComponent } from "./anm-module/block-picknpack/block-picknpack.component";
import { BlockShipmentComponent } from "./anm-module/block-shipment/block-shipment.component";

import { CHCRegnreportListComponent } from "./nhm/chc-report-list/chc-report-list.component";
import { CentralLabRegnreportListComponent } from "./nhm/cl-report-list/cl-report-list.component";

import { UploadMainComponent } from "./upload/upload-main/upload-main.component";
import { CHCUploadComponent } from "./upload/chc-upload/chc-upload.component";
import { HPLCUploadComponent } from "./upload/hplc-upload/hplc-upload.component";
import { PathoreportListComponent } from "./pathologist/patho-report-list/patho-report-list.component";
import { IlrComponent } from "./admin/ilr/ilr.component";
import { TestComponent } from "./test/test.component";
import { UploadSAMainComponent } from './shared/admin/sa-upload/upload-sa-main/upload-sa-main.component';
import { SAUploadComponent } from "./shared/admin/sa-upload/sa-upload-file/sa-upload-file.component";


//import { CommonDataTableComponent } from "./shared/common-data-table/common-data-table.component";

//import { MTPreportListComponent } from "./mtp/mtp-report-list/mtp-report-list.component";




/*import { MlrNotificationComponent } from "./molecular-lab-results/hplc-pos-bloodsamples/mlr-notification/mlr-notification.component";
import { UpdateResultsComponent } from "./molecular-lab-results/hplc-pos-bloodsamples/update-results/update-results.component";
import { EditResultsComponent } from "./molecular-lab-results/hplc-pos-bloodsamples/edit-results/edit-results.component";
import { ConfirmedResultsComponent } from "./molecular-lab-results/hplc-pos-bloodsamples/confirmed-results/confirmed-results.component";
import { HPLCPosPrintComponent } from "./molecular-lab-results/hplc-pos-bloodsamples/hplc-pos-bloodsamples-reports-print/hplc-pos-bloodsamples-reports-print.component";*/


/*import { CvsNotificationComponent } from "./molecular-lab-results/cvs-specimen/cvs-notification/cvs-notification.component";
import { CvsUpdateresultComponent } from "./molecular-lab-results/cvs-specimen/cvs-updateresult/cvs-updateresult.component";
import { CvsEditresultComponent } from "./molecular-lab-results/cvs-specimen/cvs-editresult/cvs-editresult.component";
import { CvsConfirmedresultComponent } from "./molecular-lab-results/cvs-specimen/cvs-confirmedresult/cvs-confirmedresult.component";*/

//import { HplcreportSampleStatusPrintComponent } from "./hplcreport/hplc-repot-sample-status-print/hplc-repot-sample-status-print.component";

//import { CounsellorreportListComponent } from "./pndtc/counsellor-report-list/counsellor-report-list.component";

import { PNDTOBSreportListComponent } from "./pndtc/pndtobs-report-list/pndtobs-report-list.component";
import { HEMreportListComponent } from "./Haematologist/anm-report-list/haematologist.component";
//import { CounsellorpnpreportListComponent } from "./pndtc/counsellor-pnpreport-list/counsellor-pnpreport-list.component";
//import { MolecularBloodSampleReciptComponent } from "./molecular-lab/molecule-blood-sample-recp/molecule-blood-sample-recp";
//import { MolecularCVSSampleReciptComponent } from "./molecular-lab/molecule-cvs-sample-recp/molecule-cvs-sample-recp";
//import { MolecularCVSReport } from "./molecular-lab/molecule-cvs-report/molecule-cvs-report";
import { MTPOBSreportListComponent } from "./mtp/mtp-service/mtp-report-list/pndtobs-report-list.component";
import { HEMreportListComponent1 } from "./Haematologist/anm-report-list1/haematologist.component";
import { DeactivateanmComponent } from "./errorcorrection/deactivate-anm/deactivate-anm/deactivate-anm.component";
import { DeactivateanmMainComponent } from "./errorcorrection/deactivate-anm/deactivate-anm-main/deactivate-anm-main.component";
import { CommonUsersTableComponent } from "./shared/anm-module/common-users-table/common-users-table.component";
import { PndtLocationComponent } from "./admin/pndt-location/pndt-location.component";
import { MolecularlabComponent } from "./admin/molecularlab/molecularlab.component";
import { NHMBCCRegistrationComponent } from "./anm-module/nhm-monthly-indicators/nhm-bcc-registration/nhm-bcc-registration.component";
import { NHMTrainingRegistrationComponent } from "./anm-module/nhm-monthly-indicators/nhm-training-registration/nhm-training-registration.component";
// import { AnmWalkinGt18RegistrationComponent } from "./registration/anm-walkin-gt18-registration/anm-walkin-gt18-registration.component";
import { AnmWalkinGt18RegistrationComponent } from "./anm-module/registration/anm-walkin-gt18-registration/anm-walkin-gt18-registration.component";
// import {  } from "./anm-module/registration/anm-aw-registration/anm-aw-registration.component";
import { AnmSubjectRegistrationComponent } from "./anm-module/registration/anm-subject-registration/anm-subject-registration.component";
// import { AnmSubjectRegistrationComponent } from "./registration/anm-subject-registration/anm-subject-registration.component";
import { NHMSubjectRegistrationComponent } from "./anm-module/nhm-monthly-indicators/nhm-monthly-registration/nhm-subject-registration.component"; 
import { NHMReportBCCRegistrationComponent } from "./anm-module/nhm-monthly-indicators-report/nhm-reportbcc/nhm-reportbcc.component";
import { NHMReportTrainingRegistrationComponent } from "./anm-module/nhm-monthly-indicators-report/nhm-reporttraining/nhm-reporttraining.component";
import { NHMReportSubjectRegistrationComponent } from "./anm-module/nhm-monthly-indicators-report/nhm-monthly-report/nhm-reportsubject.component";
import { NHMReportScreenRegistrationComponent } from "./anm-module/nhm-monthly-indicators-report/nhm-reportscreen/nhm-reportscreen.component";
import { UsersAdminMainComponent } from "./admin/users-module/admin-users-main/admin-users-main.component";
// import { UsersAdminSadminComponent } from "./admin/users-module/users-sadmin/users-sadmin.component";
// import { UsersAdminSadminComponent } from "./admin/users-module/users-sadmin/users-sadmin.component";
import { UsersAdminANMComponent } from "./admin/users-module/users-anm/users-anm.component";
import { UsersAdminCHCComponent } from "./admin/users-module/users-chc/users-chc.component";
import { UsersAdminHPLCComponent } from "./admin/users-module/users-hplc/users-hplc.component";
// import { UsersAdminPNDTCComponent } from "./admin/users-module/users-pndtc/users-pndtc.component";
import { UsersAdminMTPComponent } from "./admin/users-module/users-mtp/users-mtp.component";
import { UsersAdminDCComponent } from "./admin/users-module/users-dc/users-dc.component";
import { UsersAdminMolecularComponent } from "./admin/users-module/users-molecular/users-molecular.component";
import { UsersAdminSPCComponent } from "./admin/users-module/users-spc/users-spc.component";
// import { UsersAdmin } from "./admin/users-module/users-anm/users-anm.component";
// import { UsersAdmin } from "./admin/users-module/users-anm/users-anm.component";
import { UsersAdminNHMComponent } from "./admin/users-module/users-nhm/users-nhm.component";
import { UsersAdminPNDTComponent } from "./admin/users-module/users-pndt/users-pndt.component";
import { UsersAdminHaematologistComponent } from "./admin/users-module/users-haematologist/users-haematologist.component";
import { UsersAdminSupportComponent } from "./admin/users-module/users-support/users-support.component";
import { AnmWalkinLt18RegistrationComponent } from "./anm-module/registration/anm-walkin-lt18-registration/anm-walkin-lt18-registration.component";
import { UsersAdminSadminComponent } from "./admin/users-module/users-sadmin/users-sadmin.component";
import { UsersAdminPNDTCComponent } from "./admin/users-module/users-pndtc/users-pndtc.component";
import { AdminUsersListComponent } from "./admin/admin-users-list/admin-users-list.component";



const routes: Routes = [
  { path: 'counter', loadChildren: () => import('./counter/counter.module').then(m => m.CounterModule)},
  { path: 'fetch-data', loadChildren: () => import('./fetch-data/fetch-data.module').then(m => m.FetchDataModule)},
  {
    path: 'hplc-report-print',
    loadChildren: () => import('./hplcreport/hplc-repot-sample-status-print.module').then(m => m.HplcreportSampleStatusPrintModule)
  },
  /*{
    path: 'home',
    component: HomeLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, pathMatch: 'full'},
      { path: 'about', component: AboutUsComponent, pathMatch: 'full'},
      { path: 'aboutprogram', component: AboutProgramComponent, pathMatch: 'full'},
      { path: 'importantlinks', component: ImportantLinksComponent, pathMatch: 'full'},
      { path: 'forgotpassword', component: GetOtpComponent, pathMatch: 'full'},
      { path: 'resetlogin', component: ResetLoginComponent, pathMatch: 'full'},
      { path: 'hplclogin', component: HplcLoginComponent, pathMatch: 'full'}
    ]
  },*/
  {
    path: 'home',
    loadChildren: () => import('./auth/home.module').then(m => m.HomeModule)
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
        path: 'anm-notification',
        loadChildren: () => import('./anm-module/anm-notification.module').then(m => m.ANMNotificationModule)
      },
      {
        path: 'molecular-lab-result',
        loadChildren: () => import('./molecular-lab-results/molecular-lab-results.module').then(m => m.MolecularLabResultModule)
      },
      {
        path: 'cvs-specimen',
        loadChildren: () => import('./molecular-lab-results/cvs-specimen.module').then(m => m.CVSSpecimenModule)
        /* component: CvsNotificationComponent,
        children: [
          { path: '', component: CvsUpdateresultComponent, pathMatch: 'full'},  //resolve:{damagedSamplesData: DamagedSamplesResolverService}},
          { path: 'cvs-edit-result', component: CvsEditresultComponent, pathMatch: 'full'}, // resolve:{unsentSamplesData: UnsentSamplesResolverService}
          { path: 'cvs-confirmed-result', component: CvsConfirmedresultComponent, pathMatch: 'full'}, //resolve:{timeoutSamplesData: TimeoutExpiryResolverService}},
          { path: 'reports', component: CVSPosPrintComponent, pathMatch: 'full'}, //resolve:{timeoutSamplesData: TimeoutExpiryResolverService}},
        ]*/
      },
      /*{
        path: 'cvs-reoprts', component: CVSReportsMainComponent,
        children: [

          { path: '', component: CVSPosPrintComponent, pathMatch: 'full'}, //resolve:{timeoutSamplesData: TimeoutExpiryResolverService}},

        ]
      },*/
     /* {
        path: 'cvs-specimen', component: CvsNotificationComponent,
        children: [
          { path: '', component: CvsUpdateresultComponent, pathMatch: 'full'},  //resolve:{damagedSamplesData: DamagedSamplesResolverService}},
          { path: 'cvs-edit-result', component: CvsEditresultComponent, pathMatch: 'full'}, // resolve:{unsentSamplesData: UnsentSamplesResolverService}
          { path: 'cvs-confirmed-result', component: CvsConfirmedresultComponent, pathMatch: 'full'}, //resolve:{timeoutSamplesData: TimeoutExpiryResolverService}},
          { path: 'reports', component: CVSPosPrintComponent, pathMatch: 'full'}, //resolve:{timeoutSamplesData: TimeoutExpiryResolverService}},
        ]
      },*/
      /*{
        path: 'chc-notification', component: ChcNotificationComponent,
        children: [
          { path: '', component: ChcDamagedSamplesComponent, pathMatch: 'full'}, // resolve:{chcdamagedSamplesData: ChcDamagedsamplesResolverService}
          { path: 'chc-unsent', component: ChcUnsentSamplesComponent, pathMatch: 'full' }, // resolve:{chcunsentSamplesData: ChcUnsentSamplesResolverService}
          { path: 'chc-timeout', component: ChcTimeoutSamplesComponent, pathMatch: 'full'}, // resolve:{chctimeoutSamplesData: ChcTimeoutsamplesResolverService}
          { path: 'chc-positive', component: ChcPositiveSubjectComponent, pathMatch: 'full', resolve:{chcpositiveSubjectData: ChcPositiveSubjectResolverService} },
        ]
      },*/
      {
        path: 'chc-notification', loadChildren: () => import('./chc-module/chc-notification/chc-notification.module').then(m => m.CHCNotificationModule)
      },
      {
        path: 'chc-subregn', loadChildren: () => import('./chc-module/registration/chc-registration.module').then(m => m.CHCRegistrationModule)
      },
      {
        path: 'block-subregn', loadChildren: () => import('./anm-module/block-registration/block-registration.module').then(m => m.BlockRegistrationModule)
      }
     /* {
        path: 'chc-subregn', component: CheSubjectRegistrationComponent,
        children:[
          {path: '', component: ChcwalkinRegistrationComponent, pathMatch: 'full'},
          {path: 'awreg', component: ChcpregnantRegistrationComponent, pathMatch: 'full'},
          {path: 'spouse', component: CheSpouseRegistrationComponent, pathMatch: 'full'},
          {path: 'student', component: ChcStudentRegistrationComponent, pathMatch: 'full'},
          {path: 'walkin', component: ChcwalkinRegistrationComponent, pathMatch: 'full'}
        ]
      },
      {
        path: 'block-subregn', component: BlockSubjecttRegistrationComponent,
        children:[
          {path: '', component: BlockAwRegistrationComponent, pathMatch: 'full'},
          {path: 'awreg', component: BlockAwRegistrationComponent, pathMatch: 'full'},
          {path: 'spouse', component: blockSpouseRegistrationComponent, pathMatch: 'full', resolve: {positiveSubjects: SpouseResolverService}},
          {path: 'student', component: BlockStudentRegistrationComponent, pathMatch: 'full'},
          {path: 'walkin', component: AnmWalkinLt18RegistrationComponent, pathMatch: 'full'},
          {path: 'otherwalkin', component: AnmWalkinGt18RegistrationComponent, pathMatch: 'full'},
        ]

      }/*,
      {
        path: 'block-subregn', component: BlockSubjectRegistrationComponent,
        children:[
          {path: '', component: ChcwalkinRegistrationComponent, pathMatch: 'full'},
          {path: 'awreg', component: ChcpregnantRegistrationComponent, pathMatch: 'full'},
          {path: 'spouse', component: CheSpouseRegistrationComponent, pathMatch: 'full'},
          {path: 'student', component: ChcStudentRegistrationComponent, pathMatch: 'full'},
          {path: 'walkin', component: ChcwalkinRegistrationComponent, pathMatch: 'full'}
        ]
      }*/,
      { path: 'chc-sample-collection', loadChildren: () => import('./chc-module/chc-sample-collection/chc-sample-collection.module').then(m => m.ChcSampleCollectionModule) },
      { path: 'block-sample-collection', component: BlockSampleCollectionComponent },// resolve: {chcSampleCollectionData: ChcSampleCollectionResolverService}
      { path: 'chc-sample-collection/:subtype', loadChildren: () => import('./chc-module/chc-sample-collection/chc-sample-collection.module').then(m => m.ChcSampleCollectionModule) }, // resolve: {chcSampleCollectionData: ChcSampleCollectionResolverService}
      { path: 'chc-pickandpack', component: ChcPicknpackComponent}, // resolve: {chcpicknpackData: ChcPicknpackResolverService}
      { path: 'block-pickandpack', component: BlockPicknpackComponent},
      { path: 'chc-shipmentlog', component: ChcShipmentlogComponent }, // resolve: {chcshipmentLogData: ChcShipmentlogResolverService}
      { path: 'chc-viewshipment', component: ChcViewShipmentdetailsComponent, pathMatch: 'full'},
      { path: 'chc-viewsubjectprofile', loadChildren: () => import('./chc-module/chc-subject-profile/chc-subject-profile.module').then(m => m.CHCSubjectProfileModule), pathMatch: 'full'},
      
      { path: 'anm-subjecttracker', component: SubjectTrackerComponent},
      // { path: 'add-state', component: StateComponent, pathMatch: 'full'},
      { path: 'add-district', component: DistrictComponent, pathMatch: 'full'},
      { path: 'add-block', component: BlockComponent, pathMatch: 'full'},
      { path: 'add-chc', component: ChcComponent, pathMatch: 'full'},
      { path: 'add-avd', component: AVDComponent, pathMatch: 'full'},
      // { path:'add-user-role', component: UserRoleComponent, pathMatch: 'full'},
      { path: 'add-users', component:UsersComponent, pathMatch: 'full'},
     
      { path: 'add-phc', component: PhcComponent, pathMatch: 'full'},
      { path: 'add-test', component: TestComponent, pathMatch: 'full'},
      { path: 'add-ilr', component:IlrComponent, pathMatch: 'full'},
      { path: 'add-sc', component: ScComponent, pathMatch: 'full'},

      { path: 'add-ri-point', component: RiPointComponent, pathMatch: 'full'},
      { path: 'add-pndt', component: PndtLocationComponent, pathMatch: 'full'},
      { path: 'add-mtp', component: MTPComponent, pathMatch: 'full'},
      { path: 'add-hplc', component: HPLCComponent, pathMatch: 'full'},
      { path: 'add-molecular', component: MolecularlabComponent, pathMatch: 'full'},
      { path: 'add-gvt-id-type', component: GvtIdTypeComponent, pathMatch: 'full'},
      // { path: 'add-user-type', component: UserTypeComponent, pathMatch: 'full'},

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

      {
        path: 'chc-update-sst', component: CHCUpdateSSTComponent,
        children:[
          {path: '', component: SSTReceivedSampleComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCupdateSSTReceivedService}},
          {path: 'positive', component: SSTUpdatePositiveComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCupdateSSTReceivedService}},
          {path: 'negative', component: SSTUpdateNegativeComponent, pathMatch: 'full', resolve: {positiveSubjects: CHCupdateSSTReceivedService}}
        ]
      },

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
        path: 'errorcorrection', component: BarcodeCorrectionMainComponent,
        children:[
          {path: '', component: BarcodeCorrectionComponent, pathMatch: 'full', resolve: {positiveSubjects: errorcodeResolverService}},
          {path: 'pending', component: BarcodePendingComponent, pathMatch: 'full', resolve: {positiveSubjects: errorcodeResolverService}}
        ]
      },
      {
        path: 'upload', component: UploadMainComponent,
        children:[
          {path: '', component: CHCUploadComponent, pathMatch: 'full'},
          {path: 'hplc', component: HPLCUploadComponent, pathMatch: 'full'}
        ]
      },
      {
        path: 'saupload', component: UploadSAMainComponent,
        children:[
          {path: '', component: SAUploadComponent, pathMatch: 'full'}
        ]
      },
      {
        path: 'rchcorrection', component: RCHCorrectionMainComponent,
        children:[
          {path: '', component: RCHCorrectionComponent, pathMatch: 'full'}
        ]
      },
      {
        path: 'lmpcorrection', component: LMPCorrectionMainComponent,
        children:[
          {path: '', component: LMPCorrectionComponent, pathMatch: 'full'}
        ]
      },
      {
        path: 'sstcorrection', component: SSTCorrectionMainComponent,
        children:[
          {path: '', component: SSTCorrectionComponent, pathMatch: 'full'}
        ]
      },
      {
        path: 'lmpreport', component: LMPReportMainComponent,
        children:[
          {path: '', component: LMPReportComponent, pathMatch: 'full'}

        ]
      },
      {
        path: 'barcodereport', component: BarcodeReportMainComponent,
        children:[
          {path: '', component: BarcodeReportComponent, pathMatch: 'full'}

        ]
      },
      {
        path: 'rchreport', component: RCHReportMainComponent,
        children:[
          {path: '', component: RCHReportComponent, pathMatch: 'full'}

        ]
      },
      {
        path: 'sstreport', component: SSTReportMainComponent,
        children:[
          {path: '', component: SSTReportComponent, pathMatch: 'full'}

        ]
      },

      {
        path: 'pathologist-hplc-report/:pagename', component: DiagosisReportmainComponent,
        children:[
          {path: '', component: DiagosisReportComponent, pathMatch: 'full', resolve: {positiveSubjects: CentralupdateHPLCService}}
        ]
      },
      {
        path: 'anm-subregn', loadChildren: () => import('./anm-module/registration/anm-registration.module').then(m => m.ANMRegistrationModule)

      },

      {
        path: 'nhm-subregn', component: NHMSubjectRegistrationComponent,
        children:[
          {path: '', component: NHMScreenRegistrationComponent, pathMatch: 'full'},
          {path: 'nhmscreen', component: NHMScreenRegistrationComponent, pathMatch: 'full'},
          {path: 'nhmbcc', component: NHMBCCRegistrationComponent, pathMatch: 'full', resolve: {positiveSubjects: SpouseResolverService}},       
          {path: 'nhmtraining', component: NHMTrainingRegistrationComponent, pathMatch: 'full'},
          
        ]

      },
      {
        path: 'nhm-subregnreport', component: NHMReportSubjectRegistrationComponent,
        children:[
          {path: '', component: NHMReportScreenRegistrationComponent, pathMatch: 'full'},
          {path: 'nhmreportscreen', component: NHMReportScreenRegistrationComponent, pathMatch: 'full'},
          {path: 'nhmreportbcc', component: NHMReportBCCRegistrationComponent, pathMatch: 'full', resolve: {positiveSubjects: SpouseResolverService}},       
          {path: 'nhmreporttraining', component: NHMReportTrainingRegistrationComponent, pathMatch: 'full'},
          
        ]

      },

      {
        path: 'admin-users-main', component: UsersAdminMainComponent,
        children:[
          {path: '', component: UsersAdminSadminComponent, pathMatch: 'full'},
          {path: 'UserSadmin', component: UsersAdminSadminComponent, pathMatch: 'full'},
          {path: 'UsersANM', component: UsersAdminANMComponent, pathMatch: 'full', resolve: {positiveSubjects: SpouseResolverService}},       
          {path: 'UsersCHC', component: UsersAdminCHCComponent, pathMatch: 'full'},
          {path: 'UsersHPLC', component: UsersAdminHPLCComponent, pathMatch: 'full'},
          {path: 'UsersPNDTC', component: UsersAdminPNDTCComponent, pathMatch: 'full'},
          {path: 'UsersMTP', component: UsersAdminMTPComponent, pathMatch: 'full'},
          {path: 'UsersDC', component: UsersAdminDCComponent, pathMatch: 'full'},
          {path: 'UsersMolecular', component: UsersAdminMolecularComponent, pathMatch: 'full'},
          {path: 'UsersSPC', component: UsersAdminSPCComponent, pathMatch: 'full'},
          {path: 'UsersNHM', component: UsersAdminNHMComponent, pathMatch: 'full'},
          {path: 'UsersPNDT', component: UsersAdminPNDTComponent, pathMatch: 'full'},
          {path: 'UsersHaematologist', component: UsersAdminHaematologistComponent, pathMatch: 'full'},
          {path: 'UsersSupport', component: UsersAdminSupportComponent, pathMatch: 'full'},
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
        path: 'patho-report-print', component: PathoreportSampleStatusMainPrintComponent,
        children:[
          {path: '', component: PathoreportSampleStatusPrintComponent, pathMatch: 'full', resolve: {pndtcTesting: PathoReportPrintResolverService}}
        ]
      },


      {
        path: 'central-shipment', component: CentralShipmentMainComponent,
        children:[
          {path: '', component: CentralCentralShipmentComponent, pathMatch: 'full', resolve: {positiveSubjects: CentrallabShipmentResolverService}}
        ]
      },
      /*{
        path: 'schedule-shipment',
        loadChildren: () => import('./pndtc/shipment-log/shipment-log.module').then(m => m.ShipmentLogModule)
      },*/
      {
        path: 'schedule-shipment', component: ScheduleShipmentMainComponent,
        children:[
          {path: '', component: ScheduleShipmentComponent, pathMatch: 'full', resolve: {positiveSubjects: pndtcShipmentResolverService}}
        ]
      },
      {
        path: 'molecularlab', loadChildren: () => import('./molecular-lab/sample-rcpt/molecular-sample-rec.module').then(m => m.MolecularSampleRcptModule)
      },
      {
        path: 'molecularlab-cvs', loadChildren: () => import('./molecular-lab/sample-rcpt-cvs/molecular-sample-cvs.module').then(m => m.MolecularSampleRcptCVSModule)
      },
      {
        path: 'molecular-report', loadChildren: () => import('./molecular-lab/repot-sample-status/repot-sample-status.module').then(m => m.ReportSampleStatusModule)

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
        path: 'mol-blood-recp-report', loadChildren: () => import('./molecular-lab/molecule-blood-sample-recp/molecule-blood-sample-recp.module').then(m => m.MolecularBloodSampleRcptModule)
        
      },
    {
        path: 'mol-cvs-report', loadChildren: () => import('./molecular-lab/molecule-cvs-report/molecule-cvs-report.module').then(m => m.MolecularCVDReportModule),pathMatch: 'full'
      },
      // MolecularCVSReport
     {
        path: 'mol-cvs-recp-report', loadChildren: () => import('./molecular-lab/molecule-cvs-sample-recp/molecule-cvs-sample-recp.module').then(m => m.MolecularCVSSampleRcptModule)
      },
      {
        path: 'schedule-pre-pndtc',
        loadChildren: () => import('./pndtc/schedule/schedule.module').then(m => m.ScheduleModule)
      },
    {
        path: 'PNDTPickandPackReport', loadChildren: () => import('./pndtc/counsellor-pnpreport-list/counsellor-pnpreport-list.module').then(m => m.CounsellingpnpreportListModule)
        
      },
      {
        path: 'pndtc-testing', loadChildren: () => import('./pndtc/pnd-testing/pnd-testing-main.module').then(m => m.PNDTestingModule)
      },
      {
        path: 'pndtc-testing-result', component: PndTestingResultsMainComponent,
        children:[
          {path: '', component: PNDTestingResultsComponent, pathMatch: 'full'}
        ]
      },

    {
        path: 'pndtreport', component: PNDTOBSreportListComponent,
        children:[
          {path: '', component: PNDTOBSreportListComponent, pathMatch: 'full'}

        ]},
      //   ]
      // },
      {
        path: 'pndtc-summary',  loadChildren: () => import('./pndtc/pnd-testing/pnd-testing-summary.module').then(m => m.PNDTestingSummaryModule)
      },
      {
        path: 'mtp-service', loadChildren: () => import('./mtp/mtp-service/mtp-service.module').then(m => m.MTPServiceModule)
        
      },
      {
        path: 'mtp-testing-result', component: MtpTestingResultsMainComponent,
        children:[
          {path: '', component: MTPTestingResultsComponent, pathMatch: 'full'}
        ]
      },
      // {
      //   path: 'mtpreport', component: MTPOBSreportListComponent,
      //   children:[
      //     {path: '', component: MTPTestingResultsComponent, pathMatch: 'full'}
      //   ]
      // },
      {

        path: 'mtpreport', component: MTPOBSreportListComponent,
        children:[
          {path: '', component: MTPTestingResultsComponent, pathMatch: 'full'}
        ]
      },
      {

        path: 'view-case-sheet', component: ViewCaseSheetMainComponent,
        children:[
          {path: '', component: ViewCaseSheetComponent, pathMatch: 'full'}
        ]
      },
      {
        path: 'mtp-summary', loadChildren: () => import('./mtp/mtp-service/mtp-summary.module').then(m => m.MTPSummaryModule)
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
      { path: 'view-anm-report', component: AnmReportProfileComponent, pathMatch: 'full'},
      { path: 'chc-main-report', component: CHCreportListComponent, pathMatch: 'full'},
      { path: 'patho-main-report', component: PathoreportListComponent, pathMatch: 'full'},
      {
        path: 'counselling-pre-pndt', loadChildren: () => import('./pndtc/counselling-pre-pndt/counselling-pre-pndt.module').then(m => m.CounsellingPrePMDTModule)
      },
      { path: 'chc-subjectprofile', loadChildren: () => import('./chc-module/chc-subject-profile-list/chc-subject-profile-list.module').then(m => m.CHCSubjectProfileListModule)},
      {
        path: 'update-pregnancy', loadChildren: () => import('./Haematologist/update-pregnacy.module').then(m => m.UpdatePregnacyModule)

      }/*,
      {path: 'hem-report', component: HEMreportListComponent,
      children:[
        {path: '', component: HEMreportListComponent, pathMatch: 'full'}
      ]
    }*/,
     // },
    //   {path: 'hem-report', component: HEMreportListComponent,
    //   children:[
    //     {path: '', component: HEMreportListComponent, pathMatch: 'full'}
    //   ]
    // },
      {
        path: 'csv-specimen', loadChildren: () => import('./pndtc/counselling-pre-pndt/csv-specimen.module').then(m => m.CVSSpecimenModule)
      },
      { path: 'view-ml-result', component: ViewResultMLComponent },
      { path: 'update-pre-pndtc', component: UpdateDetailTestresultsComponent },
      { path: 'update-pregnancy-details', component: UpdatePregnacyTestresultsComponent },

      { path: 'update-pre-pndtc-no', component: UpdateDecisionNoPndtComponent },
      { path: 'update-pre-pndtc-awaited', component: UpdateDecisionPendingPndtComponent },
      { path: 'update-pre-pndtc-yes', component: UpdateDecisionYesPndtComponent },
     
      {
        path: 'schedule-post-pndtc', loadChildren: () => import('./pndtc/schedule-post-pndtc/schedule-post-pndtc.module').then(m => m.SchedulePostPndtcModule)
      },
      /*{
        path: 'schedule-post-pndtc', component: SchedulePostPndtcMainComponent,
        children:[
          {path: '', component: SchedulePostPndtcToBeScheduledComponent, pathMatch: 'full', resolve: {postScheduling: PostSchedulingResolverService}},
          {path: 'scheduled', component: SchedulePostPndtcScheduledComponent, pathMatch: 'full', resolve: {postScheduled: PostScheduledResolverService}},
        ]
      },*/

      {
        path: 'counselling-post-pndt', loadChildren: () => import('./pndtc/counselling-post-pndt/counselling-post-pndt.module').then(m => m.CounsellingPostPNDTModule)
      },
      /*{
        path: 'counselling-post-pndt', component: CounsellingPostPndtMainComponent,
        children:[
          {path: '', component: ToBePostPndtCounselledComponent, pathMatch: 'full'},
          {path: 'counselledyes', component: PostCounsellingDecisionYesComponent, pathMatch: 'full'},
          {path: 'counselledno', component: PostCounsellingDecisionNoComponent, pathMatch: 'full'},
          {path: 'counselledawaited', component: PostCounsellingDecisionPendingComponent, pathMatch: 'full'}
        ]
      },*/
      {
        path: 'counsellor-report', loadChildren: () => import('./pndtc/counsellor-report-list/counsellor-report-list.module').then(m => m.CounsellorreportListModule)
      },

      {
        path: 'counsellor-mtp-report', loadChildren: () => import('./pndtc/counsellor-mtp-report-list/counsellor-mtp-report-list.module').then(m => m.CounsellingMTPReportModule),
      },


      {
        path: 'counsellor-chc-report', component: CounsellorChcreportListComponent,
      },
      {
        path: 'counsellor-phc-report', component: CounsellorPhcreportListComponent,
      },


      {
        path: 'HPLC-ANM', component: PathoreportSampleStatusMainPrintComponentANM,
        children:[
          {path: '', component: PathoreportSampleStatusPrintComponentANM, pathMatch: 'full'},

        ]
      },
      {
        path: 'HPLC-NHM', component: PathoreportSampleStatusMainPrintComponentNHM,
        children:[
          {path: '', component: PathoreportSampleStatusPrintComponentNHM, pathMatch: 'full'},

        ]
      },
      {
        path: 'HPLC-DC', loadChildren: () => import('./district-coordinator/repot-patho-sample-status/repot-patho-sample-status.module').then(m => m.PathoreportSampleStatusModule),
      },
      {
        path: 'state-report', component: StatereportListComponent,

      },
      {
        path: 'district-report', loadChildren: () => import('./district-coordinator/district-report-list/district-report-list.module').then(m => m.DistrictReportListModule),

      },
     
      {
        path: 'nhm-report', component: NHMreportListComponent,

      },
      {
        path: 'anm-report', component: ANMreportListComponent,

      },{
        path: 'mtp-report', loadChildren: () => import('./mtp/mtp-report-list/mtp-report-list.module').then(m => m.MTPReportListModule),
      },
      {
        path: 'add-admin-users', component: AdminUsersListComponent,

      },
      {
        path: 'chc-regn-report', component: CHCRegnreportListComponent,

      },
{
      path: 'cl-regn-report', component: CentralLabRegnreportListComponent,

    },


      { path: 'update-post-pndtc', component: PostPndtcTestresultsComponent },
      { path: 'update-post-pndtc-no', component: PostPndtcDecisionNoComponent },
      { path: 'update-post-pndtc-awaited', component: PostPndtcDecisionAwaitedComponent },
      { path: 'update-post-pndtc-yes', component: PostPndtcDecisionYesComponent },

      { path: 'anm-sample-collection', component: SampleCollectionComponent }, // resolve: {sampleCollectionData: SampleCollectionResolverService}
      { path: 'anm-sample-collection/:subtype', component: SampleCollectionComponent }, // resolve: {sampleCollectionData: SampleCollectionResolverService}
      //{ path: 'test/:id', component: AboutComponent }
      { path: 'anm-pickpack', component: AnmPickandPackComponent },  // resolve: {picknpackData: PicknpackResolverService}
      { path: 'anm-shipment', component: AnmShipmentComponent },
      { path: 'block-shipment', component: BlockShipmentComponent },
      // resolve: {shipmentLogData: ShipmentlogResolverService }
      { path: 'anm-viewsubjectprofile', loadChildren: () => import('./anm-module/anm-subject-profile/anm-subject-profile.module').then(m => m.ANMSubjectProfileModule)},
      { path: 'chc-reg-viewsubjectprofile', loadChildren: () => import('./shared/anm-module/anm-chc-subject-profile/anm-chc-subject-profile.module').then(m => m.ANMCHCSubjectProfileModule), pathMatch: 'full'},
      { path: 'anm-subprofile', component: AnmSubjectProfileListComponent },
      { path: 'anm-viewshipment', component: AnmViewShipmentdetailsComponent, pathMatch: 'full'},
      {path: 'anm-profiletracking', component: AnmSubjectProfileTrackingComponent},
     
      { path: 'dc-notification', loadChildren: () => import('./district-coordinator/dc-notification.module').then(m => m.DCNotificationModule)
      },
    ]
  },


  { path: '', redirectTo: '/home/login', pathMatch: 'full' },
  // { path: 'notfound', component: NotfoundComponent },
  { path: 'pageunderconstruction', component: PageUnderDevelopementComponent },
  { path: '**', redirectTo: '/home/login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [
  NotfoundComponent,
  PageUnderDevelopementComponent,

  SiteHeaderComponent,
  SiteLayoutComponent,
  DashboardComponent,
  StatereportListComponent,

  SampleCollectionComponent,
  AnmPickandPackComponent,
  AnmShipmentComponent,
  AnmSubjectProfileListComponent,
  CounsellorChcreportListComponent,
  AnmViewShipmentdetailsComponent,
  WalkinRegistrationComponent,

  CHCSampleRcptComponent,
  CHCSampleRcptProComponent,
  ChcPicknpackComponent,
  NHMSubjectRegistrationComponent,
  CHCUpdateCBCComponent,
  CBCReceivedSampleComponent,
  CBCUploadComponent,
  CHCUpdateSSTComponent,
  SSTReceivedSampleComponent,
  NHMSubjectRegistrationComponent,
  SSTUpdatePositiveComponent,
  NHMBCCRegistrationComponent,
  SSTUpdateNegativeComponent,
  NHMTrainingRegistrationComponent,
  ChcShipmentlogComponent,
  ChcViewShipmentdetailsComponent,

  CentralSampleRcptMainComponent,
  CentralSampleRcptComponent,
  CentralHPLCupdateComponent,
  CentralReceivedSampleComponent,
  CentralHPLCUploadComponent,

  ChcSamplePickpackComponent,
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
  DiagnosisHPLCAbEditComponent,
  // PathoreportStatusCoordinatorMainPrintComponent,
  PndTestingResultsMainComponent,
  PNDTestingResultsComponent,
  UpdateDetailTestresultsComponent,
  UpdateDecisionNoPndtComponent,
  CounsellorPhcreportListComponent,
  UpdateDecisionYesPndtComponent,
  UpdateDecisionPendingPndtComponent,
  PndSummaryViewComponent,
  NHMReportScreenRegistrationComponent,
  NHMReportBCCRegistrationComponent,
  PndSummaryViewMainComponent,

  PostPndtcTestresultsComponent,
  PostPndtcDecisionYesComponent,
  MTPTestingResultsComponent,
  MtpTestingResultsMainComponent,
  MtpSummaryViewMainComponent,
  MtpSummaryViewComponent,
  PostPndtcDecisionNoComponent,
  PostPndtcDecisionAwaitedComponent,

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

  PathoreportSampleStatusComponent,
  PathoreportSampleStatusMainComponent,
  ViewReportPathoMainMainComponent,
  ViewPathoReportComponent,

  CHCNotificationMainComponent,
  AnmSubjectProfileTrackingComponent,
  ViewCLReportComponent,
  ViewReportCLMainMainComponent,
  SubjectTrackerComponent,
  UsersAdminMainComponent,
  UsersAdminSadminComponent,
  UsersAdminANMComponent,
  UsersAdminCHCComponent,
  CentralNotificationMainComponent,
  // StateComponent,
  DistrictComponent,
  BlockComponent,
  ChcComponent,
  DiagnosisHPLCPathoComponent,
  PhcComponent,
  ScComponent,
  RiPointComponent,
  GvtIdTypeComponent,
  PndtLocationComponent,
  MTPComponent,
  NHMreportListComponent,
  // UserTypeComponent,
  PathoreportSampleStatusMainPrintComponent,
  PathoreportSampleStatusPrintComponent,

  CvsUpdateresultComponent,
  CvsEditresultComponent,
  CvsConfirmedresultComponent,*/
  ANMreportListComponent,
  AnmReportProfileComponent,
  CHCreportListComponent,
  ScheduleShipmentMainComponent,
  ScheduleShipmentComponent,
  UpdatePregnacyTestresultsComponent,
  ViewResultMLComponent,
  BarcodeCorrectionMainComponent,
  BarcodeCorrectionComponent,
  BarcodePendingComponent,
  RCHCorrectionMainComponent,
  RCHCorrectionComponent,
  LMPCorrectionMainComponent,
  LMPCorrectionComponent,
  BlockSubjectRegistrationComponent,
  SSTCorrectionComponent,
  NHMReportSubjectRegistrationComponent,
  SSTCorrectionMainComponent,
  LMPReportComponent,
  LMPReportMainComponent,
  SSTReportComponent,
  SSTReportMainComponent,
  BarcodeReportComponent,
  BarcodeReportMainComponent,
  RCHReportComponent,
  RCHReportMainComponent,
  BlockSampleCollectionComponent,
  BlockPicknpackComponent,
  BlockShipmentComponent,
  CHCRegnreportListComponent,
  CentralLabRegnreportListComponent,
  UploadMainComponent,
  CHCUploadComponent,
  HPLCUploadComponent,
  AdminUsersListComponent,
  PathoreportSampleStatusMainPrintComponentANM,
  PathoreportSampleStatusPrintComponentANM,
  PathoreportSampleStatusMainPrintComponentNHM,
  PathoreportSampleStatusMainPrintComponent,

  PathoreportSampleStatusPrintComponentNHM,
  PathoreportListComponent,
  AVDComponent,
  // UserRoleComponent,
  IlrComponent,
  TestComponent,
  UsersComponent,
  UploadSAMainComponent,
  SAUploadComponent,
  CommonUsersTableComponent,
  PNDTOBSreportListComponent,
  MTPOBSreportListComponent,
  HEMreportListComponent,
  HEMreportListComponent1,
  DeactivateanmComponent,
  DeactivateanmMainComponent,
  

];


