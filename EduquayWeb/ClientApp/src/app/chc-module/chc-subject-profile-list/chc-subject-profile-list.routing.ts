import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChcSubjectProfileListComponent } from './chc-subject-profile-list.component';

const routes: Routes = [
  {
    path: '', component: ChcSubjectProfileListComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CHCSubjectProfileListRoutingModule { 
  
}
