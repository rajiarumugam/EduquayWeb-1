import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Output, EventEmitter, TemplateRef } from '@angular/core';
import { SampleCollectionService } from 'src/app/shared/anm-module/sample-collection.service';
import { SampleCollectionResponse, SubjuctList, SampleCollectionPostResponse, subjuctType, subjectTypesResponse } from 'src/app/shared/anm-module/sample-collection-response';
import { HttpErrorResponse } from '@angular/common/http';
import { SampleCollectionRequest, SampleCollectionDateTimeRequest } from 'src/app/shared/anm-module/sample-collection-request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { DateService } from 'src/app/shared/utility/date.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';
import { TokenService } from 'src/app/shared/token.service';
import { user } from 'src/app/shared/auth-response';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { DataService } from 'src/app/shared/data.service';
//import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-sample-collection',
  templateUrl: './sample-collection.component.html',
  styleUrls: ['./sample-collection.component.css']
})
export class SampleCollectionComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('startPicker', { static: false }) startPicker;
  @ViewChild('endPicker', { static: false }) endPicker;
  @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;
  @ViewChild('sampleCollectiondetail',{static: false}) private sampleCollectiondetailTpl: TemplateRef<any>;

  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  user: user;
  sCollectionErrorMessage: string;
  scRequest: SampleCollectionRequest;
  sampleCollectionResponse: SampleCollectionResponse;
  sampleCollectionInitResponse;
  subjectList: SubjuctList[] = [];
  // popup varialbles
  sampleCollectionDateTimeRequest: SampleCollectionDateTimeRequest;
  sampleCollectionPostResponse: SampleCollectionPostResponse;
  subjectTypesListResponse: subjectTypesResponse;
  userId: number;
  fromDate: string = "";
  toDate: string = "";
  scFromDate: string ="";
  scToDate: string = "";
  subjectType: number;
  registeredFrom: number;
  subjectName: string;
  subjectId: number;
  uniqueSubjectId: string;
  rchId: string;
  reason: string;
  barcodeNo: string;
  collectionDate: string;
  sampleCollectionDate: string;
  sampleCollectionTime: string;
  collectionTime: string;
  resultFromPostResponse: string;
  subjectTypes: subjuctType[] = [];
  selectedSubjectType: string = '0';
  selected: null;
  sub: any;
  subjectIdParam: string = '';
  subjectTypeParam: string = '0';
  date: Date;

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
  /*Date Range configuration ends*/
  //sampleTypes = ['Antenatal Woman', 'Spouse', 'Child', 'Walk-in'];

  constructor(
    private sampleCollectionService: SampleCollectionService,
    private modalService: NgbModal,
    private dateService: DateService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private _formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private dataservice: DataService
    ) {  }

  ngOnInit() {
    this.dataservice.sendData(JSON.stringify({"module": "ANM", "page": "Sample Collection"}));

    this.loaderService.display(true);
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    
    this.InitializeDateRange();    
    this.dtOptions = {
      pagingType: 'full_numbers', //'simple_numbers',
      pageLength: 5,
      processing: true,
      stripeClasses: [],
      lengthMenu: [5, 10, 20, 50],
      language: {
        search: '<div><span class="note">Search by any Subject information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
        searchPlaceholder: "Search...",
        lengthMenu: "Records / Page :  _MENU_",
        info: "Showing _START_ to _END_ of _TOTAL_ entries",
        paginate: {
          first: '',
          last: '', // or '←' 
          previous: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
          next: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
        }, 
      }   
    };

    this.collectionDate = this.dateService.getDate();
    this.fromDate = moment().format("DD/MM/YYYY");
    this.toDate = moment().format("DD/MM/YYYY");
    this.collectionTime = this.dateService.getTime();
    console.log(this.sampleCollectionService.sampleCollectionApi);
    this.anmSubjectTypes();

    this.sampleCollectionInitResponse = this.route.snapshot.data.sampleCollectionData;
    this.loaderService.display(false);
    if (this.sampleCollectionInitResponse.status === 'false') {
      this.subjectList = [];
      if (this.sampleCollectionInitResponse.message !== null && this.sampleCollectionInitResponse.message.code === "ENOTFOUND") {
        this.sCollectionErrorMessage = "Unable to connect to api source";
      }
      else if (this.sampleCollectionInitResponse.message !== null || this.sampleCollectionInitResponse.message == undefined) {
        this.sCollectionErrorMessage = this.sampleCollectionInitResponse.message;
      }
    }
    else {
      //this.fromDate = formatDate(this.sampleCollectionInitResponse.fromDate, "dd/MM/yyyy", "en-US");
      var getdate;
      this.fromDate = this.sampleCollectionInitResponse.fromDate.replace('-', '/').replace('-', '/');
      if (this.sampleCollectionInitResponse.subjectList != null && this.sampleCollectionInitResponse.subjectList.length > 0) {
        this.subjectList = this.sampleCollectionInitResponse.subjectList;
        this.subjectList.forEach(element => {
          element.date = this.convertToDateFormat(element.dateOfRegister);
          console.log(this.subjectList);
        });
        console.log('something');
      }
     
    }
    this.sub = this.route.queryParams.subscribe(params => {
      this.subjectIdParam = params['sid'] == undefined ? '': params['sid'];
    });

  }

  convertToDateFormat(strDate){
  
    var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    var dateFormat = new Date(strDate.toString().replace(pattern, '$3/$2/$1'));
    console.log(dateFormat);
    return dateFormat;
  
  }

  anmSubjectTypes() {

    // this.sub = this.route.params.subscribe(params => {
    //   this.subjectTypeParam = params['subtype'] == undefined ? '' : params['subtype'];
    //   this.subjectTypeParam == 'f' ? this.selectedSubjectType = '1' : (this.subjectTypeParam == 'm' ? this.selectedSubjectType = '2' : (this.subjectTypeParam == 's' ? this.selectedSubjectType = '3' : this.selectedSubjectType = ''));
    // });
    this.selectedSubjectType = '';
    this.sampleCollectionService.getSubjectType().subscribe(response => {
      this.subjectTypesListResponse = response;
      if (this.subjectTypesListResponse !== null && this.subjectTypesListResponse.status === "true") {
        this.subjectTypes = this.subjectTypesListResponse.subjectTypes;
      }
      else {
        this.sCollectionErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.sCollectionErrorMessage = err.toString();

      });
  }

  anmSampleCollection() {
    this.loaderService.display(true);
    this.subjectList = [];
    this.sCollectionErrorMessage = '';
    if (!this.validateDateRange()) {
      this.sCollectionErrorMessage = "Select valid date range to search for subjects";
      return;
    }
      this.scRequest = {
        userId: this.user.id,
        fromDate: this.scFromDate != '' ? this.scFromDate : '',
        toDate: this.scToDate != '' ? this.scToDate : '',
        subjectType: +(this.selectedSubjectType),
        registeredFrom: this.user.registeredFrom
      };

    let sampleCollection = this.sampleCollectionService.getSampleCollection(this.scRequest)
      .subscribe(response => {
        this.sampleCollectionResponse = response;
        this.loaderService.display(false);
        if (this.sampleCollectionResponse !== null && this.sampleCollectionResponse.status === "true") {
          if (this.sampleCollectionResponse.subjectList.length <= 0) {
            this.sCollectionErrorMessage = response.message;
          }
          else {
            this.subjectList = this.sampleCollectionResponse.subjectList;
            this.subjectList.forEach(element => {
              element.date = this.convertToDateFormat(element.dateOfRegister);
              console.log(this.subjectList);
            });
          }
        }
        else {
          this.sCollectionErrorMessage = response.message;
        }
        this.rerender();
        this.loadDataTable = true;
      },
        (err: HttpErrorResponse) => {
          if (this.loadDataTable) this.rerender();
          this.sCollectionErrorMessage = err.toString();
        });
  }

  validateDateRange(): boolean{
    if(new Date(this.dateform.controls.fromDate.value) > new Date(this.dateform.controls.toDate.value)){
      return false;
    }
    return true;
  }

  openSampleColllection(subjectDetailModal, subject: SubjuctList){

    this.subjectName= subject.subjectName;
    this.subjectId = subject.id;
    this.uniqueSubjectId = subject.uniqueSubjectId;
    this.rchId = subject.rchId;
    this.reason = subject.reason;
    this.sampleCollectionDate = moment().format("DD/MM/YYYY");
    this.sampleCollectionTime = moment().format("HH:mm");
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
      subjectDetailModal,{
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
  onSubmit(collectionForm: NgForm){
    //this.submitted = true;
    console.log(collectionForm.value);
    //collectionForm.reset();
    this.barcodeNo = collectionForm.value.sampleBarcode;
    // if(this.barcodeNo === '' || this.barcodeNo == null){
    //   return false;
    // }
     // this.collectionDate = collectionForm.value.sampleCollectionDate;
    // this.collectionTime = collectionForm.value.collectionTime;

    this.sampleCollectionDateTimeRequest = {
      uniqueSubjectId: this.uniqueSubjectId,
      reason: this.reason,
      barcodeNo: this.barcodeNo,
      collectionFrom: this.user.sampleCollectionFrom,
      sampleCollectionDate: this.sampleCollectionDate,
      sampleCollectionTime: this.sampleCollectionTime,
      collectedBy: this.user.id,
    };
    
    //Remove below 2 lines after successfully tested
    // this.showResponseMessage('Successfully registered', 's');
    

    let sampleCollection = this.sampleCollectionService.postSampleCollection(this.sampleCollectionDateTimeRequest)
    .subscribe(response => {
      this.sampleCollectionPostResponse = response;
      if(this.sampleCollectionPostResponse !== null && this.sampleCollectionPostResponse.status === "true"){
        this.showResponseMessage(this.sampleCollectionPostResponse.message, 's')
         this.anmSampleCollection();
         //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
      }else{
        this.showResponseMessage(this.sampleCollectionPostResponse.message, 'e');
                this.sCollectionErrorMessage = response.message;
      }

    },
    (err: HttpErrorResponse) => {
      this.showResponseMessage(err.toString(), 'e');
      this.sCollectionErrorMessage = err.toString();
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

  InitializeDateRange() {
    //this.scFromDate = moment().add(-1, 'day').format("DD/MM/YYYY");
    //this.scToDate = moment().format("DD/MM/YYYY");
    
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
      this.scFromDate = moment(new Date(selectedDate)).format("DD/MM/YYYY");
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
      this.scToDate = moment(new Date(selectedDate1)).format("DD/MM/YYYY");

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
    if(this.subjectIdParam !== ''){
      var subDetail = this.subjectList.find(x => x.uniqueSubjectId === this.subjectIdParam)
      if(subDetail===undefined) return;
      this.openSampleColllection(this.sampleCollectiondetailTpl , subDetail);
    }    
  }   


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
