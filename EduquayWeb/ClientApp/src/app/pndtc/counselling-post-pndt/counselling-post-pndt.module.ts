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
import { CounsellingPostPNDTRoutingModule } from "./counselling-post-pndt.routing";
import {SharedModule} from '../../_layout/shared.module';

import { CounsellingPostPndtMainComponent } from "./counselling-post-pndt-main/counselling-post-pndt-main.component";
import { ToBePostPndtCounselledComponent } from "./to-be-post-pndt-counselled/to-be-post-pndt-counselled.component";
import { PostCounsellingDecisionYesComponent } from "./post-counselling-decision-yes/post-counselling-decision-yes.component";
import { PostCounsellingDecisionNoComponent } from "./post-counselling-decision-no/post-counselling-decision-no.component";
import { PostCounsellingDecisionPendingComponent } from "./post-counselling-decision-pending/post-counselling-decision-pending.component";
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
    CounsellingPostPNDTRoutingModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
  ],
  declarations: [CounsellingPostPndtMainComponent, ToBePostPndtCounselledComponent, PostCounsellingDecisionYesComponent, PostCounsellingDecisionNoComponent, PostCounsellingDecisionPendingComponent]
})
export class CounsellingPostPNDTModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/