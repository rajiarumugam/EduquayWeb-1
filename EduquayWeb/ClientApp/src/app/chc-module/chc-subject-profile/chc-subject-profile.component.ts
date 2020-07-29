import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { SubjectProfileRequest } from 'src/app/shared/anm-module/subject-profile/subject-profile-request';
import { SubjectProfileResponse, ReligionResponse, Religion, GovtIDTypeResponse, GovIdType, CasteResponse, CasteList, CommunityeResponse, CommunityList, PrimaryDetail, AddressDetail, ParentDetail, PregnancyDetail } from 'src/app/shared/anm-module/subject-profile/subject-profile-response';
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

@Component({
  selector: 'app-chc-subject-profile',
  templateUrl: './chc-subject-profile.component.html',
  styleUrls: ['./chc-subject-profile.component.css']
})
export class ChcSubjectProfileComponent implements OnInit {

  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild('dobPicker', { static: false }) DOBPicker;
    
  chcsubjectProfileErrorMessage: string;
  chcsubjectProfileRequest: SubjectProfileRequest;
  chcsubjectProfileResponse: SubjectProfileResponse;
  chcreligionResponse: ReligionResponse;
  user: user;
  
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
  selecteddob;
  selectedage;
  createdSubjectId="";
  GPLADATA = [{id:'00',value:'0'},{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'}];

  startOptions1: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: "",
    maxDate: new Date(Date.now()),
  };

  constructor(
    private SubjectProfileService: SubjectProfileService,
    private modalService: NgbModal,
    private httpService: HttpClient,
    private _formBuilder: FormBuilder,
    private httpClientService:HttpClientService,
    private genericService: GenericService,
    private tokenService: TokenService,
    private masterService: masterService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {

    this.user = JSON.parse(this.tokenService.getUser('lu'));
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

  calculateAge()
  {
     var today = new Date();
     var birthDate = new Date(this.selecteddob);
     var age = today.getFullYear() - birthDate.getFullYear();
     var m = today.getMonth() - birthDate.getMonth();
     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
         age--;
     }
     this.selectedage = age;
     //return age;
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

    formSubmit()
  {
    this.secondFormCheck = true;
  
    if(this.secondFormGroup.valid && this.firstFormGroup.valid)
    {
      var apiUrl = this.genericService.buildApiUrl(ENDPOINT.SUBJECT.ADD);
      this.httpClientService.post<any>({url:apiUrl, body: this.dataBindinginServce() }).subscribe(response => {
        this.createdSubjectId = response.uniqueSubjectId;
        //this.getpositiveSubjectList();

        Swal.fire({icon:'success', title: 'Subject ID is '+this.createdSubjectId,
  showCancelButton: true, confirmButtonText: 'Collect sample now', cancelButtonText: 'Collect sample later' })
     .then((result) => {
       if (result.value) {
        $('#fadeinModal').modal('hide');
        this.router.navigateByUrl("app/chc-sample-collection");
       
       }
       else{
        this.firstFormGroup.reset();
        this.secondFormGroup.reset();
        this.secondFormCheck = false;
        this.firstFormCheck = false;
        this.stepper.selectedIndex = 0;
        $('#fadeinModal').modal('hide');
       }
     });
        //$('#fadeinModal').modal('show');
        
      },
      (err: HttpErrorResponse) =>{
        console.log(err);
        this.chcsubjectProfileErrorMessage = err.toString();
      });
    }
  }

  dataBindinginServce()
  {
    var _obj = {
      "subjectPrimaryRequest": {
        "subjectTypeId": 1,
        "childSubjectTypeId": 1,
        "uniqueSubjectId": "",
        "districtId": this.firstFormGroup.get('district').value != undefined ? Number(this.firstFormGroup.get('district').value) : 0,
        "chcId": Number(this.firstFormGroup.get('chc').value),
        // "phcId": Number(this.firstFormGroup.get('phc').value),
        // "scId": Number(this.firstFormGroup.get('sc').value),
        "riId": Number(this.secondFormGroup.get('ripoint').value),
        "subjectTitle": this.firstFormGroup.get('subjectitle').value,
        "firstName": this.firstFormGroup.get('firstname').value,
        "middleName": this.firstFormGroup.get('middlename').value != undefined ? this.firstFormGroup.get('middlename').value : '',
        "lastName": this.firstFormGroup.get('lastname').value,
        "dob": this.firstFormGroup.get('dob').value != undefined ? moment(new Date(this.firstFormGroup.get('dob').value)).format("DD/MM/YYYY") : '',
        "age": Number(this.firstFormGroup.get('age').value),
        "gender": "Male",
        "maritalStatus": true,
        "mobileNo": ""+this.firstFormGroup.get('contactNumber').value,
        "emailId": this.secondFormGroup.get('spouseEmail').value != undefined ? this.secondFormGroup.get('spouseEmail').value : '',
        "govIdTypeId": this.secondFormGroup.get('govtIDType').value != undefined ? this.secondFormGroup.get('govtIDType').value : 0,
        "govIdDetail": this.secondFormGroup.get('GovtIDDetail').value != undefined ? this.secondFormGroup.get('GovtIDDetail').value : '',
        "spouseSubjectId": "",
        "spouseFirstName": "",
        "spouseMiddleName": "",
        "spouseLastName": "",
        "spouseContactNo": "",
        "spouseGovIdTypeId": 0,
        "spouseGovIdDetail": "",
        "assignANMId": Number(this.secondFormGroup.get('associatedanm').value),
        "dateOfRegister": moment(new Date(this.firstFormGroup.get('dor').value)).format("DD/MM/YYYY"),
        "registeredFrom": Number(this.user.registeredFrom),
        "createdBy": Number(this.user.id),
        "source": "N"
      },
      "subjectAddressRequest": {
        "religionId": Number(this.secondFormGroup.get('religion').value),
        "casteId": Number(this.secondFormGroup.get('caste').value),
        "communityId": Number(this.secondFormGroup.get('community').value),
        "address1": this.secondFormGroup.get('house').value,
        "address2": this.secondFormGroup.get('street').value,
        "address3": this.secondFormGroup.get('city').value,
        "pincode": ""+this.secondFormGroup.get('pincode').value,
        "stateName": this.secondFormGroup.get('state').value,
        "updatedBy": Number(this.user.id)
      },
      "subjectPregnancyRequest": {
        "rchId": this.firstFormGroup.get('rchId').value,
        "ecNumber": this.secondFormGroup.get('ECNumber').value,
        "lmpDate": "",
        "g": 0,
        "p": 0,
        "l": 0,
        "a": 0,
        "updatedBy": Number(this.user.id)
      },
      "subjectParentRequest": {
        "motherFirstName": "",
        "motherMiddleName": "",
        "motherLastName": "",
        "motherGovIdTypeId": 0,
        "motherGovIdDetail": "",
        "motherContactNo": "",
        "fatherFirstName": "",
        "fatherMiddleName": "",
        "fatherLastName": "",
        "fatherGovIdTypeId": 0,
        "fatherGovIdDetail": "",
        "fatherContactNo": "",
        "gaurdianFirstName": "",
        "gaurdianMiddleName": "",
        "gaurdianLastName": "",
        "gaurdianGovIdTypeId": 0,
        "gaurdianGovIdDetail": "",
        "gaurdianContactNo": "",
        "rbskId": "",
        "schoolName": "",
        "schoolAddress1": "",
        "schoolAddress2": "",
        "schoolAddress3": "",
        "schoolPincode": "",
        "schoolCity": "",
        "schoolState": "",
        "standard": "",
        "section": "",
        "rollNo": "",
        "updatedBy": Number(this.user.id)
      }
    };

    return _obj;
  }


}
