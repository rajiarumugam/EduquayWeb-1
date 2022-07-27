import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MolecularCVSSampleReciptComponent } from './molecule-cvs-sample-recp';


const routes: Routes = [
  {
    path: '', component: MolecularCVSSampleReciptComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MolecularCVSSampleRcptRoutingModule { }
