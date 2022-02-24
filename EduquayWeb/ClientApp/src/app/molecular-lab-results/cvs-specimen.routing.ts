import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CvsNotificationComponent } from "./cvs-specimen/cvs-notification/cvs-notification.component";
import { CvsUpdateresultComponent } from "./cvs-specimen/cvs-updateresult/cvs-updateresult.component";
import { CvsEditresultComponent } from "./cvs-specimen/cvs-editresult/cvs-editresult.component";
import { CvsConfirmedresultComponent } from "./cvs-specimen/cvs-confirmedresult/cvs-confirmedresult.component";
import { CVSPosPrintComponent } from "./cvs-specimen/cvs-specimen-reports-print/cvs-specimen-reports-print.component";
import { CVSReportsMainComponent } from "./cvs-specimen/cvs-specimen-reports-print-main/cvs-specimen-reports-print-main.component";


const routes: Routes = [
  {
    path: '', component: CvsNotificationComponent,
    children: [
      { path: '', component: CvsUpdateresultComponent, pathMatch: 'full'},  //resolve:{damagedSamplesData: DamagedSamplesResolverService}},
      { path: 'cvs-edit-result', component: CvsEditresultComponent, pathMatch: 'full'}, // resolve:{unsentSamplesData: UnsentSamplesResolverService}
      { path: 'cvs-confirmed-result', component: CvsConfirmedresultComponent, pathMatch: 'full'}, //resolve:{timeoutSamplesData: TimeoutExpiryResolverService}},
      { path: 'reports', component: CVSPosPrintComponent, pathMatch: 'full'}, //resolve:{timeoutSamplesData: TimeoutExpiryResolverService}},
    ]
  },
  {
    path: 'cvs-reoprts', component: CVSReportsMainComponent,
    children: [

      { path: '', component: CVSPosPrintComponent, pathMatch: 'full'}, //resolve:{timeoutSamplesData: TimeoutExpiryResolverService}},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CVSSpecimenRoutingModule { 
  
}
