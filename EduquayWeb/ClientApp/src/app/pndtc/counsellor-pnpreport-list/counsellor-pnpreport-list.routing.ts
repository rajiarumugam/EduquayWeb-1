import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CounsellorpnpreportListComponent } from "./counsellor-pnpreport-list.component";

const routes: Routes = [
  {
    path: '', component: CounsellorpnpreportListComponent,
  }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounsellingpnpreportListRoutingModule { 
  
}
