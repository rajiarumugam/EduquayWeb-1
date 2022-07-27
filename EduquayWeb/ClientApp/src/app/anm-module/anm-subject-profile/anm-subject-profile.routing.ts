import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnmSubjectProfileComponent } from './anm-subject-profile.component';


const routes: Routes = [
  {
    path: '', component: AnmSubjectProfileComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ANMSubjectProfileRoutingModule { 
  
}
