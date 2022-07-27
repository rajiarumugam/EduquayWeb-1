import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MtpTestingSummaryMainComponent } from "./mtp-testing-summary-main/mtp-testing-summary-main.component";
import { mtpTestingSummaryComponent } from "./mtp-testing-summary/mtp-testing-summary.component";

import { MTPSummaryResolverService } from "./../../shared/mtp/mtp-summary-resolver.service";



const routes: Routes = [
  {
    path: '', component: MtpTestingSummaryMainComponent,
    children:[
      {path: '', component: mtpTestingSummaryComponent, pathMatch: 'full', resolve: {mtpTestingData: MTPSummaryResolverService}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MTPSummaryRoutingModule { 
  
}
