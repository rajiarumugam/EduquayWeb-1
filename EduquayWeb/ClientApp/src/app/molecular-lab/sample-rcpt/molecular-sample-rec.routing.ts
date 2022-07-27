import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MolecularSampleRcptMainComponent } from './molecular-sample-rcpt-main/molecular-sample-rcpt-main.component';
import { MolecularSampleRcptComponent } from './molecular-sample-rec/molecular-sample-rec.component';

import { MLSampleRcptResolverService } from "./../../shared/molecularlab/ml-sample-rcpt-resolver.service";

const routes: Routes = [
  {
    path: '', component: MolecularSampleRcptMainComponent,
        children:[
          {path: '', component: MolecularSampleRcptComponent, pathMatch: 'full', resolve: {mlSampleData: MLSampleRcptResolverService}}
        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MolecularSampleRcptRoutingModule { }
