import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PndTestingSummaryMainComponent } from "./pnd-testing-summary-main/pnd-testing-summary-main.component";
import { pndTestingSummaryComponent } from "./pnd-testing-summary/pnd-testing-summary.component";

import { PNDTCSummaryResolverService } from "./../../shared/pndtc/pndtc-summary-resolver.service";


const routes: Routes = [
  {
    path: '', component: PndTestingSummaryMainComponent,
    children:[
      {path: '', component: pndTestingSummaryComponent, pathMatch: 'full', resolve: {pndtcTesting: PNDTCSummaryResolverService}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PNDTestingSummaryRoutingModule { 
  
}
