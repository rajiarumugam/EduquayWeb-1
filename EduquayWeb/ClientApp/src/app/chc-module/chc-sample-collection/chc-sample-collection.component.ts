import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Output, EventEmitter, TemplateRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { user } from 'src/app/shared/auth-response';
import { SampleCollectionRequest } from 'src/app/shared/anm-module/sample-collection-request';
import { SampleCollectionResponse } from 'src/app/shared/anm-module/sample-collection-response';
import { SubjuctList, SampleCollectionPostResponse, subjectTypesResponse, subjuctType } from 'src/app/shared/anm-module/sample-collection-response';
import { SampleCollectionDateTimeRequest } from 'src/app/shared/anm-module/sample-collection-request';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { SampleCollectionService } from 'src/app/shared/anm-module/sample-collection.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/shared/utility/date.service';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-chc-sample-collection',
  templateUrl: './chc-sample-collection.component.html',
  styleUrls: ['./chc-sample-collection.component.css']
})
export class ChcSampleCollectionComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('startPicker', { static: false }) startPicker;
  @ViewChild('endPicker', { static: false }) endPicker;
  @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;
  @ViewChild('chcSampleCollectiondetail',{static: false}) private chcsampleCollectiondetailTpl: TemplateRef<any>;

  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  user: user;
  chcsCollectionErrorMessage: string;
  chcscRequest: SampleCollectionRequest;
  chcsampleCollectionResponse: SampleCollectionResponse;
  chcsampleCollectionInitResponse;
  chcsubjectList: SubjuctList[] = [];
  // popup varialbles
  chcsampleCollectionDateTimeRequest: SampleCollectionDateTimeRequest;
  chcsampleCollectionPostResponse: SampleCollectionPostResponse;
  chcsubjectTypesListResponse: subjectTypesResponse;
  chcsubjectTypes: subjuctType[] = [];
  userId: number;
  fromDate: string = "";
  toDate: string = "";
  chcSCFromDate: string ="";
  chcSCToDate: string = "";
  subjectType: number;
  registeredFrom: number;
  subjectName: string;
  subjectId: number;
  uniqueSubjectId: string;
  rchId: string;
  reason: string;
  barcodeNo: string;
  collectionDate: string;
  chcSampleCollectionDate: string;
  chcSampleCollectionTime: string;
  collectionTime: string;
  resultFromPostResponse: string;
  selectedSubjectType: string = '0';
  selected: null;
  sub: any;
  subjectIdParam: string = '';
  subjectTypeParam: string = '0';
  
  /*Date Range configuration starts*/
  dateform: FormGroup;
  popupform: FormGroup;
  DAY = 86400000;
  dyCollectionDate: Date = new Date(Date.now());

  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: '',
    maxDate: new Date(Date.now())
  };
  endOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: '',
    minDate: new Date(moment().add(-1, 'day').format()),
    maxDate: new Date(Date.now())
  };

  collectionDateOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y H:i',
    defaultDate: new Date(Date.now()),
    minDate: this.dyCollectionDate,
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
    private sampleCollectionService: SampleCollectionService,
    private modalService: NgbModal,
    private dateService: DateService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private _formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private dataservice: DataService
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "CHC - Reg & Sampling", "page": "Sample Collection"}));
    this.loaderService.display(true);
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.ChcInitializeDateRange();    
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 20,
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

    console.log(this.sampleCollectionService.sampleCollectionApi);
    this.chcSubjectTypesList();

    //this.chcsampleCollectionInitResponse = this.route.snapshot.data.chcSampleCollectionData;

    this.chcscRequest = {
      userId: this.user.id, 
      fromDate:  '',
      toDate: '',
      subjectType: +(this.selectedSubjectType),
      registeredFrom: this.user.registeredFrom
    };
    //this.sampleCollectionInitResponse = this.route.snapshot.data.sampleCollectionData;

    var some = this.sampleCollectionService.getSampleCollection(this.chcscRequest).subscribe(response => {
      this.chcsampleCollectionResponse = response;
      this.loaderService.display(false);
      if (this.chcsampleCollectionResponse.status === 'false') {
        this.chcsubjectList = [];
        if (this.chcsampleCollectionResponse.message !== null && this.chcsampleCollectionResponse.message.length > 0) {
          this.chcsCollectionErrorMessage = "Unable to connect to api source";
        }
        else if (this.chcsampleCollectionResponse.message !== null || this.chcsampleCollectionResponse.message == undefined) {
          this.chcsCollectionErrorMessage = this.chcsampleCollectionResponse.message;
        }
      }
      else {
        //this.fromDate = formatDate(this.sampleCollectionInitResponse.fromDate, "dd/MM/yyyy", "en-US");
        // this.fromDate = this.chcsampleCollectionInitResponse.fromDate.replace('-', '/').replace('-', '/');
        if (this.chcsampleCollectionResponse.subjectList != null && this.chcsampleCollectionResponse.subjectList.length > 0) {
          this.chcsubjectList = this.chcsampleCollectionResponse.subjectList;
        }
      }
      this.rerender();
      this.loadDataTable = true;
    },
    (err: HttpErrorResponse) => {
      this.chcsCollectionErrorMessage = err.toString();
    });
    
    
    this.sub = this.route.queryParams.subscribe(params => {
    this.subjectIdParam = params['sid'] == undefined ? '': params['sid'];
    });
  }

  chcSubjectTypesList() {

    // this.sub = this.route.params.subscribe(params => {
    //   this.subjectTypeParam = params['subtype'] == undefined ? '' : params['subtype'];
    //   this.subjectTypeParam == 'f' ? this.selectedSubjectType = '1' : (this.subjectTypeParam == 'm' ? this.selectedSubjectType = '2' : (this.subjectTypeParam == 's' ? this.selectedSubjectType = '3' : this.selectedSubjectType = ''));
    // });
    this.selectedSubjectType = '';
    this.sampleCollectionService.getSubjectType().subscribe(response => {
      this.chcsubjectTypesListResponse = response;
      if (this.chcsubjectTypesListResponse !== null && this.chcsubjectTypesListResponse.status === "true") {
        this.chcsubjectTypes = this.chcsubjectTypesListResponse.subjectTypes;
      }
      else {
        this.chcsCollectionErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.chcsCollectionErrorMessage = err.toString();

      });
  }

 chcSampleCollection(){
  this.loaderService.display(true);
  this.chcsubjectList = [];
  this.chcsCollectionErrorMessage = '';
  if (!this.validateDateRange()) {
    this.chcsCollectionErrorMessage = "Select valid date range to search for subjects";
    return;
  }
     this.chcscRequest = {
       userId: this.user.id,
       fromDate: this.chcSCFromDate !== '' ? this.chcSCFromDate : '',
       toDate: this.chcSCToDate !== '' ? this.chcSCToDate : '',
       subjectType: +(this.selectedSubjectType),
       registeredFrom: this.user.registeredFrom
     };
  let sampleCollection = this.sampleCollectionService.getSampleCollection(this.chcscRequest)
    .subscribe(response => {
      this.chcsampleCollectionResponse = response;
      this.loaderService.display(false);
      if (this.chcsampleCollectionResponse !== null && this.chcsampleCollectionResponse.status === "true") {
        if (this.chcsampleCollectionResponse.subjectList.length <= 0) {
          this.chcsCollectionErrorMessage = response.message;
        }
        else {
          this.chcsubjectList = this.chcsampleCollectionResponse.subjectList;
        }
      }
      else {
        this.chcsCollectionErrorMessage = response.message;
      }
      this.rerender();
      this.loadDataTable = true;
    },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.chcsCollectionErrorMessage = err.toString();
      });
 }

 validateDateRange(): boolean{
  if(new Date(this.dateform.controls.fromDate.value) > new Date(this.dateform.controls.toDate.value)){
    return false;
  }
  return true;
}

openchcSampleColllection(chcSampleCollectiondetail, subject: SubjuctList){

  this.subjectName= subject.subjectName;
  this.subjectId = subject.id;
  this.uniqueSubjectId = subject.uniqueSubjectId;
  this.rchId = subject.rchId;
  this.reason = subject.reason;
  this.chcSampleCollectionDate = moment().format("DD/MM/YYYY");
  this.chcSampleCollectionTime = moment().format("HH:mm");
  this.collectionDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
  this.collectionDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");
  this.barcodeNo = '';

  if(subject.sampleType === "F"){
    var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    //var pattern = /(\d{2})\/(\d{2})\/(\d{4})\ (\d{2})\:(\d{2})/;
    const regDate = new Date(subject.dateOfRegister.replace(pattern,'$3/$2/$1'));
    this.collectionDateOptions.minDate = regDate;
  }
  else{
    var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    const oldCollectionDate = new Date(subject.oldSampleCollectionDate.replace(pattern,'$3/$2/$1'));
    this.collectionDateOptions.minDate = oldCollectionDate;
  }

  this.modalService.open(
    chcSampleCollectiondetail,{
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
}

// onSubmit(){
//   console.log("res:", this.collectionForm.getRawValue());
//  // console.log('openSampleCOlllection()');
//   Swal.fire('Hey user!', 'I don\'t like you.', 'success');
// }
onSubmit(chcCollectionForm: NgForm){
  //this.submitted = true;
  console.log(chcCollectionForm.value);
  //collectionForm.reset();
  this.barcodeNo = chcCollectionForm.value.sampleBarcode;
  // if(this.barcodeNo === '' || this.barcodeNo == null){
  //   return false;
  // }
   // this.collectionDate = collectionForm.value.sampleCollectionDate;
  // this.collectionTime = collectionForm.value.collectionTime;

  this.chcsampleCollectionDateTimeRequest = {
    uniqueSubjectId: this.uniqueSubjectId,
    reason: this.reason,
    barcodeNo: this.barcodeNo,
    collectionFrom: this.user.sampleCollectionFrom,
    sampleCollectionDate: this.chcSampleCollectionDate,
    sampleCollectionTime: this.chcSampleCollectionTime,
    collectedBy: this.user.id,
  };

  //Remove below 2 lines after successfully tested
  // this.showResponseMessage('Successfully registered', 's');
  //return false;

  let sampleCollection = this.sampleCollectionService.postSampleCollection(this.chcsampleCollectionDateTimeRequest)
  .subscribe(response => {
    this.chcsampleCollectionPostResponse = response;
    if(this.chcsampleCollectionPostResponse !== null && this.chcsampleCollectionPostResponse.status === "true"){
      this.showResponseMessage(this.chcsampleCollectionPostResponse.message, 's')
       this.chcSampleCollection();
    }else{
      this.showResponseMessage(this.chcsampleCollectionPostResponse.message, 'e');
              this.chcsCollectionErrorMessage = response.message;
    }

  },
  (err: HttpErrorResponse) => {
    this.showResponseMessage(err.toString(), 'e');
    this.chcsCollectionErrorMessage = err.toString();
  });
  //swal ("Here's the title!", "...and here's the text!");
}

showResponseMessage(message: string, type: string){
  var messageType = '';
  if(type === 'e'){
    Swal.fire({ allowOutsideClick: false,icon:'error', title: message, confirmButtonText: 'Close'})
  }
  else{
    Swal.fire({ allowOutsideClick: false,icon:'success', title: message, confirmButtonText: 'Close'})
    .then((result) => {
      if (result.value) {
        this.modalService.dismissAll();
      }
    });
  }
}


  ChcInitializeDateRange() {
    //this.chcSCFromDate = moment().add(-1, 'day').format("DD/MM/YYYY");
    //this.chcSCToDate = moment().format("DD/MM/YYYY");

    this.dateform = this._formBuilder.group({
      fromDate: [''],
      toDate: [''],
      selectedSubjectType: ['0']
    });

    // this.dateform = this._formBuilder.group({
    //   fromDate: [moment().add(-1, 'day')],
    //   toDate: [moment()],
    //   selectedSubjectType: ['0']
    // });
    this.popupform = this._formBuilder.group({
      collectionDate: [new Date(moment().add(-1, 'day').format())],
    });

    // Start Date Changes
    this.dateform.controls.fromDate.valueChanges.subscribe(changes => {
      if (!changes[0]) return;
      const selectedDate = changes[0].getTime();
      this.chcSCFromDate = moment(new Date(selectedDate)).format("DD/MM/YYYY");
      const monthLaterDate = selectedDate + (this.DAY * 30);
      // console.log(monthLaterDate > Date.now() ? new Date() : new Date(monthLaterDate));
      if (changes > this.dateform.controls.toDate.value) {
        this.endPicker.flatpickr.set({
          defaultDate: new Date(Date.now()),
          minDate: new Date(selectedDate),
        });
      }
      else {
        this.endPicker.flatpickr.set({
          minDate: new Date(selectedDate),
        });
      }
    });

    // // End Date Changes
    this.dateform.controls.toDate.valueChanges.subscribe(changes => {
      console.log('end: ', changes);
      if (!changes[0]) return;
      const selectedDate1 = changes[0].getTime();
      this.chcSCToDate = moment(new Date(selectedDate1)).format("DD/MM/YYYY");

      //const monthLaterDate = selectedDate1;
      // this.startPicker.flatpickr.set({
      //   defaultDate: new Date(selectedDate1)
      // });
    });

    //Change of sample collection date
    this.popupform.controls.collectionDate.valueChanges.subscribe(changes => {
      console.log('end: ', changes);
      if (!changes[0]) return;
      const selectedDate2 = changes[0].getTime();
      this.chcSampleCollectionDate = moment(new Date(selectedDate2)).format("DD/MM/YYYY");
      this.chcSampleCollectionTime = moment(new Date(selectedDate2)).format("HH:mm");
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
    if(this.subjectIdParam !== ''){
      var subDetail = this.chcsubjectList.find(x => x.uniqueSubjectId === this.subjectIdParam)
      if(subDetail===undefined) return;
      this.openchcSampleColllection(this.chcsampleCollectiondetailTpl , subDetail);
    } 
  }   


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
