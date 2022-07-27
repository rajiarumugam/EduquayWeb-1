import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CounsellorreportListComponent } from "./counsellor-report-list.component";

const routes: Routes = [
  {
    path: '', component: CounsellorreportListComponent,
  }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounsellorreportListRoutingModule { 
  
}
