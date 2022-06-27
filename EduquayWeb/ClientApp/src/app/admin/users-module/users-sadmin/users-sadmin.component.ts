import { Component, OnInit, Pipe, NgZone, ViewChild, NgModule } from '@angular/core';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { DistrictResponse, District } from 'src/app/shared/master/district/district.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { HttpClientService } from '../../../shared/http-client.service';
import { ENDPOINT } from '../../../app.constant';
import { GenericService } from '../../../shared/generic.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { TokenService } from 'src/app/shared/token.service';
declare var $: any 
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { AddScreenService } from 'src/app/shared/NHM-Monthly-Indicators/add-screen/add-screen.service';
import { ScreenList } from 'src/app/shared/NHM-Monthly-Indicators/add-screen/add-screen-response';
import { ChcList } from 'src/app/shared/admin/add-chc/add-chc-response';
import { AddUsersDataresponse, AddUsersResponse, Userrolelist, UserroleResponse, UsersList } from 'src/app/shared/admin/add-users/add-users-response';
import { ScList } from 'src/app/shared/admin/add-sc/add-sc-response';
import { PhcList } from 'src/app/shared/admin/add-phc/add-phc-response';
import { BlockList } from 'src/app/shared/admin/add-block/add-block-response';
import { DistrictList } from 'src/app/shared/admin/add-district/add-district-response';
import { user } from 'src/app/shared/auth-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddDistrictService } from 'src/app/shared/admin/add-district/add-district.service';
import { AddUsersService } from 'src/app/shared/admin/add-users/add-users.service';
import { StateList, StateResponse } from 'src/app/shared/admin/state/state-response';
declare var exposedFunction;


@Component({
  selector: 'app-users-sadmin',
  templateUrl: './users-sadmin.component.html',
  styleUrls: ['./users-sadmin.component.css']
})

export class UsersAdminSadminComponent implements OnInit {
  //@ViewChild('f', { static: false }) subRegBasic: NgForm;
  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild('dorPicker', { static: false }) DORPicker;
  @ViewChild('dobPicker', { static: false }) DOBPicker;
  @ViewChild('lmpdatePicker', { static: false }) LMPPicker;
  loadDataTable: boolean = false;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  DAY = 86400000;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";  
  districts: District[] = [];
  erroMessage: string;
  subjectprofilelistErrorMessage: string;
  firstFormGroup: FormGroup;
  id: number;
  userTypeId: number;
  userType: string;
  userRoleId: number;
  AddUsersResponse:AddUsersResponse;
  userRole: string;
  userRoleDescription: string;
  userRoleAccessModule: string;
  stateListResponse: StateResponse;
  userGovCode: string;
  districtlistErrorMessage: string;
  userName: string;
  riCode: string;
  stateId: number;
  centralLabId: number;
  centralLabName: string;
  molecularLabId: number;
  molecularLabName: string;
  districtId: number;
  districtName: string;
  blockId: number;
  blockName: string;
  chcId: number;
  chcName: string;
  phcId: number;
  selectedEditState: string;
  phcName: string;
  scId: number;
  scName: string;
  riId: string;
  name: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  Address: string;
  mobileNo: string;
  registeredFrom: number;
  sampleCollectionFrom: number;
  shipmentFrom: number;
  pndtLocationId: number;
ripointlistErrorMessage: string;
selectedEditPhc;
chcListResponse;
chclistErrorMessage: string;
disabledChc = false;
Userslistrequest;
getchc: string;
districtListResponse;
selectedEditChc: string = '';
districtlists: DistrictList[];
getstate: string;
comments: string;
blocklists: BlockList[];
statelists: StateList[];
blockListResponse;
confirmationSelected: boolean ;
phclistErrorMessage: string;
// selectedBlock= '';
selectedEditDistrict: string;
getphc: string;
chclists: ChcList[];
userprofileLists: UsersList[]=[];
phclists: PhcList[];
sclists: ScList[];
user: user;
subjectid: string;
getdistrict: string;
searchsubjectid: string;
userId: number;
selectedChc: string;
  selectedState: string;
  selectedUserrole: string;
  selectedBlock: string;
  userroleListResponse:UserroleResponse;
  addPhcResponse: AddUsersDataresponse;

  religionId: number;
  religionName: string;
  phcListResponse;
  scListResponse;
  userListRequest;
  casteId: number;
  casteName: string;
  communityId: number;
  userslistErrorMessage: string;
  communityName: string;
  address:string;
  address1: string;
  address2: string;
  address3: string;
  selectedEditBlock: string = '';
  stateName: string;

  pincode: string;




  riSite: string;
  dob: string;
  age: number;
  gender: string;

  emailId: string;
  selectedPhc: string = '';
  selectedSc: string = '';
  spouseSubjectId: string;

  spouseFirstName: string;
  spouseMiddleName: string;

  userrolelists: Userrolelist[];
  spouseLastName: string;
  testingCHCists;
  spouseContactNo: string;
  govIdTypeId: number;
  govIdType: string;
  selectedEditSc: string = '';
  govIdDetails: string;

  rchId: string;
  testingCHCResponse;
  ecNumber: string;
  lmpDate: string;
  gestationalperiod: number;
  childSubjectTypeId: number;
  firstFormCheck = false;
  selectedDistrict = null;
  GPLADATA = [{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'},{id:'10',value:'10'}];
  GPLAADATA = [{id:'00',value:'0'},{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'}];
 
  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'F Y',
    altFormat: "F Y",
    defaultDate: new Date(Date.now()),
    "disable": [
      function(date) {
          // return true to disable
          return (date.getDate() > 1);

      }
  ],
  };
 
 
  selecteddor = new Date(Date.now());
  selectedlmpdate;

  createdSubjectId="";

  fromDate ;
  toDate;
  dateform:FormGroup;
  pndPendingArray  :ScreenList[] ; 
  selectedspouseEmail;
  Ldisabled = true;
  Pdisabled = true;
  Adisabled = true;
  statelist = [];
  ageValidate = false;
  State: any;
  contactNo1: any;
  editComments: any;
  mobileNo1: any;
  constructor(private masterService: masterService,
     private addscreenreportService:AddScreenService,
      private loaderService: LoaderService,
      private route: ActivatedRoute,
      zone: NgZone,
      private _formBuilder: FormBuilder,
      private modalService: NgbModal,
      private httpClientService:HttpClientService,
      private genericService: GenericService,
      private tokenService: TokenService,
      private router: Router, 
      private DistrictService: AddDistrictService,
      private httpService: HttpClient,
      private DataService:DataService,
      private UsersService:AddUsersService,
      private dataservice: DataService) {
    window['angularComponentReference'] = {
      zone: zone,
      componentFn: (id, value) => this.callFromOutside(id, value),
      component: this,
    };
  }

  ngOnInit() {  
    this.dataservice.sendData(JSON.stringify({"module": "Users", "submodule": "Sadmin"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 20,
      processing: true,
      stripeClasses: [],
      lengthMenu: [5, 10, 20, 50],
      dom: "<'row mt-3'<'col-sm-6 float-right'f><'col-sm-4 mb-2 float-right'l><'col-sm-2 float-right'B>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-4'i><'col-sm-4 text-center'p>>",
      // Configure the buttons
        buttons: [
          {
            titleAttr: 'Download as Excel',
            extend: 'excelHtml5',
            title: 'Report - Sample Status',
            className: 'custom-btn',
            text: '<img src="assets/assets/img/excelimage.png" width="23px" />'
          }
  
        ],
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
    // this.loaderService.display(false);
    // var pndtcTestingArr = this.route.snapshot.data.pndtcTesting;
    // this.dateform = this._formBuilder.group({
    //   fromDate: [''],
    //   toDate: [''],  
    // });
    this.getDistrictData();
    this.refreshData();

   

  }

  public callFromOutside(id, subject: any): any {
    let subjectdetail = JSON.parse(subject);
  }
  selected(eventval){
    console.log(eventval);
  }

  openEditsadmin(editsadminDetail, subjectinfo) {

    console.log(subjectinfo);
    this.id = subjectinfo.id;
       this.userTypeId=9;
     this.userRoleId=9;
      this.userGovCode=subjectinfo.userGovCode;
      this.userName=subjectinfo.userName  ;
      this.editddlState();
      this.selectedEditState = subjectinfo.stateId;
     this.firstName=subjectinfo.firstName;
     this.middleName=subjectinfo.middleName;
     this.lastName=subjectinfo.lastName;
     this. mobileNo=subjectinfo.mobileNo;
     this.email=subjectinfo.email;
      this.comments= subjectinfo.comments;
      this.confirmationSelected = subjectinfo.isActive;
  
    // this.selectedEditBlock = "" +(subjectinfo.blockId)
   console.log(this.firstName);
  
  
    this.modalService.open(
      editsadminDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
  
  }

  openAddUsers(addIlrDetail) {

    //this.ddlChc();
    this.ddlState();
    this.ddlUserRole();
    this.disabledChc = false;
    this.ddlDistrict();
    this.disabledChc = false;
    this.selectedBlock="";
    this.ddlDistrict();
    this.selectedPhc="";
    this.selectedSc="";
    this.pincode="";
    this.selectedChc="";
    this.selectedDistrict="";


    this.confirmationSelected = Boolean("True");
    this.modalService.open(
      addIlrDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
  }
  retrirveIlrlist(){
    this.loaderService.display(true);
    this.phclists = [];
    this.phclistErrorMessage ='';
    let samplesList = this.UsersService.getallUsersList()
    .subscribe(response => {
      this.phcListResponse = response;
      this.loaderService.display(false);
      if(this.phcListResponse !== null){
        if(this.phcListResponse.data.length <= 0){
          this.phclistErrorMessage = response.message;

        }
        else{
          this.phclists = this.phcListResponse.data;
          this.phclists.forEach(element => {
            this.getchc = '' +(element.chcId);

          });
          //this.getstate = this.
          this.rerender();

        }
      }
      else{
        this.phclistErrorMessage = response.message;
      }

    },
    (err: HttpErrorResponse) => {
      if (this.loadDataTable) this.rerender();
      this.phclistErrorMessage = err.toString();
    });
  }

  onSubmitsadmin(addIlrForm: NgForm){

    console.log(addIlrForm.value);

    // this.userName = addIlrForm.value.Username;
    this.firstName = addIlrForm.value.firstName;
    this.middleName = addIlrForm.value.middleName;
    this.lastName = addIlrForm.value.lastName;
    this.userGovCode = addIlrForm.value.userGovCode;
    this.State = addIlrForm.value.State;
    this.email = addIlrForm.value.email;
    this.selectedState = addIlrForm.value.ddlState;
    this.contactNo1 = addIlrForm.value.contactNo1;
    this.comments = addIlrForm.value.Comments;
  console.log(addIlrForm);
    this.Userslistrequest = {
      userTypeId:1,
      userRoleId:1,
        userGovCode:this.userGovCode,
        userName:this.email,
        password:'odisha',
        stateId: 1,
        centralLabId: 0,

        molecularLabId: 0,
        districtId:0,
        blockId:0,
        chcId:0 ,
        phcId:0,
        scId:0 ,
        riId:null,
        firstName:this.firstName,
        middleName:this.middleName,
        lastName:this.lastName,
        contactNo1:this.contactNo1,
        contactNo2:null,
        email:this.email,
        govIdTypeId:0,
        govIdDetails:null,
        address:null,
        pincode:null,
        createdBy:this.user.id ,
        updatedBy:this.user.id ,
        comments: this.comments,
        isActive:"true",
    };
    let damagedsampleCollection = this.UsersService.addUsers(this.Userslistrequest)
    .subscribe(response => {
       this.addPhcResponse = response;
      console.log(response );
      if(this.addPhcResponse !== null && this.addPhcResponse.status == 'true'){
        this.showResponseMessage('Sadmin User added Sucessfully', 's')
         this.refreshData();
          console.log(this.addPhcResponse.message );
       }else{
         this.showResponseMessage(this.addPhcResponse.message, 'e');
               this.phclistErrorMessage = response.message;
       }

    },
    (err: HttpErrorResponse) => {
      this.showResponseMessage(err.toString(), 'e');
    this.phclistErrorMessage = err.toString();
    });
    // this.rerender();
     //swal ("Here's the title!", "...and here's the text!");
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
  ddlUserRole() {

    let district = this.UsersService.getUserroleListType(1).subscribe(response => {
      this.userroleListResponse = response;
      console.log(this.userroleListResponse);
      if (this.userroleListResponse !== null && this.userroleListResponse.status === "true") {
        this.userrolelists = this.userroleListResponse.userRoles;
        this.selectedUserrole = "";

      }

      else {
        this.districtlistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.districtlistErrorMessage = err.toString();

      });
  }
  ddlBlock(code) {

    this.selectedBlock = '';
    let district = this.UsersService.getBlocklist(code).subscribe(response => {
      this.blockListResponse = response;
      console.log(this.blockListResponse);
      if (this.blockListResponse !== null && this.blockListResponse.status === "true") {
        this.blocklists = this.blockListResponse.data;
        // console.log(this.blocklists);
        this.selectedBlock = "";

      }
      else {
        this.chclistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.chclistErrorMessage = err.toString();

      });
  }
  ddlDistrict() {
    let district = this.UsersService.getDistrictList().subscribe(response => {
      this.districtListResponse = response;
      if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
        this.districtlists = this.districtListResponse.data;
        this.selectedDistrict = "";
        console.log(this.districtlists);
      }
      else {
        this.userslistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.userslistErrorMessage = err.toString();

      });


  }
  ddlState() {
    let district = this.DistrictService.getStateList().subscribe(response => {
      this.stateListResponse = response;
      if (this.stateListResponse !== null && this.stateListResponse.status === "true") {
        this.statelists = this.stateListResponse.data;
        this.selectedState = "1";
      }
      else {
        this.districtlistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.districtlistErrorMessage = err.toString();

      });
  }
  editddlState() {
    let district = this.DistrictService.getStateList().subscribe(response => {
      this.stateListResponse = response;
      if (this.stateListResponse !== null && this.stateListResponse.status === "true") {
        this.statelists = this.stateListResponse.data;
        this.selectedState = this.getstate;
      }
      else {
        this.districtlistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.districtlistErrorMessage = err.toString();

      });
  }

calculatepercentage(proposed,samples)
{
  if(proposed!=0)
  {
    let percentage=((proposed/samples)*100).toFixed(2);
    return percentage
  }
  else
  {
    return 0
  }
}
editsubmitsadmin(editsadminForm: NgForm){

  console.log(editsadminForm.value);
    // this.userName = editsadminForm.value.userName;
    this.firstName = editsadminForm.value.firstName;
    this.middleName = editsadminForm.value.middleName;
    this.lastName = editsadminForm.value.lastName;
    // this.userGovCode = editsadminForm.value.userGovCode;
    this.email = editsadminForm.value.email;
    // this.selectedEditState = editsadminForm.value.ddlState;

    this.mobileNo = editsadminForm.value.mobileNo;
    this.comments = editsadminForm.value.Comments;

  this.userListRequest = {
    id:this.id ,
    userTypeId:1,
    userRoleId:1,
    userGovCode:this.userGovCode,
      userName:this.userName,
      password:'odisha',
      stateId: +(this.selectedEditState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: 0,
      blockId:0,
      chcId:0 ,
      phcId:0,
      scId:0 ,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.mobileNo1,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:null,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      commentsdata: this.editComments,
      isActive: this.confirmationSelected,
  };
  console.log(this.userListRequest);

  //Remove below 2 lines after successfully tested
  // this.showResponseMessage('Successfully registered', 's');
  // return false;

  let damagedsampleCollection = this.UsersService.updateusers(this.userListRequest)
  .subscribe(response => {
    this.AddUsersResponse = response;
    if(this.AddUsersResponse !== null){
      this.showResponseMessage('Sadmin User Updated Successfully', 's')
      let subProfile = this.UsersService.getUsersList(1)
      .subscribe(response => {
        console.log(response);
        this.AddUsersResponse = response;
        this.loaderService.display(false);
        if (this.AddUsersResponse !== null && this.AddUsersResponse.status === "true") {
          if (this.AddUsersResponse.users.length <= 0 ) {
            this.subjectprofilelistErrorMessage = response.message;
          }
          else {
            this.userprofileLists = response.users;
            this.rerender();
          }
          //console.log( this.userprofileLists );
        }
        else {
          this.subjectprofilelistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.subjectprofilelistErrorMessage = err.toString();
        });

     // this.anmSubjectBadgeProfileListCount(1,1,1);
    //  this.anmSubjectBadgeProfileListCount(1,1,1);
    //  this.anmSubjectBadgeProfileListCount(1,1,2);


    }else{
      this.showResponseMessage(this.AddUsersResponse.message, 'e');
              this.userslistErrorMessage = response.message;
    }

  },
  (err: HttpErrorResponse) => {
    this.showResponseMessage(err.toString(), 'e');
    this.userslistErrorMessage = err.toString();
  });
  //swal ("Here's the title!", "...and here's the text!");
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
 
       refreshData()
      {
        this.loaderService.display(true);
        
        var _subjectObj = {
          // "fromDate": this.fromDate != '' ? moment(new Date(this.fromDate)).format("DD/MM/YYYY") : '',
          // "toDate": this.toDate != '' ? moment(new Date(this.toDate)).format("DD/MM/YYYY") : ''
          "monthId": new Date(this.dateform.value.fromDate).getMonth()+1,
            "yearId": new Date(this.dateform.value.fromDate).getFullYear()
          
        }
        this.UsersService.getUsersList(1).subscribe(response => {
          this.userprofileLists = response.users;
         
          this.loaderService.display(false);
           this.rerender();
         
        },
        (err: HttpErrorResponse) =>{
          this.loaderService.display(false);
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

    prePopulateFormDetails()
    {
      setTimeout(()=>{    
          this.selectedDistrict = this.user.districtId;
          this.selecteddor = new Date(Date.now());
          this.DORPicker.flatpickr.setDate(new Date(Date.now()- (this.DAY*0.00025)));
          this.LMPPicker.flatpickr.setDate(new Date(Date.now()- (this.DAY*30.00025)));
          this.DOBPicker.flatpickr.setDate(""); 
        }, 100);
    }
    ngAfterViewInit(): void {
      this.dtTrigger.next();
    }   

    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
    
}
