import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { user } from 'src/app/shared/auth-response';
import { ChcShipmentlogRequest } from 'src/app/shared/chc-module/chc-shipmentlog/chc-shipmentlog-request';
import { ChcShipmentlogResponse, ChcShipmentList, ChcSamplesDetail } from 'src/app/shared/chc-module/chc-shipmentlog/chc-shipmentlog-response';
import { ChcShipmentlogService } from 'src/app/shared/chc-module/chc-shipmentlog/chc-shipmentlog.service';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-chc-view-shipmentdetails',
  templateUrl: './chc-view-shipmentdetails.component.html',
  styleUrls: ['./chc-view-shipmentdetails.component.css']
})
export class ChcViewShipmentdetailsComponent implements OnInit {
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();

  user: user;
  chcShipmentLogErrorMessage: string;
  chcshipmentlogRequest: ChcShipmentlogRequest;
  chcshipmentlogResponse: ChcShipmentlogResponse;
  chcshipmentLogInitResponse: any; 

  shipmentList: ChcShipmentList[]=[];
  id: number;
  shipmentId: string;
  collectionCHCName: string;
  chcLabTechnicianName: string;
  testingCHC: string;
  logisticsProviderName: string;
  deliveryExecutiveName: string;
  contactNo: string;
  shipmentDateTime: string;
  sampleDetails: ChcSamplesDetail[]=[];
  //shipmentId: number;
  uniqueSubjectId: string;
  subjectName: string;
  rchId: string;
  barcodeNo: string;
  associatedANM: string;
  sampleCollectionDateTime: string;
  shipmentItem: ChcShipmentList;


  constructor(
    private ChcShipmentlogService: ChcShipmentlogService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private dataservice: DataService
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "CHC", "page": "Shipment Details"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.activatedRoute.queryParams.subscribe(params => {
      this.shipmentId = params['q'];
      this.chcshipmentLog();
    });
  }

  chcshipmentLog(){
    //update the user id
    this.shipmentList = [];
    this.sampleDetails = [];
    this.shipmentItem = new ChcShipmentList();
    this.chcshipmentlogRequest = {userId: this.user.id, shipmentFrom: this.user.shipmentFrom };
    let shipmentLog = this.ChcShipmentlogService.getchcshipmentLog(this.chcshipmentlogRequest)
    .subscribe(response => {
      this.chcshipmentlogResponse = response;
      if(this.chcshipmentlogResponse !== null && this.chcshipmentlogResponse.status === "true"){
        if(this.chcshipmentlogResponse.shipmentLogs.length <= 0){
          this.chcShipmentLogErrorMessage = response.message;
        }
        else{
          //this.shipmentList = this.shipmentResponse.shipmentLogs;
          this.shipmentItem = this.chcshipmentlogResponse.shipmentLogs.find(shipment => shipment.shipmentId === this.shipmentId);
          if(this.shipmentItem.samplesDetail.length > 0){
            this.sampleDetails = this.shipmentItem.samplesDetail;
          }
        }
      }
      else{
        this.chcShipmentLogErrorMessage = response.message;
      }
    },
    (err: HttpErrorResponse) => {
      this.chcShipmentLogErrorMessage = err.toString();
    });
    
  }



}
