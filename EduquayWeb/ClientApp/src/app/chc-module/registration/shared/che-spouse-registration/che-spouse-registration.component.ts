import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { DistrictResponse, District } from 'src/app/shared/master/district/district.model';
import { HttpErrorResponse } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { HttpClientService } from '../../../../shared/http-client.service';
import { ENDPOINT } from '../../../../app.constant';
import { GenericService } from '../../../../shared/generic.service';
declare var $: any 
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'che-spouse-registration',
  templateUrl: './che-spouse-registration.component.html',
  styleUrls: ['./che-spouse-registration.component.css']
})
export class CheSpouseRegistrationComponent implements OnInit {

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
  selectedsubjectTitle = "Mr.";
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
  selecteddor = new Date(Date.now());
  GPLADATA = [{id:'00',value:'0'},{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'}];
  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: new Date(Date.now()),
    maxDate: new Date(Date.now())
  };
  startOptions1: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: '',
    maxDate: new Date(Date.now())
  };
  user;
  createdSubjectId="";

  spouseData = [];
  selectedanwname;
  selectedsubjectId;
  selectedrchId;
  selectedMobile;
  selectedgender;

  fromDate = "";
  toDate = "";

  selectedfirstname;
  selectedmiddlename;
  selectedlastname;
  selectedspouseContactNumber;
  selectedspouseEmail;
  selectedGovtIDDetail;
  selectedhouse;
  selectedstreet;
  selectedstate;
  selectedPincode;
  selectedECNumber;
  selectedcity;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private masterService: masterService, zone: NgZone,private _formBuilder: FormBuilder,private httpClientService:HttpClientService,private genericService: GenericService,private tokenService: TokenService) { }

  ngOnInit() {
    
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 5,
      processing: true,
      stripeClasses: [],
      lengthMenu: [5, 10, 20, 50],
      language: {
        search: '<div><span class="note">Search by any Subject information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
        searchPlaceholder: "Search...",
        lengthMenu: "Records / Page :  _MENU_",
        paginate: {
          first: '',
          last: '', // or '←' 
          previous: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
          next: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
        },
        //Search: '<a class="btn searchBtn" id="searchBtn"><i class="fa fa-search"></i></a>'
        
      } 
    };
    this.dtTrigger.next();

    /*
    phc: ['', Validators.required],
      sc: ['', Validators.required],
      ripoint: ['', Validators.required],
    */
    this.firstFormGroup = this._formBuilder.group({
      anwname:['', Validators.required],
      subjectId:['', Validators.required],
      rchId: ['', Validators.required],
      dor: ['', Validators.required],
      district: ['', Validators.required],
      chc: ['', Validators.required],
      
      contactNumber: [''],
      gender: ['', Validators.required],
      /*pincode: ['', Validators.required],
      ,*/
      subjectitle: ['Mr.'],
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: ['', Validators.required],
      dob: [''],
      age: ['', [Validators.required,Validators.min(1), Validators.max(99)]]
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
      spouseContactNumber: ['', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
      spouseEmail: ['',Validators.email],
      pincode:['', Validators.required],
      ripoint: ['', Validators.required]
    });

    
    this.getSpouseDetails();
  
    
    this.getDistrictData();
    this.getCHC();
    //this.getPHC();
    //this.getSC();
    this.getRI();
    this.getReligion();
    this.getCaste();
    this.getCommunity(0);
    this.getGovernmentIDType();
  }

  getSpouseDetails()
  {
    var _subjectObj = {
      "anmId":this.user.id,
      "fromDate":this.fromDate != '' ? moment(new Date(this.fromDate)).format("DD/MM/YYYY") : '',
      "toDate":this.toDate != '' ? moment(new Date(this.toDate)).format("DD/MM/YYYY") : ''
    }
    //var apiUrl = this.genericService.buildApiUrl(ENDPOINT.SUBJECT.RETRIVECHCANWPOSITIVESUBJECTS);
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.SUBJECT.RETRIVE);
        this.httpClientService.post<any>({url:apiUrl, body: _subjectObj }).subscribe(response => {
          console.log(response);
          this.spouseData = response.anwSubjects;
        },
        (err: HttpErrorResponse) =>{
          console.log(err);
        });
  }
  openRegForm(data)
  {
      console.log(data);
      this.selectedanwname = data.firstName;
      this.selectedsubjectId= data.uniqueSubjectId;
      this.selectedrchId = data.rchId;
      this.selectedMobile=data.contactNo;
      this.selectedgender = 'Male';
      $('#fadeinModal').modal('show');
  }
  getDistrictData(){
    this.masterService.getuserBasedDistrict()
    .subscribe(response => {
      this.districts = response['district'];
      this.selectedDistrict = this.user.districtId;
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
      this.selectedchc = this.user.chcId;
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
      this.selectedphc = this.user.phcId;
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
      this.selectedsc = this.user.scId;
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
      this.selectedripoint = this.user.riId != "" ? this.user.riId.split(',')[0] : "";
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
    console.log(this.firstFormGroup.valid);
      /*if(this.firstFormGroup.valid)
        this.stepper.next();*/
        this.stepper.next();
    }

    prevStep() {
      this.stepper.previous();
      }

    formSubmit()
    {
      this.secondFormCheck = true;
      console.log(this.secondFormGroup.valid);
      console.log(this.firstFormGroup.valid);
      console.log(this.dataBindinginServce());

      if(this.secondFormGroup.valid && this.firstFormGroup.valid)
      {
        var apiUrl = this.genericService.buildApiUrl(ENDPOINT.SUBJECT.ADD);
        this.httpClientService.post<any>({url:apiUrl, body: this.dataBindinginServce() }).subscribe(response => {
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
        });
      }
    }

    dataBindinginServce()
    {
      var _obj = {
        "subjectPrimaryRequest": {
          "subjectTypeId": 2,
          "childSubjectTypeId": 2,
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
          "assignANMId": this.user.id,
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
