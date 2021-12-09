import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SubjectProfileRequest, ParticularSubjectProfileRequest, anmSubjectTrackerRequest, subjectTrackerRequest } from 'src/app/shared/anm-module/subject-profile/subject-profile-request';
import { SubjectProfileResponse, PrimaryDetail, AddressDetail, ParentDetail, PregnancyDetail, RetrieveSubjectProfileList, SubjectProfileList, trackingANWSubjectResponse, trackingSubjectResponse, ANMSubject, SubjectTrack } from 'src/app/shared/anm-module/subject-profile/subject-profile-response';
import { SubjectProfileService } from 'src/app/shared/anm-module/subject-profile/subject-profile.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder,FormGroup,NgForm } from '@angular/forms';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { DataService } from 'src/app/shared/data.service';
import { StateList, StateResponse } from 'src/app/shared/admin/state/state-response';
import { Userrolelist, UserroleResponse } from 'src/app/shared/admin/add-users/add-users-response';
import { TokenService } from 'src/app/shared/token.service';
import { user } from 'src/app/shared/auth-response'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AddDistrictService } from 'src/app/shared/admin/add-district/add-district.service';
import { Router } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
declare var $: any;
import { PNDTCmasterService } from "../../shared/pndtc/pndtc-masterdata.service";
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { AddScResponse, ScList } from 'src/app/shared/admin/add-sc/add-sc-response';
import { SampleCollectionService } from 'src/app/shared/anm-module/sample-collection.service';
import { DateService } from 'src/app/shared/utility/date.service';
import { AddUsersService } from 'src/app/shared/admin/add-users/add-users.service';
import { AddUsersDataresponse, AddUsersResponse, UsersList } from 'src/app/shared/admin/add-users/add-users-response';
import { Console } from 'console';
import { DistrictList } from 'src/app/shared/admin/add-district/add-district-response';
import { BlockList } from 'src/app/shared/admin/add-block/add-block-response';
import { PhcList } from 'src/app/shared/admin/add-phc/add-phc-response';
import { ChcList } from 'src/app/shared/admin/add-chc/add-chc-response';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit, OnDestroy, OnInit {


  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
  loadDataTable: boolean = false;
  //dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('startPicker', { static: false }) startPicker;
  @ViewChild('endPicker', { static: false }) endPicker;

  subjectprofilelistErrorMessage: string;

  subjectProfileRequest: SubjectProfileRequest;
  particularanmSubProfile: ParticularSubjectProfileRequest;
  anmsubjectProfileResponse: RetrieveSubjectProfileList;
  //adduserProfileResponse: RetrieveSubjectProfileList;
  AddUsersResponse:AddUsersResponse;
  trackingAnmSubjectTrackerRequest: anmSubjectTrackerRequest;
  trackingAnmSubjectTrackerResponse: trackingANWSubjectResponse;
  trackingSubjectRequest: subjectTrackerRequest;
  trackingSubjectResponse: trackingSubjectResponse;
  sclistErrorMessage: string;
  id: number;
    userTypeId: number;
    userType: string;
    userRoleId: number;
    userRole: string;
    userRoleDescription: string;
    userRoleAccessModule: string;
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
  anmSubjectTrackerDetail: ANMSubject;
  selectedEditPhc: string = '';
  anmSubjectTrackerItem: ANMSubject;
  chcListResponse;
  chclistErrorMessage: string;
  disabledChc = false;
  Userslistrequest;
  getchc: string;
  districtListResponse;
  selectedEditChc: string = '';
  districtlists: DistrictList[];
  getstate: string;
  blocklists: BlockList[];
  blockListResponse;
  confirmationSelected: boolean ;
  phclistErrorMessage: string;
  selectedDistrict = '';
  getphc: string;
  subjectTrackerItem: SubjectTrack;
  chclists: ChcList[];
  childsubjectTrackerItem: SubjectTrack;

  subjectprofileLists: SubjectProfileList[]=[];
  userprofileLists: UsersList[]=[];
  subjectprofileItem: SubjectProfileList;
  phclists: PhcList[];
  sclists: ScList[];
  basicInfo: PrimaryDetail;
  // basicInfo: PrimaryDetail;
  socioDemographicInfo: AddressDetail;
  parentInfo: ParentDetail;
  personalInfo: PregnancyDetail;
  user: user;
  subjectid: string;
  searchsubjectid: string;
  userId: number;

  /*Date Range configuration starts*/
  dateform: FormGroup;
  DAY = 86400000;
  dyCollectionDate: Date = new Date(Date.now());
  anmSPFromDate: string ="";
  anmSPToDate: string = "";

  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: '',
    maxDate: new Date(Date.now())
  };
  endOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: '',
    minDate: new Date(moment().add(-1, 'day').format()),
    maxDate: new Date(Date.now())
  };


  spouseSubjectIdValue: string;
  spouseSamplingStatus: boolean;
  uniqueSubjectId: string;

  selectedChc: string;
  selectedState: string;
  selectedUserrole: string;
  selectedBlock: string;
  stateListResponse: StateResponse;
  userroleListResponse:UserroleResponse;
  addPhcResponse: AddUsersDataresponse;

  religionId: number;
  religionName: string;
  phcListResponse;
  scListResponse;
  casteId: number;
  casteName: string;
  communityId: number;
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
  statelists: StateList[];
  userrolelists: Userrolelist[];
  spouseLastName: string;
  testingCHCists;
  spouseContactNo: string;
  govIdTypeId: number;
  govIdType: string;
  govIdDetails: string;

  rchId: string;
  testingCHCResponse;
  ecNumber: string;
  lmpDate: string;
  gestationalperiod: number;
  childSubjectTypeId: number;
  g: number;
  p: number;
  l: number;
  a: number;
  comments: string;
  barcodes: string;
  ga: number;
  ANMdata;
  erroMessage;
  selectedphc  =false;
  CHCdata;
  RIData;
  selectedRIpoint = null;
  subjectData;
  // selectedBlock = null;
  selectedchc = null;
  selectedAnm = null;
  showDistrict = true;
  getblock: string;
  showBlock = true;
  globalTimeout = null;
  maintabSelected = 1;
  mainsubtabSelected = 1;

  countMain1Sub1 = 0;
  countMain1Sub2 = 0;

  countMain2Sub1 = 0;
  countMain2Sub2 = 0;

  countMain3Sub1 = 0;
  countMain3Sub2 = 0;

  countMain4Sub1 = 0;
  countMain4Sub2 = 0;
  countMain4Sub3 = 0;
  countMain4Sub4 = 0;
  countMain4Sub5 = 0;

  countMain5Sub1 = 0;
  countMain5Sub2 = 0;
  countMain5Sub3 = 0;
  countMain5Sub4 = 0;

  countMain6Sub1 = 0;
  countMain6Sub2 = 0;
  countMain6Sub3 = 0;
  countMain6Sub4 = 0;
  countMain6Sub5 = 0;

  countMain7Sub1 = 0;
  countMain7Sub2 = 0;
  countMain7Sub3 = 0;

  countMain8Sub1 = 0;
  countMain8Sub2 = 0;
  countMain8Sub3 = 0;
  countMain8Sub4 = 0;
  countMain8Sub5 = 0;

  countMain9Sub1 = 0;
  countMain9Sub2 = 0;
  countMain9Sub3 = 0;


  chcsamplingstatusCount = '0';
  chcsampledCount = '0';
  chcnotsampledount = '0';

  chcsCBCResultsCount = '0';
  chcCBCPositiveCount = '0';
  chcCBCNegativeCount = "0";
  chcSSTResultCount = "0";
  chcSSTPositiveCount = "0";
  chcSSTNegativeCount = "0";

  HPLCResultCount = "0";
  HPLCAbnormalCount = "0";
  HPLCNormalCount = "0";

  registeredCount = "0";
  notregisteredCount = "0";

  counselledPNDTDisagreedCount = "0";
  counselledPNDTAgreedCount = "0";
  counsellingpendingCount = "0";
  counselledPNDTDecisionPendingCount = "0";

  PNDTpendingCount = "0";
  PNDTcompletedCount = "0";
  PNDTNormalCount = "0";
  PNDTAffectedCount = "0";
  PNDTcarrierCount = "0";

  PNDcounsellingpendingCount = "0";
  PNDcounsellingMTPAgreedCount = "0";
  PNDcounsellingMTPDecisionPendingCount = "0";
  PNDCounselledMTPDisagreedCount = "0";

  MTPpendingCount = 0;
  MTPcompletedCount = 0;
  password: any;
  contactNo1: any;
  contactNo2:any;
  createdBy: any;
  updatedBy: any;
  isActive: any;
  State: any;



  constructor(
    private DistrictService: AddDistrictService,
    private SubjectProfileService: SubjectProfileService,
    private httpService: HttpClient,
    private _formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private tokenService: TokenService,
    private dataservice: DataService,
    private modalService: NgbModal,
    private router: Router,
    private PNDTCmasterService: PNDTCmasterService,
    private masterService: masterService,
    private sampleCollectionService: SampleCollectionService,
    private DataService:DataService,
    private UsersService:AddUsersService
  ) { }

  ngOnInit() {
    this.dataservice.sendData(JSON.stringify({ "module": "NHM", "page": "Report"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));

    this.loaderService.display(true);
    this.SubprofileInitializeDateRange();

    this.getRIpointData();
    this.getSubjectData();
    //this.getCHCData();

    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 5,
      processing: true,
      stripeClasses: [],
      lengthMenu: [5, 10, 20, 50],
       // Declare the use of the extension in the dom parameter
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
        search: '<div><span class="note">Search by any Users information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
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


    //console.log(this.SubjectProfileService.subjectprofileListApi);
    var _obj = {
      fromDate: '',
      toDate: '',
      riId: 0,
      subjectTypeId:0,
      "searchSection":this.maintabSelected,
      "status":1,
      "userId": this.user.id,
    }
    console.log(_obj);
    //this.subjectprofileItem = new SubjectProfileList();
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


        this.anmSubjectBadgeProfileListCount(1,1,1);
        this.anmSubjectBadgeProfileListCount(1,1,2);
        this.anmSubjectBadgeProfileListCount(1,1,3);

        //this.phcChange();
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
        this.phclistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.phclistErrorMessage = err.toString();

      });


  }
  ddlState() {
    let district = this.DistrictService.getStateList().subscribe(response => {
      this.stateListResponse = response;
      if (this.stateListResponse !== null && this.stateListResponse.status === "true") {
        this.statelists = this.stateListResponse.data;
        this.selectedState = "";
      }
      else {
        this.districtlistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.districtlistErrorMessage = err.toString();

      });
  }

  ddlUserRole(type) {

    let district = this.UsersService.getUserroleListType(type).subscribe(response => {
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


  ddlTestingCHC(code) {
    this.selectedBlock = '';
    let district = this.UsersService.gettestingCHC(code).subscribe(response => {
      this.testingCHCResponse = response;
      if (this.testingCHCResponse !== null && this.testingCHCResponse.status === "true") {
        this.testingCHCists = this.testingCHCResponse.data;


      }
      else {
        this.chclistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.chclistErrorMessage = err.toString();

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
  ddlPhc(code) {
    this.selectedPhc = '';
    let district = this.UsersService.getPhcList(code).subscribe(response => {
      this.phcListResponse = response;
      console.log(this.phcListResponse);
      if (this.phcListResponse !== null && this.phcListResponse.status === "true") {
        this.phclists = this.phcListResponse.phcDetails;
        this.selectedPhc = "";

      }
      else {
        this.sclistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.sclistErrorMessage = err.toString();

      });
  }

  onChangeBlock(event) {

    if (this.selectedBlock === '') {
      this.selectedChc = '';
    }
    else {
      this.ddlChc();
    }
  }

   onChangeChc(event) {

      if (this.selectedChc === '') {
        this.selectedPhc = '';
      }
      else {
        this.ddlPhc(this.selectedChc);
      }
    }

  onChangePhc(event) {
    console.log(this.selectedPhc);
    if (this.selectedPhc === '') {
      this.selectedSc = '';
    }
    else {
      this.ddlSc(this.selectedPhc);
    }
  }

  onChangeEditChc(event) {

    if (this.selectedEditChc === '') {
      this.selectedEditPhc = '';
    }
    else {
      this.ddlEdtiPhc(this.selectedEditChc);
    }
  }

  onChangeDistrict(event) {

    if (this.selectedDistrict === '') {
      this.selectedBlock = '';
    }
    else {
      this.ddlBlock(this.selectedDistrict);
      this.ddlTestingCHC(this.selectedDistrict);
    }
  }

  districtChange()
  {
        console.log(this.selectedDistrict);
        this.ddlBlock(this.selectedDistrict);
        this.selectedChc = '';
    let district = this.UsersService.getCHCByDis(this.selectedDistrict).subscribe(response => {
      this.chcListResponse = response;
      console.log(this.chcListResponse);
      if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
        this.chclists = this.chcListResponse.data;
        this.selectedChc = "";
        this.disabledChc = true;
      }
      else {
        this.sclistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.sclistErrorMessage = err.toString();

      });
  }


  ddlEdtiPhc(code) {
    this.selectedEditPhc = '';
    let district = this.UsersService.getPhcList(code).subscribe(response => {
      this.phcListResponse = response;
      if (this.phcListResponse !== null && this.phcListResponse.status === "true") {
        this.phclists = this.phcListResponse.data;
        if(this.phclists.length > 0){
          this.selectedEditPhc = this.getphc;

        }

      }
      else {
        this.sclistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.sclistErrorMessage = err.toString();

      });
  }
  ddlSc(code) {
    this.selectedPhc = '';
    console.log(code);
    let district = this.UsersService.getScList(code).subscribe(response => {
      this.scListResponse = response;
      console.log(this.scListResponse);
      if (this.scListResponse !== null && this.scListResponse.status === "true") {
        this.sclists = this.scListResponse.scDetails;
        console.log(this.sclists);
        this.selectedSc = "";
      }
      else {
        this.ripointlistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.ripointlistErrorMessage = err.toString();

      });
  }
  // ddlEdtiSc(code) {
  //   this.selectedEditPhc = '';
  //   let district = this.UsersService.getScList(code).subscribe(response => {
  //     this.scListResponse = response;
  //     if (this.scListResponse !== null && this.scListResponse.status === "true") {
  //       this.sclists = this.scListResponse.scDetails;
  //       if(this.sclists.length > 0){
  //         this.selectedEditSc = this.getsc;

  //       }

  //     }
  //     else {
  //       this.ripointlistErrorMessage = response.message;
  //     }
  //   },
  //     (err: HttpErrorResponse) => {
  //       this.ripointlistErrorMessage = err.toString();

  //     });
  // }

  ddlEditChc() {
    this.selectedEditChc = '';
    let district = this.UsersService.getChcList().subscribe(response => {
      this.chcListResponse = response;
      if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
        this.chclists = this.chcListResponse.chcDetails;
        this.selectedEditChc = this.getchc;
        this.onChangeEditChc(this.getchc);
      }
      else {
        this.sclistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.sclistErrorMessage = err.toString();

      });
  }

  ddlChc() {

    this.selectedChc = '';
    let district = this.UsersService.getChcList().subscribe(response => {
      this.chcListResponse = response;
      console.log(this.chcListResponse);
      if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
        this.chclists = this.chcListResponse.chcDetails;
        this.selectedChc = "";
      }
      else {
        this.sclistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.sclistErrorMessage = err.toString();

      });
  }

  ddlEditBlock(code) {
    this.selectedBlock = '';
    let district = this.UsersService.getBlocklist(code).subscribe(response => {
      this.blockListResponse = response;
      if (this.blockListResponse !== null && this.blockListResponse.status === "true") {
        this.blocklists = this.blockListResponse.data;
        if(this.blocklists.length > 0){
          this.selectedEditBlock = this.getblock;

        }

      }
      else {
        this.chclistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.chclistErrorMessage = err.toString();

      });
  }

  openAddIlr(addIlrDetail) {

    //this.ddlChc();
    this.ddlState();
    this.ddlUserRole(this.maintabSelected);
    this.disabledChc = false;
    this.ddlDistrict();
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

  getRIpointData(){
    this.masterService.getuserBasedRI()
    .subscribe(response => {
      this.RIData = response['ri'];
    },
    (err: HttpErrorResponse) =>{
      this.RIData = [];
      //this.erroMessage = err.toString();
    });
  }
  getSubjectData(){
    this.loaderService.display(true);
    this.ANMdata = [];
    this.selectedAnm = null;
    this.sampleCollectionService.getSubjectType().subscribe(response => {
      console.log(response);
      this.subjectData = response['subjectTypes'];
      this.loaderService.display(false);
    },
    (err: HttpErrorResponse) =>{
      this.subjectData = [];
      this.erroMessage = err.toString();
    });
  }

  getCHCData(){
    this.loaderService.display(true);
    this.ANMdata = [];
    this.selectedAnm = null;
    this.PNDTCmasterService.getCHCByBlock(this.selectedBlock)
    .subscribe(response => {
      console.log(response);
      this.CHCdata = response['data'];
      this.loaderService.display(false);
    },
    (err: HttpErrorResponse) =>{
      this.CHCdata = [];
      this.erroMessage = err.toString();
    });
  }

  getANMData(){
    this.loaderService.display(true);
    this.PNDTCmasterService.getANMByCHC(this.selectedchc)
    .subscribe(response => {
      console.log(response);
      this.ANMdata = response['data'];
      this.loaderService.display(false);
    },
    (err: HttpErrorResponse) =>{
      this.ANMdata = [];
      this.erroMessage = err.toString();
    });
  }

  phcChange(){
    this.loaderService.display(true);
    this.PNDTCmasterService.getPHCBasedANM(this.selectedphc)
    .subscribe(response => {
      console.log(response);
      this.ANMdata = response['data'];
      this.loaderService.display(false);
    },
    (err: HttpErrorResponse) =>{
      this.ANMdata = [];
      this.erroMessage = err.toString();
      this.loaderService.display(false);
    });
  }


  anmSubjectProfileList(id,maintab,subtab) {

    this.loaderService.display(true);
    this.subjectprofilelistErrorMessage = '';
    this.userprofileLists=[];
    var _obj = {
      fromDate: this.anmSPFromDate !== '' ? this.anmSPFromDate : '',
      toDate: this.anmSPToDate !== '' ? this.anmSPToDate : '',
      riId: this.selectedRIpoint === null ? 0 : Number(this.selectedRIpoint),
      subjectTypeId: this.selectedBlock === null ? 0 : Number(this.selectedBlock),
      "searchSection":maintab,
      "status":subtab,
      "userId": this.user.id
    }

    //this.subjectprofileItem = new SubjectProfileList();
    let subProfile = this.UsersService.getUsersList(maintab)
      .subscribe(response => {
        this.AddUsersResponse = response;
        console.log(this.AddUsersResponse);
        this.loaderService.display(false);
        if (this.AddUsersResponse !== null && this.AddUsersResponse.status === "true") {
          console.log(response.users);
          if (this.AddUsersResponse.users.length <= 0 ) {
            this.subjectprofilelistErrorMessage = response.message;
            this.userprofileLists = [];
            this.rerender();
            console.log('no data');
          }
          else {
            this.userprofileLists = response.users;
            this.rerender();
            console.log('data');
          }
        }
        else {
          this.subjectprofilelistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.subjectprofilelistErrorMessage = err.toString();
        });
        console.log(maintab);
        if(maintab === 1)
        {
          this.anmSubjectBadgeProfileListCount(1,1,1);
          this.anmSubjectBadgeProfileListCount(1,1,2);
        }
        if(maintab === 2)
        {
          this.anmSubjectBadgeProfileListCount(1,2,1);
          this.anmSubjectBadgeProfileListCount(1,2,2);
        }
        if(maintab === 3)
        {
          this.anmSubjectBadgeProfileListCount(1,3,1);
          this.anmSubjectBadgeProfileListCount(1,3,2);
        }
        if(maintab === 4)
        {
          this.anmSubjectBadgeProfileListCount(1,4,1);
          this.anmSubjectBadgeProfileListCount(1,4,2);
          this.anmSubjectBadgeProfileListCount(1,4,3);
          this.anmSubjectBadgeProfileListCount(1,4,4);
          this.anmSubjectBadgeProfileListCount(1,4,5);
          this.anmSubjectBadgeProfileListCount(1,4,5);
        }
        if(maintab === 5)
        {
          this.anmSubjectBadgeProfileListCount(1,5,1);
          this.anmSubjectBadgeProfileListCount(1,5,2);
          this.anmSubjectBadgeProfileListCount(1,5,3);
          this.anmSubjectBadgeProfileListCount(1,5,4);
        }
        if(maintab === 6)
        {
          this.anmSubjectBadgeProfileListCount(1,6,1);
          this.anmSubjectBadgeProfileListCount(1,6,2);
          this.anmSubjectBadgeProfileListCount(1,6,3);
          this.anmSubjectBadgeProfileListCount(1,6,4);
          this.anmSubjectBadgeProfileListCount(1,6,5);
        }
        if(maintab === 7)
        {
          this.anmSubjectBadgeProfileListCount(1,7,1);
          this.anmSubjectBadgeProfileListCount(1,7,2);
          this.anmSubjectBadgeProfileListCount(1,7,3);
        }
        if(maintab === 8)
        {
          this.anmSubjectBadgeProfileListCount(1,8,1);
          this.anmSubjectBadgeProfileListCount(1,8,2);
          this.anmSubjectBadgeProfileListCount(1,8,3);
          this.anmSubjectBadgeProfileListCount(1,8,4);
          this.anmSubjectBadgeProfileListCount(1,8,5);
        }
        if(maintab === 9)
        {
          this.anmSubjectBadgeProfileListCount(1,9,1);
          this.anmSubjectBadgeProfileListCount(1,9,2);
          this.anmSubjectBadgeProfileListCount(1,9,3);
        }
        if(maintab === 10)
        {
          this.anmSubjectBadgeProfileListCount(1,9,1);
          this.anmSubjectBadgeProfileListCount(1,9,2);
          this.anmSubjectBadgeProfileListCount(1,9,3);
        }
        if(maintab === 11)
        {
          this.anmSubjectBadgeProfileListCount(1,9,1);
          this.anmSubjectBadgeProfileListCount(1,9,2);
          this.anmSubjectBadgeProfileListCount(1,9,3);
        }
        if(maintab === 12)
        {
          this.anmSubjectBadgeProfileListCount(1,9,1);
          this.anmSubjectBadgeProfileListCount(1,9,2);
          this.anmSubjectBadgeProfileListCount(1,9,3);
        }
        if(maintab === 13)
        {
          this.anmSubjectBadgeProfileListCount(1,9,1);
          this.anmSubjectBadgeProfileListCount(1,9,2);
          this.anmSubjectBadgeProfileListCount(1,9,3);
        }
        if(maintab === 14)
        {
          this.anmSubjectBadgeProfileListCount(1,9,1);
          this.anmSubjectBadgeProfileListCount(1,9,2);
          this.anmSubjectBadgeProfileListCount(1,9,3);
        }
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


  anmSubjectBadgeProfileListCount(id,maintab,subtab) {

    this.loaderService.display(true);
    this.subjectprofilelistErrorMessage = '';
    this.subjectprofileLists=[];
    var _obj = {
      fromDate: this.anmSPFromDate !== '' ? this.anmSPFromDate : '',
      toDate: this.anmSPToDate !== '' ? this.anmSPToDate : '',
      riId: this.selectedRIpoint === null ? 0 : Number(this.selectedRIpoint),
      subjectTypeId: this.selectedBlock === null ? 0 : Number(this.selectedBlock),
      searchSection:maintab,
      status:subtab,
      userId: this.user.id
    }

    //this.subjectprofileItem = new SubjectProfileList();
    // let subProfile = this.SubjectProfileService.getANMReportList(_obj)
    //   .subscribe(response => {

    //    console.log(response['data'].length);
    //    if(maintab ===1)
    //    {
    //         if(subtab === 1)
    //               this.countMain1Sub1 = response['data'].length;
    //         if(subtab === 2)
    //               this.countMain1Sub2 = response['data'].length;
    //    }
    //    if(maintab ===2)
    //    {
    //         if(subtab === 1)
    //               this.countMain2Sub1 = response['data'].length;
    //         if(subtab === 2)
    //               this.countMain2Sub2 = response['data'].length;

    //    }
    //    if(maintab ===3)
    //    {
    //         if(subtab === 1)
    //               this.countMain3Sub1 = response['data'].length;
    //         if(subtab === 2)
    //               this.countMain3Sub2 = response['data'].length;
    //    }

    //    if(maintab ===4)
    //    {
    //         if(subtab === 1)
    //               this.countMain4Sub1 = response['data'].length;
    //         if(subtab === 2)
    //               this.countMain4Sub1 = response['data'].length;
    //         if(subtab === 3)
    //               this.countMain4Sub3 = response['data'].length;
    //         if(subtab === 4)
    //               this.countMain4Sub4 = response['data'].length;
    //         if(subtab === 5)
    //               this.countMain4Sub5 = response['data'].length;
    //    }

    //    if(maintab ===5)
    //    {
    //         if(subtab === 1)
    //               this.countMain5Sub1 = response['data'].length;
    //         if(subtab === 2)
    //               this.countMain5Sub2 = response['data'].length;
    //         if(subtab === 3)
    //               this.countMain5Sub3 = response['data'].length;
    //         if(subtab === 4)
    //               this.countMain5Sub4 = response['data'].length;
    //    }
    //    if(maintab ===6)
    //    {
    //         if(subtab === 1)
    //               this.countMain6Sub1 = response['data'].length;
    //         if(subtab === 2)
    //               this.countMain6Sub2 = response['data'].length;
    //         if(subtab === 3)
    //               this.countMain6Sub3 = response['data'].length;
    //         if(subtab === 4)
    //               this.countMain6Sub4 = response['data'].length;
    //         if(subtab === 5)
    //               this.countMain6Sub5 = response['data'].length;
    //    }
    //    if(maintab ===7)
    //    {
    //         if(subtab === 1)
    //               this.countMain7Sub1 = response['data'].length;
    //         if(subtab === 2)
    //               this.countMain7Sub2 = response['data'].length;
    //         if(subtab === 3)
    //               this.countMain7Sub3 = response['data'].length;
    //    }
    //    if(maintab ===8)
    //    {
    //         if(subtab === 1)
    //               this.countMain8Sub1 = response['data'].length;
    //         if(subtab === 2)
    //               this.countMain8Sub2 = response['data'].length;
    //         if(subtab === 3)
    //               this.countMain8Sub3 = response['data'].length;
    //         if(subtab === 4)
    //               this.countMain8Sub4 = response['data'].length;
    //         if(subtab === 5)
    //               this.countMain8Sub5 = response['data'].length;

    //    }
    //    if(maintab ===9)
    //    {
    //         if(subtab === 1)
    //               this.countMain9Sub1 = response['data'].length;
    //         if(subtab === 2)
    //               this.countMain9Sub1 = response['data'].length;
    //         if(subtab === 3)
    //               this.countMain9Sub1 = response['data'].length;

    //    }
    //    this.loaderService.display(false);
    //   },
    //     (err: HttpErrorResponse) => {
    //       this.subjectprofilelistErrorMessage = err.toString();
    //     });

  }

  anmSubjectProfileList1(id,maintab,subtab) {

    if(this.searchsubjectid != null || this.searchsubjectid != undefined)
    {
        this.loaderService.display(true);
        this.subjectprofilelistErrorMessage = '';
        this.subjectprofileLists=[];
        var _obj = {
          riId: 0,
          subjectTypeId: 0,
          userId: this.user.id,
          userInput:this.searchsubjectid,
          searchType:id,
          "searchSection":1,
          "status":0
        }

        //this.subjectprofileItem = new SubjectProfileList();
        let subProfile = this.SubjectProfileService.getANMReportList(_obj)
          .subscribe(response => {
            this.anmsubjectProfileResponse = response;
            this.loaderService.display(false);
            if (this.anmsubjectProfileResponse !== null && this.anmsubjectProfileResponse.status === "true") {
              if (this.anmsubjectProfileResponse['data'].length <= 0 ) {
                this.subjectprofilelistErrorMessage = response.message;
                this.subjectprofileLists = [];
                  this.rerender();
              }
              else {
                this.subjectprofileLists = response['data'];
                this.rerender();
              }
            }
            else {
              this.subjectprofilelistErrorMessage = response.message;
            }
          },
            (err: HttpErrorResponse) => {
              this.subjectprofilelistErrorMessage = err.toString();
            });
          }
          else
          {
            this.subjectprofilelistErrorMessage = "Please enter search data!";
          }

  }


  opensubjectdetail(subjectinfo ){
    console.log(subjectinfo);
    this.DataService.setdata({'anmreportData':subjectinfo});
    this.DataService.setdata({'reportPreviouspage':"ANM"});
    this.subjectid = subjectinfo.subjectId;
      this.router.navigateByUrl(`/app/view-anm-report?q=${this.subjectid}`);

    /*if(subjectinfo.primaryDetail.registeredFrom === 'ANM'){
      this.subjectid = subjectinfo.primaryDetail.uniqueSubjectId;
      this.router.navigateByUrl(`/app/anm-viewsubjectprofile?q=${this.subjectid}`);
    }
    else if(subjectinfo.primaryDetail.registeredFrom === 'CHC'){
      this.subjectid = subjectinfo.primaryDetail.uniqueSubjectId;
      this.router.navigateByUrl(`/app/chc-reg-viewsubjectprofile?q=${this.subjectid}`);
    }*/

    //   if(index.length > 0){
    //     this.subjectprofileLists.find(element => {
    //     // var subjectid = element.primaryDetail.uniqueSubjectId;
    //     this.router.navigateByUrl(`/app/anm-viewsubjectprofile?q=${element.primaryDetail.uniqueSubjectId}`);
    // });
  //}

  }

  SubprofileInitializeDateRange() {

    this.dateform = this._formBuilder.group({
      fromDate: [''],
      toDate: [''],
      block: [''],
      district: [''],
      chc: [''],
      anm: [''],
    });

    // Start Date Changes
    this.dateform.controls.fromDate.valueChanges.subscribe(changes => {
      if (!changes[0]) return;
      const selectedDate = changes[0].getTime();
      this.anmSPFromDate = moment(new Date(selectedDate)).format("DD/MM/YYYY");
      const monthLaterDate = selectedDate + (this.DAY * 30);
      // console.log(monthLaterDate > Date.now() ? new Date() : new Date(monthLaterDate));
      if (changes > this.dateform.controls.toDate.value) {
        this.endPicker.flatpickr.set({
          defaultDate: new Date(Date.now()),
          minDate: new Date(selectedDate),
        });
      }
      else {
        this.endPicker.flatpickr.set({
          minDate: new Date(selectedDate),
        });
      }
    });

    // // End Date Changes
    this.dateform.controls.toDate.valueChanges.subscribe(changes => {
      console.log('end: ', changes);
      if (!changes[0]) return;
      const selectedDate1 = changes[0].getTime();
      this.anmSPToDate = moment(new Date(selectedDate1)).format("DD/MM/YYYY");

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

  /*ngAfterViewInit(): void {
    this.dtTrigger.next();
  }   */
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

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== this['value']) {
            that
              .search(this['value'])
              .draw();
          }
        });
      });
    });

  }

  onSubmitsadmin(addIlrForm: NgForm){

    console.log(addIlrForm.value);

    this.userName = addIlrForm.value.Username;
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
        userName:this. userName,
        password:'KJOJ',
        stateId: +(this.selectedState),
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
         this.showResponseMessage(this.addPhcResponse.message, 's')
         this.retrirveIlrlist();
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
    onSubmitanm(addIlrForm: NgForm){

      console.log(addIlrForm.value);
      this.selectedDistrict = addIlrForm.value.ddlDistrict;
      this.selectedBlock = addIlrForm.value.ddlBlock;
      this.selectedChc = addIlrForm.value.ddlChc;
      this.selectedPhc = addIlrForm.value.ddlPhc;
      this.selectedSc = addIlrForm.value.ddlSc;
      this.riId = addIlrForm.value.riId;
      this.userName = addIlrForm.value.Username;
      this.firstName = addIlrForm.value.firstName;
      this.middleName = addIlrForm.value.middleName;
      this.lastName = addIlrForm.value.lastName;
      this.contactNo1 = addIlrForm.value.contactNo1;
      this.userGovCode = addIlrForm.value.userGovCode;
      this.selectedState = addIlrForm.value.ddlState;
      this.email = addIlrForm.value.email;
      this.Address = addIlrForm.value.Address;
      this.comments = addIlrForm.value.Comments;

    console.log(addIlrForm);
      this.Userslistrequest = {
        userTypeId:3,
        userRoleId:3,
          userGovCode:this.userGovCode,
          userName:this.userName,
          password:'KJOJ',
          stateId:+(this.selectedState),
          centralLabId: 0,

          molecularLabId: 0,
          districtId: +(this.selectedDistrict),
          blockId: +(this.selectedBlock),
          chcId: +(this.selectedChc),
          phcId: +(this.selectedPhc),
          scId: +(this.selectedSc),
          riId:this.riId,
          firstName:this.firstName,
          middleName:this.middleName,
          lastName:this.lastName,
          contactNo1:this.contactNo1,
          contactNo2:null,
          email:this.email,
          govIdTypeId:0,
          govIdDetails:null,
          address:this.Address,
          pincode:null,
          createdBy:this.user.id ,
          updatedBy:this.user.id ,
          comments: this.comments,
          isActive:"true",
      };

    console.log(this.Userslistrequest);
    //Remove below 2 lines after successfully tested
    // this.showResponseMessage('Successfully registered', 's');
    // return false;


    let damagedsampleCollection = this.UsersService.addUsers(this.Userslistrequest)
    .subscribe(response => {
       this.addPhcResponse = response;
      console.log(response );
      if(this.addPhcResponse !== null && this.addPhcResponse.status == 'true'){
         this.showResponseMessage(this.addPhcResponse.message, 's')
         this.retrirveIlrlist();
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

   onSubmitchc(addIlrForm: NgForm){

    console.log(addIlrForm.value);
    this.selectedUserrole = addIlrForm.value.ddlUserRole;
    this.selectedDistrict = addIlrForm.value.ddlDistrict;
    this.selectedBlock = addIlrForm.value.ddlBlock;
    this.selectedChc = addIlrForm.value.ddlChc;
    this.userName = addIlrForm.value.Username;
    this.firstName = addIlrForm.value.firstName;
    this.middleName = addIlrForm.value.middleName;
    this.lastName = addIlrForm.value.lastName;
    this.contactNo1 = addIlrForm.value.contactNo1;
    this.userGovCode = addIlrForm.value.userGovCode;
    this.selectedState = addIlrForm.value.ddlState;
    this.email = addIlrForm.value.email;
    this.Address = addIlrForm.value.Address;
    this.comments = addIlrForm.value.Comments;

  console.log(addIlrForm);
    this.Userslistrequest = {
      userTypeId:4,
      userRoleId:+(this.selectedUserrole),
        userGovCode:this.userGovCode,
        userName:this.userName,
        password:'KJOJ',
        stateId:+(this.selectedState),
        centralLabId: 0,

        molecularLabId: 0,
        districtId: +(this.selectedDistrict),
        blockId: +(this.selectedBlock),
        chcId: +(this.selectedChc),
        phcId: 0,
        scId: 0,
        riId:null,
        firstName:this.firstName,
        middleName:this.middleName,
        lastName:this.lastName,
        contactNo1:this.contactNo1,
        contactNo2:null,
        email:this.email,
        govIdTypeId:0,
        govIdDetails:null,
        address:this.Address,
        pincode:null,
        createdBy:this.user.id ,
        updatedBy:this.user.id ,
        comments: this.comments,
        isActive:"true",
    };

  console.log(this.Userslistrequest);
  //Remove below 2 lines after successfully tested
  // this.showResponseMessage('Successfully registered', 's');
  // return false;


  let damagedsampleCollection = this.UsersService.addUsers(this.Userslistrequest)
  .subscribe(response => {
     this.addPhcResponse = response;
    console.log(response );
    if(this.addPhcResponse !== null && this.addPhcResponse.status == 'true'){
       this.showResponseMessage(this.addPhcResponse.message, 's')
       this.retrirveIlrlist();
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

 onSubmithplc(addIlrForm: NgForm){

  console.log(addIlrForm.value);
  this.selectedUserrole = addIlrForm.value.ddlUserRole;
  this.selectedDistrict = addIlrForm.value.ddlDistrict;
  this.selectedBlock = addIlrForm.value.ddlBlock;
  this.userName = addIlrForm.value.Username;
  this.firstName = addIlrForm.value.firstName;
  this.middleName = addIlrForm.value.middleName;
  this.lastName = addIlrForm.value.lastName;
  this.contactNo1 = addIlrForm.value.contactNo1;
  this.userGovCode = addIlrForm.value.userGovCode;
  this.selectedState = addIlrForm.value.ddlState;
  this.email = addIlrForm.value.email;
  this.Address = addIlrForm.value.Address;
  this.comments = addIlrForm.value.Comments;

console.log(addIlrForm);
  this.Userslistrequest = {
    userTypeId:5,
    userRoleId:+(this.selectedUserrole),
      userGovCode:this.userGovCode,
      userName:this.userName,
      password:'KJOJ',
      stateId:+(this.selectedState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: +(this.selectedDistrict),
      blockId: +(this.selectedBlock),
      chcId:0,
      phcId: 0,
      scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.contactNo1,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:this.Address,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
      isActive:"true",
  };

console.log(this.Userslistrequest);
//Remove below 2 lines after successfully tested
// this.showResponseMessage('Successfully registered', 's');
// return false;


let damagedsampleCollection = this.UsersService.addUsers(this.Userslistrequest)
.subscribe(response => {
   this.addPhcResponse = response;
  console.log(response );
  if(this.addPhcResponse !== null && this.addPhcResponse.status == 'true'){
     this.showResponseMessage(this.addPhcResponse.message, 's')
     this.retrirveIlrlist();
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

onSubmitpndtc(addIlrForm: NgForm){

  console.log(addIlrForm.value);
  // this.selectedUserrole = addIlrForm.value.ddlUserRole;
  this.selectedDistrict = addIlrForm.value.ddlDistrict;
  this.selectedBlock = addIlrForm.value.ddlBlock;
  this.userName = addIlrForm.value.Username;
  this.firstName = addIlrForm.value.firstName;
  this.middleName = addIlrForm.value.middleName;
  this.lastName = addIlrForm.value.lastName;
  this.contactNo1 = addIlrForm.value.contactNo1;
  this.userGovCode = addIlrForm.value.userGovCode;
  this.selectedState = addIlrForm.value.ddlState;
  this.email = addIlrForm.value.email;
  this.Address = addIlrForm.value.Address;
  this.comments = addIlrForm.value.Comments;

console.log(addIlrForm);
  this.Userslistrequest = {
    userTypeId:6,
    userRoleId:6,
      userGovCode:this.userGovCode,
      userName:this.userName,
      password:'KJOJ',
      stateId:+(this.selectedState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: +(this.selectedDistrict),
      blockId: +(this.selectedBlock),
      chcId:0,
      phcId: 0,
      scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.contactNo1,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:this.Address,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
      isActive:"true",
  };

console.log(this.Userslistrequest);
//Remove below 2 lines after successfully tested
// this.showResponseMessage('Successfully registered', 's');
// return false;


let damagedsampleCollection = this.UsersService.addUsers(this.Userslistrequest)
.subscribe(response => {
   this.addPhcResponse = response;
  console.log(response );
  if(this.addPhcResponse !== null && this.addPhcResponse.status == 'true'){
     this.showResponseMessage(this.addPhcResponse.message, 's')
     this.retrirveIlrlist();
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

onSubmitmtp(addIlrForm: NgForm){

  console.log(addIlrForm.value);
  // this.selectedUserrole = addIlrForm.value.ddlUserRole;
  this.selectedDistrict = addIlrForm.value.ddlDistrict;
  this.selectedBlock = addIlrForm.value.ddlBlock;
  this.userName = addIlrForm.value.Username;
  this.firstName = addIlrForm.value.firstName;
  this.middleName = addIlrForm.value.middleName;
  this.lastName = addIlrForm.value.lastName;
  this.contactNo1 = addIlrForm.value.contactNo1;
  this.userGovCode = addIlrForm.value.userGovCode;
  this.selectedState = addIlrForm.value.ddlState;
  this.email = addIlrForm.value.email;
  this.Address = addIlrForm.value.Address;
  this.comments = addIlrForm.value.Comments;

console.log(addIlrForm);
  this.Userslistrequest = {
    userTypeId:7,
    userRoleId:7,
      userGovCode:this.userGovCode,
      userName:this.userName,
      password:'KJOJ',
      stateId:+(this.selectedState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: +(this.selectedDistrict),
      blockId: +(this.selectedBlock),
      chcId:0,
      phcId: 0,
      scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.contactNo1,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:this.Address,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
      isActive:"true",
  };

console.log(this.Userslistrequest);
//Remove below 2 lines after successfully tested
// this.showResponseMessage('Successfully registered', 's');
// return false;


let damagedsampleCollection = this.UsersService.addUsers(this.Userslistrequest)
.subscribe(response => {
   this.addPhcResponse = response;
  console.log(response );
  if(this.addPhcResponse !== null && this.addPhcResponse.status == 'true'){
     this.showResponseMessage(this.addPhcResponse.message, 's')
     this.retrirveIlrlist();
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

onSubmitdc(addIlrForm: NgForm){

  console.log(addIlrForm.value);
  // this.selectedUserrole = addIlrForm.value.ddlUserRole;
  this.selectedDistrict = addIlrForm.value.ddlDistrict;
  this.selectedBlock = addIlrForm.value.ddlBlock;
  this.userName = addIlrForm.value.Username;
  this.firstName = addIlrForm.value.firstName;
  this.middleName = addIlrForm.value.middleName;
  this.lastName = addIlrForm.value.lastName;
  this.contactNo1 = addIlrForm.value.contactNo1;
  this.userGovCode = addIlrForm.value.userGovCode;
  this.selectedState = addIlrForm.value.ddlState;
  this.email = addIlrForm.value.email;
  this.Address = addIlrForm.value.Address;
  this.comments = addIlrForm.value.Comments;

console.log(addIlrForm);
  this.Userslistrequest = {
    userTypeId:8,
    userRoleId:8,
      userGovCode:this.userGovCode,
      userName:this.userName,
      password:'KJOJ',
      stateId:+(this.selectedState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: +(this.selectedDistrict),
      blockId: +(this.selectedBlock),
      chcId:0,
      phcId: 0,
      scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.contactNo1,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:this.Address,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
      isActive:"true",
  };

console.log(this.Userslistrequest);
//Remove below 2 lines after successfully tested
// this.showResponseMessage('Successfully registered', 's');
// return false;


let damagedsampleCollection = this.UsersService.addUsers(this.Userslistrequest)
.subscribe(response => {
   this.addPhcResponse = response;
  console.log(response );
  if(this.addPhcResponse !== null && this.addPhcResponse.status == 'true'){
     this.showResponseMessage(this.addPhcResponse.message, 's')
     this.retrirveIlrlist();
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

onSubmitmolecular(addIlrForm: NgForm){

  console.log(addIlrForm.value);
  // this.selectedUserrole = addIlrForm.value.ddlUserRole;
  this.selectedDistrict = addIlrForm.value.ddlDistrict;
  this.selectedBlock = addIlrForm.value.ddlBlock;
  this.userName = addIlrForm.value.Username;
  this.firstName = addIlrForm.value.firstName;
  this.middleName = addIlrForm.value.middleName;
  this.lastName = addIlrForm.value.lastName;
  this.contactNo1 = addIlrForm.value.contactNo1;
  this.userGovCode = addIlrForm.value.userGovCode;
  this.selectedState = addIlrForm.value.ddlState;
  this.email = addIlrForm.value.email;
  this.Address = addIlrForm.value.Address;
  this.comments = addIlrForm.value.Comments;

console.log(addIlrForm);
  this.Userslistrequest = {
    userTypeId:9,
    userRoleId:9,
      userGovCode:this.userGovCode,
      userName:this.userName,
      password:'KJOJ',
      stateId:+(this.selectedState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: +(this.selectedDistrict),
      blockId: +(this.selectedBlock),
      chcId:0,
      phcId: 0,
      scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.contactNo1,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:this.Address,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
      isActive:"true",
  };

console.log(this.Userslistrequest);
//Remove below 2 lines after successfully tested
// this.showResponseMessage('Successfully registered', 's');
// return false;


let damagedsampleCollection = this.UsersService.addUsers(this.Userslistrequest)
.subscribe(response => {
   this.addPhcResponse = response;
  console.log(response );
  if(this.addPhcResponse !== null && this.addPhcResponse.status == 'true'){
     this.showResponseMessage(this.addPhcResponse.message, 's')
     this.retrirveIlrlist();
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

onSubmitspc(addIlrForm: NgForm){

  console.log(addIlrForm.value);
  // this.selectedUserrole = addIlrForm.value.ddlUserRole;
  this.selectedDistrict = addIlrForm.value.ddlDistrict;
  this.selectedBlock = addIlrForm.value.ddlBlock;
  this.userName = addIlrForm.value.Username;
  this.firstName = addIlrForm.value.firstName;
  this.middleName = addIlrForm.value.middleName;
  this.lastName = addIlrForm.value.lastName;
  this.contactNo1 = addIlrForm.value.contactNo1;
  this.userGovCode = addIlrForm.value.userGovCode;
  this.selectedState = addIlrForm.value.ddlState;
  this.email = addIlrForm.value.email;
  this.Address = addIlrForm.value.Address;
  this.comments = addIlrForm.value.Comments;

console.log(addIlrForm);
  this.Userslistrequest = {
    userTypeId:9,
    userRoleId:9,
      userGovCode:this.userGovCode,
      userName:this.userName,
      password:'KJOJ',
      stateId:+(this.selectedState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: +(this.selectedDistrict),
      blockId: +(this.selectedBlock),
      chcId:0,
      phcId: 0,
      scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.contactNo1,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:this.Address,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
      isActive:"true",
  };

console.log(this.Userslistrequest);
//Remove below 2 lines after successfully tested
// this.showResponseMessage('Successfully registered', 's');
// return false;


let damagedsampleCollection = this.UsersService.addUsers(this.Userslistrequest)
.subscribe(response => {
   this.addPhcResponse = response;
  console.log(response );
  if(this.addPhcResponse !== null && this.addPhcResponse.status == 'true'){
     this.showResponseMessage(this.addPhcResponse.message, 's')
     this.retrirveIlrlist();
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

onSubmitnhm(addIlrForm: NgForm){

  console.log(addIlrForm.value);
  // this.selectedUserrole = addIlrForm.value.ddlUserRole;
  this.selectedDistrict = addIlrForm.value.ddlDistrict;
  this.selectedBlock = addIlrForm.value.ddlBlock;
  this.userName = addIlrForm.value.Username;
  this.firstName = addIlrForm.value.firstName;
  this.middleName = addIlrForm.value.middleName;
  this.lastName = addIlrForm.value.lastName;
  this.contactNo1 = addIlrForm.value.contactNo1;
  this.userGovCode = addIlrForm.value.userGovCode;
  this.selectedState = addIlrForm.value.ddlState;
  this.email = addIlrForm.value.email;
  this.Address = addIlrForm.value.Address;
  this.comments = addIlrForm.value.Comments;

console.log(addIlrForm);
  this.Userslistrequest = {
    userTypeId:9,
    userRoleId:9,
      userGovCode:this.userGovCode,
      userName:this.userName,
      password:'KJOJ',
      stateId:+(this.selectedState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: +(this.selectedDistrict),
      blockId: +(this.selectedBlock),
      chcId:0,
      phcId: 0,
      scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.contactNo1,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:this.Address,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
      isActive:"true",
  };

console.log(this.Userslistrequest);
//Remove below 2 lines after successfully tested
// this.showResponseMessage('Successfully registered', 's');
// return false;


let damagedsampleCollection = this.UsersService.addUsers(this.Userslistrequest)
.subscribe(response => {
   this.addPhcResponse = response;
  console.log(response );
  if(this.addPhcResponse !== null && this.addPhcResponse.status == 'true'){
     this.showResponseMessage(this.addPhcResponse.message, 's')
     this.retrirveIlrlist();
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

onSubmitpndt(addIlrForm: NgForm){

  console.log(addIlrForm.value);
  // this.selectedUserrole = addIlrForm.value.ddlUserRole;
  this.selectedDistrict = addIlrForm.value.ddlDistrict;
  this.selectedBlock = addIlrForm.value.ddlBlock;
  this.userName = addIlrForm.value.Username;
  this.firstName = addIlrForm.value.firstName;
  this.middleName = addIlrForm.value.middleName;
  this.lastName = addIlrForm.value.lastName;
  this.contactNo1 = addIlrForm.value.contactNo1;
  this.userGovCode = addIlrForm.value.userGovCode;
  this.selectedState = addIlrForm.value.ddlState;
  this.email = addIlrForm.value.email;
  this.Address = addIlrForm.value.Address;
  this.comments = addIlrForm.value.Comments;

console.log(addIlrForm);
  this.Userslistrequest = {
    userTypeId:9,
    userRoleId:9,
      userGovCode:this.userGovCode,
      userName:this.userName,
      password:'KJOJ',
      stateId:+(this.selectedState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: +(this.selectedDistrict),
      blockId: +(this.selectedBlock),
      chcId:0,
      phcId: 0,
      scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.contactNo1,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:this.Address,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
      isActive:"true",
  };

console.log(this.Userslistrequest);
//Remove below 2 lines after successfully tested
// this.showResponseMessage('Successfully registered', 's');
// return false;


let damagedsampleCollection = this.UsersService.addUsers(this.Userslistrequest)
.subscribe(response => {
   this.addPhcResponse = response;
  console.log(response );
  if(this.addPhcResponse !== null && this.addPhcResponse.status == 'true'){
     this.showResponseMessage(this.addPhcResponse.message, 's')
     this.retrirveIlrlist();
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

onSubmitsupport(addIlrForm: NgForm){

  console.log(addIlrForm.value);
  // this.selectedUserrole = addIlrForm.value.ddlUserRole;
  this.selectedDistrict = addIlrForm.value.ddlDistrict;
  this.selectedBlock = addIlrForm.value.ddlBlock;
  this.userName = addIlrForm.value.Username;
  this.firstName = addIlrForm.value.firstName;
  this.middleName = addIlrForm.value.middleName;
  this.lastName = addIlrForm.value.lastName;
  this.contactNo1 = addIlrForm.value.contactNo1;
  this.userGovCode = addIlrForm.value.userGovCode;
  this.selectedState = addIlrForm.value.ddlState;
  this.email = addIlrForm.value.email;
  this.Address = addIlrForm.value.Address;
  this.comments = addIlrForm.value.Comments;

console.log(addIlrForm);
  this.Userslistrequest = {
    userTypeId:9,
    userRoleId:9,
      userGovCode:this.userGovCode,
      userName:this.userName,
      password:'KJOJ',
      stateId:+(this.selectedState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: +(this.selectedDistrict),
      blockId: +(this.selectedBlock),
      chcId:0,
      phcId: 0,
      scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.contactNo1,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:this.Address,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
      isActive:"true",
  };

console.log(this.Userslistrequest);
//Remove below 2 lines after successfully tested
// this.showResponseMessage('Successfully registered', 's');
// return false;


let damagedsampleCollection = this.UsersService.addUsers(this.Userslistrequest)
.subscribe(response => {
   this.addPhcResponse = response;
  console.log(response );
  if(this.addPhcResponse !== null && this.addPhcResponse.status == 'true'){
     this.showResponseMessage(this.addPhcResponse.message, 's')
     this.retrirveIlrlist();
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
  custumTabClick(i,j)
  {
      this.maintabSelected = i;
      this.mainsubtabSelected = j;
      this.anmSubjectProfileList(1,i,j);
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  openpopup(index, subjectinfo){

    console.log(subjectinfo);
    this.loaderService.display(true);
    var _obj = {
      "userid":this.user.id,
      "userInput":subjectinfo.subjectId
    }
    let subProfile = this.SubjectProfileService.getparticularanmSubjectProfileList(_obj)
      .subscribe(response => {
        var _response = response.subjectsDetail[0];

        console.log(this.SubjectProfileService.subjectProfileApi);
    this.childSubjectTypeId = _response.primaryDetail.childSubjectTypeId;
    this.uniqueSubjectId = _response.primaryDetail.uniqueSubjectId;
    this.firstName = _response.primaryDetail.firstName;
    this.lastName = _response.primaryDetail.lastName;
    this.gender = _response.primaryDetail.gender;
    this.age = _response.primaryDetail.age;
    this.barcodes = _response.pregnancyDetail.barcodes;
    this.lmpDate = _response.pregnancyDetail.lmpDate;
    this.ga = _response.pregnancyDetail.gestationalperiod
    this.spouseSubjectId = _response.primaryDetail.spouseSubjectId;
    this.spouseFirstName = _response.primaryDetail.spouseFirstName;
    this.spouseLastName = _response.primaryDetail.spouseLastName;

    if((_response.primaryDetail.childSubjectTypeId === 1 && _response.primaryDetail.spouseSubjectId === '') ||(_response.primaryDetail.childSubjectTypeId === 4 && _response.primaryDetail.spouseSubjectId === '' && _response.primaryDetail.gender === "Female")){
      this.uniqueSubjectId = _response.primaryDetail.uniqueSubjectId;
      this.trackingAnmSubjectTrackerRequest = {
        uniqueSubjectId: this.uniqueSubjectId
      }

    let subProfile = this.SubjectProfileService.getTrackingANWSubject(this.trackingAnmSubjectTrackerRequest)
      .subscribe(response => {
        this.trackingAnmSubjectTrackerResponse = response;
        this.loaderService.display(false);
        if (this.trackingAnmSubjectTrackerResponse !== null && this.trackingAnmSubjectTrackerResponse.status === "true") {
          // if (this.trackingAnmSubjectTrackerResponse.data.length <= 0 ) {
          //   this.subjectprofilelistErrorMessage = response.message;
          // }
          // else {
            this.anmSubjectTrackerItem = this.trackingAnmSubjectTrackerResponse.data;
            this.spouseSubjectIdValue = this.anmSubjectTrackerItem.spouseSubjectId;
            //this.rerender();
          }
        //}
        else {
          this.subjectprofilelistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.subjectprofilelistErrorMessage = err.toString();
        });


    }
    else if((_response.primaryDetail.childSubjectTypeId === 1 && _response.primaryDetail.spouseSubjectId !== '' ) || (_response.primaryDetail.childSubjectTypeId === 4 && _response.primaryDetail.spouseSubjectId !== '' && _response.primaryDetail.gender === "Female")){
      this.spouseSubjectId = _response.primaryDetail.spouseSubjectId;
      this.uniqueSubjectId = _response.primaryDetail.uniqueSubjectId;


      this.trackingAnmSubjectTrackerRequest = {
        uniqueSubjectId: this.uniqueSubjectId
      }

      let anmSubjectTracking = this.SubjectProfileService.getTrackingANWSubject(this.trackingAnmSubjectTrackerRequest)
        .subscribe(response => {

          this.trackingAnmSubjectTrackerResponse = response;
          this.loaderService.display(false);

              if (this.trackingAnmSubjectTrackerResponse !== null && this.trackingAnmSubjectTrackerResponse.status === "true") {
                this.anmSubjectTrackerItem = this.trackingAnmSubjectTrackerResponse.data;
              //this.spouseSamplingStatus = this.subjectTrackerItem.samplingStatus;
              this.trackingSubjectRequest = {
                uniqueSubjectId: this.spouseSubjectId
              }
              let subjectTracking = this.SubjectProfileService.getTrackingSubject(this.trackingSubjectRequest)
              .subscribe(response => {
                this.trackingSubjectResponse = response;
                if (this.trackingSubjectResponse !== null && this.trackingSubjectResponse.status === "true") {
                  // if (this.trackingAnmSubjectTrackerResponse.data.length <= 0 ) {
                  //   this.subjectprofilelistErrorMessage = response.message;
                  // }
                  // else {
                    this.subjectTrackerItem = this.trackingSubjectResponse.data;

                }
                else{
                  this.subjectprofilelistErrorMessage = response.message;
                }
              })

            }
          //}
          else {
            this.subjectprofilelistErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.subjectprofilelistErrorMessage = err.toString();
          });


      }
    else if((_response.primaryDetail.childSubjectTypeId === 2 ) || (_response.primaryDetail.childSubjectTypeId === 4 && _response.primaryDetail.gender === "Male" && _response.primaryDetail.spouseSubjectId !== '')){
      this.spouseSubjectId = _response.primaryDetail.spouseSubjectId;
      this.uniqueSubjectId = _response.primaryDetail.uniqueSubjectId;

      this.trackingSubjectRequest = {
        uniqueSubjectId: this.uniqueSubjectId
      }
      let subjectTracking = this.SubjectProfileService.getTrackingSubject(this.trackingSubjectRequest)
        .subscribe(response => {
          this.trackingSubjectResponse = response;
          this.loaderService.display(false);
          if (this.trackingSubjectResponse !== null && this.trackingSubjectResponse.status === "true") {
            // if (this.trackingAnmSubjectTrackerResponse.data.length <= 0 ) {
            //   this.subjectprofilelistErrorMessage = response.message;
            // }
            // else {
              this.subjectTrackerItem = this.trackingSubjectResponse.data;
              this.spouseSamplingStatus = this.subjectTrackerItem.samplingStatus;
              this.trackingAnmSubjectTrackerRequest = {
                uniqueSubjectId: this.spouseSubjectId
              }
              let anmSubjectTracking = this.SubjectProfileService.getTrackingANWSubject(this.trackingAnmSubjectTrackerRequest)
              .subscribe(response => {
                this.trackingAnmSubjectTrackerResponse = response;
                if (this.trackingAnmSubjectTrackerResponse !== null && this.trackingAnmSubjectTrackerResponse.status === "true") {
                  this.anmSubjectTrackerItem = this.trackingAnmSubjectTrackerResponse.data;

                }
                else{
                  this.subjectprofilelistErrorMessage = response.message;
                }
              });

            }
          //}
          else {
            this.subjectprofilelistErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.subjectprofilelistErrorMessage = err.toString();
          });


      }
      else if(_response.primaryDetail.childSubjectTypeId === 4 && _response.primaryDetail.gender === "Male" && _response.primaryDetail.spouseSubjectId === ''){
        this.uniqueSubjectId = _response.primaryDetail.uniqueSubjectId;
        this.trackingSubjectRequest = {
          uniqueSubjectId: this.uniqueSubjectId
        }

      let subProfile = this.SubjectProfileService.getTrackingANWSubject(this.trackingSubjectRequest)
        .subscribe(response => {
          this.trackingSubjectResponse = response;
          this.loaderService.display(false);
          if (this.trackingSubjectResponse !== null && this.trackingSubjectResponse.status === "true") {
            // if (this.trackingAnmSubjectTrackerResponse.data.length <= 0 ) {
            //   this.subjectprofilelistErrorMessage = response.message;
            // }
            // else {
              this.subjectTrackerItem = this.trackingSubjectResponse.data;
              this.spouseSubjectIdValue = this.anmSubjectTrackerItem.spouseSubjectId;
              //this.rerender();
            }
          //}
          else {
            this.subjectprofilelistErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.subjectprofilelistErrorMessage = err.toString();
          });


      }
      else if(_response.primaryDetail.childSubjectTypeId === 3){
        this.uniqueSubjectId = _response.primaryDetail.uniqueSubjectId;
        this.trackingAnmSubjectTrackerRequest = {
          uniqueSubjectId: this.uniqueSubjectId
        }

      let subProfile = this.SubjectProfileService.getTrackingANWSubject(this.trackingAnmSubjectTrackerRequest)
        .subscribe(response => {
          this.trackingAnmSubjectTrackerResponse = response;
          this.loaderService.display(false);
          if (this.trackingAnmSubjectTrackerResponse !== null && this.trackingAnmSubjectTrackerResponse.status === "true") {
            // if (this.trackingAnmSubjectTrackerResponse.data.length <= 0 ) {
            //   this.subjectprofilelistErrorMessage = response.message;
            // }
            // else {
              this.anmSubjectTrackerItem = this.trackingAnmSubjectTrackerResponse.data;
              this.spouseSubjectIdValue = this.anmSubjectTrackerItem.spouseSubjectId;

              this.loaderService.display(false);

              //this.rerender();
            }
          //}
          else {
            this.subjectprofilelistErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.subjectprofilelistErrorMessage = err.toString();
          });


      }

      },
      (err: HttpErrorResponse) => {
        this.subjectprofilelistErrorMessage = err.toString();
      });




      $('#fadeinModal').modal('show');


  }
}

