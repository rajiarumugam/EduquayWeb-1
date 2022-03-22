import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MolecularBloodSampleReciptComponent } from './molecule-blood-sample-recp';


const routes: Routes = [
  {
    path: '', component: MolecularBloodSampleReciptComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MolecularBloodSampleRcptRoutingModule { }
