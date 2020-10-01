import { Component, OnInit, ViewChild, HostListener, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { PndtMtpMasterResponse, dataModel } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master-response';
import { CounsellPrePndtResquest, AddPrePndtCounsellingRequest } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt-resquest';
import { CounselledprepndtResponse, CounselledList, AddPrePndtcCounsellingResponse } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt-response';
import { user } from 'src/app/shared/auth-response';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';
import { PndtMtpMasterService } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master.service';
import { CounsellPrePndtService } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt.service';
import { TokenService } from 'src/app/shared/token.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { DateService } from 'src/app/shared/utility/date.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-update-decision-pending-pndt',
  templateUrl: './update-decision-pending-pndt.component.html',
  styleUrls: ['./update-decision-pending-pndt.component.css']
})
export class UpdateDecisionPendingPndtComponent implements OnInit {

    @ViewChild('pndtschedulePicker', { static: false }) pndtschedulePicker;
  
    updateDecisionPendingpndtErrorMessage: string;
    //masterdataErrorMessage: string;
  
    pndtmtpMasterResponse: PndtMtpMasterResponse;
    counselledpendingprepndtRequest: CounsellPrePndtResquest;
    counselledpendingprepndtResponse: CounselledprepndtResponse;
    counselledpendinglists: CounselledList[] = [];
    addCounselledPendingRequest: AddPrePndtCounsellingRequest;
    addCounselledPendingResponse: AddPrePndtcCounsellingResponse;
    anwSubjectId: string;
    counselledPendingdataItem: CounselledList;
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
    isDecisionNo: boolean = false;
    remarksdata: string;
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
    fileName: string;
    file: File;

    consentForm: File;
  
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
      private counselledpendingprepndtService: CounsellPrePndtService,
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
        this.retrivecounselledpendinglists();
      });
      // this.pndtscheduleDate = moment().format("DD/MM/YYYY");
      // this.pndtscheduleTime = moment().format("HH:mm");
      // this.dateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
      // this.dateOptions.minDate = moment().format("DD/MM/YYYY HH:mm");
  
      this.ddlobstetricianName();
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
      // allowedFileType: ['image', 'pdf', 'xls', 'application', 'doc', 'docx'],
      // allowedMimeType: ['image/jpg',
      //   'image/jpeg', 'text/plain','text/xml',
      //   'image/png', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf'],
      // });
  
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
      this.updateDecisionPendingpndtErrorMessage = '';
      this.counselledpendingprepndtRequest = {
        userId: this.user.id, districtId: 0,
        chcId: 0,
        phcId: 0,
        anmId: 0
      };
      let counselleddata = this.counselledpendingprepndtService.getcounselledPendingLists(this.counselledpendingprepndtRequest)
        .subscribe(response => {
          this.counselledpendingprepndtResponse = response;
          this.loaderService.display(false);
          if (this.counselledpendingprepndtResponse !== null && this.counselledpendingprepndtResponse.status === "true") {
            if (this.counselledpendingprepndtResponse.data.length <= 0) {
              this.updateDecisionPendingpndtErrorMessage = response.message;
            }
            else {
              this.counselledPendingdataItem = this.counselledpendingprepndtResponse.data.
                find(counselling => counselling.anwSubjectId === this.anwSubjectId);
                this.remarksdata = this.counselledPendingdataItem.counsellingRemarks;
                this.isSelectedYes = this.counselledPendingdataItem.isPNDTAgreeYes;
                this.isSelectedNo = this.counselledPendingdataItem.isPNDTAgreeNo;
                this.isSelectedPending = this.counselledPendingdataItem.isPNDTAgreePending;
              //this.counsellinglists = this.counselledpendingprepndtResponse.data;
  
            }
          }
          else {
            this.updateDecisionPendingpndtErrorMessage = response.message;
          }
  
        },
          (err: HttpErrorResponse) => {
            this.updateDecisionPendingpndtErrorMessage = err.toString();
          });
    }
    ddlobstetricianName() {
  
      this.obstetricianlists = [];
      this.selectedobstetrician = '';
      this.updateDecisionPendingpndtErrorMessage = '';
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
            this.updateDecisionPendingpndtErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.updateDecisionPendingpndtErrorMessage = err.toString();
  
          });
    }
  
    onClick(radioBtnItem) {
  
      if (radioBtnItem == 'decisionyes') {
        this.isSelectedYes = true;
        this.isSelectedNo = false;
        this.isSelectedPending = false;
        this.isDecisionYes = true;
        this.isDecisionNo = false;
        const regDate = this.dateservice.convertToDateTimeFormat(this.counselledPendingdataItem.counsellingDateTime);
        this.dateOptions.minDate = regDate;
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
    onSubmit(updatePndtpendingForm: NgForm) {
  
      if (this.isSelectedYes === true) {
        console.log(updatePndtpendingForm.value);
        this.isDecisionYes = true;

        if(this.confirmationSelected == false){
          this.decisionYesResponseMessage('Please confirm if you have received & filed the consent form from Subject', 'e');
          return false;
        }
        this.counsellingRemarks = updatePndtpendingForm.value.Remarks;
        this.assignedObstetricianId = updatePndtpendingForm.value.DDLobstetrician;

        if((this.pndtscheduleDate === '' || this.pndtscheduleDate == undefined) && (this.pndtscheduleTime === '' || this.pndtscheduleTime == undefined)){
          this.decisionYesResponseMessage('Please choose Schedule PNDT Date & Time', 'e');
          return false;
        }
         const formData = new FormData();
        formData.append('ConsentForm', this.consentForm, this.consentForm.name);
        console.log(formData);

  
        this.addCounselledPendingRequest = {
          prePNDTSchedulingId: this.counselledPendingdataItem.schedulingId,
          anwsubjectId: this.counselledPendingdataItem.anwSubjectId,
          spouseSubjectId: this.counselledPendingdataItem.spouseSubjectId,
          counsellorId: this.counselledPendingdataItem.counsellorId,
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
        // this.decisionYesResponseMessage('testing Successfully registered', 's');
        // return false;
  
        let addCounselledPendingData = this.counselledpendingprepndtService.AddprepndtCounselling(this.addCounselledPendingRequest, formData)
          .subscribe(response => {
            this.addCounselledPendingResponse = response;
            if (this.addCounselledPendingResponse !== null && this.addCounselledPendingResponse.status === "true") {
              this.decisionYesResponseMessage(this.addCounselledPendingResponse.message, 's')
              //this.retrivescheduledlists();
              //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
            } else {
              this.decisionYesResponseMessage(this.addCounselledPendingResponse.message, 'e');
              this.updateDecisionPendingpndtErrorMessage = response.message;
            }
  
          },
            (err: HttpErrorResponse) => {
              this.decisionYesResponseMessage(err.toString(), 'e');
              this.updateDecisionPendingpndtErrorMessage = err.toString();
            });
      }
      else if (this.isSelectedNo === true) {
        console.log(updatePndtpendingForm.value);
  
        this.counsellingRemarks = updatePndtpendingForm.value.Remarks;
        this.assignedObstetricianId = updatePndtpendingForm.value.DDLobstetrician;

        const formData = new FormData();
        formData: null;

        this.addCounselledPendingRequest = {
          prePNDTSchedulingId: this.counselledPendingdataItem.schedulingId,
          anwsubjectId: this.counselledPendingdataItem.anwSubjectId,
          spouseSubjectId: this.counselledPendingdataItem.spouseSubjectId,
          counsellorId: this.counselledPendingdataItem.counsellorId,
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
  
        let addCounselledNoData = this.counselledpendingprepndtService.AddprepndtCounselling(this.addCounselledPendingRequest, formData)
          .subscribe(response => {
            this.addCounselledPendingResponse = response;
            if (this.addCounselledPendingResponse !== null && this.addCounselledPendingResponse.status === "true") {
              this.decisionNoResponseMessage(this.addCounselledPendingResponse.message, 's')
              //this.retrivescheduledlists();
              //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
            } else {
              this.decisionNoResponseMessage(this.addCounselledPendingResponse.message, 'e');
              this.updateDecisionPendingpndtErrorMessage = response.message;
            }
  
          },
            (err: HttpErrorResponse) => {
              this.decisionNoResponseMessage(err.toString(), 'e');
              this.updateDecisionPendingpndtErrorMessage = err.toString();
            });
      }
      else if (this.isSelectedPending === true) {
        console.log(updatePndtpendingForm.value);
  
        this.counsellingRemarks = updatePndtpendingForm.value.Remarks;
        this.assignedObstetricianId = updatePndtpendingForm.value.DDLobstetrician;
        const formData = new FormData();
        formData: null;
  
        this.addCounselledPendingRequest = {
          prePNDTSchedulingId: this.counselledPendingdataItem.schedulingId,
          anwsubjectId: this.counselledPendingdataItem.anwSubjectId,
          spouseSubjectId: this.counselledPendingdataItem.spouseSubjectId,
          counsellorId: this.counselledPendingdataItem.counsellorId,
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
  
        let addCounselledNoData = this.counselledpendingprepndtService.AddprepndtCounselling(this.addCounselledPendingRequest, formData)
          .subscribe(response => {
            this.addCounselledPendingResponse = response;
            if (this.addCounselledPendingResponse !== null && this.addCounselledPendingResponse.status === "true") {
              this.decisionAwaitedResponseMessage(this.addCounselledPendingResponse.message, 's')
              //this.retrivescheduledlists();
              //this.subjectList.splice(this.subjectList.findIndex(x => x.id === this.subjectId), 1);
            } else {
              this.decisionAwaitedResponseMessage(this.addCounselledPendingResponse.message, 'e');
              this.updateDecisionPendingpndtErrorMessage = response.message;
            }
  
          },
            (err: HttpErrorResponse) => {
              this.decisionAwaitedResponseMessage(err.toString(), 'e');
              this.updateDecisionPendingpndtErrorMessage = err.toString();
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
            this.router.navigateByUrl(`/app/counselling-pre-pndt/counselledawaited`);
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
            this.router.navigateByUrl(`/app/counselling-pre-pndt/counselledawaited`);
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
            this.router.navigateByUrl(`/app/counselling-pre-pndt/counselledawaited`);
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
