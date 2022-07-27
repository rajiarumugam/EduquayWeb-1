import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {SharedModule} from './../_layout/shared.module';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { DataTablesModule } from 'angular-datatables';
import { AnmNotificationComponent } from './anm-notification/anm-notification.component';
import { AnmDamagedSamplesComponent } from './anm-damaged-samples/anm-damaged-samples.component';
import { AnmUnsentSamplesComponent } from './anm-unsent-samples/anm-unsent-samples.component';
import { AnmTimeoutSamplesComponent } from './anm-timeout-samples/anm-timeout-samples.component';
import { AnmPositiveSubjectsComponent } from './anm-positive-subjects/anm-positive-subjects.component';
import { AnmPndReferralComponent } from './anm-pnd-referral/anm-pnd-referral.component';
import { AnmMtpReferralComponent } from './anm-mtp-referral/anm-mtp-referral.component';
import { AnmUpdateChcComponent } from './anm-update-chc/anm-update-chc.component';
import { AnmPostMtpFollowupComponent } from './anm-post-mtp-followup/anm-post-mtp-followup.component';
import { ANMNotificationRoutingModule } from './anm-notification.routing';
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
    ANMNotificationRoutingModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
  ],
  declarations: [AnmNotificationComponent, AnmDamagedSamplesComponent, AnmUnsentSamplesComponent, AnmTimeoutSamplesComponent, AnmPositiveSubjectsComponent, AnmPndReferralComponent, AnmMtpReferralComponent, AnmUpdateChcComponent, AnmPostMtpFollowupComponent  ]
})
export class ANMNotificationModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/