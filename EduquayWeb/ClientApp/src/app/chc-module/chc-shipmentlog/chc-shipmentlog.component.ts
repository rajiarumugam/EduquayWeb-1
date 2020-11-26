import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, EventEmitter, Output } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { user } from 'src/app/shared/auth-response';
import { ChcShipmentlogResponse, ChcShipmentList, ChcSamplesDetail } from 'src/app/shared/chc-module/chc-shipmentlog/chc-shipmentlog-response';
import { ChcShipmentlogRequest } from 'src/app/shared/chc-module/chc-shipmentlog/chc-shipmentlog-request';
import { ChcShipmentlogService } from 'src/app/shared/chc-module/chc-shipmentlog/chc-shipmentlog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as printJS from "print-js";
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import * as XLSX from 'xlsx'; 


@Component({
  selector: 'app-chc-shipmentlog',
  templateUrl: './chc-shipmentlog.component.html',
  styleUrls: ['./chc-shipmentlog.component.css']
})
export class ChcShipmentlogComponent implements  AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  

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
  isPrintable: boolean = false;
  fileName: any;
  

  constructor(
    private ChcShipmentlogService: ChcShipmentlogService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private dataservice: DataService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "CHC - Reg & Sampling", "page": "Screening Center Shipment Log"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 20,
      processing: true,
      stripeClasses: [],
      lengthMenu: [5, 10, 20, 50],
      //order: [[2, 'desc']],
      columnDefs: [ {
        targets: [2], // column index (start from 0)
        orderData: [ 1, 0 ],
       
     }],
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
  console.log(this.ChcShipmentlogService.chcshipmentLogApi);
  this.chcshipmentLog();

  // Resolver //
  // this.chcshipmentLogInitResponse = this.route.snapshot.data.chcshipmentLogData;
  // if (this.chcshipmentLogInitResponse.status === 'false') {
  //   this.shipmentList = [];
  //   if (this.chcshipmentLogInitResponse.message !== null && this.chcshipmentLogInitResponse.message.code === "ENOTFOUND") {
  //     this.chcShipmentLogErrorMessage = "Unable to connect to api source";
  //   }
  //   else if (this.chcshipmentLogInitResponse.message !== null || this.chcshipmentLogInitResponse.message == undefined) {
  //     this.chcShipmentLogErrorMessage = this.chcshipmentLogInitResponse.message;
  //   }
  // }
  // else {
    
  //   if (this.chcshipmentLogInitResponse.shipmentLogs != null && this.chcshipmentLogInitResponse.shipmentLogs.length > 0) {
  //     this.shipmentList = this.chcshipmentLogInitResponse.shipmentLogs;
  //   }
  // }

}


chcshipmentLog(){

  this.loaderService.display(true);
  this.shipmentList = [];
  this.sampleDetails = [];
  this.chcshipmentlogRequest = {userId: this.user.id, shipmentFrom: this.user.shipmentFrom };
  let shipmentLog = this.ChcShipmentlogService.getchcshipmentLog(this.chcshipmentlogRequest)
  .subscribe(response => {
    this.chcshipmentlogResponse = response;
    this.loaderService.display(false);
    if(this.chcshipmentlogResponse !== null && this.chcshipmentlogResponse.status === "true"){
      if(this.chcshipmentlogResponse.shipmentLogs.length <= 0){
        this.chcShipmentLogErrorMessage = response.message;
      }
      else{
        this.shipmentList = this.chcshipmentlogResponse.shipmentLogs;
      }
    }
    else{
      this.chcShipmentLogErrorMessage = response.message;
    }
    this.rerender();
  },
  (err: HttpErrorResponse) => {
    this.chcShipmentLogErrorMessage = err.toString();
  });
  
}

openchcShipment(shippedChcSampleDetail, shipment: ChcShipmentList){
  this.isPrintable = false;
  this.shipmentId = shipment.shipmentId;
  this.shipmentDateTime = shipment.shipmentDateTime;
  this.collectionCHCName = shipment.collectionCHCName;
  this.chcLabTechnicianName = shipment.chcLabTechnicianName;
  this.deliveryExecutiveName = shipment.deliveryExecutiveName;
  this.logisticsProviderName = shipment.logisticsProviderName;
  this.testingCHC = shipment.testingCHC;
  this.contactNo = shipment.contactNo;
  this.sampleDetails = shipment.samplesDetail;
  this.fileName= shipment.shipmentId +'.xlsx';

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

exportexcel(): void 
    {

      
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
       var fmt = "0.00";
       /* change cell format of range B2:D4 */
       var range = { s: {r:1, c:1}, e: {r:2, c:3} };
       for(var R = range.s.r; R <= range.e.r; ++R) {
         for(var C = range.s.c; C <= range.e.c; ++C) {
           var cell = ws[XLSX.utils.encode_cell({r:R,c:C})];
           if(!cell || cell.t != 'n') continue; // only format numeric cells
           cell.z = fmt;
         }
       }
       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

openchcShipmentPrint(shippedChcSampleDetail: any, shipment: ChcShipmentList){
  this.openchcShipment(shippedChcSampleDetail, shipment);
  this.isPrintable = true;
  this.printShipment(shippedChcSampleDetail, shipment);
 
}

printShipment(shippedChcSampleDetail: any, shipment: ChcShipmentList){
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
