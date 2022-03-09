import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CounsellingPostPndtMainComponent } from "./counselling-post-pndt-main/counselling-post-pndt-main.component";
import { ToBePostPndtCounselledComponent } from "./to-be-post-pndt-counselled/to-be-post-pndt-counselled.component";
import { PostCounsellingDecisionYesComponent } from "./post-counselling-decision-yes/post-counselling-decision-yes.component";
import { PostCounsellingDecisionNoComponent } from "./post-counselling-decision-no/post-counselling-decision-no.component";
import { PostCounsellingDecisionPendingComponent } from "./post-counselling-decision-pending/post-counselling-decision-pending.component";

const routes: Routes = [
  {
    path: '', component: CounsellingPostPndtMainComponent,
    children:[
      {path: '', component: ToBePostPndtCounselledComponent, pathMatch: 'full'},
      {path: 'counselledyes', component: PostCounsellingDecisionYesComponent, pathMatch: 'full'},
      {path: 'counselledno', component: PostCounsellingDecisionNoComponent, pathMatch: 'full'},
      {path: 'counselledawaited', component: PostCounsellingDecisionPendingComponent, pathMatch: 'full'}
    ]
  }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounsellingPostPNDTRoutingModule { 
  
}
