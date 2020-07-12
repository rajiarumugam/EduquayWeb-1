import { Component, OnInit,ViewChild } from '@angular/core';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { DistrictResponse, District } from 'src/app/shared/master/district/district.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { HttpClientService } from '../../../../shared/http-client.service';
import { ENDPOINT } from '../../../../app.constant';
import { GenericService } from '../../../../shared/generic.service';
declare var $: any 
import Swal from 'sweetalert2';

@Component({
  selector: 'chc-walkin-registration',
  templateUrl: './walk-in-registration.component.html',
  styleUrls: ['./walk-in-registration.component.css']
})
export class ChcwalkinRegistrationComponent implements OnInit {
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  districts: District[] = [];
  erroMessage: string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  firstFormCheck = false;
  secondFormCheck = false;
  selectedDistrict = null;
  selectedgender = null;
  selectedchc = null;
  selectedphc = null;
  selectedripoint = null;
  selectedsc = null;
  selectedmothergovtIDType = null;
  selectedreligion = null;
  selectedcaste = null;
  selectedcommunity = null;
  selectedsubjectTitle = null;
  selectedfathergovtIDType = null;
  selectedguardiangovtIDType = null;
  selectedschoolstandard = null;
  selectedsubjectTitle1 = "Mr."
  CHCdata = [];
  PHCdata = [];
  RIdata =[];
  SCdata = [];
  religionData = [];
  casteData = [];
  communityData = [];
  governmentIDData = [];
  selecteddob;
  selecteddor = new Date(Date.now());
  selectedage;
  GENDERDATA = ["Male","Female","Others"];
  sectionArray = ['PRE KG','LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12'];
  subjectTitleArray = ["Mr","Miss"];
  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: new Date(Date.now()),
    maxDate: new Date(Date.now())
  };


  selectedfirstname;
  selectedmiddlename;
  selectedlastname;
  selectedMobile;
  selectedhouse;
  selectedstreet;
  selectedcity;
  selectedstate;
  selectedPincode;
  selectedmotherFirstName;
  selectedmotherMiddleName;
  selectedmotherLastName;
  selectedmotherGovtIDDetail;
  selectedmotherContactNumber;
  selectedfatherFirstName;
  selectedfatherMiddleName;
  selectedfatherLastName;
  selectedfatherGovtIDDetail;
  selectedfatherContactNumber;
  selectedguardianFirstName;
  selectedguardianMiddleName;
  selectedguardianLastName;
  selectedguardianGovtIDDetail;
  selectedguardianContactNumber;
  selectedschoolName;
  selectedschoolstreet;
  selectedschoolcity;
  selectedschoolstate;
  selectedSchoolPincode;
  selectedrbskid;
  selectedschoolsection;
  selectedrollnumber;


  createdSubjectId;
  userId = 2;
  constructor(private masterService: masterService, private _formBuilder: FormBuilder,private httpClientService:HttpClientService,private genericService: GenericService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      dor: ['', Validators.required],
      district: ['', Validators.required],
      chc: ['', Validators.required],
      phc: ['', Validators.required],
      sc: ['', Validators.required],
      ripoint: ['', Validators.required],
      subjectitle: ['', Validators.required],
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: ['', Validators.required],
      dob: [''],
      age: ['', [Validators.required,Validators.min(1), Validators.max(99)]],
      gender: ['', Validators.required]
   });
    this.secondFormGroup = this._formBuilder.group({
   
      religion: ['', Validators.required],
      caste: ['', Validators.required],
      community: ['', Validators.required],
      contactNumber: ['', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
      house: ['', Validators.required],
      street: ['', Validators.required],
      city : ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      motherFirstName: ['', Validators.required],
      motherMiddleName: [''],
      motherLastName: ['', Validators.required],
      mothergovtIDType: [''],
      motherGovtIDDetail: [''],
      motherContactNumber: ['', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
      fatherFirstName: [''],
      fatherMiddleName: [''],
      fatherLastName: [''],
      fathergovtIDType: [''],
      fatherGovtIDDetail: [''],
      fatherContactNumber: ['',[Validators.min(1000000000), Validators.max(9999999999)]],
      guardianFirstName: [''],
      guardianMiddleName: [''],
      guardianLastName: [''],
      guardiangovtIDType: [''],
      guardianGovtIDDetail: [''],
      guardianContactNumber: ['',[Validators.min(1000000000), Validators.max(9999999999)]]
    });

    this.thirdFormGroup = this._formBuilder.group({
   
      schoolname: [''],
      schoolstreet: [''],
      schoolcity : [''],
      schoolstate: [''],
      schoolpincode: [''],
      rbskid: [''],
      schoolstandard: [''],
      schoolsection: [''],
      rollnumber: ['']
    });
    this.getDistrictData();
    this.getCHC();
    this.getPHC();
    this.getSC();
    this.getRI();
    this.getReligion();
    this.getCaste();
    this.getCommunity(0);
    this.getGovernmentIDType();
  }

  getDistrictData(){
    this.masterService.getuserBasedDistrict()
    .subscribe(response => {
      this.districts = response['district'];
    },
    (err: HttpErrorResponse) =>{
      this.districts = [];
      this.erroMessage = err.toString();
    });
  }
  getCHC(){
    this.masterService.getuserBasedCHC()
    .subscribe(response => {
      this.CHCdata = response['chc'];
    },
    (err: HttpErrorResponse) =>{
      this.CHCdata = [];
      this.erroMessage = err.toString();
    });
  }
  getPHC(){
    this.masterService.getuserBasedPHC()
    .subscribe(response => {
      this.PHCdata = response['phc'];
    },
    (err: HttpErrorResponse) =>{
      this.PHCdata = [];
      this.erroMessage = err.toString();
    });
  }

  getSC(){
    this.masterService.getuserBasedSC()
    .subscribe(response => {
      this.SCdata = response['sc'];
    },
    (err: HttpErrorResponse) =>{
      this.SCdata = [];
      this.erroMessage = err.toString();
    });
  }
  getRI(){
    this.masterService.getuserBasedRI()
    .subscribe(response => {
      this.RIdata = response['ri'];
    },
    (err: HttpErrorResponse) =>{
      this.RIdata = [];
      this.erroMessage = err.toString();
    });
  }
  
  getReligion(){
    this.masterService.getReligion()
    .subscribe(response => {
      this.religionData = response['religion'];
    },
    (err: HttpErrorResponse) =>{
      this.religionData = [];
      this.erroMessage = err.toString();
    });
  }

  getCaste(){
    this.masterService.getCaste()
    .subscribe(response => {
      this.casteData = response['caste'];
    },
    (err: HttpErrorResponse) =>{
      this.casteData = [];
      this.erroMessage = err.toString();
    });
  }

  getCommunity(id){
    if(id === 0)
    {
        this.masterService.getCommunity()
        .subscribe(response => {
          this.communityData = response['community'];
        },
        (err: HttpErrorResponse) =>{
          this.communityData = [];
          this.erroMessage = err.toString();
        });
    }
    else{
      this.masterService.getCommunityPerCaste(id)
        .subscribe(response => {
          this.communityData = response['community'];
        },
        (err: HttpErrorResponse) =>{
          this.communityData = [];
          this.erroMessage = err.toString();
        });
    }
    
  }

  getGovernmentIDType(){
    this.masterService.getGovernmentTypeId()
    .subscribe(response => {
      this.governmentIDData = response['govIdType'];
    },
    (err: HttpErrorResponse) =>{
      this.governmentIDData = [];
      this.erroMessage = err.toString();
    });
  }

  calculateAge()
  {
     console.log(this.selecteddob);
     var today = new Date();
     var birthDate = new Date(this.selecteddob);
     var age = today.getFullYear() - birthDate.getFullYear();
     var m = today.getMonth() - birthDate.getMonth();
     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
         age--;
     }
     console.log(age);
     this.selectedage = age;
     //return age;
  }
  casteChange()
  {
    this.getCommunity(this.selectedcaste);
  }
  nextStep(id) 
  {
    if(id === 1)
    {
      this.firstFormCheck = true;
      if(this.firstFormGroup.valid)
        this.stepper.next();
    }
    else 
    {
      this.secondFormCheck = true;
      if(this.secondFormGroup.valid)
        this.stepper.next();
    }
        //this.stepper.next();
  }

    prevStep() {
      this.stepper.previous();
      }

      formSubmit()
    {
        if(this.secondFormGroup.valid && this.firstFormGroup.valid)
          {
            var apiUrl = this.genericService.buildApiUrl(ENDPOINT.SUBJECT.ADD);
            this.httpClientService.post<any>({url:apiUrl, body: this.dataBindinginServce() }).subscribe(response => {
              console.log(response);
              this.createdSubjectId = response.uniqueSubjectId;
              Swal.fire({icon:'success', title: 'Subject ID is '+this.createdSubjectId,
          showCancelButton: true, confirmButtonText: 'Collect sample now', cancelButtonText: 'Collect sample later' })
             .then((result) => {
               if (result.value) {
         
                $('#fadeinModal').modal('hide');
               
               }
               else{
                this.firstFormGroup.reset();
                this.secondFormGroup.reset();
                this.thirdFormGroup.reset();
                this.secondFormCheck = false;
                this.firstFormCheck = false;
                this.stepper.selectedIndex = 0;
                $('#fadeinModal').modal('hide');
               }
             });
            },
            (err: HttpErrorResponse) =>{
              console.log(err);
            });
          }
        console.log(this.dataBindinginServce());
    }

    dataBindinginServce()
    {
      var _obj = {
        "subjectPrimaryRequest": {
          "subjectTypeId": 3,
          "childSubjectTypeId": 3,
          "uniqueSubjectId": "",
          "districtId": this.firstFormGroup.get('district').value != undefined ? Number(this.firstFormGroup.get('district').value) : 0,
          "chcId": Number(this.firstFormGroup.get('chc').value),
          "phcId": Number(this.firstFormGroup.get('phc').value),
          "scId": Number(this.firstFormGroup.get('sc').value),
          "riId": Number(this.firstFormGroup.get('ripoint').value),
          "subjectTitle": this.firstFormGroup.get('subjectitle').value,
          "firstName": this.firstFormGroup.get('firstname').value,
          "middleName": this.firstFormGroup.get('middlename').value != undefined ? this.firstFormGroup.get('middlename').value : '',
          "lastName": this.firstFormGroup.get('lastname').value,
          "dob": this.firstFormGroup.get('dob').value != undefined ? moment(new Date(this.firstFormGroup.get('dob').value)).format("DD/MM/YYYY") : '',
          "age": Number(this.firstFormGroup.get('age').value),
          "gender": this.firstFormGroup.get('gender').value,
          "maritalStatus": false,
          "mobileNo": ""+this.secondFormGroup.get('contactNumber').value,
          "emailId": "",
          "govIdTypeId": 0,
          "govIdDetail": "",
          "spouseSubjectId": "",
          "spouseFirstName": "",
          "spouseMiddleName": "",
          "spouseLastName": "",
          "spouseContactNo": "",
          "spouseGovIdTypeId": 0,
          "spouseGovIdDetail": "",
          "assignANMId": this.userId,
          "dateOfRegister": moment(new Date(this.firstFormGroup.get('dor').value)).format("DD/MM/YYYY"),
          "registeredFrom": Number(this.userId),
          "createdBy": Number(this.userId),
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
          "updatedBy": Number(this.userId)
        },
        "subjectPregnancyRequest": {
          "rchId": '0',
          "ecNumber": "",
          "lmpDate": "",
          "g": 0,
          "p": 0,
          "l": 0,
          "a": 0,
          "updatedBy": Number(this.userId)
        },
        "subjectParentRequest": {
          "motherFirstName": this.secondFormGroup.get('motherFirstName').value,
          "motherMiddleName": this.secondFormGroup.get('motherMiddleName').value != undefined ? this.secondFormGroup.get('motherMiddleName').value : '',
          "motherLastName": this.secondFormGroup.get('motherLastName').value,
          "motherGovIdTypeId": this.secondFormGroup.get('mothergovtIDType').value != undefined ? Number(this.secondFormGroup.get('mothergovtIDType').value) : 0,
          "motherGovIdDetail": this.secondFormGroup.get('motherGovtIDDetail').value != undefined ? this.secondFormGroup.get('motherGovtIDDetail').value : '',
          "motherContactNo": ""+this.secondFormGroup.get('motherContactNumber').value,
          "fatherFirstName": this.secondFormGroup.get('fatherFirstName').value != undefined ? this.secondFormGroup.get('fatherFirstName').value : '',
          "fatherMiddleName": this.secondFormGroup.get('fatherMiddleName').value != undefined ? this.secondFormGroup.get('fatherMiddleName').value : '',
          "fatherLastName": this.secondFormGroup.get('fatherLastName').value != undefined ? this.secondFormGroup.get('fatherLastName').value : '',
          "fatherGovIdTypeId": this.secondFormGroup.get('fathergovtIDType').value != undefined ? Number(this.secondFormGroup.get('fathergovtIDType').value) : 0,
          "fatherGovIdDetail": this.secondFormGroup.get('fatherGovtIDDetail').value != undefined ? this.secondFormGroup.get('fatherGovtIDDetail').value : '',
          "fatherContactNo": this.secondFormGroup.get('fatherContactNumber').value != undefined ? ""+this.secondFormGroup.get('fatherContactNumber').value : '',
          "gaurdianFirstName": this.secondFormGroup.get('guardianFirstName').value != undefined ? this.secondFormGroup.get('guardianFirstName').value : '',
          "gaurdianMiddleName": this.secondFormGroup.get('guardianMiddleName').value != undefined ? this.secondFormGroup.get('guardianMiddleName').value : '',
          "gaurdianLastName": this.secondFormGroup.get('guardianLastName').value != undefined ? this.secondFormGroup.get('guardianLastName').value : '',
          "gaurdianGovIdTypeId": this.secondFormGroup.get('guardiangovtIDType').value != undefined ? Number(this.secondFormGroup.get('guardiangovtIDType').value) : 0,
          "gaurdianGovIdDetail": this.secondFormGroup.get('guardianGovtIDDetail').value != undefined ? this.secondFormGroup.get('guardianGovtIDDetail').value : '',
          "gaurdianContactNo": this.secondFormGroup.get('guardianContactNumber').value != undefined ? ""+this.secondFormGroup.get('guardianContactNumber').value : '',

          "rbskId": this.thirdFormGroup.get('rbskid').value != undefined ? this.thirdFormGroup.get('rbskid').value : '',
          "schoolName": this.thirdFormGroup.get('schoolname').value != undefined ? this.thirdFormGroup.get('schoolname').value : '',
          "schoolAddress1": this.thirdFormGroup.get('schoolstreet').value != undefined ? this.thirdFormGroup.get('schoolstreet').value : '',
          "schoolAddress2": '',
          "schoolAddress3": '',
          "schoolPincode": this.thirdFormGroup.get('schoolpincode').value != undefined ? this.thirdFormGroup.get('schoolpincode').value : '',
          "schoolCity": this.thirdFormGroup.get('schoolcity').value != undefined ? this.thirdFormGroup.get('schoolcity').value : '',
          "schoolState": this.thirdFormGroup.get('schoolstate').value != undefined ? this.thirdFormGroup.get('schoolstate').value : '',
          "standard": this.thirdFormGroup.get('schoolstandard').value != undefined ? this.thirdFormGroup.get('schoolstandard').value : '',
          "section": this.thirdFormGroup.get('schoolsection').value != undefined ? this.thirdFormGroup.get('schoolsection').value : '',
          "rollNo": this.thirdFormGroup.get('rollnumber').value != undefined ? this.thirdFormGroup.get('rollnumber').value : '',
          "updatedBy": Number(this.userId)
        }
      };

      return _obj;
    }


}
