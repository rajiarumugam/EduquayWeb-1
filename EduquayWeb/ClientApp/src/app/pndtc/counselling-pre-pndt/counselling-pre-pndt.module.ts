import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CounsellingPrePndtMainComponent } from "./counselling-pre-pndt-main/counselling-pre-pndt-main.component";
import { ToBeCounselledComponent } from "./to-be-counselled/to-be-counselled.component";
import { CounselledDecisionYesComponent } from "./counselled-decision-yes/counselled-decision-yes.component";
import { CounselledDecisionNoComponent } from "./counselled-decision-no/counselled-decision-no.component";
import { CounselledDecisionAwaitedComponent } from "./counselled-decision-awaited/counselled-decision-awaited.component";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { DataTablesModule } from 'angular-datatables';
import { CounsellingPrePMDTRoutingModule } from "./counselling-pre-pndt.routing";
import {SharedModule} from './../../_layout/shared.module';
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
    CounsellingPrePMDTRoutingModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
  ],
  declarations: [CounsellingPrePndtMainComponent,ToBeCounselledComponent,CounselledDecisionYesComponent,CounselledDecisionNoComponent,CounselledDecisionAwaitedComponent]
})
export class CounsellingPrePMDTModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/