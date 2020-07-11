import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SampleCollectionService } from 'src/app/shared/anm-module/sample-collection.service';
import { SampleCollectionResponse, SubjuctList, SampleCollectionPostResponse, subjuctType, subjectTypesResponse } from 'src/app/shared/anm-module/sample-collection-response';
import { HttpErrorResponse } from '@angular/common/http';
import { SampleCollectionRequest, SampleCollectionDateTimeRequest } from 'src/app/shared/anm-module/sample-collection-request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DateService } from 'src/app/shared/utility/date.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';
import { TokenService } from 'src/app/shared/token.service';
import { user } from 'src/app/shared/auth-response';
//import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-sample-collection',
  templateUrl: './sample-collection.component.html',
  styleUrls: ['./sample-collection.component.css']
})
export class SampleCollectionComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
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
  fromDate: string;
  toDate: string;
  subjectType: number;
  registeredFrom: number;
  subjectName: string;
  subjectId: number;
  uniqueSubjectId: string;
  rchId: string;
  reason: string;
  barcodeNo: string;
  collectionDate: string;
  collectionTime: string;
  resultFromPostResponse: string;
  subjectTypes: subjuctType[] = [];
  selectedSubjectType: string = '1';
  selected: null;

  //sampleTypes = ['Antenatal Woman', 'Spouse', 'Child', 'Walk-in'];

  constructor(
    private sampleCollectionService: SampleCollectionService,
    private modalService: NgbModal,
    private dateService: DateService,
    private route: ActivatedRoute,
    private tokenService: TokenService
    // private fb: FormBuilder
    ) {  }

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
    };

    this.collectionDate = this.dateService.getDate();
    this.fromDate = moment().format("DD/MM/YYYY");
    this.toDate = moment().format("DD/MM/YYYY");
    this.collectionTime = this.dateService.getTime();
    console.log(this.sampleCollectionService.sampleCollectionApi);
    this.anmSubjectTypes();

    this.sampleCollectionInitResponse = this.route.snapshot.data.sampleCollectionData;
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
      this.fromDate = this.sampleCollectionInitResponse.fromDate.replace('-', '/').replace('-', '/');
      if (this.sampleCollectionInitResponse.subjectList != null && this.sampleCollectionInitResponse.subjectList.length > 0) {
        this.subjectList = this.sampleCollectionInitResponse.subjectList;
      }
    }
  }

  anmSubjectTypes(){

   this.sampleCollectionService.getSubjectType().subscribe(response =>{
      this.subjectTypesListResponse = response;
      if(this.subjectTypesListResponse !== null && this.subjectTypesListResponse.status === "true"){
          this.subjectTypes  = this.subjectTypesListResponse.subjectTypes;
          this.selectedSubjectType = "1";
        }
        else{
          this.sCollectionErrorMessage = response.message;
        }
    },
    (err: HttpErrorResponse) => {
      this.sCollectionErrorMessage = err.toString();

    });
  }

  anmSampleCollection(){
    this.subjectList = [];
    this.sCollectionErrorMessage ='';
    this.scRequest = {
      userId: this.user.id, fromDate: this.fromDate, toDate: this.toDate, subjectType: +(this.selectedSubjectType),
      registeredFrom: this.user.registeredFrom};
    let sampleCollection = this.sampleCollectionService.getSampleCollection(this.scRequest)
    .subscribe(response => {
      this.sampleCollectionResponse = response;
      if(this.sampleCollectionResponse !== null && this.sampleCollectionResponse.status === "true"){
        if(this.sampleCollectionResponse.subjectList.length <= 0){
          this.sCollectionErrorMessage = response.message;
        }
        else{
          this.subjectList = this.sampleCollectionResponse.subjectList;
        }
      }
      else{
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

  openSampleColllection(subjectDetailModal, subject: SubjuctList){
    this.subjectName= subject.subjectName;
    this.subjectId = subject.id;
    this.uniqueSubjectId = subject.uniqueSubjectId;
    this.rchId = subject.rchId;
    this.reason = subject.reason;


    this.modalService.open(
      subjectDetailModal,{
        centered: true,
        size: 'xl',
        scrollable: true,
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
      collectionFrom: 10,
      sampleCollectionDate: this.collectionDate,
      sampleCollectionTime: this.collectionTime,
      collectedBy: 1,
    };

    //Remove below 2 lines after successfully tested
    // this.showResponseMessage('Successfully registered', 's');
    // return false;

    let sampleCollection = this.sampleCollectionService.postSampleCollection(this.sampleCollectionDateTimeRequest)
    .subscribe(response => {
      this.sampleCollectionPostResponse = response;
      if(this.sampleCollectionPostResponse !== null && this.sampleCollectionPostResponse.status === "true"){
        this.showResponseMessage(this.sampleCollectionPostResponse.result, 's')
         this.anmSampleCollection();
      }else{
        this.showResponseMessage(this.sampleCollectionPostResponse.result, 'e');
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
