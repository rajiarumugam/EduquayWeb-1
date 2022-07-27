import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MlrNotificationComponent } from "./hplc-pos-bloodsamples/mlr-notification/mlr-notification.component";
import { UpdateResultsComponent } from "./hplc-pos-bloodsamples/update-results/update-results.component";
import { EditResultsComponent } from "./hplc-pos-bloodsamples/edit-results/edit-results.component";
import { ConfirmedResultsComponent } from "./hplc-pos-bloodsamples/confirmed-results/confirmed-results.component";
import { HPLCPosPrintComponent } from "./hplc-pos-bloodsamples/hplc-pos-bloodsamples-reports-print/hplc-pos-bloodsamples-reports-print.component";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {SharedModule} from '../_layout/shared.module';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { DataTablesModule } from 'angular-datatables';
import { MolecularLabResultRoutingModule } from './molecular-lab-results.routing';
import { HPLCReportsMainComponent } from "./hplc-pos-bloodsamples/hplc-pos-bloodsamples-reports-print-main/hplc-pos-bloodsamples-reports-print-main.component";
//import { LoadScriptDirective } from "../shared/load-script.directive";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2FlatpickrModule,
    DataTablesModule,
    MolecularLabResultRoutingModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
  ],
  declarations: [MlrNotificationComponent,UpdateResultsComponent,EditResultsComponent,ConfirmedResultsComponent,HPLCPosPrintComponent,HPLCReportsMainComponent]
})
export class MolecularLabResultModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/