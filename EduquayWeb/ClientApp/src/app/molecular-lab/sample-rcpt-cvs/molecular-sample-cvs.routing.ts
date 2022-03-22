import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MolecularSampleRcptCVCMainComponent } from './molecular-sample-rcpt-cvc-main/molecular-sample-rcpt-cvc-main.component';
import { MolecularSampleRcptCVCComponent } from './molecular-sample-rec-cvc/molecular-sample-rec-cvc.component';

import { MLSampleRcptCSVResolverService } from "./../../shared/molecularlab/ml-sample-rcpt-csv-resolver.servic";

const routes: Routes = [
  {
    path: '', component: MolecularSampleRcptCVCMainComponent,
        children:[
          {path: '', component: MolecularSampleRcptCVCComponent, pathMatch: 'full', resolve: {mlSampleData: MLSampleRcptCSVResolverService}}
        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MolecularSampleRcptCVSRoutingModule { }
