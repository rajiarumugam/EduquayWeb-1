import { Component, OnInit,ViewChild } from '@angular/core';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { DistrictResponse, District } from 'src/app/shared/master/district/district.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { HttpClientService } from '../../../../shared/http-client.service';
import { ENDPOINT } from '../../../../app.constant';
import { GenericService } from '../../../../shared/generic.service';
declare var $: any 
import Swal from 'sweetalert2';
import { TokenService } from 'src/app/shared/token.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'chc-walkin-registration',
  templateUrl: './walk-in-registration.component.html',
  styleUrls: ['./walk-in-registration.component.css']
})
export class ChcwalkinRegistrationComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild('dorPicker', { static: false }) DORPicker;
  @ViewChild('dobPicker', { static: false }) DOBPicker;
  DAY = 86400000;
  districts: District[] = [];
  erroMessage: string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  firstFormCheck = false;
  secondFormCheck = false;
  thirdFormCheck = false;
  selectedDistrict = null;
  selectedgender = "Male";
  selectedchc = null;
  selectedphc = null;
  selectedripoint = null;
  selectedsc = null;
  selectedmothergovtIDType = null;
  selectedreligion = null;
  selectedcaste = null;
  selectedcommunity = null;
  selectedfathergovtIDType = null;
  selectedguardiangovtIDType = null;
  selectedsubjectTitle = "Mr"
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
  selectedEmail;
  GENDERDATA = ["Male","Female","Others"];
  sectionArray = ['PRE KG','LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12'];
  subjectTitleArray = ["Mr","Ms"];
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
    maxDate: new Date(Date.now())
  };

  selectedgovtIDType = null;
  selectedGovtIDDetail;
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
  selectedSpouseFirstName;
  selectedSpouseMiddleName;
  selectedSpouseLastName;
  selectedSpouseContactNo;
  selectedECNumber;


  createdSubjectId;
  user;
  selectedAssociatedANMID;
  associatedCount = 0;
  associatedANMData = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  selectedassociatedANM;
  selectedTestingchc = null;
  statelist = [];
  constructor(private masterService: masterService, private _formBuilder: FormBuilder,private httpClientService:HttpClientService,private genericService: GenericService,private tokenService: TokenService) { }

  ngOnInit() {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    /*phc: ['', Validators.required], */
    this.firstFormGroup = this._formBuilder.group({
      dor: ['', Validators.required],
      district: ['', Validators.required],
      chc: ['', Validators.required],
      sc: ['', Validators.required],
      ripoint: ['', Validators.required],
      subjectitle: ['', Validators.required],
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: ['', Validators.required],
      dob: [''],
      age: ['', [Validators.required,Validators.min(18), Validators.max(99)]],
      gender: ['', Validators.required],
      testingchc: ['', Validators.required]
   });
    this.secondFormGroup = this._formBuilder.group({
   
      religion: ['', Validators.required],
      caste: ['', Validators.required],
      community: ['', Validators.required],
      contactNumber: ['', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
      Email:['',Validators.email],
      house: ['', Validators.required],
      street: ['', Validators.required],
      city : ['', Validators.required],
      state: [''],
      pincode: ['', [Validators.required,Validators.min(100000), Validators.max(999999)]],
      govtIDDetail: [''],
      govtIDType: [''],
      maritalStatus: ['true'],
      selectedSpouseFirstName: ['', Validators.required],
      spouseMiddleName: [''],
      spouseLastName:['', Validators.required],
      spouseContact:['', Validators.required],
      ECNumber:['']
    });

    this.thirdFormGroup = this._formBuilder.group({
   
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

    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
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
      }   
    };
    this.getDistrictData();
    this.getCHC();
    this.getPHC();
    //this.getSC();
    //this.getRI();
    this.getReligion();
    this.getCaste();
    //this.getCommunity(0);
    this.getGovernmentIDType();
    this.getState();
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
      /*if(this.religionData[0])
          this.selectedreligion = this.religionData[0].id;*/
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
      /*if(this.casteData[0])
      this.selectedcaste = this.casteData[0].id;*/
    },
    (err: HttpErrorResponse) =>{
      this.casteData = [];
      this.erroMessage = err.toString();
    });
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
          this.erroMessage = err.toString();
        });
    }
    else{
      this.masterService.getCommunityPerCaste(id)
        .subscribe(response => {
          this.communityData = response['community'];
         /* if(this.communityData[0])
            this.selectedcommunity = this.communityData[0].id;*/
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

  getANMDetails()
  {
      this.masterService.getAssociatedANM(this.selectedchc)
    .subscribe(response => {
    console.log(response);
    this.associatedANMData = response.associatedANMDetail;
    if(this.associatedCount === 0)
        this.dtTrigger.next();
    else
        this.rerender();
    this.associatedCount++;
    $('#fadeinModal').modal('show');
    },
    (err: HttpErrorResponse) =>{
    });
  }
  associatedClick(i)
  {
      console.log(i);
      this.selectedAssociatedANMID = i;
      this.selectedassociatedANM = this.associatedANMData[i].anmName;
      this.selectedsc = this.associatedANMData[i].scName;
      this.selectedripoint = this.associatedANMData[i].riPoint;
      this.selectedTestingchc = this.associatedANMData[i].testingCHCId;

      Swal.fire({
        title: 'Are you sure?',
        text: "Confirm Associated ANM is "+this.associatedANMData[i].anmName,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#ffffff'
      }).then((result) => {
        if (result.value) {
          $('#fadeinModal').modal('hide');
         }
         else{
          this.associatedANMData[i].click = undefined;
          $('#fadeinModal').modal('show');
         }
        })
    
    }

    prevStep() {
      this.stepper.previous();
      }

      formSubmit()
    {
        this.thirdFormCheck = true;
        console.log(this.thirdFormGroup.valid);
        console.log(this.secondFormGroup.valid);
        console.log(this.firstFormGroup.valid);
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
               
               }
               else{
                this.firstFormGroup.reset();
                this.secondFormGroup.reset();
                this.thirdFormGroup.reset();
                this.secondFormCheck = false;
                this.firstFormCheck = false;
                this.stepper.selectedIndex = 0;
                this.prePopulateFormDetails();
               }
             });
            },
            (err: HttpErrorResponse) =>{
              console.log(err);
            });
          }
        
        console.log(this.dataBindinginServce());
    }

    prePopulateFormDetails()
    {
      setTimeout(()=>{    
          this.selectedDistrict = this.user.districtId;
          this.selectedchc = this.user.chcId;
          this.selectedphc = this.user.phcId;
          this.selectedsc = "";
          this.communityData = [];
          this.selectedassociatedANM = "";
          this.selectedsubjectTitle = "Mr"
          this.selectedgender = "Male"
          this.selectedripoint = "";
          /*if(this.religionData[0])
            this.selectedreligion = this.religionData[0].id;
          if(this.casteData[0])
            this.selectedcaste = this.casteData[0].id;
          if(this.communityData[0])
            this.selectedcommunity = this.communityData[0].id;*/


          this.selecteddor = new Date(Date.now());
          this.selecteddob = "";
      
          this.DORPicker.flatpickr.setDate(new Date(Date.now()- (this.DAY*0.00025)));
          this.DOBPicker.flatpickr.setDate("");
        }, 100);
    }
    dataBindinginServce()
    {
      var _tempStateSelected = this.statelist.filter(t=>t.id ===this.selectedstate);
      console.log(this.secondFormGroup.get('maritalStatus').value);
      var _obj = {
        "subjectPrimaryRequest": {
          "subjectTypeId": 4,
          "childSubjectTypeId": 4,
          "uniqueSubjectId": "",
          "districtId": this.firstFormGroup.get('district').value != undefined ? Number(this.firstFormGroup.get('district').value) : 0,
          "chcId": Number(this.associatedANMData[this.selectedAssociatedANMID].testingCHCId),
          "phcId": Number(this.associatedANMData[this.selectedAssociatedANMID].phcId),
          "scId": Number(this.associatedANMData[this.selectedAssociatedANMID].scId),
          "riId": Number(this.associatedANMData[this.selectedAssociatedANMID].riId),
          "subjectTitle": this.firstFormGroup.get('subjectitle').value,
          "firstName": this.firstFormGroup.get('firstname').value,
          "middleName": this.firstFormGroup.get('middlename').value != undefined ? this.firstFormGroup.get('middlename').value : '',
          "lastName": this.firstFormGroup.get('lastname').value,
          "dob": this.firstFormGroup.get('dob').value != undefined ? moment(new Date(this.firstFormGroup.get('dob').value)).format("DD/MM/YYYY") : '',
          "age": Number(this.firstFormGroup.get('age').value),
          "gender": this.firstFormGroup.get('gender').value,
          "maritalStatus": this.secondFormGroup.get('maritalStatus').value != undefined ? this.secondFormGroup.get('maritalStatus').value != undefined : false,
          "mobileNo": ""+this.secondFormGroup.get('contactNumber').value,
          "emailId": "",
          "govIdTypeId": 0,
          "govIdDetail": "",
          "spouseSubjectId": "",
          "spouseFirstName": this.secondFormGroup.get('spouseFirstName').value != undefined ? this.secondFormGroup.get('spouseFirstName').value : '',
          "spouseMiddleName": this.secondFormGroup.get('spouseMiddleName').value != undefined ? this.secondFormGroup.get('spouseMiddleName').value : '',
          "spouseLastName": this.secondFormGroup.get('spouseLastName').value != undefined ? this.secondFormGroup.get('spouseLastName').value : "",
          "spouseContactNo": this.secondFormGroup.get('spouseContactNumber').value != undefined ? ""+this.secondFormGroup.get('spouseContactNumber').value : "",
          "spouseGovIdTypeId": 0,
          "spouseGovIdDetail": "",
          "assignANMId": Number(this.associatedANMData[this.selectedAssociatedANMID].associatedANMId),
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
          "rchId": '0',
          "ecNumber": this.secondFormGroup.get('ECNumber').value != undefined ? this.secondFormGroup.get('ECNumber').value != undefined : "",
          "lmpDate": "",
          "g": 0,
          "p": 0,
          "l": 0,
          "a": 0,
          "updatedBy": Number(this.user.id)
        },
        "subjectParentRequest": {
          "motherFirstName": this.thirdFormGroup.get('motherFirstName').value != undefined ? this.thirdFormGroup.get('motherFirstName').value : '',
          "motherMiddleName": this.thirdFormGroup.get('motherMiddleName').value != undefined ? this.thirdFormGroup.get('motherMiddleName').value : '',
          "motherLastName": this.thirdFormGroup.get('motherLastName').value != undefined ? this.thirdFormGroup.get('motherLastName').value : '',
          "motherGovIdTypeId": this.thirdFormGroup.get('mothergovtIDType').value != undefined ? Number(this.thirdFormGroup.get('mothergovtIDType').value) : 0,
          "motherGovIdDetail": this.thirdFormGroup.get('motherGovtIDDetail').value != undefined ? this.thirdFormGroup.get('motherGovtIDDetail').value : '',
          "motherContactNo": this.thirdFormGroup.get('motherContactNumber').value != undefined ? ""+this.thirdFormGroup.get('motherContactNumber').value : '',
          "fatherFirstName": this.thirdFormGroup.get('fatherFirstName').value != undefined ? this.thirdFormGroup.get('fatherFirstName').value : '',
          "fatherMiddleName": this.thirdFormGroup.get('fatherMiddleName').value != undefined ? this.thirdFormGroup.get('fatherMiddleName').value : '',
          "fatherLastName": this.thirdFormGroup.get('fatherLastName').value != undefined ? this.thirdFormGroup.get('fatherLastName').value : '',
          "fatherGovIdTypeId": this.thirdFormGroup.get('fathergovtIDType').value != undefined ? Number(this.thirdFormGroup.get('fathergovtIDType').value) : 0,
          "fatherGovIdDetail": this.thirdFormGroup.get('fatherGovtIDDetail').value != undefined ? this.thirdFormGroup.get('fatherGovtIDDetail').value : '',
          "fatherContactNo": this.thirdFormGroup.get('fatherContactNumber').value != undefined ? ""+this.thirdFormGroup.get('fatherContactNumber').value : '',
          "gaurdianFirstName": this.thirdFormGroup.get('guardianFirstName').value != undefined ? this.thirdFormGroup.get('guardianFirstName').value : '',
          "gaurdianMiddleName": this.thirdFormGroup.get('guardianMiddleName').value != undefined ? this.thirdFormGroup.get('guardianMiddleName').value : '',
          "gaurdianLastName": this.thirdFormGroup.get('guardianLastName').value != undefined ? this.thirdFormGroup.get('guardianLastName').value : '',
          "gaurdianGovIdTypeId": this.thirdFormGroup.get('guardiangovtIDType').value != undefined ? Number(this.thirdFormGroup.get('guardiangovtIDType').value) : 0,
          "gaurdianGovIdDetail": this.thirdFormGroup.get('guardianGovtIDDetail').value != undefined ? this.thirdFormGroup.get('guardianGovtIDDetail').value : '',
          "gaurdianContactNo": this.thirdFormGroup.get('guardianContactNumber').value != undefined ? ""+this.thirdFormGroup.get('guardianContactNumber').value : '',

          "rbskId": "",
          "schoolName": '',
          "schoolAddress1": '',
          "schoolAddress2": '',
          "schoolAddress3": '',
          "schoolPincode": '',
          "schoolCity": '',
          "schoolState": '',
          "standard": '',
          "section": '',
          "rollNo": '',
          "updatedBy": Number(this.user.id)
        }
      };

      return _obj;
    }

    titleChange()
    {
        if(this.selectedsubjectTitle === "Mr")
        {
            this.selectedgender = "Male"
        }
        else if(this.selectedsubjectTitle === "Ms")
        {
            this.selectedgender = "Female"
        }
    }

    rerender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first      
        dtInstance.clear();
        dtInstance.destroy();
        // Call the dtTrigger to rerender again       
        this.dtTrigger.next();
      });
    }   
    ageEntered()
    {
      this.DOBPicker.flatpickr.setDate("");
    }
    ecNumberChange()
    {
      if(this.selectedECNumber)
      {
        if(this.selectedECNumber.length > 0)
        {   const validators = [ Validators.required,Validators.min(100000000000), Validators.max(9999999999999999)];
            this.secondFormGroup.addControl('ECNumber', new FormControl('', validators));
        }
      }
       
    }
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }


}
