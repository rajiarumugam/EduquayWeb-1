import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnmChcSubjectProfileComponent } from './anm-chc-subject-profile.component';

const routes: Routes = [
  {
    path: '', component: AnmChcSubjectProfileComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ANMSubjectProfileRoutingModule { 
  
}
