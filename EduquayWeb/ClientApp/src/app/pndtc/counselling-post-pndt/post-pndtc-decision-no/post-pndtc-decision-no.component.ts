import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { PndtMtpMasterResponse, dataModel } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master-response';
import { CounsellPostPndtRequest, AddPostPndtCounsellingRequest } from 'src/app/shared/pndtc/counsell-post-pndt/counsell-post-pndt-request';
import { CounselledpostpndtResponse, PostCounselledList, AddPostPndtcCounsellingResponse } from 'src/app/shared/pndtc/counsell-post-pndt/counsell-post-pndt-response';
import { user } from 'src/app/shared/auth-response';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { DataService } from 'src/app/shared/data.service';
import { PndtMtpMasterService } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master.service';
import { TokenService } from 'src/app/shared/token.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CounsellPostPndtService } from 'src/app/shared/pndtc/counsell-post-pndt/counsell-post-pndt.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { DateService } from 'src/app/shared/utility/date.service';

@Component({
  selector: 'app-post-pndtc-decision-no',
  templateUrl: './post-pndtc-decision-no.component.html',
  styleUrls: ['./post-pndtc-decision-no.component.css']
})
export class PostPndtcDecisionNoComponent implements OnInit {

    @ViewChild('pndtschedulePicker', { static: false }) pndtschedulePicker;
  
    postupdateDecisionNopndtErrorMessage: string;
    //masterdataErrorMessage: string;
  
    pndtmtpMasterResponse: PndtMtpMasterResponse;
    counsellednopostpndtRequest: CounsellPostPndtRequest;
    counsellednopostpndtResponse: CounselledpostpndtResponse;
    counsellednolists: PostCounselledList[] = [];
    addCounselledNoRequest: AddPostPndtCounsellingRequest;
    addCounselledNoResponse: AddPostPndtcCounsellingResponse;
    anwSubjectId: string;
    counselledNodataItem: PostCounselledList;
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
  anwCBCTestResult: string;
  anwSSTestResult: string;
  anwHPLCTestResult: string;
  spouseCBCTestResult: string;
  spouseSSTestResult: string;
  spouseHPLCTestResult: string;
  prePNDTCounsellingDateTime: string;
  prePNDTCounsellorName: string;
  prePNDTCounsellingRemarks: string;
  prePNDTCounsellingStatus: string;
  schedulePrePNDTDate: string;
  schedulePrePNDTTime: string;
  pndtDateTime: string;
  pndtObstetrician: string;
  pndtResults: string;
  foetalDisease: boolean;
  pndtCounsellorName: string;
  pndtDiagnosis: string;
  poatPNDTCounsellorName: string;
  postPNDTSchedulingId: number;
  counsellingRemarks: string;
  assignedObstetricianId: number;

  isMTPAgreeYes: boolean;
  isMTPAgreeNo: boolean;
  isMTPAgreePending: boolean;
    isSelectedYes: boolean;
    isSelectedNo: boolean;
    isSelectedPending: boolean;
    item: any;
    isDecisionYes: boolean = false;
    isDecisionawaited: boolean = false;
    remarksdata: string;
  
    /*Date Range configuration starts*/
    dateform: FormGroup;
    popupform: FormGroup;
    DAY = 86400000;
    dyCollectionDate: Date = new Date(Date.now());
    fixPndtSchedule: string;
    mtpscheduleDate: string;
    mtpscheduleTime: string;
    myRadio: string = '';
    confirmationSelected: boolean = false;
  
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
      private counsellednopostpndtService: CounsellPostPndtService,
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
      this.dataservice.sendData(JSON.stringify({ "module": "PNDTC Counsellor", "submodule": "Counselling – Post PNDT" }));
      this.InitializeDateRange();
      this.activatedRoute.queryParams.subscribe(params => {
        this.anwSubjectId = params['q'];
        this.retrivecounsellednolists();
      });
      // this.mtpscheduleDate = moment().format("DD/MM/YYYY");
      // this.mtpscheduleTime = moment().format("HH:mm");
      // this.dateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
      // this.dateOptions.minDate = moment().format("DD/MM/YYYY HH:mm");
  
      this.ddlobstetricianName();
    }
  
    retrivecounsellednolists() {
  
      this.loaderService.display(true);
      this.counsellednolists = [];
      this.postupdateDecisionNopndtErrorMessage = '';
      this.counsellednopostpndtRequest = {
        userId: this.user.id, districtId: 0,
        chcId: 0,
        phcId: 0,
        anmId: 0
      };
      let counselleddata = this.counsellednopostpndtService.getcounselledNoLists(this.counsellednopostpndtRequest)
        .subscribe(response => {
          this.counsellednopostpndtResponse = response;
          this.loaderService.display(false);
          if (this.counsellednopostpndtResponse !== null && this.counsellednopostpndtResponse.status === "true") {
            if (this.counsellednopostpndtResponse.data.length <= 0) {
              this.postupdateDecisionNopndtErrorMessage = response.message;
            }
            else {
              this.counselledNodataItem = this.counsellednopostpndtResponse.data.
                find(counselling => counselling.anwSubjectId === this.anwSubjectId);
                this.remarksdata = this.counselledNodataItem.postPNDTCounsellingRemarks;
                this.foetalDisease = this.counselledNodataItem.foetalDisease;
                this.isSelectedNo = this.counselledNodataItem.isMTPAgreeNo;
                this.isSelectedPending = this.counselledNodataItem.isMTPAgreePending;
              //this.counsellinglists = this.counsellednopostpndtResponse.data;
  
            }
          }
          else {
            this.postupdateDecisionNopndtErrorMessage = response.message;
          }
  
        },
          (err: HttpErrorResponse) => {
            this.postupdateDecisionNopndtErrorMessage = err.toString();
          });
    }
    ddlobstetricianName() {
  
      this.obstetricianlists = [];
      this.selectedobstetrician = '';
      this.postupdateDecisionNopndtErrorMessage = '';
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
            this.postupdateDecisionNopndtErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.postupdateDecisionNopndtErrorMessage = err.toString();
  
          });
    }
  
    onClick(radioBtnItem) {
  
      if (radioBtnItem == 'decisionyes') {
        this.isSelectedYes = true;
        this.isSelectedNo = false;
        this.isSelectedPending = false;
        this.isDecisionYes = true;
        this.isDecisionawaited = false;
        const regDate = this.dateservice.convertToDateTimeFormat(this.counselledNodataItem.pndtDateTime);
        this.dateOptions.minDate = regDate;
      }
      else if (radioBtnItem == 'decisionno') {
        this.isSelectedNo = true;
        this.isSelectedYes = false;
        this.isSelectedPending = false;
        this.isDecisionYes = false;
        this.isDecisionawaited = false;
      }
      else if (radioBtnItem == 'decisionpending') {
        this.isSelectedPending = true;
        this.isSelectedYes = false;
        this.isSelectedNo = false;
        this.isDecisionYes = false;
        this.isDecisionawaited = true;
      }
    }
    onSubmit(updatePostPndtnoForm: NgForm) {

      if (this.foetalDisease === true) {
        if (this.isSelectedYes === true || this.isMTPAgreeYes === true) {
          console.log(updatePostPndtnoForm.value);
          
        if(this.confirmationSelected == false){
          this.decisionYesResponseMessage('Please confirm if you have received & filed the consent form from Subject', 'e');
          return false;
        }
          this.counsellingRemarks = updatePostPndtnoForm.value.Remarks;
          this.assignedObstetricianId = updatePostPndtnoForm.value.DDLobstetrician;
          if((this.mtpscheduleDate === '' || this.mtpscheduleDate == undefined) && (this.mtpscheduleTime === '' || this.mtpscheduleTime == undefined)){
            this.decisionYesResponseMessage('Please choose Schedule MTP Service Date & Time', 'e');
            return false;
          }
  
          this.addCounselledNoRequest = {
            postPNDTSchedulingId: this.counselledNodataItem.postPNDTSchedulingId,
            anwsubjectId: this.counselledNodataItem.anwSubjectId,
            spouseSubjectId: this.counselledNodataItem.spouseSubjectId,
            counsellorId: this.counselledNodataItem.postPNDTCounsellorId,
            counsellingRemarks: this.counsellingRemarks,
            assignedObstetricianId: +(this.assignedObstetricianId),
            isMTPAgreeYes: this.isSelectedYes,
            isMTPAgreeNo: this.isSelectedNo,
            isMTPAgreePending: this.isSelectedPending,
            scheduleMTPDate: this.mtpscheduleDate,
            scheduleMTPTime: this.mtpscheduleTime,
            isFoetalDisease: this.counselledNodataItem.foetalDisease,
            userId: this.user.id,
          };
  
          //Remove below 2 lines after successfully tested
          // this.decisionYesResponseMessage('Successfully registered', 's');
          // return false;
  
          let addScheduleData = this.counsellednopostpndtService.AddpostpndtCounselling(this.addCounselledNoRequest)
            .subscribe(response => {
              this.addCounselledNoResponse = response;
              if (this.addCounselledNoResponse !== null && this.addCounselledNoResponse.status === "true") {
                this.decisionYesResponseMessage(this.addCounselledNoResponse.message, 's')
                //this.retrivescheduledlists();
                //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
              } else {
                this.decisionYesResponseMessage(this.addCounselledNoResponse.message, 'e');
                this.postupdateDecisionNopndtErrorMessage = response.message;
              }
  
            },
              (err: HttpErrorResponse) => {
                this.decisionYesResponseMessage(err.toString(), 'e');
                this.postupdateDecisionNopndtErrorMessage = err.toString();
              });
        }
        else if (this.isSelectedNo === true) {
          console.log(updatePostPndtnoForm.value);
  
          this.counsellingRemarks = updatePostPndtnoForm.value.Remarks;
          this.assignedObstetricianId = updatePostPndtnoForm.value.DDLobstetrician;
  
          this.addCounselledNoRequest = {
            postPNDTSchedulingId: this.counselledNodataItem.postPNDTSchedulingId,
            anwsubjectId: this.counselledNodataItem.anwSubjectId,
            spouseSubjectId: this.counselledNodataItem.spouseSubjectId,
            counsellorId: this.counselledNodataItem.postPNDTCounsellorId,
            counsellingRemarks: this.counsellingRemarks,
            assignedObstetricianId: 0,
            isMTPAgreeYes: this.isSelectedYes,
            isMTPAgreeNo: this.isSelectedNo,
            isMTPAgreePending: this.isSelectedPending,
            scheduleMTPDate: '',
            scheduleMTPTime: '',
            isFoetalDisease: this.counselledNodataItem.foetalDisease,
            userId: this.user.id,
          };
  
          //Remove below 2 lines after successfully tested
          // this.decisionNoResponseMessage('Successfully registered', 's');
          // return false;
  
          let addScheduleData = this.counsellednopostpndtService.AddpostpndtCounselling(this.addCounselledNoRequest)
            .subscribe(response => {
              this.addCounselledNoResponse = response;
              if (this.addCounselledNoResponse !== null && this.addCounselledNoResponse.status === "true") {
                this.decisionNoResponseMessage(this.addCounselledNoResponse.message, 's')
                //this.retrivescheduledlists();
                //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
              } else {
                this.decisionNoResponseMessage(this.addCounselledNoResponse.message, 'e');
                this.postupdateDecisionNopndtErrorMessage = response.message;
              }
  
            },
              (err: HttpErrorResponse) => {
                this.decisionNoResponseMessage(err.toString(), 'e');
                this.postupdateDecisionNopndtErrorMessage = err.toString();
              });
        }
        else if (this.isSelectedPending === true) {
          console.log(updatePostPndtnoForm.value);
  
          this.counsellingRemarks = updatePostPndtnoForm.value.Remarks;
          this.assignedObstetricianId = updatePostPndtnoForm.value.DDLobstetrician;
  
          this.addCounselledNoRequest = {
            postPNDTSchedulingId: this.counselledNodataItem.postPNDTSchedulingId,
            anwsubjectId: this.counselledNodataItem.anwSubjectId,
            spouseSubjectId: this.counselledNodataItem.spouseSubjectId,
            counsellorId: this.counselledNodataItem.postPNDTCounsellorId,
            counsellingRemarks: this.counsellingRemarks,
            assignedObstetricianId: 0,
            isMTPAgreeYes: this.isSelectedYes,
            isMTPAgreeNo: this.isSelectedNo,
            isMTPAgreePending: this.isSelectedPending,
            scheduleMTPDate: '',
            scheduleMTPTime: '',
            isFoetalDisease: this.counselledNodataItem.foetalDisease,
            userId: this.user.id,
          };
  
          //Remove below 2 lines after successfully tested
          // this.decisionAwaitedResponseMessage('Successfully registered', 's');
          // return false;
  
          let addScheduleData = this.counsellednopostpndtService.AddpostpndtCounselling(this.addCounselledNoRequest)
            .subscribe(response => {
              this.addCounselledNoResponse = response;
              if (this.addCounselledNoResponse !== null && this.addCounselledNoResponse.status === "true") {
                this.decisionAwaitedResponseMessage(this.addCounselledNoResponse.message, 's')
                //this.retrivescheduledlists();
                //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
              } else {
                this.decisionAwaitedResponseMessage(this.addCounselledNoResponse.message, 'e');
                this.postupdateDecisionNopndtErrorMessage = response.message;
              }
  
            },
              (err: HttpErrorResponse) => {
                this.decisionAwaitedResponseMessage(err.toString(), 'e');
                this.postupdateDecisionNopndtErrorMessage = err.toString();
              });
        }
        else {
          this.decisionAwaitedResponseMessage(`Please update the couple's decision on MTP`, 'e');
        }
      }
      else if (this.foetalDisease === false) {
        console.log(updatePostPndtnoForm.value);
  
        this.counsellingRemarks = updatePostPndtnoForm.value.Remarks;
  
        this.addCounselledNoRequest = {
          postPNDTSchedulingId: this.counselledNodataItem.postPNDTSchedulingId,
          anwsubjectId: this.counselledNodataItem.anwSubjectId,
          spouseSubjectId: this.counselledNodataItem.spouseSubjectId,
          counsellorId: this.counselledNodataItem.postPNDTCounsellorId,
          counsellingRemarks: this.counsellingRemarks,
          assignedObstetricianId: 0,
          isMTPAgreeYes: false,
          isMTPAgreeNo: false,
          isMTPAgreePending: false,
          scheduleMTPDate: '',
          scheduleMTPTime: '',
          isFoetalDisease: this.counselledNodataItem.foetalDisease,
          userId: this.user.id,
        };
  
        //Remove below 2 lines after successfully tested
        // this.foetusnormalResponseMessage('Successfully registered', 's');
        // return false;
  
        let addScheduleData = this.counsellednopostpndtService.AddpostpndtCounselling(this.addCounselledNoRequest)
          .subscribe(response => {
            this.addCounselledNoResponse = response;
            if (this.addCounselledNoResponse !== null && this.addCounselledNoResponse.status === "true") {
              this.foetusnormalResponseMessage(this.addCounselledNoResponse.message, 's')
              //this.retrivescheduledlists();
              //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
            } else {
              this.foetusnormalResponseMessage(this.addCounselledNoResponse.message, 'e');
              this.postupdateDecisionNopndtErrorMessage = response.message;
            }
  
          },
            (err: HttpErrorResponse) => {
              this.foetusnormalResponseMessage(err.toString(), 'e');
              this.postupdateDecisionNopndtErrorMessage = err.toString();
            });
      }
    }
  
    decisionYesResponseMessage(message: string, type: string) {
      var messageType = '';
      var title = `Post-PNDT scheduled successfully on ${this.mtpscheduleDate} at ${this.mtpscheduleTime}`;
      if (type === 'e') {
        Swal.fire({ icon: 'error', title: message, confirmButtonText: 'Ok', allowOutsideClick: false })
      }
      else {
        Swal.fire({ icon: 'success', title: title, confirmButtonText: 'Ok', allowOutsideClick: false })
        .then((result) => {
          if (result.value) {
            this.router.navigateByUrl(`/app/counselling-post-pndt/counselledno`);
          }
        });
      }
    }
    decisionNoResponseMessage(message: string, type: string) {
      var messageType = '';
      var title = `Post-PNDT Counselling completed successfully`;
      if (type === 'e') {
        Swal.fire({ icon: 'error', title: message, confirmButtonText: 'Ok', allowOutsideClick: false })
      }
      else {
        Swal.fire({ icon: 'success', title: title, confirmButtonText: 'Ok', allowOutsideClick: false })
        .then((result) => {
          if (result.value) {
            this.router.navigateByUrl(`/app/counselling-post-pndt/counselledno`);
          }
        });
      }
    }
    decisionAwaitedResponseMessage(message: string, type: string) {
      var messageType = '';
      var title = `Post-PNDT Counselling completed successfully`;
      if (type === 'e') {
        Swal.fire({ icon: 'error', title: message, confirmButtonText: 'Ok', allowOutsideClick: false })
      }
      else {
        Swal.fire({ icon: 'success', title: title, confirmButtonText: 'Ok', allowOutsideClick: false })
        .then((result) => {
          if (result.value) {
            this.router.navigateByUrl(`/app/counselling-post-pndt/counselledno`);
          }
        });
      }
    }
    foetusnormalResponseMessage(message: string, type: string) {
      var messageType = '';
      var title = `Post-PNDT Counselling completed successfully`;
      if (type === 'e') {
        Swal.fire({ icon: 'error', title: message, confirmButtonText: 'Ok', allowOutsideClick: false })
      }
      else {
        Swal.fire({ icon: 'success', title: title, confirmButtonText: 'Ok', allowOutsideClick: false })
          .then((result) => {
            if (result.value) {
              this.router.navigateByUrl(`/app/counselling-post-pndt/counselledno`);
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
        this.mtpscheduleDate = moment(new Date(selectedDate2)).format("DD/MM/YYYY");
        this.mtpscheduleTime = moment(new Date(selectedDate2)).format("HH:mm");
      });
  
    }
  
  
  
  }
