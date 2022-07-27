import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PndTestingMainComponent } from "./pnd-testing-main/pnd-testing-main.component";
import { pndTestingComponent } from "./pnd-testing/pnd-testing.component";
import { pndNotCompleteComponent } from "./pnd-not-complete/pnd-not-complete.component";

import { PNDTCPendingResolverService } from "./../../shared/pndtc/pndtc-pending-resolver.service";
import { PNDTCCompletedResolverService } from "./../../shared/pndtc/pndtc-completed-resolver.service";


const routes: Routes = [
  {
    path: '', component: PndTestingMainComponent,
        children:[
          {path: '', component: pndTestingComponent, pathMatch: 'full', resolve: {pndtcTesting: PNDTCPendingResolverService}},
          {path: 'notcompleted', component: pndNotCompleteComponent, pathMatch: 'full', resolve: {pndtcTesting: PNDTCCompletedResolverService}},

        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PNDTestingRoutingModule { 
  
}
