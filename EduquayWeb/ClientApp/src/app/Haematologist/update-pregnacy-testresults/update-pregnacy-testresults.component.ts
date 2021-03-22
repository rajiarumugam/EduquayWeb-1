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
import { updatePregnacyService } from "./../../shared/Haematologist/update-pregnacy.service";

//const URL = 'http://localhost:4200/fileupload/';


@Component({
  selector: 'app-update-pregnacy-testresults',
  templateUrl: './update-pregnacy-testresults.component.html',
  styleUrls: ['./update-pregnacy-testresults.component.css']
})
export class UpdatePregnacyTestresultsComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput;
  @ViewChild('pndtschedulePicker', { static: false }) pndtschedulePicker;

  updatepndtcErrorMessage: string;
  //masterdataErrorMessage: string;

  pndtmtpMasterResponse: PndtMtpMasterResponse;
  counsellingprepndtRequest: CounsellPrePndtResquest;
  counsellingprepndtResponse: CounsellPrePndtResponse;
  addCounsellingRequest: AddPrePndtCounsellingRequest;
  addCounsellingResponse: AddPrePndtcCounsellingResponse;
  prePndtFileUploadResponse: prePndtFileUploadResponse;
  prePNDTCFileDetails: FileDetails;
  counsellinglists: CounsellingList[] = [];
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

  consentForm: File;
  pregnacyArray = [{"id":true,"name":"OG Continue"},{"id":false,"name":"Plan for MTP"}];
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

    if (scrollPosition > 180) {
      $('#showhidediv').show();
    }
    else
      $('#showhidediv').hide();

  }

  constructor(
    private dataservice: DataService,
    private pndtmtpMasterService: PndtMtpMasterService,
    private updatePregnacyService: updatePregnacyService,
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
    this.activatedRoute.queryParams.subscribe(params => {
      this.anwSubjectId = params['q'];
      this.retrivecounselledlists();
      this.dataservice.sendData(JSON.stringify({"screen": "Haematologist","module": " Update Pregnancy Continue" }));
    });

    
  }


    
  retrivecounselledlists() {

    this.loaderService.display(true);
    this.counsellinglists = [];
    this.updatepndtcErrorMessage = '';
    let counsellingdata = this.updatePregnacyService.getcounsellingLists()
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

              if(this.counsellingdataItem.foetusDetail.length > 0)
              {
                this.counsellingdataItem.foetusDetail.forEach(element => {
                  element.pregnancyContinue = true;
                });
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

  submitData()
  {

    var _obj = {};
    var _tempArr = [];
    if(this.counsellingdataItem.foetusDetail.length > 0)
    {
     
      console.log(this.counsellingdataItem.foetusDetail);
      this.counsellingdataItem.foetusDetail.forEach(element => {
        _obj = {};
        _obj['pndTestId'] = element.pndTestId;
        _obj['pndtFoetusId'] = element.pndtFoetusId;
        _obj['planForPregnencyContinue'] = element.pregnancyContinue == true ?  true : false;
        _obj['userId'] = this.user.id;
          _tempArr.push(_obj);
      });
console.log(_tempArr);
      Swal.fire({ allowOutsideClick: false,
        title: 'Are you sure?',
        text: "You want to confirm?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#ffffff'
      }).then((result) => {
        if (result.value) {
          this.loaderService.display(true);
          this.updatePregnacyService.updatePregnacyDetails({'updateRequest':_tempArr})
      .subscribe(response => {
        this.loaderService.display(false);
        Swal.fire({
          icon: 'success', title: "Pregnancy data updated Sucessfully!",
          showCancelButton: true, cancelButtonText: 'Close', allowOutsideClick: false
        })
          .then((result) => {
            if (result.value) {
              //this.router.navigate(['/app/anm-viewshipment',{'q':shipmentId}]);
              this.router.navigateByUrl(`/app/update-pregnancy`);
            }
            else {
              this.router.navigateByUrl(`/app/update-pregnancy`);
            }
          });
      },
        (err: HttpErrorResponse) => {
          this.loaderService.display(false);
          this.updatepndtcErrorMessage = err.toString();
        });
  
        }
          
        });
    }
    
  }
  

}
