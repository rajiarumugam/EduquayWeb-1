import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, EventEmitter, Output, HostListener } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { user } from 'src/app/shared/auth-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/shared/utility/date.service';
import { TokenService } from 'src/app/shared/token.service';
import { FormBuilder } from '@angular/forms';
import { ConstantService } from 'src/app/shared/constant.service';
import { DataService } from 'src/app/shared/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { anmmtpReferral, AnmMtpReferralResponse, AnmUpdatePndtMtpReferralResponse } from 'src/app/shared/anm-module/notifications/pndt-mtp-referral/pndt-mtp-referral-response';
import { AnmPndtMtpReferralRequest } from 'src/app/shared/anm-module/notifications/pndt-mtp-referral/pndt-mtp-referral-request';
import { PndtMtpReferralService } from 'src/app/shared/anm-module/notifications/pndt-mtp-referral/pndt-mtp-referral.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-anm-mtp-referral',
  templateUrl: './anm-mtp-referral.component.html',
  styleUrls: ['./anm-mtp-referral.component.css']
})
export class AnmMtpReferralComponent implements AfterViewInit, OnDestroy, OnInit {
    //Child component
    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;
    
    loadDataTable: boolean = false;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    user: user;
  
    recordCount: number; //step 2
    anmmtpReferralErrorMessage: string;
    anmmtpReferralResponse: AnmMtpReferralResponse;
    mtpReferral: anmmtpReferral[]= [];
    anmmtpReferralRequest: AnmPndtMtpReferralRequest;
    anmupdatemtpReferralResponse: AnmUpdatePndtMtpReferralResponse;
  
    
    anmName: string;
    anmContactNo: string;
    anwSubjectId: string;
    anwSubjectName: string;
    rchId: string;
    anwBarcodes: string;
    anwContactNo: string;
    anwAge: string;
    ecNumber: string;
    anwGender: string;
    address: string;
    gestationalAge: string;
    lmpDate: string;
    gpla: string;
    anwDOB: string;
    anwDistrictName: string;
    anwCHCName: string;
    anwPHCName: string;
    anwSCName: string;
    anwRIPoint: string;
    anwReligion: string;
    anwCaste: string;
    anwCommunity: string;
    spouseSubjectId: string;
    spouseSubjectName: string;
    spouseBarcodes: string;
    spouseContactNo: string;
    spouseAge: string;
    spouseGender: string;
    spouseDOB: string;
    spouseDistrictName: string;
    spouseCHCName: string;
    spousePHCName: string;
    spouseSCName: string;
    spouseRIPoint: string;
    spouseReligion: string;
    spouseCaste: string;
    spouseCommunity: string;
    anwCBCTestResult: string;
    anwSSTestResult: string;
    anwHPLCTestResult: string;
    spouseCBCTestResult: string;
    spouseSSTestResult: string;
    spouseHPLCTestResult: string;
    pndtCounsellorName: string;
    pndtCounsellingRemarks: string;
    pndtCounsellingStatus: string;
    schedulePNDTDate: string;
    schedulePNDTTime: string;
    pndtDateTime: string;
    pndtObstetricianName: string;
    clinicalHistory: string;
    examination: string;
    pndtDiagnosisName: string;
    pndtResults: string;
    pndtProcedureOfTesting: string;
    pndtSideEffects: string;
    postPNDTCounsellingDate: string;
    mtpDate: string;
    mtpReferalId: number;
    followUpStatus: string
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
      private anmmtpReferralService: PndtMtpReferralService,
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
  
      this.dataservice.sendData(JSON.stringify({"module": "District Coordinator", "submodule":"Notification", "page": "Positive Subjects"}));
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
      console.log(this.anmmtpReferralService.mtpReferralApi);
      this.anmmtpReferral(this.user.id);
  
      
    }
  
    anmmtpReferral(userId){
      this.loaderService.display(true);
      this.recordCount = 0; //step 3
      this.mtpReferral = [];
      this.anmmtpReferralErrorMessage ='';
      let samplesList = this.anmmtpReferralService.getMtpReferralList(this.user.id)
      .subscribe(response => {
        this.anmmtpReferralResponse = response;
        this.loaderService.display(false);
        if(this.anmmtpReferralResponse !== null && this.anmmtpReferralResponse.status === "true"){
          if(this.anmmtpReferralResponse.samples.length <= 0){
            this.anmmtpReferralErrorMessage = response.message;
          }
          else{
            this.mtpReferral = this.anmmtpReferralResponse.samples;
            this.recordCount = this.mtpReferral.length; //step 4
          }
        }
        else{
          this.anmmtpReferralErrorMessage = response.message;
        }
        this.onLoadSubject.emit(this.recordCount);    //step 5
        this.rerender();
        this.loadDataTable = true;
      },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.anmmtpReferralErrorMessage = err.toString();
      });
    }
  
    openmtpReferral(mtpReferralDetail, sample: anmmtpReferral) {
  
      this.anwSubjectName= sample.anwSubjectName;
      this.anwSubjectId = sample.anwSubjectId;
      this.spouseSubjectName = sample.spouseSubjectName;
      this.spouseSubjectId = sample.spouseSubjectId;
      this.rchId = sample.rchId;
      this.anmName = sample.anmName;
      this.anmContactNo = sample.anmContactNo;
      this.anwBarcodes = sample.anwBarcodes;
      this.anwGender = sample.anwGender;
      this.gestationalAge = sample.gestationalAge;
      this.anwDistrictName = sample.anwDistrictName;
      this.anwCHCName = sample.anwCHCName;
      this.anwSCName = sample.anwSCName;
      this.anwRIPoint = sample.anwRIPoint;
      this.anwAge = sample.anwAge;
      this.anwDOB = sample.anwDOB;
      this.anwReligion = sample.anwReligion;
      this.anwCaste = sample.anwCaste;
      this.anwCommunity = sample.anwCommunity;
      this.anwContactNo = sample.anwContactNo;
      this.ecNumber = sample.ecNumber;
      this.address = sample.address;
      this.lmpDate = sample.lmpDate;
      this.gpla = sample.gpla;
      this.anwBarcodes = sample.anwBarcodes;
      this.anwGender = sample.anwGender;
      this.gestationalAge = sample.gestationalAge;
      this.spouseDistrictName = sample.spouseDistrictName;
      this.spouseCHCName = sample.spouseCHCName;
      this.spouseSCName = sample.spouseSCName;
      this.spouseRIPoint = sample.spouseRIPoint;
      this.spouseAge = sample.spouseAge;
      this.spouseDOB = sample.spouseDOB;
      this.spouseReligion = sample.spouseReligion;
      this.spouseCaste = sample.spouseCaste;
      this.spouseCommunity = sample.spouseCommunity;
      this.spouseContactNo = sample.spouseContactNo;
      this.anwCBCTestResult = sample.anwCBCTestResult;
      this.anwSSTestResult = sample.anwSSTestResult;
      this.anwHPLCTestResult = sample.anwHPLCTestResult;
      this.spouseCBCTestResult = sample.spouseCBCTestResult;
      this.spouseSSTestResult = sample.spouseSSTestResult;
      this.spouseHPLCTestResult = sample.spouseHPLCTestResult;
      this.pndtCounsellorName = sample.pndtCounsellorName;
      this.pndtCounsellingRemarks = sample.pndtCounsellingRemarks;
      this.pndtCounsellingStatus = sample.pndtCounsellingStatus;
      this.schedulePNDTDate = sample.schedulePNDTDate;
      this.schedulePNDTTime = sample.schedulePNDTTime;
      this.pndtDateTime = sample.pndtDateTime;
      this.pndtObstetricianName = sample.pndtObstetricianName;
      this.clinicalHistory = sample.clinicalHistory;
      this.examination = sample.examination;
      this.pndtDiagnosisName = sample.pndtDiagnosisName;
      this.pndtResults = sample.pndtResults;
      this.pndtProcedureOfTesting = sample.pndtProcedureOfTesting;
      this.pndtSideEffects = sample.pndtSideEffects;
      this.postPNDTCounsellingDate = sample.postPNDTCounsellingDate;
     
  
      this.modalService.open(
        mtpReferralDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    mtpReferralUpdateStatus(){
      this.anmmtpReferralErrorMessage = '';
      this.fetchBarcodes();
  
      if(this.notifySamples === ""){
        this.updatestatusResponseMessage(this.constantService.SelectOneSample, 'e');
        return false;
      }
     
      this.anmmtpReferralRequest = {
        userId: this.user.id,
        referalId: this.notifySamples,
       
      }
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
      let adddamagedsample = this.anmmtpReferralService.updateMtpReferral(this.anmmtpReferralRequest)
        .subscribe(response => {
          this.anmupdatemtpReferralResponse = response;
          if (this.anmupdatemtpReferralResponse !== null && this.anmmtpReferralResponse.status === "true") {
            this.updatestatusResponseMessage(this.anmupdatemtpReferralResponse.message, 's');
          } else {
            this.updatestatusResponseMessage(this.anmupdatemtpReferralResponse.message, 'e');
            this.anmmtpReferralErrorMessage = response.message;
          }
  
        },
          (err: HttpErrorResponse) => {
            this.updatestatusResponseMessage(err.toString(), 'e');
            this.anmmtpReferralErrorMessage = err.toString();
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
  
    updateNotification(mtpreferral: anmmtpReferral, notifiedStatus: string){
      if(notifiedStatus === '0'){
        mtpreferral.followUpStatus = "False";
      }
      else{
        mtpreferral.followUpStatus = "True";
      }
    }
  //   updateNotification(event, object, value){
  //     object.notifiedStatus = value;
  //     console.log(this.mtpReferral);
  // }
  fetchBarcodes(){
    this.notifySamples = '';
    var isFirst = true;
    this.mtpReferral.forEach(element => {
      console.log('notifiedStatus :' + element.followUpStatus);
      if(element.followUpStatus === "True"){
        if(isFirst){
          this.notifySamples += element.mtpReferalId;
          isFirst = false;
        }
        else{
          this.notifySamples += ',' + element.mtpReferalId;
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