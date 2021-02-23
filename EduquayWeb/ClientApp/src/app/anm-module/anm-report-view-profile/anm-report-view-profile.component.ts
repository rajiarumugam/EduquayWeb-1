import { Component, OnInit, ViewChild, HostListener, ViewChildren } from '@angular/core';
import { SubjectProfileService } from 'src/app/shared/anm-module/subject-profile/subject-profile.service';
import { AddSubjectprofileRequest, SubjectProfileRequest } from 'src/app/shared/anm-module/subject-profile/subject-profile-request';
import { SubjectProfileResponse, PrimaryDetail, AddressDetail, ParentDetail, PregnancyDetail, ReligionResponse, Religion, GovtIDTypeResponse, GovIdType, CasteResponse, CommunityeResponse, CasteList, CommunityList, RetrieveSubjectProfileList, SubjectProfileList, prePndtCounselling, pndtTesting, postPndtCounselling, mtpService, AddSubjectProfileResponse } from 'src/app/shared/anm-module/subject-profile/subject-profile-response';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatStepper } from '@angular/material/stepper';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { DataService } from 'src/app/shared/data.service';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
import { user } from 'src/app/shared/auth-response';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { DateService } from 'src/app/shared/utility/date.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-anm-report-view-profile',
  templateUrl: './anm-report-view-profile.component.html',
  styleUrls: ['./anm-report-view-profile.component.css']
})
export class AnmReportProfileComponent implements OnInit {

  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChildren('dobPicker') dobPicker;
    
  subjectProfileErrorMessage: string;
  
  subjectProfileRequest: SubjectProfileRequest;
  anmsubjectProfileResponse: RetrieveSubjectProfileList;
  addanmsubjectProfileRequest: AddSubjectprofileRequest;
  addanmsubjectProfileResponse: AddSubjectProfileResponse;
  religionResponse: ReligionResponse;
  user: user;

  /*Date Range configuration starts*/
  dateform: FormGroup;
  DAY = 86400000;
  dyCollectionDate: Date = new Date(Date.now());
  userId: number;
  anmSPFromDate: string ="";
  anmSPToDate: string = "";
  
  religions: Religion[] = [];
  selectedreligion = '';
  govtIdTypeResponse: GovtIDTypeResponse;
  govtIdTypes: GovIdType[] = [];
  selectedgovtidtype = '';
  casteResponse: CasteResponse;
  castes: CasteList[] = [];
  selectedcaste = '';
  communityResponse: CommunityeResponse;
  communities: CommunityList[] = [];
  selectedcommunity = '';
  basicInfo: PrimaryDetail;
  socioDemographicInfo: AddressDetail;
  parentInfo: ParentDetail;
  personalInfo: PregnancyDetail;
  prePndtCounselling: prePndtCounselling;
  pndtTesting: pndtTesting;
  postPndtCounselling: postPndtCounselling;
  mtpService: mtpService;
  subjectprofileLists: SubjectProfileList[]=[];
  subjectprofileItem: SubjectProfileList;;

  searchsubjectid: string;
  subjectId: string;
  uniqueSubjectId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  religionId: number;
  religionName: string;
  casteId: number;
  casteName: string;
  communityId: number;
  communityName: string;
  address1: string;
  address2: string;
  address3: string;
  stateName: string;
  pincode: string;
  districtName: string;
  chcName: string;
  phcName: string;
  scName: string;
  riSite: string;
  dob: string;
  age: number;
  gender: string;
  mobileNo: string;
  emailId: string;
  spouseSubjectId: string;
  spouseFirstName: string;
  spouseMiddleName: string;
  spouseLastName: string;
  spouseContactNo: string;
  govIdTypeId: number;
  govIdType: string;
  govIdDetail: string;
  rchId: string;
  ecNumber: string;
  lmpDate: string;
  gestationalperiod: number;
  g: number;
  p: number;
  l: number;
  a: number;
  motherFirstName: string;
  motherMiddleName: string;
  motherLastName: string;
  motherContactNo: string;
  fatherFirstName: string;
  fatherMiddleName: string;
  fatherLastName: string;
  fatherContactNo: string;
  gaurdianFirstName: string;
  gaurdianMiddleName: string;
  gaurdianLastName: string;
  gaurdianContactNo: string;
  rbskId: string;
  schoolName: string;
  schoolAddress1: string;
  schoolAddress2: string;
  schoolAddress3: string;
  schoolPincode: string;
  schoolCity: string;
  schoolState: string;
  standard: string;
  section: string;
  rollNo: string
  barcodes: string;
  Glists: number[];
  selectedG: number = 0;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  firstFormCheck = false;
  secondFormCheck = false;
  selecteda = null;
  selectedl = null;
  selectedp = null;
  selectedg = null;
  Ldisabled = true;
  Pdisabled = true;
  Adisabled = true;
  selecteddob;
  selectedage;
  createdSubjectId = "";
  disableDatepicker = false;
  ageValidate = false;
  GPLADATA = [{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'},{id:'10',value:'10'}];
  GPLAADATA = [{id:'0',value:'0'},{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'}];
  subjectprofilelistErrorMessage;
  startOptions1: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: new Date(Date.now()),
    maxDate: new Date(Date.now()),
  };

  @HostListener('window:scroll')
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    //console.log('[scroll]', scrollPosition);

    if(scrollPosition > 180)
    {
        $('#showhidediv').show();
    }
    else
      $('#showhidediv').hide();
    
  }

  constructor(
    private SubjectProfileService: SubjectProfileService,
    private modalService: NgbModal,
    private httpService: HttpClient,
    private _formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private dataservice: DataService,
    private dateservice: DateService,
    private router: Router
  ) { }

  ngOnInit() {

    this.user = JSON.parse(this.tokenService.getUser('lu'));
    console.log(this.dataservice.getdata().anmreportData);
    if(this.dataservice.getdata().reportPreviouspage === undefined || this.dataservice.getdata().anmreportData === undefined)
    {
      if(this.user.userRole === "ANM")
        this.router.navigateByUrl(`app/anm-report`);
      if(this.user.userRole === "CHCLTLEVEL1" || this.user.userRole === "CHCSRLT")
        this.router.navigateByUrl(`app/chc-main-report`);
      
    }
    
    this.loaderService.display(true);
    var _obj = {
      "userid":this.user.id,
      "userInput":this.dataservice.getdata().anmreportData.subjectId
    }
    if(this.dataservice.getdata().reportPreviouspage === "CHC")
    {
        let subProfile = this.SubjectProfileService.getparticularanmSCHC(_obj)
        .subscribe(response => {
          this.subjectprofileItem = response.subjectsDetail[0];
          this.loaderService.display(false);
        },
        (err: HttpErrorResponse) => {
          this.subjectprofilelistErrorMessage = err.toString();
        });   
    }
    else
    {
        let subProfile = this.SubjectProfileService.getparticularanmSubjectProfileList(_obj)
        .subscribe(response => {
          this.subjectprofileItem = response.subjectsDetail[0];
          this.loaderService.display(false);
        },
        (err: HttpErrorResponse) => {
          this.subjectprofilelistErrorMessage = err.toString();
        });      
    }
   
   
   
    
    console.log(this.SubjectProfileService.subjectProfileApi);
    
  }
}
