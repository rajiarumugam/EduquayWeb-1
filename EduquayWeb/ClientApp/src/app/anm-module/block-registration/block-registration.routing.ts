import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlockSubjecttRegistrationComponent } from './block-subject-registration/block-subject-registration.component';
import { BlockAwRegistrationComponent } from './block-aw-registration/block-aw-registration.component';
import { blockSpouseRegistrationComponent } from './block-spouse-registration/block-spouse-registration.component';
import { BlockStudentRegistrationComponent } from './block-student-registration/block-student-registration.component';
import { AnmWalkinLt18RegistrationComponent } from './../registration/anm-walkin-lt18-registration/anm-walkin-lt18-registration.component';
import { AnmWalkinGt18RegistrationComponent } from './../registration/anm-walkin-gt18-registration/anm-walkin-gt18-registration.component';


import { SpouseResolverService } from "../../shared/anm-module/registration/spouse/spouse-resolver.service";


const routes: Routes = [
  {
    path: '', component: BlockSubjecttRegistrationComponent,
        children:[
          {path: '', component: BlockAwRegistrationComponent, pathMatch: 'full'},
          {path: 'awreg', component: BlockAwRegistrationComponent, pathMatch: 'full'},
          {path: 'spouse', component: blockSpouseRegistrationComponent, pathMatch: 'full', resolve: {positiveSubjects: SpouseResolverService}},
          {path: 'student', component: BlockStudentRegistrationComponent, pathMatch: 'full'},
          {path: 'walkin', component: AnmWalkinLt18RegistrationComponent, pathMatch: 'full'},
          {path: 'otherwalkin', component: AnmWalkinGt18RegistrationComponent, pathMatch: 'full'},
        ]

  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockRegistrationRoutingModule { 
  
}
