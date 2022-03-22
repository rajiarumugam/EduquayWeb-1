import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChcSubjectProfileComponent } from './chc-subject-profile.component';

const routes: Routes = [
  {
    path: '', component: ChcSubjectProfileComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CHCSubjectProfileRoutingModule { 
  
}
