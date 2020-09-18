import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CounsellPrePndtResquest, AddPrePndtCounsellingRequest } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt-resquest';
import { CounsellPrePndtResponse, CounsellingList, AddPrePndtcCounsellingResponse } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt-response';
import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { CounsellPrePndtService } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt.service';
import { TokenService } from 'src/app/shared/token.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PndtMtpMasterResponse, dataModel } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master-response';
import { PndtMtpMasterService } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master.service';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { DateService } from 'src/app/shared/utility/date.service';

@Component({
  selector: 'app-update-detail-testresults',
  templateUrl: './update-detail-testresults.component.html',
  styleUrls: ['./update-detail-testresults.component.css']
})
export class UpdateDetailTestresultsComponent implements OnInit {

  @ViewChild('pndtschedulePicker', { static: false }) pndtschedulePicker;

  updatepndtcErrorMessage: string;
  //masterdataErrorMessage: string;

  pndtmtpMasterResponse: PndtMtpMasterResponse;
  counsellingprepndtRequest: CounsellPrePndtResquest;
  counsellingprepndtResponse: CounsellPrePndtResponse;
  addCounsellingRequest: AddPrePndtCounsellingRequest;
  addCounsellingResponse: AddPrePndtcCounsellingResponse;
  counsellinglists: CounsellingList[] = [];
  anwSubjectId: string;
  counsellingdataItem: CounsellingList;
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
  confirmationSelected: boolean = false;

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
    //defaultDate: new Date(Date.now()),
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
    private counsellingprepndtService: CounsellPrePndtService,
    private tokenService: TokenService,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private router: Router,
    private dateservice: DateService
  ) { }

  ngOnInit() {

    this.loaderService.display(false);
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.dataservice.sendData(JSON.stringify({ "module": "PNDTC Counsellor", "submodule": "Counselling – Pre PNDT" }));
    this.InitializeDateRange();
    this.activatedRoute.queryParams.subscribe(params => {
      this.anwSubjectId = params['q'];
      this.retrivecounselledlists();
    });
    // this.pndtscheduleDate = moment().format("DD/MM/YYYY");
    // this.pndtscheduleTime = moment().format("HH:mm");
    // this.dateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
    // this.dateOptions.minDate = moment().format("DD/MM/YYYY HH:mm");


    this.ddlobstetricianName();
  }

  retrivecounselledlists() {

    this.loaderService.display(true);
    this.counsellinglists = [];
    this.updatepndtcErrorMessage = '';
    this.counsellingprepndtRequest = {
      userId: this.user.id, districtId: 0,
      chcId: 0,
      phcId: 0,
      anmId: 0
    };
    let counsellingdata = this.counsellingprepndtService.getcounsellingLists(this.counsellingprepndtRequest)
      .subscribe(response => {
        this.counsellingprepndtResponse = response;
        this.loaderService.display(false);
        if (this.counsellingprepndtResponse !== null && this.counsellingprepndtResponse.status === "true") {
          if (this.counsellingprepndtResponse.data.length <= 0) {
            this.updatepndtcErrorMessage = response.message;
          }
          else {
            this.counsellingdataItem = this.counsellingprepndtResponse.data.
              find(counselling => counselling.anwSubjectId === this.anwSubjectId);
            //this.counsellinglists = this.counsellingprepndtResponse.data;
              //this.pndtscheduleDate = moment().format("DD/MM/YYYY");
              //this.pndtscheduleTime = moment().format("HH:mm");
              //this.dateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
              //var pattern = /(\d{2})\/(\d{2})\/(\d{4})\ (\d{2})\:(\d{2})/;
              const regDate = this.dateservice.convertToDateTimeFormat(this.counsellingdataItem.counsellingDateTime);
              this.dateOptions.minDate = regDate;

          }
        }
        else {
          this.updatepndtcErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.updatepndtcErrorMessage = err.toString();
        });
  }

  ddlobstetricianName() {

    this.obstetricianlists = [];
    this.selectedobstetrician = '';
    this.updatepndtcErrorMessage = '';
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
          this.updatepndtcErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.updatepndtcErrorMessage = err.toString();

        });
  }

  onClick(radioBtnItem) {

    if (radioBtnItem == 'decisionyes') {
      this.isSelectedYes = true;
      this.isSelectedNo = false;
      this.isSelectedPending = false;
      this.isDecisionYes = true;
    }
    else if (radioBtnItem == 'decisionno') {
      this.isSelectedNo = true;
      this.isSelectedYes = false;
      this.isSelectedPending = false;
      this.isDecisionYes = false;
    }
    else if (radioBtnItem == 'decisionpending') {
      this.isSelectedPending = true;
      this.isSelectedYes = false;
      this.isSelectedNo = false;
      this.isDecisionYes = false;
    }
  }

  checkIfSelected(){
    
    this.confirmationSelected = true;
    console.log(this.confirmationSelected);
    // //console.log(this.sampleList);
    // this.selectedAll = this.counselledyeslists.every(function (item: any) {
    //   return item.confirmationSelected = true;
    // })
  }

  onSubmit(updatePndtForm: NgForm) {

    if (this.isSelectedYes === true) {
      console.log(updatePndtForm.value);
      
      if(this.confirmationSelected == false){
        this.decisionYesResponseMessage('Please confirm if you have received & filed the consent form from Subject', 'e');
        return false;
      }
      this.counsellingRemarks = updatePndtForm.value.Remarks;
      this.assignedObstetricianId = updatePndtForm.value.DDLobstetrician;

      if((this.pndtscheduleDate === '' || this.pndtscheduleDate == undefined) && (this.pndtscheduleTime === '' || this.pndtscheduleTime == undefined)){
        this.decisionYesResponseMessage('Please choose Schedule PNDT Date & Time', 'e');
        return false;
      }

      this.addCounsellingRequest = {
        prePNDTSchedulingId: this.counsellingdataItem.schedulingId,
        anwsubjectId: this.counsellingdataItem.anwSubjectId,
        spouseSubjectId: this.counsellingdataItem.spouseSubjectId,
        counsellorId: this.counsellingdataItem.counsellorId,
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

      let addScheduleData = this.counsellingprepndtService.AddprepndtCounselling(this.addCounsellingRequest)
        .subscribe(response => {
          this.addCounsellingResponse = response;
          if (this.addCounsellingResponse !== null && this.addCounsellingResponse.status === "true") {
            this.decisionYesResponseMessage(this.addCounsellingResponse.message, 's')
            //this.retrivescheduledlists();
            //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
          } else {
            this.decisionYesResponseMessage(this.addCounsellingResponse.message, 'e');
            this.updatepndtcErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.decisionYesResponseMessage(err.toString(), 'e');
            this.updatepndtcErrorMessage = err.toString();
          });
    }
    else if (this.isSelectedNo === true) {
      console.log(updatePndtForm.value);

      this.counsellingRemarks = updatePndtForm.value.Remarks;
      this.assignedObstetricianId = updatePndtForm.value.DDLobstetrician;

      this.addCounsellingRequest = {
        prePNDTSchedulingId: this.counsellingdataItem.schedulingId,
        anwsubjectId: this.counsellingdataItem.anwSubjectId,
        spouseSubjectId: this.counsellingdataItem.spouseSubjectId,
        counsellorId: this.counsellingdataItem.counsellorId,
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
      // this.showResponseMessage('Successfully registered', 's');
      // return false;

      let addScheduleData = this.counsellingprepndtService.AddprepndtCounselling(this.addCounsellingRequest)
        .subscribe(response => {
          this.addCounsellingResponse = response;
          if (this.addCounsellingResponse !== null && this.addCounsellingResponse.status === "true") {
            this.decisionNoResponseMessage(this.addCounsellingResponse.message, 's')
            //this.retrivescheduledlists();
            //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
          } else {
            this.decisionNoResponseMessage(this.addCounsellingResponse.message, 'e');
            this.updatepndtcErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.decisionNoResponseMessage(err.toString(), 'e');
            this.updatepndtcErrorMessage = err.toString();
          });
    }
    else if (this.isSelectedPending === true) {
      console.log(updatePndtForm.value);

      this.counsellingRemarks = updatePndtForm.value.Remarks;
      this.assignedObstetricianId = updatePndtForm.value.DDLobstetrician;

      this.addCounsellingRequest = {
        prePNDTSchedulingId: this.counsellingdataItem.schedulingId,
        anwsubjectId: this.counsellingdataItem.anwSubjectId,
        spouseSubjectId: this.counsellingdataItem.spouseSubjectId,
        counsellorId: this.counsellingdataItem.counsellorId,
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
      // this.showResponseMessage('Successfully registered', 's');
      // return false;

      let addScheduleData = this.counsellingprepndtService.AddprepndtCounselling(this.addCounsellingRequest)
        .subscribe(response => {
          this.addCounsellingResponse = response;
          if (this.addCounsellingResponse !== null && this.addCounsellingResponse.status === "true") {
            this.decisionAwaitedResponseMessage(this.addCounsellingResponse.message, 's')
            //this.retrivescheduledlists();
            //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
          } else {
            this.decisionAwaitedResponseMessage(this.addCounsellingResponse.message, 'e');
            this.updatepndtcErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.decisionAwaitedResponseMessage(err.toString(), 'e');
            this.updatepndtcErrorMessage = err.toString();
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
          this.router.navigateByUrl(`/app/counselling-pre-pndt`);
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
          this.router.navigateByUrl(`/app/counselling-pre-pndt`);
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
          this.router.navigateByUrl(`/app/counselling-pre-pndt`);
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
