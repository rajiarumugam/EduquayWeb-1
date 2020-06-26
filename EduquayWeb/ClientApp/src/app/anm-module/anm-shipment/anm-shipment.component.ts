import { Component, OnInit } from '@angular/core';
import { ShipmentlogService } from 'src/app/shared/anm-module/shipmentlog/shipmentlog.service';
import { ShipmentRequest } from 'src/app/shared/anm-module/shipmentlog/shipment-request';
import { ShipmentResponse, ShipmentList, SamplesDetail } from 'src/app/shared/anm-module/shipmentlog/shipment-response';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-anm-shipment',
  templateUrl: './anm-shipment.component.html',
  styleUrls: ['./anm-shipment.component.css']
})
export class AnmShipmentComponent implements OnInit {

  shipmentLogErrorMessage: string;
  shipmentRequest: ShipmentRequest;
  shipmentResponse: ShipmentResponse;
  id: number;
  shipmentId: string;
  anmName: string;
  testingCHC: string;
  avdName: string;
  contactNo: string;
  ilrPoint: string;
  riPoint: string;
  shipmentDateTime: string;
  shipmentList: ShipmentList[] = [];
  uniqueSubjectId: string;
    subjectName: string;
    rchId: string;
    barcodeNo: string;
    sampleCollectionDateTime: string;
  sampleDetails: SamplesDetail[] = [];

  constructor(
    private ShipmentlogService: ShipmentlogService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    console.log(this.ShipmentlogService.shipmentLogApi);
    this.anmshipmentLog();
  }

  anmshipmentLog(){
    this.shipmentList = [];
    this.shipmentRequest = {userId: 1, shipmentFrom: 4 };
    let shipmentLog = this.ShipmentlogService.getshipmentLog(this.shipmentRequest)
    .subscribe(response => {
      this.shipmentResponse = response;
      if(this.shipmentResponse !== null && this.shipmentResponse.status === "true"){
        if(this.shipmentResponse.shipmentLogs.length <= 0){
          this.shipmentLogErrorMessage = response.message;
        }
        else{
          this.shipmentList = this.shipmentResponse.shipmentLogs;
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

  openShipment(shippedSampleDetail, shipment: ShipmentList){
   
    this.shipmentId = shipment.shipmentId;
    this.shipmentDateTime = shipment.shipmentDateTime;
    this.anmName = shipment.anmName;
    this.avdName = shipment.avdName;
    this.ilrPoint = shipment.ilrPoint;
    this.riPoint = shipment.riPoint;
    this.testingCHC = shipment.testingCHC;
    this.contactNo = shipment.contactNo;

    this.modalService.open(
      shippedSampleDetail,{
        centered: true,
        size: 'xl',
        scrollable: true,
        ariaLabelledBy: 'modal-basic-title'
      });
  }

}
