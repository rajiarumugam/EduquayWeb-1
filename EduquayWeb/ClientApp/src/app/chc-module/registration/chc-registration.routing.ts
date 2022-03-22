import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheSubjectRegistrationComponent } from './chc-subject-registration/chc-subject-registration.component';
import { ChcwalkinRegistrationComponent } from './shared/walk-in-registration/walk-in-registration.component';
import { ChcpregnantRegistrationComponent } from './shared/pregnant-registration/pregnant-registration.component';
import { CheSpouseRegistrationComponent } from './shared/che-spouse-registration/che-spouse-registration.component';
import { ChcStudentRegistrationComponent } from './shared/chc-student-registration/chc-student-registration.component';

const routes: Routes = [
  {
    path: '', component: CheSubjectRegistrationComponent,
    children:[
      {path: '', component: ChcwalkinRegistrationComponent, pathMatch: 'full'},
      {path: 'awreg', component: ChcpregnantRegistrationComponent, pathMatch: 'full'},
      {path: 'spouse', component: CheSpouseRegistrationComponent, pathMatch: 'full'},
      {path: 'student', component: ChcStudentRegistrationComponent, pathMatch: 'full'},
      {path: 'walkin', component: ChcwalkinRegistrationComponent, pathMatch: 'full'}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CHCRegistrationRoutingModule { 
  
}
