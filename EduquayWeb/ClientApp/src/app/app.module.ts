import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AppRoutingModule, RoutingComponents } from './app.routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

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
    NgWizardModule.forRoot(ngWizardConfig)
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
    GenericService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}