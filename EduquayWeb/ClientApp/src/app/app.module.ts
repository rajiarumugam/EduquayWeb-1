import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AppRoutingModule, RoutingComponents } from './app.routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NumberDirective } from './shared/directive/numbers-only.directive';
import { TextSearchPipe } from './shared/directive/text-search.pipe';
import { SelectDropdownComponent } from "./shared/directive/select-dropdown/select-dropdown.component";
// import * as $ from "jquery";
// import * as bootstrap from "bootstrap";
import { AuthInterceptorServiceService } from './interceptors/auth-interceptor-service';
import { HttpErrorInterceptor } from './interceptors/httpErrorInterceptor';
import { AuthGuard } from './shared/auth.guard';
import { CommonService } from './shared/common.service';
import { ConstantService } from './shared/constant.service';
import { GenericService } from './shared/generic.service';
import { TestComponent } from './test/test.component';
import { AnmShipmentComponent } from './anm-module/anm-shipment/anm-shipment.component';
import { AnmSubjectProfileComponent } from './anm-module/anm-subject-profile/anm-subject-profile.component';
import { AnmCollectionComponent } from './anm-module/anm-collection/anm-collection.component';
import { AnmViewShipmentdetailsComponent } from './anm-module/anm-view-shipmentdetails/anm-view-shipmentdetails.component';
import { DataTablesModule } from 'angular-datatables';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload'; 
//import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { DataService } from './shared/data.service';
import { StatereportListComponent } from './pathologist/state-report-list/state-report-list.component';
import { AnmPostMtpFollowupComponent } from './anm-module/anm-post-mtp-followup/anm-post-mtp-followup.component';
import { ChcPicknpackComponent } from './chc-module/chc-picknpack/chc-picknpack.component';
import { ChcShipmentlogComponent } from './chc-module/chc-shipmentlog/chc-shipmentlog.component';
import { ChcViewShipmentdetailsComponent } from './chc-module/chc-view-shipmentdetails/chc-view-shipmentdetails.component';
import { ChcSubjectProfileComponent } from './chc-module/chc-subject-profile/chc-subject-profile.component';
import { ChcDamagedSamplesComponent } from './chc-module/chc-notification/chc-damaged-samples/chc-damaged-samples.component';
import { ChcUnsentSamplesComponent } from './chc-module/chc-notification/chc-unsent-samples/chc-unsent-samples.component';
import { ChcTimeoutSamplesComponent } from './chc-module/chc-notification/chc-timeout-samples/chc-timeout-samples.component';
import { ChcNotificationComponent } from './chc-module/chc-notification/chc-notification/chc-notification.component';
import { ChcPositiveSubjectComponent } from './chc-module/chc-notification/chc-positive-subject/chc-positive-subject.component';
import { ChcSamplePickpackComponent } from './chc-sample-module/chc-sample-pickpack/chc-sample-pickpack.component';
import { PageUnderDevelopementComponent} from './page-under-developement/page-under-developement.component';
import { ChcSampleCollectionComponent } from './chc-module/chc-sample-collection/chc-sample-collection.component';
import { ChcSampleShipmentlogComponent } from './chc-sample-module/chc-sample-shipmentlog/chc-sample-shipmentlog.component';
import { ChcSampleViewShipmentComponent } from './chc-sample-module/chc-sample-view-shipment/chc-sample-view-shipment.component';
import { ChcPendingPickpackComponent } from './chc-sample-module/chc-sample-pickpack/chc-pending-pickpack/chc-pending-pickpack.component';
import { ChcStartPickpackComponent } from './chc-sample-module/chc-sample-pickpack/chc-start-pickpack/chc-start-pickpack.component';
import { AppPasswordDirective } from './shared/directive/app-password.directive';
import { CookieService } from 'ngx-cookie-service';
import { LoaderService } from './shared/loader/loader.service';
import { AboutUsComponent } from './landing-page/about-us/about-us.component';
import { AboutProgramComponent } from './landing-page/about-program/about-program.component';
import { ImportantLinksComponent } from './landing-page/important-links/important-links.component';
import { ChcSubjectProfileListComponent } from './chc-module/chc-subject-profile-list/chc-subject-profile-list.component';
import { AnmSubjectProfileListComponent } from './anm-module/anm-subject-profile-list/anm-subject-profile-list.component';
import { PrePndtcMainComponent } from './pndtc/schedule/pre-pndtc-main/pre-pndtc-main.component';
import { PrePndtcToBeScheduledComponent } from './pndtc/schedule/pre-pndtc-to-be-scheduled/pre-pndtc-to-be-scheduled.component';
import { PrePndtcScheduledComponent } from './pndtc/schedule/pre-pndtc-scheduled/pre-pndtc-scheduled.component';
import { CounsellingPrePndtMainComponent } from './pndtc/counselling-pre-pndt/counselling-pre-pndt-main/counselling-pre-pndt-main.component';
import { ToBeCounselledComponent } from './pndtc/counselling-pre-pndt/to-be-counselled/to-be-counselled.component';
import { CounselledDecisionYesComponent } from './pndtc/counselling-pre-pndt/counselled-decision-yes/counselled-decision-yes.component';
import { CounselledDecisionNoComponent } from './pndtc/counselling-pre-pndt/counselled-decision-no/counselled-decision-no.component';
import { CounselledDecisionAwaitedComponent } from './pndtc/counselling-pre-pndt/counselled-decision-awaited/counselled-decision-awaited.component';
import { UpdateDetailTestresultsComponent } from './pndtc/counselling-pre-pndt/update-detail-testresults/update-detail-testresults.component';
import { UpdateDecisionNoPndtComponent } from './pndtc/counselling-pre-pndt/update-decision-no-pndt/update-decision-no-pndt.component';
import { UpdateDecisionYesPndtComponent } from './pndtc/counselling-pre-pndt/update-decision-yes-pndt/update-decision-yes-pndt.component';
import { UpdateDecisionPendingPndtComponent } from './pndtc/counselling-pre-pndt/update-decision-pending-pndt/update-decision-pending-pndt.component';
import { SchedulePostPndtcMainComponent } from './pndtc/schedule-post-pndtc/schedule-post-pndtc-main/schedule-post-pndtc-main.component';
import { SchedulePostPndtcScheduledComponent } from './pndtc/schedule-post-pndtc/schedule-post-pndtc-scheduled/schedule-post-pndtc-scheduled.component';
import { SchedulePostPndtcToBeScheduledComponent } from './pndtc/schedule-post-pndtc/schedule-post-pndtc-to-be-scheduled/schedule-post-pndtc-to-be-scheduled.component';
import { CounsellingPostPndtMainComponent } from './pndtc/counselling-post-pndt/counselling-post-pndt-main/counselling-post-pndt-main.component';
import { ToBePostPndtCounselledComponent } from './pndtc/counselling-post-pndt/to-be-post-pndt-counselled/to-be-post-pndt-counselled.component';
import { PostPndtcTestresultsComponent } from './pndtc/counselling-post-pndt/post-pndtc-testresults/post-pndtc-testresults.component';
import { PostCounsellingDecisionYesComponent } from './pndtc/counselling-post-pndt/post-counselling-decision-yes/post-counselling-decision-yes.component';
import { PostCounsellingDecisionNoComponent } from './pndtc/counselling-post-pndt/post-counselling-decision-no/post-counselling-decision-no.component';
import { PostCounsellingDecisionPendingComponent } from './pndtc/counselling-post-pndt/post-counselling-decision-pending/post-counselling-decision-pending.component';
import { PostPndtcDecisionYesComponent } from './pndtc/counselling-post-pndt/post-pndtc-decision-yes/post-pndtc-decision-yes.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PostPndtcDecisionNoComponent } from './pndtc/counselling-post-pndt/post-pndtc-decision-no/post-pndtc-decision-no.component';
import { PostPndtcDecisionAwaitedComponent } from './pndtc/counselling-post-pndt/post-pndtc-decision-awaited/post-pndtc-decision-awaited.component';
import { DistrictCoordinatorMainComponent } from './district-coordinator/district-coordinator-main/district-coordinator-main.component';
import { DamagedSamplesComponent } from './district-coordinator/damaged-samples/damaged-samples.component';
import { UnsentSamplesComponent } from './district-coordinator/unsent-samples/unsent-samples.component';
import { SampleTimeoutComponent } from './district-coordinator/sample-timeout/sample-timeout.component';
import { PositiveSubjectsComponent } from './district-coordinator/positive-subjects/positive-subjects.component';
import { PndtReferralComponent } from './district-coordinator/pndt-referral/pndt-referral.component';
import { MtpReferralComponent } from './district-coordinator/mtp-referral/mtp-referral.component';
import { PostMtpFollowupComponent } from './district-coordinator/post-mtp-followup/post-mtp-followup.component';
import { GetOtpComponent } from './auth/forgot-password/get-otp/get-otp.component';
import { ResetPasswordComponent } from './auth/forgot-password/reset-password/reset-password.component';
import { ResetLoginComponent } from './auth/reset-login/reset-login/reset-login.component';

import {NgxPrintModule} from 'ngx-print';
import { SubjectTrackerComponent } from './anm-module/subject-tracker/subject-tracker.component';
import { StateComponent } from './admin/state/state.component';
import { DistrictComponent } from './admin/district/district.component';
import { BlockComponent } from './admin/block/block.component';
import { ChcComponent } from './admin/chc/chc.component';
import { PhcComponent } from './admin/phc/phc.component';
import { AVDComponent } from './admin/avd/avd.component';
// import { UserRoleComponent } from './admin/user-role/user-role.component';
import { IlrComponent } from './admin/ilr/ilr.component';
import { ScComponent } from './admin/sc/sc.component';
import { RiPointComponent } from './admin/ri-point/ri-point.component';
import { FacilityTypeComponent } from './admin/facility-type/facility-type.component';
import { HNINComponent } from './admin/hnin/hnin.component';
import { GvtIdTypeComponent } from './admin/gvt-id-type/gvt-id-type.component';
import { UserTypeComponent } from './admin/user-type/user-type.component';
import { timeStampPipe } from "./shared/pipe/timetamp.pipe";
import { TabsComponent } from './nhm/tabs/tabs.component';
import { TabComponent } from './nhm/tabs/tab.component';
import { UpdateResultsComponent } from './molecular-lab-results/hplc-pos-bloodsamples/update-results/update-results.component';
import { EditResultsComponent } from './molecular-lab-results/hplc-pos-bloodsamples/edit-results/edit-results.component';
import { ConfirmedResultsComponent } from './molecular-lab-results/hplc-pos-bloodsamples/confirmed-results/confirmed-results.component';
import { MlrNotificationComponent } from './molecular-lab-results/hplc-pos-bloodsamples/mlr-notification/mlr-notification.component';
import { CvsNotificationComponent } from './molecular-lab-results/cvs-specimen/cvs-notification/cvs-notification.component';
import { CvsUpdateresultComponent } from './molecular-lab-results/cvs-specimen/cvs-updateresult/cvs-updateresult.component';
import { CvsEditresultComponent } from './molecular-lab-results/cvs-specimen/cvs-editresult/cvs-editresult.component';
import { CvsConfirmedresultComponent } from './molecular-lab-results/cvs-specimen/cvs-confirmedresult/cvs-confirmedresult.component';







// const ngWizardConfig: NgWizardConfig = {
//   theme: THEME.default
// };

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    RoutingComponents,
    TestComponent,
    AnmShipmentComponent,
    AnmSubjectProfileComponent,
    AnmCollectionComponent,
    AnmViewShipmentdetailsComponent,
    NumberDirective,
    AnmPostMtpFollowupComponent,
    ChcPicknpackComponent,
    ChcShipmentlogComponent,
    ChcViewShipmentdetailsComponent,
    ChcSubjectProfileComponent,
    ChcDamagedSamplesComponent,
    ChcUnsentSamplesComponent,
    ChcTimeoutSamplesComponent,               
    ChcNotificationComponent,
    ChcPositiveSubjectComponent,
    SelectDropdownComponent,
    TextSearchPipe,
    ChcSamplePickpackComponent,
    PageUnderDevelopementComponent,
    ChcSampleCollectionComponent,
    ChcSampleShipmentlogComponent,
    ChcSampleViewShipmentComponent,
    ChcPendingPickpackComponent,
    ChcStartPickpackComponent,
    AppPasswordDirective,
    AboutUsComponent,
    AboutProgramComponent,
    ImportantLinksComponent,
    ChcSubjectProfileListComponent,
    AnmSubjectProfileListComponent,
    PrePndtcMainComponent,
    PrePndtcToBeScheduledComponent,
    PrePndtcScheduledComponent,
    CounsellingPrePndtMainComponent,
    ToBeCounselledComponent,
    CounselledDecisionYesComponent,
    CounselledDecisionNoComponent,
    StatereportListComponent,
    CounselledDecisionAwaitedComponent,
    UpdateDetailTestresultsComponent,
    UpdateDecisionNoPndtComponent,
    UpdateDecisionYesPndtComponent,
    UpdateDecisionPendingPndtComponent,
    SchedulePostPndtcMainComponent,
    SchedulePostPndtcScheduledComponent,
    SchedulePostPndtcToBeScheduledComponent,
    CounsellingPostPndtMainComponent,
    ToBePostPndtCounselledComponent,
    PostPndtcTestresultsComponent,
    PostCounsellingDecisionYesComponent,
    PostCounsellingDecisionNoComponent,
    PostCounsellingDecisionPendingComponent,
    PostPndtcDecisionYesComponent,
    PostPndtcDecisionNoComponent,
    PostPndtcDecisionAwaitedComponent,
    DistrictCoordinatorMainComponent,
    DamagedSamplesComponent,
    UnsentSamplesComponent,
    SampleTimeoutComponent,
    PositiveSubjectsComponent,
    // PathoreportStatusCoordinatorMainPrintComponent,
    // PathoreportStatusCoordinatorPrintComponent,
    PndtReferralComponent,
    MtpReferralComponent,
    PostMtpFollowupComponent,
    GetOtpComponent,
    ResetPasswordComponent,
    ResetLoginComponent,
    SubjectTrackerComponent,
    StateComponent,
    DistrictComponent,
    BlockComponent,
    ChcComponent,
    PhcComponent,
    TestComponent,
    AVDComponent,
    // UserRoleComponent,
    IlrComponent,
    ScComponent,  
    RiPointComponent,
    FacilityTypeComponent,
    HNINComponent,
    GvtIdTypeComponent,
    UserTypeComponent,
    timeStampPipe,
    TabsComponent,
    TabComponent,
    UpdateResultsComponent,
    EditResultsComponent,
   
    ConfirmedResultsComponent,
    MlrNotificationComponent,
    CvsNotificationComponent,
    CvsUpdateresultComponent,
    CvsEditresultComponent,
    CvsConfirmedresultComponent,
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule,
    ReactiveFormsModule,
    Ng2FlatpickrModule,
    NgMultiSelectDropDownModule.forRoot(),
    FileUploadModule,
    NgxPrintModule
   
  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorServiceService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    AuthGuard,
    CommonService,
    ConstantService,
    GenericService,
    DataService,
    CookieService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}