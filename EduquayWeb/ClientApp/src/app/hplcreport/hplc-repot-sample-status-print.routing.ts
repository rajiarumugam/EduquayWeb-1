import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HplcreportSampleStatusPrintComponent } from './hplc-repot-sample-status-print/hplc-repot-sample-status-print.component';


const routes: Routes = [
  {
    path: '',
    component: HplcreportSampleStatusPrintComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HplcreportSampleStatusPrintRoutingModule { }
