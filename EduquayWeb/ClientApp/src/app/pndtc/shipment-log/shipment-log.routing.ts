import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleShipmentMainComponent } from "./schedule-shipment-log-main/schedule-shipment-log-main.component";
import { ScheduleShipmentComponent } from "./schedule-shipment-log/schedule-shipment-log.component";

import { pndtcShipmentResolverService } from  "./../../shared/pndtc/shipment-resolver.service";

const routes: Routes = [
  {
    path: '', component: ScheduleShipmentMainComponent,
    children:[
      {path: '', component: ScheduleShipmentComponent, pathMatch: 'full', resolve: {positiveSubjects: pndtcShipmentResolverService}}
    ]
  }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentLogRoutingModule { 
  
}
