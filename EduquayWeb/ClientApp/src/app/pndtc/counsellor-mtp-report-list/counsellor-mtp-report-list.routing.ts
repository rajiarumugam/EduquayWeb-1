import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CounsellorMtpreportListComponent } from "./counsellor-mtp-report-list.component";

const routes: Routes = [
  {
    path: '', component: CounsellorMtpreportListComponent,
  }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounsellingMTPReportRoutingModule { 
  
}
