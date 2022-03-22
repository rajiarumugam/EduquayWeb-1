import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePregnacyRoutingModule } from './update-pregnacy.routing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {SharedModule} from './../_layout/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { DataTablesModule } from 'angular-datatables';

import { UpdatePregnacyMainComponent } from './update-pregnacy-main/update-pregnacy-main.component';
import { UpdatePregnacyComponent } from './update-pregnacy/update-pregnacy.component';

@NgModule({
  imports: [
    CommonModule,
    UpdatePregnacyRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    Ng2FlatpickrModule,
    DataTablesModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
  ],
  declarations: [UpdatePregnacyMainComponent, UpdatePregnacyComponent]
})
export class UpdatePregnacyModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/