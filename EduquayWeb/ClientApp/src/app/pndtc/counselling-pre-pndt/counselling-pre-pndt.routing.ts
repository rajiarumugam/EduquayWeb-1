import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CounsellingPrePndtMainComponent } from "./counselling-pre-pndt-main/counselling-pre-pndt-main.component";
import { ToBeCounselledComponent } from "./to-be-counselled/to-be-counselled.component";
import { CounselledDecisionYesComponent } from "./counselled-decision-yes/counselled-decision-yes.component";
import { CounselledDecisionNoComponent } from "./counselled-decision-no/counselled-decision-no.component";
import { CounselledDecisionAwaitedComponent } from "./counselled-decision-awaited/counselled-decision-awaited.component";

import { ToBeSchedulingResolverService } from "../../shared/pndtc/schedule-pre-pndtc/to-be-scheduling-resolver.service";
import { ScheduledResolverService } from "../../shared/pndtc/schedule-pre-pndtc/scheduled-resolver.service";

const routes: Routes = [
  {
      path: '', component: CounsellingPrePndtMainComponent,
      children:[
        {path: '', component: ToBeCounselledComponent, pathMatch: 'full'},
        {path: 'counselledyes', component: CounselledDecisionYesComponent, pathMatch: 'full'},
        {path: 'counselledno', component: CounselledDecisionNoComponent, pathMatch: 'full'},
        {path: 'counselledawaited', component: CounselledDecisionAwaitedComponent, pathMatch: 'full'}
      ]
  }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounsellingPrePMDTRoutingModule { 
  
}
