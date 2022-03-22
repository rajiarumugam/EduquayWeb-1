import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportSampleStatusMainComponent } from './repot-sample-status-main/repot-sample-status-main.component';
import { ReportSampleStatusComponent } from './repot-sample-status/repot-sample-status.component';

import { MolucularLabReportResolverService } from "./../../shared/molecularlab/mi-report-resolver.service";

const routes: Routes = [
  {
    path: '', component: ReportSampleStatusMainComponent,
    children:[
      {path: '', component: ReportSampleStatusComponent, pathMatch: 'full', resolve: {mlReport: MolucularLabReportResolverService}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportSampleStatusRoutingModule { }
