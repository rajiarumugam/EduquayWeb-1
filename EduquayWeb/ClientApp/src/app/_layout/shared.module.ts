import {SiteSidebarComponent} from './site-sidebar/site-sidebar.component';
import { CommonDataTableComponent } from "./../shared/common-data-table/common-data-table.component";
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        DataTablesModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: httpTranslateLoader,
              deps: [HttpClient]
            }
          }),
      ],
    declarations: [
        SiteSidebarComponent,CommonDataTableComponent
    ],
    exports: [ 
        SiteSidebarComponent,CommonDataTableComponent
    ],
})
export class SharedModule {
}
export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }