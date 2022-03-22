import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePregnacyMainComponent } from './update-pregnacy-main/update-pregnacy-main.component';
import { UpdatePregnacyComponent } from './update-pregnacy/update-pregnacy.component';


const routes: Routes = [
  {
    path: '', component: UpdatePregnacyMainComponent,
        children:[
          {path: '', component: UpdatePregnacyComponent, pathMatch: 'full'}
        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatePregnacyRoutingModule { }
