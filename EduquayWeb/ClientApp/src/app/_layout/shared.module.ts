import {SiteSidebarComponent} from './site-sidebar/site-sidebar.component';
import { CommonDataTableComponent } from "./../shared/common-data-table/common-data-table.component";
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { CheSpouseComponent } from "./../shared/chc-module/che-spouse/che-spouse.component";
import { SelectDropdownComponent } from "./../shared/directive/select-dropdown/select-dropdown.component";
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { TextSearchPipe } from './../shared/directive/text-search.pipe';
import { AssociatedANMComponent } from "./../chc-module/registration/shared/associated-anm/associated-anm.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        DataTablesModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2FlatpickrModule,
        MatStepperModule,MatInputModule,MatButtonModule,MatAutocompleteModule,MatIconModule,MatCardModule,MatSliderModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: httpTranslateLoader,
              deps: [HttpClient]
            }
          }),
      ],
    declarations: [
      AssociatedANMComponent,TextSearchPipe,SelectDropdownComponent,SiteSidebarComponent,CommonDataTableComponent,CheSpouseComponent
    ],
    exports: [ 
      AssociatedANMComponent,TextSearchPipe,SelectDropdownComponent,SiteSidebarComponent,CommonDataTableComponent,CheSpouseComponent
    ],
})
export class SharedModule {
}
export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }