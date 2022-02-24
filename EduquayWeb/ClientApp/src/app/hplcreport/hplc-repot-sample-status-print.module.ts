import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HplcreportSampleStatusPrintComponent } from './hplc-repot-sample-status-print/hplc-repot-sample-status-print.component';
import { HplcreportSampleStatusPrintRoutingModule } from './hplc-repot-sample-status-print.routing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HplcreportSampleStatusPrintRoutingModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
  ],
  declarations: [HplcreportSampleStatusPrintComponent]
})
export class HplcreportSampleStatusPrintModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/