import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {SharedModule} from '../../_layout/shared.module';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { DataTablesModule } from 'angular-datatables';
import { PNDTestingRoutingModule } from './pnd-testing-main.routing';

import { PndTestingMainComponent } from "./pnd-testing-main/pnd-testing-main.component";
import { pndTestingComponent } from "./pnd-testing/pnd-testing.component";
import { pndNotCompleteComponent } from "./pnd-not-complete/pnd-not-complete.component";
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
    PNDTestingRoutingModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
  ],
  declarations: [PndTestingMainComponent,pndTestingComponent, pndNotCompleteComponent]
})
export class PNDTestingModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/