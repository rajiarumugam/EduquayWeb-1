import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrePndtcMainComponent } from "./pre-pndtc-main/pre-pndtc-main.component";
import { PrePndtcScheduledComponent } from "./pre-pndtc-scheduled/pre-pndtc-scheduled.component";
import { PrePndtcToBeScheduledComponent } from "./pre-pndtc-to-be-scheduled/pre-pndtc-to-be-scheduled.component";

import { ToBeSchedulingResolverService } from "./../../shared/pndtc/schedule-pre-pndtc/to-be-scheduling-resolver.service";
import { ScheduledResolverService } from "./../../shared/pndtc/schedule-pre-pndtc/scheduled-resolver.service";

const routes: Routes = [
  {
    path: '', component: PrePndtcMainComponent,
    children:[
      {path: '', component: PrePndtcToBeScheduledComponent, pathMatch: 'full', resolve: {tobeScheduling: ToBeSchedulingResolverService}},
      {path: 'scheduled', component: PrePndtcScheduledComponent, pathMatch: 'full', resolve: {preScheduled: ScheduledResolverService}}
    ]
  }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { 
  
}
