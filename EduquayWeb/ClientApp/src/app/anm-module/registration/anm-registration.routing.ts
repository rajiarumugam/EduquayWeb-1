import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnmSubjectRegistrationComponent } from './anm-subject-registration/anm-subject-registration.component';
import { AnmAwRegistrationComponent } from './anm-aw-registration/anm-aw-registration.component';
import { AnmSpouseRegistrationComponent } from './anm-spouse-registration/anm-spouse-registration.component';
import { AnmStudentRegistrationComponent } from './anm-student-registration/anm-student-registration.component';
import { AnmWalkinLt18RegistrationComponent } from './anm-walkin-lt18-registration/anm-walkin-lt18-registration.component';
import { AnmWalkinGt18RegistrationComponent } from './anm-walkin-gt18-registration/anm-walkin-gt18-registration.component';


import { SpouseResolverService } from "./../../shared/anm-module/registration/spouse/spouse-resolver.service";


const routes: Routes = [
  {
    path: '', component: AnmSubjectRegistrationComponent,
    children:[
      {path: '', component: AnmAwRegistrationComponent, pathMatch: 'full'},
      {path: 'awreg', component: AnmAwRegistrationComponent, pathMatch: 'full'},
      {path: 'spouse', component: AnmSpouseRegistrationComponent, pathMatch: 'full', resolve: {positiveSubjects: SpouseResolverService}},
      {path: 'student', component: AnmStudentRegistrationComponent, pathMatch: 'full'},
      {path: 'walkin', component: AnmWalkinLt18RegistrationComponent, pathMatch: 'full'},
      {path: 'otherwalkin', component: AnmWalkinGt18RegistrationComponent, pathMatch: 'full'},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ANMRegistrationRoutingModule { 
  
}
