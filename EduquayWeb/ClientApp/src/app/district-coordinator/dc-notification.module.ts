import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {SharedModule} from '../_layout/shared.module';
import {RouterModule} from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { DCNotificationRoutingModule } from './dc-notification.routing';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { DistrictCoordinatorMainComponent } from "./district-coordinator-main/district-coordinator-main.component";
import { DamagedSamplesComponent } from "./damaged-samples/damaged-samples.component";
import { UnsentSamplesComponent } from "./unsent-samples/unsent-samples.component";
import { SampleTimeoutComponent } from "./sample-timeout/sample-timeout.component";
import { PositiveSubjectsComponent } from "./positive-subjects/positive-subjects.component";
import { PndtReferralComponent } from "./pndt-referral/pndt-referral.component";
import { MtpReferralComponent } from "./mtp-referral/mtp-referral.component";
import { PostMtpFollowupComponent } from "./post-mtp-followup/post-mtp-followup.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    DCNotificationRoutingModule,
    DataTablesModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
  ],
  declarations: [DistrictCoordinatorMainComponent, DamagedSamplesComponent, UnsentSamplesComponent, SampleTimeoutComponent, PositiveSubjectsComponent, PndtReferralComponent, MtpReferralComponent, PostMtpFollowupComponent]
})
export class DCNotificationModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/