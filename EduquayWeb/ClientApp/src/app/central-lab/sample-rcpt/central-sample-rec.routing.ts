import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CentralSampleRcptMainComponent } from './central-sample-rcpt-main/central-sample-rcpt-main.component';
import { CentralSampleRcptComponent } from './central-sample-rec/central-sample-rec.component';

import { CentrallabSampleResolverService } from "./../../shared/centrallab/central-sample-resolver.service";

const routes: Routes = [
  {
    path: '', component: CentralSampleRcptMainComponent,
    children:[
      {path: '', component: CentralSampleRcptComponent, pathMatch: 'full', resolve: {positiveSubjects: CentrallabSampleResolverService}}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentralSampleRecRoutingModule { 
  
}
