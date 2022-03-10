import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistrictreportListComponent } from "./district-report-list.component";



const routes: Routes = [
  {
    path: '',component: DistrictreportListComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictReportListRoutingModule { 
  
}
