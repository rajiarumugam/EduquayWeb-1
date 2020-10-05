import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { PndtMtpMasterResponse, dataModel } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master-response';
import { CounsellPostPndtRequest, AddPostPndtCounsellingRequest } from 'src/app/shared/pndtc/counsell-post-pndt/counsell-post-pndt-request';
import { CounselledpostpndtResponse, PostCounselledList, AddPostPndtcCounsellingResponse, postPndtFileUploadResponse, PostFileDetails } from 'src/app/shared/pndtc/counsell-post-pndt/counsell-post-pndt-response';
import { user } from 'src/app/shared/auth-response';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { DataService } from 'src/app/shared/data.service';
import { PndtMtpMasterService } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master.service';
import { CounsellPostPndtService } from 'src/app/shared/pndtc/counsell-post-pndt/counsell-post-pndt.service';
import { TokenService } from 'src/app/shared/token.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DateService } from 'src/app/shared/utility/date.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-post-pndtc-decision-yes',
  templateUrl: './post-pndtc-decision-yes.component.html',
  styleUrls: ['./post-pndtc-decision-yes.component.css']
})
export class PostPndtcDecisionYesComponent implements OnInit {

  @ViewChild('mtpschedulePicker', { static: false }) mtpschedulePicker;

  postupdateDecisionYespndtErrorMessage: string;
  //masterdataErrorMessage: string;

  pndtmtpMasterResponse: PndtMtpMasterResponse;
  counselledyesprepndtRequest: CounsellPostPndtRequest;
  counselledyesprepndtResponse: CounselledpostpndtResponse;
  counselledyeslists: PostCounselledList[] = [];
  addCounselledyesRequest: AddPostPndtCounsellingRequest;
  addCounselledyesResponse: AddPostPndtcCounsellingResponse;
  anwSubjectId: string;
  counselledYesdataItem: PostCounselledList;
  selectedobstetrician: string = '';
  obstetricianlists: dataModel[] = [];
  user: user;
  postPndtFileUploadResponse: postPndtFileUploadResponse;
  prePNDTCFileDetails: PostFileDetails;
  fileName: string;
  file: File;
  postPndtcFileName: string;
  postPndtcFileLocation: string;
  consentForm: File;

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
  isDecisionYes: boolean = true;
  remarksdata: string;
  DDLobstetrician: string;

  /*Date Range configuration starts*/
  dateform: FormGroup;
  popupform: FormGroup;
  DAY = 86400000;
  dyCollectionDate: Date = new Date(Date.now());
  fixMtpSchedule: string;
  mtpscheduleDate: string;
  mtpscheduleTime: string;
  myRadio: string = '';
  selecteddata: any;
  testdate: Date;
  selectedscheduledate: Date;
  confirmationSelected: boolean = true;

  dateOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y H:i',
    //defaultDate: new Date(Date.now()),
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
    private counselledyespostpndtService: CounsellPostPndtService,
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
    this.dataservice.sendData(JSON.stringify({ "module": "PNDTC Counsellor", "submodule": "Counselling – Post PNDT" }));
    this.InitializeDateRange();
    this.activatedRoute.queryParams.subscribe(params => {
      this.anwSubjectId = params['q'];
      this.retrivecounselledyeslists();

    });

    this.ddlmtpobstetricianName();
    //this.onClick('decisionyes');

  }

  retrivecounselledyeslists() {

    this.loaderService.display(true);
    this.counselledyeslists = [];
    this.postupdateDecisionYespndtErrorMessage = '';
    this.counselledyesprepndtRequest = {
      userId: this.user.id, districtId: 0,
      chcId: 0,
      phcId: 0,
      anmId: 0
    };
    let counselleddata = this.counselledyespostpndtService.getcounselledYesLists(this.counselledyesprepndtRequest)
      .subscribe(response => {
        this.counselledyesprepndtResponse = response;
        this.loaderService.display(false);
        if (this.counselledyesprepndtResponse !== null && this.counselledyesprepndtResponse.status === "true") {
          if (this.counselledyesprepndtResponse.data.length <= 0) {
            this.postupdateDecisionYespndtErrorMessage = response.message;
          }
          else {
            this.counselledYesdataItem = this.counselledyesprepndtResponse.data.
              find(counselling => counselling.anwSubjectId === this.anwSubjectId);
            this.remarksdata = this.counselledYesdataItem.postPNDTCounsellingRemarks;
            this.selectedobstetrician = this.counselledYesdataItem.postPNDTObstetricianId.toString();
            this.isSelectedYes = this.counselledYesdataItem.isMTPAgreeYes;
            this.isSelectedNo = this.counselledYesdataItem.isMTPAgreeNo;
            this.isSelectedPending = this.counselledYesdataItem.isMTPAgreePending;
            this.foetalDisease = this.counselledYesdataItem.foetalDisease;
            // const regDate = this.dateservice.convertToDateTimeFormat(this.counselledYesdataItem.postPNDTCounsellingDateTime);
            // this.mtpschedulePicker.flatpickr.set({
            //   minDate: regDate
            // });
            // this.dateOptions.minDate = regDate;
           // this.mtpscheduleDate = moment().format("DD/MM/YYYY");
            //this.mtpscheduleTime = moment().format("HH:mm");

            //this.dateOptions.defaultDate = this.selectedscheduledate ;// moment(this.selectedscheduledate).format("DD/MM/YYYY HH:mm");
            //this.dateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
            //this.dateOptions.minDate = moment().format("DD/MM/YYYY HH:mm");

            //this.counsellinglists = this.counselledyesprepndtResponse.data;

          }
        }
        else {
          this.postupdateDecisionYespndtErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.postupdateDecisionYespndtErrorMessage = err.toString();
        });
  }



  ddlmtpobstetricianName() {

    this.obstetricianlists = [];
    this.selectedobstetrician = '';
    this.postupdateDecisionYespndtErrorMessage = '';
    this.pndtmtpMasterService.getmtpobstetricianName()
      .subscribe(response => {
        this.pndtmtpMasterResponse = response;
        if (this.pndtmtpMasterResponse !== null && this.pndtmtpMasterResponse.status === "true") {
          this.obstetricianlists = this.pndtmtpMasterResponse.data;
          // if (this.obstetricianlists.length > 0) {
          //   this.selectedobstetrician = this.obstetricianlists[0].id.toString();
          // }
        }
        else {
          this.postupdateDecisionYespndtErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.postupdateDecisionYespndtErrorMessage = err.toString();

        });
  }

  onClick(radioBtnItem) {

    if (radioBtnItem == 'decisionyes') {
      this.isSelectedYes = true;
      this.isSelectedNo = false;
      this.isSelectedPending = false;
      this.isDecisionYes = true;
      // const regDate = this.dateservice.convertToDateTimeFormat(this.counselledYesdataItem.postPNDTCounsellingDateTime);
      // this.dateOptions.minDate = regDate;
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

  onSubmit(updatePostPndtyesForm: NgForm) {

    if (this.foetalDisease === true) {
      if (this.isSelectedYes === true || this.isMTPAgreeYes === true) {
        console.log(updatePostPndtyesForm.value);
        const formData = new FormData();
        if (formData === undefined || this.counselledYesdataItem.fileName === '') {
          if (this.confirmationSelected == false) {
            this.decisionYesResponseMessage('Please confirm if you have received & filed the consent form from Subject', 'e');
            return false;
          }
          if ((this.mtpscheduleDate === '' || this.mtpscheduleDate == undefined) && (this.mtpscheduleTime === '' || this.mtpscheduleTime == undefined)) {

            this.counsellingRemarks = updatePostPndtyesForm.value.Remarks;
            this.assignedObstetricianId = updatePostPndtyesForm.value.DDLobstetrician;
            this.addCounselledyesRequest = {
              postPNDTSchedulingId: this.counselledYesdataItem.postPNDTSchedulingId,
              anwsubjectId: this.counselledYesdataItem.anwSubjectId,
              spouseSubjectId: this.counselledYesdataItem.spouseSubjectId,
              counsellorId: this.counselledYesdataItem.postPNDTCounsellorId,
              counsellingRemarks: this.counsellingRemarks,
              assignedObstetricianId: +(this.assignedObstetricianId),
              isMTPAgreeYes: this.isSelectedYes,
              isMTPAgreeNo: this.isSelectedNo,
              isMTPAgreePending: this.isSelectedPending,
              scheduleMTPDate: this.counselledYesdataItem.mtpScheduleDate,
              scheduleMTPTime: this.counselledYesdataItem.mtpScheduleTime,
              isFoetalDisease: this.counselledYesdataItem.foetalDisease,
              userId: this.user.id,
              fileName: null,
              fileLocation: null
            };

            //Remove below 2 lines after successfully tested
            // this.decisionYesResponseMessage('Successfully registered', 's');
            // return false;

            let addScheduleData = this.counselledyespostpndtService.AddpostpndtCounselling(this.addCounselledyesRequest)
              .subscribe(response => {
                this.addCounselledyesResponse = response;
                if (this.addCounselledyesResponse !== null && this.addCounselledyesResponse.status === "true") {
                  this.decisionUpdateResponseMessage(this.addCounselledyesResponse.message, 's')
                  //this.retrivescheduledlists();
                  //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
                } else {
                  this.decisionUpdateResponseMessage(this.addCounselledyesResponse.message, 'e');
                  this.postupdateDecisionYespndtErrorMessage = response.message;
                }

              },
                (err: HttpErrorResponse) => {
                  this.decisionUpdateResponseMessage(err.toString(), 'e');
                  this.postupdateDecisionYespndtErrorMessage = err.toString();
                });
          }

          else {

            this.counsellingRemarks = updatePostPndtyesForm.value.Remarks;
            this.assignedObstetricianId = updatePostPndtyesForm.value.DDLobstetrician;
            this.addCounselledyesRequest = {
              postPNDTSchedulingId: this.counselledYesdataItem.postPNDTSchedulingId,
              anwsubjectId: this.counselledYesdataItem.anwSubjectId,
              spouseSubjectId: this.counselledYesdataItem.spouseSubjectId,
              counsellorId: this.counselledYesdataItem.postPNDTCounsellorId,
              counsellingRemarks: this.counsellingRemarks,
              assignedObstetricianId: +(this.assignedObstetricianId),
              isMTPAgreeYes: this.isSelectedYes,
              isMTPAgreeNo: this.isSelectedNo,
              isMTPAgreePending: this.isSelectedPending,
              scheduleMTPDate: this.mtpscheduleDate,
              scheduleMTPTime: this.mtpscheduleTime,
              isFoetalDisease: this.counselledYesdataItem.foetalDisease,
              userId: this.user.id,
              fileName: null,
              fileLocation: null
            };

            //Remove below 2 lines after successfully tested
            // this.decisionYesResponseMessage('Successfully registered', 's');
            // return false;

            let addScheduleData = this.counselledyespostpndtService.AddpostpndtCounselling(this.addCounselledyesRequest)
              .subscribe(response => {
                this.addCounselledyesResponse = response;
                if (this.addCounselledyesResponse !== null && this.addCounselledyesResponse.status === "true") {
                  this.decisionYesResponseMessage(this.addCounselledyesResponse.message, 's')
                  //this.retrivescheduledlists();
                  //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
                } else {
                  this.decisionYesResponseMessage(this.addCounselledyesResponse.message, 'e');
                  this.postupdateDecisionYespndtErrorMessage = response.message;
                }

              },
                (err: HttpErrorResponse) => {
                  this.decisionYesResponseMessage(err.toString(), 'e');
                  this.postupdateDecisionYespndtErrorMessage = err.toString();
                });
          }
        }
        else if (this.counselledYesdataItem.fileName != '') {
          if (this.confirmationSelected == false) {
            this.decisionYesResponseMessage('Please confirm if you have received & filed the consent form from Subject', 'e');
            return false;
          }
          if ((this.mtpscheduleDate === '' || this.mtpscheduleDate == undefined) && (this.mtpscheduleTime === '' || this.mtpscheduleTime == undefined)) {

            this.counsellingRemarks = updatePostPndtyesForm.value.Remarks;
            this.assignedObstetricianId = updatePostPndtyesForm.value.DDLobstetrician;
            this.addCounselledyesRequest = {
              postPNDTSchedulingId: this.counselledYesdataItem.postPNDTSchedulingId,
              anwsubjectId: this.counselledYesdataItem.anwSubjectId,
              spouseSubjectId: this.counselledYesdataItem.spouseSubjectId,
              counsellorId: this.counselledYesdataItem.postPNDTCounsellorId,
              counsellingRemarks: this.counsellingRemarks,
              assignedObstetricianId: +(this.assignedObstetricianId),
              isMTPAgreeYes: this.isSelectedYes,
              isMTPAgreeNo: this.isSelectedNo,
              isMTPAgreePending: this.isSelectedPending,
              scheduleMTPDate: this.counselledYesdataItem.mtpScheduleDate,
              scheduleMTPTime: this.counselledYesdataItem.mtpScheduleTime,
              isFoetalDisease: this.counselledYesdataItem.foetalDisease,
              userId: this.user.id,
              fileName: this.counselledYesdataItem.fileName,
              fileLocation: this.counselledYesdataItem.fileLocation
            };

            //Remove below 2 lines after successfully tested
            // this.decisionYesResponseMessage('Successfully registered', 's');
            // return false;

            let addScheduleData = this.counselledyespostpndtService.AddpostpndtCounselling(this.addCounselledyesRequest)
              .subscribe(response => {
                this.addCounselledyesResponse = response;
                if (this.addCounselledyesResponse !== null && this.addCounselledyesResponse.status === "true") {
                  this.decisionUpdateResponseMessage(this.addCounselledyesResponse.message, 's')
                  //this.retrivescheduledlists();
                  //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
                } else {
                  this.decisionUpdateResponseMessage(this.addCounselledyesResponse.message, 'e');
                  this.postupdateDecisionYespndtErrorMessage = response.message;
                }

              },
                (err: HttpErrorResponse) => {
                  this.decisionUpdateResponseMessage(err.toString(), 'e');
                  this.postupdateDecisionYespndtErrorMessage = err.toString();
                });
          }

          else {

            this.counsellingRemarks = updatePostPndtyesForm.value.Remarks;
            this.assignedObstetricianId = updatePostPndtyesForm.value.DDLobstetrician;
            this.addCounselledyesRequest = {
              postPNDTSchedulingId: this.counselledYesdataItem.postPNDTSchedulingId,
              anwsubjectId: this.counselledYesdataItem.anwSubjectId,
              spouseSubjectId: this.counselledYesdataItem.spouseSubjectId,
              counsellorId: this.counselledYesdataItem.postPNDTCounsellorId,
              counsellingRemarks: this.counsellingRemarks,
              assignedObstetricianId: +(this.assignedObstetricianId),
              isMTPAgreeYes: this.isSelectedYes,
              isMTPAgreeNo: this.isSelectedNo,
              isMTPAgreePending: this.isSelectedPending,
              scheduleMTPDate: this.mtpscheduleDate,
              scheduleMTPTime: this.mtpscheduleTime,
              isFoetalDisease: this.counselledYesdataItem.foetalDisease,
              userId: this.user.id,
              fileName: this.counselledYesdataItem.fileName,
              fileLocation: this.counselledYesdataItem.fileLocation
            };

            //Remove below 2 lines after successfully tested
            // this.decisionYesResponseMessage('Successfully registered', 's');
            // return false;

            let addScheduleData = this.counselledyespostpndtService.AddpostpndtCounselling(this.addCounselledyesRequest)
              .subscribe(response => {
                this.addCounselledyesResponse = response;
                if (this.addCounselledyesResponse !== null && this.addCounselledyesResponse.status === "true") {
                  this.decisionYesResponseMessage(this.addCounselledyesResponse.message, 's')
                  //this.retrivescheduledlists();
                  //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
                } else {
                  this.decisionYesResponseMessage(this.addCounselledyesResponse.message, 'e');
                  this.postupdateDecisionYespndtErrorMessage = response.message;
                }

              },
                (err: HttpErrorResponse) => {
                  this.decisionYesResponseMessage(err.toString(), 'e');
                  this.postupdateDecisionYespndtErrorMessage = err.toString();
                });
          }
        }
        else {
          formData.append('ConsentForm', this.consentForm, this.consentForm.name);
          console.log(formData);
          this.counselledyespostpndtService.prePNDTuploadFile(formData)
            .subscribe(response => {
              this.postPndtFileUploadResponse = response;
              if (this.postPndtFileUploadResponse !== null && this.postPndtFileUploadResponse.status === "true") {
                this.prePNDTCFileDetails = this.postPndtFileUploadResponse.data;
                this.postPndtcFileName = this.prePNDTCFileDetails.fileName;
                this.postPndtcFileLocation = this.prePNDTCFileDetails.fileLocation;

                if (this.postPndtcFileLocation === '' || this.postPndtcFileLocation === undefined) {
                  this.decisionAwaitedResponseMessage('Please choose a file', 'e');
                  return false;
                }
                if (this.confirmationSelected == false) {
                  this.decisionYesResponseMessage('Please confirm if you have received & filed the consent form from Subject', 'e');
                  return false;
                }

                if ((this.mtpscheduleDate === '' || this.mtpscheduleDate == undefined) && (this.mtpscheduleTime === '' || this.mtpscheduleTime == undefined)) {
                  this.counsellingRemarks = updatePostPndtyesForm.value.Remarks;
                  this.assignedObstetricianId = updatePostPndtyesForm.value.DDLobstetrician;
                  this.addCounselledyesRequest = {
                    postPNDTSchedulingId: this.counselledYesdataItem.postPNDTSchedulingId,
                    anwsubjectId: this.counselledYesdataItem.anwSubjectId,
                    spouseSubjectId: this.counselledYesdataItem.spouseSubjectId,
                    counsellorId: this.counselledYesdataItem.postPNDTCounsellorId,
                    counsellingRemarks: this.counsellingRemarks,
                    assignedObstetricianId: +(this.assignedObstetricianId),
                    isMTPAgreeYes: this.isSelectedYes,
                    isMTPAgreeNo: this.isSelectedNo,
                    isMTPAgreePending: this.isSelectedPending,
                    scheduleMTPDate: this.counselledYesdataItem.mtpScheduleDate,
                    scheduleMTPTime: this.counselledYesdataItem.mtpScheduleTime,
                    isFoetalDisease: this.counselledYesdataItem.foetalDisease,
                    userId: this.user.id,
                    fileName: this.postPndtcFileName,
                    fileLocation: this.postPndtcFileLocation
                  };

                  //Remove below 2 lines after successfully tested
                  // this.decisionYesResponseMessage('testing Successfully registered', 's');
                  // return false;

                  let addScheduleData = this.counselledyespostpndtService.AddpostpndtCounselling(this.addCounselledyesRequest)
                    .subscribe(response => {
                      this.addCounselledyesResponse = response;
                      if (this.addCounselledyesResponse !== null && this.addCounselledyesResponse.status === "true") {
                        this.decisionUpdateResponseMessage(this.addCounselledyesResponse.message, 's')
                        //this.retrivescheduledlists();
                        //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
                      } else {
                        this.decisionUpdateResponseMessage(this.addCounselledyesResponse.message, 'e');
                        this.postupdateDecisionYespndtErrorMessage = response.message;
                      }

                    },
                      (err: HttpErrorResponse) => {
                        this.decisionUpdateResponseMessage(err.toString(), 'e');
                        this.postupdateDecisionYespndtErrorMessage = err.toString();
                      });
                }

                else {
                  this.addCounselledyesRequest = {
                    postPNDTSchedulingId: this.counselledYesdataItem.postPNDTSchedulingId,
                    anwsubjectId: this.counselledYesdataItem.anwSubjectId,
                    spouseSubjectId: this.counselledYesdataItem.spouseSubjectId,
                    counsellorId: this.counselledYesdataItem.postPNDTCounsellorId,
                    counsellingRemarks: this.counsellingRemarks,
                    assignedObstetricianId: +(this.assignedObstetricianId),
                    isMTPAgreeYes: this.isSelectedYes,
                    isMTPAgreeNo: this.isSelectedNo,
                    isMTPAgreePending: this.isSelectedPending,
                    scheduleMTPDate: this.counselledYesdataItem.mtpScheduleDate,
                    scheduleMTPTime: this.counselledYesdataItem.mtpScheduleTime,
                    isFoetalDisease: this.counselledYesdataItem.foetalDisease,
                    userId: this.user.id,
                    fileName: this.postPndtcFileName,
                    fileLocation: this.postPndtcFileLocation
                  };

                  //Remove below 2 lines after successfully tested
                  // this.decisionYesResponseMessage('testing Successfully registered', 's');
                  // return false;

                  let addScheduleData = this.counselledyespostpndtService.AddpostpndtCounselling(this.addCounselledyesRequest)
                    .subscribe(response => {
                      this.addCounselledyesResponse = response;
                      if (this.addCounselledyesResponse !== null && this.addCounselledyesResponse.status === "true") {
                        this.decisionUpdateResponseMessage(this.addCounselledyesResponse.message, 's')
                        //this.retrivescheduledlists();
                        //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
                      } else {
                        this.decisionUpdateResponseMessage(this.addCounselledyesResponse.message, 'e');
                        this.postupdateDecisionYespndtErrorMessage = response.message;
                      }

                    },
                      (err: HttpErrorResponse) => {
                        this.decisionUpdateResponseMessage(err.toString(), 'e');
                        this.postupdateDecisionYespndtErrorMessage = err.toString();
                      });
                }


              }
              else {
                this.postupdateDecisionYespndtErrorMessage = response.message;
              }
            },
              (err: HttpErrorResponse) => {
                this.decisionYesResponseMessage(err.toString(), 'e');
                this.postupdateDecisionYespndtErrorMessage = err.toString();

              });

        }
      }
      else if (this.isSelectedNo === true) {
        console.log(updatePostPndtyesForm.value);

        this.counsellingRemarks = updatePostPndtyesForm.value.Remarks;
        this.assignedObstetricianId = updatePostPndtyesForm.value.DDLobstetrician;

        this.addCounselledyesRequest = {
          postPNDTSchedulingId: this.counselledYesdataItem.postPNDTSchedulingId,
          anwsubjectId: this.counselledYesdataItem.anwSubjectId,
          spouseSubjectId: this.counselledYesdataItem.spouseSubjectId,
          counsellorId: this.counselledYesdataItem.postPNDTCounsellorId,
          counsellingRemarks: this.counsellingRemarks,
          assignedObstetricianId: 0,
          isMTPAgreeYes: this.isSelectedYes,
          isMTPAgreeNo: this.isSelectedNo,
          isMTPAgreePending: this.isSelectedPending,
          scheduleMTPDate: '',
          scheduleMTPTime: '',
          isFoetalDisease: this.counselledYesdataItem.foetalDisease,
          userId: this.user.id,
          fileName: null,
          fileLocation: null
        };

        //Remove below 2 lines after successfully tested
        // this.decisionNoResponseMessage('Successfully registered', 's');
        // return false;

        let addScheduleData = this.counselledyespostpndtService.AddpostpndtCounselling(this.addCounselledyesRequest)
          .subscribe(response => {
            this.addCounselledyesResponse = response;
            if (this.addCounselledyesResponse !== null && this.addCounselledyesResponse.status === "true") {
              this.decisionNoResponseMessage(this.addCounselledyesResponse.message, 's')
              //this.retrivescheduledlists();
              //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
            } else {
              this.decisionNoResponseMessage(this.addCounselledyesResponse.message, 'e');
              this.postupdateDecisionYespndtErrorMessage = response.message;
            }

          },
            (err: HttpErrorResponse) => {
              this.decisionNoResponseMessage(err.toString(), 'e');
              this.postupdateDecisionYespndtErrorMessage = err.toString();
            });
      }
      else if (this.isSelectedPending === true) {
        console.log(updatePostPndtyesForm.value);

        this.counsellingRemarks = updatePostPndtyesForm.value.Remarks;
        this.assignedObstetricianId = updatePostPndtyesForm.value.DDLobstetrician;

        this.addCounselledyesRequest = {

          postPNDTSchedulingId: this.counselledYesdataItem.postPNDTSchedulingId,
          anwsubjectId: this.counselledYesdataItem.anwSubjectId,
          spouseSubjectId: this.counselledYesdataItem.spouseSubjectId,
          counsellorId: this.counselledYesdataItem.postPNDTCounsellorId,
          counsellingRemarks: this.counsellingRemarks,
          assignedObstetricianId: 0,
          isMTPAgreeYes: this.isSelectedYes,
          isMTPAgreeNo: this.isSelectedNo,
          isMTPAgreePending: this.isSelectedPending,
          scheduleMTPDate: '',
          scheduleMTPTime: '',
          isFoetalDisease: this.counselledYesdataItem.foetalDisease,
          userId: this.user.id,
          fileName: null,
          fileLocation: null
        };

        //Remove below 2 lines after successfully tested
        // this.decisionAwaitedResponseMessage('Successfully registered', 's');
        // return false;

        let addScheduleData = this.counselledyespostpndtService.AddpostpndtCounselling(this.addCounselledyesRequest)
          .subscribe(response => {
            this.addCounselledyesResponse = response;
            if (this.addCounselledyesResponse !== null && this.addCounselledyesResponse.status === "true") {
              this.decisionAwaitedResponseMessage(this.addCounselledyesResponse.message, 's')
              //this.retrivescheduledlists();
              //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
            } else {
              this.decisionAwaitedResponseMessage(this.addCounselledyesResponse.message, 'e');
              this.postupdateDecisionYespndtErrorMessage = response.message;
            }

          },
            (err: HttpErrorResponse) => {
              this.decisionAwaitedResponseMessage(err.toString(), 'e');
              this.postupdateDecisionYespndtErrorMessage = err.toString();
            });
      }
      else {
        this.decisionAwaitedResponseMessage(`Please update the couple's decision on MTP`, 'e');
      }
    }
    else if (this.foetalDisease === false) {
      console.log(updatePostPndtyesForm.value);

      this.counsellingRemarks = updatePostPndtyesForm.value.Remarks;

      this.addCounselledyesRequest = {
        postPNDTSchedulingId: this.counselledYesdataItem.postPNDTSchedulingId,
        anwsubjectId: this.counselledYesdataItem.anwSubjectId,
        spouseSubjectId: this.counselledYesdataItem.spouseSubjectId,
        counsellorId: this.counselledYesdataItem.postPNDTCounsellorId,
        counsellingRemarks: this.counsellingRemarks,
        assignedObstetricianId: 0,
        isMTPAgreeYes: false,
        isMTPAgreeNo: false,
        isMTPAgreePending: false,
        scheduleMTPDate: '',
        scheduleMTPTime: '',
        isFoetalDisease: this.counselledYesdataItem.foetalDisease,
        userId: this.user.id,
        fileName: null,
        fileLocation: null
      };

      //Remove below 2 lines after successfully tested
      // this.foetusnormalResponseMessage('Successfully registered', 's');
      // return false;

      let addScheduleData = this.counselledyespostpndtService.AddpostpndtCounselling(this.addCounselledyesRequest)
        .subscribe(response => {
          this.addCounselledyesResponse = response;
          if (this.addCounselledyesResponse !== null && this.addCounselledyesResponse.status === "true") {
            this.foetusnormalResponseMessage(this.addCounselledyesResponse.message, 's')
            //this.retrivescheduledlists();
            //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
          } else {
            this.foetusnormalResponseMessage(this.addCounselledyesResponse.message, 'e');
            this.postupdateDecisionYespndtErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.foetusnormalResponseMessage(err.toString(), 'e');
            this.postupdateDecisionYespndtErrorMessage = err.toString();
          });
    }
  }

  decisionUpdateResponseMessage(message: string, type: string) {
    var messageType = '';
    var title = `Post-PNDT scheduled successfully `;
    if (type === 'e') {
      Swal.fire({ icon: 'error', title: message, confirmButtonText: 'Ok', allowOutsideClick: false })
    }
    else {
      Swal.fire({ icon: 'success', title: title, confirmButtonText: 'Ok', allowOutsideClick: false })
        .then((result) => {
          if (result.value) {
            this.router.navigateByUrl(`/app/counselling-post-pndt/counselledyes`);
          }
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
            this.router.navigateByUrl(`/app/counselling-post-pndt/counselledyes`);
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
            this.router.navigateByUrl(`/app/counselling-post-pndt/counselledyes`);
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
            this.router.navigateByUrl(`/app/counselling-post-pndt/counselledyes`);
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
            this.router.navigateByUrl(`/app/counselling-post-pndt/counselledyes`);
          }
        });
    }
  }

  InitializeDateRange() {

    this.dateform = this._formBuilder.group({
      fixMtpSchedule: [new Date(moment().add(-1, 'day').format())],
    });

    //Change of sample collection date
    this.dateform.controls.fixMtpSchedule.valueChanges.subscribe(changes => {
      console.log('end: ', changes);
      if (!changes[0]) return;
      const selectedDate2 = changes[0].getTime();
      this.mtpscheduleDate = moment(new Date(selectedDate2)).format("DD/MM/YYYY");
      this.mtpscheduleTime = moment(new Date(selectedDate2)).format("HH:mm");
    });

  }

}

