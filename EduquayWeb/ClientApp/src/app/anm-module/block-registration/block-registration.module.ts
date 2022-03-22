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
import { BlockSubjecttRegistrationComponent } from './block-subject-registration/block-subject-registration.component';
import { BlockAwRegistrationComponent } from './block-aw-registration/block-aw-registration.component';
import { blockSpouseRegistrationComponent } from './block-spouse-registration/block-spouse-registration.component';
import { BlockStudentRegistrationComponent } from './block-student-registration/block-student-registration.component';
import { AnmWalkinLt18RegistrationComponent } from './../registration/anm-walkin-lt18-registration/anm-walkin-lt18-registration.component';
import { AnmWalkinGt18RegistrationComponent } from './../registration/anm-walkin-gt18-registration/anm-walkin-gt18-registration.component';


import { BlockRegistrationRoutingModule } from './block-registration.routing';
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
    BlockRegistrationRoutingModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
  ],
  declarations: [BlockSubjecttRegistrationComponent, BlockAwRegistrationComponent, blockSpouseRegistrationComponent, BlockStudentRegistrationComponent, AnmWalkinLt18RegistrationComponent, AnmWalkinGt18RegistrationComponent]
})
export class BlockRegistrationModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/