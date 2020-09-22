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
import { PostMtpFollowupService } from 'src/app/shared/anm-module/notifications/post-mtp-followup/post-mtp-followup.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { anmPostMTP, PostMtpFollowupResponse, UpdatePostMtpFollowupResponse } from 'src/app/shared/anm-module/notifications/post-mtp-followup/post-mtp-followup-response';
import { PndtMtpMasterService } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master.service';
import { dataModel, PndtMtpMasterResponse } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master-response';
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
  selectedfirstfollowup: string = "";
  secondfollowUpStatus: dataModel[] = [];
  selectedsecondfollowup: string = "";
  thirdfollowUpStatus: dataModel[] = [];
  selectedthirdfollowup: string = "";
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
  is_secondfollowup_edit: boolean = true;
  is_thirfollowup_edit: boolean = true;
  mtpdatetimeFormat: Date;
  daysCount: number;
  firstfollowUpStatusdetail: string;
  secondfollowUpStatusdetail: string;
  thirdfollowUpStatusdetail: string;
  getfirstFollowUp: number;
  getsecondFollowUp: number;
  getthirdFollowUp: number;
  postMtpData: anmPostMTP;

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
    private loaderService: LoaderService
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({ "module": "ANM", "submodule": "Notifications", "page": "Post MTP Follow-up" }));
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
    console.log(this.anmpostMTPService.postMTPApi);
    this.anmpostMTP(this.user.id);   

  }

  toggleSecondDisable() {
    this.postMTP.forEach(element => {
      if (element.firstFollowUp > 0 && element.daysCount >= 50) {
        this.is_secondfollowup_edit = false;
        console.log(this.is_secondfollowup_edit);
      }
    });
  }

  toggleThirdDisable() {
    this.postMTP.forEach(element => {
      if (element.secondFollowUp > 0 && element.daysCount >= 60) {
        this.is_thirfollowup_edit = false;
        console.log(this.is_thirfollowup_edit);
      }
    });
  }

  

  ddlfirstfollowUp() {

    let district = this.postmtpMasterService.getfollowUpStatus().subscribe(response => {
      this.postmtpMasterResponse = response;
      if (this.postmtpMasterResponse !== null && this.postmtpMasterResponse.status === "true") {
        this.firstfollowUpStatus = this.postmtpMasterResponse.data;
        this.selectedfirstfollowup = "";
      }
      else {
        this.anmpostMTPErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.anmpostMTPErrorMessage = err.toString();

      });
  }

  // choosefirstfollowUp(firstfollowUpStatus: dataModel, selectedfirstfollowup: string){
  //   if(selectedfirstfollowup === '1'){
  //     firstfollowUpStatus.id = 1;
  //   }
  //   else if(selectedfirstfollowup === '2'){
  //     firstfollowUpStatus.id = 2;
  //   }
  //   else if(selectedfirstfollowup === '3'){
  //     firstfollowUpStatus.id = 3;
  //   }
  //   console.log(this.firstfollowUpStatus);
  // }

  ddlsecondfollowUp() {
    let district = this.postmtpMasterService.getfollowUpStatus().subscribe(response => {
      this.postmtpMasterResponse = response;
      if (this.postmtpMasterResponse !== null && this.postmtpMasterResponse.status === "true") {
        this.secondfollowUpStatus = this.postmtpMasterResponse.data;
        this.selectedsecondfollowup = "";
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
        this.selectedthirdfollowup = "";
      }
      else {
        this.anmpostMTPErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.anmpostMTPErrorMessage = err.toString();

      });
  }

  anmpostMTP(userId) {

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
            this.postMTP.forEach(element => {
              // this.getfirstFollowUp = element.firstFollowUp;
              // this.getsecondFollowUp = element.secondFollowUp;
              // this.getthirdFollowUp = element.thirdFollowUp;
              var date1: any = element.mtpdatetimeFormat = this.dateService.convertToDateTimeFormat(element.mtpDateTime);
              var date2: any = new Date(new Date().getTime());
              element.daysCount = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
              console.log(element.daysCount);
              this.ddlfirstfollowUp();
              this.ddlsecondfollowUp();
              this.ddlthirdfollowUp();
            });
            //this.firstfollowUpStatus = this.postMtpData;
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

  postmtpUpdateStatus(sample: anmPostMTP) {

    this.anmpostMTPErrorMessage = '';
    if (sample.firstFollowUp > 0 && sample.daysCount > 50) {

      this.mtpId = sample.mtpId;
      if (this.selectedsecondfollowup === "0" || this.selectedsecondfollowup === '') {
        this.updatestatusResponseMessage("please choose atleast one follow up status", 'e');
        return false;
      }
      if (this.selectedsecondfollowup === '2') {
        this.secondfollowUpStatusdetail = this.secondfollowUpStatusdetail;
      }
      else {
        this.secondfollowUpStatusdetail = '';
      }

      this.anmpostMTPRequest = {
        userId: this.user.id,
        mtpId: this.mtpId,
        followUpNo: 1,
        followUpStatusId: +(this.selectedfirstfollowup),
        followUpStatusDetail: this.secondfollowUpStatusdetail

      }
      //Remove below 2 lines after successfully tested
      this.updatestatusResponseMessage(' testing Successfully registered', 's');
      return false;
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

    else if (sample.secondFollowUp > 0 && sample.daysCount > 60) {
      this.mtpId = sample.mtpId;
      if (this.selectedthirdfollowup === "0" || this.selectedthirdfollowup === '') {
        this.updatestatusResponseMessage("please choose atleast one follow up status", 'e');
        return false;
      }

      if (this.selectedthirdfollowup === '2') {
        this.thirdfollowUpStatusdetail = this.thirdfollowUpStatusdetail;
      }
      else {
        this.thirdfollowUpStatusdetail = '';
      }
      this.anmpostMTPRequest = {
        userId: this.user.id,
        mtpId: this.mtpId,
        followUpNo: 1,
        followUpStatusId: +(this.selectedfirstfollowup),
        followUpStatusDetail: this.thirdfollowUpStatusdetail

      }
      //Remove below 2 lines after successfully tested
      this.updatestatusResponseMessage(' testing Successfully registered', 's');
      return false;
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
    else {

      this.mtpId = sample.mtpId;
      if (this.selectedfirstfollowup === "0" || this.selectedfirstfollowup === '') {
        this.updatestatusResponseMessage("please choose atleast one follow up status", 'e');
        return false;
      }

      if (this.selectedfirstfollowup === '2') {
        this.firstfollowUpStatusdetail = this.firstfollowUpStatusdetail;
      }
      else {
        this.firstfollowUpStatusdetail = '';
      }

      this.anmpostMTPRequest = {
        userId: this.user.id,
        mtpId: this.mtpId,
        followUpNo: 1,
        followUpStatusId: +(this.selectedfirstfollowup),
        followUpStatusDetail: this.firstfollowUpStatusdetail

      }
      //Remove below 2 lines after successfully tested
      this.updatestatusResponseMessage(' testing Successfully registered', 's');
      return false;
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
