import { Component, OnInit, HostListener, ViewChild, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { PndtMtpMasterResponse, dataModel } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master-response';
import { CounsellPostPndtRequest, AddPostPndtCounsellingRequest } from 'src/app/shared/pndtc/counsell-post-pndt/counsell-post-pndt-request';
import { CounselledpostpndtResponse, PostCounselledList, AddPostPndtcCounsellingResponse, postPndtFileUploadResponse, PostFileDetails } from 'src/app/shared/pndtc/counsell-post-pndt/counsell-post-pndt-response';
import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { PndtMtpMasterService } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master.service';
import { CounsellPostPndtService } from 'src/app/shared/pndtc/counsell-post-pndt/counsell-post-pndt.service';
import { TokenService } from 'src/app/shared/token.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DateService } from 'src/app/shared/utility/date.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-post-pndtc-decision-awaited',
  templateUrl: './post-pndtc-decision-awaited.component.html',
  styleUrls: ['./post-pndtc-decision-awaited.component.css']
})
export class PostPndtcDecisionAwaitedComponent implements OnInit {

    @ViewChild('pndtschedulePicker', { static: false }) pndtschedulePicker;
  
    postupdateDecisionPendingpndtErrorMessage: string;
    //masterdataErrorMessage: string;
  
    pndtmtpMasterResponse: PndtMtpMasterResponse;
    counselledpendingpostpndtRequest: CounsellPostPndtRequest;
    counselledpendingpostpndtResponse: CounselledpostpndtResponse;
    counselledpendinglists: PostCounselledList[] = [];
    addCounselledPendingRequest: AddPostPndtCounsellingRequest;
    addCounselledPendingResponse: AddPostPndtcCounsellingResponse;
    anwSubjectId: string;
    counselledPendingdataItem;
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
    isDecisionYes: boolean = false;
    isDecisionNo: boolean = false;
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
      private counselledpendingpostpndtService: CounsellPostPndtService,
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
        this.retrivecounselledpendinglists();
      });
      this.mtpscheduleDate = moment().format("DD/MM/YYYY");
      this.mtpscheduleTime = moment().format("HH:mm");
      this.dateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
      this.dateOptions.minDate = moment().format("DD/MM/YYYY HH:mm");
  
      this.ddlmtpobstetricianName();
    }

    
  public uploader: FileUploader = new FileUploader({
    //url: URL,
    disableMultipart : false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['pdf', 'xls', 'application'],
    allowedMimeType: [ 'application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    });
  

  public onFileSelected(event: EventEmitter<File[]>) {
    //this.loaderService.display(true);
    this.consentForm = event[0];
    this.fileName = this.consentForm.name;
    //this.loaderService.display(false);
    console.log(this.consentForm);

  }
  
    retrivecounselledpendinglists() {
  
      this.loaderService.display(true);
      this.counselledpendinglists = [];
      this.postupdateDecisionPendingpndtErrorMessage = '';
      this.counselledpendingpostpndtRequest = {
        userId: this.user.id, districtId: 0,
        chcId: 0,
        phcId: 0,
        anmId: 0
      };
      let counselleddata = this.counselledpendingpostpndtService.getcounselledPendingLists(this.counselledpendingpostpndtRequest)
        .subscribe(response => {
          this.counselledpendingpostpndtResponse = response;
          this.loaderService.display(false);
          if (this.counselledpendingpostpndtResponse !== null && this.counselledpendingpostpndtResponse.status === "true") {
            if (this.counselledpendingpostpndtResponse.data.length <= 0) {
              this.postupdateDecisionPendingpndtErrorMessage = response.message;
            }
            else {
              this.counselledPendingdataItem = this.counselledpendingpostpndtResponse.data.
                find(counselling => counselling.anwSubjectId === this.anwSubjectId);
                this.remarksdata = this.counselledPendingdataItem.postPNDTCounsellingRemarks;
                this.foetalDisease = this.counselledPendingdataItem.foetalDisease;
                this.isSelectedNo = this.counselledPendingdataItem.isMTPAgreeNo;
                this.isSelectedPending = this.counselledPendingdataItem.isMTPAgreePending;
              //this.counsellinglists = this.counselledpendingpostpndtResponse.data;
  
            }
          }
          else {
            this.postupdateDecisionPendingpndtErrorMessage = response.message;
          }
  
        },
          (err: HttpErrorResponse) => {
            this.postupdateDecisionPendingpndtErrorMessage = err.toString();
          });
    }
    ddlmtpobstetricianName() {
  
      this.obstetricianlists = [];
      this.selectedobstetrician = '';
      this.postupdateDecisionPendingpndtErrorMessage = '';
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
            this.postupdateDecisionPendingpndtErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.postupdateDecisionPendingpndtErrorMessage = err.toString();
  
          });
    }
  
    onClick(radioBtnItem) {
  
      if (radioBtnItem == 'decisionyes') {
        this.isSelectedYes = true;
        this.isSelectedNo = false;
        this.isSelectedPending = false;
        this.isDecisionYes = true;
        this.isDecisionNo = false;
        // const regDate = this.dateservice.convertToDateTimeFormat(this.counselledPendingdataItem.postPNDTCounsellingDateTime);
        // this.dateOptions.minDate = regDate;
      }
      else if (radioBtnItem == 'decisionno') {
        this.isSelectedNo = true;
        this.isSelectedYes = false;
        this.isSelectedPending = false;
        this.isDecisionYes = false;
        this.isDecisionNo = true;
      }
      else if (radioBtnItem == 'decisionpending') {
        this.isSelectedPending = true;
        this.isSelectedYes = false;
        this.isSelectedNo = false;
        this.isDecisionYes = false;
        this.isDecisionNo = false;
      }
    }
    onSubmit(postupdatePndtpendingForm: NgForm) {
      this.postupdateDecisionPendingpndtErrorMessage = '';
      this.foetalDisease = true;
      if (this.foetalDisease === true) {
        if (this.isSelectedYes === true || this.isMTPAgreeYes === true) {
          console.log(postupdatePndtpendingForm.value);
          console.log(this.counselledPendingdataItem.fileName);
          console.log(this.fileName);
          const formData = new FormData();
          console.log(formData);
        if (formData === undefined || this.fileName === undefined) {      
        if(this.confirmationSelected == false){
          this.decisionYesResponseMessage('Please confirm if you have received & filed the consent form from Subject', 'e');
          return false;
        }
          this.counsellingRemarks = postupdatePndtpendingForm.value.Remarks;
          this.assignedObstetricianId = postupdatePndtpendingForm.value.DDLobstetrician;
          if((this.mtpscheduleDate === '' || this.mtpscheduleDate == undefined) && (this.mtpscheduleTime === '' || this.mtpscheduleTime == undefined)){
            this.decisionYesResponseMessage('Please choose Schedule MTP Service Date & Time', 'e');
            return false;
          }
          
          this.addCounselledPendingRequest = {
            postPNDTSchedulingId: this.counselledPendingdataItem.postPNDTSchedulingId,
            anwsubjectId: this.counselledPendingdataItem.anwSubjectId,
            spouseSubjectId: this.counselledPendingdataItem.spouseSubjectId,
            counsellorId: this.counselledPendingdataItem.postPNDTCounsellorId,
            counsellingRemarks: this.counsellingRemarks,
            assignedObstetricianId: +(this.assignedObstetricianId),
            isMTPAgreeYes: this.isSelectedYes,
            isMTPAgreeNo: this.isSelectedNo,
            isMTPAgreePending: this.isSelectedPending,
            scheduleMTPDate: this.mtpscheduleDate,
            scheduleMTPTime: this.mtpscheduleTime,
            isFoetalDisease: this.counselledPendingdataItem.foetalDisease,
            userId: this.user.id,
            fileName: null,
            fileLocation: null
          };
  
          //Remove below 2 lines after successfully tested
          // this.decisionYesResponseMessage('Successfully registered', 's');
          // return false;
  
          let addScheduleData = this.counselledpendingpostpndtService.AddpostpndtCounselling(this.addCounselledPendingRequest)
            .subscribe(response => {
              this.addCounselledPendingResponse = response;
              if (this.addCounselledPendingResponse !== null && this.addCounselledPendingResponse.status === "true") {
                this.decisionYesResponseMessage(this.addCounselledPendingResponse.message, 's')
                //this.retrivescheduledlists();
                //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
              } else {
                this.decisionYesResponseMessage(this.addCounselledPendingResponse.message, 'e');
                this.postupdateDecisionPendingpndtErrorMessage = response.message;
              }
  
            },
              (err: HttpErrorResponse) => {
                this.decisionYesResponseMessage(err.toString(), 'e');
                this.postupdateDecisionPendingpndtErrorMessage = err.toString();
              });
        }
        else {

          formData.append('ConsentForm', this.consentForm, this.consentForm.name);
          console.log(formData);
          this.counselledpendingpostpndtService.prePNDTuploadFile(formData)
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
                this.counsellingRemarks = postupdatePndtpendingForm.value.Remarks;
                this.assignedObstetricianId = postupdatePndtpendingForm.value.DDLobstetrician;

                if ((this.mtpscheduleDate === '' || this.mtpscheduleDate == undefined) && (this.mtpscheduleTime === '' || this.mtpscheduleTime == undefined)) {
                  this.decisionYesResponseMessage('Please choose Schedule MTP Service Date & Time', 'e');
                  return false;
                }

                this.addCounselledPendingRequest = {
                  postPNDTSchedulingId: this.counselledPendingdataItem.postPNDTSchedulingId,
                  anwsubjectId: this.counselledPendingdataItem.anwSubjectId,
                  spouseSubjectId: this.counselledPendingdataItem.spouseSubjectId,
                  counsellorId: this.counselledPendingdataItem.postPNDTCounsellorId,
                  counsellingRemarks: this.counsellingRemarks,
                  assignedObstetricianId: +(this.assignedObstetricianId),
                  isMTPAgreeYes: this.isSelectedYes,
                  isMTPAgreeNo: this.isSelectedNo,
                  isMTPAgreePending: this.isSelectedPending,
                  scheduleMTPDate: this.mtpscheduleDate,
                  scheduleMTPTime: this.mtpscheduleTime,
                  isFoetalDisease: this.counselledPendingdataItem.foetalDisease,
                  userId: this.user.id,
                  fileName: this.postPndtcFileName,
                  fileLocation: this.postPndtcFileLocation
                };

                //Remove below 2 lines after successfully tested
                // this.decisionYesResponseMessage('testing Successfully registered', 's');
                // return false;

                let addScheduleData = this.counselledpendingpostpndtService.AddpostpndtCounselling(this.addCounselledPendingRequest)
            .subscribe(response => {
              this.addCounselledPendingResponse = response;
              if (this.addCounselledPendingResponse !== null && this.addCounselledPendingResponse.status === "true") {
                this.decisionYesResponseMessage(this.addCounselledPendingResponse.message, 's')
                //this.retrivescheduledlists();
                //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
              } else {
                this.decisionYesResponseMessage(this.addCounselledPendingResponse.message, 'e');
                this.postupdateDecisionPendingpndtErrorMessage = response.message;
              }
  
            },
              (err: HttpErrorResponse) => {
                this.decisionYesResponseMessage(err.toString(), 'e');
                this.postupdateDecisionPendingpndtErrorMessage = err.toString();
              });
        }
              else {
                this.postupdateDecisionPendingpndtErrorMessage = response.message;
              }
            },
              (err: HttpErrorResponse) => {
                this.decisionYesResponseMessage(err.toString(), 'e');
                this.postupdateDecisionPendingpndtErrorMessage = err.toString();

              });

        }
      }
        else if (this.isSelectedNo === true) {
          console.log(postupdatePndtpendingForm.value);
  
          this.counsellingRemarks = postupdatePndtpendingForm.value.Remarks;
          this.assignedObstetricianId = postupdatePndtpendingForm.value.DDLobstetrician;
  
          this.addCounselledPendingRequest = {
            postPNDTSchedulingId: this.counselledPendingdataItem.postPNDTSchedulingId,
            anwsubjectId: this.counselledPendingdataItem.anwSubjectId,
            spouseSubjectId: this.counselledPendingdataItem.spouseSubjectId,
            counsellorId: this.counselledPendingdataItem.postPNDTCounsellorId,
            counsellingRemarks: this.counsellingRemarks,
            assignedObstetricianId: 0,
            isMTPAgreeYes: this.isSelectedYes,
            isMTPAgreeNo: this.isSelectedNo,
            isMTPAgreePending: this.isSelectedPending,
            scheduleMTPDate: '',
            scheduleMTPTime: '',
            isFoetalDisease: this.counselledPendingdataItem.foetalDisease,
            userId: this.user.id,
            fileName: null,
            fileLocation: null
          };
  
          //Remove below 2 lines after successfully tested
          // this.decisionNoResponseMessage('Successfully registered', 's');
          // return false;
  
          let addScheduleData = this.counselledpendingpostpndtService.AddpostpndtCounselling(this.addCounselledPendingRequest)
            .subscribe(response => {
              this.addCounselledPendingResponse = response;
              if (this.addCounselledPendingResponse !== null && this.addCounselledPendingResponse.status === "true") {
                this.decisionNoResponseMessage(this.addCounselledPendingResponse.message, 's')
                //this.retrivescheduledlists();
                //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
              } else {
                this.decisionNoResponseMessage(this.addCounselledPendingResponse.message, 'e');
                this.postupdateDecisionPendingpndtErrorMessage = response.message;
              }
  
            },
              (err: HttpErrorResponse) => {
                this.decisionNoResponseMessage(err.toString(), 'e');
                this.postupdateDecisionPendingpndtErrorMessage = err.toString();
              });
        }
        else if (this.isSelectedPending === true) {
          console.log(postupdatePndtpendingForm.value);
  
          this.counsellingRemarks = postupdatePndtpendingForm.value.Remarks;
          this.assignedObstetricianId = postupdatePndtpendingForm.value.DDLobstetrician;
  
          this.addCounselledPendingRequest = {
            postPNDTSchedulingId: this.counselledPendingdataItem.postPNDTSchedulingId,
            anwsubjectId: this.counselledPendingdataItem.anwSubjectId,
            spouseSubjectId: this.counselledPendingdataItem.spouseSubjectId,
            counsellorId: this.counselledPendingdataItem.postPNDTCounsellorId,
            counsellingRemarks: this.counsellingRemarks,
            assignedObstetricianId: 0,
            isMTPAgreeYes: this.isSelectedYes,
            isMTPAgreeNo: this.isSelectedNo,
            isMTPAgreePending: this.isSelectedPending,
            scheduleMTPDate: '',
            scheduleMTPTime: '',
            isFoetalDisease: this.counselledPendingdataItem.foetalDisease,
            userId: this.user.id,
            fileName: null,
            fileLocation: null
          };
  
          //Remove below 2 lines after successfully tested
          // this.decisionAwaitedResponseMessage('Successfully registered', 's');
          // return false;
  
          let addScheduleData = this.counselledpendingpostpndtService.AddpostpndtCounselling(this.addCounselledPendingRequest)
            .subscribe(response => {
              this.addCounselledPendingResponse = response;
              if (this.addCounselledPendingResponse !== null && this.addCounselledPendingResponse.status === "true") {
                this.decisionAwaitedResponseMessage(this.addCounselledPendingResponse.message, 's')
                //this.retrivescheduledlists();
                //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
              } else {
                this.decisionAwaitedResponseMessage(this.addCounselledPendingResponse.message, 'e');
                this.postupdateDecisionPendingpndtErrorMessage = response.message;
              }
  
            },
              (err: HttpErrorResponse) => {
                this.decisionAwaitedResponseMessage(err.toString(), 'e');
                this.postupdateDecisionPendingpndtErrorMessage = err.toString();
              });
        }
        else {
          this.decisionAwaitedResponseMessage(`Please update the couple's decision on MTP`, 'e');
        }
      }
      else if (this.foetalDisease === false) {
        console.log(postupdatePndtpendingForm.value);
  
        this.counsellingRemarks = postupdatePndtpendingForm.value.Remarks;
  
        this.addCounselledPendingRequest = {
          postPNDTSchedulingId: this.counselledPendingdataItem.postPNDTSchedulingId,
          anwsubjectId: this.counselledPendingdataItem.anwSubjectId,
          spouseSubjectId: this.counselledPendingdataItem.spouseSubjectId,
          counsellorId: this.counselledPendingdataItem.postPNDTCounsellorId,
          counsellingRemarks: this.counsellingRemarks,
          assignedObstetricianId: 0,
          isMTPAgreeYes: false,
          isMTPAgreeNo: false,
          isMTPAgreePending: false,
          scheduleMTPDate: '',
          scheduleMTPTime: '',
          isFoetalDisease: this.counselledPendingdataItem.foetalDisease,
          userId: this.user.id,
          fileName: null,
        fileLocation: null
        };
  
        //Remove below 2 lines after successfully tested
        // this.foetusnormalResponseMessage('Successfully registered', 's');
        // return false;
  
        let addScheduleData = this.counselledpendingpostpndtService.AddpostpndtCounselling(this.addCounselledPendingRequest)
          .subscribe(response => {
            this.addCounselledPendingResponse = response;
            if (this.addCounselledPendingResponse !== null && this.addCounselledPendingResponse.status === "true") {
              this.foetusnormalResponseMessage(this.addCounselledPendingResponse.message, 's')
              //this.retrivescheduledlists();
              //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
            } else {
              this.foetusnormalResponseMessage(this.addCounselledPendingResponse.message, 'e');
              this.postupdateDecisionPendingpndtErrorMessage = response.message;
            }
  
          },
            (err: HttpErrorResponse) => {
              this.foetusnormalResponseMessage(err.toString(), 'e');
              this.postupdateDecisionPendingpndtErrorMessage = err.toString();
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
            this.router.navigateByUrl(`/app/counselling-post-pndt/counselledawaited`);
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
            this.router.navigateByUrl(`/app/counselling-post-pndt/counselledawaited`);
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
            this.router.navigateByUrl(`/app/counselling-post-pndt/counselledawaited`);
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
              this.router.navigateByUrl(`/app/counselling-post-pndt/counselledawaited`);
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
