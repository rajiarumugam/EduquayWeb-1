import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MolecularCVSReport } from './molecule-cvs-report';


const routes: Routes = [
  {
    path: '', component: MolecularCVSReport, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MolecularCVDReportRoutingModule { }
