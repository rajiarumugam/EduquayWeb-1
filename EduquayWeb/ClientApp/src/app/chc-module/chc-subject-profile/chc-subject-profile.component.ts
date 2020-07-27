import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { SubjectProfileRequest } from 'src/app/shared/anm-module/subject-profile/subject-profile-request';
import { SubjectProfileResponse, ReligionResponse, Religion, GovtIDTypeResponse, GovIdType, CasteResponse, CasteList, CommunityeResponse, CommunityList, PrimaryDetail, AddressDetail, ParentDetail, PregnancyDetail } from 'src/app/shared/anm-module/subject-profile/subject-profile-response';
import { SubjectProfileService } from 'src/app/shared/anm-module/subject-profile/subject-profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-chc-subject-profile',
  templateUrl: './chc-subject-profile.component.html',
  styleUrls: ['./chc-subject-profile.component.css']
})
export class ChcSubjectProfileComponent implements OnInit {

  @ViewChild('stepper', { static: false }) stepper: MatStepper;
    
  chcsubjectProfileErrorMessage: string;
  chcsubjectProfileRequest: SubjectProfileRequest;
  chcsubjectProfileResponse: SubjectProfileResponse;
  chcreligionResponse: ReligionResponse;
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
  barcodes: string;
  Glists: number [];
  selectedG: number = 0 ;
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
  GPLADATA = [{id:'00',value:'0'},{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'}];


  constructor(
    private SubjectProfileService: SubjectProfileService,
    private modalService: NgbModal,
    private httpService: HttpClient,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    console.log(this.SubjectProfileService.subjectProfileApi);

    this.firstFormGroup = this._formBuilder.group({
      // dor: ['', Validators.required],
      // district: ['', Validators.required],
      // chc: ['', Validators.required],
      // phc: ['', Validators.required],
      // sc: ['', Validators.required],
      // ripoint: ['', Validators.required],
      // pincode: ['', Validators.required],
      // contactNumber: ['', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
      // subjectitle: ['Ms.'],
      firstname: ['null', Validators.required],
      middlename: [''],
      lastname: ['null', Validators.required],
      dob: [''],
      age: ['', [Validators.required,Validators.min(1), Validators.max(99)]],
      DDLreligion: ['null', Validators.required],
      DDLcaste: ['null', Validators.required],
      DDLcommunity: ['null', Validators.required],
   });
   this.secondFormGroup = this._formBuilder.group({
    ecNumber: [''],
    DDLGovtIDType: [''],
    GovtIDDetail: [''],
    house: ['null', Validators.required],
    street: ['null', Validators.required],
    city : ['null', Validators.required],
    stateName: ['null', Validators.required],
    mobileNo: ['null', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
    spouseFirstName: ['null', Validators.required],
    spouseMiddleName: [''],
    spouseLastName: ['null', Validators.required],
    spouseContactNo: ['null', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
    emailId: ['null',Validators.email],
    rchId: ['null', Validators.required],
    g: ['', Validators.required],
    p: ['', Validators.required],
    l: ['', Validators.required],
    a: ['', Validators.required]
  });
  }

  chcSubjectProfile() {
    //this.basicInfo = {};  
    //this.basicInfo['firstName']='';  

    this.chcsubjectProfileErrorMessage = '';
    if (this.searchsubjectid === '' || this.searchsubjectid === undefined) {
      this.chcsubjectProfileErrorMessage = 'Please provide subject Id to search for a profile';
      this.chcbasicInfo = undefined ;
      return false;
    }

    this.chcsubjectProfileRequest = { subjectId: this.searchsubjectid };
    let subProfile = this.SubjectProfileService.getsubjectProfile(this.chcsubjectProfileRequest)
      .subscribe(response => {
        this.chcsubjectProfileResponse = response;
        if (this.chcsubjectProfileResponse !== null && this.chcsubjectProfileResponse.status === "true") {
          if (this.chcsubjectProfileResponse.primaryDetail.length <= 0 && this.chcsubjectProfileResponse.pregnancyDetail.length <= 0
            && this.chcsubjectProfileResponse.addressDetail.length <= 0 && this.chcsubjectProfileResponse.parentDetail.length <= 0) {
            this.chcsubjectProfileErrorMessage = response.message;
          }
          else {
            this.chcbasicInfo = this.chcsubjectProfileResponse.primaryDetail[0];
            this.chcsocioDemographicInfo = this.chcsubjectProfileResponse.addressDetail[0];
            this.chcparentInfo = this.chcsubjectProfileResponse.parentDetail[0];
            this.chcpersonalInfo = this.chcsubjectProfileResponse.pregnancyDetail[0];
            //this.basicInfo
          }
        }
        else {
          this.chcsubjectProfileErrorMessage = response.message;
          this.chcbasicInfo = undefined ;
        }
      },
        (err: HttpErrorResponse) => {
          this.chcsubjectProfileErrorMessage = err.toString();
        });

  }
  editchcSubjectProfile(chcsubjectProfiledetail, chcbasicInfo: PrimaryDetail, chcsocioDemographicInfo: AddressDetail, chcpersonalInfo: PregnancyDetail) {
    
    this.ddlReligion();
    this.ddlGovtIdType();
    this.ddlCaste();
    this.GPLADATA = [{id:'00',value:'0'},{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'}];
    //this.ddlGvalue();
    this.firstFormGroup = new FormGroup({
      firstName: new FormControl(this.chcbasicInfo.firstName),
      lastName: new FormControl(this.chcbasicInfo.lastName),
      middleName: new FormControl(this.chcbasicInfo.middleName),
      dob: new FormControl(this.chcbasicInfo.dob),
      age: new FormControl(this.chcbasicInfo.age),
      DDLreligion: new FormControl(this.chcsocioDemographicInfo.religionName),
      DDLcaste: new FormControl(this.chcsocioDemographicInfo.casteName),
      DDLcommunity: new FormControl(this.chcsocioDemographicInfo.communityName),
      
    });
    this.secondFormGroup = new FormGroup({
      house: new FormControl(this.chcsocioDemographicInfo.address1),
      street: new FormControl(this.chcsocioDemographicInfo.address2), 
      city: new FormControl(this.chcsocioDemographicInfo.address3),
      stateName: new FormControl(this.chcsocioDemographicInfo.stateName),
      pincode: new FormControl(this.chcsocioDemographicInfo.pincode),
      mobileNo: new FormControl(this.chcbasicInfo.mobileNo),
      emailId: new FormControl(this.chcbasicInfo.emailId),
      govIdDetail: new FormControl(this.chcbasicInfo.govIdDetail),
      rchId: new FormControl(this.chcpersonalInfo.rchId),
      ecNumber: new FormControl(this.chcpersonalInfo.ecNumber),
      spouseFirstName: new FormControl(this.chcbasicInfo.spouseFirstName),
      spouseMiddleName: new FormControl(this.chcbasicInfo.spouseMiddleName),
      spouseLastName: new FormControl(this.chcbasicInfo.spouseLastName),
      spouseContactNo: new FormControl(this.chcbasicInfo.spouseContactNo),
      DDLGovtIDType: new FormControl(this.chcbasicInfo.govIdType),
      g: new FormControl(this.chcpersonalInfo.g),
      p: new FormControl(this.chcpersonalInfo.p),
      l: new FormControl(this.chcpersonalInfo.l),
      a: new FormControl(this.chcpersonalInfo.a)

    });
    //this.chcsocioDemographicInfo.address1 = this.secondFormGroup.value.mobileNo
    this.modalService.open(
      chcsubjectProfiledetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      ariaLabelledBy: 'modal-basic-title'
    });
  }



  ddlReligion() {
    this.chcreligions = [];
    this.selectedreligion = '0';
    this.SubjectProfileService.getReligion().subscribe(response => {
      this.chcreligionResponse = response;
      if (this.chcreligionResponse !== null && this.chcreligionResponse.status === "true") {
        this.chcreligions = this.chcreligionResponse.religion;
        if (this.chcreligions.length > 0) {
          this.selectedreligion = this.chcsocioDemographicInfo.religionId.toString();
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
          this.selectedgovtidtype = this.chcbasicInfo.govIdTypeId.toString();
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
          this.selectedcaste = this.chcsocioDemographicInfo.casteId.toString();
          this.onChangecaste(this.chcsocioDemographicInfo.casteId.toString())
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
          if (this.chccommunities.findIndex(com => com.id === this.chcsocioDemographicInfo.communityId) >= 0) {
            this.selectedcommunity = this.chcsocioDemographicInfo.communityId.toString();
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

  ddlGvalue(){
    this.Glists = [];
    this.selectedG = 0;
    this.httpService.get('./assets/Glists.json').subscribe(
      data => {
        this.Glists = data as number [];	 // FILL THE ARRAY WITH DATA.
        //  console.log(this.Glists[1]);
        this.selectedG = this.chcpersonalInfo.g
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

  // nextStep(stepper: MatStepper) {
  //   //this.firstFormCheck = true;
  //   //if(this.firstFormGroup.valid)
  //   stepper.next();
  // }
  nextStep(stepper: MatStepper) {
    this.firstFormCheck = true;
      if(this.firstFormGroup.valid)
       stepper.next();
    }

    // prevStep() {
    //   this.stepper.previous();
    //   }

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
      this.selecteda = +this.selectedg - +this.selectedp;
      if(this.selecteda === 0)
      this.selecteda = "00";
      this.Ldisabled = false;
    }


}
