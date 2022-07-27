import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {SharedModule} from './../../_layout/shared.module';
import {RouterModule} from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { PathoreportSampleStatusRoutingModule } from './repot-patho-sample-status.routing';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { PathoreportSampleStatusMainPrintComponentDC } from "./patho-repot-sample-status-print-main/patho-repot-sample-status-print-main.component";
import { PathoreportSampleStatusPrintComponentDC } from "./patho-repot-sample-status-print/patho-repot-sample-status-print.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
        ReactiveFormsModule,
    PathoreportSampleStatusRoutingModule,
    Ng2FlatpickrModule,
    DataTablesModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
  ],
  declarations: [PathoreportSampleStatusMainPrintComponentDC, PathoreportSampleStatusPrintComponentDC]
})
export class PathoreportSampleStatusModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/