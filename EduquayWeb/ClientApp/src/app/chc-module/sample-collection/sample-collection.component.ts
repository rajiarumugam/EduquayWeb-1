import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { user } from 'src/app/shared/auth-response';
import { SampleCollectionRequest } from 'src/app/shared/chc-module/sample-collection/sample-collection-request';
import { SampleCollectionResponse } from 'src/app/shared/chc-module/sample-collection/sample-collection-response';
import { SubjuctList, SampleCollectionPostResponse, subjectTypesResponse, subjuctType } from 'src/app/shared/anm-module/sample-collection-response';
import { SampleCollectionDateTimeRequest } from 'src/app/shared/anm-module/sample-collection-request';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { SampleCollectionService } from 'src/app/shared/anm-module/sample-collection.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/shared/utility/date.service';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';

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
  chcsubjectTypes: subjuctType[] = [];
  selectedSubjectType: string = '1';
  selected: null;
  
  /*Date Range configuration starts*/
  dateform: FormGroup;
  popupform: FormGroup;
  DAY = 86400000;
  dyCollectionDate: Date = new Date(Date.now());

  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: moment().add(-1, 'day').format('DD/MM/yyyy'),
    maxDate: new Date(Date.now())
  };
  endOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: new Date(Date.now()),
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
  ) { }

  ngOnInit() {

    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.ChcInitializeDateRange();    
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

    console.log(this.sampleCollectionService.sampleCollectionApi);
    //this.anmSubjectTypes();

    this.chcsampleCollectionInitResponse = this.route.snapshot.data.chcSampleCollectionData;
    if (this.chcsampleCollectionInitResponse.status === 'false') {
      this.chcsubjectList = [];
      if (this.chcsampleCollectionInitResponse.message !== null && this.chcsampleCollectionInitResponse.message.code === "ENOTFOUND") {
        this.chcsCollectionErrorMessage = "Unable to connect to api source";
      }
      else if (this.chcsampleCollectionInitResponse.message !== null || this.chcsampleCollectionInitResponse.message == undefined) {
        this.chcsCollectionErrorMessage = this.chcsampleCollectionInitResponse.message;
      }
    }
    else {
      //this.fromDate = formatDate(this.sampleCollectionInitResponse.fromDate, "dd/MM/yyyy", "en-US");
      this.fromDate = this.chcsampleCollectionInitResponse.fromDate.replace('-', '/').replace('-', '/');
      if (this.chcsampleCollectionInitResponse.subjectList != null && this.chcsampleCollectionInitResponse.subjectList.length > 0) {
        this.chcsubjectList = this.chcsampleCollectionInitResponse.subjectList;
      }
    }
  }

  ChcInitializeDateRange() {
    this.chcSCFromDate = moment().add(-1, 'day').format("DD/MM/YYYY");
    this.chcSCToDate = moment().format("DD/MM/YYYY");

    this.dateform = this._formBuilder.group({
      fromDate: [moment().add(-1, 'day')],
      toDate: [moment()],
      selectedSubjectType: ['0']
    });
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

  anmSampleCollection(){}
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
