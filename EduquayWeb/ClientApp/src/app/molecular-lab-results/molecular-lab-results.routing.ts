import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { MlrNotificationComponent } from "./hplc-pos-bloodsamples/mlr-notification/mlr-notification.component";
import { UpdateResultsComponent } from "./hplc-pos-bloodsamples/update-results/update-results.component";
import { EditResultsComponent } from "./hplc-pos-bloodsamples/edit-results/edit-results.component";
import { ConfirmedResultsComponent } from "./hplc-pos-bloodsamples/confirmed-results/confirmed-results.component";
import { HPLCPosPrintComponent } from "./hplc-pos-bloodsamples/hplc-pos-bloodsamples-reports-print/hplc-pos-bloodsamples-reports-print.component";
import { HPLCReportsMainComponent } from "./hplc-pos-bloodsamples/hplc-pos-bloodsamples-reports-print-main/hplc-pos-bloodsamples-reports-print-main.component";


const routes: Routes = [
  {
    path: '', component: MlrNotificationComponent,
    children: [
      { path: '', component: UpdateResultsComponent, pathMatch: 'full'},  //resolve:{damagedSamplesData: DamagedSamplesResolverService}},
      { path: 'edit-result', component: EditResultsComponent, pathMatch: 'full'}, // resolve:{unsentSamplesData: UnsentSamplesResolverService}
      { path: 'confirmed-result', component: ConfirmedResultsComponent, pathMatch: 'full'}, //resolve:{timeoutSamplesData: TimeoutExpiryResolverService}},
      { path: 'reports', component: HPLCPosPrintComponent, pathMatch: 'full'}, //resolve:{timeoutSamplesData: TimeoutExpiryResolverService}},
  
    ]
  },
  {
    path: 'hplcpositive-bloodsample-reoprts', component: HPLCReportsMainComponent,
    children: [
      { path: '', component: HPLCPosPrintComponent, pathMatch: 'full'},  //resolve:{damagedSamplesData: DamagedSamplesResolverService}},
    
  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MolecularLabResultRoutingModule { 
  
}
