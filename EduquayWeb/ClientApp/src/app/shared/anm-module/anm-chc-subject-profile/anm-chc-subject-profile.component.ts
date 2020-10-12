import { Component, OnInit, ViewChild, HostListener, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AddSubjectprofileRequest, SubjectProfileRequest } from 'src/app/shared/anm-module/subject-profile/subject-profile-request';
import { SubjectProfileResponse, ReligionResponse, Religion, GovtIDTypeResponse, GovIdType, CasteResponse, CasteList, CommunityeResponse, CommunityList, PrimaryDetail, AddressDetail, ParentDetail, PregnancyDetail, RetrieveSubjectProfileList, SubjectProfileList, prePndtCounselling, pndtTesting, postPndtCounselling, mtpService, AddSubjectProfileResponse } from 'src/app/shared/anm-module/subject-profile/subject-profile-response';
import { SubjectProfileService } from 'src/app/shared/anm-module/subject-profile/subject-profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ENDPOINT } from 'src/app/app.constant';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { GenericService } from 'src/app/shared/generic.service';
import { TokenService } from 'src/app/shared/token.service';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { user } from 'src/app/shared/auth-response';
declare var $: any;
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { DataService } from 'src/app/shared/data.service';
import { DateService } from '../../utility/date.service';


@Component({
  selector: 'app-anm-chc-subject-profile',
  templateUrl: './anm-chc-subject-profile.component.html',
  styleUrls: ['./anm-chc-subject-profile.component.css']
})
export class AnmChcSubjectProfileComponent implements OnInit {

  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChildren('dobPicker') dobPicker;

  chcsubjectProfileErrorMessage: string;
  // chcsubjectProfileRequest: SubjectProfileRequest;
  // chcsubjectProfileResponse: SubjectProfileResponse;
  chcsubjectProfileRequest: SubjectProfileRequest;
  chcsubjectProfileResponse: RetrieveSubjectProfileList;
  addchcsubjectProfileRequest: AddSubjectprofileRequest;
  addchcsubjectProfileResponse: AddSubjectProfileResponse;

  subjectprofileLists: SubjectProfileList[] = [];
  chcsubjectprofileItem: SubjectProfileList;
  chcreligionResponse: ReligionResponse;
  user: user;

  /*Date Range configuration starts*/
  dateform: FormGroup;
  DAY = 86400000;
  dyCollectionDate: Date = new Date(Date.now());
  userId: number;
  chcSPFromDate: string = "";
  chcSPToDate: string = "";

  chcreligions: Religion[] = [];
  selectedreligion = '';
  chcgovtIdTypeResponse: GovtIDTypeResponse;
  chcgovtIdTypes: GovIdType[] = [];
  selectedgovtidtype = '';
  chccasteResponse: CasteResponse;
  chccastes: CasteList[] = [];
  selectedcaste = '';
  chccommunityResponse: CommunityeResponse;
  chccommunities: CommunityList[] = [];
  selectedcommunity = '';
  chcbasicInfo: PrimaryDetail;
  chcsocioDemographicInfo: AddressDetail;
  chcparentInfo: ParentDetail;
  chcpersonalInfo: PregnancyDetail;
  chcprePndtCounselling: prePndtCounselling;
  chcpndtTesting: pndtTesting;
  chcpostPndtCounselling: postPndtCounselling;
  chcmtpService: mtpService;
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

    if (scrollPosition > 180) {
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
    private httpClientService: HttpClientService,
    private genericService: GenericService,
    private tokenService: TokenService,
    private masterService: masterService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private dataservice: DataService,
    private activatedRoute: ActivatedRoute,
    private dateservice: DateService

  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "ANM", "submodule": "Subject Profile", "page": "View Subject Profile"}));
    this.loaderService.display(false);
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    console.log(this.SubjectProfileService.chcsubjectprofileListApi);

    this.activatedRoute.queryParams.subscribe(params => {
      this.uniqueSubjectId = params['q'];
      this.chcSubjectProfiledata();
    });

    this.firstFormGroup = this._formBuilder.group({

      firstname: ['null', Validators.required],
      middlename: [''],
      lastname: ['null', Validators.required],
      dob: [''],
      age: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      DDLreligion: ['', Validators.required],
      DDLcaste: ['', Validators.required],
      DDLcommunity: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      ecNumber: [''],
      DDLGovtIDType: [''],
      GovtIDDetail: [''],
      house: ['null', Validators.required],
      street: ['null', Validators.required],
      city: ['null', Validators.required],
      stateName: ['null', Validators.required],
      pincode: ['', [Validators.min(100000), Validators.max(999999)]],
      mobileNo: ['null', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
      spouseFirstName: ['null', Validators.required],
      spouseMiddleName: [''],
      spouseLastName: ['null', Validators.required],
      spouseContactNo: ['null', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
      motherFirstName: [''],
      motherMiddleName: [''],
      motherLastName: [''],
      motherContactNo: ['null', [Validators.min(1000000000), Validators.max(9999999999)]],
      fatherFirstName: [''],
      fatherMiddleName: [''],
      fatherLastName: [''],
      fatherContactNo: ['null', [Validators.min(1000000000), Validators.max(9999999999)]],
      guardianFirstName: [''],
      guardianMiddleName: [''],
      guardianLastName: [''],
      guardianContactNo: ['null', [Validators.min(1000000000), Validators.max(9999999999)]],
      emailId: ['',Validators.email],
      rchId: ['null', Validators.required],
      g: ['', Validators.required],
      p: ['', Validators.required],
      l: ['', Validators.required],
      a: ['', Validators.required],
      schoolname: [''],
      schoolstreet: [''],
      schoolcity: [''],
      schoolstate: [''],
      schoolpincode: ['', [Validators.min(100000), Validators.max(999999)]],
      rbskid: [''],
    });

  }


 
  chcSubjectProfiledata() {
    this.loaderService.display(true);
    
    this.chcsubjectProfileRequest = {
      userId: this.user.id,
      fromDate: this.chcSPFromDate !== '' ? this.chcSPFromDate : '',
      toDate: this.chcSPToDate !== '' ? this.chcSPToDate : '',
    }

    var some = this.SubjectProfileService.getchcSubjectProfileList(this.chcsubjectProfileRequest).subscribe(response => {
      this.chcsubjectProfileResponse = response;
      console.log(this.chcsubjectProfileResponse);
      this.loaderService.display(false);
      if (this.chcsubjectProfileResponse !== null && this.chcsubjectProfileResponse.status === "true") {
        if (this.chcsubjectProfileResponse.subjectsDetail.length <= 0) {
          this.chcsubjectProfileErrorMessage = response.message;
        }
        else {
          this.chcsubjectprofileItem = this.chcsubjectProfileResponse.subjectsDetail.find(profile => profile.primaryDetail.uniqueSubjectId === this.uniqueSubjectId);
          this.selecteddob = this.chcsubjectprofileItem.primaryDetail.dob;
          this.selectedage = this.chcsubjectprofileItem.primaryDetail.age;
          //this.dobPicker.flatpickr.setDate(this.chcsubjectprofileItem.primaryDetail.dob, true, 'm/d/Y');
          this.selectedg = this.chcsubjectprofileItem.pregnancyDetail.g.toString();
          this.selectedp = this.chcsubjectprofileItem.pregnancyDetail.p.toString();
          this.selectedl = this.chcsubjectprofileItem.pregnancyDetail.l.toString();
          this.selecteda = this.chcsubjectprofileItem.pregnancyDetail.a.toString();
        }
      }
      else {
        this.chcsubjectProfileErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.chcsubjectProfileErrorMessage = err.toString();
      });
  }

  validateDateRange(): boolean {
    if (new Date(this.dateform.controls.fromDate.value) > new Date(this.dateform.controls.toDate.value)) {
      return false;
    }
    return true;
  }

  ddlReligion() {
    this.chcreligions = [];
    this.selectedreligion = '0';
    this.SubjectProfileService.getReligion().subscribe(response => {
      this.chcreligionResponse = response;
      if (this.chcreligionResponse !== null && this.chcreligionResponse.status === "true") {
        this.chcreligions = this.chcreligionResponse.religion;
        if (this.chcreligions.length > 0) {
          this.selectedreligion = this.chcsubjectprofileItem.addressDetail.religionId.toString();
          // this.firstFormGroup = new FormGroup({
          //   DDLreligion : new FormControl(this.chcsocioDemographicInfo.religionId.toString())
          // });
        }

      }
      else {
        this.chcsubjectProfileErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.chcsubjectProfileErrorMessage = err.toString();

      });
  }


  ddlGovtIdType() {
    this.chcgovtIdTypes = [];
    this.selectedgovtidtype = '0';
    this.SubjectProfileService.getGovtIdType().subscribe(response => {
      this.chcgovtIdTypeResponse = response;
      if (this.chcgovtIdTypeResponse !== null && this.chcgovtIdTypeResponse.status === "true") {
        this.chcgovtIdTypes = this.chcgovtIdTypeResponse.govIdType;
        if (this.chcgovtIdTypes.length > 0) {
          this.selectedgovtidtype = this.chcsubjectprofileItem.primaryDetail.govIdTypeId.toString();
        }

      }
      else {
        this.chcsubjectProfileErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.chcsubjectProfileErrorMessage = err.toString();

      });
  }

  ddlCaste() {
    this.chccastes = [];
    this.selectedcaste = '0';
    this.SubjectProfileService.getCaste().subscribe(response => {
      this.chccasteResponse = response;
      if (this.chccasteResponse !== null && this.chccasteResponse.status === "true") {
        this.chccastes = this.chccasteResponse.caste;
        if (this.chccastes.length > 0) {
          this.selectedcaste = this.chcsubjectprofileItem.addressDetail.casteId.toString();
          this.onChangecaste(this.chcsubjectprofileItem.addressDetail.casteId.toString())
        }

      }
      else {
        this.chcsubjectProfileErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.chcsubjectProfileErrorMessage = err.toString();

      });
  }

  onChangecaste(code) {
    this.chccommunities = [];
    this.selectedcommunity = '0';
    this.SubjectProfileService.getCommunnity(code).subscribe(response => {
      this.chccommunityResponse = response;
      if (this.chccommunityResponse !== null && this.chccommunityResponse.status === "true") {
        this.chccommunities = this.chccommunityResponse.community;
        if (this.chccommunities.length > 0) {
          if (this.chccommunities.findIndex(com => com.id === this.chcsubjectprofileItem.addressDetail.communityId) >= 0) {
            this.selectedcommunity = this.chcsubjectprofileItem.addressDetail.communityId.toString();
          }
          else {
            this.selectedcommunity = '0';
          }
        }
      }
      else {
        this.chcsubjectProfileErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.chcsubjectProfileErrorMessage = err.toString();

      });
  }

  editchcSubjectProfile(chcsubjectProfiledetail, chcsubjectprofileItem: SubjectProfileList) {
   
    this.selecteddob = chcsubjectprofileItem.primaryDetail.dob;
    this.selectedage = chcsubjectprofileItem.primaryDetail.age;
    this.startOptions1.defaultDate = chcsubjectprofileItem.primaryDetail.dob;
    this.startOptions1.maxDate = moment().format("DD/MM/YYYY");

    if (chcsubjectprofileItem.primaryDetail.childSubjectTypeId === 1) {
      this.ddlReligion();
      this.ddlGovtIdType();
      this.ddlCaste();
      //this.ddlGvalue();
      //this.selectedfirstName = chcsubjectprofileItem.primaryDetail.firstName;
     
      this.firstFormGroup = new FormGroup({
        firstName: new FormControl(chcsubjectprofileItem.primaryDetail.firstName),
        lastName: new FormControl(chcsubjectprofileItem.primaryDetail.lastName),
        middleName: new FormControl(chcsubjectprofileItem.primaryDetail.middleName),
        dob: new FormControl(this.selecteddob),
        age: new FormControl(chcsubjectprofileItem.primaryDetail.age),
        DDLreligion: new FormControl(chcsubjectprofileItem.addressDetail.religionName),
        DDLcaste: new FormControl(chcsubjectprofileItem.addressDetail.casteName),
        DDLcommunity: new FormControl(chcsubjectprofileItem.addressDetail.communityName),

      });
      this.secondFormGroup = new FormGroup({
        house: new FormControl(chcsubjectprofileItem.addressDetail.address1),
        street: new FormControl(chcsubjectprofileItem.addressDetail.address2),
        city: new FormControl(chcsubjectprofileItem.addressDetail.address3),
        stateName: new FormControl(chcsubjectprofileItem.addressDetail.stateName),
        pincode: new FormControl(chcsubjectprofileItem.addressDetail.pincode),
        mobileNo: new FormControl(chcsubjectprofileItem.primaryDetail.mobileNo),
        emailId: new FormControl(chcsubjectprofileItem.primaryDetail.emailId),
        govIdDetail: new FormControl(chcsubjectprofileItem.primaryDetail.govIdDetail),
        rchId: new FormControl(chcsubjectprofileItem.pregnancyDetail.rchId),
        ecNumber: new FormControl(chcsubjectprofileItem.pregnancyDetail.ecNumber),
        spouseFirstName: new FormControl(chcsubjectprofileItem.primaryDetail.spouseFirstName),
        spouseMiddleName: new FormControl(chcsubjectprofileItem.primaryDetail.spouseMiddleName),
        spouseLastName: new FormControl(chcsubjectprofileItem.primaryDetail.spouseLastName),
        spouseContactNo: new FormControl(chcsubjectprofileItem.primaryDetail.spouseContactNo),
        DDLGovtIDType: new FormControl(chcsubjectprofileItem.primaryDetail.govIdType),
        g: new FormControl(chcsubjectprofileItem.pregnancyDetail.g),
        p: new FormControl(chcsubjectprofileItem.pregnancyDetail.p),
        l: new FormControl(chcsubjectprofileItem.pregnancyDetail.l),
        a: new FormControl(chcsubjectprofileItem.pregnancyDetail.a)

      });

      this.modalService.open(
        chcsubjectProfiledetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop: 'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
    }
    else if (chcsubjectprofileItem.primaryDetail.childSubjectTypeId === 2) {
      this.ddlReligion();
      this.ddlGovtIdType();
      this.ddlCaste();
      //this.ddlGvalue();
      //this.selectedfirstName = chcsubjectprofileItem.primaryDetail.firstName;
      this.firstFormGroup = new FormGroup({
        firstName: new FormControl(chcsubjectprofileItem.primaryDetail.firstName),
        lastName: new FormControl(chcsubjectprofileItem.primaryDetail.lastName),
        middleName: new FormControl(chcsubjectprofileItem.primaryDetail.middleName),
        dob: new FormControl(this.selecteddob),
        age: new FormControl(chcsubjectprofileItem.primaryDetail.age),
        DDLreligion: new FormControl(chcsubjectprofileItem.addressDetail.religionName),
        DDLcaste: new FormControl(chcsubjectprofileItem.addressDetail.casteName),
        DDLcommunity: new FormControl(chcsubjectprofileItem.addressDetail.communityName),

      });
      this.secondFormGroup = new FormGroup({
        house: new FormControl(chcsubjectprofileItem.addressDetail.address1),
        street: new FormControl(chcsubjectprofileItem.addressDetail.address2),
        city: new FormControl(chcsubjectprofileItem.addressDetail.address3),
        stateName: new FormControl(chcsubjectprofileItem.addressDetail.stateName),
        pincode: new FormControl(chcsubjectprofileItem.addressDetail.pincode),
        mobileNo: new FormControl(chcsubjectprofileItem.primaryDetail.mobileNo),
        emailId: new FormControl(chcsubjectprofileItem.primaryDetail.emailId),
        govIdDetail: new FormControl(chcsubjectprofileItem.primaryDetail.govIdDetail),
        rchId: new FormControl(chcsubjectprofileItem.pregnancyDetail.rchId),
        ecNumber: new FormControl(chcsubjectprofileItem.pregnancyDetail.ecNumber),
        spouseFirstName: new FormControl(chcsubjectprofileItem.primaryDetail.spouseFirstName),
        spouseMiddleName: new FormControl(chcsubjectprofileItem.primaryDetail.spouseMiddleName),
        spouseLastName: new FormControl(chcsubjectprofileItem.primaryDetail.spouseLastName),
        spouseContactNo: new FormControl(chcsubjectprofileItem.primaryDetail.spouseContactNo),
        DDLGovtIDType: new FormControl(chcsubjectprofileItem.primaryDetail.govIdType),

      });

      this.modalService.open(
        chcsubjectProfiledetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop: 'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
    }
    else if (chcsubjectprofileItem.primaryDetail.childSubjectTypeId === 4 && chcsubjectprofileItem.primaryDetail.maritalStatus === true) {
      this.ddlReligion();
      this.ddlGovtIdType();
      this.ddlCaste();
      //this.ddlGvalue();
      //this.selectedfirstName = chcsubjectprofileItem.primaryDetail.firstName;
      
      this.firstFormGroup = new FormGroup({
        firstName: new FormControl(chcsubjectprofileItem.primaryDetail.firstName),
        lastName: new FormControl(chcsubjectprofileItem.primaryDetail.lastName),
        middleName: new FormControl(chcsubjectprofileItem.primaryDetail.middleName),
        dob: new FormControl(this.selecteddob),
        age: new FormControl(chcsubjectprofileItem.primaryDetail.age),
        DDLreligion: new FormControl(chcsubjectprofileItem.addressDetail.religionName),
        DDLcaste: new FormControl(chcsubjectprofileItem.addressDetail.casteName),
        DDLcommunity: new FormControl(chcsubjectprofileItem.addressDetail.communityName),

      });
      this.secondFormGroup = new FormGroup({
        house: new FormControl(chcsubjectprofileItem.addressDetail.address1),
        street: new FormControl(chcsubjectprofileItem.addressDetail.address2),
        city: new FormControl(chcsubjectprofileItem.addressDetail.address3),
        stateName: new FormControl(chcsubjectprofileItem.addressDetail.stateName),
        pincode: new FormControl(chcsubjectprofileItem.addressDetail.pincode),
        mobileNo: new FormControl(chcsubjectprofileItem.primaryDetail.mobileNo),
        emailId: new FormControl(chcsubjectprofileItem.primaryDetail.emailId),
        govIdDetail: new FormControl(chcsubjectprofileItem.primaryDetail.govIdDetail),
        //rchId: new FormControl(chcsubjectprofileItem.pregnancyDetail.rchId),
        ecNumber: new FormControl(chcsubjectprofileItem.pregnancyDetail.ecNumber),
        spouseFirstName: new FormControl(chcsubjectprofileItem.primaryDetail.spouseFirstName),
        spouseMiddleName: new FormControl(chcsubjectprofileItem.primaryDetail.spouseMiddleName),
        spouseLastName: new FormControl(chcsubjectprofileItem.primaryDetail.spouseLastName),
        spouseContactNo: new FormControl(chcsubjectprofileItem.primaryDetail.spouseContactNo),
        DDLGovtIDType: new FormControl(chcsubjectprofileItem.primaryDetail.govIdType),

      });

      this.modalService.open(
        chcsubjectProfiledetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop: 'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
    }
    else if (chcsubjectprofileItem.primaryDetail.childSubjectTypeId === 4 && chcsubjectprofileItem.primaryDetail.maritalStatus === false) {
      this.ddlReligion();
      this.ddlGovtIdType();
      this.ddlCaste();
      //this.ddlGvalue();
      //this.selectedfirstName = chcsubjectprofileItem.primaryDetail.firstName;
      this.firstFormGroup = new FormGroup({
        firstName: new FormControl(chcsubjectprofileItem.primaryDetail.firstName),
        lastName: new FormControl(chcsubjectprofileItem.primaryDetail.lastName),
        middleName: new FormControl(chcsubjectprofileItem.primaryDetail.middleName),
        dob: new FormControl(this.selecteddob),
        age: new FormControl(chcsubjectprofileItem.primaryDetail.age),
        DDLreligion: new FormControl(chcsubjectprofileItem.addressDetail.religionName),
        DDLcaste: new FormControl(chcsubjectprofileItem.addressDetail.casteName),
        DDLcommunity: new FormControl(chcsubjectprofileItem.addressDetail.communityName),

      });
      this.secondFormGroup = new FormGroup({
        house: new FormControl(chcsubjectprofileItem.addressDetail.address1),
        street: new FormControl(chcsubjectprofileItem.addressDetail.address2),
        city: new FormControl(chcsubjectprofileItem.addressDetail.address3),
        stateName: new FormControl(chcsubjectprofileItem.addressDetail.stateName),
        pincode: new FormControl(chcsubjectprofileItem.addressDetail.pincode),
        mobileNo: new FormControl(chcsubjectprofileItem.primaryDetail.mobileNo),
        emailId: new FormControl(chcsubjectprofileItem.primaryDetail.emailId),
        govIdDetail: new FormControl(chcsubjectprofileItem.primaryDetail.govIdDetail),
        //rchId: new FormControl(chcsubjectprofileItem.pregnancyDetail.rchId),
        ecNumber: new FormControl(chcsubjectprofileItem.pregnancyDetail.ecNumber),
        spouseFirstName: new FormControl(chcsubjectprofileItem.primaryDetail.spouseFirstName),
        spouseMiddleName: new FormControl(chcsubjectprofileItem.primaryDetail.spouseMiddleName),
        spouseLastName: new FormControl(chcsubjectprofileItem.primaryDetail.spouseLastName),
        spouseContactNo: new FormControl(chcsubjectprofileItem.primaryDetail.spouseContactNo),
        DDLGovtIDType: new FormControl(chcsubjectprofileItem.primaryDetail.govIdType),
        motherFirstName: new FormControl(chcsubjectprofileItem.parentDetail.motherFirstName),
        motherMiddleName: new FormControl(chcsubjectprofileItem.parentDetail.motherMiddleName),
        motherLastName: new FormControl(chcsubjectprofileItem.parentDetail.motherLastName),
        motherContactNo: new FormControl(chcsubjectprofileItem.parentDetail.motherContactNo),
        fatherFirstName: new FormControl(chcsubjectprofileItem.parentDetail.fatherFirstName),
        fatherMiddleName: new FormControl(chcsubjectprofileItem.parentDetail.fatherMiddleName),
        fatherLastName: new FormControl(chcsubjectprofileItem.parentDetail.fatherLastName),
        fatherContactNo: new FormControl(chcsubjectprofileItem.parentDetail.fatherContactNo),
        guardianFirstName: new FormControl(chcsubjectprofileItem.parentDetail.gaurdianFirstName),
        guardianMiddleName: new FormControl(chcsubjectprofileItem.parentDetail.gaurdianMiddleName),
        guardianLastName: new FormControl(chcsubjectprofileItem.parentDetail.gaurdianLastName),
        guardianContactNo: new FormControl(chcsubjectprofileItem.parentDetail.gaurdianContactNo),

      });

      this.modalService.open(
        chcsubjectProfiledetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop: 'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
    }
    else if (chcsubjectprofileItem.primaryDetail.childSubjectTypeId === 3) {
      this.ddlReligion();
      this.ddlGovtIdType();
      this.ddlCaste();
      //this.ddlGvalue();
      //this.selectedfirstName = chcsubjectprofileItem.primaryDetail.firstName;
      this.firstFormGroup = new FormGroup({
        firstName: new FormControl(chcsubjectprofileItem.primaryDetail.firstName),
        lastName: new FormControl(chcsubjectprofileItem.primaryDetail.lastName),
        middleName: new FormControl(chcsubjectprofileItem.primaryDetail.middleName),
        dob: new FormControl(this.selecteddob),
        age: new FormControl(chcsubjectprofileItem.primaryDetail.age),
        DDLreligion: new FormControl(chcsubjectprofileItem.addressDetail.religionName),
        DDLcaste: new FormControl(chcsubjectprofileItem.addressDetail.casteName),
        DDLcommunity: new FormControl(chcsubjectprofileItem.addressDetail.communityName),

      });
      this.secondFormGroup = new FormGroup({
        house: new FormControl(chcsubjectprofileItem.addressDetail.address1),
        street: new FormControl(chcsubjectprofileItem.addressDetail.address2),
        city: new FormControl(chcsubjectprofileItem.addressDetail.address3),
        stateName: new FormControl(chcsubjectprofileItem.addressDetail.stateName),
        pincode: new FormControl(chcsubjectprofileItem.addressDetail.pincode),
        mobileNo: new FormControl(chcsubjectprofileItem.primaryDetail.mobileNo),
        emailId: new FormControl(chcsubjectprofileItem.primaryDetail.emailId),
        govIdDetail: new FormControl(chcsubjectprofileItem.primaryDetail.govIdDetail),
        //rchId: new FormControl(chcsubjectprofileItem.pregnancyDetail.rchId),
        ecNumber: new FormControl(chcsubjectprofileItem.pregnancyDetail.ecNumber),
        spouseFirstName: new FormControl(chcsubjectprofileItem.primaryDetail.spouseFirstName),
        spouseMiddleName: new FormControl(chcsubjectprofileItem.primaryDetail.spouseMiddleName),
        spouseLastName: new FormControl(chcsubjectprofileItem.primaryDetail.spouseLastName),
        spouseContactNo: new FormControl(chcsubjectprofileItem.primaryDetail.spouseContactNo),
        DDLGovtIDType: new FormControl(chcsubjectprofileItem.primaryDetail.govIdType),
        motherFirstName: new FormControl(chcsubjectprofileItem.parentDetail.motherFirstName),
        motherMiddleName: new FormControl(chcsubjectprofileItem.parentDetail.motherMiddleName),
        motherLastName: new FormControl(chcsubjectprofileItem.parentDetail.motherLastName),
        motherContactNo: new FormControl(chcsubjectprofileItem.parentDetail.motherContactNo),
        fatherFirstName: new FormControl(chcsubjectprofileItem.parentDetail.fatherFirstName),
        fatherMiddleName: new FormControl(chcsubjectprofileItem.parentDetail.fatherMiddleName),
        fatherLastName: new FormControl(chcsubjectprofileItem.parentDetail.fatherLastName),
        fatherContactNo: new FormControl(chcsubjectprofileItem.parentDetail.fatherContactNo),
        guardianFirstName: new FormControl(chcsubjectprofileItem.parentDetail.gaurdianFirstName),
        guardianMiddleName: new FormControl(chcsubjectprofileItem.parentDetail.gaurdianMiddleName),
        guardianLastName: new FormControl(chcsubjectprofileItem.parentDetail.gaurdianLastName),
        guardianContactNo: new FormControl(chcsubjectprofileItem.parentDetail.gaurdianContactNo),
        schoolname: new FormControl(chcsubjectprofileItem.parentDetail.schoolName),
        schoolstreet: new FormControl(chcsubjectprofileItem.parentDetail.schoolAddress1),
        schoolcity: new FormControl(chcsubjectprofileItem.parentDetail.schoolCity),
        schoolstate: new FormControl(chcsubjectprofileItem.parentDetail.schoolState),
        schoolpincode: new FormControl(chcsubjectprofileItem.parentDetail.schoolPincode),
        rbskid: new FormControl(chcsubjectprofileItem.parentDetail.rbskId),


      });

      this.modalService.open(
        chcsubjectProfiledetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop: 'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
    }
   
  }


  calculateAge() {
    var today = new Date();
    var birthDate = this.dateservice.convertToDateFormat(this.selecteddob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.ageValidate = true;
    this.selectedage = age;
    //return age;
  }
  ageEntered() {
    if (!this.ageValidate)
      this.dobPicker.flatpickr.setDate("");

    this.ageValidate = false;
  }

  nextStep(stepper: MatStepper) {
    this.firstFormCheck = true;
    if (this.firstFormGroup.valid)
      stepper.next();
  }


  prevStep(stepper: MatStepper) {
    stepper.previous();
  }

  gonChange()
  {
    this.Pdisabled = false;
    this.Ldisabled = true;
    this.selectedl = null;
    this.selecteda = null;
    this.selectedp = null;
  }
  ponChange()
  {
    /*this.selecteda = +this.selectedg - +this.selectedp;
    if(this.selecteda === 0)
    this.selecteda = "00";*/
    this.Ldisabled = false;
  }


  formSubmit() {
    this.chcsubjectProfileErrorMessage = "";
    // this.firstName = this.firstFormGroup.controls.firstName.value;
    // this.middleName = this.firstFormGroup.controls.middleName.value;
    // this.lastName = this.firstFormGroup.controls.lastName.value;
    // this.age = this.firstFormGroup.controls.age.value;
    // this.dob = this.firstFormGroup.controls.dob.value;
    // this.emailId = this.secondFormGroup.controls.emailId.value;
    // this.govIdTypeId = +this.secondFormGroup.controls.DDLGovtIDType.value;
    // this.govIdDetail = this.secondFormGroup.controls.govIdDetail.value;
    // this.rchId = this.secondFormGroup.controls.rchId.value;
    // this.ecNumber = this.secondFormGroup.controls.ecNumber.value.toString();;
    // this.spouseFirstName = this.secondFormGroup.controls.spouseFirstName.value;
    // this.spouseMiddleName = this.secondFormGroup.controls.spouseMiddleName.value;
    // this.spouseLastName = this.secondFormGroup.controls.spouseLastName.value;
     //this.spouseContactNo = this.secondFormGroup.controls.spouseContactNo.value.toString();
    // this.mobileNo = this.secondFormGroup.controls.mobileNo.value.toString();
    // this.address1 = this.secondFormGroup.controls.house.value;
    // this.address2 = this.secondFormGroup.controls.street.value;
    // this.address3 = this.secondFormGroup.controls.city.value;
    // this.pincode = this.secondFormGroup.controls.pincode.value.toString();;
    // this.stateName = this.secondFormGroup.controls.stateName.value;
    // this.motherFirstName = this.secondFormGroup.controls.motherFirstName.value;
    // this.motherMiddleName = this.secondFormGroup.controls.motherMiddleName.value;
    // this.motherLastName = this.secondFormGroup.controls.motherLastName.value;
    //this.motherContactNo = this.secondFormGroup.controls.motherContactNo.value.toString();;
    // this.fatherFirstName = this.secondFormGroup.controls.fatherFirstName.value;
    // this.fatherMiddleName = this.secondFormGroup.controls.fatherMiddleName.value;
    // this.fatherLastName = this.secondFormGroup.controls.fatherLastName.value;
    // this.fatherContactNo = this.secondFormGroup.controls.fatherContactNo.value.toString();;
    // this.gaurdianFirstName = this.secondFormGroup.controls.guardianFirstName.value;
    // this.gaurdianMiddleName = this.secondFormGroup.controls.guardianMiddleName.value;
    // this.gaurdianLastName = this.secondFormGroup.controls.guardianLastName.value;
    // this.gaurdianContactNo = this.secondFormGroup.controls.guardianContactNo.value.toString();;
    // this.schoolAddress1 = this.secondFormGroup.controls.schoolstreet.value;
    // this.schoolCity = this.secondFormGroup.controls.schoolcity.value;
    // this.schoolState = this.secondFormGroup.controls.schoolstate.value;
    // this.schoolPincode = this.secondFormGroup.controls.schoolpincode.value.toString();;
    // this.schoolName = this.secondFormGroup.controls.schoolname.value;
    // this.rbskId = this.secondFormGroup.controls.rbskid.value.toString();;

    this.secondFormCheck = true;
    if (this.secondFormGroup.valid && this.firstFormGroup.valid) {
      if (this.chcsubjectprofileItem.primaryDetail.childSubjectTypeId === 1) {

        this.firstName = this.firstFormGroup.controls.firstName.value;
        this.middleName = this.firstFormGroup.controls.middleName.value;
        this.lastName = this.firstFormGroup.controls.lastName.value;
        this.age = this.firstFormGroup.controls.age.value;
        if( typeof(this.firstFormGroup.controls.dob.value) === 'string' ){
          this.dob = this.firstFormGroup.controls.dob.value;
        }
        else{
          var getdobdate = this.firstFormGroup.controls.dob.value;
          this.dob =  moment(new Date(getdobdate)).format("DD/MM/YYYY");
        }      
        this.emailId = this.secondFormGroup.controls.emailId.value;
        this.govIdTypeId = +this.secondFormGroup.controls.DDLGovtIDType.value;
        this.govIdDetail = this.secondFormGroup.controls.govIdDetail.value;
        this.rchId = this.secondFormGroup.controls.rchId.value;
        this.ecNumber = this.secondFormGroup.controls.ecNumber.value.toString();;
        this.spouseFirstName = this.secondFormGroup.controls.spouseFirstName.value;
        this.spouseMiddleName = this.secondFormGroup.controls.spouseMiddleName.value;
        this.spouseLastName = this.secondFormGroup.controls.spouseLastName.value;
        this.spouseContactNo = this.secondFormGroup.controls.spouseContactNo.value.toString();
        this.mobileNo = this.secondFormGroup.controls.mobileNo.value.toString();
        this.address1 = this.secondFormGroup.controls.house.value;
        this.address2 = this.secondFormGroup.controls.street.value;
        this.address3 = this.secondFormGroup.controls.city.value;
        this.pincode = this.secondFormGroup.controls.pincode.value.toString();
        this.stateName = this.secondFormGroup.controls.stateName.value;
        this.selectedg = this.secondFormGroup.controls.g.value;
        this.selectedp = this.secondFormGroup.controls.p.value;
        this.selectedl = this.secondFormGroup.controls.l.value;
        this.selecteda = this.secondFormGroup.controls.a.value;

        this.addchcsubjectProfileRequest = {
          subjectPrimaryRequest: {
            subjectTypeId: this.chcsubjectprofileItem.primaryDetail.subjectTypeId,
            childSubjectTypeId: this.chcsubjectprofileItem.primaryDetail.childSubjectTypeId,
            uniqueSubjectId: this.chcsubjectprofileItem.primaryDetail.uniqueSubjectId,
            districtId: this.chcsubjectprofileItem.primaryDetail.districtId,
            chcId: this.chcsubjectprofileItem.primaryDetail.chcId,
            phcId: this.chcsubjectprofileItem.primaryDetail.phcId,
            scId: this.chcsubjectprofileItem.primaryDetail.scId,
            riId: this.chcsubjectprofileItem.primaryDetail.riId,
            subjectTitle: this.chcsubjectprofileItem.primaryDetail.subjectTitle,
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            dob: this.dob,
            age: this.age,
            gender: this.chcsubjectprofileItem.primaryDetail.gender,
            maritalStatus: this.chcsubjectprofileItem.primaryDetail.maritalStatus,
            mobileNo: this.mobileNo,
            emailId: this.emailId,
            govIdTypeId: this.govIdTypeId,
            govIdDetail: this.govIdDetail,
            spouseSubjectId: this.chcsubjectprofileItem.primaryDetail.spouseSubjectId,
            spouseFirstName: this.spouseFirstName,
            spouseMiddleName: this.spouseMiddleName,
            spouseLastName: this.spouseLastName,
            spouseContactNo: this.spouseContactNo,
            spouseGovIdTypeId: 0,
            spouseGovIdDetail: '',
            assignANMId: this.chcsubjectprofileItem.primaryDetail.assignANMId,
            dateOfRegister: this.chcsubjectprofileItem.primaryDetail.dateOfRegister,
            registeredFrom: this.user.registeredFrom,
            createdBy: this.user.id,
            source: 'N',
          },
          subjectAddressRequest: {
            religionId: +(this.selectedreligion),
            casteId: +(this.selectedcaste),
            communityId: +(this.selectedcommunity),
            address1: this.address1,
            address2: this.address2,
            address3: this.address3,
            pincode: this.pincode,
            stateName: this.stateName,
            updatedBy: this.user.id
          },
          subjectPregnancyRequest: {
            rchId: this.rchId,
            ecNumber: this.ecNumber,
            lmpDate: this.chcsubjectprofileItem.pregnancyDetail.lmpDate,
            // g: this.g,
            // p: this.p,
            // l: this.l,
            // a: this.a,
            g: +(this.selectedg),
            p: +(this.selectedp),
            l: +(this.selectedl),
            a: +(this.selecteda),
            updatedBy: this.user.id,
          },
          subjectParentRequest: {
            motherFirstName: this.chcsubjectprofileItem.parentDetail.motherFirstName,
            motherMiddleName: this.chcsubjectprofileItem.parentDetail.motherMiddleName,
            motherLastName: this.chcsubjectprofileItem.parentDetail.motherLastName,
            motherGovIdTypeId: 0,
            motherGovIdDetail: '',
            motherContactNo: this.chcsubjectprofileItem.parentDetail.motherContactNo,
            fatherFirstName: this.chcsubjectprofileItem.parentDetail.fatherFirstName,
            fatherMiddleName: this.chcsubjectprofileItem.parentDetail.fatherMiddleName,
            fatherLastName: this.chcsubjectprofileItem.parentDetail.fatherLastName,
            fatherGovIdTypeId: 0,
            fatherGovIdDetail: "",
            fatherContactNo: this.chcsubjectprofileItem.parentDetail.fatherContactNo,
            gaurdianFirstName: this.chcsubjectprofileItem.parentDetail.gaurdianFirstName,
            gaurdianMiddleName: this.chcsubjectprofileItem.parentDetail.gaurdianMiddleName,
            gaurdianLastName: this.chcsubjectprofileItem.parentDetail.gaurdianLastName,
            gaurdianGovIdTypeId: 0,
            gaurdianGovIdDetail: "",
            gaurdianContactNo: this.chcsubjectprofileItem.parentDetail.gaurdianContactNo,
            rbskId: this.chcsubjectprofileItem.parentDetail.rbskId,
            schoolName: this.chcsubjectprofileItem.parentDetail.schoolName,
            schoolAddress1: this.chcsubjectprofileItem.parentDetail.schoolAddress1,
            schoolAddress2: "",
            schoolAddress3: "",
            schoolPincode: this.chcsubjectprofileItem.parentDetail.schoolPincode,
            schoolCity: this.chcsubjectprofileItem.parentDetail.schoolCity,
            schoolState: this.chcsubjectprofileItem.parentDetail.schoolState,
            standard: this.chcsubjectprofileItem.parentDetail.standard,
            section: this.chcsubjectprofileItem.parentDetail.section,
            rollNo: this.chcsubjectprofileItem.parentDetail.rollNo,
            updatedBy: this.user.id,
          }
        }
        // this.showResponseMessage('testing done', 's');
        // return false;
        var some = this.SubjectProfileService.addSubjectProfile(this.addchcsubjectProfileRequest).subscribe(response => {
          this.addchcsubjectProfileResponse = response;
          console.log(this.addchcsubjectProfileResponse);
          this.loaderService.display(false);
          if (this.addchcsubjectProfileResponse !== null && this.addchcsubjectProfileResponse.status === true) {
            this.showResponseMessage(this.addchcsubjectProfileResponse.message, 's')
          } else {
            this.showResponseMessage(this.addchcsubjectProfileResponse.message, 'e');
            this.chcsubjectProfileErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.chcsubjectProfileErrorMessage = err.toString();
          });
      }
      else if (this.chcsubjectprofileItem.primaryDetail.childSubjectTypeId === 2) {

        this.firstName = this.firstFormGroup.controls.firstName.value;
        this.middleName = this.firstFormGroup.controls.middleName.value;
        this.lastName = this.firstFormGroup.controls.lastName.value;
        this.age = this.firstFormGroup.controls.age.value;
        if( typeof(this.firstFormGroup.controls.dob.value) === 'string' ){
          this.dob = this.firstFormGroup.controls.dob.value;
        }
        else{
          var getdobdate = this.firstFormGroup.controls.dob.value;
          this.dob =  moment(new Date(getdobdate)).format("DD/MM/YYYY");
        }      
        this.emailId = this.secondFormGroup.controls.emailId.value;
        this.govIdTypeId = +this.secondFormGroup.controls.DDLGovtIDType.value;
        this.govIdDetail = this.secondFormGroup.controls.govIdDetail.value;
        //this.rchId = this.secondFormGroup.controls.rchId.value;
        this.ecNumber = this.secondFormGroup.controls.ecNumber.value.toString();;
        this.spouseFirstName = this.secondFormGroup.controls.spouseFirstName.value;
        this.spouseMiddleName = this.secondFormGroup.controls.spouseMiddleName.value;
        this.spouseLastName = this.secondFormGroup.controls.spouseLastName.value;
        this.spouseContactNo = this.secondFormGroup.controls.spouseContactNo.value.toString();
        this.mobileNo = this.secondFormGroup.controls.mobileNo.value.toString();
        this.address1 = this.secondFormGroup.controls.house.value;
        this.address2 = this.secondFormGroup.controls.street.value;
        this.address3 = this.secondFormGroup.controls.city.value;
        this.pincode = this.secondFormGroup.controls.pincode.value.toString();
        this.stateName = this.secondFormGroup.controls.stateName.value;

        this.addchcsubjectProfileRequest = {

          subjectPrimaryRequest: {
            subjectTypeId: this.chcsubjectprofileItem.primaryDetail.subjectTypeId,
            childSubjectTypeId: this.chcsubjectprofileItem.primaryDetail.childSubjectTypeId,
            uniqueSubjectId: this.chcsubjectprofileItem.primaryDetail.uniqueSubjectId,
            districtId: this.chcsubjectprofileItem.primaryDetail.districtId,
            chcId: this.chcsubjectprofileItem.primaryDetail.chcId,
            phcId: this.chcsubjectprofileItem.primaryDetail.phcId,
            scId: this.chcsubjectprofileItem.primaryDetail.scId,
            riId: this.chcsubjectprofileItem.primaryDetail.riId,
            subjectTitle: this.chcsubjectprofileItem.primaryDetail.subjectTitle,
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            dob: this.dob,
            age: this.age,
            gender: this.chcsubjectprofileItem.primaryDetail.gender,
            maritalStatus: this.chcsubjectprofileItem.primaryDetail.maritalStatus,
            mobileNo: this.mobileNo,
            emailId: this.emailId,
            govIdTypeId: this.govIdTypeId,
            govIdDetail: this.govIdDetail,
            spouseSubjectId: this.chcsubjectprofileItem.primaryDetail.spouseSubjectId,
            spouseFirstName: this.spouseFirstName,
            spouseMiddleName: this.spouseMiddleName,
            spouseLastName: this.spouseLastName,
            spouseContactNo: this.spouseContactNo,
            spouseGovIdTypeId: 0,
            spouseGovIdDetail: '',
            assignANMId: this.chcsubjectprofileItem.primaryDetail.assignANMId,
            dateOfRegister: this.chcsubjectprofileItem.primaryDetail.dateOfRegister,
            registeredFrom: this.user.registeredFrom,
            createdBy: this.user.id,
            source: 'N',
          },
          subjectAddressRequest: {
            religionId: +(this.selectedreligion),
            casteId: +(this.selectedcaste),
            communityId: +(this.selectedcommunity),
            address1: this.address1,
            address2: this.address2,
            address3: this.address3,
            pincode: this.pincode,
            stateName: this.stateName,
            updatedBy: this.user.id
          },
          subjectPregnancyRequest: {
            rchId: this.chcsubjectprofileItem.pregnancyDetail.rchId,
            ecNumber: this.ecNumber,
            lmpDate: this.chcsubjectprofileItem.pregnancyDetail.lmpDate,
            g: this.chcsubjectprofileItem.pregnancyDetail.g,
            p: this.chcsubjectprofileItem.pregnancyDetail.p,
            l: this.chcsubjectprofileItem.pregnancyDetail.l,
            a: this.chcsubjectprofileItem.pregnancyDetail.a,
            updatedBy: this.user.id,
          },
          subjectParentRequest: {
            motherFirstName: this.chcsubjectprofileItem.parentDetail.motherFirstName,
            motherMiddleName: this.chcsubjectprofileItem.parentDetail.motherMiddleName,
            motherLastName: this.chcsubjectprofileItem.parentDetail.motherLastName,
            motherGovIdTypeId: 0,
            motherGovIdDetail: '',
            motherContactNo: this.chcsubjectprofileItem.parentDetail.motherContactNo,
            fatherFirstName: this.chcsubjectprofileItem.parentDetail.fatherFirstName,
            fatherMiddleName: this.chcsubjectprofileItem.parentDetail.fatherMiddleName,
            fatherLastName: this.chcsubjectprofileItem.parentDetail.fatherLastName,
            fatherGovIdTypeId: 0,
            fatherGovIdDetail: "",
            fatherContactNo: this.chcsubjectprofileItem.parentDetail.fatherContactNo,
            gaurdianFirstName: this.chcsubjectprofileItem.parentDetail.gaurdianFirstName,
            gaurdianMiddleName: this.chcsubjectprofileItem.parentDetail.gaurdianMiddleName,
            gaurdianLastName: this.chcsubjectprofileItem.parentDetail.gaurdianLastName,
            gaurdianGovIdTypeId: 0,
            gaurdianGovIdDetail: "",
            gaurdianContactNo: this.chcsubjectprofileItem.parentDetail.gaurdianContactNo,
            rbskId: this.chcsubjectprofileItem.parentDetail.rbskId,
            schoolName: this.chcsubjectprofileItem.parentDetail.schoolName,
            schoolAddress1: this.chcsubjectprofileItem.parentDetail.schoolAddress1,
            schoolAddress2: "",
            schoolAddress3: "",
            schoolPincode: this.chcsubjectprofileItem.parentDetail.schoolPincode,
            schoolCity: this.chcsubjectprofileItem.parentDetail.schoolCity,
            schoolState: this.chcsubjectprofileItem.parentDetail.schoolState,
            standard: this.chcsubjectprofileItem.parentDetail.standard,
            section: this.chcsubjectprofileItem.parentDetail.section,
            rollNo: this.chcsubjectprofileItem.parentDetail.rollNo,
            updatedBy: this.user.id,
          }
        }
        // this.showResponseMessage('testing done', 's');
        // return false;
        var some = this.SubjectProfileService.addSubjectProfile(this.addchcsubjectProfileRequest).subscribe(response => {
          this.addchcsubjectProfileResponse = response;
          console.log(this.addchcsubjectProfileResponse);
          this.loaderService.display(false);
          if (this.addchcsubjectProfileResponse !== null && this.addchcsubjectProfileResponse.status === true) {
            this.showResponseMessage(this.addchcsubjectProfileResponse.message, 's')
          } else {
            this.showResponseMessage(this.addchcsubjectProfileResponse.message, 'e');
            this.chcsubjectProfileErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.chcsubjectProfileErrorMessage = err.toString();
          });
      }
      else if (this.chcsubjectprofileItem.primaryDetail.childSubjectTypeId === 3) {

        this.firstName = this.firstFormGroup.controls.firstName.value;
    this.middleName = this.firstFormGroup.controls.middleName.value;
    this.lastName = this.firstFormGroup.controls.lastName.value;
    this.age = this.firstFormGroup.controls.age.value;
    if( typeof(this.firstFormGroup.controls.dob.value) === 'string' ){
      this.dob = this.firstFormGroup.controls.dob.value;
    }
    else{
      var getdobdate = this.firstFormGroup.controls.dob.value;
      this.dob =  moment(new Date(getdobdate)).format("DD/MM/YYYY");
    }      
    this.emailId = this.secondFormGroup.controls.emailId.value;
    this.govIdTypeId = +this.secondFormGroup.controls.DDLGovtIDType.value;
    this.govIdDetail = this.secondFormGroup.controls.govIdDetail.value;
    //this.rchId = this.secondFormGroup.controls.rchId.value;
    this.ecNumber = this.secondFormGroup.controls.ecNumber.value.toString();;
    // this.spouseFirstName = this.secondFormGroup.controls.spouseFirstName.value;
    // this.spouseMiddleName = this.secondFormGroup.controls.spouseMiddleName.value;
    // this.spouseLastName = this.secondFormGroup.controls.spouseLastName.value;
    // this.spouseContactNo = this.secondFormGroup.controls.spouseContactNo.value.toString();;
    this.mobileNo = this.secondFormGroup.controls.mobileNo.value.toString();
    this.address1 = this.secondFormGroup.controls.house.value;
    this.address2 = this.secondFormGroup.controls.street.value;
    this.address3 = this.secondFormGroup.controls.city.value;
    this.pincode = this.secondFormGroup.controls.pincode.value.toString();
    this.stateName = this.secondFormGroup.controls.stateName.value;
    this.motherFirstName = this.secondFormGroup.controls.motherFirstName.value;
    this.motherMiddleName = this.secondFormGroup.controls.motherMiddleName.value;
    this.motherLastName = this.secondFormGroup.controls.motherLastName.value;
   this.motherContactNo = this.secondFormGroup.controls.motherContactNo.value.toString();
    this.fatherFirstName = this.secondFormGroup.controls.fatherFirstName.value;
    this.fatherMiddleName = this.secondFormGroup.controls.fatherMiddleName.value;
    this.fatherLastName = this.secondFormGroup.controls.fatherLastName.value;
    this.fatherContactNo = this.secondFormGroup.controls.fatherContactNo.value.toString();
    this.gaurdianFirstName = this.secondFormGroup.controls.guardianFirstName.value;
    this.gaurdianMiddleName = this.secondFormGroup.controls.guardianMiddleName.value;
    this.gaurdianLastName = this.secondFormGroup.controls.guardianLastName.value;
    this.gaurdianContactNo = this.secondFormGroup.controls.guardianContactNo.value.toString();
    this.schoolAddress1 = this.secondFormGroup.controls.schoolstreet.value;
    this.schoolCity = this.secondFormGroup.controls.schoolcity.value;
    this.schoolState = this.secondFormGroup.controls.schoolstate.value;
    this.schoolPincode = this.secondFormGroup.controls.schoolpincode.value.toString();
    this.schoolName = this.secondFormGroup.controls.schoolname.value;
    this.rbskId = this.secondFormGroup.controls.rbskid.value.toString();

        this.addchcsubjectProfileRequest = {
          subjectPrimaryRequest: {
            subjectTypeId: this.chcsubjectprofileItem.primaryDetail.subjectTypeId,
            childSubjectTypeId: this.chcsubjectprofileItem.primaryDetail.childSubjectTypeId,
            uniqueSubjectId: this.chcsubjectprofileItem.primaryDetail.uniqueSubjectId,
            districtId: this.chcsubjectprofileItem.primaryDetail.districtId,
            chcId: this.chcsubjectprofileItem.primaryDetail.chcId,
            phcId: this.chcsubjectprofileItem.primaryDetail.phcId,
            scId: this.chcsubjectprofileItem.primaryDetail.scId,
            riId: this.chcsubjectprofileItem.primaryDetail.riId,
            subjectTitle: this.chcsubjectprofileItem.primaryDetail.subjectTitle,
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            dob: this.dob,
            age: this.age,
            gender: this.chcsubjectprofileItem.primaryDetail.gender,
            maritalStatus: this.chcsubjectprofileItem.primaryDetail.maritalStatus,
            mobileNo: this.mobileNo,
            emailId: this.emailId,
            govIdTypeId: this.govIdTypeId,
            govIdDetail: this.govIdDetail,
            spouseSubjectId: this.chcsubjectprofileItem.primaryDetail.spouseSubjectId,
            spouseFirstName: '',
            spouseMiddleName: '',
            spouseLastName: '',
            spouseContactNo: '',
            spouseGovIdTypeId: 0,
            spouseGovIdDetail: '',
            assignANMId: this.chcsubjectprofileItem.primaryDetail.assignANMId,
            dateOfRegister: this.chcsubjectprofileItem.primaryDetail.dateOfRegister,
            registeredFrom: this.user.registeredFrom,
            createdBy: this.user.id,
            source: 'N',
          },
          subjectAddressRequest: {
            religionId: +(this.selectedreligion),
            casteId: +(this.selectedcaste),
            communityId: +(this.selectedcommunity),
            address1: this.address1,
            address2: this.address2,
            address3: this.address3,
            pincode: this.pincode,
            stateName: this.stateName,
            updatedBy: this.user.id
          },
          subjectPregnancyRequest: {
            rchId: this.chcsubjectprofileItem.pregnancyDetail.rchId,
            ecNumber: this.ecNumber,
            lmpDate: this.chcsubjectprofileItem.pregnancyDetail.lmpDate,
            g: this.chcsubjectprofileItem.pregnancyDetail.g,
            p: this.chcsubjectprofileItem.pregnancyDetail.p,
            l: this.chcsubjectprofileItem.pregnancyDetail.l,
            a: this.chcsubjectprofileItem.pregnancyDetail.a,
            updatedBy: this.user.id,
          },
          subjectParentRequest: {
            motherFirstName: this.motherFirstName,
            motherMiddleName: this.motherMiddleName,
            motherLastName: this.motherLastName,
            motherGovIdTypeId: 0,
            motherGovIdDetail: "",
            motherContactNo: this.motherContactNo,
            fatherFirstName: this.fatherFirstName,
            fatherMiddleName: this.fatherMiddleName,
            fatherLastName: this.fatherLastName,
            fatherGovIdTypeId: 0,
            fatherGovIdDetail: "",
            fatherContactNo: this.fatherContactNo,
            gaurdianFirstName: this.gaurdianFirstName,
            gaurdianMiddleName: this.gaurdianMiddleName,
            gaurdianLastName: this.gaurdianLastName,
            gaurdianGovIdTypeId: 0,
            gaurdianGovIdDetail: "",
            gaurdianContactNo: this.gaurdianContactNo,
            rbskId: this.rbskId,
            schoolName: this.schoolName,
            schoolAddress1: this.schoolAddress1,
            schoolAddress2: "",
            schoolAddress3: "",
            schoolPincode: this.schoolPincode,
            schoolCity: this.schoolCity,
            schoolState: this.schoolState,
            standard: this.chcsubjectprofileItem.parentDetail.standard,
            section: this.chcsubjectprofileItem.parentDetail.section,
            rollNo: this.chcsubjectprofileItem.parentDetail.rollNo,
            updatedBy: this.user.id,
          }
        }
        // this.showResponseMessage('testing done', 's');
        // return false;
        var some = this.SubjectProfileService.addSubjectProfile(this.addchcsubjectProfileRequest).subscribe(response => {
          this.addchcsubjectProfileResponse = response;
          console.log(this.addchcsubjectProfileResponse);
          this.loaderService.display(false);
          if (this.addchcsubjectProfileResponse !== null && this.addchcsubjectProfileResponse.status === true) {
            this.showResponseMessage(this.addchcsubjectProfileResponse.message, 's')
          } else {
            this.showResponseMessage(this.addchcsubjectProfileResponse.message, 'e');
            this.chcsubjectProfileErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.chcsubjectProfileErrorMessage = err.toString();
          });
      }
      else if (this.chcsubjectprofileItem.primaryDetail.childSubjectTypeId === 4 && this.chcsubjectprofileItem.primaryDetail.maritalStatus === true) {

        this.firstName = this.firstFormGroup.controls.firstName.value;
    this.middleName = this.firstFormGroup.controls.middleName.value;
    this.lastName = this.firstFormGroup.controls.lastName.value;
    this.age = this.firstFormGroup.controls.age.value;
    if( typeof(this.firstFormGroup.controls.dob.value) === 'string' ){
      this.dob = this.firstFormGroup.controls.dob.value;
    }
    else{
      var getdobdate = this.firstFormGroup.controls.dob.value;
      this.dob =  moment(new Date(getdobdate)).format("DD/MM/YYYY");
    }      
    this.emailId = this.secondFormGroup.controls.emailId.value;
    this.govIdTypeId = +this.secondFormGroup.controls.DDLGovtIDType.value;
    this.govIdDetail = this.secondFormGroup.controls.govIdDetail.value;
    //this.rchId = this.secondFormGroup.controls.rchId.value;
    this.ecNumber = this.secondFormGroup.controls.ecNumber.value.toString();;
    this.spouseFirstName = this.secondFormGroup.controls.spouseFirstName.value;
    this.spouseMiddleName = this.secondFormGroup.controls.spouseMiddleName.value;
    this.spouseLastName = this.secondFormGroup.controls.spouseLastName.value;
    this.spouseContactNo = this.secondFormGroup.controls.spouseContactNo.value.toString();
    this.mobileNo = this.secondFormGroup.controls.mobileNo.value.toString();
    this.address1 = this.secondFormGroup.controls.house.value;
    this.address2 = this.secondFormGroup.controls.street.value;
    this.address3 = this.secondFormGroup.controls.city.value;
    this.pincode = this.secondFormGroup.controls.pincode.value.toString();
    this.stateName = this.secondFormGroup.controls.stateName.value;
    
        this.addchcsubjectProfileRequest = {
          subjectPrimaryRequest: {
            subjectTypeId: this.chcsubjectprofileItem.primaryDetail.subjectTypeId,
            childSubjectTypeId: this.chcsubjectprofileItem.primaryDetail.childSubjectTypeId,
            uniqueSubjectId: this.chcsubjectprofileItem.primaryDetail.uniqueSubjectId,
            districtId: this.chcsubjectprofileItem.primaryDetail.districtId,
            chcId: this.chcsubjectprofileItem.primaryDetail.chcId,
            phcId: this.chcsubjectprofileItem.primaryDetail.phcId,
            scId: this.chcsubjectprofileItem.primaryDetail.scId,
            riId: this.chcsubjectprofileItem.primaryDetail.riId,
            subjectTitle: this.chcsubjectprofileItem.primaryDetail.subjectTitle,
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            dob: this.dob,
            age: this.age,
            gender: this.chcsubjectprofileItem.primaryDetail.gender,
            maritalStatus: this.chcsubjectprofileItem.primaryDetail.maritalStatus,
            mobileNo: this.mobileNo,
            emailId: this.emailId,
            govIdTypeId: this.govIdTypeId,
            govIdDetail: this.govIdDetail,
            spouseSubjectId: this.chcsubjectprofileItem.primaryDetail.spouseSubjectId,
            spouseFirstName: this.spouseFirstName,
            spouseMiddleName: this.spouseMiddleName,
            spouseLastName: this.spouseLastName,
            spouseContactNo: this.spouseContactNo,
            spouseGovIdTypeId: 0,
            spouseGovIdDetail: '',
            assignANMId: this.chcsubjectprofileItem.primaryDetail.assignANMId,
            dateOfRegister: this.chcsubjectprofileItem.primaryDetail.dateOfRegister,
            registeredFrom: this.user.registeredFrom,
            createdBy: this.user.id,
            source: 'N',
          },
          subjectAddressRequest: {
            religionId: +(this.selectedreligion),
            casteId: +(this.selectedcaste),
            communityId: +(this.selectedcommunity),
            address1: this.address1,
            address2: this.address2,
            address3: this.address3,
            pincode: this.pincode,
            stateName: this.stateName,
            updatedBy: this.user.id
          },
          subjectPregnancyRequest: {
            rchId: this.chcsubjectprofileItem.pregnancyDetail.rchId,
            ecNumber: this.ecNumber,
            lmpDate: this.chcsubjectprofileItem.pregnancyDetail.lmpDate,
            g: this.chcsubjectprofileItem.pregnancyDetail.g,
            p: this.chcsubjectprofileItem.pregnancyDetail.l,
            l: this.chcsubjectprofileItem.pregnancyDetail.p,
            a: this.chcsubjectprofileItem.pregnancyDetail.a,
            updatedBy: this.user.id,
          },
          subjectParentRequest: {
            motherFirstName: this.chcsubjectprofileItem.parentDetail.motherFirstName,
            motherMiddleName: this.chcsubjectprofileItem.parentDetail.motherMiddleName,
            motherLastName: this.chcsubjectprofileItem.parentDetail.motherLastName,
            motherGovIdTypeId: 0,
            motherGovIdDetail: '',
            motherContactNo: this.chcsubjectprofileItem.parentDetail.motherContactNo,
            fatherFirstName: this.chcsubjectprofileItem.parentDetail.fatherFirstName,
            fatherMiddleName: this.chcsubjectprofileItem.parentDetail.fatherMiddleName,
            fatherLastName: this.chcsubjectprofileItem.parentDetail.fatherLastName,
            fatherGovIdTypeId: 0,
            fatherGovIdDetail: "",
            fatherContactNo: this.chcsubjectprofileItem.parentDetail.fatherContactNo,
            gaurdianFirstName: this.chcsubjectprofileItem.parentDetail.gaurdianFirstName,
            gaurdianMiddleName: this.chcsubjectprofileItem.parentDetail.gaurdianMiddleName,
            gaurdianLastName: this.chcsubjectprofileItem.parentDetail.gaurdianLastName,
            gaurdianGovIdTypeId: 0,
            gaurdianGovIdDetail: "",
            gaurdianContactNo: this.chcsubjectprofileItem.parentDetail.gaurdianContactNo,
            rbskId: this.chcsubjectprofileItem.parentDetail.rbskId,
            schoolName: this.chcsubjectprofileItem.parentDetail.schoolName,
            schoolAddress1: this.chcsubjectprofileItem.parentDetail.schoolAddress1,
            schoolAddress2: "",
            schoolAddress3: "",
            schoolPincode: this.chcsubjectprofileItem.parentDetail.schoolPincode,
            schoolCity: this.chcsubjectprofileItem.parentDetail.schoolCity,
            schoolState: this.chcsubjectprofileItem.parentDetail.schoolState,
            standard: this.chcsubjectprofileItem.parentDetail.standard,
            section: this.chcsubjectprofileItem.parentDetail.section,
            rollNo: this.chcsubjectprofileItem.parentDetail.rollNo,
            updatedBy: this.user.id,
          }
        }
        // this.showResponseMessage('testing done', 's');
        // return false;
        var some = this.SubjectProfileService.addSubjectProfile(this.addchcsubjectProfileRequest).subscribe(response => {
          this.addchcsubjectProfileResponse = response;
          console.log(this.addchcsubjectProfileResponse);
          this.loaderService.display(false);
          if (this.addchcsubjectProfileResponse !== null && this.addchcsubjectProfileResponse.status === true) {
            this.showResponseMessage(this.addchcsubjectProfileResponse.message, 's')
          } else {
            this.showResponseMessage(this.addchcsubjectProfileResponse.message, 'e');
            this.chcsubjectProfileErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.chcsubjectProfileErrorMessage = err.toString();
          });
      }
      else if (this.chcsubjectprofileItem.primaryDetail.childSubjectTypeId === 4 && this.chcsubjectprofileItem.primaryDetail.maritalStatus === false) {
        this.firstName = this.firstFormGroup.controls.firstName.value;
    this.middleName = this.firstFormGroup.controls.middleName.value;
    this.lastName = this.firstFormGroup.controls.lastName.value;
    this.age = this.firstFormGroup.controls.age.value;
    if( typeof(this.firstFormGroup.controls.dob.value) === 'string' ){
      this.dob = this.firstFormGroup.controls.dob.value;
    }
    else{
      var getdobdate = this.firstFormGroup.controls.dob.value;
      this.dob =  moment(new Date(getdobdate)).format("DD/MM/YYYY");
    }      
    this.emailId = this.secondFormGroup.controls.emailId.value;
    this.govIdTypeId = +this.secondFormGroup.controls.DDLGovtIDType.value;
    this.govIdDetail = this.secondFormGroup.controls.govIdDetail.value;
    //this.rchId = this.secondFormGroup.controls.rchId.value;
    this.ecNumber = this.secondFormGroup.controls.ecNumber.value.toString();;
    
    this.mobileNo = this.secondFormGroup.controls.mobileNo.value.toString();
    this.address1 = this.secondFormGroup.controls.house.value;
    this.address2 = this.secondFormGroup.controls.street.value;
    this.address3 = this.secondFormGroup.controls.city.value;
    this.pincode = this.secondFormGroup.controls.pincode.value.toString();
    this.stateName = this.secondFormGroup.controls.stateName.value;
    this.motherFirstName = this.secondFormGroup.controls.motherFirstName.value;
    this.motherMiddleName = this.secondFormGroup.controls.motherMiddleName.value;
    this.motherLastName = this.secondFormGroup.controls.motherLastName.value;
   this.motherContactNo = this.secondFormGroup.controls.motherContactNo.value.toString();
    this.fatherFirstName = this.secondFormGroup.controls.fatherFirstName.value;
    this.fatherMiddleName = this.secondFormGroup.controls.fatherMiddleName.value;
    this.fatherLastName = this.secondFormGroup.controls.fatherLastName.value;
    this.fatherContactNo = this.secondFormGroup.controls.fatherContactNo.value.toString();
    this.gaurdianFirstName = this.secondFormGroup.controls.guardianFirstName.value;
    this.gaurdianMiddleName = this.secondFormGroup.controls.guardianMiddleName.value;
    this.gaurdianLastName = this.secondFormGroup.controls.guardianLastName.value;
    this.gaurdianContactNo = this.secondFormGroup.controls.guardianContactNo.value.toString();
    
       
        this.addchcsubjectProfileRequest = {
          subjectPrimaryRequest: {
            subjectTypeId: this.chcsubjectprofileItem.primaryDetail.subjectTypeId,
            childSubjectTypeId: this.chcsubjectprofileItem.primaryDetail.childSubjectTypeId,
            uniqueSubjectId: this.chcsubjectprofileItem.primaryDetail.uniqueSubjectId,
            districtId: this.chcsubjectprofileItem.primaryDetail.districtId,
            chcId: this.chcsubjectprofileItem.primaryDetail.chcId,
            phcId: this.chcsubjectprofileItem.primaryDetail.phcId,
            scId: this.chcsubjectprofileItem.primaryDetail.scId,
            riId: this.chcsubjectprofileItem.primaryDetail.riId,
            subjectTitle: this.chcsubjectprofileItem.primaryDetail.subjectTitle,
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            dob: this.dob,
            age: this.age,
            gender: this.chcsubjectprofileItem.primaryDetail.gender,
            maritalStatus: this.chcsubjectprofileItem.primaryDetail.maritalStatus,
            mobileNo: this.mobileNo,
            emailId: this.emailId,
            govIdTypeId: this.govIdTypeId,
            govIdDetail: this.govIdDetail,
            spouseSubjectId: this.chcsubjectprofileItem.primaryDetail.spouseSubjectId,
            spouseFirstName: this.chcsubjectprofileItem.primaryDetail.spouseFirstName,
            spouseMiddleName: this.chcsubjectprofileItem.primaryDetail.spouseMiddleName,
            spouseLastName: this.chcsubjectprofileItem.primaryDetail.spouseLastName,
            spouseContactNo: this.chcsubjectprofileItem.primaryDetail.spouseContactNo,
            spouseGovIdTypeId: 0,
            spouseGovIdDetail: '',
            assignANMId: this.chcsubjectprofileItem.primaryDetail.assignANMId,
            dateOfRegister: this.chcsubjectprofileItem.primaryDetail.dateOfRegister,
            registeredFrom: this.user.registeredFrom,
            createdBy: this.user.id,
            source: 'N',
          },
          subjectAddressRequest: {
            religionId: +(this.selectedreligion),
            casteId: +(this.selectedcaste),
            communityId: +(this.selectedcommunity),
            address1: this.address1,
            address2: this.address2,
            address3: this.address3,
            pincode: this.pincode,
            stateName: this.stateName,
            updatedBy: this.user.id
          },
          subjectPregnancyRequest: {
            rchId: this.chcsubjectprofileItem.pregnancyDetail.rchId,
            ecNumber: this.ecNumber,
            lmpDate: this.chcsubjectprofileItem.pregnancyDetail.lmpDate,
            g: this.chcsubjectprofileItem.pregnancyDetail.g,
            p: this.chcsubjectprofileItem.pregnancyDetail.p,
            l: this.chcsubjectprofileItem.pregnancyDetail.l,
            a: this.chcsubjectprofileItem.pregnancyDetail.a,
            updatedBy: this.user.id,
          },
          subjectParentRequest: {
            motherFirstName: this.motherFirstName,
            motherMiddleName: this.motherMiddleName,
            motherLastName: this.motherLastName,
            motherGovIdTypeId: 0,
            motherGovIdDetail: "",
            motherContactNo: this.motherContactNo,
            fatherFirstName: this.fatherFirstName,
            fatherMiddleName: this.fatherMiddleName,
            fatherLastName: this.fatherLastName,
            fatherGovIdTypeId: 0,
            fatherGovIdDetail: "",
            fatherContactNo: this.fatherContactNo,
            gaurdianFirstName: this.gaurdianFirstName,
            gaurdianMiddleName: this.gaurdianMiddleName,
            gaurdianLastName: this.gaurdianLastName,
            gaurdianGovIdTypeId: 0,
            gaurdianGovIdDetail: "",
            gaurdianContactNo: this.gaurdianContactNo,
            rbskId: this.rbskId,
            schoolName: this.schoolName,
            schoolAddress1: this.schoolAddress1,
            schoolAddress2: "",
            schoolAddress3: "",
            schoolPincode: this.schoolPincode,
            schoolCity: this.schoolCity,
            schoolState: this.schoolState,
            standard: this.chcsubjectprofileItem.parentDetail.standard,
            section: this.chcsubjectprofileItem.parentDetail.section,
            rollNo: this.chcsubjectprofileItem.parentDetail.rollNo,
            updatedBy: this.user.id,
          }
        }
        // this.showResponseMessage('testing done', 's');
        // return false;
        var some = this.SubjectProfileService.addSubjectProfile(this.addchcsubjectProfileRequest).subscribe(response => {
          this.addchcsubjectProfileResponse = response;
          console.log(this.addchcsubjectProfileResponse);
          this.loaderService.display(false);
          if (this.addchcsubjectProfileResponse !== null && this.addchcsubjectProfileResponse.status === true) {
            this.showResponseMessage(this.addchcsubjectProfileResponse.message, 's')
          } else {
            this.showResponseMessage(this.addchcsubjectProfileResponse.message, 'e');
            this.chcsubjectProfileErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.chcsubjectProfileErrorMessage = err.toString();
          });
      }
      // else {
      //   Swal.fire('Hey user!', 'Doesnt match.', 'warning');
      // }
    }
  }

  showResponseMessage(message: string, type: string) {
    var messageType = '';
    if (type === 'e') {
      Swal.fire({ allowOutsideClick: false, icon: 'error', title: message, confirmButtonText: 'Close' })
    }
    else {
      Swal.fire({ allowOutsideClick: false, icon: 'success', title: message, confirmButtonText: 'Close' })
        .then((result) => {
          if (result.value) {
            this.modalService.dismissAll();
            window.location.reload();
          }
        });
    }
  }

 
}
