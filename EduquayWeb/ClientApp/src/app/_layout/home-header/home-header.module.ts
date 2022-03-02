import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HomeHeaderComponent } from "./home-header.component";
import {RouterModule} from '@angular/router';
import { NavMenuModule } from "./../../nav-menu/nav-menu.module";
//import { LoadScriptDirective } from "../shared/load-script.directive";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    NavMenuModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
  ],
  declarations: [HomeHeaderComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeHeaderModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/