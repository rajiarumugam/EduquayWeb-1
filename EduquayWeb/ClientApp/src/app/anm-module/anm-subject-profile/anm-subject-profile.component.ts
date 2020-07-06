import { Component, OnInit } from '@angular/core';
import { SubjectProfileService } from 'src/app/shared/anm-module/subject-profile/subject-profile.service';
import { SubjectProfileRequest } from 'src/app/shared/anm-module/subject-profile/subject-profile-request';
import { SubjectProfileResponse, PrimaryDetail, AddressDetail, ParentDetail, PregnancyDetail, ReligionResponse, Religion, GovtIDTypeResponse, GovIdType, CasteResponse, CommunityeResponse, CasteList, CommunityList } from 'src/app/shared/anm-module/subject-profile/subject-profile-response';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgWizardConfig, THEME, StepChangedArgs, NgWizardService } from 'ng-wizard';


@Component({
  selector: 'app-anm-subject-profile',
  templateUrl: './anm-subject-profile.component.html',
  styleUrls: ['./anm-subject-profile.component.css']
})
export class AnmSubjectProfileComponent implements OnInit {

  subjectProfileErrorMessage: string;
  subjectProfileRequest: SubjectProfileRequest;
  subjectProfileResponse: SubjectProfileResponse;
  religionResponse: ReligionResponse;
  religions: Religion[] = [];
  selectedreligion = '';
  govtIdTypeResponse: GovtIDTypeResponse;
  govtIdTypes: GovIdType[]= [];
  selectedgovtidtype= '';
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

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    lang: { next: 'Next', previous: 'Previous' },
    toolbarSettings: {
      toolbarExtraButtons: [
        { text: 'Submit', class: 'btn btn-info', event: () => { alert("Finished!!!"); } }
      ]}
  };
 

  constructor(
    private SubjectProfileService: SubjectProfileService,
    private modalService: NgbModal,
    private ngWizardService: NgWizardService
  ) { }

  ngOnInit() {
    console.log(this.SubjectProfileService.subjectProfileApi);
   
    //this.anmSubjectProfile();
  }

  anmSubjectProfile(){
    //this.basicInfo = {};  
    //this.basicInfo['firstName']='';  
    this.subjectProfileErrorMessage = '';
    this.subjectProfileRequest = {subjectId: this.searchsubjectid };
    let subProfile = this.SubjectProfileService.getsubjectProfile(this.subjectProfileRequest)
    .subscribe(response => {
     this.subjectProfileResponse = response;
      if(this.subjectProfileResponse !== null && this.subjectProfileResponse.status === "true"){
        if(this.subjectProfileResponse.primaryDetail.length <= 0 && this.subjectProfileResponse.pregnancyDetail.length <= 0 
          && this.subjectProfileResponse.addressDetail.length <= 0 && this.subjectProfileResponse.parentDetail.length <= 0){
          this.subjectProfileErrorMessage = response.message;
        }
        else{
          this.basicInfo = this.subjectProfileResponse.primaryDetail[0];
          this.socioDemographicInfo = this.subjectProfileResponse.addressDetail[0];
          this.parentInfo = this.subjectProfileResponse.parentDetail[0];
          this.personalInfo = this.subjectProfileResponse.pregnancyDetail[0];
          //this.basicInfo
        }
      }
      else{
        this.subjectProfileErrorMessage = response.message;
      }
    },
    (err: HttpErrorResponse) => {
      this.subjectProfileErrorMessage = err.toString();
    });

    
    
  }
  editSubjectProfile(subjectProfiledetail, basicInfo: PrimaryDetail, socioDemographicInfo: AddressDetail, personalInfo: PregnancyDetail){
    this.ddlReligion();
    this.ddlGovtIdType();
    this.ddlCaste();
    this.firstName = basicInfo.firstName;
    this.lastName = basicInfo.lastName;
    this.middleName = basicInfo.middleName;
    this.dob = basicInfo.dob;
    this.age = basicInfo.age;
    this.mobileNo = basicInfo.mobileNo;
    this.spouseFirstName = basicInfo.spouseFirstName;
    this.spouseMiddleName = basicInfo.spouseMiddleName;
    this.spouseLastName = basicInfo.spouseLastName;
    this.spouseContactNo = basicInfo.spouseContactNo;
    this.govIdDetail = basicInfo.govIdDetail;
    this.address1 = socioDemographicInfo.address1;
    this.address2 = socioDemographicInfo.address2;
    this.address3 = socioDemographicInfo.address3;
    this.pincode = socioDemographicInfo.pincode;
    this.ecNumber = personalInfo.ecNumber;
    this.rchId = personalInfo.rchId;
    // this.selectedreligion = socioDemographicInfo.religionName;
    // this.selectedgovtidtype = basicInfo.govIdDetail;
      
    this.modalService.open(
      subjectProfiledetail,{
        centered: true,
        size: 'xl',
        scrollable: true,
        ariaLabelledBy: 'modal-basic-title'
      });
  }

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }
 
  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }
 
  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }
 
  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }
 
  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }

  ddlReligion(){
  this.SubjectProfileService.getReligion().subscribe(response =>{
      this.religionResponse = response;
      if(this.religionResponse !== null && this.religionResponse.status === "true"){
          this.religions  = this.religionResponse.religion;
          if(this.religions.length > 0){
            this.selectedreligion = this.socioDemographicInfo.religionId.toString();
           }
         
        }
        else{
          this.subjectProfileErrorMessage = response.message;
        }
    },
    (err: HttpErrorResponse) => {
      this.subjectProfileErrorMessage = err.toString();

    });
  }

  ddlGovtIdType(){
    this.govtIdTypes = [];
    this.selectedgovtidtype = '';
    this.SubjectProfileService.getGovtIdType().subscribe(response =>{
        this.govtIdTypeResponse = response;
        if(this.govtIdTypeResponse !== null && this.govtIdTypeResponse.status === "true"){
            this.govtIdTypes  = this.govtIdTypeResponse.govIdType;
            if(this.govtIdTypes.length > 0){
              this.selectedgovtidtype = this.basicInfo.govIdTypeId.toString();
             }
           
          }
          else{
            this.subjectProfileErrorMessage = response.message;
          }
      },
      (err: HttpErrorResponse) => {
        this.subjectProfileErrorMessage = err.toString();
  
      });
    }
  
    ddlCaste(){
      this.castes = [];
      this.selectedcaste = '';
      this.SubjectProfileService.getCaste().subscribe(response =>{
          this.casteResponse = response;
          if(this.casteResponse !== null && this.casteResponse.status === "true"){
              this.castes  = this.casteResponse.caste;
              if(this.castes.length > 0){
                this.selectedcaste = this.socioDemographicInfo.casteId.toString();
                this.onChangecaste(this.socioDemographicInfo.casteId.toString())
               }
             
            }
            else{
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
  
}