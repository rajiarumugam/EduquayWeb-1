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

import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

import { DataService } from './shared/data.service';
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



const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

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
    CounselledDecisionAwaitedComponent
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