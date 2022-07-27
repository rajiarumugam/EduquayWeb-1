import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistrictCoordinatorMainComponent } from "./district-coordinator-main/district-coordinator-main.component";
import { DamagedSamplesComponent } from "./damaged-samples/damaged-samples.component";
import { UnsentSamplesComponent } from "./unsent-samples/unsent-samples.component";
import { SampleTimeoutComponent } from "./sample-timeout/sample-timeout.component";
import { PositiveSubjectsComponent } from "./positive-subjects/positive-subjects.component";
import { PndtReferralComponent } from "./pndt-referral/pndt-referral.component";
import { MtpReferralComponent } from "./mtp-referral/mtp-referral.component";
import { PostMtpFollowupComponent } from "./post-mtp-followup/post-mtp-followup.component";

const routes: Routes = [
  {
    path: '', component: DistrictCoordinatorMainComponent,
      children:[
        {path: '', component: DamagedSamplesComponent, pathMatch: 'full'},
        {path: 'unsent-samples', component: UnsentSamplesComponent, pathMatch: 'full'},
        {path: 'sample-timeout', component: SampleTimeoutComponent, pathMatch: 'full'},
        {path: 'positive-subjects', component: PositiveSubjectsComponent, pathMatch: 'full'},
        {path: 'pndt-referral', component: PndtReferralComponent, pathMatch: 'full'},
        {path: 'mtp-referral', component: MtpReferralComponent, pathMatch: 'full'},
        {path: 'postmtp-follow-up', component: PostMtpFollowupComponent, pathMatch: 'full'}
      ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DCNotificationRoutingModule { 
  
}
