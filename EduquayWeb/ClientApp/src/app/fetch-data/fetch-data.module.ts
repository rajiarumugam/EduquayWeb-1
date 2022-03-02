import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {SharedModule} from '../_layout/shared.module';
import {RouterModule} from '@angular/router';
import { FetchDataComponent } from "./fetch-data.component";
import { FetchDataRoutingModule } from './fetch-data.routing';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FetchDataRoutingModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
  ],
  declarations: [FetchDataComponent]
})
export class FetchDataModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/