import { Component, OnInit, ViewChild, HostListener, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CounsellPrePndtResquest, AddPrePndtCounsellingRequest } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt-resquest';
import { CounsellPrePndtResponse, CounsellingList, AddPrePndtcCounsellingResponse, prePndtFileUploadResponse, FileDetails } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt-response';
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
import { FileUploader, FileLikeObject, FileSelectDirective } from 'ng2-file-upload';
import { HplcPosBloodsamplesService } from 'src/app/shared/molecularlab-results/hplc-pos-bloodsamples/hplc-pos-bloodsamples.service';

//const URL = 'http://localhost:4200/fileupload/';


@Component({
  selector: 'app-view-results-ML',
  templateUrl: './view-results-ML.component.html',
  styleUrls: ['./view-results-ML.component.css']
})
export class ViewResultMLComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput;
  @ViewChild('pndtschedulePicker', { static: false }) pndtschedulePicker;

  updatepndtcErrorMessage: string;
  //masterdataErrorMessage: string;

  pndtmtpMasterResponse;
  counsellingprepndtRequest: CounsellPrePndtResquest;
  counsellingprepndtResponse;
  addCounsellingRequest: AddPrePndtCounsellingRequest;
  addCounsellingResponse: AddPrePndtcCounsellingResponse;
  prePndtFileUploadResponse: prePndtFileUploadResponse;
  prePNDTCFileDetails: FileDetails;
  counsellinglists = [];
  anwSubjectId: string;
  counsellingdataItem;
  selectedobstetrician: string = '';
  obstetricianlists: dataModel[] = [];
  user: user;
  prePndtcFileName: string;
  prePndtcFileLocation: string;

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
  fileName: string;
  file: File;
  screenName ="";

  prevScreen = ['/app/molecular-lab-result'];

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
    private counsellingprepndtService: CounsellPrePndtService,
    private tokenService: TokenService,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private router: Router,
    private dateservice: DateService,
    private updateSamplesServiceService: HplcPosBloodsamplesService,
  ) { }

  ngOnInit() {

    this.loaderService.display(false);
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    
    this.activatedRoute.queryParams.subscribe(params => {
      this.anwSubjectId = params['q'];
      this.screenName =  params['sc'];
      this.retrivecounselledlists();
    });
    // this.pndtscheduleDate = moment().format("DD/MM/YYYY");
    // this.pndtscheduleTime = moment().format("HH:mm");
    // this.dateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
    // this.dateOptions.minDate = moment().format("DD/MM/YYYY HH:mm");
if(this.screenName == "update")
{
  this.prevScreen = ['/app/molecular-lab-result'];
}
else if(this.screenName == "edit")
{
  this.prevScreen = ['/app/molecular-lab-result/edit-result'];
}
else if(this.screenName == "confirm")
{
  this.prevScreen = ['/app/molecular-lab-result/confirmed-result'];
}
if(this.screenName == "update" || this.screenName == "confirm")
    this.dataservice.sendData(JSON.stringify({ "module": "Update Mol Results", "submodule": "Results/HPLC Positive Blood Sample / Case Sheet" }));
else if(this.screenName == "edit")
    this.dataservice.sendData(JSON.stringify({ "module": "Update Mol Results", "submodule": "Results/HPLC Positive Blood Sample / Case Sheet" }));

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
    this.updatepndtcErrorMessage = '';
   
    if(this.screenName == "update")
    {
      let counsellingdata =  this.updateSamplesServiceService.getbloodSampleList(this.user.molecularLabId)
      .subscribe(response => {
          this.counsellingprepndtResponse = response;
          this.loaderService.display(false);
          if (this.counsellingprepndtResponse !== null && this.counsellingprepndtResponse.status === "true") {
            if (this.counsellingprepndtResponse.subjects.length <= 0) {
              this.updatepndtcErrorMessage = response.message;
            }
            else {
              this.counsellingdataItem = this.counsellingprepndtResponse.subjects.
                find(counselling => counselling.uniqueSubjectId === this.anwSubjectId);
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
    else if(this.screenName == "edit"){
      let counsellingdata =  this.updateSamplesServiceService.geteditbloodSampleList(this.user.molecularLabId)
      .subscribe(response => {
          this.counsellingprepndtResponse = response;
          this.loaderService.display(false);
          if (this.counsellingprepndtResponse !== null && this.counsellingprepndtResponse.status === "true") {
            if (this.counsellingprepndtResponse.subjects.length <= 0) {
              this.updatepndtcErrorMessage = response.message;
            }
            else {
              this.counsellingdataItem = this.counsellingprepndtResponse.subjects.
                find(counselling => counselling.uniqueSubjectId === this.anwSubjectId);
             
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

    else(this.screenName == "confirm")
    {
      let counsellingdata =  this.updateSamplesServiceService.getconfirmbloodSampleList(this.user.molecularLabId)
      .subscribe(response => {
          this.counsellingprepndtResponse = response;
          this.loaderService.display(false);
          if (this.counsellingprepndtResponse !== null && this.counsellingprepndtResponse.status === "true") {
            if (this.counsellingprepndtResponse.subjects.length <= 0) {
              this.updatepndtcErrorMessage = response.message;
            }
            else {
              this.counsellingdataItem = this.counsellingprepndtResponse.subjects.
                find(counselling => counselling.uniqueSubjectId === this.anwSubjectId);
             console.log(this.counsellingdataItem);
             if(this.counsellingdataItem != undefined)
             {
              const regDate = this.dateservice.convertToDateTimeFormat(this.counsellingdataItem.counsellingDateTime);
              this.dateOptions.minDate = regDate;
             }
                
  
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
}
