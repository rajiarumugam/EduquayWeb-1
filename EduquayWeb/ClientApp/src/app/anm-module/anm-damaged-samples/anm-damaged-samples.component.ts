import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DamagedSamplesService } from 'src/app/shared/anm-module/notifications/damaged-samples/damaged-samples.service';
import { DamagedSamplesRequest, AddSampleRecollectionRequest, DamagedUpdateStatusRequest} from 'src/app/shared/anm-module/notifications/damaged-samples/damaged-samples-request';
import { DamagedSamplesResponse, DamagedSampleList, AddSampleRecollectionResponse, DamagedUpdateStatusResponse } from 'src/app/shared/anm-module/notifications/damaged-samples/damaged-samples-response';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/shared/utility/date.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { TokenService } from 'src/app/shared/token.service';
import { user } from 'src/app/shared/auth-response';
import * as moment from 'moment';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { ConstantService } from 'src/app/shared/constant.service';


@Component({
  selector: 'app-anm-damaged-samples',
  templateUrl: './anm-damaged-samples.component.html',
  styleUrls: ['./anm-damaged-samples.component.css']
})
export class AnmDamagedSamplesComponent implements AfterViewInit, OnDestroy, OnInit {
  //Child component
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
  @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;
  
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  user: user;

  recordCount: number; //step 2
  damagedSamplesErrorMessage: string;
  damagedSamplesInitResponse: any;
  damagedsamplesRequest: DamagedSamplesRequest;
  damagedsamplesResponse: DamagedSamplesResponse;
  addSampleRecollectionRequest: AddSampleRecollectionRequest;
  addSampleRecollectionResponse: AddSampleRecollectionResponse;
  damagedUpdateStatusRequest: DamagedUpdateStatusRequest;
  damagedUpdateStatusResponse: DamagedUpdateStatusResponse;
  result:string;
  damagedSamples: DamagedSampleList[] = [];
  subjectName: string;
  uniqueSubjectId: string;
  rchId: string;
  reason: string;
  barcodeNo: string;
  collectionDate: string;
  collectionTime: string;
  notifySamples: string;
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

    private DamagedSamplesService: DamagedSamplesService,
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
    console.log(this.DamagedSamplesService.damagedSamplesApi);
    //this.anmdamagedSamples();

    this.damagedSamplesInitResponse = this.route.snapshot.data.damagedSamplesData;
    if (this.damagedSamplesInitResponse.status === 'false') {
      this.damagedSamples = [];
      if (this.damagedSamplesInitResponse.message !== null && this.damagedSamplesInitResponse.message.code === "ENOTFOUND") {
        this.damagedSamplesErrorMessage = "Unable to connect to api source";
      }
      else if (this.damagedSamplesInitResponse.message !== null || this.damagedSamplesInitResponse.message == undefined) {
        this.damagedSamplesErrorMessage = this.damagedSamplesInitResponse.message;
      }
    }
    else {
      
      if (this.damagedSamplesInitResponse.sampleList!= null && this.damagedSamplesInitResponse.sampleList.length > 0) {
        this.damagedSamples = this.damagedSamplesInitResponse.sampleList;
      }
    }
  }
  anmdamagedSamples(){
    this.recordCount = 0; //step 3
    this.damagedSamples = [];
    this.damagedSamplesErrorMessage ='';
    this.damagedsamplesRequest = {anmId: this.user.id, notification: 1};
    let samplesList = this.DamagedSamplesService.getdamagedSamples(this.damagedsamplesRequest)
    .subscribe(response => {
      this.damagedsamplesResponse = response;
      if(this.damagedsamplesResponse !== null && this.damagedsamplesResponse.status === "true"){
        if(this.damagedsamplesResponse.sampleList.length <= 0){
          this.damagedSamplesErrorMessage = response.message;
        }
        else{
          this.damagedSamples = this.damagedsamplesResponse.sampleList;
          this.recordCount = this.damagedSamples.length; //step 4
        }
      }
      else{
        this.damagedSamplesErrorMessage = response.message;
      }
      this.onLoadSubject.emit(this.recordCount);    //step 5
      this.rerender();
      this.loadDataTable = true;
    },
    (err: HttpErrorResponse) => {
      if (this.loadDataTable) this.rerender();
      this.damagedSamplesErrorMessage = err.toString();
    });
  }
  opendamagedSamples(damagedSamplesDetail, sample: DamagedSampleList) {

    this.subjectName= sample.subjectName;
    this.uniqueSubjectId = sample.uniqueSubjectId;
    this.rchId = sample.rchID;
    this.reason = sample.reason;
    this.sampleCollectionDate = moment().format("DD/MM/YYYY");
    this.sampleCollectionTime = moment().format("HH:mm");
    this.collectionDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");

    var pattern = /(\d{2})\/(\d{2})\/(\d{4})\ (\d{2})\:(\d{2})/;
    const regDate = new Date(sample.sampleCollectionDateTime.replace(pattern,'$3/$2/$1 $4:$5'));
    this.collectionDateOptions.minDate = regDate;

    this.modalService.open(
      damagedSamplesDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      ariaLabelledBy: 'modal-basic-title'
    });

  }

  
  onSubmit(damagedSamplesForm: NgForm){

    console.log(damagedSamplesForm.value);
    this.barcodeNo = damagedSamplesForm.value.sampleBarcode;
    this.addSampleRecollectionRequest = {
      uniqueSubjectId: this.uniqueSubjectId,
      reason: this.reason,
      barcodeNo: this.barcodeNo,
      collectionFrom: 10,
      sampleCollectionDate: this.sampleCollectionDate,
      sampleCollectionTime: this.sampleCollectionTime,
      collectedBy: 1,
    };

    //Remove below 2 lines after successfully tested
    // this.showResponseMessage('Successfully registered', 's');
    // return false;

    let damagedsampleCollection = this.DamagedSamplesService.postdamagedSample(this.addSampleRecollectionRequest)
    .subscribe(response => {
      this.addSampleRecollectionResponse = response;
      if(this.addSampleRecollectionResponse !== null && this.addSampleRecollectionResponse.status === "true"){
        this.showResponseMessage(this.addSampleRecollectionResponse.message, 's')
         this.anmdamagedSamples();
      }else{
        this.showResponseMessage(this.addSampleRecollectionResponse.message, 'e');
                this.damagedSamplesErrorMessage = response.message;
      }

    },
    (err: HttpErrorResponse) => {
      this.showResponseMessage(err.toString(), 'e');
      this.damagedSamplesErrorMessage = err.toString();
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

  damagedSamplesUpdateStatus(){
    this.damagedSamplesErrorMessage = '';
    this.fetchBarcodes();

    if(this.notifySamples === ""){
      this.showResponseMessage(this.constantService.SelectOneSample, 'e');
      return false;
    }
   
    this.damagedUpdateStatusRequest = {
      anmId: this.user.id,
      barcodeNo: this.notifySamples,
     
    }
    //Remove below 2 lines after successfully tested
    // this.showResponseMessage('Successfully registered', 's');
    // return false;
    let adddamagedsample = this.DamagedSamplesService.updatedamagedSample(this.damagedUpdateStatusRequest)
      .subscribe(response => {
        this.damagedUpdateStatusResponse = response;
        if (this.damagedUpdateStatusResponse !== null && this.damagedUpdateStatusResponse.status === "true") {
          this.showResponseMessage(this.damagedUpdateStatusResponse.message, 's');
        } else {
          this.showResponseMessage(this.damagedUpdateStatusResponse.message, 'e');
          this.damagedSamplesErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.showResponseMessage(err.toString(), 'e');
          this.damagedSamplesErrorMessage = err.toString();
        });

  }

  updatestatusResponseMessage(result: string, type: string){
    var messageType = '';
    if(type === 'e'){
      Swal.fire({icon:'error', title: result, confirmButtonText: 'Close'})
    }
    else{
      Swal.fire({icon:'success', title: result, confirmButtonText: 'Close'})
      .then((result) => {
        if (result.value) {
          this.modalService.dismissAll();
        }
      });
    }
  }

  updateNotification(damagedSample: DamagedSampleList, notifiedStatus: string){
    if(notifiedStatus === '0'){
      damagedSample.notifiedStatus = "False";
    }
    else{
      damagedSample.notifiedStatus = "True";
    }
  }
//   updateNotification(event, object, value){
//     object.notifiedStatus = value;
//     console.log(this.damagedSamples);
// }
fetchBarcodes(){
  this.notifySamples = '';
  var isFirst = true;
  this.damagedSamples.forEach(element => {
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
  // fetchBarcodes(){
  //  this.notifySamples = ''
  //  var notifySamples = '';
  //   //var isFirst = true;
  //   this.damagedSamples.forEach(element => {
  //     console.log('notifiedStatus :' + element.notifiedStatus);
  //     //console.log(notifySamples);
  //     if(element.notifiedStatus === 'True'){
  //       notifySamples += element.barcodeNo + ",";
       
  //       }
       
  //   if(notifySamples !== ''){
  //     notifySamples = notifySamples.substr(0, notifySamples.length-1);
      
  //     //console.log(notifySamples);
  //   }
  // });
  // }
  

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
