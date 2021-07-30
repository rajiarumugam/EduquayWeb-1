import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { ShipmentlogService } from 'src/app/shared/anm-module/shipmentlog/shipmentlog.service';
import { ShipmentRequest } from 'src/app/shared/anm-module/shipmentlog/shipment-request';
import { ShipmentResponse, ShipmentList, SamplesDetail } from 'src/app/shared/anm-module/shipmentlog/shipment-response';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TokenService } from 'src/app/shared/token.service';
import { user } from 'src/app/shared/auth-response';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { DateService } from 'src/app/shared/utility/date.service';
import { DataService } from 'src/app/shared/data.service';
import * as moment from 'moment';
import { NgModel, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ChcPicknpackResponse, ChcSampleList, ChcResponse, ChcModel, ProviderNameResponse, logisticsProviderModel, AddChcShipmentResponse, chcMoveTimeoutExpiryResponse, TestingChcResponse, ChcTestingModel } from 'src/app/shared/chc-module/chc-pickandpack/chc-picknpack-response';
import { ChcPicknpackRequest, AddChcShipmentRequest, chcMoveTimeoutExpiryRequest } from 'src/app/shared/chc-module/chc-pickandpack/chc-picknpack-request';
import { masterService } from 'src/app/shared/master/district/masterdata.service';


@Component({
  selector: 'app-block-shipment',
  templateUrl: './block-shipment.component.html',
  styleUrls: ['./block-shipment.component.css']
})
export class BlockShipmentComponent implements  AfterViewInit, OnDestroy, OnInit {
  

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  user: user;
  shipmentLogErrorMessage: string;
  shipmentRequest: ShipmentRequest;
  shipmentResponse: ShipmentResponse;
  shipmentLogInitResponse: any; 
  id: number;
  shipmentId: string;
  anmName: string;
  testingCHC: string;
  avdName: string;
  contactNo: string;
  alternateAVD:string;
  alternateAVDContactNo:string;
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
  picknpackErrorMessage;

  dateform: FormGroup;
  selectedCHC:string = null;
  CHCdata = [];
  PHCdata = [];
  selectedBlock;
  erroMessage;
  selectedPHC:string = null;
  anmList = [];
  selectedANM = null;
    chcSampleList: ChcSampleList[] = [];
    chcpicknpackRequest: ChcPicknpackRequest;

  constructor(
    private ShipmentlogService: ShipmentlogService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private loaderService: LoaderService,
    private dataservice: DataService,
    private _formBuilder: FormBuilder,
    private masterService: masterService
    
    ) { }

  ngOnInit() {

    this.dateform = this._formBuilder.group({
      selectedCHC:[''],
      selectedPHC:[''],
      selectedANM:[' ']
    });
    
    this.dataservice.sendData(JSON.stringify({"module": "Block - REG & SAMPLING", "page": "Shipment Log"}));
    
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 20,
      processing: true,
      stripeClasses: [],
      lengthMenu: [5, 10, 20, 50],
      columnDefs: [ { 'type': 'date', 'targets': 2 } ],
      language: {
        search: '<div><span class="note">Search by any Subject information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
        searchPlaceholder: "Search...",
        lengthMenu: "Records / Page :  _MENU_",
        paginate: {
          first: '',
          last: '', // or '←' 
          previous: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
          next: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
        }, 
      }  
    };

    console.log(this.ShipmentlogService.shipmentLogApi);
   // this.anmshipmentLog();
    this.getCHC();
    // this.shipmentLogInitResponse = this.route.snapshot.data.shipmentLogData

    // if (this.shipmentLogInitResponse.status === 'false') {
    //   this.shipmentList = [];
    //   if (this.shipmentLogInitResponse.message !== null && this.shipmentLogInitResponse.message.code === "ENOTFOUND") {
    //     this.shipmentLogErrorMessage = "Unable to connect to api source";
    //   }
    //   else if (this.shipmentLogInitResponse.message !== null || this.shipmentLogInitResponse.message == undefined) {
    //     this.shipmentLogErrorMessage = this.shipmentLogInitResponse.message;
    //   }
    // }
    // else {
      
    //   if (this.shipmentLogInitResponse.shipmentLogs != null && this.shipmentLogInitResponse.shipmentLogs.length > 0) {
    //     this.shipmentList = this.shipmentLogInitResponse.shipmentLogs;
    //   }
    // }
  }

  getCHC(){
    this.selectedBlock = this.user.blockId;
    this.masterService.getuserBlockBasedCHC(this.selectedBlock)
    .subscribe(response => {
      this.CHCdata = response['data'];
       this.selectedCHC = ''+this.CHCdata[0].id;
       this.getPHC();
    },
    (err: HttpErrorResponse) =>{
      this.CHCdata = [];
      this.erroMessage = err.toString();
    });
  }
  chcselected(event) {
    this.getPHC();
  }

  getPHC(){
    this.masterService.RetrievePHCByCHC(this.selectedCHC)
    .subscribe(response => {
      this.PHCdata = response['data'];
      this.selectedPHC = ''+this.PHCdata[0].id;
      this.getANMData();
    },
    (err: HttpErrorResponse) =>{
      this.PHCdata = [];
      this.erroMessage = err.toString();
    });
  }
  phcselected(event) {
    this.getANMData();
  }
  getANMData(){
    this.masterService.getANMbyPHC(this.selectedPHC)
    .subscribe(response => {

    this.anmList = response['data'];
    this.selectedANM = this.anmList[0].id;
      
      console.log(response)
    },
    (err: HttpErrorResponse) =>{
      
      this.erroMessage = err.toString();
    });
  }

  chcSampleCollection(){
    this.anmshipmentLog();
  }
  anmshipmentLog(){
    
    this.loaderService.display(true);
    this.shipmentList = [];
    this.sampleDetails = [];
    this.shipmentRequest = {userId: Number(this.selectedANM), shipmentFrom: this.user.shipmentFrom };
    let shipmentLog = this.ShipmentlogService.getshipmentLog(this.shipmentRequest)
    .subscribe(response => {
      this.shipmentResponse = response;
      this.loaderService.display(false);

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
      this.rerender();
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
    this.alternateAVD = shipment.alternateAVD;
    this.alternateAVDContactNo = shipment.alternateAVDContactNo;
    this.sampleDetails = shipment.samplesDetail;

    this.modalService.open(
      shippedSampleDetail,{
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first   
      dtInstance.clear();   
      dtInstance.destroy();
      // Call the dtTrigger to rerender again       
      this.dtTrigger.next();
    });
  }   

  returnTimeStamp(da)
  {
    var _date = da.split('/')[0];
    var _month = da.split('/')[1];
    var _year = da.split('/')[2];
    return moment(_month+"/"+_date+"/"+_year).unix();
  }
     

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }   


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
