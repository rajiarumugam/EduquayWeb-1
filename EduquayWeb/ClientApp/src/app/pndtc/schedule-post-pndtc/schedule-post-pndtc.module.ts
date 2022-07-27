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
import { SchedulePostPndtcRoutingModule } from "./schedule-post-pndtc.routing";
import {SharedModule} from '../../_layout/shared.module';

import { SchedulePostPndtcMainComponent } from "./schedule-post-pndtc-main/schedule-post-pndtc-main.component";
import { SchedulePostPndtcToBeScheduledComponent } from "./schedule-post-pndtc-to-be-scheduled/schedule-post-pndtc-to-be-scheduled.component";
import { SchedulePostPndtcScheduledComponent } from "./schedule-post-pndtc-scheduled/schedule-post-pndtc-scheduled.component";
//import { LoadScriptDirective } from "../shared/load-script.directive";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2FlatpickrModule,
    DataTablesModule,
    SchedulePostPndtcRoutingModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
  ],
  declarations: [SchedulePostPndtcMainComponent,SchedulePostPndtcToBeScheduledComponent, SchedulePostPndtcScheduledComponent]
})
export class SchedulePostPndtcModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/