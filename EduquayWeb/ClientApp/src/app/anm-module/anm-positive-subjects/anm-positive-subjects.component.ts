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
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
declare var $: any;
import * as moment from 'moment';
import { DistrictResponse, District } from 'src/app/shared/master/district/district.model';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { GenericService } from 'src/app/shared/generic.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { positiveSubjects, PositiveSubjectsResponse, UpdatePositiveSubjectsResponse } from 'src/app/shared/anm-module/positive-subjects/positive-subjects-response';
import { PositiveSubjectsService } from 'src/app/shared/anm-module/positive-subjects/positive-subjects.service';
import { PositiveSubjectsRequest } from 'src/app/shared/anm-module/positive-subjects/positive-subjects-request';
import { ENDPOINT } from 'src/app/app.constant';
import { ConstantService } from 'src/app/shared/constant.service';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';

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
  positiveSubjectResponse: PositiveSubjectsResponse;
  updatepositiveSubjectRequest: PositiveSubjectsRequest;
  updatepositiveSubjectResponse: UpdatePositiveSubjectsResponse;
  @ViewChild('dorPicker', { static: false }) DORPicker;
  @ViewChild('dobPicker', { static: false }) DOBPicker;

  //positiveSpouseResponse: PositiveSpouseResponse;
  positiveSubjectsList: positiveSubjects[]=[];
  positiveSamplesErrorMessage: string;
  districts: District[] = [];
  errorMessage: string;
  positiveSubjectInitResponse: any;
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
  registerSpouse: number;
  selecteddor = new Date(Date.now());
  DAY = 86400000;
  GPLADATA = [{id:'00',value:'0'},{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'},{id:'10',value:'10'}];
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
    defaultDate: new Date(Date.now()),
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
  selectedstate= 1;
  selectedPincode;
  selectedECNumber;
  selectedcity;

  notifySamples: string;
  selectedPositiveSubject: positiveSubjects;
  statelist = [];

  constructor(
    private PositiveSubjectsService: PositiveSubjectsService,
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
    private constantService: ConstantService,
    private dataservice: DataService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "ANM", "submodule":"Notification", "page": "Positive Subjects"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 20,
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
      state: [''],
      spouseContactNumber: ['', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
      spouseEmail: ['',Validators.email],
      pincode:['', Validators.required]
    });
    this.getpositiveSubjectList(this.user.id);
    // Resolver //
    // this.positiveSubjectInitResponse = this.route.snapshot.data.positiveSubjectData;
    // if (this.positiveSubjectInitResponse.status === 'false') {
    //   this.positiveSubjectsList = [];
    //   if (this.positiveSubjectInitResponse.message !== null && this.positiveSubjectInitResponse.message.code === "ENOTFOUND") {
    //     this.positiveSubjectErrorMessage = "Unable to connect to api source";
    //   }
    //   else if (this.positiveSubjectInitResponse.message !== null || this.positiveSubjectInitResponse.message == undefined) {
    //     this.positiveSubjectErrorMessage = this.positiveSubjectInitResponse.message;
    //   }
    // }
    // else {
      
    //   if (this.positiveSubjectInitResponse.positiveSubjects!= null && this.positiveSubjectInitResponse.positiveSubjects.length > 0) {
    //     this.positiveSubjectsList = this.positiveSubjectInitResponse.positiveSubjects;
    //   }
    // }

  }

  getpositiveSubjectList(userId){
    this.loaderService.display(true);
    this.positiveSubjectsList = [];
    let positiveSubject = this.PositiveSubjectsService.getPositiveSubject(userId)
    .subscribe(response => {
      this.positiveSubjectResponse = response;
      this.loaderService.display(false);
      if (this.positiveSubjectResponse !== null && this.positiveSubjectResponse.status === "true") {
        if (this.positiveSubjectResponse.positiveSubjects.length <= 0) {
          this.positiveSubjectErrorMessage = response.message;
        }
        else {
          this.positiveSubjectsList = this.positiveSubjectResponse.positiveSubjects;
        }
      }
      else {
        this.positiveSubjectErrorMessage = response.message;
      }
      this.rerender();
      this.loadDataTable = true;
    },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.positiveSubjectErrorMessage = err.toString();
      });
    
  }

  
  openpositiveSubjects(positiveSubjectsDetail, positiveSub: positiveSubjects){
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

    this.selectedPositiveSubject = positiveSub;

    this.selecteddor = new Date(Date.now());
    this.selectedanwname = positiveSub.subjectName;
    this.selectedsubjectId = positiveSub.uniqueSubjectId;
    this.selectedrchId = positiveSub.rchId;
    this.selectedMobile = positiveSub.contactNo;
    //this.selectedMobile = '9874587451';
    this.selectedgender = 'Male';
    this.selectedDistrict = positiveSub.districtId;
    this.selectedchc = positiveSub.chcId;
    this.selectedphc = positiveSub.phcId;
    this.selectedsc = positiveSub.scId;
    this.selectedripoint = positiveSub.riId;
    this.selectedreligion = positiveSub.religionId;
    this.selectedcaste = positiveSub.casteId;
    this.getCommunity(this.selectedcaste);
    this.selectedcommunity = positiveSub.communityId;
    this.selectedfirstname = positiveSub.spouseFirstName;
    this.selectedmiddlename = positiveSub.spouseMiddleName;
    this.selectedlastname = positiveSub.spouseLastName;
    this.selectedspouseContactNumber = positiveSub.spouseContactNo;
    this.selectedhouse = positiveSub.address1;
    this.selectedstreet = positiveSub.address2;
    this.selectedcity = positiveSub.address3;
    //this.selectedstate = positiveSub.stateName;
    this.selectedPincode = positiveSub.pincode;
    this.selectedECNumber = positiveSub.ecNumber;
    //this.selectedspouseEmail = data.ecNumber;

    // this.DORPicker.flatpickr.setDate(new Date(Date.now()- (this.DAY*0.025)));
    // this.DOBPicker.flatpickr.setDate("");


    // $('#fadeinModal').modal('show');
    this.modalService.open(
      positiveSubjectsDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });

  }

  
 positiveSubjectUpdateStatus(){
    this.positiveSubjectErrorMessage = '';
    this.fetchBarcodes();

    if(this.notifySamples === ""){
      this.showResponseMessage(this.constantService.SelectOneSample, 'e');
      return false;
    }
   
    this.updatepositiveSubjectRequest = {
      anmId: this.user.id,
      barcodeNo: this.notifySamples,
     
    }
    //Remove below 2 lines after successfully tested
    // this.showResponseMessage('Successfully registered', 's');
    // return false;
    let updatepositivesample = this.PositiveSubjectsService.updatePositiveSubject(this.updatepositiveSubjectRequest)
      .subscribe(response => {
        this.updatepositiveSubjectResponse = response;
        if (this.updatepositiveSubjectResponse !== null && this.updatepositiveSubjectResponse.status === "true") {
          this.showResponseMessage(this.updatepositiveSubjectResponse.message, 's');
        } else {
          this.showResponseMessage(this.updatepositiveSubjectResponse.message, 'e');
          this.positiveSubjectErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.showResponseMessage(err.toString(), 'e');
          this.positiveSubjectErrorMessage = err.toString();
        });

  }

  showResponseMessage(message: string, type: string){
    var messageType = '';
    if(type === 'e'){
      Swal.fire({icon:'error', title: message, confirmButtonText: 'Close', allowOutsideClick: false})
    }
    else{
      Swal.fire({icon:'success', title: message, confirmButtonText: 'Close', allowOutsideClick: false})
      .then((result) => {
        if (result.value) {
          if(this.modalService.hasOpenModals){
            this.modalService.dismissAll();
          }
        }
      });
    }
  }

  updateNotification(positiveSample: positiveSubjects, notifiedStatus: boolean){
    if(notifiedStatus === false){
      positiveSample.notifiedStatus = false;
    }
    else{
      positiveSample.notifiedStatus = true;
    }
  }

  fetchBarcodes(){
    this.notifySamples = '';
    var isFirst = true;
    this.positiveSubjectsList.forEach(element => {
      console.log('notifiedStatus :' + element.notifiedStatus);
      if(element.notifiedStatus === true){
        if(isFirst){
          this.notifySamples += element.barcodeNo;
          isFirst = false;
        }
        else{
          this.notifySamples += ',' + element.barcodeNo;
        }
      }
    });
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
      if(this.casteData[0])
          this.selectedcaste = this.casteData[0].id;
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

  // }
  nextStep(stepper: MatStepper) {
    this.firstFormCheck = true;
      if(this.firstFormGroup.valid)
       stepper.next();
    }

    // prevStep() {
    //   this.stepper.previous();
    //   }

  prevStep(stepper: MatStepper) {
    stepper.previous();
  }

    formSubmit()
    {
      this.secondFormCheck = true;
      var _tempStateSelected = this.statelist.filter(t=>t.id ===this.selectedstate);
      if(this.secondFormGroup.valid && this.firstFormGroup.valid)
      {
        var apiUrl = this.genericService.buildApiUrl(ENDPOINT.SUBJECT.ADD);
        this.httpClientService.post<any>({url:apiUrl, body: this.dataBindinginServce() }).subscribe(response => {
          this.createdSubjectId = response.uniqueSubjectId;
          this.getpositiveSubjectList(this.user.id);

          Swal.fire({icon:'success', title: 'Subject ID is '+this.createdSubjectId,
          showCancelButton: true, confirmButtonText: 'Collect sample now', cancelButtonText: 'Collect sample later', allowOutsideClick: false })
       .then((result) => {
         if (result.value) {
          //$('#fadeinModal').modal('hide');
          //this.getpositiveSubjectList(this.user.id);
          if(this.modalService.hasOpenModals){
            this.modalService.dismissAll();
          }
         // this.router.navigateByUrl("app/anm-sample-collection");
         this.router.navigateByUrl(`app/anm-sample-collection?sid=${this.createdSubjectId}`);
         
         }
         else{
          // this.firstFormGroup.reset();
          // this.secondFormGroup.reset();
          // this.secondFormCheck = false;
          // this.firstFormCheck = false;
          // this.stepper.selectedIndex = 0;
          if(this.modalService.hasOpenModals){
            this.modalService.dismissAll();
          }
          
         // $('#fadeinModal').modal('hide');
         }
       });
          //$('#fadeinModal').modal('show');
          
        },
        (err: HttpErrorResponse) =>{
          console.log(err);
          this.positiveSubjectErrorMessage = err.toString();
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
          "uniqueSubjectId": "", //unique subject id of ANW
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
          "spouseSubjectId": this.selectedPositiveSubject.uniqueSubjectId, // unique subject id of ANW
          "spouseFirstName": this.selectedPositiveSubject.subjectName,
          "spouseMiddleName": "",
          "spouseLastName": this.selectedPositiveSubject.subjectName,
          "spouseContactNo": this.selectedPositiveSubject.contactNo,
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


}
