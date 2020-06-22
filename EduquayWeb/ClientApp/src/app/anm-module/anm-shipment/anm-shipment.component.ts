import { Component, OnInit } from '@angular/core';
import { ShipmentlogService } from 'src/app/shared/anm-module/shipmentlog/shipmentlog.service';
import { ShipmentRequest } from 'src/app/shared/anm-module/shipmentlog/shipment-request';
import { ShipmentResponse, ShipmentList } from 'src/app/shared/anm-module/shipmentlog/shipment-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-anm-shipment',
  templateUrl: './anm-shipment.component.html',
  styleUrls: ['./anm-shipment.component.css']
})
export class AnmShipmentComponent implements OnInit {

  shipmentLogErrorMessage: string;
  shipmentRequest: ShipmentRequest;
  shipmentResponse: ShipmentResponse;
  shipmentList: ShipmentList[] = [];

  constructor(private ShipmentlogService: ShipmentlogService) { }

  ngOnInit() {
    console.log(this.ShipmentlogService.shipmentLogApi);
    this.anmshipmentLog();
  }

  anmshipmentLog(){
    this.shipmentRequest = {userId: 10, shipmentFrom: '' };
    let picknpack = this.ShipmentlogService.getshipmentLog(this.shipmentRequest)
    .subscribe(response => {
      this.shipmentResponse = response;
      if(this.shipmentResponse !== null && this.shipmentResponse.status === "true"){
        if(this.shipmentResponse.shipmentList.length <= 0){
          this.shipmentLogErrorMessage = response.message;
        }
        else{
          this.shipmentList = this.shipmentResponse.shipmentList;
        }
      }
      else{
        this.shipmentLogErrorMessage = response.message;
      }
    },
    (err: HttpErrorResponse) => {
      this.shipmentLogErrorMessage = err.toString();
    });
    
  }

}
