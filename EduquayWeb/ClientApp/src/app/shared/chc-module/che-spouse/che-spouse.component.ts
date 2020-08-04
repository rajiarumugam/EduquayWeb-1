import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { District } from 'src/app/shared/master/district/district.model';
import { HttpErrorResponse } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { HttpClientService } from '../../http-client.service';
import { ENDPOINT } from '../../../app.constant';
import { GenericService } from '../../generic.service';
declare var $: any 
import Swal from 'sweetalert2';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'che-spouse',
  templateUrl: './che-spouse.component.html',
  styleUrls: ['./che-spouse.component.css']
})
export class CheSpouseComponent implements OnInit {

  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild('dorPicker', { static: false }) DORPicker;
  @ViewChild('dobPicker', { static: false }) DOBPicker;
  DAY = 86400000;
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
    defaultDate: "",
    maxDate: ""
  };
  startOptionsDOR: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: new Date(Date.now()),
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

  selectedAssociatedANM;
  associatedCount = 0;
  associatedANMData = [];
  selectedassociatedANM;
  selectedTestingchc = null;
  statelist = [];

  openAssociatedANM = false;

  constructor(private masterService: masterService, zone: NgZone,private _formBuilder: FormBuilder,private httpClientService:HttpClientService,private genericService: GenericService,private tokenService: TokenService) { }

  ngOnInit() {
    
    this.user = JSON.parse(this.tokenService.getUser('lu'));

    /*
    phc: ['', Validators.required],
      
      
    */
    this.firstFormGroup = this._formBuilder.group({
      anwname:['', Validators.required],
      subjectId:['', Validators.required],
      rchId: ['', Validators.required],
      dor: ['', Validators.required],
      district: ['', Validators.required],
      chc: ['', Validators.required],
      sc: ['', Validators.required],
      contactNumber: [''],
      gender: ['', Validators.required],
      ripoint: ['', Validators.required],
      testingchc:['', Validators.required],
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
      spouseEmail: [''],
      pincode:['', Validators.required],
      ECNumber:[""]
    });  
    
    this.getDistrictData();
    this.getCHC();
    //this.getPHC();
    //this.getSC();
    this.getRI();
    this.getReligion();
    this.getCaste();
    //this.getCommunity(0);
    this.getGovernmentIDType();
    this.getState();
  }

  initSpousereg(data)
  {
      console.log(data);
      this.selectedanwname = data.firstName;
      this.selectedsubjectId= data.uniqueSubjectId;
      this.selectedrchId = data.rchId;
      this.selectedMobile=data.contactNo;
      this.selectedgender = 'Male';
      this.selectedfirstname = data.spouseFirstName;
      this.selectedmiddlename = data.spouseMiddleName;
      this.selectedlastname = data.spouseLastName;
      this.selectedPincode = data.pincode;
      this.selectedstate = data.stateName;
      this.selectedcity = data.address3;
      this.selectedstreet = data.address2;
      this.selectedhouse = data.address1;

      $('#fadeinModal').modal('show');
  }
  openRegForm(data)
  {
      console.log(data);
      this.selectedanwname = data.firstName;
      this.selectedsubjectId= data.uniqueSubjectId;
      this.selectedrchId = data.rchId;
      this.selectedMobile=data.contactNo;
      this.selectedgender = 'Male';
      this.selectedfirstname = data.spouseFirstName;
      this.selectedmiddlename = data.spouseMiddleName;
      this.selectedlastname = data.spouseLastName;
      this.selectedPincode = data.pincode;
      this.selectedstate = data.stateName;
      this.selectedcity = data.address3;
      this.selectedstreet = data.address2;
      this.selectedhouse = data.address1;

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
      if(this.religionData[0])
          this.selectedreligion = this.religionData[0].id;
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
      if(this.casteData[0])
          this.selectedcaste = this.casteData[0].id;
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
          if(this.communityData[0])
            this.selectedcommunity = this.communityData[0].id;
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
          if(this.communityData[0])
            this.selectedcommunity = this.communityData[0].id;
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
  getState()
  {
    this.masterService.getState()
    .subscribe(response => {
      console.log(response);
      this.statelist = response['states'];
      this.statelist.forEach(function(val,index){
        val.display = val.stateName;
      });
      
    },
    (err: HttpErrorResponse) =>{
      this.casteData = [];
      this.erroMessage = err.toString();
    });
  }

  nextStep() {
    this.firstFormCheck = true;
    console.log(this.firstFormGroup.valid);
      if(this.firstFormGroup.valid)
        this.stepper.next();
        //this.stepper.next();
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
          this.prePopulateFormDetails();
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

    prePopulateFormDetails()
    {
      setTimeout(()=>{    
          this.selectedDistrict = this.user.districtId;
          this.selectedchc = this.user.chcId;
          this.selectedphc = this.user.phcId;
          this.selectedsc = this.user.scId;
          this.communityData = [];
          this.selectedripoint = "";
       
          if(this.religionData[0])
            this.selectedreligion = this.religionData[0].id;
          if(this.casteData[0])
            this.selectedcaste = this.casteData[0].id;
          if(this.communityData[0])
            this.selectedcommunity = this.communityData[0].id;


          this.selecteddor = new Date(Date.now());
      
          this.DORPicker.flatpickr.setDate(new Date(Date.now()- (this.DAY*0.00025)));
          this.DOBPicker.flatpickr.setDate("");
        }, 100);
    }
    dataBindinginServce()
    {
      var _tempStateSelected = this.statelist.filter(t=>t.id ===this.selectedstate);
      var _obj = {
        "subjectPrimaryRequest": {
          "subjectTypeId": 4,
          "childSubjectTypeId": 2,
          "uniqueSubjectId": "",
          "districtId": this.firstFormGroup.get('district').value != undefined ? Number(this.firstFormGroup.get('district').value) : 0,
          "chcId": Number(this.selectedAssociatedANM.testingCHCId),
          "phcId": Number(this.selectedAssociatedANM.phcId),
          "scId": Number(this.selectedAssociatedANM.scId),
          "riId": Number(this.selectedAssociatedANM.riId),
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
          "govIdTypeId": this.secondFormGroup.get('govtIDType').value != undefined ? Number(this.secondFormGroup.get('govtIDType').value) : 0,
          "govIdDetail": this.secondFormGroup.get('GovtIDDetail').value != undefined ? this.secondFormGroup.get('GovtIDDetail').value : '',
          "spouseSubjectId": "",
          "spouseFirstName": "",
          "spouseMiddleName": "",
          "spouseLastName": "",
          "spouseContactNo": "",
          "spouseGovIdTypeId": 0,
          "spouseGovIdDetail": "",
          "assignANMId": Number(this.selectedAssociatedANM.associatedANMId),
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
          "stateName": _tempStateSelected[0]['stateName'],
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

  associatedClick(event)
  {
    console.log(event);
      this.selectedAssociatedANM = event;
      this.selectedassociatedANM = this.selectedAssociatedANM.anmName;
      this.selectedsc = this.selectedAssociatedANM.scName;
      this.selectedripoint = this.selectedAssociatedANM.riPoint;
      this.selectedTestingchc = this.selectedAssociatedANM.testingCHCId;
    }
    ecNumberChange()
    {
      if(this.selectedECNumber)
      {
        if(this.selectedECNumber.length > 0)
        {   
          const validators = [ Validators.required,Validators.min(100000000000), Validators.max(9999999999999999)];
            this.secondFormGroup.addControl('ECNumber', new FormControl('', validators));
        }
      }  
    }
}
