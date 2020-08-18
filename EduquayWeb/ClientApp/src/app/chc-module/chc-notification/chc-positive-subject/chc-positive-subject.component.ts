import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, NgZone } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { user } from 'src/app/shared/auth-response';
import { ChcPositiveSubjectResponse, chcpositiveSubject } from 'src/app/shared/chc-module/chc-positive-subject/chc-positive-subject-response';
import { ChcPositiveSubjectRequest } from 'src/app/shared/chc-module/chc-positive-subject/chc-positive-subject-request';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { District } from 'src/app/shared/master/district/district.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChcPositiveSubjectService } from 'src/app/shared/chc-module/chc-positive-subject/chc-positive-subject.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/shared/utility/date.service';
import { TokenService } from 'src/app/shared/token.service';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { GenericService } from 'src/app/shared/generic.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ENDPOINT } from 'src/app/app.constant';
declare var $: any;
import * as moment from 'moment';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-chc-positive-subject',
  templateUrl: './chc-positive-subject.component.html',
  styleUrls: ['./chc-positive-subject.component.css']
})
export class ChcPositiveSubjectComponent implements AfterViewInit, OnDestroy, OnInit  {

  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  user: user;

  chcpositiveSubjectErrorMessage: string;
  positiveSubjectRequest: ChcPositiveSubjectRequest;
  positiveSubjectResponse: ChcPositiveSubjectResponse;
  @ViewChild('dorPicker', { static: false }) DORPicker;
  @ViewChild('dobPicker', { static: false }) DOBPicker;

  chcpositiveSubjectsList: chcpositiveSubject[]=[];
  positiveSamplesErrorMessage: string;
  districts: District[] = [];
  errorMessage: string;
  positiveSubjectInitResponse: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  firstFormCheck = false;
  secondFormCheck = false;
  selectedDistrict = 0;
  selecteda = null;
  selectedl = null;
  selectedp = null;
  selectedg = null;
  selectedchc = 0;
  selectedripoint = 0;
  selectedsc = null;
  selectedgovtIDType = 0;
  selectedreligion = 0;
  selectedcaste = 0;
  selectedcommunity = 0;
  selectedassociatedanm= 0;
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
  AssociatedAnm = [];
  selecteddob;
  selectedage;
  registerSpouse: number;
  selecteddor = new Date(Date.now());
  DAY = 86400000;
  GPLADATA = [{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'},{id:'10',value:'10'}];
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

  notifySamples: string;
 
  constructor(
    private ChcPositiveSubjectService: ChcPositiveSubjectService,
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
    private dataservice: DataService
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "CHC", "submodule": "Notifications", "page": "Positive Subjects"}));
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

  //   this.firstFormGroup = this._formBuilder.group({
  //     anwname:['', Validators.required],
  //     subjectId:['', Validators.required],
  //     rchId: ['', Validators.required],
  //     dor: ['', Validators.required],
  //     district: ['', Validators.required],
  //     chc: ['', Validators.required],
     
  //     contactNumber: [''],
  //     gender: ['', Validators.required],
     
  //     subjectitle: ['Mr.'],
  //     firstname: ['', Validators.required],
  //     middlename: [''],
  //     lastname: ['', Validators.required],
  //     dob: [''],
  //     age: ['', [Validators.required,Validators.min(1), Validators.max(99)]],
  //  });

  //   this.secondFormGroup = this._formBuilder.group({
  //     ECNumber: [''],
  //     govtIDType: [''],
  //     GovtIDDetail: [''],
  //     religion: ['', Validators.required],
  //     caste: ['', Validators.required],
  //     community: ['', Validators.required],
  //     house: ['', Validators.required],
  //     street: ['', Validators.required],
  //     city : ['', Validators.required],
  //     state: ['', Validators.required],
  //     spouseContactNumber: ['', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
  //     spouseEmail: ['',Validators.email],
  //     pincode:['', Validators.required],
  //     ripoint: ['', Validators.required],
  //     associatedanm: ['', Validators.required],
  //   });

    this.positiveSubjectInitResponse = this.route.snapshot.data.chcpositiveSubjectData;
    if (this.positiveSubjectInitResponse.status === 'false') {
      this.chcpositiveSubjectsList = [];
      if (this.positiveSubjectInitResponse.message !== null && this.positiveSubjectInitResponse.message.code === "ENOTFOUND") {
        this.chcpositiveSubjectErrorMessage = "Unable to connect to api source";
      }
      else if (this.positiveSubjectInitResponse.message !== null || this.positiveSubjectInitResponse.message == undefined) {
        this.chcpositiveSubjectErrorMessage = this.positiveSubjectInitResponse.message;
      }
    }
    else {
      
      if (this.positiveSubjectInitResponse.positiveSubjects!= null && this.positiveSubjectInitResponse.positiveSubjects.length > 0) {
        this.chcpositiveSubjectsList = this.positiveSubjectInitResponse.positiveSubjects;
      }
    }

  }

  getpositiveSubjectList(){
    this.chcpositiveSubjectsList = [];
    this.positiveSubjectRequest = {chcId: this.user.chcId,  registeredFrom: this.user.registeredFrom}
    let positiveSubject = this.ChcPositiveSubjectService.getChcPositiveSubject(this.positiveSubjectRequest)
    .subscribe(response => {
      this.positiveSubjectResponse = response;
      if (this.positiveSubjectResponse !== null && this.positiveSubjectResponse.status === "true") {
        if (this.positiveSubjectResponse.positiveSubjects.length <= 0) {
          this.chcpositiveSubjectErrorMessage = response.message;
        }
        else {
          this.chcpositiveSubjectsList = this.positiveSubjectResponse.positiveSubjects;
        }
      }
      else {
        this.chcpositiveSubjectErrorMessage = response.message;
      }
      this.rerender();
      this.loadDataTable = true;
    },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.chcpositiveSubjectErrorMessage = err.toString();
      });
    
  }

  // openpositiveSubjects(positiveSubjectsDetail, positiveSub: chcpositiveSubject){
  //   this.getDistrictData();
  //   this.getCHC();
  //   this.getRI();
  //   this.getReligion();
  //   this.getAssociatedAnm(this.user.chcId);
  //   this.getCaste();
  //   //this.getCommunity(0);
  //   this.getGovernmentIDType();

  //   this.selecteddor = new Date(Date.now());
  //   this.selectedanwname = positiveSub.subjectName;
  //   this.selectedsubjectId = positiveSub.uniqueSubjectId;
  //   this.selectedrchId = positiveSub.rchId;
  //   this.selectedMobile = positiveSub.contactNo;
  //   //this.selectedMobile = '9874587451';
  //   this.selectedgender = 'Male';
  //   this.selectedDistrict = positiveSub.districtId;
  //   this.selectedchc = positiveSub.chcId;
  //   // this.selectedphc = positiveSub.phcId;
  //   // this.selectedsc = positiveSub.scId;
  //   this.selectedripoint = positiveSub.riId;
  //   //this.selectedripoint = 1;
  //   this.selectedreligion = positiveSub.religionId;
  //   this.selectedcaste = positiveSub.casteId;
  //   this.getCommunity(this.selectedcaste);
  //   this.selectedcommunity = positiveSub.communityId;
  //   this.selectedfirstname = positiveSub.spouseFirstName;
  //   this.selectedmiddlename = positiveSub.spouseMiddleName;
  //   this.selectedlastname = positiveSub.spouseLastName;
  //   this.selectedspouseContactNumber = positiveSub.spouseContactNo;
  //   this.selectedhouse = positiveSub.address1;
  //   this.selectedstreet = positiveSub.address2;
  //   this.selectedcity = positiveSub.address3;
  //   this.selectedstate = positiveSub.stateName;
  //   this.selectedPincode = positiveSub.pincode;
  //   this.selectedECNumber = positiveSub.ecNumber;
  //   //this.selectedspouseEmail = data.ecNumber;

  //   // this.DORPicker.flatpickr.setDate(new Date(Date.now()- (this.DAY*0.025)));
  //   // this.DOBPicker.flatpickr.setDate("");


  //   // $('#fadeinModal').modal('show');
  //   this.modalService.open(
  //     positiveSubjectsDetail, {
  //     centered: true,
  //     size: 'xl',
  //     scrollable: true,
  //     ariaLabelledBy: 'modal-basic-title'
  //   });

  // }

  // getDistrictData(){
  //   this.masterService.getuserBasedDistrict()
  //   .subscribe(response => {
  //     this.districts = response['district'];
  //   },
  //   (err: HttpErrorResponse) =>{
  //     this.districts = [];
  //     this.errorMessage = err.toString();
  //   });
  // }
  // getCHC(){
  //   this.masterService.getuserBasedCHC()
  //   .subscribe(response => {
  //     this.CHCdata = response['chc'];
  //   },
  //   (err: HttpErrorResponse) =>{
  //     this.CHCdata = [];
  //     this.errorMessage = err.toString();
  //   });
  // }

  // getRI(){
  //   this.masterService.getuserBasedRI()
  //   .subscribe(response => {
  //     this.RIdata = response['ri'];
  //     if((this.selectedripoint === 0 || this.RIdata.findIndex(i => i.id === this.selectedripoint) == -1))
  //     {
  //         if(this.RIdata[0] != undefined)
  //             setTimeout(() => {
  //               this.selectedripoint = this.RIdata[0].id;
  //             }, 1);  
  //     }  
  //   },
  //   (err: HttpErrorResponse) =>{
  //     this.RIdata = [];
  //     this.errorMessage = err.toString();
  //   });
  // }

  // getAssociatedAnm(chcId){
  //   this.masterService.getAssociatedANM(chcId)
  //   .subscribe(response => {
  //     this.AssociatedAnm = response['associatedANMDetail'];
  //     if(this.AssociatedAnm[0])
  //         this.selectedassociatedanm = this.AssociatedAnm[0].associatedANMId;
  //   },
  //   (err: HttpErrorResponse) =>{
  //     this.AssociatedAnm = [];
  //     this.errorMessage = err.toString();
  //   });
  // }
  
  // getReligion(){
  //   this.masterService.getReligion()
  //   .subscribe(response => {
  //     this.religionData = response['religion'];
  //     if(this.religionData[0])
  //         this.selectedreligion = this.religionData[0].id;
  //   },
  //   (err: HttpErrorResponse) =>{
  //     this.religionData = [];
  //     this.errorMessage = err.toString();
  //   });
  // }

  // getCaste(){
  //   this.masterService.getCaste()
  //   .subscribe(response => {
  //     this.casteData = response['caste'];
  //     if(this.casteData[0])
  //         this.selectedcaste = this.casteData[0].id;
  //   },
  //   (err: HttpErrorResponse) =>{
  //     this.casteData = [];
  //     this.errorMessage = err.toString();
  //   });
  // }

  // getCommunity(id){
  //   if(id === 0)
  //   {
  //       this.masterService.getCommunity()
  //       .subscribe(response => {
  //         this.communityData = response['community'];
  //         if(this.communityData[0])
  //             this.selectedcommunity = this.communityData[0].id;
  //       },
  //       (err: HttpErrorResponse) =>{
  //         this.communityData = [];
  //         this.errorMessage = err.toString();
  //       });
  //   }
  //   else{
  //     this.masterService.getCommunityPerCaste(id)
  //       .subscribe(response => {
  //         this.communityData = response['community'];
  //         if(this.communityData[0])
  //             this.selectedcommunity = this.communityData[0].id;
  //       },
  //       (err: HttpErrorResponse) =>{
  //         this.communityData = [];
  //         this.errorMessage = err.toString();
  //       });
  //   }
    
  // }

  // getGovernmentIDType(){
  //   this.masterService.getGovernmentTypeId()
  //   .subscribe(response => {
  //     this.governmentIDData = response['govIdType'];
  //   },
  //   (err: HttpErrorResponse) =>{
  //     this.governmentIDData = [];
  //     this.errorMessage = err.toString();
  //   });
  // }

   
  // calculateAge()
  // {
  //    var today = new Date();
  //    var birthDate = new Date(this.selecteddob);
  //    var age = today.getFullYear() - birthDate.getFullYear();
  //    var m = today.getMonth() - birthDate.getMonth();
  //    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //        age--;
  //    }
  //    this.selectedage = age;
  //    //return age;
  // }
  // casteChange()
  // {
  //   this.getCommunity(this.selectedcaste);
  // }

  // // }
  // nextStep(stepper: MatStepper) {
  //   this.firstFormCheck = true;
  //     if(this.firstFormGroup.valid)
  //      stepper.next();
  //   }

  //   // prevStep() {
  //   //   this.stepper.previous();
  //   //   }

  // prevStep(stepper: MatStepper) {
  //   stepper.previous();
  // }
  // formSubmit()
  // {
  //   this.secondFormCheck = true;
  
  //   if(this.secondFormGroup.valid && this.firstFormGroup.valid)
  //   {
  //     var apiUrl = this.genericService.buildApiUrl(ENDPOINT.SUBJECT.ADD);
  //     this.httpClientService.post<any>({url:apiUrl, body: this.dataBindinginServce() }).subscribe(response => {
  //       this.createdSubjectId = response.uniqueSubjectId;
  //       this.getpositiveSubjectList();

  //       Swal.fire({icon:'success', title: 'Subject ID is '+this.createdSubjectId,
  // showCancelButton: true, confirmButtonText: 'Collect sample now', cancelButtonText: 'Collect sample later' })
  //    .then((result) => {
  //      if (result.value) {
  //       $('#fadeinModal').modal('hide');
  //       this.router.navigateByUrl("app/chc-sample-collection");
       
  //      }
  //      else{
  //       this.firstFormGroup.reset();
  //       this.secondFormGroup.reset();
  //       this.secondFormCheck = false;
  //       this.firstFormCheck = false;
  //       this.stepper.selectedIndex = 0;
  //       $('#fadeinModal').modal('hide');
  //      }
  //    });
  //       //$('#fadeinModal').modal('show');
        
  //     },
  //     (err: HttpErrorResponse) =>{
  //       console.log(err);
  //       this.chcpositiveSubjectErrorMessage = err.toString();
  //     });
  //   }
  // }

  // dataBindinginServce()
  // {
  //   var _obj = {
  //     "subjectPrimaryRequest": {
  //       "subjectTypeId": 1,
  //       "childSubjectTypeId": 1,
  //       "uniqueSubjectId": "",
  //       "districtId": this.firstFormGroup.get('district').value != undefined ? Number(this.firstFormGroup.get('district').value) : 0,
  //       "chcId": Number(this.firstFormGroup.get('chc').value),
  //       // "phcId": Number(this.firstFormGroup.get('phc').value),
  //       // "scId": Number(this.firstFormGroup.get('sc').value),
  //       "riId": Number(this.secondFormGroup.get('ripoint').value),
  //       "subjectTitle": this.firstFormGroup.get('subjectitle').value,
  //       "firstName": this.firstFormGroup.get('firstname').value,
  //       "middleName": this.firstFormGroup.get('middlename').value != undefined ? this.firstFormGroup.get('middlename').value : '',
  //       "lastName": this.firstFormGroup.get('lastname').value,
  //       "dob": this.firstFormGroup.get('dob').value != undefined ? moment(new Date(this.firstFormGroup.get('dob').value)).format("DD/MM/YYYY") : '',
  //       "age": Number(this.firstFormGroup.get('age').value),
  //       "gender": "Male",
  //       "maritalStatus": true,
  //       "mobileNo": ""+this.firstFormGroup.get('contactNumber').value,
  //       "emailId": this.secondFormGroup.get('spouseEmail').value != undefined ? this.secondFormGroup.get('spouseEmail').value : '',
  //       "govIdTypeId": this.secondFormGroup.get('govtIDType').value != undefined ? this.secondFormGroup.get('govtIDType').value : 0,
  //       "govIdDetail": this.secondFormGroup.get('GovtIDDetail').value != undefined ? this.secondFormGroup.get('GovtIDDetail').value : '',
  //       "spouseSubjectId": "",
  //       "spouseFirstName": "",
  //       "spouseMiddleName": "",
  //       "spouseLastName": "",
  //       "spouseContactNo": "",
  //       "spouseGovIdTypeId": 0,
  //       "spouseGovIdDetail": "",
  //       "assignANMId": Number(this.secondFormGroup.get('associatedanm').value),
  //       "dateOfRegister": moment(new Date(this.firstFormGroup.get('dor').value)).format("DD/MM/YYYY"),
  //       "registeredFrom": Number(this.user.registeredFrom),
  //       "createdBy": Number(this.user.id),
  //       "source": "N"
  //     },
  //     "subjectAddressRequest": {
  //       "religionId": Number(this.secondFormGroup.get('religion').value),
  //       "casteId": Number(this.secondFormGroup.get('caste').value),
  //       "communityId": Number(this.secondFormGroup.get('community').value),
  //       "address1": this.secondFormGroup.get('house').value,
  //       "address2": this.secondFormGroup.get('street').value,
  //       "address3": this.secondFormGroup.get('city').value,
  //       "pincode": ""+this.secondFormGroup.get('pincode').value,
  //       "stateName": this.secondFormGroup.get('state').value,
  //       "updatedBy": Number(this.user.id)
  //     },
  //     "subjectPregnancyRequest": {
  //       "rchId": this.firstFormGroup.get('rchId').value,
  //       "ecNumber": this.secondFormGroup.get('ECNumber').value,
  //       "lmpDate": "",
  //       "g": 0,
  //       "p": 0,
  //       "l": 0,
  //       "a": 0,
  //       "updatedBy": Number(this.user.id)
  //     },
  //     "subjectParentRequest": {
  //       "motherFirstName": "",
  //       "motherMiddleName": "",
  //       "motherLastName": "",
  //       "motherGovIdTypeId": 0,
  //       "motherGovIdDetail": "",
  //       "motherContactNo": "",
  //       "fatherFirstName": "",
  //       "fatherMiddleName": "",
  //       "fatherLastName": "",
  //       "fatherGovIdTypeId": 0,
  //       "fatherGovIdDetail": "",
  //       "fatherContactNo": "",
  //       "gaurdianFirstName": "",
  //       "gaurdianMiddleName": "",
  //       "gaurdianLastName": "",
  //       "gaurdianGovIdTypeId": 0,
  //       "gaurdianGovIdDetail": "",
  //       "gaurdianContactNo": "",
  //       "rbskId": "",
  //       "schoolName": "",
  //       "schoolAddress1": "",
  //       "schoolAddress2": "",
  //       "schoolAddress3": "",
  //       "schoolPincode": "",
  //       "schoolCity": "",
  //       "schoolState": "",
  //       "standard": "",
  //       "section": "",
  //       "rollNo": "",
  //       "updatedBy": Number(this.user.id)
  //     }
  //   };

  //   return _obj;
  // }


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


}
