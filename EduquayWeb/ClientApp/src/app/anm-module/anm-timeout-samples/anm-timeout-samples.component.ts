import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TimeoutExpiryRequest, AddtimeoutSampleRecollectionRequest } from 'src/app/shared/anm-module/notifications/timeout-expiry/timeout-expiry-request';
import { TimeoutExpiryResponse, AddtimeoutSampleRecollectionResponse, TimeoutSampleList } from 'src/app/shared/anm-module/notifications/timeout-expiry/timeout-expiry-response';
import { TimeoutExpiryServiceService } from 'src/app/shared/anm-module/notifications/timeout-expiry/timeout-expiry-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/shared/utility/date.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anm-timeout-samples',
  templateUrl: './anm-timeout-samples.component.html',
  styleUrls: ['./anm-timeout-samples.component.css']
})
export class AnmTimeoutSamplesComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  timeoutSamplesErrorMessage: string;
  timeoutSamplesInitResponse: any;
  timeoutsamplesRequest: TimeoutExpiryRequest;
  timeoutsamplesResponse: TimeoutExpiryResponse;
  addtimeoutSampleRecollectionRequest: AddtimeoutSampleRecollectionRequest;
  addtimeoutSampleRecollectionResponse: AddtimeoutSampleRecollectionResponse;
  result: string;
  timeoutSamples: TimeoutSampleList[] = [];
  subjectName: string;
  uniqueSubjectId: string;
  rchId: string;
  reason: string;
  barcodeNo: string;
  collectionDate: string;
  collectionTime: string;
  
    constructor(
  
      private TimeoutExpiryServiceService: TimeoutExpiryServiceService,
      private modalService: NgbModal,
      private router: Router,
      private route: ActivatedRoute,
      private dateService: DateService
  
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
          //Search: '<a class="btn searchBtn" id="searchBtn"><i class="fa fa-search"></i></a>'
        }
      };
      this.collectionDate = this.dateService.getDate();
      this.collectionTime = this.dateService.getTime();
      console.log(this.TimeoutExpiryServiceService.timeoutSamplesApi);
      this.anmtimeoutSamples();
  
      this.timeoutSamplesInitResponse = this.route.snapshot.data.timeoutSamplesData;
      if (this.timeoutSamplesInitResponse.status === 'false') {
        this.timeoutSamples = [];
        if (this.timeoutSamplesInitResponse.message !== null && this.timeoutSamplesInitResponse.message.code === "ENOTFOUND") {
          this.timeoutSamplesErrorMessage = "Unable to connect to api source";
        }
        else if (this.timeoutSamplesInitResponse.message !== null || this.timeoutSamplesInitResponse.message == undefined) {
          this.timeoutSamplesErrorMessage = this.timeoutSamplesInitResponse.message;
        }
      }
      else {
        
        if (this.timeoutSamplesInitResponse.sampleList!= null && this.timeoutSamplesInitResponse.sampleList.length > 0) {
          this.timeoutSamples = this.timeoutSamplesInitResponse.sampleList;
        }
      }
     
    }
    anmtimeoutSamples(){
      this.timeoutSamples = [];
      this.timeoutSamplesErrorMessage ='';
      this.timeoutsamplesRequest = {anmId: 1, notification: 3};
      let samplesList = this.TimeoutExpiryServiceService.gettimeoutSamples(this.timeoutsamplesRequest)
      .subscribe(response => {
        this.timeoutsamplesResponse = response;
        if(this.timeoutsamplesResponse !== null && this.timeoutsamplesResponse.status === "true"){
          if(this.timeoutsamplesResponse.sampleList.length <= 0){
           this.timeoutSamplesErrorMessage = response.message;
          }
          else{
            this.timeoutSamples = this.timeoutsamplesResponse.sampleList;
          }
        }
        else{
          this.timeoutSamplesErrorMessage = response.message;
        }
        this.rerender();
        this.loadDataTable = true;
      },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.timeoutSamplesErrorMessage = err.toString();
      });
    }
    opentimeoutSamples(timeoutSamplesDetail, sample: TimeoutSampleList) {
  
      this.subjectName= sample.subjectName;
      this.uniqueSubjectId = sample.uniqueSubjectId;
      this.rchId = sample.rchID;
      this.reason = sample.reason;
  
      this.modalService.open(
        timeoutSamplesDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    
    onSubmit(timeoutSamplesForm: NgForm){
  
      console.log(timeoutSamplesForm.value);
      this.barcodeNo = timeoutSamplesForm.value.sampleBarcode;
      this.addtimeoutSampleRecollectionRequest = {
        uniqueSubjectId: this.uniqueSubjectId,
        reason: this.reason,
        barcodeNo: this.barcodeNo,
        collectionFrom: 10,
        sampleCollectionDate: this.collectionDate,
        sampleCollectionTime: this.collectionTime,
        collectedBy: 1,
      };
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let timeoutSamples = this.TimeoutExpiryServiceService.posttimeoutSample(this.addtimeoutSampleRecollectionRequest)
      .subscribe(response => {
        this.addtimeoutSampleRecollectionResponse = response;
        if(this.addtimeoutSampleRecollectionResponse !== null && this.addtimeoutSampleRecollectionResponse.status === "true"){
          this.showResponseMessage(this.addtimeoutSampleRecollectionResponse.result, 's')
           this.anmtimeoutSamples();
        }else{
          this.showResponseMessage(this.addtimeoutSampleRecollectionResponse.result, 'e');
                  this.timeoutSamplesErrorMessage = response.message;
        }
  
      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.timeoutSamplesErrorMessage = err.toString();
      });
      //swal ("Here's the title!", "...and here's the text!");
    }
  
    showResponseMessage(message: string, type: string){
      var messageType = '';
      if(type === 'e'){
        Swal.fire({icon:'error', title: message, confirmButtonText: 'Close'})
      }
      else{
        Swal.fire({icon:'success', title: message, confirmButtonText: 'Close'})
        .then((result) => {
          if (result.value) {
            this.modalService.dismissAll();
          }
        });
      }
    }
  
  
  
  
    updateNotification(timeoutSample: TimeoutSampleList, notifiedStatus: string){
      if(notifiedStatus === '0'){
        timeoutSample.notifiedStatus = "False";
      }
      else{
        timeoutSample.notifiedStatus = "True";
      }
    }
  
    updateStatus(){
      var notifySamples = '';
      this.timeoutSamples.forEach(element => {
        if(element.notifiedStatus === 'True'){
          notifySamples += element.sampleCollectionId + ",";
        }
      });
  
      if(notifySamples !== ''){
        notifySamples = notifySamples.substr(0, notifySamples.length-1);
        console.log(notifySamples);
      }
  
    }
  
    rerender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first      
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
