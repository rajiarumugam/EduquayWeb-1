import { Component, OnInit, ViewChild } from '@angular/core';
import { SampleCollectionService } from 'src/app/shared/anm-module/sample-collection.service';
import { SampleCollectionResponse, SubjuctList, SampleCollectionPostResponse, subjuctType, subjectTypesResponse } from 'src/app/shared/anm-module/sample-collection-response';
import { HttpErrorResponse } from '@angular/common/http';
import { SampleCollectionRequest, SampleCollectionDateTimeRequest } from 'src/app/shared/anm-module/sample-collection-request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DateService } from 'src/app/shared/utility/date.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
//import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-sample-collection',
  templateUrl: './sample-collection.component.html',
  styleUrls: ['./sample-collection.component.css']
})
export class SampleCollectionComponent implements OnInit {
 //@ViewChild('f', { static: false }) collectionForm: NgForm;
 //@ViewChild('collectionForm' , { static: false }) collectionForm : NgForm;
 //collectionForm: FormGroup;
 //@ViewChild('s', { static: false }) getSampleCollectionData: NgForm;
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
    private route: ActivatedRoute
    // private fb: FormBuilder
    ) {  }

  ngOnInit() {
    this.collectionDate = this.dateService.getDate();
    this.fromDate = this.dateService.getDate();
    this.toDate = this.dateService.getDate();
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
      userId: 1, fromDate: this.fromDate, toDate: this.toDate, subjectType: +(this.selectedSubjectType),
      registeredFrom: 8};
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
      }else{
        this.sCollectionErrorMessage = response.message;
      }
    },
    (err: HttpErrorResponse) => {
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

  // resetValues(){

  //   this.barcodeNo = '';
  //   this.collectionDate = '';
  //   this.collectionTime = '';

  // }


  // Validate barcode before submit
  // clear controls once the data is submitted
  // close the popup once the click on the swal Ok button
  // default date and time value in the control

}
