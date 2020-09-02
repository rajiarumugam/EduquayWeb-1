import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { PndtMtpMasterService } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master.service';
import { SchedulePrePndtcService } from 'src/app/shared/pndtc/schedule-pre-pndtc/schedule-pre-pndtc.service';
import { TokenService } from 'src/app/shared/token.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { user } from 'src/app/shared/auth-response';
import { PndtMtpMasterResponse, dataModel } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master-response';
import { ScheduledList, ScheduledPrePndtcResponse, AddPrePndtcScheduleResponse } from 'src/app/shared/pndtc/schedule-pre-pndtc/schedule-pre-pndtc-response';
import { SchedulePrePndtcRequest, AddPrePndtcScheduleRequest } from 'src/app/shared/pndtc/schedule-pre-pndtc/schedule-pre-pndtc-request';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pre-pndtc-scheduled',
  templateUrl: './pre-pndtc-scheduled.component.html',
  styleUrls: ['./pre-pndtc-scheduled.component.css']
})
export class PrePndtcScheduledComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('editDatePicker', { static: false }) editDatePicker;

  masterdataErrorMessage: string;
  prepndtscheduledErrorMessage: string;
  user: user;
  pndtmtpMasterResponse: PndtMtpMasterResponse;
  pndtmtpScheduledRequest: SchedulePrePndtcRequest;
  pndtmtpScheduledResponse: ScheduledPrePndtcResponse;
  addScheduledRequest: AddPrePndtcScheduleRequest;
  addScheduledResponse: AddPrePndtcScheduleResponse;
  scheduledlists: ScheduledList[] = [];
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
    defaultDate: new Date(Date.now()),
    //minDate: this.dyCollectionDate,
    maxDate: new Date(Date.now()),
    enableTime: true,
  };

  constructor(
    private dataservice: DataService,
    private pndtmtpMasterService: PndtMtpMasterService,
    private pndtmtpScheduleService: SchedulePrePndtcService,
    private tokenService: TokenService,
    private loaderService: LoaderService,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.recordCount = 0;
    this.loaderService.display(true);
    this.InitializeDateRange();
    this.dataservice.sendData(JSON.stringify({ "module": "PNDTC Counsellor", "submodule": "Schedule – Pre PNDT counselling", "page": "Scheduled" }));
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
    this.ddlDistrict(this.user.id);

    this.pndtmtpScheduledRequest = {
      userId: this.user.id,
      districtId: 0,
      chcId: 0,
      phcId: 0,
      anmId: 0
    };
    let scheduleddata = this.pndtmtpScheduleService.getscheduledLists(this.pndtmtpScheduledRequest)
      .subscribe(response => {
        this.pndtmtpScheduledResponse = response;
        this.loaderService.display(false);
        if (this.pndtmtpScheduledResponse !== null && this.pndtmtpScheduledResponse.status === "true") {
          if (this.pndtmtpScheduledResponse.data.length <= 0) {
            this.prepndtscheduledErrorMessage = response.message;
          }
          else {
            this.scheduledlists = this.pndtmtpScheduledResponse.data;
            this.rerender();
          }
        }
        else {
          this.prepndtscheduledErrorMessage = response.message;
        }
        
      },
        (err: HttpErrorResponse) => {
          
          this.prepndtscheduledErrorMessage = err.toString();
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
        this.masterdataErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.masterdataErrorMessage = err.toString();

      });
  }
  onChangeDistrict() {

    if (this.selectedDistrict === '') {
      this.selectedchc = '';
      this.selectedphc = '';
      this.selectedphc = '';
    }
    else {
      this.ddlChc(this.selectedDistrict);
      this.ddlPhc(this.selectedDistrict);
      this.ddlAnm(this.selectedDistrict);
    }
  }

  ddlChc(id) {

    this.chclists = [];
    this.selectedchc = '';
    this.masterdataErrorMessage = '';
    this.pndtmtpMasterService.getChc(id)
      .subscribe(response => {
        this.pndtmtpMasterResponse = response;
        if (this.pndtmtpMasterResponse !== null && this.pndtmtpMasterResponse.status === "true") {
          this.chclists = this.pndtmtpMasterResponse.data;
          if (this.chclists.length > 0) {
            this.selectedchc = this.chclists[0].id.toString();
          }
        }
        else {
          this.masterdataErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.masterdataErrorMessage = err.toString();

        });
  }

  ddlPhc(id) {

    this.phclists = [];
    this.selectedphc = '';
    this.masterdataErrorMessage = '';
    this.pndtmtpMasterService.getPhc(id)
      .subscribe(response => {
        this.pndtmtpMasterResponse = response;
        if (this.pndtmtpMasterResponse !== null && this.pndtmtpMasterResponse.status === "true") {
          this.phclists = this.pndtmtpMasterResponse.data;
          if (this.phclists.length > 0) {
            this.selectedphc = this.phclists[0].id.toString();
          }
        }
        else {
          this.masterdataErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.masterdataErrorMessage = err.toString();

        });
  }

  ddlAnm(id) {

    this.anmlists = [];
    this.selectedanm = '';
    this.masterdataErrorMessage = '';
    this.pndtmtpMasterService.getAnm(id)
      .subscribe(response => {
        this.pndtmtpMasterResponse = response;
        if (this.pndtmtpMasterResponse !== null && this.pndtmtpMasterResponse.status === "true") {
          this.anmlists = this.pndtmtpMasterResponse.data;
          if (this.anmlists.length > 0) {
            this.selectedanm = this.anmlists[0].id.toString();
          }
        }
        else {
          this.masterdataErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.masterdataErrorMessage = err.toString();

        });
  }

  ddlcounsellorName() {

    this.counsellornamelist = [];
    this.selectedname = '';
    this.masterdataErrorMessage = '';
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
          this.masterdataErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.masterdataErrorMessage = err.toString();

        });
  }

  retrivescheduledlists() {
    
    this.recordCount = 0;
    this.loaderService.display(true);
    this.scheduledlists = [];
    this.prepndtscheduledErrorMessage = '';

    this.pndtmtpScheduledRequest = {
      userId: this.user.id, districtId: +(this.selectedDistrict),
      chcId: +(this.selectedchc),
      phcId: +(this.selectedphc),
      anmId: +(this.selectedanm)
    };

    let picknpack = this.pndtmtpScheduleService.getscheduledLists(this.pndtmtpScheduledRequest)
      .subscribe(response => {
        this.pndtmtpScheduledResponse = response;
        this.loaderService.display(false);
        if (this.pndtmtpScheduledResponse !== null && this.pndtmtpScheduledResponse.status === "true") {
          if (this.pndtmtpScheduledResponse.data.length <= 0) {
            this.prepndtscheduledErrorMessage = response.message;
          }
          else {
            this.scheduledlists = this.pndtmtpScheduledResponse.data;
            this.recordCount = this.scheduledlists.length;

          }
        }
        else {
          this.prepndtscheduledErrorMessage = response.message;
        }
        this.onLoadSubject.emit(this.recordCount);    //step 5
        this.rerender();
        this.loadDataTable = true;
      },
      (err: HttpErrorResponse) => {
          if (this.loadDataTable) this.rerender();
          this.prepndtscheduledErrorMessage = err.toString();
        });
  }

  editAppiontment(editAppointmentFormDetail, scheduleddata: ScheduledList) {

    this.prepndtscheduledErrorMessage = '';
    this.ddlcounsellorName();
    this.subjectName = scheduleddata.subjectName;
    this.anwSubjectId = scheduleddata.anwSubjectId;
    this.contactNo = scheduleddata.contactNo;
    this.samplega = scheduleddata.ga;
    this.spouseSubjectId = scheduleddata.spouseSubjectId;

    this.editscheduleDate = moment().format("DD/MM/YYYY");
    this.editscheduleTime = moment().format("HH:mm");
    this.editDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
    this.editDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

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

    this.editscheduleDate = moment().format("DD/MM/YYYY");
    this.editscheduleTime = moment().format("HH:mm");
    this.editDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
    this.editDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");
    this.counsellorId = editAppointmentForm.value.DDcounsellorname;

    this.addScheduledRequest = {
      anwsubjectId: this.anwSubjectId,
      spouseSubjectId: this.spouseSubjectId,
      counsellorId: +(this.counsellorId),
      counsellingDateTime: this.editscheduleDate + ' ' + this.editscheduleTime,
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
          this.prepndtscheduledErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.showResponseMessage(err.toString(), 'e');
          this.prepndtscheduledErrorMessage = err.toString();
        });

  }

  showResponseMessage(message: string, type: string) {
    var messageType = '';
    var title = `Pre PNDT Counselling Rescheduled Successfully on ${this.editscheduleDate} at ${this.editscheduleTime}`;
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
