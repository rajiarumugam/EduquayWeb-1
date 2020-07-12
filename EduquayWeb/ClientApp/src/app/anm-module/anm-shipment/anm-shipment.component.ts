import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ShipmentlogService } from 'src/app/shared/anm-module/shipmentlog/shipmentlog.service';
import { ShipmentRequest } from 'src/app/shared/anm-module/shipmentlog/shipment-request';
import { ShipmentResponse, ShipmentList, SamplesDetail } from 'src/app/shared/anm-module/shipmentlog/shipment-response';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-anm-shipment',
  templateUrl: './anm-shipment.component.html',
  styleUrls: ['./anm-shipment.component.css']
})
export class AnmShipmentComponent implements  AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

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

  constructor(
    private ShipmentlogService: ShipmentlogService,
    private modalService: NgbModal,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {

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
    };

    console.log(this.ShipmentlogService.shipmentLogApi);
    //this.anmshipmentLog();

    this.shipmentLogInitResponse = this.route.snapshot.data.shipmentLogData;
    if (this.shipmentLogInitResponse.status === 'false') {
      this.shipmentList = [];
      if (this.shipmentLogInitResponse.message !== null && this.shipmentLogInitResponse.message.code === "ENOTFOUND") {
        this.shipmentLogErrorMessage = "Unable to connect to api source";
      }
      else if (this.shipmentLogInitResponse.message !== null || this.shipmentLogInitResponse.message == undefined) {
        this.shipmentLogErrorMessage = this.shipmentLogInitResponse.message;
      }
    }
    else {
      
      if (this.shipmentLogInitResponse.shipmentLogs != null && this.shipmentLogInitResponse.shipmentLogs.length > 0) {
        this.shipmentList = this.shipmentLogInitResponse.shipmentLogs;
      }
    }
  }

  anmshipmentLog(){
    this.shipmentList = [];
    this.sampleDetails = [];
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
    this.sampleDetails = shipment.samplesDetail;

    this.modalService.open(
      shippedSampleDetail,{
        centered: true,
        size: 'xl',
        scrollable: true,
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

     

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }   


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
