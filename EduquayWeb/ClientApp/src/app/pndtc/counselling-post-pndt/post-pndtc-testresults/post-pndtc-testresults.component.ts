import { Component, OnInit, ViewChild, HostListener, EventEmitter } from '@angular/core';
import { PndtMtpMasterResponse, dataModel } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master-response';
import { CounsellPostPndtRequest, AddPostPndtCounsellingRequest } from 'src/app/shared/pndtc/counsell-post-pndt/counsell-post-pndt-request';
import { CounsellPostPndtResponse, PostCounsellingList, AddPostPndtcCounsellingResponse, postPndtFileUploadResponse, PostFileDetails } from 'src/app/shared/pndtc/counsell-post-pndt/counsell-post-pndt-response';
import { user } from 'src/app/shared/auth-response';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { CounsellPostPndtService } from 'src/app/shared/pndtc/counsell-post-pndt/counsell-post-pndt.service';
import { DataService } from 'src/app/shared/data.service';
import { PndtMtpMasterService } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master.service';
import { TokenService } from 'src/app/shared/token.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { DateService } from 'src/app/shared/utility/date.service';
import { FileUploader } from 'ng2-file-upload';

//const URL = 'http://localhost:4200/fileupload/';

@Component({
  selector: 'app-post-pndtc-testresults',
  templateUrl: './post-pndtc-testresults.component.html',
  styleUrls: ['./post-pndtc-testresults.component.css']
})
export class PostPndtcTestresultsComponent implements OnInit {

  @ViewChild('mtpschedulePicker', { static: false }) mtpschedulePicker;
  @ViewChild('fileInput', { static: false }) fileInput;
  updatepostpndtcErrorMessage: string;
  //masterdataErrorMessage: string;

  pndtmtpMasterResponse: PndtMtpMasterResponse;
  counsellingpostpndtRequest: CounsellPostPndtRequest;
  counsellingpostpndtResponse: CounsellPostPndtResponse;
  counsellinglists: PostCounsellingList[] = [];
  addCounsellingRequest: AddPostPndtCounsellingRequest;
  addCounsellingResponse: AddPostPndtcCounsellingResponse;
  counsellingdataItem;
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
  anwSubjectId: string;
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

  isSelectedYes: boolean;
  isSelectedNo: boolean;
  isSelectedPending: boolean;
  item: any;
  isDecisionYes: boolean = false;

  /*Date Range configuration starts*/
  dateform: FormGroup;
  popupform: FormGroup;
  DAY = 86400000;
  dyCollectionDate: Date = new Date(Date.now());
  fixmtpSchedule: string;
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
    private counsellingpostpndtService: CounsellPostPndtService,
    private dataservice: DataService,
    private pndtmtpMasterService: PndtMtpMasterService,
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
      this.retrivecounselledlists();
    });
    // this.mtpscheduleDate = moment().format("DD/MM/YYYY");
    // this.mtpscheduleTime = moment().format("HH:mm");
    // this.dateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
    //this.dateOptions.minDate = moment().format("DD/MM/YYYY HH:mm");

    this.ddlmtpobstetricianName();

  }

  public uploader: FileUploader = new FileUploader({
    //url: URL,
    disableMultipart: false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['pdf', 'xls', 'application'],
    allowedMimeType: ['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  });


  public onFileSelected(event: EventEmitter<File[]>) {
    //this.loaderService.display(true);
    this.consentForm = event[0];
    this.fileName = this.consentForm.name;
    //this.loaderService.display(false);
    console.log(this.consentForm);

  }

  retrivecounselledlists() {

    this.loaderService.display(true);
    this.counsellinglists = [];
    this.updatepostpndtcErrorMessage = '';
    this.counsellingpostpndtRequest = {
      userId: this.user.id, districtId: 0,
      chcId: 0,
      phcId: 0,
      anmId: 0
    };
    let counsellingdata = this.counsellingpostpndtService.getcounsellingLists(this.counsellingpostpndtRequest)
      .subscribe(response => {
        this.counsellingpostpndtResponse = response;
        this.loaderService.display(false);
        if (this.counsellingpostpndtResponse !== null && this.counsellingpostpndtResponse.status === "true") {
          if (this.counsellingpostpndtResponse.data.length <= 0) {
            this.updatepostpndtcErrorMessage = response.message;
          }
          else {
            this.counsellingdataItem = this.counsellingpostpndtResponse.data.
              find(counselling => counselling.anwSubjectId === this.anwSubjectId);
            this.foetalDisease = this.counsellingdataItem.foetalDisease;
            //this.counsellinglists = this.counsellingpostpndtResponse.data;
            // this.mtpscheduleDate = moment().format("DD/MM/YYYY");
            // this.mtpscheduleTime = moment().format("HH:mm");
            // this.dateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");        
            // const regDate = this.dateservice.convertToDateTimeFormat(this.counsellingdataItem.postPNDTCounsellingDateTime);
            // this.dateOptions.minDate = regDate;

          }
        }
        else {
          this.updatepostpndtcErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.updatepostpndtcErrorMessage = err.toString();
        });
  }
  ddlmtpobstetricianName() {

    this.obstetricianlists = [];
    this.selectedobstetrician = '';
    this.updatepostpndtcErrorMessage = '';
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
          this.updatepostpndtcErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.updatepostpndtcErrorMessage = err.toString();

        });
  }

  onClick(radioBtnItem) {

    if (radioBtnItem == 'decisionyes') {
      this.isSelectedYes = true;
      this.isSelectedNo = false;
      this.isSelectedPending = false;
      this.isDecisionYes = true;
      // const regDate = this.dateservice.convertToDateTimeFormat(this.counsellingdataItem.postPNDTCounsellingDateTime);
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

  onSubmit(updatePostPndtForm: NgForm) {
    this.updatepostpndtcErrorMessage = '';
    if (this.foetalDisease === true) {
      if (this.isSelectedYes === true) {
        console.log(updatePostPndtForm.value);
        const formData = new FormData();
        if (formData === undefined || this.consentForm === undefined) {
          if (this.confirmationSelected == false) {
            this.decisionYesResponseMessage('Please confirm if you have received & filed the consent form from Subject', 'e');
            return false;
          }
          this.counsellingRemarks = updatePostPndtForm.value.Remarks;
          this.assignedObstetricianId = updatePostPndtForm.value.DDLobstetrician;

          if ((this.mtpscheduleDate === '' || this.mtpscheduleDate == undefined) && (this.mtpscheduleTime === '' || this.mtpscheduleTime == undefined)) {
            this.decisionYesResponseMessage('Please choose Schedule MTP Service Date & Time', 'e');
            return false;
          }


          this.addCounsellingRequest = {
            postPNDTSchedulingId: this.counsellingdataItem.postPNDTSchedulingId,
            anwsubjectId: this.counsellingdataItem.anwSubjectId,
            spouseSubjectId: this.counsellingdataItem.spouseSubjectId,
            counsellorId: this.counsellingdataItem.postPNDTCounsellorId,
            counsellingRemarks: this.counsellingRemarks,
            assignedObstetricianId: +(this.assignedObstetricianId),
            isMTPAgreeYes: this.isSelectedYes,
            isMTPAgreeNo: this.isSelectedNo,
            isMTPAgreePending: this.isSelectedPending,
            scheduleMTPDate: this.mtpscheduleDate,
            scheduleMTPTime: this.mtpscheduleTime,
            isFoetalDisease: this.counsellingdataItem.foetalDisease,
            userId: this.user.id,
            fileName: null,
            fileLocation: null
          };

          //Remove below 2 lines after successfully tested
          // this.decisionYesResponseMessage('Successfully registered', 's');
          // return false;

          let addScheduleData = this.counsellingpostpndtService.AddpostpndtCounselling(this.addCounsellingRequest)
            .subscribe(response => {
              this.addCounsellingResponse = response;
              if (this.addCounsellingResponse !== null && this.addCounsellingResponse.status === "true") {
                this.decisionYesResponseMessage(this.addCounsellingResponse.message, 's')
                //this.retrivescheduledlists();
                //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
              } else {
                this.decisionYesResponseMessage(this.addCounsellingResponse.message, 'e');
                this.updatepostpndtcErrorMessage = response.message;
              }

            },
              (err: HttpErrorResponse) => {
                this.decisionYesResponseMessage(err.toString(), 'e');
                this.updatepostpndtcErrorMessage = err.toString();
              });
        }
        else {

          formData.append('ConsentForm', this.consentForm, this.consentForm.name);
          console.log(formData);
          this.counsellingpostpndtService.prePNDTuploadFile(formData)
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
                this.counsellingRemarks = updatePostPndtForm.value.Remarks;
                this.assignedObstetricianId = updatePostPndtForm.value.DDLobstetrician;

                if ((this.mtpscheduleDate === '' || this.mtpscheduleDate == undefined) && (this.mtpscheduleTime === '' || this.mtpscheduleTime == undefined)) {
                  this.decisionYesResponseMessage('Please choose Schedule MTP Service Date & Time', 'e');
                  return false;
                }


                this.addCounsellingRequest = {
                  postPNDTSchedulingId: this.counsellingdataItem.postPNDTSchedulingId,
                  anwsubjectId: this.counsellingdataItem.anwSubjectId,
                  spouseSubjectId: this.counsellingdataItem.spouseSubjectId,
                  counsellorId: this.counsellingdataItem.postPNDTCounsellorId,
                  counsellingRemarks: this.counsellingRemarks,
                  assignedObstetricianId: +(this.assignedObstetricianId),
                  isMTPAgreeYes: this.isSelectedYes,
                  isMTPAgreeNo: this.isSelectedNo,
                  isMTPAgreePending: this.isSelectedPending,
                  scheduleMTPDate: this.mtpscheduleDate,
                  scheduleMTPTime: this.mtpscheduleTime,
                  isFoetalDisease: this.counsellingdataItem.foetalDisease,
                  userId: this.user.id,
                  fileName: this.postPndtcFileName,
                  fileLocation: this.postPndtcFileLocation
                };

                //Remove below 2 lines after successfully tested
                // this.decisionYesResponseMessage('testing Successfully registered', 's');
                // return false;

                let addCounselledPendingData = this.counsellingpostpndtService.AddpostpndtCounselling(this.addCounsellingRequest)
                  .subscribe(response => {
                    this.addCounsellingResponse = response;
                    if (this.addCounsellingResponse !== null && this.addCounsellingResponse.status === "true") {
                      this.decisionYesResponseMessage(this.addCounsellingResponse.message, 's')
                      //this.retrivescheduledlists();
                      //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
                    } else {
                      this.decisionYesResponseMessage(this.addCounsellingResponse.message, 'e');
                      this.updatepostpndtcErrorMessage = response.message;
                    }

                  },
                    (err: HttpErrorResponse) => {
                      this.decisionYesResponseMessage(err.toString(), 'e');
                      this.updatepostpndtcErrorMessage = err.toString();
                    });

              }
              else {
                this.updatepostpndtcErrorMessage = response.message;
              }
            },
              (err: HttpErrorResponse) => {
                this.decisionYesResponseMessage(err.toString(), 'e');
                this.updatepostpndtcErrorMessage = err.toString();

              });

        }
      }
      else if (this.isSelectedNo === true) {
        console.log(updatePostPndtForm.value);

        this.counsellingRemarks = updatePostPndtForm.value.Remarks;
        this.assignedObstetricianId = updatePostPndtForm.value.DDLobstetrician;

        this.addCounsellingRequest = {
          postPNDTSchedulingId: this.counsellingdataItem.postPNDTSchedulingId,
          anwsubjectId: this.counsellingdataItem.anwSubjectId,
          spouseSubjectId: this.counsellingdataItem.spouseSubjectId,
          counsellorId: this.counsellingdataItem.postPNDTCounsellorId,
          counsellingRemarks: this.counsellingRemarks,
          assignedObstetricianId: 0,
          isMTPAgreeYes: this.isSelectedYes,
          isMTPAgreeNo: this.isSelectedNo,
          isMTPAgreePending: this.isSelectedPending,
          scheduleMTPDate: '',
          scheduleMTPTime: '',
          isFoetalDisease: this.counsellingdataItem.foetalDisease,
          userId: this.user.id,
          fileName: null,
          fileLocation: null
        };

        //Remove below 2 lines after successfully tested
        // this.decisionNoResponseMessage('Successfully registered', 's');
        // return false;

        let addScheduleData = this.counsellingpostpndtService.AddpostpndtCounselling(this.addCounsellingRequest)
          .subscribe(response => {
            this.addCounsellingResponse = response;
            if (this.addCounsellingResponse !== null && this.addCounsellingResponse.status === "true") {
              this.decisionNoResponseMessage(this.addCounsellingResponse.message, 's')
              //this.retrivescheduledlists();
              //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
            } else {
              this.decisionNoResponseMessage(this.addCounsellingResponse.message, 'e');
              this.updatepostpndtcErrorMessage = response.message;
            }

          },
            (err: HttpErrorResponse) => {
              this.decisionNoResponseMessage(err.toString(), 'e');
              this.updatepostpndtcErrorMessage = err.toString();
            });
      }
      else if (this.isSelectedPending === true) {
        console.log(updatePostPndtForm.value);

        this.counsellingRemarks = updatePostPndtForm.value.Remarks;
        this.assignedObstetricianId = updatePostPndtForm.value.DDLobstetrician;

        this.addCounsellingRequest = {
          postPNDTSchedulingId: this.counsellingdataItem.postPNDTSchedulingId,
          anwsubjectId: this.counsellingdataItem.anwSubjectId,
          spouseSubjectId: this.counsellingdataItem.spouseSubjectId,
          counsellorId: this.counsellingdataItem.postPNDTCounsellorId,
          counsellingRemarks: this.counsellingRemarks,
          assignedObstetricianId: 0,
          isMTPAgreeYes: this.isSelectedYes,
          isMTPAgreeNo: this.isSelectedNo,
          isMTPAgreePending: this.isSelectedPending,
          scheduleMTPDate: '',
          scheduleMTPTime: '',
          isFoetalDisease: this.counsellingdataItem.foetalDisease,
          userId: this.user.id,
          fileName: null,
          fileLocation: null
        };

        //Remove below 2 lines after successfully tested
        // this.decisionAwaitedResponseMessage('Successfully registered', 's');
        // return false;

        let addScheduleData = this.counsellingpostpndtService.AddpostpndtCounselling(this.addCounsellingRequest)
          .subscribe(response => {
            this.addCounsellingResponse = response;
            if (this.addCounsellingResponse !== null && this.addCounsellingResponse.status === "true") {
              this.decisionAwaitedResponseMessage(this.addCounsellingResponse.message, 's')
              //this.retrivescheduledlists();
              //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
            } else {
              this.decisionAwaitedResponseMessage(this.addCounsellingResponse.message, 'e');
              this.updatepostpndtcErrorMessage = response.message;
            }

          },
            (err: HttpErrorResponse) => {
              this.decisionAwaitedResponseMessage(err.toString(), 'e');
              this.updatepostpndtcErrorMessage = err.toString();
            });
      }
      else {
        this.decisionAwaitedResponseMessage(`Please update the couple's decision on MTP`, 'e');
      }
    }
    else if (this.foetalDisease === false) {
      console.log(updatePostPndtForm.value);

      this.counsellingRemarks = updatePostPndtForm.value.Remarks;

      this.addCounsellingRequest = {
        postPNDTSchedulingId: this.counsellingdataItem.postPNDTSchedulingId,
        anwsubjectId: this.counsellingdataItem.anwSubjectId,
        spouseSubjectId: this.counsellingdataItem.spouseSubjectId,
        counsellorId: this.counsellingdataItem.postPNDTCounsellorId,
        counsellingRemarks: this.counsellingRemarks,
        assignedObstetricianId: 0,
        isMTPAgreeYes: false,
        isMTPAgreeNo: false,
        isMTPAgreePending: false,
        scheduleMTPDate: '',
        scheduleMTPTime: '',
        isFoetalDisease: this.counsellingdataItem.foetalDisease,
        userId: this.user.id,
        fileName: null,
        fileLocation: null
      };

      //Remove below 2 lines after successfully tested
      // this.foetusnormalResponseMessage('Successfully registered', 's');
      // return false;

      let addScheduleData = this.counsellingpostpndtService.AddpostpndtCounselling(this.addCounsellingRequest)
        .subscribe(response => {
          this.addCounsellingResponse = response;
          if (this.addCounsellingResponse !== null && this.addCounsellingResponse.status === "true") {
            this.foetusnormalResponseMessage(this.addCounsellingResponse.message, 's')
            //this.retrivescheduledlists();
            //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
          } else {
            this.foetusnormalResponseMessage(this.addCounsellingResponse.message, 'e');
            this.updatepostpndtcErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.foetusnormalResponseMessage(err.toString(), 'e');
            this.updatepostpndtcErrorMessage = err.toString();
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
            this.router.navigateByUrl(`/app/counselling-post-pndt`);
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
            this.router.navigateByUrl(`/app/counselling-post-pndt`);
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
            this.router.navigateByUrl(`/app/counselling-post-pndt`);
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
            this.router.navigateByUrl(`/app/counselling-post-pndt`);
          }
        });
    }
  }


  InitializeDateRange() {

    this.dateform = this._formBuilder.group({
      fixmtpSchedule: [new Date(moment().add(-1, 'day').format())],
    });

    //Change of sample collection date
    this.dateform.controls.fixmtpSchedule.valueChanges.subscribe(changes => {
      console.log('end: ', changes);
      if (!changes[0]) return;
      const selectedDate2 = changes[0].getTime();
      this.mtpscheduleDate = moment(new Date(selectedDate2)).format("DD/MM/YYYY");
      this.mtpscheduleTime = moment(new Date(selectedDate2)).format("HH:mm");
    });

  }

}
