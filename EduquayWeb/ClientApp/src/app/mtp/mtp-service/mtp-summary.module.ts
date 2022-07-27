import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { DataTablesModule } from 'angular-datatables';
import { MTPSummaryRoutingModule } from './mtp-summary.routing';
import {SharedModule} from '../../_layout/shared.module';

import { MtpTestingSummaryMainComponent } from "./mtp-testing-summary-main/mtp-testing-summary-main.component";
import { mtpTestingSummaryComponent } from "./mtp-testing-summary/mtp-testing-summary.component";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2FlatpickrModule,
    DataTablesModule,
    MTPSummaryRoutingModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
  ],
  declarations: [MtpTestingSummaryMainComponent,mtpTestingSummaryComponent]
})
export class MTPSummaryModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/