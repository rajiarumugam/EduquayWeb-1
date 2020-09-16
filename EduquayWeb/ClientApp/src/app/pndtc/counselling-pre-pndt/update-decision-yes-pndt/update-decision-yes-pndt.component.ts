import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/shared/data.service';
import { PndtMtpMasterService } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master.service';
import { CounsellPrePndtService } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt.service';
import { TokenService } from 'src/app/shared/token.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, FormControl } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { PndtMtpMasterResponse, dataModel } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master-response';
import { user } from 'src/app/shared/auth-response';
import { CounsellPrePndtResquest, AddPrePndtCounsellingRequest } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt-resquest';
import { CounselledprepndtResponse, CounselledList, AddPrePndtcCounsellingResponse } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt-response';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { DateService } from 'src/app/shared/utility/date.service';

@Component({
  selector: 'app-update-decision-yes-pndt',
  templateUrl: './update-decision-yes-pndt.component.html',
  styleUrls: ['./update-decision-yes-pndt.component.css']
})
export class UpdateDecisionYesPndtComponent implements OnInit {

  @ViewChild('pndtschedulePicker', { static: false }) pndtschedulePicker;

  updateDecisionYespndtErrorMessage: string;
  //masterdataErrorMessage: string;

  pndtmtpMasterResponse: PndtMtpMasterResponse;
  counselledyesprepndtRequest: CounsellPrePndtResquest;
  counselledyesprepndtResponse: CounselledprepndtResponse;
  counselledyeslists: CounselledList[] = [];
  addCounselledyesRequest: AddPrePndtCounsellingRequest;
  addCounselledyesResponse: AddPrePndtcCounsellingResponse;
  anwSubjectId: string;
  counselledYesdataItem: CounselledList;
  selectedobstetrician: string = '';
  obstetricianlists: dataModel[] = [];
  user: user;

  subjectName: string;
  spouseSubjectId: string;
  spouseName: string;
  rchId: string;
  contactNo: string;
  age: number;
  ecNumber: string;
  ga: number;
  obstetricScore: string;
  lmpDate: string;
  counsellorId: number;
  counsellorName: string;
  counsellingDateTime: string;
  schedulingId: number;
  anwCBCTestResult: string;
  anwSSTestResult: string;
  anwHPLCTestResult: string;
  spouseCBCTestResult: string;
  spouseSSTestResult: string;
  spouseHPLCTestResult: string;
  counsellingRemarks: string;
  assignedObstetricianId: number;
  isPNDTAgreeYes: boolean;
  isPNDTAgreeNo: boolean;
  isPNDTAgreePending: boolean;
  isSelectedYes: boolean;
  isSelectedNo: boolean;
  isSelectedPending: boolean;
  item: any;
  isDecisionYes: boolean = true;
  remarksdata: string;
  DDLobstetrician: string;
  confirmationSelected: boolean;

  /*Date Range configuration starts*/
  dateform: FormGroup;
  popupform: FormGroup;
  DAY = 86400000;
  dyCollectionDate: Date = new Date(Date.now());
  fixPndtSchedule: string;
  pndtscheduleDate: string;
  pndtscheduleTime: string;
  myRadio: string = '';
  selectedAll: any
  // selecteddata: any;
  // testdate: Date;
  // selectedscheduledate: Date;

  dateOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y H:i',
   // defaultDate: new Date(Date.now()),
    minDate: new Date(Date.now()),
    //maxDate: new Date(Date.now()),
    enableTime: true,
  };

  

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
    private dataservice: DataService,
    private pndtmtpMasterService: PndtMtpMasterService,
    private counselledyesprepndtService: CounsellPrePndtService,
    private tokenService: TokenService,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private dateservice: DateService,
    private router: Router
  ) { }

  ngOnInit() {

    this.loaderService.display(false);
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.dataservice.sendData(JSON.stringify({ "module": "PNDTC Counsellor", "submodule": "Counselling – Pre PNDT" }));
    this.InitializeDateRange();
    this.activatedRoute.queryParams.subscribe(params => {
      this.anwSubjectId = params['q'];
      this.retrivecounselledyeslists();
     // this.getMinDate();
    });
   
    // this.pndtscheduleDate = moment().format("DD/MM/YYYY");
    // this.pndtscheduleTime = moment().format("HH:mm");
    // this.dateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
    // this.dateOptions.minDate = moment().format("DD/MM/YYYY HH:mm");
    this.ddlobstetricianName();
    this.onClick('decisionyes');

  }

  retrivecounselledyeslists() {

    this.loaderService.display(true);
    this.counselledyeslists = [];
    this.updateDecisionYespndtErrorMessage = '';
    this.counselledyesprepndtRequest = {
      userId: this.user.id, districtId: 0,
      chcId: 0,
      phcId: 0,
      anmId: 0
    };
    let counselleddata = this.counselledyesprepndtService.getcounselledYesLists(this.counselledyesprepndtRequest)
      .subscribe(response => {
        this.counselledyesprepndtResponse = response;
        this.loaderService.display(false);
        if (this.counselledyesprepndtResponse !== null && this.counselledyesprepndtResponse.status === "true") {
          if (this.counselledyesprepndtResponse.data.length <= 0) {
            this.updateDecisionYespndtErrorMessage = response.message;
          }
          else {
            this.counselledYesdataItem = this.counselledyesprepndtResponse.data.
              find(counselling => counselling.anwSubjectId === this.anwSubjectId);
              this.remarksdata = this.counselledYesdataItem.counsellingRemarks;
              this.selectedobstetrician = this.counselledYesdataItem.obstetricianId.toString();
              this.isSelectedYes = this.counselledYesdataItem.isPNDTAgreeYes;
              // if (this.counselledYesdataItem.isPNDTAgreeYes === true) {
              //   const regDate = this.dateservice.convertToDateTimeFormat(this.counselledYesdataItem.counsellingDateTime);
              //   this.dateOptions.minDate = regDate;
              // }
              const regDate = this.dateservice.convertToDateTimeFormat(this.counselledYesdataItem.counsellingDateTime);
              this.pndtschedulePicker.flatpickr.set({
                minDate: regDate
              });
              this.dateOptions.minDate = regDate;
            //this.counsellinglists = this.counselledyesprepndtResponse.data;
              // this.pndtscheduleDate = moment().format("DD/MM/YYYY");
              // this.pndtscheduleTime = moment().format("HH:mm");
              // this.dateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
              // //var pattern = /(\d{2})\/(\d{2})\/(\d{4})\ (\d{2})\:(\d{2})/;
              // const regDate = this.dateservice.convertToDateTimeFormat(this.counselledYesdataItem.counsellingDateTime);

          }
        }
        else {
          this.updateDecisionYespndtErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.updateDecisionYespndtErrorMessage = err.toString();
        });
  }
  

  getMinDate(){

    if (this.counselledYesdataItem.isPNDTAgreeYes === true) {
      const regDate = this.dateservice.convertToDateTimeFormat(this.counselledYesdataItem.counsellingDateTime);
      this.dateOptions.minDate = regDate;
    }
  }

  ddlobstetricianName() {

    this.obstetricianlists = [];
    this.selectedobstetrician = '';
    this.updateDecisionYespndtErrorMessage = '';
    this.pndtmtpMasterService.getobstetricianName()
      .subscribe(response => {
        this.pndtmtpMasterResponse = response;
        if (this.pndtmtpMasterResponse !== null && this.pndtmtpMasterResponse.status === "true") {
          this.obstetricianlists = this.pndtmtpMasterResponse.data;
          // if (this.obstetricianlists.length > 0) {
          //   this.selectedobstetrician = this.obstetricianlists[0].id.toString();
          // }
        }
        else {
          this.updateDecisionYespndtErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.updateDecisionYespndtErrorMessage = err.toString();

        });
  }

  onClick(item) {

    if (item == 'decisionyes') {
      this.isSelectedYes = true;
      this.isSelectedNo = false;
      this.isSelectedPending = false;
      this.isDecisionYes = true;
      const regDate = this.dateservice.convertToDateTimeFormat(this.counselledYesdataItem.counsellingDateTime);
      this.dateOptions.minDate = regDate;
    }
    else if (item == 'decisionno') {
      this.isSelectedNo = true;
      this.isSelectedYes = false;
      this.isSelectedPending = false;
      this.isDecisionYes = false;
    }
    else if (item == 'decisionpending') {
      this.isSelectedPending = true;
      this.isSelectedYes = false;
      this.isSelectedNo = false;
      this.isDecisionYes = false;
    }
  }

  // checkIfSelected(){

  //   console.log(this.confirmationSelected);
  //   this.selectedAll = this.counselledyeslists.every(function (item: any) {
  //     return item.confirmationSelected == true;

  //   })
  // }

  onSubmit(updatePndtyesForm: NgForm) {

    if (this.isSelectedYes === true) {
      console.log(updatePndtyesForm.value);
      //this.InitializeDateRange();
      this.counsellingRemarks = updatePndtyesForm.value.Remarks;
      this.assignedObstetricianId = updatePndtyesForm.value.DDLobstetrician;
      
      if((this.pndtscheduleDate === '' || this.pndtscheduleDate == undefined) && (this.pndtscheduleTime === '' || this.pndtscheduleTime == undefined)){
        this.decisionYesResponseMessage('Please choose Schedule PNDT Date & Time', 'e');
        return false;
      }

      this.addCounselledyesRequest = {
        prePNDTSchedulingId: this.counselledYesdataItem.schedulingId,
        anwsubjectId: this.counselledYesdataItem.anwSubjectId,
        spouseSubjectId: this.counselledYesdataItem.spouseSubjectId,
        counsellorId: this.counselledYesdataItem.counsellorId,
        counsellingRemarks: this.counsellingRemarks,
        assignedObstetricianId: +(this.assignedObstetricianId),
        isPNDTAgreeYes: this.isSelectedYes,
        isPNDTAgreeNo: this.isSelectedNo,
        isPNDTAgreePending: this.isSelectedPending,
        schedulePNDTDate: this.pndtscheduleDate,
        schedulePNDTTime: this.pndtscheduleTime,
        userId: this.user.id,
      };

      //Remove below 2 lines after successfully tested
      // this.decisionYesResponseMessage('Successfully registered', 's');
      // return false;

      let addCounselledNoData = this.counselledyesprepndtService.AddprepndtCounselling(this.addCounselledyesRequest)
        .subscribe(response => {
          this.addCounselledyesResponse = response;
          if (this.addCounselledyesResponse !== null && this.addCounselledyesResponse.status === "true") {
            this.decisionYesResponseMessage(this.addCounselledyesResponse.message, 's')
            //this.retrivescheduledlists();
            //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
          } else {
            this.decisionYesResponseMessage(this.addCounselledyesResponse.message, 'e');
            this.updateDecisionYespndtErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.decisionYesResponseMessage(err.toString(), 'e');
            this.updateDecisionYespndtErrorMessage = err.toString();
          });
    }
    else if (this.isSelectedNo === true) {
      console.log(updatePndtyesForm.value);

      this.counsellingRemarks = updatePndtyesForm.value.Remarks;
      this.assignedObstetricianId = updatePndtyesForm.value.DDLobstetrician;

      this.addCounselledyesRequest = {
        prePNDTSchedulingId: this.counselledYesdataItem.schedulingId,
        anwsubjectId: this.counselledYesdataItem.anwSubjectId,
        spouseSubjectId: this.counselledYesdataItem.spouseSubjectId,
        counsellorId: this.counselledYesdataItem.counsellorId,
        counsellingRemarks: this.counsellingRemarks,
        assignedObstetricianId: 0,
        isPNDTAgreeYes: this.isSelectedYes,
        isPNDTAgreeNo: this.isSelectedNo,
        isPNDTAgreePending: this.isSelectedPending,
        schedulePNDTDate: '',
        schedulePNDTTime: '',
        userId: this.user.id,
      };

      //Remove below 2 lines after successfully tested
      // this.decisionNoResponseMessage('Successfully registered', 's');
      // return false;

      let addCounselledNoData = this.counselledyesprepndtService.AddprepndtCounselling(this.addCounselledyesRequest)
        .subscribe(response => {
          this.addCounselledyesResponse = response;
          if (this.addCounselledyesResponse !== null && this.addCounselledyesResponse.status === "true") {
            this.decisionNoResponseMessage(this.addCounselledyesResponse.message, 's')
            //this.retrivescheduledlists();
            //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
          } else {
            this.decisionNoResponseMessage(this.addCounselledyesResponse.message, 'e');
            this.updateDecisionYespndtErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.decisionNoResponseMessage(err.toString(), 'e');
            this.updateDecisionYespndtErrorMessage = err.toString();
          });
    }
    else if (this.isSelectedPending === true) {
      console.log(updatePndtyesForm.value);

      this.counsellingRemarks = updatePndtyesForm.value.Remarks;
      this.assignedObstetricianId = updatePndtyesForm.value.DDLobstetrician;

      this.addCounselledyesRequest = {
        prePNDTSchedulingId: this.counselledYesdataItem.schedulingId,
        anwsubjectId: this.counselledYesdataItem.anwSubjectId,
        spouseSubjectId: this.counselledYesdataItem.spouseSubjectId,
        counsellorId: this.counselledYesdataItem.counsellorId,
        counsellingRemarks: this.counsellingRemarks,
        assignedObstetricianId: 0,
        isPNDTAgreeYes: this.isSelectedYes,
        isPNDTAgreeNo: this.isSelectedNo,
        isPNDTAgreePending: this.isSelectedPending,
        schedulePNDTDate: '',
        schedulePNDTTime: '',
        userId: this.user.id,
      };

      //Remove below 2 lines after successfully tested
      // this.decisionAwaitedResponseMessage('Successfully registered', 's');
      // return false;

      let addCounselledNoData = this.counselledyesprepndtService.AddprepndtCounselling(this.addCounselledyesRequest)
        .subscribe(response => {
          this.addCounselledyesResponse = response;
          if (this.addCounselledyesResponse !== null && this.addCounselledyesResponse.status === "true") {
            this.decisionAwaitedResponseMessage(this.addCounselledyesResponse.message, 's')
            //this.retrivescheduledlists();
            //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
          } else {
            this.decisionAwaitedResponseMessage(this.addCounselledyesResponse.message, 'e');
            this.updateDecisionYespndtErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.decisionAwaitedResponseMessage(err.toString(), 'e');
            this.updateDecisionYespndtErrorMessage = err.toString();
          });
    }
    else {
      this.decisionAwaitedResponseMessage(`Please update the couple's decision on PNDT`, 'e');
    }
  }

  decisionYesResponseMessage(message: string, type: string) {
    var messageType = '';
    var title = `Pre-PNDT scheduled successfully on ${this.pndtscheduleDate} at ${this.pndtscheduleTime}`;
    if (type === 'e') {
      Swal.fire({ icon: 'error', title: message, confirmButtonText: 'Ok', allowOutsideClick: false })
    }
    else {
      Swal.fire({ icon: 'success', title: title, confirmButtonText: 'Ok', allowOutsideClick: false })
      .then((result) => {
        if (result.value) {
          this.router.navigateByUrl(`/app/counselling-pre-pndt/counselledyes`);
        }
      });
    }
  }
  decisionNoResponseMessage(message: string, type: string) {
    var messageType = '';
    var title = `Pre-PNDT Counselling completed successfully`;
    if (type === 'e') {
      Swal.fire({ icon: 'error', title: message, confirmButtonText: 'Ok', allowOutsideClick: false })
    }
    else {
      Swal.fire({ icon: 'success', title: title, confirmButtonText: 'Ok', allowOutsideClick: false })
      .then((result) => {
        if (result.value) {
          this.router.navigateByUrl(`/app/counselling-pre-pndt/counselledyes`);
        }
      });
    }
  }
  decisionAwaitedResponseMessage(message: string, type: string) {
    var messageType = '';
    var title = `Pre-PNDT Counselling completed successfully`;
    if (type === 'e') {
      Swal.fire({ icon: 'error', title: message, confirmButtonText: 'Ok', allowOutsideClick: false })
    }
    else {
      Swal.fire({ icon: 'success', title: title, confirmButtonText: 'Ok', allowOutsideClick: false })
      .then((result) => {
        if (result.value) {
          this.router.navigateByUrl(`/app/counselling-pre-pndt/counselledyes`);
        }
      });
    }
  }

  InitializeDateRange() {

    this.dateform = this._formBuilder.group({
      fixPndtSchedule: [new Date(moment().add(-1, 'day').format())],
    });

    //Change of sample collection date
    this.dateform.controls.fixPndtSchedule.valueChanges.subscribe(changes => {
      console.log('end: ', changes);
      if (!changes[0]) return;
      const selectedDate2 = changes[0].getTime();
      this.pndtscheduleDate = moment(new Date(selectedDate2)).format("DD/MM/YYYY");
      this.pndtscheduleTime = moment(new Date(selectedDate2)).format("HH:mm");
    });
  }

}
