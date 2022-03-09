import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CSVSpecimenMainComponent } from "./csv-specimen-main/csv-specimen-main.component";
import { CSVspecimenComponent } from "./csv-specimen/csv-specimen.component";
import { CSVspecimenStartComponent } from "./csv-specimen-start/csv-specimen-start.component";

const routes: Routes = [
  {
      path: '', component: CSVSpecimenMainComponent,
      children:[
        {path: '', component: CSVspecimenComponent, pathMatch: 'full'},
        {path: 'csvstart', component: CSVspecimenStartComponent, pathMatch: 'full'}

      ]
  }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CVSSpecimenRoutingModule { 
  
}
