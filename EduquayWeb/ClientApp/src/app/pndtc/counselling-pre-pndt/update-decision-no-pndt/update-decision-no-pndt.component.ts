import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/shared/data.service';
import { PndtMtpMasterService } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master.service';
import { CounsellPrePndtService } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt.service';
import { TokenService } from 'src/app/shared/token.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { PndtMtpMasterResponse, dataModel } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master-response';
import { user } from 'src/app/shared/auth-response';
import { AddPrePndtCounsellingRequest, CounsellPrePndtResquest } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt-resquest';
import { AddPrePndtcCounsellingResponse, CounselledList, CounselledprepndtResponse } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt-response';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-decision-no-pndt',
  templateUrl: './update-decision-no-pndt.component.html',
  styleUrls: ['./update-decision-no-pndt.component.css']
})
export class UpdateDecisionNoPndtComponent implements OnInit {

  @ViewChild('pndtschedulePicker', { static: false }) pndtschedulePicker;

  updateDecisionNopndtErrorMessage: string;
  //masterdataErrorMessage: string;

  pndtmtpMasterResponse: PndtMtpMasterResponse;
  counsellednoprepndtRequest: CounsellPrePndtResquest;
  counsellednoprepndtResponse: CounselledprepndtResponse;
  counsellednolists: CounselledList[] = [];
  addCounselledNoRequest: AddPrePndtCounsellingRequest;
  addCounselledNoResponse: AddPrePndtcCounsellingResponse;
  anwSubjectId: string;
  counselledNodataItem: CounselledList;
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
  isDecisionYes: boolean = false;
  Remarks: string;

  /*Date Range configuration starts*/
  dateform: FormGroup;
  popupform: FormGroup;
  DAY = 86400000;
  dyCollectionDate: Date = new Date(Date.now());
  fixPndtSchedule: string;
  pndtscheduleDate: string;
  pndtscheduleTime: string;
  myRadio: string = '';

  dateOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y H:i',
    defaultDate: new Date(Date.now()),
    //minDate: this.dyCollectionDate,
    minDate: new Date(Date.now()),
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
    private counsellednoprepndtService: CounsellPrePndtService,
    private tokenService: TokenService,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {

    this.loaderService.display(false);
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.dataservice.sendData(JSON.stringify({ "module": "PNDTC Counsellor", "submodule": "Counselling – Pre PNDT" }));
    this.InitializeDateRange();
    this.activatedRoute.queryParams.subscribe(params => {
      this.anwSubjectId = params['q'];
      this.retrivecounsellednolists();
    });
    this.pndtscheduleDate = moment().format("DD/MM/YYYY");
    this.pndtscheduleTime = moment().format("HH:mm");
    this.dateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
    this.dateOptions.minDate = moment().format("DD/MM/YYYY HH:mm");

    this.ddlobstetricianName();
  }

  retrivecounsellednolists() {

    this.loaderService.display(true);
    this.counsellednolists = [];
    this.updateDecisionNopndtErrorMessage = '';
    this.counsellednoprepndtRequest = {
      userId: this.user.id, districtId: 0,
      chcId: 0,
      phcId: 0,
      anmId: 0
    };
    let counselleddata = this.counsellednoprepndtService.getcounselledNoLists(this.counsellednoprepndtRequest)
      .subscribe(response => {
        this.counsellednoprepndtResponse = response;
        this.loaderService.display(false);
        if (this.counsellednoprepndtResponse !== null && this.counsellednoprepndtResponse.status === "true") {
          if (this.counsellednoprepndtResponse.data.length <= 0) {
            this.updateDecisionNopndtErrorMessage = response.message;
          }
          else {
            this.counselledNodataItem = this.counsellednoprepndtResponse.data.
              find(counselling => counselling.anwSubjectId === this.anwSubjectId);
              this.Remarks = this.counselledNodataItem.counsellingRemarks;
            //this.counsellinglists = this.counsellednoprepndtResponse.data;

          }
        }
        else {
          this.updateDecisionNopndtErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.updateDecisionNopndtErrorMessage = err.toString();
        });
  }
  ddlobstetricianName() {

    this.obstetricianlists = [];
    this.selectedobstetrician = '';
    this.updateDecisionNopndtErrorMessage = '';
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
          this.updateDecisionNopndtErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.updateDecisionNopndtErrorMessage = err.toString();

        });
  }

  onClick(item) {

    if (item == 'decisionyes') {
      this.isSelectedYes = true;
      this.isSelectedNo = false;
      this.isSelectedPending = false;
      this.isDecisionYes = true;
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
  onSubmit(updatePndtnoForm: NgForm) {

    if (this.isSelectedYes === true) {
      console.log(updatePndtnoForm.value);

      this.counsellingRemarks = updatePndtnoForm.value.Remarks;
      this.assignedObstetricianId = updatePndtnoForm.value.DDLobstetrician;

      this.addCounselledNoRequest = {
        prePNDTSchedulingId: this.counselledNodataItem.schedulingId,
        anwsubjectId: this.counselledNodataItem.anwSubjectId,
        spouseSubjectId: this.counselledNodataItem.spouseSubjectId,
        counsellorId: this.counselledNodataItem.counsellorId,
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

      let addCounselledNoData = this.counsellednoprepndtService.AddprepndtCounselling(this.addCounselledNoRequest)
        .subscribe(response => {
          this.addCounselledNoResponse = response;
          if (this.addCounselledNoResponse !== null && this.addCounselledNoResponse.status === "true") {
            this.decisionYesResponseMessage(this.addCounselledNoResponse.message, 's')
            //this.retrivescheduledlists();
            //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
          } else {
            this.decisionYesResponseMessage(this.addCounselledNoResponse.message, 'e');
            this.updateDecisionNopndtErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.decisionYesResponseMessage(err.toString(), 'e');
            this.updateDecisionNopndtErrorMessage = err.toString();
          });
    }
    else if (this.isSelectedNo === true) {
      console.log(updatePndtnoForm.value);

      this.counsellingRemarks = updatePndtnoForm.value.Remarks;
      this.assignedObstetricianId = updatePndtnoForm.value.DDLobstetrician;

      this.addCounselledNoRequest = {
        prePNDTSchedulingId: this.counselledNodataItem.schedulingId,
        anwsubjectId: this.counselledNodataItem.anwSubjectId,
        spouseSubjectId: this.counselledNodataItem.spouseSubjectId,
        counsellorId: this.counselledNodataItem.counsellorId,
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

      let addCounselledNoData = this.counsellednoprepndtService.AddprepndtCounselling(this.addCounselledNoRequest)
        .subscribe(response => {
          this.addCounselledNoResponse = response;
          if (this.addCounselledNoResponse !== null && this.addCounselledNoResponse.status === "true") {
            this.decisionNoResponseMessage(this.addCounselledNoResponse.message, 's')
            //this.retrivescheduledlists();
            //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
          } else {
            this.decisionNoResponseMessage(this.addCounselledNoResponse.message, 'e');
            this.updateDecisionNopndtErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.decisionNoResponseMessage(err.toString(), 'e');
            this.updateDecisionNopndtErrorMessage = err.toString();
          });
    }
    else if (this.isSelectedPending === true) {
      console.log(updatePndtnoForm.value);

      this.counsellingRemarks = updatePndtnoForm.value.Remarks;
      this.assignedObstetricianId = updatePndtnoForm.value.DDLobstetrician;

      this.addCounselledNoRequest = {
        prePNDTSchedulingId: this.counselledNodataItem.schedulingId,
        anwsubjectId: this.counselledNodataItem.anwSubjectId,
        spouseSubjectId: this.counselledNodataItem.spouseSubjectId,
        counsellorId: this.counselledNodataItem.counsellorId,
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

      let addCounselledNoData = this.counsellednoprepndtService.AddprepndtCounselling(this.addCounselledNoRequest)
        .subscribe(response => {
          this.addCounselledNoResponse = response;
          if (this.addCounselledNoResponse !== null && this.addCounselledNoResponse.status === "true") {
            this.decisionAwaitedResponseMessage(this.addCounselledNoResponse.message, 's')
            //this.retrivescheduledlists();
            //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
          } else {
            this.decisionAwaitedResponseMessage(this.addCounselledNoResponse.message, 'e');
            this.updateDecisionNopndtErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.decisionAwaitedResponseMessage(err.toString(), 'e');
            this.updateDecisionNopndtErrorMessage = err.toString();
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
          this.router.navigateByUrl(`/app/counselling-pre-pndt/counselledno`);
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
          this.router.navigateByUrl(`/app/counselling-pre-pndt/counselledno`);
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
          this.router.navigateByUrl(`/app/counselling-pre-pndt/counselledno`);
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
