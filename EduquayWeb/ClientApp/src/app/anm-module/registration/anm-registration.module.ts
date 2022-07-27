import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {SharedModule} from './../../_layout/shared.module';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { DataTablesModule } from 'angular-datatables';
import { AnmSubjectRegistrationComponent } from './anm-subject-registration/anm-subject-registration.component';
import { AnmAwRegistrationComponent } from './anm-aw-registration/anm-aw-registration.component';
import { AnmSpouseRegistrationComponent } from './anm-spouse-registration/anm-spouse-registration.component';
import { AnmStudentRegistrationComponent } from './anm-student-registration/anm-student-registration.component';
import { AnmWalkinLt18RegistrationComponent } from './anm-walkin-lt18-registration/anm-walkin-lt18-registration.component';
import { AnmWalkinGt18RegistrationComponent } from './anm-walkin-gt18-registration/anm-walkin-gt18-registration.component';

import { ANMRegistrationRoutingModule } from './anm-registration.routing';
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
    ANMRegistrationRoutingModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
  ],
  declarations: [AnmSubjectRegistrationComponent, AnmAwRegistrationComponent, AnmSpouseRegistrationComponent, AnmStudentRegistrationComponent, AnmWalkinLt18RegistrationComponent, AnmWalkinGt18RegistrationComponent]
})
export class ANMRegistrationModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/