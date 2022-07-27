import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulePostPndtcMainComponent } from "./schedule-post-pndtc-main/schedule-post-pndtc-main.component";
import { SchedulePostPndtcToBeScheduledComponent } from "./schedule-post-pndtc-to-be-scheduled/schedule-post-pndtc-to-be-scheduled.component";
import { SchedulePostPndtcScheduledComponent } from "./schedule-post-pndtc-scheduled/schedule-post-pndtc-scheduled.component";

import { PostSchedulingResolverService } from  "../../shared/pndtc/schedule-post-pndtc/post-scheduling-resolver.service";
import { PostScheduledResolverService } from  "../../shared/pndtc/schedule-post-pndtc/post-scheduled-resolver.service";

const routes: Routes = [
  {
    path: '', component: SchedulePostPndtcMainComponent,
    children:[
      {path: '', component: SchedulePostPndtcToBeScheduledComponent, pathMatch: 'full', resolve: {postScheduling: PostSchedulingResolverService}},
      {path: 'scheduled', component: SchedulePostPndtcScheduledComponent, pathMatch: 'full', resolve: {postScheduled: PostScheduledResolverService}},
    ]
  }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulePostPndtcRoutingModule { 
  
}
