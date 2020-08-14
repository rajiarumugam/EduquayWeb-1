import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TimeoutExpiryRequest, AddtimeoutSampleRecollectionRequest, TimeoutUpdateStatusRequest } from 'src/app/shared/anm-module/notifications/timeout-expiry/timeout-expiry-request';
import { TimeoutExpiryResponse, AddtimeoutSampleRecollectionResponse, TimeoutSampleList, TimeoutUpdateStatusResponse } from 'src/app/shared/anm-module/notifications/timeout-expiry/timeout-expiry-response';
import { TimeoutExpiryServiceService } from 'src/app/shared/anm-module/notifications/timeout-expiry/timeout-expiry-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/shared/utility/date.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { TokenService } from 'src/app/shared/token.service';
import { user } from 'src/app/shared/auth-response';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { ConstantService } from 'src/app/shared/constant.service';
//import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-anm-timeout-samples',
  templateUrl: './anm-timeout-samples.component.html',
  styleUrls: ['./anm-timeout-samples.component.css']
})
export class AnmTimeoutSamplesComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>(); 
  @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;

  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  user: user;

  timeoutSamplesErrorMessage: string;
  timeoutSamplesInitResponse: any;
  timeoutsamplesRequest: TimeoutExpiryRequest;
  timeoutsamplesResponse: TimeoutExpiryResponse;
  addtimeoutSampleRecollectionRequest: AddtimeoutSampleRecollectionRequest;
  addtimeoutSampleRecollectionResponse: AddtimeoutSampleRecollectionResponse;
  timeoutUpdateStatusRequest: TimeoutUpdateStatusRequest;
  timeoutUpdateStatusResponse: TimeoutUpdateStatusResponse;

  recordCount: number;
  result: string;
  timeoutSamples: TimeoutSampleList[] = [];
  subjectName: string;
  uniqueSubjectId: string;
  rchId: string;
  reason: string;
  barcodeNo: string;
  collectionDate: string;
  collectionTime: string;
  notifySamples: string;
  notifyStatus: string;
  sampleCollectionDate: string;
  sampleCollectionTime: string;
  popupform: FormGroup;
  DAY = 86400000;

  collectionDateOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y H:i',
    defaultDate: new Date(Date.now()),
    // minDate: this.dyCollectionDate,
    maxDate: new Date(Date.now()),
    enableTime: true,
    
  };
  collectionTimeOptions: FlatpickrOptions = {
    mode: 'single',
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",    
    defaultDate: new Date(Date.now()),
    maxDate: new Date(Date.now())
  };
  
    constructor(
  
      private TimeoutExpiryServiceService: TimeoutExpiryServiceService,
      private modalService: NgbModal,
      private router: Router,
      private route: ActivatedRoute,
      private dateService: DateService,
      private tokenService: TokenService,
      private _formBuilder: FormBuilder,
      private constantService: ConstantService
    ) { }
  
    ngOnInit() {

      this.recordCount = 0;
      this.user = JSON.parse(this.tokenService.getUser('lu'));
      this.InitializeDateRange(); 
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
      // this.collectionDate = this.dateService.getDate();
      // this.collectionTime = this.dateService.getTime();
      // this.collectionDate = moment().format("DD/MM/YYYY");
      // this.collectionTime = moment().format("HH:mm");
      console.log(this.TimeoutExpiryServiceService.timeoutSamplesApi);
      //this.anmtimeoutSamples();
  
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

      this.recordCount = 0;
      this.timeoutSamples = [];
      this.timeoutSamplesErrorMessage ='';
      this.timeoutsamplesRequest = {anmId: this.user.id, notification: 3};
      let samplesList = this.TimeoutExpiryServiceService.gettimeoutSamples(this.timeoutsamplesRequest)
      .subscribe(response => {
        this.timeoutsamplesResponse = response;
        if(this.timeoutsamplesResponse !== null && this.timeoutsamplesResponse.status === "true"){
          if(this.timeoutsamplesResponse.sampleList.length <= 0){
           this.timeoutSamplesErrorMessage = response.message;
          }
          else{
            this.timeoutSamples = this.timeoutsamplesResponse.sampleList;
            this.recordCount = this.timeoutSamples.length;
          }
        }
        else{
          this.timeoutSamplesErrorMessage = response.message;
        }
        this.onLoadSubject.emit(this.recordCount);
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
      this.notifyStatus = sample.notifiedStatus;
      this.rchId = sample.rchId;
      this.reason = sample.reason;
      this.sampleCollectionDate = moment().format("DD/MM/YYYY");
      this.sampleCollectionTime = moment().format("HH:mm");
      this.collectionDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
      this.collectionDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

      //var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
      var pattern = /(\d{2})\/(\d{2})\/(\d{4})\ (\d{2})\:(\d{2})/;
      const regDate = new Date(sample.sampleCollectionDateTime.replace(pattern,'$3/$2/$1 $4:$5'));
      this.collectionDateOptions.minDate = regDate;

      this.modalService.open(
        timeoutSamplesDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
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
        collectionFrom: this.user.sampleCollectionFrom,
        sampleCollectionDate: this.sampleCollectionDate,
        sampleCollectionTime: this.sampleCollectionTime,
        collectedBy: this.user.id,
      };
  
      var selectedSample = this.timeoutSamples.filter(x => x.uniqueSubjectId === this.uniqueSubjectId);
      if(selectedSample.length > 0){
        selectedSample[0].notifiedStatus = 'True';
        //this.timeoutSamplesUpdateStatus();
      }
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
       //return false;
  
      let timeoutSamples = this.TimeoutExpiryServiceService.posttimeoutSample(this.addtimeoutSampleRecollectionRequest)
      .subscribe(response => {
        this.addtimeoutSampleRecollectionResponse = response;
        if(this.addtimeoutSampleRecollectionResponse !== null && this.addtimeoutSampleRecollectionResponse.status === "true"){
          this.showResponseMessage(this.addtimeoutSampleRecollectionResponse.message, 's')
           this.anmtimeoutSamples();
        }else{
          this.showResponseMessage(this.addtimeoutSampleRecollectionResponse.message, 'e');
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
            if(this.modalService.hasOpenModals){
              this.modalService.dismissAll();
            }
          }
        });
      }
    }
  
    
  timeoutSamplesUpdateStatus(){
    this.timeoutSamplesErrorMessage = '';
    this.fetchBarcodes();

    if(this.notifySamples === ""){
      this.showResponseMessage(this.constantService.SelectOneSample, 'e');
      return false;
    }   
    this.timeoutUpdateStatusRequest = {
      anmId: this.user.id,
      barcodeNo: this.notifySamples, 
    }
    //Remove below 2 lines after successfully tested
    // this.showResponseMessage('Successfully registered', 's');
    // return false;
    let adddamagedsample = this.TimeoutExpiryServiceService.updatetimeoutSample(this.timeoutUpdateStatusRequest)
      .subscribe(response => {
       this.timeoutUpdateStatusResponse= response;
        if (this.timeoutUpdateStatusResponse !== null && this.timeoutUpdateStatusResponse.status === "true") {
          this.showResponseMessage(this.timeoutUpdateStatusResponse.message, 's');
        } else {
          this.showResponseMessage(this.timeoutUpdateStatusResponse.message, 'e');
          this.timeoutSamplesErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.showResponseMessage(err.toString(), 'e');
          this.timeoutSamplesErrorMessage = err.toString();
        });

  }
  
  
    updateNotification(timeoutSample: TimeoutSampleList, notifiedStatus: string){
      if(notifiedStatus === '0'){
        timeoutSample.notifiedStatus = "False";
      }
      else{
        timeoutSample.notifiedStatus = "True";
      }
    }
  
    // updateStatus(){
    //   var notifySamples = '';
    //   this.timeoutSamples.forEach(element => {
    //     if(element.notifiedStatus === 'True'){
    //       notifySamples += element.sampleCollectionId + ",";
    //     }
    //   });
  
    //   if(notifySamples !== ''){
    //     notifySamples = notifySamples.substr(0, notifySamples.length-1);
    //     console.log(notifySamples);
    //   }
  
    // }
    fetchBarcodes(){
      this.notifySamples = '';
      var isFirst = true;
      this.timeoutSamples.forEach(element => {
        console.log('notifiedStatus :' + element.notifiedStatus);
        if(element.notifiedStatus === "True"){
          if(isFirst){
            this.notifySamples += element.barcodeNo;
            isFirst = false;
          }
          else{
            this.notifySamples += ',' + element.barcodeNo;
          }
        }
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

    InitializeDateRange() {
      
      this.popupform = this._formBuilder.group({
        collectionDate: [new Date(moment().add(-1, 'day').format())],
      });
   
      //Change of sample collection date
      this.popupform.controls.collectionDate.valueChanges.subscribe(changes => {
        console.log('end: ', changes);
        if (!changes[0]) return;
        const selectedDate2 = changes[0].getTime();
        this.sampleCollectionDate = moment(new Date(selectedDate2)).format("DD/MM/YYYY");
        this.sampleCollectionTime = moment(new Date(selectedDate2)).format("HH:mm");
      });
  
      // //Change of sample collection time
      // this.popupform.controls.collectionTime.valueChanges.subscribe(changes => {
      //   console.log('end: ', changes);
      //   if (!changes[0]) return;
      //   const selectedDate3 = changes[0].getTime();
      //   this.sampleCollectionTime = moment(new Date(selectedDate3)).format("HH:i");
  
      //   //const monthLaterDate = selectedDate1;
      //   // this.startPicker.flatpickr.set({
      //   //   defaultDate: new Date(selectedDate1)
      //   // });
      // });
    }


}
