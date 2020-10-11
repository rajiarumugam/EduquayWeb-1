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



@Component({
  selector: 'app-anm-subject-profile',
  templateUrl: './anm-subject-profile.component.html',
  styleUrls: ['./anm-subject-profile.component.css']
})
export class AnmSubjectProfileComponent implements OnInit {

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
  subjectprofileItem: SubjectProfileList;

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
    private dateservice: DateService
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "ANM", "submodule": "Subject Profile", "page": "View Subject Profile"}));
    this.loaderService.display(true);
    this.user = JSON.parse(this.tokenService.getUser('lu'));

    console.log(this.SubjectProfileService.subjectProfileApi);
    this.activatedRoute.queryParams.subscribe(params => {
      this.uniqueSubjectId = params['q'];
      this.anmSubjectProfile();
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

  // anmSubjectProfile() {
  //   //this.basicInfo = {};  
  //   //this.basicInfo['firstName']='';  
  //   this.loaderService.display(true);

  //   this.subjectProfileErrorMessage = '';
  //   if (this.searchsubjectid === '' || this.searchsubjectid === undefined) {
  //     this.subjectProfileErrorMessage = 'Please provide subject Id to search for a profile';
  //     this.basicInfo = undefined ;
  //     return false;
  //   }

  //   this.subjectProfileRequest = { subjectId: this.searchsubjectid };
  //   let subProfile = this.SubjectProfileService.getsubjectProfile(this.subjectProfileRequest)
  //     .subscribe(response => {
  //       this.subjectProfileResponse = response;
  //       this.loaderService.display(false);

  //       if (this.subjectProfileResponse !== null && this.subjectProfileResponse.status === "true") {
  //         if (this.subjectProfileResponse.primaryDetail.length <= 0 && this.subjectProfileResponse.pregnancyDetail.length <= 0
  //           && this.subjectProfileResponse.addressDetail.length <= 0 && this.subjectProfileResponse.parentDetail.length <= 0) {
  //           this.subjectProfileErrorMessage = response.message;
  //         }
  //         else {
  //           this.basicInfo = this.subjectProfileResponse.primaryDetail[0];
  //           this.socioDemographicInfo = this.subjectProfileResponse.addressDetail[0];
  //           this.parentInfo = this.subjectProfileResponse.parentDetail[0];
  //           this.personalInfo = this.subjectProfileResponse.pregnancyDetail[0];
  //           //this.basicInfo
  //         }
  //       }
  //       else {
  //         this.subjectProfileErrorMessage = response.message;
  //         this.basicInfo = undefined ;
  //       }
  //     },
  //       (err: HttpErrorResponse) => {
  //         this.subjectProfileErrorMessage = err.toString();
  //       });

  // }

  anmSubjectProfile() {

    this.subjectProfileRequest = {
      userId: this.user.id, 
      fromDate: '',
      toDate: '',
    }
    //this.subjectprofileItem = new SubjectProfileList();
    let subProfile = this.SubjectProfileService.getSubjectProfileList(this.subjectProfileRequest)
      .subscribe(response => {
        this.anmsubjectProfileResponse = response;
        this.loaderService.display(false);
        if (this.anmsubjectProfileResponse !== null && this.anmsubjectProfileResponse.status === "true") {
          if (this.anmsubjectProfileResponse.subjectsDetail.length <= 0 ) {
            this.subjectProfileErrorMessage = response.message;
          }
          else {
            //this.subjectprofileLists = this.subjectProfileResponse.subjectsDetail;
            this.subjectprofileItem = this.anmsubjectProfileResponse.subjectsDetail.find(profile => profile.primaryDetail.uniqueSubjectId === this.uniqueSubjectId);
            this.selecteddob = this.subjectprofileItem.primaryDetail.dob;
            this.selectedage = this.subjectprofileItem.primaryDetail.age;
            //this.dobPicker.flatpickr.setDate(this.subjectprofileItem.primaryDetail.dob, true, 'm/d/Y');
            this.selectedg = this.subjectprofileItem.pregnancyDetail.g.toString();
            this.selectedp = this.subjectprofileItem.pregnancyDetail.p.toString();
            this.selectedl = this.subjectprofileItem.pregnancyDetail.l.toString();
            this.selecteda = this.subjectprofileItem.pregnancyDetail.a.toString();
           
          }
        }
        
        else {
          this.subjectProfileErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.subjectProfileErrorMessage = err.toString();
        });

  }

  ddlReligion() {
    this.religions = [];
    this.selectedreligion = '0';
    this.SubjectProfileService.getReligion().subscribe(response => {
      this.religionResponse = response;
      if (this.religionResponse !== null && this.religionResponse.status === "true") {
        this.religions = this.religionResponse.religion;
        if (this.religions.length > 0) {
          this.selectedreligion = this.subjectprofileItem.addressDetail.religionId.toString();
          // this.firstFormGroup = new FormGroup({
          //   DDLreligion : new FormControl(this.chcsocioDemographicInfo.religionId.toString())
          // });
        }

      }
      else {
        this.subjectProfileErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.subjectProfileErrorMessage = err.toString();

      });
  }


  ddlGovtIdType() {
    this.govtIdTypes = [];
    this.selectedgovtidtype = '0';
    this.SubjectProfileService.getGovtIdType().subscribe(response => {
      this.govtIdTypeResponse = response;
      if (this.govtIdTypeResponse !== null && this.govtIdTypeResponse.status === "true") {
        this.govtIdTypes = this.govtIdTypeResponse.govIdType;
        if (this.govtIdTypes.length > 0) {
          this.selectedgovtidtype = this.subjectprofileItem.primaryDetail.govIdTypeId.toString();
        }

      }
      else {
        this.subjectProfileErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.subjectProfileErrorMessage = err.toString();

      });
  }

  ddlCaste() {
    this.castes = [];
    this.selectedcaste = '0';
    this.SubjectProfileService.getCaste().subscribe(response => {
      this.casteResponse = response;
      if (this.casteResponse !== null && this.casteResponse.status === "true") {
        this.castes = this.casteResponse.caste;
        if (this.castes.length > 0) {
          this.selectedcaste = this.subjectprofileItem.addressDetail.casteId.toString();
          this.onChangecaste(this.subjectprofileItem.addressDetail.casteId.toString())
        }

      }
      else {
        this.subjectProfileErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.subjectProfileErrorMessage = err.toString();

      });
  }

  onChangecaste(code) {
    this.communities = [];
    this.selectedcommunity = '0';
    this.SubjectProfileService.getCommunnity(code).subscribe(response => {
      this.communityResponse = response;
      if (this.communityResponse !== null && this.communityResponse.status === "true") {
        this.communities = this.communityResponse.community;
        if (this.communities.length > 0) {
          if (this.communities.findIndex(com => com.id === this.subjectprofileItem.addressDetail.communityId) >= 0) {
            this.selectedcommunity = this.subjectprofileItem.addressDetail.communityId.toString();
          }
          else {
            this.selectedcommunity = '0';
          }
        }
      }
      else {
        this.subjectProfileErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.subjectProfileErrorMessage = err.toString();

      });
  }

  editSubjectProfile(subjectProfiledetail, subjectprofileItem: SubjectProfileList) {
   
    this.selecteddob = subjectprofileItem.primaryDetail.dob;
    this.selectedage = subjectprofileItem.primaryDetail.age;
    this.startOptions1.defaultDate = subjectprofileItem.primaryDetail.dob;
    this.startOptions1.maxDate = moment().format("DD/MM/YYYY");

    if (subjectprofileItem.primaryDetail.childSubjectTypeId === 1) {
      this.ddlReligion();
      this.ddlGovtIdType();
      this.ddlCaste();
      //this.ddlGvalue();
      //this.selectedfirstName = subjectprofileItem.primaryDetail.firstName;
     
      this.firstFormGroup = new FormGroup({
        firstName: new FormControl(subjectprofileItem.primaryDetail.firstName),
        lastName: new FormControl(subjectprofileItem.primaryDetail.lastName),
        middleName: new FormControl(subjectprofileItem.primaryDetail.middleName),
        dob: new FormControl(this.selecteddob),
        age: new FormControl(subjectprofileItem.primaryDetail.age),
        DDLreligion: new FormControl(subjectprofileItem.addressDetail.religionName),
        DDLcaste: new FormControl(subjectprofileItem.addressDetail.casteName),
        DDLcommunity: new FormControl(subjectprofileItem.addressDetail.communityName),

      });
      this.secondFormGroup = new FormGroup({
        house: new FormControl(subjectprofileItem.addressDetail.address1),
        street: new FormControl(subjectprofileItem.addressDetail.address2),
        city: new FormControl(subjectprofileItem.addressDetail.address3),
        stateName: new FormControl(subjectprofileItem.addressDetail.stateName),
        pincode: new FormControl(subjectprofileItem.addressDetail.pincode),
        mobileNo: new FormControl(subjectprofileItem.primaryDetail.mobileNo),
        emailId: new FormControl(subjectprofileItem.primaryDetail.emailId),
        govIdDetail: new FormControl(subjectprofileItem.primaryDetail.govIdDetail),
        rchId: new FormControl(subjectprofileItem.pregnancyDetail.rchId),
        ecNumber: new FormControl(subjectprofileItem.pregnancyDetail.ecNumber),
        spouseFirstName: new FormControl(subjectprofileItem.primaryDetail.spouseFirstName),
        spouseMiddleName: new FormControl(subjectprofileItem.primaryDetail.spouseMiddleName),
        spouseLastName: new FormControl(subjectprofileItem.primaryDetail.spouseLastName),
        spouseContactNo: new FormControl(subjectprofileItem.primaryDetail.spouseContactNo),
        DDLGovtIDType: new FormControl(subjectprofileItem.primaryDetail.govIdType),
        g: new FormControl(subjectprofileItem.pregnancyDetail.g),
        p: new FormControl(subjectprofileItem.pregnancyDetail.p),
        l: new FormControl(subjectprofileItem.pregnancyDetail.l),
        a: new FormControl(subjectprofileItem.pregnancyDetail.a)

      });

      this.modalService.open(
        subjectProfiledetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop: 'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
    }
    else if (subjectprofileItem.primaryDetail.childSubjectTypeId === 2) {
      this.ddlReligion();
      this.ddlGovtIdType();
      this.ddlCaste();
      //this.ddlGvalue();
      //this.selectedfirstName = subjectprofileItem.primaryDetail.firstName;
      this.firstFormGroup = new FormGroup({
        firstName: new FormControl(subjectprofileItem.primaryDetail.firstName),
        lastName: new FormControl(subjectprofileItem.primaryDetail.lastName),
        middleName: new FormControl(subjectprofileItem.primaryDetail.middleName),
        dob: new FormControl(this.selecteddob),
        age: new FormControl(subjectprofileItem.primaryDetail.age),
        DDLreligion: new FormControl(subjectprofileItem.addressDetail.religionName),
        DDLcaste: new FormControl(subjectprofileItem.addressDetail.casteName),
        DDLcommunity: new FormControl(subjectprofileItem.addressDetail.communityName),

      });
      this.secondFormGroup = new FormGroup({
        house: new FormControl(subjectprofileItem.addressDetail.address1),
        street: new FormControl(subjectprofileItem.addressDetail.address2),
        city: new FormControl(subjectprofileItem.addressDetail.address3),
        stateName: new FormControl(subjectprofileItem.addressDetail.stateName),
        pincode: new FormControl(subjectprofileItem.addressDetail.pincode),
        mobileNo: new FormControl(subjectprofileItem.primaryDetail.mobileNo),
        emailId: new FormControl(subjectprofileItem.primaryDetail.emailId),
        govIdDetail: new FormControl(subjectprofileItem.primaryDetail.govIdDetail),
        rchId: new FormControl(subjectprofileItem.pregnancyDetail.rchId),
        ecNumber: new FormControl(subjectprofileItem.pregnancyDetail.ecNumber),
        spouseFirstName: new FormControl(subjectprofileItem.primaryDetail.spouseFirstName),
        spouseMiddleName: new FormControl(subjectprofileItem.primaryDetail.spouseMiddleName),
        spouseLastName: new FormControl(subjectprofileItem.primaryDetail.spouseLastName),
        spouseContactNo: new FormControl(subjectprofileItem.primaryDetail.spouseContactNo),
        DDLGovtIDType: new FormControl(subjectprofileItem.primaryDetail.govIdType),

      });

      this.modalService.open(
        subjectProfiledetail, {
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
    //var birthDate = new Date(this.selecteddob);
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
    this.subjectProfileErrorMessage = "";

    this.secondFormCheck = true;
    if (this.secondFormGroup.valid && this.firstFormGroup.valid) {
      if (this.subjectprofileItem.primaryDetail.subjectTypeId === 1) {

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

        this.addanmsubjectProfileRequest = {
          subjectPrimaryRequest: {
            subjectTypeId: this.subjectprofileItem.primaryDetail.subjectTypeId,
            childSubjectTypeId: this.subjectprofileItem.primaryDetail.childSubjectTypeId,
            uniqueSubjectId: this.subjectprofileItem.primaryDetail.uniqueSubjectId,
            districtId: this.subjectprofileItem.primaryDetail.districtId,
            chcId: this.subjectprofileItem.primaryDetail.chcId,
            phcId: this.subjectprofileItem.primaryDetail.phcId,
            scId: this.subjectprofileItem.primaryDetail.scId,
            riId: this.subjectprofileItem.primaryDetail.riId,
            subjectTitle: this.subjectprofileItem.primaryDetail.subjectTitle,
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            dob: this.dob,
            age: this.age,
            gender: this.subjectprofileItem.primaryDetail.gender,
            maritalStatus: this.subjectprofileItem.primaryDetail.maritalStatus,
            mobileNo: this.mobileNo,
            emailId: this.emailId,
            govIdTypeId: this.govIdTypeId,
            govIdDetail: this.govIdDetail,
            spouseSubjectId: this.subjectprofileItem.primaryDetail.spouseSubjectId,
            spouseFirstName: this.spouseFirstName,
            spouseMiddleName: this.spouseMiddleName,
            spouseLastName: this.spouseLastName,
            spouseContactNo: this.spouseContactNo,
            spouseGovIdTypeId: 0,
            spouseGovIdDetail: '',
            assignANMId: this.subjectprofileItem.primaryDetail.assignANMId,
            dateOfRegister: this.subjectprofileItem.primaryDetail.dateOfRegister,
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
            lmpDate: this.subjectprofileItem.pregnancyDetail.lmpDate,
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
            motherFirstName: this.subjectprofileItem.parentDetail.motherFirstName,
            motherMiddleName: this.subjectprofileItem.parentDetail.motherMiddleName,
            motherLastName: this.subjectprofileItem.parentDetail.motherLastName,
            motherGovIdTypeId: 0,
            motherGovIdDetail: '',
            motherContactNo: this.subjectprofileItem.parentDetail.motherContactNo,
            fatherFirstName: this.subjectprofileItem.parentDetail.fatherFirstName,
            fatherMiddleName: this.subjectprofileItem.parentDetail.fatherMiddleName,
            fatherLastName: this.subjectprofileItem.parentDetail.fatherLastName,
            fatherGovIdTypeId: 0,
            fatherGovIdDetail: "",
            fatherContactNo: this.subjectprofileItem.parentDetail.fatherContactNo,
            gaurdianFirstName: this.subjectprofileItem.parentDetail.gaurdianFirstName,
            gaurdianMiddleName: this.subjectprofileItem.parentDetail.gaurdianMiddleName,
            gaurdianLastName: this.subjectprofileItem.parentDetail.gaurdianLastName,
            gaurdianGovIdTypeId: 0,
            gaurdianGovIdDetail: "",
            gaurdianContactNo: this.subjectprofileItem.parentDetail.gaurdianContactNo,
            rbskId: this.subjectprofileItem.parentDetail.rbskId,
            schoolName: this.subjectprofileItem.parentDetail.schoolName,
            schoolAddress1: this.subjectprofileItem.parentDetail.schoolAddress1,
            schoolAddress2: "",
            schoolAddress3: "",
            schoolPincode: this.subjectprofileItem.parentDetail.schoolPincode,
            schoolCity: this.subjectprofileItem.parentDetail.schoolCity,
            schoolState: this.subjectprofileItem.parentDetail.schoolState,
            standard: this.subjectprofileItem.parentDetail.standard,
            section: this.subjectprofileItem.parentDetail.section,
            rollNo: this.subjectprofileItem.parentDetail.rollNo,
            updatedBy: this.user.id,
          }
        }
        // this.showResponseMessage('testing done', 's');
        // return false;
        var some = this.SubjectProfileService.addSubjectProfile(this.addanmsubjectProfileRequest).subscribe(response => {
          this.addanmsubjectProfileResponse = response;
          console.log(this.addanmsubjectProfileResponse);
          this.loaderService.display(false);
          if (this.addanmsubjectProfileResponse !== null && this.addanmsubjectProfileResponse.status === true) {
            this.showResponseMessage(this.addanmsubjectProfileResponse.message, 's')
          } else {
            this.showResponseMessage(this.addanmsubjectProfileResponse.message, 'e');
            this.subjectProfileErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.subjectProfileErrorMessage = err.toString();
          });
      }
      else if (this.subjectprofileItem.primaryDetail.subjectTypeId === 2) {

        this.firstName = this.firstFormGroup.controls.firstName.value;
        this.middleName = this.firstFormGroup.controls.middleName.value;
        this.lastName = this.firstFormGroup.controls.lastName.value;
        this.age = this.firstFormGroup.controls.age.value;
        if( typeof(this.firstFormGroup.controls.dob.value) === 'string' ) { 
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

        this.addanmsubjectProfileRequest = {

          subjectPrimaryRequest: {
            subjectTypeId: this.subjectprofileItem.primaryDetail.subjectTypeId,
            childSubjectTypeId: this.subjectprofileItem.primaryDetail.childSubjectTypeId,
            uniqueSubjectId: this.subjectprofileItem.primaryDetail.uniqueSubjectId,
            districtId: this.subjectprofileItem.primaryDetail.districtId,
            chcId: this.subjectprofileItem.primaryDetail.chcId,
            phcId: this.subjectprofileItem.primaryDetail.phcId,
            scId: this.subjectprofileItem.primaryDetail.scId,
            riId: this.subjectprofileItem.primaryDetail.riId,
            subjectTitle: this.subjectprofileItem.primaryDetail.subjectTitle,
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            dob: this.dob,
            age: this.age,
            gender: this.subjectprofileItem.primaryDetail.gender,
            maritalStatus: this.subjectprofileItem.primaryDetail.maritalStatus,
            mobileNo: this.mobileNo,
            emailId: this.emailId,
            govIdTypeId: this.govIdTypeId,
            govIdDetail: this.govIdDetail,
            spouseSubjectId: this.subjectprofileItem.primaryDetail.spouseSubjectId,
            spouseFirstName: this.spouseFirstName,
            spouseMiddleName: this.spouseMiddleName,
            spouseLastName: this.spouseLastName,
            spouseContactNo: this.spouseContactNo,
            spouseGovIdTypeId: 0,
            spouseGovIdDetail: '',
            assignANMId: this.subjectprofileItem.primaryDetail.assignANMId,
            dateOfRegister: this.subjectprofileItem.primaryDetail.dateOfRegister,
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
            rchId: this.subjectprofileItem.pregnancyDetail.rchId,
            ecNumber: this.ecNumber,
            lmpDate: this.subjectprofileItem.pregnancyDetail.lmpDate,
            g: this.subjectprofileItem.pregnancyDetail.g,
            p: this.subjectprofileItem.pregnancyDetail.p,
            l: this.subjectprofileItem.pregnancyDetail.l,
            a: this.subjectprofileItem.pregnancyDetail.a,
            updatedBy: this.user.id,
          },
          subjectParentRequest: {
            motherFirstName: this.subjectprofileItem.parentDetail.motherFirstName,
            motherMiddleName: this.subjectprofileItem.parentDetail.motherMiddleName,
            motherLastName: this.subjectprofileItem.parentDetail.motherLastName,
            motherGovIdTypeId: 0,
            motherGovIdDetail: '',
            motherContactNo: this.subjectprofileItem.parentDetail.motherContactNo,
            fatherFirstName: this.subjectprofileItem.parentDetail.fatherFirstName,
            fatherMiddleName: this.subjectprofileItem.parentDetail.fatherMiddleName,
            fatherLastName: this.subjectprofileItem.parentDetail.fatherLastName,
            fatherGovIdTypeId: 0,
            fatherGovIdDetail: "",
            fatherContactNo: this.subjectprofileItem.parentDetail.fatherContactNo,
            gaurdianFirstName: this.subjectprofileItem.parentDetail.gaurdianFirstName,
            gaurdianMiddleName: this.subjectprofileItem.parentDetail.gaurdianMiddleName,
            gaurdianLastName: this.subjectprofileItem.parentDetail.gaurdianLastName,
            gaurdianGovIdTypeId: 0,
            gaurdianGovIdDetail: "",
            gaurdianContactNo: this.subjectprofileItem.parentDetail.gaurdianContactNo,
            rbskId: this.subjectprofileItem.parentDetail.rbskId,
            schoolName: this.subjectprofileItem.parentDetail.schoolName,
            schoolAddress1: this.subjectprofileItem.parentDetail.schoolAddress1,
            schoolAddress2: "",
            schoolAddress3: "",
            schoolPincode: this.subjectprofileItem.parentDetail.schoolPincode,
            schoolCity: this.subjectprofileItem.parentDetail.schoolCity,
            schoolState: this.subjectprofileItem.parentDetail.schoolState,
            standard: this.subjectprofileItem.parentDetail.standard,
            section: this.subjectprofileItem.parentDetail.section,
            rollNo: this.subjectprofileItem.parentDetail.rollNo,
            updatedBy: this.user.id,
          }
        }
        // this.showResponseMessage('testing done', 's');
        // return false;
        var some = this.SubjectProfileService.addSubjectProfile(this.addanmsubjectProfileRequest).subscribe(response => {
          this.addanmsubjectProfileResponse = response;
          console.log(this.addanmsubjectProfileResponse);
          this.loaderService.display(false);
          if (this.addanmsubjectProfileResponse !== null && this.addanmsubjectProfileResponse.status === true) {
            this.showResponseMessage(this.addanmsubjectProfileResponse.message, 's')
          } else {
            this.showResponseMessage(this.addanmsubjectProfileResponse.message, 'e');
            this.subjectProfileErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.subjectProfileErrorMessage = err.toString();
          });
      }
      
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
