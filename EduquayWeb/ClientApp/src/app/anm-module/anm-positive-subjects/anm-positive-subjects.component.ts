import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/shared/utility/date.service';
import { TokenService } from 'src/app/shared/token.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { user } from 'src/app/shared/auth-response';
import { MatStepper } from '@angular/material/stepper';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
declare var $: any;
import { DistrictResponse, District } from 'src/app/shared/master/district/district.model';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { GenericService } from 'src/app/shared/generic.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anm-positive-subjects',
  templateUrl: './anm-positive-subjects.component.html',
  styleUrls: ['./anm-positive-subjects.component.css']
})
export class AnmPositiveSubjectsComponent implements AfterViewInit, OnDestroy, OnInit  {

  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  user: user;

  positiveSubjectErrorMessage: string;
  @ViewChild('startPicker1', { static: false }) pickerStart;
  @ViewChild('endPicker', { static: false }) pickerEnd;

  //positiveSpouseResponse: PositiveSpouseResponse;
  positiveSamplesErrorMessage: string;
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
  GPLADATA = [{id:'00',value:'0'},{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'}];
  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: new Date(Date.now()),
    maxDate: new Date(Date.now())
  };
  /*startOptions1: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: '',
    minDate: new Date(Date.now() - (this.DAY*365)),
    maxDate: new Date(Date.now())
  };*/
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
  //user;
  createdSubjectId="";
  

  //spouseData: positiveSubject[] = [];
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


  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private dateService: DateService,
    private tokenService: TokenService,
    private masterService: masterService,
    zone: NgZone,
    private _formBuilder: FormBuilder,
    private httpClientService:HttpClientService,
    private genericService: GenericService,
  ) { }

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
      } 
    };
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
      age: ['', [Validators.required,Validators.min(1), Validators.max(99)]],
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
      pincode:['', Validators.required]
    });

    // End Date Changes
    this.dateform.controls.toDate.valueChanges.subscribe(changes => {
      console.log('end: ', changes);
      if (!changes[0]) return;
      const selectedDate1 = changes[0].getTime();
      console.log(selectedDate1);
      const monthLaterDate = selectedDate1;
      this.pickerStart.flatpickr.set({
        maxDate: new Date(selectedDate1)
      });
      console.log(this.pickerStart.flatpickr);
    });

    // Start Date Changes
    this.dateform.controls.fromDate.valueChanges.subscribe(changes => {
      // console.log('start: ', changes);
      if (!changes[0]) return;
      const selectedDate = changes[0].getTime();
      const monthLaterDate = selectedDate + (this.DAY*30);
      // console.log(monthLaterDate > Date.now() ? new Date() : new Date(monthLaterDate));
      this.pickerEnd.flatpickr.set({
        minDate: new Date(selectedDate),
      });
      // this.pickerEnd.flatpickr.setDate(monthLaterDate > Date.now() ? new Date() : new Date(monthLaterDate));
      // console.log(this.pickerEnd.flatpickr);
    });

  }

  fromDateChange()
  {
      console.log(this.fromDate);
  }

  openpositiveSubject(some){}

  openpositiveSubjects(positiveSubjectsDetail){

    //console.log(data);
    this.getDistrictData();
    this.getCHC();
    this.getPHC();
    this.getSC();
    this.getRI();
    this.getReligion();
    this.getCaste();
    //this.getCommunity(0);
    this.getGovernmentIDType();

    // this.selectedanwname = data.firstName;
    // this.selectedsubjectId = data.uniqueSubjectId;
    // this.selectedrchId = data.rchId;
    // this.selectedMobile = data.contactNo;
    // this.selectedgender = 'Male';
    // this.selectedDistrict = data.districtId;
    // this.selectedchc = data.chcId;
    // this.selectedphc = data.phcId;
    // this.selectedsc = data.scId;
    // this.selectedripoint = data.riId;
    // this.selectedreligion = data.religionId;
    // this.selectedcaste = data.casteId;
    // this.getCommunity(this.selectedcaste);
    // this.selectedcommunity = data.communityId;
    // $('#fadeinModal').modal('show');

    this.modalService.open(
      positiveSubjectsDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      ariaLabelledBy: 'modal-basic-title'
    });

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
      if(this.casteData[0])
          this.selectedcaste = this.casteData[0].id;
    },
    (err: HttpErrorResponse) =>{
      this.casteData = [];
      this.errorMessage = err.toString();
    });
  }

  getCommunity(id){
    console.log(id);
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
          this.errorMessage = err.toString();
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
          this.errorMessage = err.toString();
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
     this.selectedage = age;
     //return age;
  }
  casteChange()
  {
    this.getCommunity(this.selectedcaste);
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

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }   

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  nextStep(stepper: MatStepper) {
    //this.firstFormCheck = true;
    //if(this.firstFormGroup.valid)
    this.firstFormCheck = true;
    if(this.firstFormGroup.valid)
    stepper.next();
  }

  prevStep(stepper: MatStepper) {
    stepper.previous();
  }


}
