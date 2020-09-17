import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { SubjectProfileService } from 'src/app/shared/anm-module/subject-profile/subject-profile.service';
import { SubjectProfileRequest } from 'src/app/shared/anm-module/subject-profile/subject-profile-request';
import { SubjectProfileResponse, PrimaryDetail, AddressDetail, ParentDetail, PregnancyDetail, ReligionResponse, Religion, GovtIDTypeResponse, GovIdType, CasteResponse, CommunityeResponse, CasteList, CommunityList, RetrieveSubjectProfileList, SubjectProfileList, prePndtCounselling, pndtTesting, postPndtCounselling, mtpService } from 'src/app/shared/anm-module/subject-profile/subject-profile-response';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatStepper } from '@angular/material/stepper';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { DataService } from 'src/app/shared/data.service';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
import { user } from 'src/app/shared/auth-response';



@Component({
  selector: 'app-anm-subject-profile',
  templateUrl: './anm-subject-profile.component.html',
  styleUrls: ['./anm-subject-profile.component.css']
})
export class AnmSubjectProfileComponent implements OnInit {

  @ViewChild('stepper', { static: false }) stepper: MatStepper;
    
  subjectProfileErrorMessage: string;
  
  subjectProfileRequest: SubjectProfileRequest;
  anmsubjectProfileResponse: RetrieveSubjectProfileList;
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
  subjectprofileLists: SubjectProfileList[]=[];
  subjectprofileItem: SubjectProfileList;

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
    private dataservice: DataService
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
            //this.subjectprofileItem = this.subjectProfileResponse.subjectsDetail[0];          
            //this.basicInfo
           
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

  editSubjectProfile(subjectProfiledetail) {
    
    this.ddlReligion();
    this.ddlGovtIdType();
    this.ddlCaste();
    //this.ddlGvalue();
    this.firstFormGroup = new FormGroup({
      firstName: new FormControl(this.basicInfo.firstName),
      lastName: new FormControl(this.basicInfo.lastName),
      middleName: new FormControl(this.basicInfo.middleName),
      dob: new FormControl(this.basicInfo.dob),
      age: new FormControl(this.basicInfo.age),
      DDLreligion: new FormControl(this.socioDemographicInfo.religionName),
      DDLcaste: new FormControl(this.socioDemographicInfo.casteName),
      DDLcommunity: new FormControl(this.socioDemographicInfo.communityName),
      
    });
    this.secondFormGroup = new FormGroup({
      house: new FormControl(this.socioDemographicInfo.address1),
      street: new FormControl(this.socioDemographicInfo.address2), 
      city: new FormControl(this.socioDemographicInfo.address3),
      stateName: new FormControl(this.socioDemographicInfo.stateName),
      pincode: new FormControl(this.socioDemographicInfo.pincode),
      mobileNo: new FormControl(this.basicInfo.mobileNo),
      emailId: new FormControl(this.basicInfo.emailId),
      govIdDetail: new FormControl(this.basicInfo.govIdDetail),
      rchId: new FormControl(this.personalInfo.rchId),
      ecNumber: new FormControl(this.personalInfo.ecNumber),
      spouseFirstName: new FormControl(this.basicInfo.spouseFirstName),
      spouseMiddleName: new FormControl(this.basicInfo.spouseMiddleName),
      spouseLastName: new FormControl(this.basicInfo.spouseLastName),
      spouseContactNo: new FormControl(this.basicInfo.spouseContactNo),
      DDLGovtIDType: new FormControl(this.basicInfo.govIdType)

    });
    

    this.modalService.open(
      subjectProfiledetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
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
          this.selectedreligion = this.socioDemographicInfo.religionId.toString();
          // this.firstFormGroup = new FormGroup({
          //   DDLreligion : new FormControl(this.socioDemographicInfo.religionId.toString())
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
          this.selectedgovtidtype = this.basicInfo.govIdTypeId.toString();
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
          this.selectedcaste = this.socioDemographicInfo.casteId.toString();
          this.onChangecaste(this.socioDemographicInfo.casteId.toString())
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
          if (this.communities.findIndex(com => com.id === this.socioDemographicInfo.communityId) >= 0) {
            this.selectedcommunity = this.socioDemographicInfo.communityId.toString();
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

  ddlGvalue(){
    this.Glists = [];
    this.selectedG = 0;
    this.httpService.get('./assets/Glists.json').subscribe(
      data => {
        this.Glists = data as number [];	 // FILL THE ARRAY WITH DATA.
        //  console.log(this.Glists[1]);
        this.selectedG = this.personalInfo.g
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

  
}
