import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Output, EventEmitter,ViewChildren,QueryList, ChangeDetectorRef, ElementRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SubjectProfileRequest, ParticularSubjectProfileRequest, anmSubjectTrackerRequest, subjectTrackerRequest } from 'src/app/shared/anm-module/subject-profile/subject-profile-request';
import { SubjectProfileResponse, PrimaryDetail, AddressDetail, ParentDetail, PregnancyDetail, RetrieveSubjectProfileList, SubjectProfileList, trackingANWSubjectResponse, trackingSubjectResponse, ANMSubject, SubjectTrack } from 'src/app/shared/anm-module/subject-profile/subject-profile-response';
import { SubjectProfileService } from 'src/app/shared/anm-module/subject-profile/subject-profile.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { DataService } from 'src/app/shared/data.service';
import { TokenService } from 'src/app/shared/token.service';
import { Userrolelist, UserroleResponse } from 'src/app/shared/admin/add-users/add-users-response';
import { user } from 'src/app/shared/auth-response';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { StateList, StateResponse } from 'src/app/shared/admin/state/state-response';
import * as moment from 'moment';
import { PhcList } from 'src/app/shared/admin/add-phc/add-phc-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUsersService } from 'src/app/shared/admin/add-users/add-users.service';
import { AddDistrictService } from 'src/app/shared/admin/add-district/add-district.service';
declare var $: any;
import { PNDTCmasterService } from "../../shared/pndtc/pndtc-masterdata.service";
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { SampleCollectionService } from 'src/app/shared/anm-module/sample-collection.service';
import { DateService } from 'src/app/shared/utility/date.service';
import { CommonUsersTableComponent } from 'src/app/shared/anm-module/common-users-table/common-users-table.component';
import { DistrictList } from 'src/app/shared/admin/add-district/add-district-response';
import { AddUsersDataresponse, AddUsersResponse, UsersList } from 'src/app/shared/admin/add-users/add-users-response';


@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css']
})
export class AdminUsersListComponent implements AfterViewInit, OnDestroy, OnInit {


  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>;
 
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
   @ViewChild(CommonUsersTableComponent,{static:true}) commonDataTable: CommonUsersTableComponent;
  loadDataTable: boolean = false;
  //dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtOptions1: any = {};
  dtOptions2: any = {};
  dtTrigger: Subject<any> = new Subject();
  dtTrigger1: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();
  @ViewChild('startPicker', { static: false }) startPicker;
  @ViewChild('endPicker', { static: false }) endPicker;

  subjectProfileRequest: SubjectProfileRequest;
  particularanmSubProfile: ParticularSubjectProfileRequest;
  anmsubjectProfileResponse: RetrieveSubjectProfileList;
  trackingAnmSubjectTrackerRequest: anmSubjectTrackerRequest;
  trackingAnmSubjectTrackerResponse: trackingANWSubjectResponse;
  trackingSubjectRequest: subjectTrackerRequest;
  trackingSubjectResponse: trackingSubjectResponse;
  anmSubjectTrackerDetail: ANMSubject;
  anmSubjectTrackerItem: ANMSubject;
  subjectTrackerItem: SubjectTrack;
  childsubjectTrackerItem: SubjectTrack;

  subjectprofileLists: SubjectProfileList[]=[];
  subjectprofileItem: SubjectProfileList;
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
  firstName: string;
  middleName: string;
  lastName: string;
  religionId: number;
  religionName: string;
  casteId: number;
  casteName: string;
  communityId: number;
  communityName: string;
  address1: string;
  address2: string;
  address3: string;
  stateName: string;
  pincode: string;
  districtName: string;
  chcName: string;
  phcName: string;
  scName: string;
  riSite: string;
  dob: string;
  age: number;
  gender: string;
  mobileNo: string;
  emailId: string;
  spouseSubjectId: string;
  spouseFirstName: string;
  spouseMiddleName: string;
  spouseLastName: string;
  spouseContactNo: string;
  govIdTypeId: number;
  govIdType: string;
  govIdDetail: string;
  rchId: string;
  selectedUserrole: string;
  ecNumber: string;
  selectedDistrict = '';
  lmpDate: string;
  gestationalperiod: number;
  childSubjectTypeId: number;
  g: number;
  p: number;
  l: number;
  a: number;
  barcodes: string;
  ga: number;
  ANMdata;
  userslistErrorMessage: string;
  erroMessage;
  selectedphc  =false;
  CHCdata;
  phcListResponse;
  RIData;
  selectedRIpoint = null;
  subjectData;
  selectedBlock = null;
  selectedchc = null;
  selectedAnm = null;
  showDistrict = true;
  showBlock = true;
  globalTimeout = null;
  maintabSelected = 1;
  mainsubtabSelected = 1;
  getchc: string;
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
  disabledChc = false;

  chcsamplingstatusCount = '0';
  userprofileLists: UsersList[]=[];
  chcsampledCount = '0';
  chcnotsampledount = '0';
  statelists: StateList[];
  chcsCBCResultsCount = '0';
  chcCBCPositiveCount = '0';
  chcCBCNegativeCount = "0";
  chcSSTResultCount = "0";
  chcSSTPositiveCount = "0";
  chcSSTNegativeCount = "0";
  confirmationSelected: boolean ;
  userrolelists: Userrolelist[];
  districtlists: DistrictList[];
  userroleListResponse:UserroleResponse;
  HPLCResultCount = "0";
  HPLCAbnormalCount = "0";
  HPLCNormalCount = "0";
  selectedState: string;
  registeredCount = "0";
  subjectprofilelistErrorMessage: string;
  notregisteredCount = "0";
  stateListResponse: StateResponse;
  districtlistErrorMessage: string;
  counselledPNDTDisagreedCount = "0";
  counselledPNDTAgreedCount = "0";
  counsellingpendingCount = "0";
  counselledPNDTDecisionPendingCount = "0";
  districtListResponse;
  PNDTpendingCount = "0";
  PNDTcompletedCount = "0";
  AddUsersResponse:AddUsersResponse;
  phclistErrorMessage: string;
  PNDTNormalCount = "0";
  PNDTAffectedCount = "0";
  phclists: PhcList[];
  PNDTcarrierCount = "0";

  PNDcounsellingpendingCount = "0";
  PNDcounsellingMTPAgreedCount = "0";
  PNDcounsellingMTPDecisionPendingCount = "0";
  PNDCounselledMTPDisagreedCount = "0";

  MTPpendingCount = 0;
  MTPcompletedCount = 0;

  _headerData = [['SNo','Name','UserName','UserGovCode','ContactNo','Comments','IsActive','Edit'],
  ['SNo','Name','UserName','UserGovCode','District','Block','CHC','PHC','SC','ContactNo','Email','Comments','IsActive','Edit'],
  ['SNo','Name','UserName','UserGovCode','District','Block','CHC','PHC','SC','ContactNo','Email','Comments','IsActive','Edit'],
  ['SNo','Name','User Role','UserName','UserGovCode','District','Block','CHC','ContactNo','Email','Comments','IsActive','Edit'],
  ['SNo','Name','User Role','UserName','UserGovCode','District','ContactNo','Email','Comments','IsActive','Edit'],
  ['SNo','Name','UserName','UserGovCode','ContactNo','Email','Comments','IsActive','Edit'],
  ['SNo','Name','UserName','UserGovCode','ContactNo','Email','Comments','IsActive','Edit'],
  ['SNo','Name','UserName','UserGovCode','District','ContactNo','Email','Comments','IsActive','Edit'],
  ['SNo','Name','User Role','UserName','UserGovCode','ContactNo','Email','Comments','IsActive','Edit'],
  ['SNo','Name','UserName','UserGovCode','District','ContactNo','Email','Comments','IsActive','Edit'],
  ['SNo','Name','UserName','UserGovCode','District','Block','ContactNo','Email','Comments','IsActive','Edit'],
  ['SNo','Name','User Role','UserName','UserGovCode','ContactNo','Email','Comments','IsActive','Edit'],
  ['SNo','Name','User Role','UserName','UserGovCode','ContactNo','Email','Comments','IsActive','Edit'],
  ['SNo','Name','User Role','UserName','UserGovCode','ContactNo','Email','Comments','IsActive','Edit']];
  
  _keyData = [['name','userName','userGovCode','mobileNo','comments','isActive'],
  ['name','userName','userGovCode','districtName','blockName','chcName','phcName','scName','mobileNo','email','comments','isActive'],
  ['name','userName','userGovCode','districtName','blockName','chcName','phcName','scName','mobileNo','email','comments','isActive'],
  ['name','userRole','userName','userGovCode','districtName','blockName','chcName','mobileNo','email','comments','isActive'],
  ['name','userRole','userName','userGovCode','districtName','mobileNo','email','comments','isActive'],
  ['name','userName','userGovCode','mobileNo','email','comments','isActive'],
  ['name','userName','userGovCode','mobileNo','email','comments','isActive'],
  ['name','userName','userGovCode','districtName','mobileNo','email','comments','isActive'],
  ['name','userRole','userName','userGovCode','mobileNo','email','comments','isActive'],
  ['name','userName','userGovCode','districtName','mobileNo','email','comments','isActive'],
  ['name','userName','userGovCode','districtName','blockName','mobileNo','email','comments','isActive'],
  ['name','userRole','userName','userGovCode','mobileNo','email','comments','isActive'],
  ['name','userRole','userName','userGovCode','mobileNo','email','comments','isActive'],
  ['name','userRole','userName','userGovCode','mobileNo','email','comments','isActive']]
  tableHeader = [];
  curentObjectKey = [];

  // @Output("openAddUsers") openAddUser: EventEmitter<any> = new EventEmitter();
  constructor(
    private SubjectProfileService: SubjectProfileService,
    private DistrictService: AddDistrictService,
    private httpService: HttpClient,
    private UsersService:AddUsersService,
    private _formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private tokenService: TokenService,
    private dataservice: DataService,
    private router: Router,
    private PNDTCmasterService: PNDTCmasterService,
    private masterService: masterService,
    private modalService: NgbModal,
    private sampleCollectionService: SampleCollectionService,
    private DataService:DataService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({ "module": "Master", "page": "Users"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.dataservice.sendData(JSON.stringify({"tableHeader": ['SNo','Name','UserName','UserGovCode','District','Block','CHC','PHC','SC','ContactNo','Email','Comments','IsActive','Edit']}));
    this.loaderService.display(true);
    this.SubprofileInitializeDateRange();

    this.getRIpointData();
    this.getSubjectData();
    //this.getCHCData();


    this.tableHeader = this._headerData[0];
    this.curentObjectKey = this._keyData[0];
    var _obj = {
      fromDate: '',
      toDate: '',
      riId: 0,
      subjectTypeId:0,
      "searchSection":this.maintabSelected,
      "status":1,
      "userId": this.user.id,
    }
    //this.subjectprofileItem = new SubjectProfileList();
    let subProfile = this.UsersService.getUsersList(1)
      .subscribe(response => {
        console.log(response,"usercopygetuserlist");
        this.AddUsersResponse = response;
        this.loaderService.display(false);
        if (this.AddUsersResponse !== null && this.AddUsersResponse.status === "true") {
          if (this.AddUsersResponse.users.length <= 0 ) {
            this.subjectprofilelistErrorMessage = response.message;
            // this.subjectprofilelistErrorMessage = response.users;
            this.cdr.detectChanges();
            this.commonDataTable.resetTableFromParent();
          }
          else {
            this.userprofileLists = response.users;
            this.cdr.detectChanges();
            this.commonDataTable.resetTableFromParent();
            //this.rerender();
          }
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
  openAddUsers(addIlrDetail) {

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
    this.subjectprofileLists=[];
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
        this.loaderService.display(false);
        if (this.AddUsersResponse !== null && this.AddUsersResponse.status === "true") {
          if (this.AddUsersResponse.users.length <= 0 ) {
            this.subjectprofilelistErrorMessage = response.message;
            this.userprofileLists = response.users;
            this.cdr.detectChanges();
            this.commonDataTable.resetTableFromParent();
           // this.rerender();
          }
          else {
            this.userprofileLists = response.users;
            this.commonDataTable.resetTableFromParent();
            //this.cdr.detectChanges();
           // this.rerender();
          }
        }
        else {
          this.subjectprofilelistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.subjectprofilelistErrorMessage = err.toString();
        });
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
    let subProfile = this.UsersService.getUsersList(maintab)
      .subscribe(response => {
       if(maintab ===1)
       {
            if(subtab === 1)
                  this.countMain1Sub1 = response.users.length;
            if(subtab === 2)
                  this.countMain1Sub2 = response.users.length;
       }
       if(maintab ===2)
       {
            if(subtab === 1)
                  this.countMain2Sub1 = response.users.length;
            if(subtab === 2)
                  this.countMain2Sub2 = response.users.length;

       }
       if(maintab ===3)
       {
            if(subtab === 1)
                  this.countMain3Sub1 = response.users.length;
            if(subtab === 2)
                  this.countMain3Sub2 = response.users.length;
       }

       if(maintab ===4)
       {
            if(subtab === 1)
                  this.countMain4Sub1 = response.users.length;
            if(subtab === 2)
                  this.countMain4Sub1 = response.users.length;
            if(subtab === 3)
                  this.countMain4Sub3 = response.users.length;
            if(subtab === 4)
                  this.countMain4Sub4 = response.users.length;
            if(subtab === 5)
                  this.countMain4Sub5 = response.users.length;
       }

       if(maintab ===5)
       {
            if(subtab === 1)
                  this.countMain5Sub1 = response.users.length;
            if(subtab === 2)
                  this.countMain5Sub2 = response.users.length;
            if(subtab === 3)
                  this.countMain5Sub3 = response.users.length;
            if(subtab === 4)
                  this.countMain5Sub4 = response.users.length;
       }
       if(maintab ===6)
       {
            if(subtab === 1)
                  this.countMain6Sub1 = response.users.length;
            if(subtab === 2)
                  this.countMain6Sub2 = response.users.length;
            if(subtab === 3)
                  this.countMain6Sub3 = response.users.length;
            if(subtab === 4)
                  this.countMain6Sub4 = response.users.length;
            if(subtab === 5)
                  this.countMain6Sub5 = response.users.length;
       }
       if(maintab ===7)
       {
            if(subtab === 1)
                  this.countMain7Sub1 = response.users.length;
            if(subtab === 2)
                  this.countMain7Sub2 = response.users.length;
            if(subtab === 3)
                  this.countMain7Sub3 = response.users.length;
       }
       if(maintab ===8)
       {
            if(subtab === 1)
                  this.countMain8Sub1 = response.users.length;
            if(subtab === 2)
                  this.countMain8Sub2 = response.users.length;
            if(subtab === 3)
                  this.countMain8Sub3 = response.users.length;
            if(subtab === 4)
                  this.countMain8Sub4 = response.users.length;
            if(subtab === 5)
                  this.countMain8Sub5 = response.users.length;

       }
       if(maintab ===9)
       {
            if(subtab === 1)
                  this.countMain9Sub1 = response.users.length;
            if(subtab === 2)
                  this.countMain9Sub1 = response.users.length;
            if(subtab === 3)
                  this.countMain9Sub1 = response.users.length;

       }
       this.loaderService.display(false);
      },
        (err: HttpErrorResponse) => {
          this.subjectprofilelistErrorMessage = err.toString();
        });

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
        let subProfile =  this.UsersService.getUsersList(maintab)
          .subscribe(response => {
            this.AddUsersResponse = response;
            this.loaderService.display(false);
            if (this.AddUsersResponse !== null && this.AddUsersResponse.status === "true") {
              if (this.AddUsersResponse.users.length <= 0 ) {
                this.subjectprofilelistErrorMessage = response.message;
                this.userprofileLists = [];
                  //this.rerender();
              }
              else {
                this.userprofileLists = response.users;
                this.cdr.detectChanges();
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
      if (!changes[0]) return;
      const selectedDate1 = changes[0].getTime();
      this.anmSPToDate = moment(new Date(selectedDate1)).format("DD/MM/YYYY");

    });

  }

  rerender(): void {
    /*this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first   
      dtInstance.clear();   
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });*/
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      if (dtElement.dtInstance)
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
    });
    setTimeout(() => {
      this.dtTrigger1.next();
      this.dtTrigger2.next();
    });

  }   

  /*ngAfterViewInit(): void {
    this.dtTrigger.next();
  }   */

  ngAfterViewInit(): void {
   
 
  }


  custumTabClick(i,j)
  {
      this.maintabSelected = i;
      this.mainsubtabSelected = j;
      this.tableHeader = this._headerData[i-1];
      this.curentObjectKey = this._keyData[i-1];
      this.anmSubjectProfileList(1,i,j);
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  openpopup(subjectinfo){
    console.log(subjectinfo);
    this.loaderService.display(true);
    var _obj = {
      "userid":this.user.id,
      "userInput":subjectinfo.subjectId
    }
    let subProfile = this.SubjectProfileService.getparticularanmSubjectProfileList(_obj)
      .subscribe(response => {
        var _response = response.subjectsDetail[0];

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

