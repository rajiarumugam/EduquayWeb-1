import { Component, OnInit, Pipe, NgZone, ViewChild,Output, EventEmitter } from '@angular/core';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { DistrictResponse, District } from 'src/app/shared/master/district/district.model';
import { HttpErrorResponse } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { HttpClientService } from '../../../http-client.service';
import { ENDPOINT } from '../../../../app.constant';
import { GenericService } from '../../../generic.service';
declare var $: any 
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { SpouseregistrationService } from 'src/app/shared/anm-module/registration/spouse/spouseregistration.service';
import { PositiveSpouseResponse, positiveSubject } from 'src/app/shared/anm-module/registration/spouse/spouseregistration.models';
import { TokenService } from 'src/app/shared/token.service';


@Component({
  selector: 'app-anm-spouse',
  templateUrl: './anm-spouse.component.html',
  styleUrls: ['./anm-spouse.component.css']
})
export class AnmSpouseComponent implements OnInit {

  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  @ViewChild('dorPicker', { static: false }) DORPicker;
  @ViewChild('dobPicker', { static: false }) DOBPicker;

  @Output() spouseReg: EventEmitter<any> = new EventEmitter<any>();
  positiveSpouseResponse: PositiveSpouseResponse;
  districts: District[] = [];
  errorMessage: string;
  errorSpouseMessage: string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  dateform:FormGroup;
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
  DAY = 86400000;
  GPLADATA = [{id:'00',value:'0'},{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'},{id:'10',value:'10'}];
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
    maxDate: new Date(Date.now()),
  };

  startOptions2: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: '',
    maxDate: new Date(Date.now())
  };
  user;
  createdSubjectId="";
  
  selectedSpouseData;

  spouseData: positiveSubject[] = [];
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
  selectedstate= 1;
  selectedPincode;
  selectedECNumber;
  selectedcity;
  statelist = [];
  DOBSelected = false;

  constructor(
    private masterService: masterService, 
    zone: NgZone,
    private _formBuilder: FormBuilder,
    private httpClientService:HttpClientService,
    private spouseregistrationService: SpouseregistrationService,
    private genericService: GenericService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private router: Router
    ) { }

  ngOnInit() {
    
    
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    
    this.dateform = this._formBuilder.group({
      fromDate: [''],
      toDate: ['']
    });
    this.firstFormGroup = this._formBuilder.group({
      anwname:['', Validators.required],
      subjectId:['', Validators.required],
      rchId: ['', Validators.required],
      dor: ['', Validators.required],
      district: ['', Validators.required],
      chc: ['', Validators.required],
      phc: ['', Validators.required],
      sc: ['', Validators.required],
      ripoint: ['', Validators.required],
      contactNumber: [''],
      gender: ['', Validators.required],
      /*pincode: ['', Validators.required],
      ,*/
      subjectitle: ['Mr.'],
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: ['', Validators.required],
      dob: [''],
      age: ['', [Validators.required,Validators.min(18), Validators.max(99)]],
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
      state: [''],
      spouseContactNumber: ['', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
      spouseEmail: ['',Validators.email],
      pincode:['',[Validators.required,Validators.min(100000), Validators.max(999999)]]
    });

    this.spouseData = [];
    var positiveSpouseResponse = this.route.snapshot.data.positiveSubjects;
    if(this.positiveSpouseResponse !== undefined && this.positiveSpouseResponse.status.toString() === "true"){
      this.spouseData = positiveSpouseResponse.anwSubjects;
    }
    else{
      this.errorMessage = positiveSpouseResponse.message;
    }
  }

  initSpousereg(data) {
    console.log(data);
    /*this.firstFormGroup.reset();
    this.secondFormGroup.reset();*/
    this.stepper.selectedIndex = 0;
    this.selectedage = "";
    this.selectedspouseEmail = "";
    this.selectedECNumber = "";
    this.selectedSpouseData = data;
    console.log(this.selectedSpouseData);
    this.getDistrictData();
    this.getCHC();
    this.getPHC();
    this.getSC();
    this.getRI();
    this.getReligion();
    this.getCaste();
    //this.getCommunity(0);
    this.getGovernmentIDType();
    this.getState();

    this.selecteddor = new Date(Date.now());
    this.selectedanwname = data.firstName;
    this.selectedsubjectId = data.uniqueSubjectId;
    this.selectedrchId = data.rchId;
    this.selectedMobile = data.contactNo;
    this.selectedgender = 'Male';
    this.selectedDistrict = data.districtId;
    this.selectedchc = data.chcId;
    this.selectedphc = data.phcId;
    this.selectedsc = data.scId;
    this.selectedripoint = data.riId;
    this.selectedreligion = data.religionId;
    this.selectedcaste = data.casteId;
    this.getCommunity(this.selectedcaste);
    this.selectedcommunity = data.communityId;
    this.selectedfirstname = data.spouseFirstName;
    this.selectedmiddlename = data.spouseMiddleName;
    this.selectedlastname = data.spouseLastName;
    this.selectedspouseContactNumber = data.spouseContactNo;
    this.selectedhouse = data.address1;
    this.selectedstreet = data.address2;
    this.selectedcity = data.address3;
    //this.selectedstate = this.statelist.filter(t=>t.data.stateName ===this.selectedstate);
    this.selectedPincode = data.pincode;
    this.selectedECNumber = data.ecNumber;
    //this.selectedspouseEmail = data.ecNumber;

    this.DORPicker.flatpickr.setDate(new Date(Date.now()- (this.DAY*0.025)));
    this.DOBPicker.flatpickr.setDate("");


    $('#fadeinModal').modal('show');
  }

  getDistrictData(){
    this.masterService.getuserBasedDistrict()
    .subscribe(response => {
      this.districts = response['district'];
    },
    (err: HttpErrorResponse) =>{
      this.districts = [];
      this.errorMessage = err.toString();
    });
  }
  getCHC(){
    this.masterService.getuserBasedCHC()
    .subscribe(response => {
      this.CHCdata = response['chc'];
    },
    (err: HttpErrorResponse) =>{
      this.CHCdata = [];
      this.errorMessage = err.toString();
    });
  }
  getPHC(){
    this.masterService.getuserBasedPHC()
    .subscribe(response => {
      this.PHCdata = response['phc'];
    },
    (err: HttpErrorResponse) =>{
      this.PHCdata = [];
      this.errorMessage = err.toString();
    });
  }

  getSC(){
    this.masterService.getuserBasedSC()
    .subscribe(response => {
      this.SCdata = response['sc'];
      if((this.selectedsc === "" || this.SCdata.findIndex(i => i.id === this.selectedsc) == -1))
      {
          if(this.SCdata[0] != undefined)
              setTimeout(() => {
                this.selectedsc = this.SCdata[0].id;
              }, 1);  
      }  
    },
    (err: HttpErrorResponse) =>{
      this.SCdata = [];
      this.errorMessage = err.toString();
    });
  }
  getRI(){
    this.masterService.getuserBasedRI()
    .subscribe(response => {
      this.RIdata = response['ri'];
      if((this.selectedripoint === "" || this.RIdata.findIndex(i => i.id === this.selectedripoint) == -1))
      {
          if(this.RIdata[0] != undefined)
              setTimeout(() => {
                this.selectedripoint = this.RIdata[0].id;
              }, 1);  
      }  
    },
    (err: HttpErrorResponse) =>{
      this.RIdata = [];
      this.errorMessage = err.toString();
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
      this.errorMessage = err.toString();
    });
  }

  getCaste(){
    this.masterService.getCaste()
    .subscribe(response => {
      this.casteData = response['caste'];
      /*if(this.casteData[0])
          this.selectedcaste = this.casteData[0].id;*/
    },
    (err: HttpErrorResponse) =>{
      this.casteData = [];
      this.errorMessage = err.toString();
    });
  }

  getCommunity(id){
    if(id === 0)
    {
        this.masterService.getCommunity()
        .subscribe(response => {
          this.communityData = response['community'];
          /*if(this.communityData[0])
              this.selectedcommunity = this.communityData[0].id;*/
        },
        (err: HttpErrorResponse) =>{
          this.communityData = [];
          this.errorMessage = err.toString();
        });
    }
    else{
      this.masterService.getCommunityPerCaste(id)
        .subscribe(response => {
          this.communityData = response['community'];
          /*if(this.communityData[0])
              this.selectedcommunity = this.communityData[0].id;*/
        },
        (err: HttpErrorResponse) =>{
          this.communityData = [];
          this.errorMessage = err.toString();
        });
    }
    
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
      this.errorMessage = err.toString();
    });
  }
  getGovernmentIDType(){
    this.masterService.getGovernmentTypeId()
    .subscribe(response => {
      this.governmentIDData = response['govIdType'];
    },
    (err: HttpErrorResponse) =>{
      this.governmentIDData = [];
      this.errorMessage = err.toString();
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
     this.DOBSelected = true;
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
       // this.stepper.next();
    }

    prevStep() {
      this.stepper.previous();
      }

    formSubmit()
    {
      this.secondFormCheck = true;
      var _tempStateSelected = this.statelist.filter(t=>t.id ===this.selectedstate);
      if(this.secondFormGroup.valid && this.firstFormGroup.valid && _tempStateSelected.length > 0)
      {
        var apiUrl = this.genericService.buildApiUrl(ENDPOINT.SUBJECT.ADD);
        this.httpClientService.post<any>({url:apiUrl, body: this.dataBindinginServce() }).subscribe(response => {
          this.createdSubjectId = response.uniqueSubjectId;

          Swal.fire({icon:'success', title: 'Subject ID is '+this.createdSubjectId,
    showCancelButton: true, confirmButtonText: 'Collect sample now', cancelButtonText: 'Collect sample later' })
       .then((result) => {
         if (result.value) {
          $('#fadeinModal').modal('hide');
          this.router.navigateByUrl(`app/anm-sample-collection?sid=${this.createdSubjectId}`);
         
         }
         else{
          this.firstFormGroup.reset();
          this.secondFormGroup.reset();
          this.secondFormCheck = false;
          this.firstFormCheck = false;
          this.stepper.selectedIndex = 0;
          $('#fadeinModal').modal('hide');
          this.spouseReg.emit();

         }
       });
          //$('#fadeinModal').modal('show');
          
        },
        (err: HttpErrorResponse) =>{
          console.log(err);
          this.errorSpouseMessage = err.toString();
        });
      }
    }

    dataBindinginServce()
    {
      var _tempStateSelected = this.statelist.filter(t=>t.id ===this.selectedstate);
      console.log(_tempStateSelected);
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
          "govIdTypeId": this.secondFormGroup.get('govtIDType').value != undefined ? Number(this.secondFormGroup.get('govtIDType').value) : 0,
          "govIdDetail": this.secondFormGroup.get('GovtIDDetail').value != undefined ? this.secondFormGroup.get('GovtIDDetail').value : '',
          "spouseSubjectId": this.selectedSpouseData.uniqueSubjectId,
          "spouseFirstName": this.selectedSpouseData.firstName,
          "spouseMiddleName": this.selectedSpouseData.middleName,
          "spouseLastName": this.selectedSpouseData.lastName,
          "spouseContactNo": this.selectedSpouseData.contactNo,
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
  
    ageEntered()
    {
      if(!this.DOBSelected)
          this.DOBPicker.flatpickr.setDate("");
      this.DOBSelected = false;
    }
  
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      
    }
}
