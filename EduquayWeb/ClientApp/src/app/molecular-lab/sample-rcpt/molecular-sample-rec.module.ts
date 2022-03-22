import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MolecularSampleRcptRoutingModule } from './molecular-sample-rec.routing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {SharedModule} from '../../_layout/shared.module';
import { MolecularSampleRcptMainComponent } from './molecular-sample-rcpt-main/molecular-sample-rcpt-main.component';
import { MolecularSampleRcptComponent } from './molecular-sample-rec/molecular-sample-rec.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    MolecularSampleRcptRoutingModule,
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
  declarations: [MolecularSampleRcptMainComponent, MolecularSampleRcptComponent]
})
export class MolecularSampleRcptModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/