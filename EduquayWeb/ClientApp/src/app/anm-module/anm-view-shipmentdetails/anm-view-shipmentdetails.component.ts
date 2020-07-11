import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ShipmentRequest } from 'src/app/shared/anm-module/shipmentlog/shipment-request';
import { ShipmentResponse, ShipmentList, SamplesDetail } from 'src/app/shared/anm-module/shipmentlog/shipment-response';
import { ShipmentlogService } from 'src/app/shared/anm-module/shipmentlog/shipmentlog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
import { user } from 'src/app/shared/auth-response';

@Component({
  selector: 'app-anm-view-shipmentdetails',
  templateUrl: './anm-view-shipmentdetails.component.html',
  styleUrls: ['./anm-view-shipmentdetails.component.css']
})
export class AnmViewShipmentdetailsComponent implements OnInit {
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();

  user: user;
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
  shipmentItem: ShipmentList;
  uniqueSubjectId: string;
  subjectName: string;
  rchId: string;
  barcodeNo: string;
  sampleCollectionDateTime: string;
  sampleDetails: SamplesDetail[] = [];
  
  
  constructor(
    private ShipmentlogService: ShipmentlogService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService
  ) { }

  
  ngOnInit() {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.activatedRoute.queryParams.subscribe(params => {
      this.shipmentId = params['q'];
      this.anmshipmentLog();
    });
  }

  anmshipmentLog(){
    //update the user id
    this.shipmentList = [];
    this.sampleDetails = [];
    this.shipmentItem = new ShipmentList();
    this.shipmentRequest = {userId: this.user.id, shipmentFrom: this.user.shipmentFrom };
    let shipmentLog = this.ShipmentlogService.getshipmentLog(this.shipmentRequest)
    .subscribe(response => {
      this.shipmentResponse = response;
      if(this.shipmentResponse !== null && this.shipmentResponse.status === "true"){
        if(this.shipmentResponse.shipmentLogs.length <= 0){
          this.shipmentLogErrorMessage = response.message;
        }
        else{
          //this.shipmentList = this.shipmentResponse.shipmentLogs;
          this.shipmentItem = this.shipmentResponse.shipmentLogs.find(shipment => shipment.shipmentId === this.shipmentId);
          if(this.shipmentItem.samplesDetail.length > 0){
            this.sampleDetails = this.shipmentItem.samplesDetail;
          }
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
