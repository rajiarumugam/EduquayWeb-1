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
import { ChcSubjectProfileListComponent } from './chc-subject-profile-list.component';
import { CHCSubjectProfileListRoutingModule } from './chc-subject-profile-list.routing';
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
    CHCSubjectProfileListRoutingModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
  ],
  declarations: [ChcSubjectProfileListComponent]
})
export class CHCSubjectProfileListModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/