import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChcSampleCollectionComponent } from './chc-sample-collection.component';

const routes: Routes = [
  {
    path: '', component: ChcSampleCollectionComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChcSampleCollectionRoutingModule { 
  
}
