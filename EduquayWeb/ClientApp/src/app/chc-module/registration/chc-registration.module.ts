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
import { CheSubjectRegistrationComponent } from './chc-subject-registration/chc-subject-registration.component';
import { ChcwalkinRegistrationComponent } from './shared/walk-in-registration/walk-in-registration.component';
import { ChcpregnantRegistrationComponent } from './shared/pregnant-registration/pregnant-registration.component';
import { CheSpouseRegistrationComponent } from './shared/che-spouse-registration/che-spouse-registration.component';
import { ChcStudentRegistrationComponent } from './shared/chc-student-registration/chc-student-registration.component';
import { CHCRegistrationRoutingModule } from './chc-registration.routing';
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
    CHCRegistrationRoutingModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
  ],
  declarations: [CheSubjectRegistrationComponent, ChcwalkinRegistrationComponent, ChcpregnantRegistrationComponent, CheSpouseRegistrationComponent, ChcStudentRegistrationComponent]
})
export class CHCRegistrationModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/