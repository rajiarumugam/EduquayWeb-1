import { Component, OnInit,ViewChild } from '@angular/core';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { DistrictResponse, District } from 'src/app/shared/master/district/district.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { HttpClientService } from '../../../shared/http-client.service';
import { ENDPOINT } from '../../../app.constant';
import { GenericService } from '../../../shared/generic.service';
declare var $: any 

@Component({
  selector: 'app-anm-student-registration',
  templateUrl: './anm-student-registration.component.html',
  styleUrls: ['./anm-student-registration.component.css']
})
export class AnmStudentRegistrationComponent implements OnInit {
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
  selecteddor;
  selectedage;
  GENDERDATA = ["Male","Female","Others"];
  subjectTitleArray = ["Mr","Miss"];
  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: new Date(Date.now()),
    maxDate: new Date(Date.now())
  };

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
      age: ['', Validators.required],
      gender: ['', Validators.required]
   });
    this.secondFormGroup = this._formBuilder.group({
   
      religion: ['', Validators.required],
      caste: ['', Validators.required],
      community: ['', Validators.required],
      contactNumber: ['', Validators.required],
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
      motherContactNumber: ['', Validators.required],
      fatherFirstName: [''],
      fatherMiddleName: [''],
      fatherLastName: [''],
      fathergovtIDType: [''],
      fatherGovtIDDetail: [''],
      fatherContactNumber: [''],
      guardianFirstName: [''],
      guardianMiddleName: [''],
      guardianLastName: [''],
      guardiangovtIDType: [''],
      guardianGovtIDDetail: [''],
      guardianContactNumber: ['']
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
    this.getCommunity();
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

  getCommunity(){
    this.masterService.getCommunity()
    .subscribe(response => {
      this.communityData = response['community'];
    },
    (err: HttpErrorResponse) =>{
      this.communityData = [];
      this.erroMessage = err.toString();
    });
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

  nextStep(id) {
    if(id === 1)
    {
      this.firstFormCheck = true;
      this.stepper.next();
      if(this.firstFormGroup.valid)
        this.stepper.next();
    }
    else 
    {
      console.log(this.secondFormGroup.valid);
      this.secondFormCheck = true;
       if(this.secondFormGroup.valid)
        this.stepper.next();
    }
        
    console.log('hitting here'+this.firstFormGroup.valid);
        //this.stepper.next();
        
    }

    prevStep() {
      this.stepper.previous();
      }


      formSubmit()
    {

   /* if(this.secondFormGroup.valid && this.firstFormGroup.valid)
    {
      var apiUrl = this.genericService.buildApiUrl(ENDPOINT.SUBJECT.ADD+this.userId);
      this.httpClientService.post<any>({url:apiUrl, body: this.dataDindinginServce() }).subscribe(response => {
        console.log(response);
        this.createdSubjectId = response.uniqueSubjectId;
        $('#fadeinModal').modal('show');
      },
      (err: HttpErrorResponse) =>{
        console.log(err);
      });
    }*/

      console.log(this.firstFormGroup.get('dor').value+"::::"+moment(new Date(this.firstFormGroup.get('dor').value)).format("DD/MM/YYYY")+":::::"+this.firstFormGroup.get('district').value+":::::"+this.firstFormGroup.get('chc').value+":::::"+this.firstFormGroup.get('phc').value+":::::"+this.firstFormGroup.get('sc').value+":::::"+this.firstFormGroup.get('ripoint').value+":::::"+this.firstFormGroup.get('subjectitle').value+":::::"+this.firstFormGroup.get('firstname').value+":::::"+this.firstFormGroup.get('middlename').value+":::::"+this.firstFormGroup.get('lastname').value+":::::"+this.firstFormGroup.get('dob').value+":::::"+this.firstFormGroup.get('age').value+":::::"+this.firstFormGroup.get('gender').value+":::::");
      console.log(this.secondFormGroup.get('religion').value+":::::"+this.secondFormGroup.get('caste').value+":::::"+this.secondFormGroup.get('community').value+":::::"+this.secondFormGroup.get('contactNumber').value+":::::"+this.secondFormGroup.get('house').value+":::::"+this.secondFormGroup.get('street').value+":::::"+this.secondFormGroup.get('city').value+":::::"+this.secondFormGroup.get('state').value+":::::"+this.secondFormGroup.get('pincode').value+":::::"+this.secondFormGroup.get('motherFirstName').value+":::::"+this.secondFormGroup.get('motherMiddleName').value+":::::"+this.secondFormGroup.get('motherLastName').value+":::::"+this.secondFormGroup.get('mothergovtIDType').value+":::::"+this.secondFormGroup.get('motherContactNumber').value+":::::"+this.secondFormGroup.get('fatherFirstName').value+":::::"+this.secondFormGroup.get('fatherMiddleName').value+":::::"+this.secondFormGroup.get('fatherLastName').value+":::::"+this.secondFormGroup.get('fathergovtIDType').value+":::::"+this.secondFormGroup.get('fatherContactNumber').value+":::::"+this.secondFormGroup.get('guardianFirstName').value+":::::"+this.secondFormGroup.get('guardianMiddleName').value+":::::"+this.secondFormGroup.get('guardianLastName').value+":::::"+this.secondFormGroup.get('guardiangovtIDType').value+":::::"+this.secondFormGroup.get('guardianContactNumber').value);
      console.log()

      console.log(this.dataDindinginServce());
    }

    dataDindinginServce()
    {
      var _obj = {
        "subjectPrimaryRequest": {
          "subjectTypeId": 1,
          "childSubjectTypeId": 1,
          "uniqueSubjectId": "",
          "districtId": this.firstFormGroup.get('district').value != undefined ? this.firstFormGroup.get('district').value != undefined : 0,
          "chcId": this.firstFormGroup.get('chc').value,
          "phcId": this.firstFormGroup.get('phc').value,
          "scId": this.firstFormGroup.get('sc').value,
          "riId": this.firstFormGroup.get('ripoint').value,
          "subjectTitle": this.firstFormGroup.get('subjectitle').value,
          "firstName": this.firstFormGroup.get('firstname').value,
          "middleName": this.firstFormGroup.get('middlename').value != undefined ? this.firstFormGroup.get('middlename').value : '',
          "lastName": this.firstFormGroup.get('lastname').value,
          "dob": this.firstFormGroup.get('dob').value != undefined ? moment(new Date(this.firstFormGroup.get('dob').value)).format("DD/MM/YYYY") : '',
          "age": this.firstFormGroup.get('age').value,
          "gender": "Female",
          "maritalStatus": true,
          "mobileNo": this.firstFormGroup.get('contactNumber').value,
          "emailId": this.secondFormGroup.get('spouseEmail').value != undefined ? this.secondFormGroup.get('spouseEmail').value : '',
          "govIdTypeId": this.secondFormGroup.get('govtIDType').value != undefined ? this.secondFormGroup.get('govtIDType').value : 0,
          "govIdDetail": this.secondFormGroup.get('GovtIDDetail').value != undefined ? this.secondFormGroup.get('GovtIDDetail').value : '',
          "spouseSubjectId": "string",
          "spouseFirstName": this.secondFormGroup.get('spouseFirstName').value,
          "spouseMiddleName": this.secondFormGroup.get('spouseMiddleName').value != undefined ? this.secondFormGroup.get('spouseMiddleName').value : '',
          "spouseLastName": this.secondFormGroup.get('spouseLastName').value,
          "spouseContactNo": this.secondFormGroup.get('spouseContactNumber').value,
          "spouseGovIdTypeId": 0,
          "spouseGovIdDetail": "",
          "assignANMId": this.userId,
          "dateOfRegister": moment(new Date(this.firstFormGroup.get('dor').value)).format("DD/MM/YYYY"),
          "registeredFrom": this.userId,
          "createdBy": this.userId,
          "source": "N"
        },
        "subjectAddressRequest": {
          "religionId": this.secondFormGroup.get('religion').value,
          "casteId": this.secondFormGroup.get('caste').value,
          "communityId": this.secondFormGroup.get('community').value,
          "address1": this.secondFormGroup.get('house').value,
          "address2": this.secondFormGroup.get('street').value,
          "address3": this.secondFormGroup.get('city').value,
          "pincode": this.firstFormGroup.get('pincode').value,
          "stateName": this.secondFormGroup.get('state').value,
          "updatedBy": this.userId
        },
        "subjectPregnancyRequest": {
          "rchId": this.firstFormGroup.get('rchid').value,
          "ecNumber": this.secondFormGroup.get('ECNumber').value,
          "lmpDate": moment(new Date(this.firstFormGroup.get('lmpdate').value)).format("DD/MM/YYYY"),
          "g": this.firstFormGroup.get('g').value,
          "p": this.firstFormGroup.get('p').value,
          "l": this.firstFormGroup.get('l').value,
          "a": this.firstFormGroup.get('a').value,
          "updatedBy": this.userId
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
          "updatedBy": this.userId
        }
      };

      return _obj;
    }


}
