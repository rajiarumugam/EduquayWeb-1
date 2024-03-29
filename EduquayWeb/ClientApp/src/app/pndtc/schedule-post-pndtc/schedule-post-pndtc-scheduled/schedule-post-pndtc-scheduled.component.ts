import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { user } from 'src/app/shared/auth-response';
import { PndtMtpMasterResponse, dataModel } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master-response';
import { SchedulePostPndtcRequest, AddPostPndtcScheduleRequest } from 'src/app/shared/pndtc/schedule-post-pndtc/schedule-post-pndtc-request';
import { SchedulePostPndtcResponse, AddPostPndtcScheduleResponse, SchedulingList, ScheduledPostPndtcResponse } from 'src/app/shared/pndtc/schedule-post-pndtc/schedule-post-pndtc-response';
import { ScheduledList } from 'src/app/shared/pndtc/schedule-pre-pndtc/schedule-pre-pndtc-response';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { DataService } from 'src/app/shared/data.service';
import { PndtMtpMasterService } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master.service';
import { TokenService } from 'src/app/shared/token.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SchedulePostPndtcService } from 'src/app/shared/pndtc/schedule-post-pndtc/schedule-post-pndtc.service';
import { DateService } from 'src/app/shared/utility/date.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedule-post-pndtc-scheduled',
  templateUrl: './schedule-post-pndtc-scheduled.component.html',
  styleUrls: ['./schedule-post-pndtc-scheduled.component.css']
})
export class SchedulePostPndtcScheduledComponent implements  AfterViewInit, OnDestroy, OnInit {

    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
    loadDataTable: boolean = false;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    @ViewChild('editDatePicker', { static: false }) editDatePicker;
  
    postpndtscheduledErrorMessage: string;
    user: user;
    pndtmtpMasterResponse: PndtMtpMasterResponse;
    pndtmtpScheduledRequest: SchedulePostPndtcRequest;
    pndtmtpScheduledResponse: SchedulePostPndtcResponse;
    ScheduledPostPndtcResponse: ScheduledPostPndtcResponse;
    addScheduledRequest: AddPostPndtcScheduleRequest;
    addScheduledResponse: AddPostPndtcScheduleResponse;
    scheduledlists: ScheduledList[] = [];
    schedulinglists: SchedulingList[] = [];
    districts: dataModel[] = [];
    selectedDistrict: string = '';
    chclists: dataModel[] = [];
    selectedchc: string = '';
    phclists: dataModel[] = [];
    selectedphc: string = '';
    anmlists: dataModel[] = [];
    selectedanm: string = '';
    counsellornamelist: dataModel[] = [];
    selectedname: string = '';
    editscheduleDateTime: string;
    selectedpostpndtDate: string
  
    anwSubjectId: string;
    subjectName: string;
    spouseSubjectId: string;
    spouseName: string;
    rchId: string;
    contactNo: string;
    ga: string;
    obstetricScore: string;
    counsellorId: number;
    counsellorName: string;
    counsellingDateTime: string;
    schedulingId: number;
    samplega: string;
    recordCount: number;
    recordCount1: number;
    postSchedulingdArray=[];
  
    /*Date Range configuration starts*/
    dateform: FormGroup;
    popupform: FormGroup;
    DAY = 86400000;
    dyCollectionDate: Date = new Date(Date.now());
    editScheduleDate: string;
    editscheduleDate: string;
    editscheduleTime: string;
  
    editDateOptions: FlatpickrOptions = {
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
      private route: ActivatedRoute
    ) { }
  
    ngOnInit() {
  
      this.user = JSON.parse(this.tokenService.getUser('lu'));
      this.recordCount = 0;
      this.loaderService.display(false);
      this.InitializeDateRange();
      //this.dataservice.sendData(JSON.stringify({ "module": "PNDTC Counsellor", "submodule": "Schedule – Post PNDT counselling", "page": "Scheduled" }));
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
      var _postScheduedArr = this.route.snapshot.data.postScheduled;
      console.log(_postScheduedArr);
      if(_postScheduedArr !== undefined && _postScheduedArr.status.toString() === "true"){
        //var _tempData = centralReceiptsArr.hplcDetail;
      
        this.scheduledlists = _postScheduedArr.data;
        this.scheduledlists.forEach(element => {
          this.selectedpostpndtDate = element.counsellingDateTime;
                  
          });
      }
      this.getPostSchedulinglists();
  }

  getPostSchedulinglists(){
    this.loaderService.display(true);
    var _subjectObj = {
      "districtId": 0,
      "chcId": 0,
      "phcId": 0,
      "anmId": 0,
      "userId": this.user.id
    }
    this.pndtmtpScheduleService.getschedulingLists(_subjectObj) .subscribe(response => {
      console.log(response);
      this.loaderService.display(false);
      this.schedulinglists = response.data;
      this.dataservice.sendData(JSON.stringify({"screen": "PostScheduling","schedulingCount":this.schedulinglists.length,"scheduledCount":this.scheduledlists.length, "module": "PNDTC Counsellor", "submodule": "Schedule – Post PNDT counselling", "page": "To be Scheduled" }));
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
          this.postpndtscheduledErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.postpndtscheduledErrorMessage = err.toString();
  
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
            this.postpndtscheduledErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.postpndtscheduledErrorMessage = err.toString();
  
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
            this.postpndtscheduledErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.postpndtscheduledErrorMessage = err.toString();
  
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
            this.postpndtscheduledErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.postpndtscheduledErrorMessage = err.toString();
  
          });
    }
  
    ddlcounsellorName() {
  
      this.counsellornamelist = [];
      this.selectedname = '';
      this.postpndtscheduledErrorMessage = '';
      this.pndtmtpMasterService.getCounsellorName()
        .subscribe(response => {
          this.pndtmtpMasterResponse = response;
          if (this.pndtmtpMasterResponse !== null && this.pndtmtpMasterResponse.status === "true") {
            this.counsellornamelist = this.pndtmtpMasterResponse.data;
            if (this.counsellornamelist.length > 0) {
              this.selectedname = this.counsellornamelist[0].id.toString();
            }
          }
          else {
            this.postpndtscheduledErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.postpndtscheduledErrorMessage = err.toString();
  
          });
    }
  
    retrivescheduledlists() {
      
      this.recordCount = 0;
      this.loaderService.display(true);
      this.scheduledlists = [];
      this.postpndtscheduledErrorMessage = '';
  
      this.pndtmtpScheduledRequest = {
        userId: this.user.id, districtId: +(this.selectedDistrict),
        chcId: +(this.selectedchc),
        phcId: +(this.selectedphc),
        anmId: +(this.selectedanm)
      };
  
      let picknpack = this.pndtmtpScheduleService.getscheduledLists(this.pndtmtpScheduledRequest)
        .subscribe(response => {
          this.ScheduledPostPndtcResponse = response;
          this.loaderService.display(false);
          if (this.ScheduledPostPndtcResponse !== null && this.ScheduledPostPndtcResponse.status === "true") {
            if (this.ScheduledPostPndtcResponse.data.length <= 0) {
              this.postpndtscheduledErrorMessage = response.message;
              this.getPostSchedulinglists();
            }
            else {
              this.scheduledlists = this.ScheduledPostPndtcResponse.data;
              this.getPostSchedulinglists();
  
            }
          }
          else {
            this.postpndtscheduledErrorMessage = response.message;
          }
          //this.onLoadSubject.emit(this.recordCount);    //step 5
          this.rerender();
          this.loadDataTable = true;
        },
        (err: HttpErrorResponse) => {
            if (this.loadDataTable) this.rerender();
            this.postpndtscheduledErrorMessage = err.toString();
          });
    }
  
    editAppiontment(editAppointmentFormDetail, scheduleddata: ScheduledList) {
  
      this.postpndtscheduledErrorMessage = '';
      this.ddlcounsellorName();
      this.subjectName = scheduleddata.subjectName;
      this.anwSubjectId = scheduleddata.anwSubjectId;
      this.contactNo = scheduleddata.contactNo;
      this.samplega = scheduleddata.ga;
      this.spouseSubjectId = scheduleddata.spouseSubjectId;
      this.selectedpostpndtDate = scheduleddata.counsellingDateTime;
  
      // this.editscheduleDate = moment().format("DD/MM/YYYY");
      // this.editscheduleTime = moment().format("HH:mm");
      // this.editDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
      // this.editDateOptions.minDate = moment().format("DD/MM/YYYY HH:mm");
      this.editDateOptions.defaultDate = scheduleddata.counsellingDateTime;
      //this.editDateOptions.minDate = moment().format("DD/MM/YYYY HH:mm");
      const regDate = this.dateservice.convertToDateTimeFormat(scheduleddata.pndtDateTime);
      this.editDateOptions.minDate = regDate;
  
      this.modalService.open(
        editAppointmentFormDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop: 'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    onSubmit(editAppointmentForm: NgForm) {
  
      console.log(editAppointmentForm.value);
      if (this.popupform.valid) {
        var getdobdate = this.popupform.controls.editScheduleDate.value;
        this.editscheduleDateTime =  moment(new Date(getdobdate)).format("DD/MM/YYYY HH:mm");
      }
      if((this.editscheduleDateTime === '' || this.editscheduleDateTime == undefined) && (this.editscheduleDateTime === '' || this.editscheduleDateTime == undefined)){
        this.showResponseMessage('Please choose Date & Time', 'e');
        return false;
      }
      // this.editscheduleDate = moment().format("DD/MM/YYYY");
      // this.editscheduleTime = moment().format("HH:mm");
      // this.editDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
      // this.editDateOptions.minDate = moment().format("DD/MM/YYYY HH:mm");
      this.counsellorId = editAppointmentForm.value.DDcounsellorname;
  
      this.addScheduledRequest = {
        anwsubjectId: this.anwSubjectId,
        spouseSubjectId: this.spouseSubjectId,
        counsellorId: +(this.counsellorId),
        counsellingDateTime: this.editscheduleDateTime,
        userId: this.user.id,
      };
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      let addScheduleData = this.pndtmtpScheduleService.Addschedule(this.addScheduledRequest)
        .subscribe(response => {
          this.addScheduledResponse = response;
          if (this.addScheduledResponse !== null && this.addScheduledResponse.status === "true") {
            this.showResponseMessage(this.addScheduledResponse.message, 's')
            this.retrivescheduledlists();
            //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
          } else {
            this.showResponseMessage(this.addScheduledResponse.message, 'e');
            this.postpndtscheduledErrorMessage = response.message;
          }
  
        },
          (err: HttpErrorResponse) => {
            this.showResponseMessage(err.toString(), 'e');
            this.postpndtscheduledErrorMessage = err.toString();
          });
  
    }
  
    showResponseMessage(message: string, type: string) {
      var messageType = '';
      var title = `Post PNDT Counselling Rescheduled Successfully on ${this.editscheduleDateTime}`;
      if (type === 'e') {
        Swal.fire({ icon: 'error', title: message, confirmButtonText: 'Ok', allowOutsideClick: false })
      }
      else {
        Swal.fire({ icon: 'success', title: title, confirmButtonText: 'Ok', allowOutsideClick: false })
          .then((result) => {
            if (result.value) {
              this.modalService.dismissAll();
            }
          });
  
      }
    }
  
    InitializeDateRange() {
  
      this.popupform = this._formBuilder.group({
        editScheduleDate: [new Date(moment().add(-1, 'day').format())],
      });
  
      //Change of sample collection date
      this.popupform.controls.editScheduleDate.valueChanges.subscribe(changes => {
        console.log('end: ', changes);
        if (!changes[0]) return;
        const selectedDate2 = changes[0].getTime();
        this.editscheduleDate = moment(new Date(selectedDate2)).format("DD/MM/YYYY");
        this.editscheduleTime = moment(new Date(selectedDate2)).format("HH:mm");
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
