import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MTPServicMainComponent } from "./mtp-service-main/mtp-service-main.component";
import { MTPPendingComponent } from "./mtp-sevice-pending/mtp-sevice-pending.component";
import { MTPServiceCompletedComponent } from "./mtp-sevice-completed/mtp-sevice-completed.component";

import { MTPPendingResolverService } from "./../../shared/mtp/mtp-pending-resolver.service";
import { MTPCompletedResolverService } from "./../../shared/mtp/mtp-completed-resolver.service";



const routes: Routes = [
  {
    path: '', component: MTPServicMainComponent,
    children:[
      {path: '', component: MTPPendingComponent, pathMatch: 'full', resolve: {MTPTesting: MTPPendingResolverService}},
      {path: 'completed', component: MTPServiceCompletedComponent, pathMatch: 'full', resolve: {MTPTesting: MTPCompletedResolverService}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MTPServiceRoutingModule { 
  
}
