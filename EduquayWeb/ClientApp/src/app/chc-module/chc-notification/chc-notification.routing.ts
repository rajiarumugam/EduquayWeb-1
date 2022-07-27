import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChcNotificationComponent } from './chc-notification/chc-notification.component';
import { ChcDamagedSamplesComponent } from './chc-damaged-samples/chc-damaged-samples.component';
import { ChcUnsentSamplesComponent } from './chc-unsent-samples/chc-unsent-samples.component';
import { ChcTimeoutSamplesComponent } from './chc-timeout-samples/chc-timeout-samples.component';
import { ChcPositiveSubjectComponent } from './chc-positive-subject/chc-positive-subject.component';

import { ChcPositiveSubjectResolverService } from "./../../shared/chc-module/chc-positive-subject/chc-positive-subject-resolver.service";

const routes: Routes = [
  {
    path: '', component: ChcNotificationComponent,
        children: [
          { path: '', component: ChcDamagedSamplesComponent, pathMatch: 'full'}, // resolve:{chcdamagedSamplesData: ChcDamagedsamplesResolverService}
          { path: 'chc-unsent', component: ChcUnsentSamplesComponent, pathMatch: 'full' }, // resolve:{chcunsentSamplesData: ChcUnsentSamplesResolverService}
          { path: 'chc-timeout', component: ChcTimeoutSamplesComponent, pathMatch: 'full'}, // resolve:{chctimeoutSamplesData: ChcTimeoutsamplesResolverService}
          { path: 'chc-positive', component: ChcPositiveSubjectComponent, pathMatch: 'full', resolve:{chcpositiveSubjectData: ChcPositiveSubjectResolverService} },
        ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CHCNotificationRoutingModule { 
  
}
