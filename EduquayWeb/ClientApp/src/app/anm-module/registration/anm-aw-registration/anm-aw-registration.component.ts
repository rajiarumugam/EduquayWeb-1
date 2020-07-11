import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { DistrictService } from 'src/app/shared/master/district/district.service';
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
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
declare var $: any 

declare var exposedFunction;


@Component({
  selector: 'app-anm-aw-registration',
  templateUrl: './anm-aw-registration.component.html',
  styleUrls: ['./anm-aw-registration.component.css']
})

export class AnmAwRegistrationComponent implements OnInit {
  //@ViewChild('f', { static: false }) subRegBasic: NgForm;

  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  districts: District[] = [];
  erroMessage: string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  firstFormCheck = false;
  secondFormCheck = false;
  selectedDistrict = null;
  selecteda = null;
  selectedl = null;
  selectedp = null;
  selectedg = null;
  selectedchc = null;
  selectedphc = null;
  selectedripoint = null;
  selectedsc = null;
  selectedgovtIDType = null;
  selectedreligion = null;
  selectedcaste = null;
  selectedcommunity = null;
  selectedsubjectTitle = "Ms.";
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
  selectedage;
  GPLADATA = [{id:'00',value:'0'},{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'}];
  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: new Date(Date.now()),
    maxDate: new Date(Date.now())
  };
  selecteddor = new Date(Date.now());
  userId = 2;
  createdSubjectId="";

  constructor(private masterService: masterService, zone: NgZone,private _formBuilder: FormBuilder,private httpClientService:HttpClientService,private genericService: GenericService) {
    window['angularComponentReference'] = {
      zone: zone,
      componentFn: (id, value) => this.callFromOutside(id, value),
      component: this,
    };
  }

  ngOnInit() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
   /* swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })*/
    this.firstFormGroup = this._formBuilder.group({
      dor: ['', Validators.required],
      district: ['', Validators.required],
      chc: ['', Validators.required],
      phc: ['', Validators.required],
      sc: ['', Validators.required],
      ripoint: ['', Validators.required],
      pincode: ['', Validators.required],
      contactNumber: ['', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
      subjectitle: ['Ms.'],
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: ['', Validators.required],
      dob: [''],
      age: ['', [Validators.required,Validators.min(1), Validators.max(99)]],
      rchid: ['', Validators.required],
      lmpdate: ['', Validators.required],
      g: ['', Validators.required],
      p: ['', Validators.required],
      l: ['', Validators.required],
      a: ['', Validators.required]
   });

    this.secondFormGroup = this._formBuilder.group({
      ECNumber: [''],
      govtIDType: [''],
      GovtIDDetail: [''],
      religion: ['', Validators.required],
      caste: ['', Validators.required],
      community: ['', Validators.required],
      house: ['', Validators.required],
      street: ['', Validators.required],
      city : ['', Validators.required],
      state: ['', Validators.required],
      subjectTitle : ['Mr.'],
      spouseFirstName: ['', Validators.required],
      spouseMiddleName: [''],
      spouseLastName: ['', Validators.required],
      spouseContactNumber: ['', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
      spouseEmail: ['',Validators.email]
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

  public callFromOutside(id, subject: any): any {
    let subjectdetail = JSON.parse(subject);
  }
  selected(eventval){
    console.log(eventval);
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

  nextStep() {
    this.firstFormCheck = true;
      if(this.firstFormGroup.valid)
        this.stepper.next();
    }

    prevStep() {
      this.stepper.previous();
      }

    formSubmit()
    {
      this.secondFormCheck = true;

      if(this.secondFormGroup.valid && this.firstFormGroup.valid)
      {
        var apiUrl = this.genericService.buildApiUrl(ENDPOINT.SUBJECT.ADD);
        this.httpClientService.post<any>({url:apiUrl, body: this.dataDindinginServce() }).subscribe(response => {
          this.createdSubjectId = response.uniqueSubjectId;
          Swal.fire({icon:'success', title: 'Subject ID is '+this.createdSubjectId,
          showCancelButton: true, confirmButtonText: 'Collect sample now', cancelButtonText: 'Collect sample later' })
             .then((result) => {
               if (result.value) {
                console.log('hitting 1');
                $('#fadeinModal').modal('hide');
               
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
        },
        (err: HttpErrorResponse) =>{
          console.log(err);
        });
      }
    }

    dataDindinginServce()
    {
      var _obj = {
        "subjectPrimaryRequest": {
          "subjectTypeId": 1,
          "childSubjectTypeId": 1,
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
          "gender": "Female",
          "maritalStatus": true,
          "mobileNo": ""+this.firstFormGroup.get('contactNumber').value,
          "emailId": this.secondFormGroup.get('spouseEmail').value != undefined ? this.secondFormGroup.get('spouseEmail').value : '',
          "govIdTypeId": this.secondFormGroup.get('govtIDType').value != undefined ? +this.secondFormGroup.get('govtIDType').value : 0,
          "govIdDetail": this.secondFormGroup.get('GovtIDDetail').value != undefined ? this.secondFormGroup.get('GovtIDDetail').value : '',
          "spouseSubjectId": "",
          "spouseFirstName": this.secondFormGroup.get('spouseFirstName').value,
          "spouseMiddleName": this.secondFormGroup.get('spouseMiddleName').value != undefined ? this.secondFormGroup.get('spouseMiddleName').value : '',
          "spouseLastName": this.secondFormGroup.get('spouseLastName').value,
          "spouseContactNo": ""+this.secondFormGroup.get('spouseContactNumber').value,
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
          "pincode": ""+this.firstFormGroup.get('pincode').value,
          "stateName": this.secondFormGroup.get('state').value,
          "updatedBy": Number(this.userId)
        },
        "subjectPregnancyRequest": {
          "rchId": this.firstFormGroup.get('rchid').value,
          "ecNumber": this.secondFormGroup.get('ECNumber').value,
          "lmpDate": moment(new Date(this.firstFormGroup.get('lmpdate').value)).format("DD/MM/YYYY"),
          "g": Number(this.firstFormGroup.get('g').value),
          "p": Number(this.firstFormGroup.get('p').value),
          "l": Number(this.firstFormGroup.get('l').value),
          "a": Number(this.firstFormGroup.get('a').value),
          "updatedBy": Number(this.userId)
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
          "updatedBy": Number(this.userId)
        }
      };

      return _obj;
    }

}
