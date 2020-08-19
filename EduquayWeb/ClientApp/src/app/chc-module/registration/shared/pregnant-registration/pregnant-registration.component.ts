import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { DistrictService } from 'src/app/shared/master/district/district.service';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { DistrictResponse, District } from 'src/app/shared/master/district/district.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { HttpClientService } from '../../../../shared/http-client.service';
import { ENDPOINT } from '../../../../app.constant';
import { GenericService } from '../../../../shared/generic.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
declare var $: any 
import { TokenService } from 'src/app/shared/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { LoaderService } from '../../../../shared/loader/loader.service';
import { DataService } from '../../../../shared/data.service';

declare var exposedFunction;


@Component({
  selector: 'chc-pregnant-registration',
  templateUrl: './pregnant-registration.component.html',
  styleUrls: ['./pregnant-registration.component.css']
})

export class ChcpregnantRegistrationComponent implements OnInit {
  //@ViewChild('f', { static: false }) subRegBasic: NgForm;
  @ViewChild('dorPicker', { static: false }) DORPicker;
  @ViewChild('dobPicker', { static: false }) DOBPicker;
  @ViewChild('lmpdatePicker', { static: false }) LMPPicker;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
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
  selectedsc = "";
  selectedgovtIDType = null;
  selectedreligion = null;
  selectedcaste = null;
  selectedcommunity = null;
  selectedTestingchc = null;
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
  selectedassociatedANM;
  Ldisabled = true;
  Pdisabled = true;
  Adisabled = true;
  GPLADATA = [{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'},{id:'10',value:'10'}];
  GPLAADATA = [{id:'0',value:'0'},{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'}];
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
  startOptionsLMP: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: "",
    minDate: "",
    maxDate: new Date(Date.now() - (this.DAY*30)),
  };
  selecteddor = new Date(Date.now());
  user;
  createdSubjectId="";

  selectedPincode;
  selectedMobile;
  selectedfirstname;
  selectedmiddlename;
  selectedlastname;
  selectedrchid;
  //selectedlmpdate = new Date(Date.now() - (this.DAY*30));
  selectedlmpdate;
  selectedECNumber;
  selectedGovtIDDetail;
  selectedhouse;
  selectedstreet;
  selectedcity;
  selectedstate;
  selectedspouseFirstName;
  selectedspouseMiddleName;
  selectedspouseLastName;
  selectedspouseContactNumber;
  selectedspouseEmail;
  ageValidate = false;

  selectedAssociatedANMID;
  associatedCount = 0;

  associatedANMData = [];

  statelist = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private masterService: masterService, zone: NgZone,private _formBuilder: FormBuilder,private httpClientService:HttpClientService,private genericService: GenericService,private tokenService: TokenService,private router: Router,private loaderService: LoaderService,private DataService:DataService) {
    window['angularComponentReference'] = {
      zone: zone,
      componentFn: (id, value) => this.callFromOutside(id, value),
      component: this,
    };
  }

  ngOnInit() {
    this.loaderService.display(false);
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

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
    
    /*----First form removed elements---- */
    /*
    phc: ['', Validators.required],
      
      
            dob: [''],
    */
    this.firstFormGroup = this._formBuilder.group({
      dor: ['', Validators.required],
      district: ['', Validators.required],
      chc: ['', Validators.required],
      contactNumber: ['', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
      subjectitle: ['Ms.'],
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: ['', Validators.required],
      dob: [''],
      age: ['', [Validators.required,Validators.min(18), Validators.max(99)]],
      rchid: ['', Validators.required],
      lmpdate: ['', Validators.required],
      g: ['', Validators.required],
      p: ['', Validators.required],
      l: ['', Validators.required],
      a: ['', Validators.required],
      ripoint: ['', Validators.required],
      sc: ['', Validators.required],
      testingchc: ['', Validators.required]
   });

    this.secondFormGroup = this._formBuilder.group({
      ECNumber: ['',[Validators.min(100000000000), Validators.max(9999999999999999)]],
      govtIDType: [''],
      GovtIDDetail: [''],
      religion: ['', Validators.required],
      caste: ['', Validators.required],
      community: ['', Validators.required],
      house: ['', Validators.required],
      street: ['', Validators.required],
      city : ['', Validators.required],
      state: [''],
      pincode: ['', [Validators.required,Validators.min(100000), Validators.max(999999)]],
      /*subjectTitle : ['Mr.'],*/
      spouseFirstName: ['', Validators.required],
      spouseMiddleName: [''],
      spouseLastName: ['', Validators.required],
      spouseContactNumber: ['', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
      spouseEmail: ['',Validators.email]
    });

    this.getDistrictData();
    this.getCHC();
    //this.getPHC();
    this.getSC();
    this.getRI();
    this.getReligion();
    this.getCaste();
    this.getState()
    //this.getCommunity(0);
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
      //this.selectedsc = this.user.scId;
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
      //this.selectedripoint = this.user.riId != "" ? this.user.riId.split(',')[0] : "";
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
      this.selectedstate = 1;
    },
    (err: HttpErrorResponse) =>{
      this.casteData = [];
      this.erroMessage = err.toString();
    });
  }
  getCommunity(id){
    this.communityData = [];
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
          /*if(this.communityData[0])
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
     var today = new Date();
     var birthDate = new Date(this.selecteddob);
     var age = today.getFullYear() - birthDate.getFullYear();
     var m = today.getMonth() - birthDate.getMonth();
     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
         age--;
     }
     console.log(age);
     this.ageValidate = true;
     this.selectedage = age;
     //return age;
  }
  casteChange()
  {
    this.getCommunity(this.selectedcaste);
  }

  getANMDetails()
  {
    this.loaderService.display(true);
      this.masterService.getAssociatedANM(this.selectedchc)
    .subscribe(response => {
    console.log(response);
    this.associatedANMData = response.associatedANMDetail;
    this.loaderService.display(false);
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
  nextStep() {
    this.firstFormCheck = true;
      if(this.firstFormGroup.valid)
      {
       
          this.stepper.next();
          var _obj = {'page':'pregnent','pagenumbr':this.stepper.selectedIndex}
          this.DataService.setdata({'chcCurrentPageCount':_obj});
      }
        

        //this.stepper.next();
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
        this.httpClientService.post<any>({url:apiUrl, body: this.dataBindinginServce() }).subscribe(response => {
          this.createdSubjectId = response.uniqueSubjectId;
          Swal.fire({icon:'success', title: 'Subject ID is '+this.createdSubjectId,
          showCancelButton: true, confirmButtonText: 'Collect sample now', cancelButtonText: 'Collect sample later' })
             .then((result) => {
               if (result.value) {
         
                $('#fadeinModal').modal('hide');
                this.router.navigateByUrl(`app/chc-sample-collection?sid=${this.createdSubjectId}`);
               }
               else{
                this.firstFormGroup.reset();
                this.secondFormGroup.reset();
                this.secondFormCheck = false;
                this.firstFormCheck = false;
                this.stepper.selectedIndex = 0;
                $('#fadeinModal').modal('hide');
                this.prePopulateFormDetails();
               }
             });
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
          this.selectedripoint = this.user.riId != "" ? this.user.riId.split(',')[0] : "";
          if(this.selectedripoint === "" && this.RIdata[0])
            this.selectedripoint = this.RIdata[0].id;
          /*if(this.religionData[0])
            this.selectedreligion = this.religionData[0].id;
          if(this.casteData[0])
            this.selectedcaste = this.casteData[0].id;
          if(this.communityData[0])
            this.selectedcommunity = this.communityData[0].id;*/


          //this.selecteddor = new Date(Date.now());
          //this.selectedlmpdate = new Date(Date.now() - (this.DAY*30));

          this.selecteddor = new Date(Date.now());
      
          this.DORPicker.flatpickr.setDate(new Date(Date.now()- (this.DAY*0.00025)));
          this.LMPPicker.flatpickr.setDate(new Date(Date.now()- (this.DAY*30.00025)));
          //this.DOBPicker.flatpickr.setDate("");
        }, 100);
    }
    dataBindinginServce()
    {
      var _tempStateSelected = this.statelist.filter(t=>t.id ===this.selectedstate);
      var _obj = {
        "subjectPrimaryRequest": {
          "subjectTypeId": 4,
          "childSubjectTypeId": 1,
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
          //"dob": this.secondFormGroup.get('dob').value != undefined ? moment(new Date(this.secondFormGroup.get('dob').value)).format("DD/MM/YYYY") : '',
          "dob": '',
          "age": Number(this.firstFormGroup.get('age').value),
          "gender": "Female",
          "maritalStatus": true,
          "mobileNo": ""+this.firstFormGroup.get('contactNumber').value,
          "emailId": this.secondFormGroup.get('spouseEmail').value != undefined ? this.secondFormGroup.get('spouseEmail').value : '',
          "govIdTypeId": this.secondFormGroup.get('govtIDType').value != undefined ? Number(this.secondFormGroup.get('govtIDType').value) : 0,
          "govIdDetail": this.secondFormGroup.get('GovtIDDetail').value != undefined ? this.secondFormGroup.get('GovtIDDetail').value : '',
          "spouseSubjectId": "",
          "spouseFirstName": this.secondFormGroup.get('spouseFirstName').value,
          "spouseMiddleName": this.secondFormGroup.get('spouseMiddleName').value != undefined ? this.secondFormGroup.get('spouseMiddleName').value : '',
          "spouseLastName": this.secondFormGroup.get('spouseLastName').value,
          "spouseContactNo": ""+this.secondFormGroup.get('spouseContactNumber').value,
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
          "rchId": '121'+this.firstFormGroup.get('rchid').value,
          "ecNumber": this.secondFormGroup.get('ECNumber').value,
          "lmpDate": moment(new Date(this.firstFormGroup.get('lmpdate').value)).format("DD/MM/YYYY"),
          "g": Number(this.firstFormGroup.get('g').value),
          "p": Number(this.firstFormGroup.get('p').value),
          "l": Number(this.firstFormGroup.get('l').value),
          "a": Number(this.firstFormGroup.get('a').value),
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
      /*this.selecteda = +this.selectedg - +this.selectedp;
      if(this.selecteda === 0)
      this.selecteda = "00";*/
      this.Ldisabled = false;
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

    rerender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first      
        dtInstance.clear();
        dtInstance.destroy();
        // Call the dtTrigger to rerender again       
        this.dtTrigger.next();
      });
    }  
    returnpageNo()
    {
        return this.stepper.selectedIndex;
    } 
    ageEntered()
    {
      if(!this.ageValidate)
          this.DOBPicker.flatpickr.setDate("");
  
      this.ageValidate = false;
    }
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }

}
