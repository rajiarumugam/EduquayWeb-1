import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, EventEmitter, Output, HostListener } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { AsyncSubject, Subject } from 'rxjs';
import { user } from 'src/app/shared/auth-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/shared/utility/date.service';
import { TokenService } from 'src/app/shared/token.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConstantService } from 'src/app/shared/constant.service';
import { DataService } from 'src/app/shared/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { PostMtpFollowupService } from 'src/app/shared/anm-module/notifications/post-mtp-followup/post-mtp-followup.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { anmPostMTP, PostMtpFollowupResponse, UpdatePostMtpFollowupResponse } from 'src/app/shared/anm-module/notifications/post-mtp-followup/post-mtp-followup-response';
import { PndtMtpMasterService } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master.service';
import { dataModel, getfollowupstatus, PndtMtpMasterResponse } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master-response';
import { PostMtpFollowupRequest } from 'src/app/shared/anm-module/notifications/post-mtp-followup/post-mtp-followup-request';


@Component({
  selector: 'app-anm-post-mtp-followup',
  templateUrl: './anm-post-mtp-followup.component.html',
  styleUrls: ['./anm-post-mtp-followup.component.css']
})
export class AnmPostMtpFollowupComponent implements AfterViewInit, OnDestroy, OnInit {
  //Child component
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
  @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;

  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  user: user;

  recordCount: number; //step 2
  anmpostMTPErrorMessage: string;
  postmtpMasterResponse: PndtMtpMasterResponse;
  anmpostMTPResponse: PostMtpFollowupResponse;
  postMTP: anmPostMTP[] = [];
  firstfollowUpStatus: dataModel[] = [];
  selectedfirstfollowup: Array<any> = [];
  secondfollowUpStatus: dataModel[] = [];
  selectedsecondfollowup: Array<any> = [];
  thirdfollowUpStatus: dataModel[] = [];
  selectedthirdfollowup: Array<any> = [];
  anmpostMTPRequest: PostMtpFollowupRequest;
  anmupdatepostMTPResponse: UpdatePostMtpFollowupResponse;

  mtpId: number;
  uniqueSubjectId: string;
  subjectName: string;
  rchId: string;
  contactNo: string;
  mtpDateTime: string;
  obstetricianName: string;
  firstFollowUp: number;
  secondFollowUp: number;
  thirdFollowUp: number;
  firstFollowUpStatusDetail: string;
  secondFollowUpStatusDetail: string;
  thirdFollowUpStatusDetail: string;
  is_firstfollowup_edit: Array<any> = [];
  is_secondfollowup_edit: Array<any> = [];
  is_thirfollowup_edit: Array<any> = [];
  mtpdatetimeFormat: Date;
  daysCount: number;
  firstfollowUpStatusdetail: string;
  secondfollowUpStatusdetail: string;
  thirdfollowUpStatusdetail: string;
  getfirstFollowUp: number;
  getsecondFollowUp: number;
  getthirdFollowUp: number;
  postMtpData: anmPostMTP;
  getfrstfollowupstatus = [];
  getsecondfollowupstatus = [];
  getthirdfollowupstatus = [];
  id: number;
  selectedfirstvalue: string;
  selecteddefaultvalue: string;
  //testform: FormGroup;
  //angular: any;

  constructor(
    private anmpostMTPService: PostMtpFollowupService,
    private postmtpMasterService: PndtMtpMasterService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private dateService: DateService,
    private tokenService: TokenService,
    private _formBuilder: FormBuilder,
    private constantService: ConstantService,
    private dataservice: DataService,
    private loaderService: LoaderService,
   
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({ "module": "ANM", "submodule": "Notifications", "page": "Post MTP Follow-up" }));
    this.recordCount = 0;
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    // this.testform = this._formBuilder.group({
    //   mettype: ['']
    // });
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
    console.log(this.anmpostMTPService.postMTPApi);
    this.anmpostMTPList(this.user.id);  
    this.ddlfirstfollowUp();
    this.ddlsecondfollowUp();
    this.ddlthirdfollowUp(); 

  }

  toggleFirstDisable(){
    this.postMTP.forEach((element, index) => {
      if (element.firstFollowUp > 0) {
        this.is_firstfollowup_edit[index] = true;
      }
      else{
        this.is_firstfollowup_edit[index] = false;
      }
    });
  }

  toggleSecondDisable() {
    this.postMTP.forEach((element, index) => {
      if (element.firstFollowUp > 0 && element.secondFollowUp <= 0 && element.daysCount >= 50) {
        this.is_secondfollowup_edit[index] = false;
        console.log(this.is_secondfollowup_edit);
      }
      else if(element.secondFollowUp > 0 ){
        this.is_secondfollowup_edit[index] = true;
      }
      else{
        this.is_secondfollowup_edit[index] = true;
      }
      
    });
  }

  toggleThirdDisable() {
    this.postMTP.forEach((element, index) => {
      if (element.firstFollowUp > 0 && element.secondFollowUp > 0 && element.thirdFollowUp <= 0 && element.daysCount >= 60) {
        this.is_thirfollowup_edit[index]  = false;
        console.log(this.is_thirfollowup_edit);
      }
      else if(element.thirdFollowUp > 0 ){
        this.is_thirfollowup_edit[index] = true;
      }
      else{
        this.is_thirfollowup_edit[index] = true;
      }
    });
  }

  changeFirstFollowup(selectedfrstvalue, i){    
    console.log("change state",this.selectedfirstfollowup[i]);
    this.selectedfirstfollowup[i] = this.getfrstfollowupstatus.find(cntry => cntry.id == selectedfrstvalue).this.selectedfirstfollowup; 
  }

  changeSecondFollowup(selectedscndvalue, i){    
    console.log("change state",this.selectedsecondfollowup[i]);
    this.selectedsecondfollowup[i] = this.getsecondfollowupstatus.find(cntry => cntry.id == selectedscndvalue).this.selectedsecondfollowup; 
  }

  changeThirdFollowup(selectedthrdvalue, i){    
    console.log("change state",this.selectedthirdfollowup[i]);
    this.selectedthirdfollowup[i] = this.getthirdfollowupstatus.find(cntry => cntry.id == selectedthrdvalue).this.selectedthirdfollowup; 
  }

  ddlfirstfollowUp() {

    let district = this.postmtpMasterService.getfollowUpStatus().subscribe(response => {
      this.postmtpMasterResponse = response;
      if (this.postmtpMasterResponse !== null && this.postmtpMasterResponse.status === "true") {
       this.firstfollowUpStatus = this.postmtpMasterResponse.data;     
         this.firstfollowUpStatus.forEach(element => {  
            this.getfrstfollowupstatus.push(element);       
       });
       
      }
      else {
        this.anmpostMTPErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.anmpostMTPErrorMessage = err.toString();

      });
  }

  ddlsecondfollowUp() {
    let district = this.postmtpMasterService.getfollowUpStatus().subscribe(response => {
      this.postmtpMasterResponse = response;
      if (this.postmtpMasterResponse !== null && this.postmtpMasterResponse.status === "true") {
        this.secondfollowUpStatus = this.postmtpMasterResponse.data;
        this.secondfollowUpStatus.forEach(element => {  
          this.getsecondfollowupstatus.push(element);      
        });
      }
      else {
        this.anmpostMTPErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.anmpostMTPErrorMessage = err.toString();

      });
  }

  ddlthirdfollowUp() {
    let district = this.postmtpMasterService.getfollowUpStatus().subscribe(response => {
      this.postmtpMasterResponse = response;
      if (this.postmtpMasterResponse !== null && this.postmtpMasterResponse.status === "true") {
        this.thirdfollowUpStatus = this.postmtpMasterResponse.data;
        this.thirdfollowUpStatus.forEach(element => {  
          this.getthirdfollowupstatus.push(element);      
        });
      }
      else {
        this.anmpostMTPErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.anmpostMTPErrorMessage = err.toString();

      });
  }

  anmpostMTPList(userId) {

    this.loaderService.display(true);
    this.recordCount = 0; //step 3
    //this.postMtpData = new anmPostMTP();
    this.postMTP = [];
    this.anmpostMTPErrorMessage = '';
    let samplesList = this.anmpostMTPService.getpostMTPList(this.user.id)
      .subscribe(response => {
        this.anmpostMTPResponse = response;
        this.loaderService.display(false);
        if (this.anmpostMTPResponse !== null && this.anmpostMTPResponse.status === "true") {
          if (this.anmpostMTPResponse.subjects.length <= 0) {
            this.anmpostMTPErrorMessage = response.message;
          }
          else {
            this.postMTP = this.anmpostMTPResponse.subjects;
            this.postMTP.forEach((element, index) => {
               this.getfirstFollowUp = element.firstFollowUp;
              this.getsecondFollowUp = element.secondFollowUp;
              this.getthirdFollowUp = element.thirdFollowUp;
              var date1: any = element.mtpdatetimeFormat = this.dateService.convertToDateTimeFormat(element.mtpDateTime);
              var date2: any = new Date(new Date().getTime());
              element.daysCount = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
              console.log(element.daysCount);
              // First follow-up status //
                if(this.getfirstFollowUp > 0){
                  this.selectedfirstfollowup[index] =  this.getfirstFollowUp;
                }
                else{
                  this.selectedfirstfollowup[index] = '';
                }
              // Second follow-up status // 
                if(this.getsecondFollowUp > 0){
                  this.selectedsecondfollowup[index] =  this.getsecondFollowUp;
                }
                else{
                  this.selectedsecondfollowup[index] = '';
                } 
              // Third follow-up status // 
                if(this.getthirdFollowUp > 0){
                  this.selectedthirdfollowup[index] =  this.getthirdFollowUp;
                }
                else{
                  this.selectedthirdfollowup[index] = '';
                }            
                        
            });
            //this.firstfollowUpStatus = this.postMtpData;
            this.toggleFirstDisable();
            this.toggleSecondDisable();
            this.toggleThirdDisable();
            this.recordCount = this.postMTP.length; //step 4
          }
        }
        else {
          this.anmpostMTPErrorMessage = response.message;
        }
        this.onLoadSubject.emit(this.recordCount);    //step 5
        this.rerender();
        this.loadDataTable = true;
      },
        (err: HttpErrorResponse) => {
          if (this.loadDataTable) this.rerender();
          this.anmpostMTPErrorMessage = err.toString();
        });
  }

  postmtpUpdateStatus(sample: anmPostMTP, i) {

    this.anmpostMTPErrorMessage = '';
    if (sample.firstFollowUp > 0 && sample.secondFollowUp <= 0 && sample.daysCount >= 50) {

      this.mtpId = sample.mtpId;
      if (this.selectedsecondfollowup[i] === "") {
        this.updatestatusResponseMessage("please choose atleast one follow up status", 'e');
        return false;
      }
      if (this.selectedsecondfollowup[i] === '2') {
        this.secondfollowUpStatusdetail = this.secondfollowUpStatusdetail;
      }
      else {
        this.secondfollowUpStatusdetail = '';
      }

      this.anmpostMTPRequest = {
        userId: this.user.id,
        mtpId: this.mtpId,
        followUpNo: 2,
        followUpStatusId: +(this.selectedsecondfollowup[i]),
        followUpStatusDetail: this.secondfollowUpStatusdetail

      }
      //Remove below 2 lines after successfully tested
      // this.updatestatusResponseMessage(' testing Successfully registered', 's');
      // return false;
      let adddamagedsample = this.anmpostMTPService.updatepostMtpReferral(this.anmpostMTPRequest)
        .subscribe(response => {
          this.anmupdatepostMTPResponse = response;
          if (this.anmupdatepostMTPResponse !== null && this.anmupdatepostMTPResponse.status === "true") {
            this.updatestatusResponseMessage(this.anmupdatepostMTPResponse.message, 's');
          } else {
            this.updatestatusResponseMessage(this.anmupdatepostMTPResponse.message, 'e');
            this.anmpostMTPErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.updatestatusResponseMessage(err.toString(), 'e');
            this.anmpostMTPErrorMessage = err.toString();
          });
         
    }

    else if (sample.secondFollowUp > 0 && sample.firstFollowUp > 0 && sample.daysCount >= 60) {
      this.mtpId = sample.mtpId;
      if (this.selectedthirdfollowup[i] === "") {
        this.updatestatusResponseMessage("please choose atleast one follow up status", 'e');
        return false;
      }

      if (this.selectedthirdfollowup[i] === '2') {
        this.thirdfollowUpStatusdetail = this.thirdfollowUpStatusdetail;
      }
      else {
        this.thirdfollowUpStatusdetail = '';
      }
      this.anmpostMTPRequest = {
        userId: this.user.id,
        mtpId: this.mtpId,
        followUpNo: 3,
        followUpStatusId: +(this.selectedthirdfollowup[i]),
        followUpStatusDetail: this.thirdfollowUpStatusdetail

      }
      //Remove below 2 lines after successfully tested
      // this.updatestatusResponseMessage(' testing Successfully registered', 's');
      // return false;
      let adddamagedsample = this.anmpostMTPService.updatepostMtpReferral(this.anmpostMTPRequest)
        .subscribe(response => {
          this.anmupdatepostMTPResponse = response;
          if (this.anmupdatepostMTPResponse !== null && this.anmupdatepostMTPResponse.status === "true") {
            this.updatestatusResponseMessage(this.anmupdatepostMTPResponse.message, 's');
          } else {
            this.updatestatusResponseMessage(this.anmupdatepostMTPResponse.message, 'e');
            this.anmpostMTPErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.updatestatusResponseMessage(err.toString(), 'e');
            this.anmpostMTPErrorMessage = err.toString();
          });
    }
    else if(sample.firstFollowUp <= 0){
      this.mtpId = sample.mtpId;
      if (this.selectedfirstfollowup[i] === '') {
        this.updatestatusResponseMessage("please choose atleast one follow up status", 'e');
        return false;
      }

      if (this.selectedfirstfollowup[i] === '2') {
        this.firstfollowUpStatusdetail = this.firstfollowUpStatusdetail;
      }
      else {
        this.firstfollowUpStatusdetail = '';
      }

      this.anmpostMTPRequest = {
        userId: this.user.id,
        mtpId: this.mtpId,
        followUpNo: 1,
        followUpStatusId: +(this.selectedfirstfollowup[i]),
        followUpStatusDetail: this.firstfollowUpStatusdetail

      }
      //Remove below 2 lines after successfully tested
      // this.updatestatusResponseMessage(' testing Successfully registered', 's');
      // return false;
      let adddamagedsample = this.anmpostMTPService.updatepostMtpReferral(this.anmpostMTPRequest)
        .subscribe(response => {
          this.anmupdatepostMTPResponse = response;
          if (this.anmupdatepostMTPResponse !== null && this.anmupdatepostMTPResponse.status === "true") {
            this.updatestatusResponseMessage(this.anmupdatepostMTPResponse.message, 's');
          } else {
            this.updatestatusResponseMessage(this.anmupdatepostMTPResponse.message, 'e');
            this.anmpostMTPErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.updatestatusResponseMessage(err.toString(), 'e');
            this.anmpostMTPErrorMessage = err.toString();
          });
    }
    else if(sample.firstFollowUp > 0 && sample.secondFollowUp <= 0 && sample.thirdFollowUp <= 0){
      //this.updatestatusResponseMessage('testing Successfully registered', 'e');
      Swal.fire({ icon: 'warning', title: 'Already First follow Up Status completed', confirmButtonText: 'Close', allowOutsideClick: false })
    }
    else if(sample.firstFollowUp > 0 && sample.secondFollowUp > 0 && sample.thirdFollowUp <= 0){
      //this.updatestatusResponseMessage('testing Successfully registered', 'e');
      Swal.fire({ icon: 'warning', title: 'Already First & Second follow Up Status completed', confirmButtonText: 'Close', allowOutsideClick: false })
    }
    else if(sample.firstFollowUp > 0 && sample.secondFollowUp > 0 && sample.thirdFollowUp > 0){
      //this.updatestatusResponseMessage('testing Successfully registered', 'e');
      Swal.fire({ icon: 'warning', title: 'Already all follow Up Status completed', confirmButtonText: 'Close', allowOutsideClick: false })
    }
    
    // else {
    //   this.updatestatusResponseMessage('testing Successfully registered', 'e');
    // }

  }

  updatestatusResponseMessage(result: string, type: string) {
    var messageType = '';
    if (type === 'e') {
      Swal.fire({ icon: 'error', title: result, confirmButtonText: 'Close', allowOutsideClick: false })
    }
    else {
      Swal.fire({ icon: 'success', title: result, confirmButtonText: 'Close', allowOutsideClick: false })
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
