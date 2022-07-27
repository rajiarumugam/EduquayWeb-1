import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MTPreportListComponent } from "./mtp-report-list.component";

const routes: Routes = [
  {
    path: '', component: MTPreportListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MTPReportListRoutingModule { 
  
}
