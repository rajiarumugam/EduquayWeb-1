import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathoreportSampleStatusMainPrintComponentDC } from "./patho-repot-sample-status-print-main/patho-repot-sample-status-print-main.component";
import { PathoreportSampleStatusPrintComponentDC } from "./patho-repot-sample-status-print/patho-repot-sample-status-print.component";


const routes: Routes = [
  {
    path: '', component: PathoreportSampleStatusMainPrintComponentDC,
        children:[
          {path: '', component: PathoreportSampleStatusPrintComponentDC, pathMatch: 'full'},

        ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PathoreportSampleStatusRoutingModule { 
  
}
