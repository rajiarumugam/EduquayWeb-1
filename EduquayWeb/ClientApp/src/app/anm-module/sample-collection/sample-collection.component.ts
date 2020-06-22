import { Component, OnInit, ViewChild } from '@angular/core';
import { SampleCollectionService } from 'src/app/shared/anm-module/sample-collection.service';
import { SampleCollectionResponse, SubjuctList, SampleCollectionPostResponse } from 'src/app/shared/anm-module/sample-collection-response';
import { HttpErrorResponse } from '@angular/common/http';
import { SampleCollectionRequest, SampleCollectionDateTimeRequest } from 'src/app/shared/anm-module/sample-collection-request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import swal from 'sweetalert2'; 
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
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
  sCollectionErrorMessage: string;
  scRequest: SampleCollectionRequest;
  sampleCollectionResponse: SampleCollectionResponse;
  subjectList: SubjuctList[] = [];
  // popup varialbles
  sampleCollectionDateTimeRequest: SampleCollectionDateTimeRequest;
  sampleCollectionPostResponse: SampleCollectionPostResponse;
  subjectName: string;
  subjectId: number;
  uniqueSubjectId: string;
  rchId: string;
  reason: string;
  barcodeNo: string;
  collectionDate: string;
  collectionTime: string;
  resultFromPostResponse: string;
  
  constructor(
    private sampleCollectionService: SampleCollectionService,
    private modalService: NgbModal,
    // private fb: FormBuilder
    ) { }

  ngOnInit() {
    console.log(this.sampleCollectionService.sampleCollectionApi);
    this.anmSampleCollection();
    // this.collectionForm = this.fb.group({
    //   subjectName: [''],
    //   subjectId: [''],
    //   rchId: [''],
    //   reason: ['']
    //  });
  }

  anmSampleCollection(){
    this.subjectList = [];
    this.scRequest = {userId: 1, fromDate: '19-06-2020', toDate: '30-06-2020', subjectType: 1, registeredFrom: 8};
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
    this.reason = subject.sampleType === 'F' ? 'First Time Collection': 'Damaged Sample';


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
    console.log(collectionForm.value);
    collectionForm.reset();
    this.barcodeNo = collectionForm.value.sampleBarcode;
    this.collectionDate = collectionForm.value.sampleCollectionDate;
    this.collectionTime = collectionForm.value.collectionTime;

    this.sampleCollectionDateTimeRequest = {
      uniqueSubjectId: this.uniqueSubjectId,
      reason: this.reason,
      barcodeNo: this.barcodeNo,
      collectionFrom: 10,
      sampleCollectionDate: this.collectionDate,
      sampleCollectionTime: this.collectionTime,
      collectedBy: 1,
    };

    let sampleCollection = this.sampleCollectionService.postSampleCollection(this.sampleCollectionDateTimeRequest)
    .subscribe(response => {
      this.sampleCollectionPostResponse = response;
      if(this.sampleCollectionPostResponse !== null && this.sampleCollectionPostResponse.status === "true"){
        this.showResponseMessage(this.sampleCollectionPostResponse.result, 's');
        //this.resetValues();
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
    if(type === 'e' ){
      Swal.fire({icon:'warning', title: message, confirmButtonText: 'Close'})
      .then((result) => {
        if (result.value) {
          this.modalService.dismissAll();
        }
      }); 
    }
    else{
      Swal.fire({icon:'info', title: message, confirmButtonText: 'Close'})
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
