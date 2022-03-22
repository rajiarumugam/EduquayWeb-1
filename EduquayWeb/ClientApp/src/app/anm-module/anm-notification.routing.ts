import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnmNotificationComponent } from './anm-notification/anm-notification.component';
import { AnmDamagedSamplesComponent } from './anm-damaged-samples/anm-damaged-samples.component';
import { AnmUnsentSamplesComponent } from './anm-unsent-samples/anm-unsent-samples.component';
import { AnmTimeoutSamplesComponent } from './anm-timeout-samples/anm-timeout-samples.component';
import { AnmPositiveSubjectsComponent } from './anm-positive-subjects/anm-positive-subjects.component';
import { AnmPndReferralComponent } from './anm-pnd-referral/anm-pnd-referral.component';
import { AnmMtpReferralComponent } from './anm-mtp-referral/anm-mtp-referral.component';
import { AnmUpdateChcComponent } from './anm-update-chc/anm-update-chc.component';
import { AnmPostMtpFollowupComponent } from './anm-post-mtp-followup/anm-post-mtp-followup.component';


const routes: Routes = [
  {
    path: '', component: AnmNotificationComponent,
        children: [
          { path: '', component: AnmDamagedSamplesComponent, pathMatch: 'full'},  //resolve:{damagedSamplesData: DamagedSamplesResolverService}},
          { path: 'unsent', component: AnmUnsentSamplesComponent, pathMatch: 'full'}, // resolve:{unsentSamplesData: UnsentSamplesResolverService}
          { path: 'timeout', component: AnmTimeoutSamplesComponent, pathMatch: 'full'}, //resolve:{timeoutSamplesData: TimeoutExpiryResolverService}},
          { path: 'positive', component: AnmPositiveSubjectsComponent, pathMatch: 'full'}, //resolve:{positiveSubjectData: PositiveSubjectsResolverService} },
          { path: 'pndreferral', component: AnmPndReferralComponent, pathMatch: 'full' },
          { path: 'mtpreferral', component: AnmMtpReferralComponent, pathMatch: 'full' },
          { path: 'updatechc', component: AnmUpdateChcComponent, pathMatch: 'full' },
          { path: 'postmtp', component: AnmPostMtpFollowupComponent, pathMatch: 'full' }
        ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ANMNotificationRoutingModule { 
  
}
