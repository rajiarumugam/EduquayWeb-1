import { Component, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { user } from 'src/app/shared/auth-response';
import { ChcSampleShipmentlogResponse, ChcSampleShipmentList, ChcSamplesDetail } from 'src/app/shared/chc-sample/chc-sample-shipmentlog/chc-sample-shipmentlog-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
import { ChcSampleShipmentlogService } from 'src/app/shared/chc-sample/chc-sample-shipmentlog/chc-sample-shipmentlog.service'
import { HttpErrorResponse } from '@angular/common/http';
import * as printJS from "print-js";

@Component({
  selector: 'app-chc-sample-shipmentlog',
  templateUrl: './chc-sample-shipmentlog.component.html',
  styleUrls: ['./chc-sample-shipmentlog.component.css']
})
export class ChcSampleShipmentlogComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  user: user;
  chcSampleShipmentLogErrorMessage: string;
  chcshipmentlogResponse: ChcSampleShipmentlogResponse;
  chcsampleshipmentLogInitResponse: any; 

  shipmentList: ChcSampleShipmentList[]=[];
  id: number;
  shipmentId: string;
  labTechnicianName: string;
  receivingCentralLab: string;
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
  sampleCollectionDateTime: string;
  isPrintable: boolean = false;


  constructor(
    private ChcSampleShipmentlogService: ChcSampleShipmentlogService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private tokenService: TokenService
  ) { }

  ngOnInit() {

    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 5,
      processing: true,
      stripeClasses: [],
      lengthMenu: [5, 10, 20, 50],
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
  }
  console.log(this.ChcSampleShipmentlogService.chcsampleShipmentLogApi);
  //this.anmshipmentLog();

  this.chcsampleshipmentLogInitResponse = this.route.snapshot.data.chcsampleshipmentLogData;
  if (this.chcsampleshipmentLogInitResponse.status === 'false') {
    this.shipmentList = [];
    if (this.chcsampleshipmentLogInitResponse.message !== null && this.chcsampleshipmentLogInitResponse.message.code === "ENOTFOUND") {
      this.chcSampleShipmentLogErrorMessage = "Unable to connect to api source";
    }
    else if (this.chcsampleshipmentLogInitResponse.message !== null || this.chcsampleshipmentLogInitResponse.message == undefined) {
      this.chcSampleShipmentLogErrorMessage = this.chcsampleshipmentLogInitResponse.message;
    }
  }
  else {
    
    if (this.chcsampleshipmentLogInitResponse.shipmentLogs != null && this.chcsampleshipmentLogInitResponse.shipmentLogs.length > 0) {
      this.shipmentList = this.chcsampleshipmentLogInitResponse.shipmentLogs;
    }
  }
}
chcsampleshipmentLogList(chcId){
  this.shipmentList = [];
  this.sampleDetails = [];
 // this.chcshipmentlogRequest = {userId: this.user.id, shipmentFrom: this.user.shipmentFrom };
  let shipmentLog = this.ChcSampleShipmentlogService.getshipmentLog(this.user.chcId)
  .subscribe(response => {
    this.chcshipmentlogResponse = response;
    if(this.chcshipmentlogResponse !== null && this.chcshipmentlogResponse.status === "true"){
      if(this.chcshipmentlogResponse.shipmentLogs.length <= 0){
        this.chcSampleShipmentLogErrorMessage = response.message;
      }
      else{
        this.shipmentList = this.chcshipmentlogResponse.shipmentLogs;
      }
    }
    else{
      this.chcSampleShipmentLogErrorMessage = response.message;
    }
    this.rerender();
  },
  (err: HttpErrorResponse) => {
    this.chcSampleShipmentLogErrorMessage = err.toString();
  });
  
}

openchcSampleShipment(shippedChcSampleDetail, shipment: ChcSampleShipmentList){

  this.isPrintable = false;
  this.shipmentId = shipment.shipmentId;
  this.shipmentDateTime = shipment.shipmentDateTime;
  this.receivingCentralLab = shipment.receivingCentralLab;
  this.labTechnicianName = shipment.labTechnicianName;
  this.deliveryExecutiveName = shipment.deliveryExecutiveName;
  this.logisticsProviderName = shipment.logisticsProviderName;
  this.testingCHC = shipment.testingCHC;
  this.contactNo = shipment.contactNo;
  this.sampleDetails = shipment.samplesDetail;

  this.modalService.open(
    shippedChcSampleDetail,{
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
}

openchcShipmentPrint(shippedChcSampleDetail: any, shipment: ChcSampleShipmentList){
  this.openchcSampleShipment(shippedChcSampleDetail, shipment);
  this.isPrintable = true;
  this.printShipment(shippedChcSampleDetail, shipment);
 
}

printShipment(shippedChcSampleDetail: any, shipment: ChcSampleShipmentList){
  return new Promise(resolve =>
    setTimeout(() => resolve(
      //printJS("print-area", "html" )
      printJS({printable: 'print-area',
      type: 'html',
      targetStyles: ['*'], 
      header:'<h3>Shipment Details</h3><hr>',
      documentTitle: 'Shipment Details',
      maxWidth: 1200  })
      ), 200)
  );
  
}

printDocument(){
  let printContents = document.getElementById('print-area').innerHTML;
  let originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
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

   

ngAfterViewInit(): void {
  this.dtTrigger.next();
}   


ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();
}


}
