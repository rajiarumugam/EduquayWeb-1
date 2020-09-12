import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Output, EventEmitter, HostListener } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { user } from 'src/app/shared/auth-response';
import { DcNotificationResponse, dcSamplesList, dcUpdateSamples } from 'src/app/shared/district-coordinator/dc-notification-response';
import { DcNotificationRequest } from 'src/app/shared/district-coordinator/dc-notification-request';
import { DistrictCoordinatorService } from 'src/app/shared/district-coordinator/district-coordinator.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/shared/utility/date.service';
import { TokenService } from 'src/app/shared/token.service';
import { FormBuilder } from '@angular/forms';
import { ConstantService } from 'src/app/shared/constant.service';
import { DataService } from 'src/app/shared/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-unsent-samples',
  templateUrl: './unsent-samples.component.html',
  styleUrls: ['./unsent-samples.component.css']
})
export class UnsentSamplesComponent implements AfterViewInit, OnDestroy, OnInit {

    //Child component
    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;
    
    loadDataTable: boolean = false;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    user: user;
  
    recordCount: number; //step 2
    dcunsentSamplesErrorMessage: string;
    dcunsentsamplesResponse: DcNotificationResponse;
    unsentSamples: dcSamplesList[]= [];
    dcunsentSamplesRequest: DcNotificationRequest;
    dcupdateunsentsamplesResponse: dcUpdateSamples;
  
    
    sampleCollectionId: number;
    subjectId: string;
    subjectName: string;
    anmName: string;
    anmContactNo: string;
    subjectType: string;
    barcodeNo: string;
    sampleCollectionDate: string;
    sampleCollectionTime: string;
    gender: string;
    gestationalAge: string;
    districtName: string;
    chcName: string;
    scName: string;
    phcName: string;
    riPoint: string;
    age: string;
    dob: string;
    religion: string;
    caste: string;
    community: string;
    contactNo: string;
    rchId: string;
    ecNumber: string;
    address: string;
    lmpDate: string;
    gpla: string;
    followUpStatus: string;
    notifySamples: string;
  
    @HostListener('window:scroll')
    checkScroll() {
  
      // window의 scroll top
      // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.
  
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  
      //console.log('[scroll]', scrollPosition);
  
      if (scrollPosition > 180) {
        $('#showhidediv').show();
      }
      else
        $('#showhidediv').hide();
  
    }
  
    constructor(
      private dcunsentSamplesService: DistrictCoordinatorService,
      private modalService: NgbModal,
      private router: Router,
      private route: ActivatedRoute,
      private dateService: DateService,
      private tokenService: TokenService,
      private _formBuilder: FormBuilder,
      private constantService: ConstantService,
      private dataservice: DataService,
      private loaderService: LoaderService
    ) { }
  
    ngOnInit() {
  
      this.dataservice.sendData(JSON.stringify({"module": "District Coordinator", "submodule":"Notification", "page": "Unsent Samples"}));
      this.recordCount = 0;
      this.user = JSON.parse(this.tokenService.getUser('lu'));
      //this.InitializeDateRange(); 
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
      console.log(this.dcunsentSamplesService.unsentSampleApi);
      this.dcunsentSamples(this.user.districtId);
  
      
    }
  
    dcunsentSamples(districtId){

      this.loaderService.display(true);
      this.recordCount = 0; //step 3
      this.unsentSamples = [];
      this.dcunsentSamplesErrorMessage ='';
      let samplesList = this.dcunsentSamplesService.getunsentSampleList(this.user.districtId)
      .subscribe(response => {
        this.dcunsentsamplesResponse = response;
        this.loaderService.display(false);
        if(this.dcunsentsamplesResponse !== null && this.dcunsentsamplesResponse.status === "true"){
          if(this.dcunsentsamplesResponse.samples.length <= 0){
            this.dcunsentSamplesErrorMessage = response.message;
          }
          else{
            this.unsentSamples = this.dcunsentsamplesResponse.samples;
            this.recordCount = this.unsentSamples.length; //step 4
          }
        }
        else{
          this.dcunsentSamplesErrorMessage = response.message;
        }
        this.onLoadSubject.emit(this.recordCount);    //step 5
        this.rerender();
        this.loadDataTable = true;
      },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.dcunsentSamplesErrorMessage = err.toString();
      });
    }
  
    openunsentSamples(unsentSamplesDetail, sample: dcSamplesList) {
  
      this.subjectName= sample.subjectName;
      this.subjectId = sample.subjectId;
      this.rchId = sample.rchId;
      this.anmName = sample.anmName;
      this.anmContactNo = sample.anmContactNo;
      this.subjectType = sample.subjectType;
      this.barcodeNo = sample.barcodeNo;
      this.sampleCollectionDate = sample.sampleCollectionDate;
      this.sampleCollectionTime = sample.sampleCollectionTime;
      this.gender = sample.gender;
      this.gestationalAge = sample.gestationalAge;
      this.districtName = sample.districtName;
      this.chcName = sample.chcName;
      this.scName = sample.scName;
      this.riPoint = sample.riPoint;
      this.age = sample.age;
      this.dob = sample.dob;
      this.religion = sample.religion;
      this.caste = sample.caste;
      this.community = sample.community;
      this.contactNo = sample.contactNo;
      this.ecNumber = sample.ecNumber;
      this.address = sample.address;
      this.lmpDate = sample.lmpDate;
      this.gpla = sample.gpla;
     
  
      this.modalService.open(
        unsentSamplesDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    unsentSamplesUpdateStatus(){
      this.dcunsentSamplesErrorMessage = '';
      this.fetchBarcodes();
  
      if(this.notifySamples === ""){
        this.updatestatusResponseMessage(this.constantService.SelectOneSample, 'e');
        return false;
      }
     
      this.dcunsentSamplesRequest = {
        userId: this.user.id,
        barcodeNo: this.notifySamples,
       
      }
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
      let adddamagedsample = this.dcunsentSamplesService.updateSelectedSamples(this.dcunsentSamplesRequest)
        .subscribe(response => {
          this.dcupdateunsentsamplesResponse = response;
          if (this.dcupdateunsentsamplesResponse !== null && this.dcupdateunsentsamplesResponse.status === "true") {
            this.updatestatusResponseMessage(this.dcupdateunsentsamplesResponse.message, 's');
          } else {
            this.updatestatusResponseMessage(this.dcupdateunsentsamplesResponse.message, 'e');
            this.dcunsentSamplesErrorMessage = response.message;
          }
  
        },
          (err: HttpErrorResponse) => {
            this.updatestatusResponseMessage(err.toString(), 'e');
            this.dcunsentSamplesErrorMessage = err.toString();
          });
  
    }
  
    updatestatusResponseMessage(result: string, type: string){
      var messageType = '';
      if(type === 'e'){
        Swal.fire({icon:'error', title: result, confirmButtonText: 'Close', allowOutsideClick: false})
      }
      else{
        Swal.fire({icon:'success', title: result, confirmButtonText: 'Close', allowOutsideClick: false})
        .then((result) => {
          if (result.value) {
            this.modalService.dismissAll();
          }
        });
      }
    }
  
    updateNotification(unsentSamples: dcSamplesList, notifiedStatus: string){
      if(notifiedStatus === '0'){
        unsentSamples.followUpStatus = "False";
      }
      else{
        unsentSamples.followUpStatus = "True";
      }
    }
  //   updateNotification(event, object, value){
  //     object.notifiedStatus = value;
  //     console.log(this.unsentSamples);
  // }
  fetchBarcodes(){
    this.notifySamples = '';
    var isFirst = true;
    this.unsentSamples.forEach(element => {
      console.log('notifiedStatus :' + element.followUpStatus);
      if(element.followUpStatus === "True"){
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
  
  }
