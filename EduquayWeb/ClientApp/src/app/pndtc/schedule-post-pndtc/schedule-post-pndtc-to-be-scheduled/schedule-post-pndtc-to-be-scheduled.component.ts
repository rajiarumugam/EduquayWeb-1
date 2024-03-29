import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { user } from 'src/app/shared/auth-response';
import { PndtMtpMasterResponse, dataModel } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master-response';
import { SchedulePostPndtcRequest, AddPostPndtcScheduleRequest } from 'src/app/shared/pndtc/schedule-post-pndtc/schedule-post-pndtc-request';
import { AddPostPndtcScheduleResponse, SchedulingList, SchedulePostPndtcResponse } from 'src/app/shared/pndtc/schedule-post-pndtc/schedule-post-pndtc-response';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { DataService } from 'src/app/shared/data.service';
import { PndtMtpMasterService } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master.service';
import { SchedulePostPndtcService } from 'src/app/shared/pndtc/schedule-post-pndtc/schedule-post-pndtc.service';
import { TokenService } from 'src/app/shared/token.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/shared/utility/date.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-schedule-post-pndtc-to-be-scheduled',
  templateUrl: './schedule-post-pndtc-to-be-scheduled.component.html',
  styleUrls: ['./schedule-post-pndtc-to-be-scheduled.component.css']
})
export class SchedulePostPndtcToBeScheduledComponent implements AfterViewInit, OnDestroy, OnInit{

    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
    loadDataTable: boolean = false;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    @ViewChild('schedulePicker', { static: false }) schedulePicker;
  
    postpndtscheduleErrorMessage: string;
    user: user;
    pndtmtpMasterResponse: PndtMtpMasterResponse;
    pndtmtpSchedulingRequest: SchedulePostPndtcRequest;
    pndtmtpSchedulingResponse: SchedulePostPndtcResponse;
    addScheduleRequest: AddPostPndtcScheduleRequest;
    addScheduleResponse: AddPostPndtcScheduleResponse;
    schedulinglists: SchedulingList[] = [];
    scheduledlists: SchedulingList[] = [];
    districts: dataModel[] = [];
    selectedDistrict: string = '';
    chclists: dataModel[] = [];
    selectedchc: string = '';
    phclists: dataModel[] = [];
    selectedphc: string = '';
    anmlists: dataModel[] = [];
    selectedanm: string = '';
    schedulingdata: any;
    counsellingDate: string;
    counsellingTime: string;
    anwSubjectId: string;
    subjectName: string;
    spouseSubjectId: string;
    pndtDateTime: string;
    spouseName: string;
    rchId: string;
    ga: string;
    contactNo: string;
    obstetricScore: string;
    recordCount: number;
    samplega: string;
    recordCount1: number;
  
  
    /*Date Range configuration starts*/
    dateform: FormGroup;
    popupform: FormGroup;
    DAY = 86400000;
    dyCollectionDate: Date = new Date(Date.now());
    fixSchedule: string;
    scheduleDate: string;
    scheduleTime: string;
    counsellorName: string;
    postScheduledArray = [];
  
    scheduleDateOptions: FlatpickrOptions = {
      mode: 'single',
      dateFormat: 'd/m/Y H:i',
      //defaultDate: new Date(Date.now()),
      //minDate: this.dyCollectionDate,
      minDate: new Date(Date.now()),
      enableTime: true,
    };
  
    constructor(
  
      private dataservice: DataService,
      private pndtmtpMasterService: PndtMtpMasterService,
      private pndtmtpScheduleService: SchedulePostPndtcService,
      private tokenService: TokenService,
      private loaderService: LoaderService,
      private modalService: NgbModal,
      private _formBuilder: FormBuilder,
      private dateservice: DateService,
      private router: Router,
      private route: ActivatedRoute
  
    ) { }
  
    ngOnInit() {
  
      this.loaderService.display(true);
      this.user = JSON.parse(this.tokenService.getUser('lu'));
      this.counsellorName = this.user.firstName;
      this.recordCount = 0;
      this.InitializeDateRange();
  
      // this.dataservice.sendData(JSON.stringify({ "module": "PNDTC Counsellor", "submodule": "Schedule – Post PNDT counselling", "page": "To be Scheduled" }));
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
      this.ddlDistrict(this.user.id);
      // this.scheduleDate = moment().format("DD/MM/YYYY");
      // this.scheduleTime = moment().format("HH:mm");
      // this.scheduleDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
      // this.scheduleDateOptions.minDate = moment().format("DD/MM/YYYY HH:mm");
  
      var _postSchedulingArr = this.route.snapshot.data.postScheduling;
        console.log(_postSchedulingArr);
        if(_postSchedulingArr !== undefined && _postSchedulingArr.status.toString() === "true"){
          //var _tempData = centralReceiptsArr.hplcDetail;
        
          this.schedulinglists = _postSchedulingArr.data;
        }
        this.getPostScheduledlists();
    }

    getPostScheduledlists(){
      this.loaderService.display(true);
      var _subjectObj = {
        "districtId": 0,
        "chcId": 0,
        "phcId": 0,
        "anmId": 0,
        "userId": this.user.id
      }
      this.pndtmtpScheduleService.getscheduledLists(_subjectObj).subscribe(response => {
        console.log(response);
        this.loaderService.display(false);
        this.scheduledlists = response.data;
        this.dataservice.sendData(JSON.stringify({"module": "Schedule & Counsel (Pre-PNDT)", "submodule": "Schedule – Post PNDT counselling"}));
      },
      (err: HttpErrorResponse) =>{
       
      });
    }
  
    ddlDistrict(userId) {
      let district = this.pndtmtpMasterService.getDistrict(userId).subscribe(response => {
        this.pndtmtpMasterResponse = response;
        if (this.pndtmtpMasterResponse !== null && this.pndtmtpMasterResponse.status === "true") {
          this.districts = this.pndtmtpMasterResponse.data;
          this.selectedDistrict = "";
        }
        else {
          this.postpndtscheduleErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.postpndtscheduleErrorMessage = err.toString();
  
        });
    }
    onChangeDistrict(event) {
  
      if (this.selectedDistrict === '') {
        this.selectedchc = '';
      }
      else {
        this.ddlChc(this.selectedDistrict);
      }
    }

    onChangechc(event){

      if (this.selectedchc === '') {
        this.selectedphc = '';
      }
      else {
        this.ddlPhc(this.selectedchc);
      }
      
    }

    onChangephc(event){

      if (this.selectedphc === '') {
        this.selectedanm = '';  
      }
      else {
        this.ddlAnm(this.selectedphc);
      }

    }
  
    ddlChc(id) {
  
      this.chclists = [];
      this.selectedchc = '';
      this.pndtmtpMasterService.getChc(id)
        .subscribe(response => {
          this.pndtmtpMasterResponse = response;
          if (this.pndtmtpMasterResponse !== null && this.pndtmtpMasterResponse.status === "true") {
            this.chclists = this.pndtmtpMasterResponse.data;
            this.selectedchc = '';
            // if (this.chclists.length > 0) {
            //   this.selectedchc = this.chclists[0].id.toString();
            // }
          }
          else {
            this.postpndtscheduleErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.postpndtscheduleErrorMessage = err.toString();
  
          });
    }
  
    ddlPhc(id) {
  
      this.phclists = [];
      this.selectedphc = '';
      this.pndtmtpMasterService.getPhc(id)
        .subscribe(response => {
          this.pndtmtpMasterResponse = response;
          if (this.pndtmtpMasterResponse !== null && this.pndtmtpMasterResponse.status === "true") {
            this.phclists = this.pndtmtpMasterResponse.data;
            this.selectedphc = '';
            // if (this.phclists.length > 0) {
            //   this.selectedphc = this.phclists[0].id.toString();
            // }
          }
          else {
            this.postpndtscheduleErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.postpndtscheduleErrorMessage = err.toString();
  
          });
    }
  
    ddlAnm(id) {
  
      this.anmlists = [];
      this.selectedanm = '';
      this.pndtmtpMasterService.getAnm(id)
        .subscribe(response => {
          this.pndtmtpMasterResponse = response;
          if (this.pndtmtpMasterResponse !== null && this.pndtmtpMasterResponse.status === "true") {
            this.anmlists = this.pndtmtpMasterResponse.data;
            this.selectedanm = '';
            // if (this.anmlists.length > 0) {
            //   this.selectedanm = this.anmlists[0].id.toString();
            // }
          }
          else {
            this.postpndtscheduleErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.postpndtscheduleErrorMessage = err.toString();
  
          });
    }
  
    getschedulinglists() {
  
      this.recordCount = 0;
      this.loaderService.display(true);
      this.schedulinglists = [];
      this.postpndtscheduleErrorMessage = '';
  
      this.pndtmtpSchedulingRequest = {
        userId: this.user.id, districtId: +(this.selectedDistrict),
        chcId: +(this.selectedchc),
        phcId: +(this.selectedphc),
        anmId: +(this.selectedanm)
      };
  
      let picknpack = this.pndtmtpScheduleService.getschedulingLists(this.pndtmtpSchedulingRequest)
        .subscribe(response => {
          this.pndtmtpSchedulingResponse = response;
          this.loaderService.display(false);
          if (this.pndtmtpSchedulingResponse !== null && this.pndtmtpSchedulingResponse.status === "true") {
            if (this.pndtmtpSchedulingResponse.data.length <= 0) {
              this.postpndtscheduleErrorMessage = response.message;
              this.getPostScheduledlists();
            }
            else {
              this.schedulinglists = this.pndtmtpSchedulingResponse.data;            
              this.getPostScheduledlists();
  
            }
          }
          else {
            this.postpndtscheduleErrorMessage = response.message;
          }
         // this.onLoadSubject.emit(this.recordCount);    //step 5
          this.rerender();
          this.loadDataTable = true;
        },
          (err: HttpErrorResponse) => {
            if (this.loadDataTable) this.rerender();
            this.postpndtscheduleErrorMessage = err.toString();
          });
  
    }

    openScheduleData(scheduleAppointmentFormDetail, schedulinglists: SchedulingList) {

      this.postpndtscheduleErrorMessage = '';
      this.subjectName = schedulinglists.subjectName;
      this.anwSubjectId = schedulinglists.anwSubjectId;
      this.contactNo = schedulinglists.contactNo;
      this.samplega = schedulinglists.ga;
      this.spouseSubjectId = schedulinglists.spouseSubjectId;
  
      // this.scheduleDate = moment().format("DD/MM/YYYY");
      // this.scheduleTime = moment().format("HH:mm");
      // this.scheduleDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
      // this.scheduleDateOptions.minDate = moment().format("DD/MM/YYYY HH:mm");
      const regDate = this.dateservice.convertToDateTimeFormat(schedulinglists.pndtDateTime);
      this.scheduleDateOptions.minDate = regDate;
  
      this.modalService.open(
        scheduleAppointmentFormDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop: 'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    onSubmit(scheduleAppointmentFormDetail: NgForm) {

      console.log(scheduleAppointmentFormDetail.value);
      if((this.scheduleDate === '' || this.scheduleDate == undefined) && (this.scheduleTime === '' || this.scheduleTime == undefined)){
        this.showResponseMessage('Please choose Date & Time', 'e');
        return false;
      }
      this.addScheduleRequest = {
        anwsubjectId: this.anwSubjectId,
        spouseSubjectId: this.spouseSubjectId,
        counsellorId: this.user.id,
        counsellingDateTime: this.scheduleDate + ' ' + this.scheduleTime,
        userId: this.user.id,
      };
  
      //Remove below 2 lines after successfully tested
      //  this.showResponseMessage('Successfully registered', 's');
      //  return false;
      let addScheduleData = this.pndtmtpScheduleService.Addschedule(this.addScheduleRequest)
        .subscribe(response => {
          this.addScheduleResponse = response;
          if (this.addScheduleResponse !== null && this.addScheduleResponse.status === "true") {
            this.showResponseMessage(this.addScheduleResponse.message, 's')
            this.getschedulinglists();
            //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
          } else {
            this.showResponseMessage(this.addScheduleResponse.message, 'e');
            this.postpndtscheduleErrorMessage = response.message;
          }
  
        },
          (err: HttpErrorResponse) => {
            this.showResponseMessage(err.toString(), 'e');
            this.postpndtscheduleErrorMessage = err.toString();
          });
  
    }
  
    showResponseMessage(message: string, type: string) {
      var messageType = '';
      var title = `Post PNDT Counselling Scheduled Successfully on ${this.scheduleDate} at ${this.scheduleTime}`;
      if (type === 'e') {
        Swal.fire({ icon: 'error', title: message, confirmButtonText: 'Ok', allowOutsideClick: false })
      }
      else {
        Swal.fire({ icon: 'success', title: title, confirmButtonText: 'Ok', allowOutsideClick: false })
        .then((result) => {
          if (result.value) {
            this.modalService.dismissAll();
            //this.router.navigateByUrl(`/app/schedule-post-pndtc/scheduled`);
            }
        }); 
      }
    }
  
    InitializeDateRange() {
  
      this.popupform = this._formBuilder.group({
        scheduleScheduleDate: [new Date(moment().format("DD/MM/YYYY HH:mm"))],
      });
  
      //Change of sample collection date
      this.popupform.controls.scheduleScheduleDate.valueChanges.subscribe(changes => {
        console.log('end: ', changes);
        if (!changes[0]) return;
        const selectedDate2 = changes[0].getTime();
        this.scheduleDate = moment(new Date(selectedDate2)).format("DD/MM/YYYY");
        this.scheduleTime = moment(new Date(selectedDate2)).format("HH:mm");
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
