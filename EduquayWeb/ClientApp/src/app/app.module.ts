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
//import { ChcSampleCollectionComponent } from './chc-module/sample-collection/chc-sample-collection.component';


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
    //ChcSampleCollectionComponent
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
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}