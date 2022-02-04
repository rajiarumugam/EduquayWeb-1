

declare var $: any;

import { Console } from 'console';

import { BlockList } from 'src/app/shared/admin/add-block/add-block-response';
import Swal from 'sweetalert2';
import { ChcList } from 'src/app/shared/admin/add-chc/add-chc-response';
import { type } from 'os';
import { AddScResponse, ScList } from 'src/app/shared/admin/add-sc/add-sc-response';
import { sample } from 'rxjs/operators';import { Component, OnInit, Pipe, NgZone, ViewChild, Output, EventEmitter,Input,  SimpleChanges, ChangeDetectorRef, ElementRef } from '@angular/core';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm} from '@angular/forms';
declare var $: any 
import { TokenService } from 'src/app/shared/token.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { SubjectProfileRequest, ParticularSubjectProfileRequest, anmSubjectTrackerRequest, subjectTrackerRequest } from 'src/app/shared/anm-module/subject-profile/subject-profile-request';
import { SubjectProfileResponse, PrimaryDetail, AddressDetail, ParentDetail, PregnancyDetail, RetrieveSubjectProfileList, SubjectProfileList, trackingANWSubjectResponse, trackingSubjectResponse, ANMSubject, SubjectTrack } from 'src/app/shared/anm-module/subject-profile/subject-profile-response';
import { SubjectProfileService } from 'src/app/shared/anm-module/subject-profile/subject-profile.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { Userrolelist, UserroleResponse } from 'src/app/shared/admin/add-users/add-users-response';
import { user } from 'src/app/shared/auth-response';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { StateList, StateResponse } from 'src/app/shared/admin/state/state-response';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUsersService } from 'src/app/shared/admin/add-users/add-users.service';
import { AddDistrictService } from 'src/app/shared/admin/add-district/add-district.service';
declare var $: any;
import { PhcList } from 'src/app/shared/admin/add-phc/add-phc-response';
import { SampleCollectionService } from 'src/app/shared/anm-module/sample-collection.service';
import { DateService } from 'src/app/shared/utility/date.service';
import { DistrictList } from 'src/app/shared/admin/add-district/add-district-response';

import { AddUsersDataresponse, AddUsersResponse, UsersList } from 'src/app/shared/admin/add-users/add-users-response';

@Component({
  selector: 'common-users-table',
  templateUrl: './common-users-table.component.html',
  styleUrls: ['./common-users-table.component.css']
})


export class CommonUsersTableComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('editsadminDetail',{static:true}) SadminEditForm: ElementRef;
  @ViewChild('editanmDetail',{static:true}) AnmEditForm: ElementRef;
  @ViewChild('editchcDetail',{static:true}) ChcEditForm: ElementRef;
  @ViewChild('edithplcdetail',{static:true}) HplcEditForm: ElementRef;
  @ViewChild('editpndtcDetail',{static:true}) PndtcEditForm: ElementRef;
  @ViewChild('editmtpDetail',{static:true}) MtpEditForm: ElementRef;
  @ViewChild('editdcDetail',{static:true}) DcEditForm: ElementRef;
  @ViewChild('editmolecularDetail',{static:true}) MolecularEditForm: ElementRef;
  @ViewChild('editspcDetail',{static:true}) SpcEditForm: ElementRef;
  @ViewChild('editnhmDetail',{static:true}) NhmEditForm: ElementRef;
  @ViewChild('editpndtDetail',{static:true}) PndtEditForm: ElementRef;
  @ViewChild('edithaematologistDetail',{static:true}) HaematalogistEditForm: ElementRef;
  @ViewChild('editsupportDetail',{static:true}) SupportEditForm: ElementRef;
  
  @Input() tableHeader:any = [];
  @Input() subjectprofileLists:any = [];
  @Input() maintabSelected:any;
  @Input() objkey:any = [];
  @Input() retrirveIlrlist:any = [];
  @Output() openpopup: EventEmitter<any> = new EventEmitter<any>(); 
  // @Output() retrirveIlrlist: EventEmitter<any> = new EventEmitter<any>();
  @Output() opensubjectdetails: EventEmitter<any> = new EventEmitter<any>(); 
  // @Output("openAddUsers") openAddUsers: EventEmitter<any> = new EventEmitter();
  user;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  subscription: Subscription;
  constructor(private SubjectProfileService: SubjectProfileService,
    private DistrictService: AddDistrictService,
    private httpService: HttpClient,
    private UsersService:AddUsersService,
    private _formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private tokenService: TokenService,
    private dataservice: DataService,
    private router: Router,

    private masterService: masterService,
    private modalService: NgbModal,
    private sampleCollectionService: SampleCollectionService,
    private DataService:DataService,
    private cdr: ChangeDetectorRef,
     zone: NgZone,
    
      ) { }
 
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
        State: any;
        userRole: string;
        userRoleDescription: string;
        userRoleAccessModule: string;
       

        userGovCode: string;
        districtlistErrorMessage: string;
        userName: string;
        riCode: string;
        phclists: PhcList[];
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
      anmSubjectTrackerDetail: ANMSubject;
      selectedEditPhc;
      anmSubjectTrackerItem: ANMSubject;
      chcListResponse;
      chclistErrorMessage: string;
      selectedEditUserrole: any;
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
      // selectedBlock= '';
      selectedEditDistrict: string;
      getphc: string;
      subjectTrackerItem: SubjectTrack;
      chclists: ChcList[];
      childsubjectTrackerItem: SubjectTrack;
      userprofileLists: UsersList[]=[];
      subjectprofileItem: SubjectProfileList;

      basicInfo: PrimaryDetail;
      // basicInfo: PrimaryDetail;
      socioDemographicInfo: AddressDetail;
      parentInfo: ParentDetail;
      personalInfo: PregnancyDetail;
      subjectid: string;
      getdistrict: string;
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
      subjectprofilelistErrorMessage: string;
      religionId: number;
      religionName: string;
      phcListResponse;
      scListResponse;
      userListRequest;
      casteId: number;
      casteName: string;
      communityId: number;
      userslistErrorMessage: string;
      sclists: ScList[];
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
      contactNo1: any;
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
      g: number;
      p: number;
      l: number;
      a: number;
      comments: string;
      getsc: string;
      barcodes: string;
      ga: number;
      ANMdata;
      erroMessage;
      selectedphc  =false;
      CHCdata;
      RIData;
      selectedRIpoint = null;
      subjectData;
  
  selectedchc = null;
  selectedAnm = null;
  showDistrict = true;
  showBlock = true;
  globalTimeout = null;
  // maintabSelected = 1;
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

  ngOnInit() {
    this.dataservice.sendData(JSON.stringify({ "module": "Master", "page": "Users"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
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

    
console.log(this.tableHeader);
    console.log(this.subjectprofileLists);
    console.log(this.objkey);
  }
  openAddUsers(FormToBeOpened) {

    //this.ddlChc();
    this.ddlState();
    this.ddlUserRole(this.maintabSelected);
    this.disabledChc = false;
    this.ddlDistrict();


    this.confirmationSelected = Boolean("True");
     

     
    this.modalService.open(
      FormToBeOpened, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
  
  
  }
  openEditUsers(subjectinfo){
    
    if(this.maintabSelected==1){
      
      this.openEditsadmin(this.SadminEditForm,subjectinfo)
      
    }
    if(this.maintabSelected==3){
      this.openEditanm(this.AnmEditForm, subjectinfo)
      
    }
    if(this.maintabSelected==4){
      this.openEditchc(this.ChcEditForm, subjectinfo)
      
    }
    if(this.maintabSelected==5){
      this.openEdithplc(this.HplcEditForm, subjectinfo)
      
    }
    if(this.maintabSelected==6){
      this.openEditpndtc(this.PndtcEditForm, subjectinfo)
      
    }
    if(this.maintabSelected==7){
      this.openEditmtp(this.MtpEditForm, subjectinfo)
      
    }
    if(this.maintabSelected==8){
      this.openEditdc(this.DcEditForm, subjectinfo)
      
    }
    if(this.maintabSelected==9){
      this.openEditmolecular(this.MolecularEditForm, subjectinfo)
      
    }
    if(this.maintabSelected==10){
      this.openEditspc(this.SpcEditForm, subjectinfo)
      
    }
    if(this.maintabSelected==11){
      this.openEditnhm(this.NhmEditForm, subjectinfo)
      
    }
    if(this.maintabSelected==12){
      this.openEditpndt(this.PndtEditForm, subjectinfo)
      
    }
    if(this.maintabSelected==13){
      this.openEdithaematologist(this.HaematalogistEditForm, subjectinfo)
      
    }
    if(this.maintabSelected==14){
      this.openEditsupport(this.SupportEditForm, subjectinfo)
      
    }
  }
  openEditsadmin(editsadminDetail,subjectinfo) {

    console.log(subjectinfo);
    this.id = subjectinfo.id;
       this.userTypeId=9;
     this.userRoleId=9;
      this.userGovCode=subjectinfo.userGovCode;
      this.userName=subjectinfo.userName  ;
      // this.password='odisha';
      this.editddlState();
      this.selectedEditState = subjectinfo.stateId;
      // this.centralLabId= 0;
      // this.molecularLabId=0 ;
      // this.districtId =0 ;
      // this. blockId =0;
      // this.chcId=0;
      // this.phcId=0;
      // this.scId=0;
      // this.riId=null  ;
     this.firstName=subjectinfo.firstName;
     this.middleName=subjectinfo.middleName;
     this.lastName=subjectinfo.lastName;
     this. mobileNo=subjectinfo.mobileNo;
    //  this.contactNo2=null;
     this.email=subjectinfo.email;
    //  this.govIdTypeId=0;
    //  this. govIdDetails=null;
    //  this.address=null;
    //  this. pincode=null;
    //  this.createdBy=subjectinfo.user.id ;
    //  this. updatedBy=subjectinfo.user.id ;
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
  openEditchc(editchcDetail, subjectinfo) {

    console.log(subjectinfo);
  
    this.id = subjectinfo.id;
      this.userGovCode=subjectinfo.userGovCode;
      this.userName=subjectinfo.userName  ;
      // this.password='odisha';
      this.editddlState();
      this.ddlEditChc(subjectinfo.blockId);
  
      this.ddlEditDistrict();
      //this.ddleditUserRole(type);
      this.selectedEditUserrole = subjectinfo.userRoleId;
      // this.ddlEdtiSc();
      //this.selectedEditUserrole = subjectinfo.userRoleId;
      this.selectedEditState = subjectinfo.stateId;
      this.selectedEditChc =subjectinfo.chcId;
  
      this.selectedEditDistrict = subjectinfo.districtId;
      // this.centralLabId= 0;
  
  
      this.ddlEditBlock(subjectinfo.districtId);
      this.selectedEditBlock =subjectinfo.blockId;
      // this.blockdata = subjectinfo.blockName;
      // this. blockId =0;
  
      // this.chcId=0;
  
      // this.phcId=0;
      // this.selectedEditSc = "" +(subjectinfo.scId)
      // this.scId=0;
  
     this.firstName=subjectinfo.firstName;
     this.middleName=subjectinfo.middleName;
     this.lastName=subjectinfo.lastName;
     this. mobileNo=subjectinfo.mobileNo;
    //  this.contactNo2=null;
     this.email=subjectinfo.email;
    //  this.govIdTypeId=0;
    //  this. govIdDetails=null;
    //  this.address=null;
    //  this. pincode=null;
    //  this.createdBy=subjectinfo.user.id ;
    //  this. updatedBy=subjectinfo.user.id ;
      this.comments= subjectinfo.comments;
      this.confirmationSelected = subjectinfo.isActive;
  
    // this.selectedEditBlock = "" +(subjectinfo.blockId)
   console.log(this.firstName);
  
  
    this.modalService.open(
      editchcDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
  
  }
  openEdithplc(edithplcdetail, subjectinfo) {

    console.log(subjectinfo);
  
    this.id = subjectinfo.id;
      this.userGovCode=subjectinfo.userGovCode;
      this.userName=subjectinfo.userName  ;
      // this.password='odisha';
    //  this.ddleditUserRole(type);
      this.selectedEditUserrole = subjectinfo.userRoleId;
      this.editddlState();
      this.selectedEditState = subjectinfo.stateId;
      this.ddlEditDistrict();
   this.selectedEditDistrict = subjectinfo.districtId;
  
   this.ddlEditBlock(subjectinfo.districtId);
   this.selectedEditBlock =subjectinfo.blockId;
  
     this.firstName=subjectinfo.firstName;
     this.middleName=subjectinfo.middleName;
     this.lastName=subjectinfo.lastName;
     this. mobileNo=subjectinfo.mobileNo;
  
     this.email=subjectinfo.email;
  
      this.comments= subjectinfo.comments;
      this.confirmationSelected = subjectinfo.isActive;
  
   console.log(this.firstName);
  
  
    this.modalService.open(
      edithplcdetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
  
  }
  openEditpndtc(editpndtcDetail, subjectinfo) {

    console.log(subjectinfo);
  
    this.id = subjectinfo.id;
      this.userGovCode=subjectinfo.userGovCode;
      this.userName=subjectinfo.userName  ;
      // this.password='odisha';
      this.ddlEditDistrict();
      this.editddlState();
      this.selectedEditState = subjectinfo.stateId;
      this.selectedEditDistrict = subjectinfo.districtId;
      this.ddlEditBlock(subjectinfo.districtId);
      this.selectedEditBlock =subjectinfo.blockId;
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
      editpndtcDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
  
  }
  openEditmtp(editmtpDetail, subjectinfo) {

    console.log(subjectinfo);
  
    this.id = subjectinfo.id;
      this.userGovCode=subjectinfo.userGovCode;
      this.userName=subjectinfo.userName  ;
      // this.password='odisha';
      this.editddlState();
      this.ddlEditDistrict();
      this.selectedEditState = subjectinfo.stateId;
      this.selectedEditDistrict = subjectinfo.districtId;
     this.ddlEditBlock(subjectinfo.districtId);
      this.selectedEditBlock =subjectinfo.blockId;
     this.firstName=subjectinfo.firstName;
     this.middleName=subjectinfo.middleName;
     this.lastName=subjectinfo.lastName;
     this. mobileNo=subjectinfo.mobileNo;
     this.email=subjectinfo.email;
      this.comments= subjectinfo.comments;
      this.confirmationSelected = subjectinfo.isActive;
   console.log(this.firstName);
  
  
    this.modalService.open(
      editmtpDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
  
  }
  openEditdc(editdcDetail, subjectinfo) {

    console.log(subjectinfo);
  
    this.id = subjectinfo.id;
      this.userGovCode=subjectinfo.userGovCode;
      this.userName=subjectinfo.userName  ;
      // this.password='odisha';
      this.editddlState();
      this.ddlEditChc(subjectinfo.blockId);
  
      this.ddlEditDistrict();
    //  this.ddleditUserRole(type);
      this.selectedEditUserrole = subjectinfo.userRoleId;
      // this.ddlEdtiSc();
      this.selectedEditUserrole = subjectinfo.userRoleId;
      this.selectedEditState = subjectinfo.stateId;
      this.selectedEditChc =subjectinfo.chcId;
  
      this.selectedEditDistrict = subjectinfo.districtId;
      // this.centralLabId= 0;
  
  
      this.ddlEditBlock(subjectinfo.districtId);
      this.selectedEditBlock =subjectinfo.blockId;
      // this.blockdata = subjectinfo.blockName;
      // this. blockId =0;
  
      // this.chcId=0;
  
      // this.phcId=0;
      // this.selectedEditSc = "" +(subjectinfo.scId)
      // this.scId=0;
  
     this.firstName=subjectinfo.firstName;
     this.middleName=subjectinfo.middleName;
     this.lastName=subjectinfo.lastName;
     this. mobileNo=subjectinfo.mobileNo;
    //  this.contactNo2=null;
     this.email=subjectinfo.email;
    //  this.govIdTypeId=0;
    //  this. govIdDetails=null;
    //  this.address=null;
    //  this. pincode=null;
    //  this.createdBy=subjectinfo.user.id ;
    //  this. updatedBy=subjectinfo.user.id ;
      this.comments= subjectinfo.comments;
      this.confirmationSelected = subjectinfo.isActive;
  
    // this.selectedEditBlock = "" +(subjectinfo.blockId)
   console.log(this.firstName);
  
  
    this.modalService.open(
      editdcDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
  
  }
  openEditmolecular(editmolecularDetail, subjectinfo) {

    console.log(subjectinfo);
  
    this.id = subjectinfo.id;
      this.userGovCode=subjectinfo.userGovCode;
      this.userName=subjectinfo.userName  ;
      // this.password='odisha';
      this.editddlState();
      this.ddlEditChc(subjectinfo.blockId);
  
      this.ddlEditDistrict();
     // this.ddleditUserRole(type);
      this.selectedEditUserrole = subjectinfo.userRoleId;
      // this.ddlEdtiSc();
      this.selectedEditUserrole = subjectinfo.userRoleId;
      this.selectedEditState = subjectinfo.stateId;
      this.selectedEditChc =subjectinfo.chcId;
  
      this.selectedEditDistrict = subjectinfo.districtId;
      // this.centralLabId= 0;
  
  
      this.ddlEditBlock(subjectinfo.districtId);
      this.selectedEditBlock =subjectinfo.blockId;
      // this.blockdata = subjectinfo.blockName;
      // this. blockId =0;
  
      // this.chcId=0;
  
      // this.phcId=0;
      // this.selectedEditSc = "" +(subjectinfo.scId)
      // this.scId=0;
  
     this.firstName=subjectinfo.firstName;
     this.middleName=subjectinfo.middleName;
     this.lastName=subjectinfo.lastName;
     this. mobileNo=subjectinfo.mobileNo;
    //  this.contactNo2=null;
     this.email=subjectinfo.email;
    //  this.govIdTypeId=0;
    //  this. govIdDetails=null;
    //  this.address=null;
    //  this. pincode=null;
    //  this.createdBy=subjectinfo.user.id ;
    //  this. updatedBy=subjectinfo.user.id ;
      this.comments= subjectinfo.comments;
      this.confirmationSelected = subjectinfo.isActive;
  
    // this.selectedEditBlock = "" +(subjectinfo.blockId)
   console.log(this.firstName);
  
  
    this.modalService.open(
      editmolecularDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
  
  }

  openEditspc(editspcDetail, subjectinfo) {

    console.log(subjectinfo);
  
    this.id = subjectinfo.id;
      this.userGovCode=subjectinfo.userGovCode;
      this.userName=subjectinfo.userName  ;
      // this.password='odisha';
      this.editddlState();
      this.ddlEditChc(subjectinfo.blockId);
  
      this.ddlEditDistrict();
     // this.ddleditUserRole(type);
      this.selectedEditUserrole = subjectinfo.userRoleId;
      // this.ddlEdtiSc();
      this.selectedEditUserrole = subjectinfo.userRoleId;
      this.selectedEditState = subjectinfo.stateId;
      this.selectedEditChc =subjectinfo.chcId;
  
      this.selectedEditDistrict = subjectinfo.districtId;
      // this.centralLabId= 0;
  
  
      this.ddlEditBlock(subjectinfo.districtId);
      this.selectedEditBlock =subjectinfo.blockId;
      // this.blockdata = subjectinfo.blockName;
      // this. blockId =0;
  
      // this.chcId=0;
  
      // this.phcId=0;
      // this.selectedEditSc = "" +(subjectinfo.scId)
      // this.scId=0;
  
     this.firstName=subjectinfo.firstName;
     this.middleName=subjectinfo.middleName;
     this.lastName=subjectinfo.lastName;
     this. mobileNo=subjectinfo.mobileNo;
    //  this.contactNo2=null;
     this.email=subjectinfo.email;
    //  this.govIdTypeId=0;
    //  this. govIdDetails=null;
    //  this.address=null;
    //  this. pincode=null;
    //  this.createdBy=subjectinfo.user.id ;
    //  this. updatedBy=subjectinfo.user.id ;
      this.comments= subjectinfo.comments;
      this.confirmationSelected = subjectinfo.isActive;
  
    // this.selectedEditBlock = "" +(subjectinfo.blockId)
   console.log(this.firstName);
  
  
    this.modalService.open(
      editspcDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
  
  
  }
  openEditnhm(editnhmDetail, subjectinfo) {

    console.log(subjectinfo);
  
    this.id = subjectinfo.id;
      this.userGovCode=subjectinfo.userGovCode;
      this.userName=subjectinfo.userName  ;
      this.editddlState();
      this.ddlEditChc(subjectinfo.blockId);
      this.ddlEditDistrict();
    //  this.ddleditUserRole(type);
      this.selectedEditUserrole = subjectinfo.userRoleId;
      this.selectedEditUserrole = subjectinfo.userRoleId;
      this.selectedEditState = subjectinfo.stateId;
      this.selectedEditChc =subjectinfo.chcId;
      this.selectedEditDistrict = subjectinfo.districtId;
      this.ddlEditBlock(subjectinfo.districtId);
      this.selectedEditBlock =subjectinfo.blockId;
     this.firstName=subjectinfo.firstName;
     this.middleName=subjectinfo.middleName;
     this.lastName=subjectinfo.lastName;
     this. mobileNo=subjectinfo.mobileNo;
     this.email=subjectinfo.email;
      this.comments= subjectinfo.comments;
      this.confirmationSelected = subjectinfo.isActive;
  
   console.log(this.firstName);
  
  
    this.modalService.open(
      editnhmDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
  
  }

  openEditpndt(editpndtDetail, subjectinfo) {

    console.log(subjectinfo);
  
    this.id = subjectinfo.id;
      this.userGovCode=subjectinfo.userGovCode;
      this.userName=subjectinfo.userName  ;
      // this.password='odisha';
      this.editddlState();
      this.ddlEditChc(subjectinfo.blockId);
  
      this.ddlEditDistrict();
     // this.ddleditUserRole(type);
      this.selectedEditUserrole = subjectinfo.userRoleId;
      // this.ddlEdtiSc();
      this.selectedEditUserrole = subjectinfo.userRoleId;
      this.selectedEditState = subjectinfo.stateId;
      this.selectedEditChc =subjectinfo.chcId;
  
      this.selectedEditDistrict = subjectinfo.districtId;
      // this.centralLabId= 0;
  
  
      this.ddlEditBlock(subjectinfo.districtId);
      this.selectedEditBlock =subjectinfo.blockId;
      // this.blockdata = subjectinfo.blockName;
      // this. blockId =0;
  
      // this.chcId=0;
  
      // this.phcId=0;
      // this.selectedEditSc = "" +(subjectinfo.scId)
      // this.scId=0;
  
     this.firstName=subjectinfo.firstName;
     this.middleName=subjectinfo.middleName;
     this.lastName=subjectinfo.lastName;
     this. mobileNo=subjectinfo.mobileNo;
    //  this.contactNo2=null;
     this.email=subjectinfo.email;
    //  this.govIdTypeId=0;
    //  this. govIdDetails=null;
    //  this.address=null;
    //  this. pincode=null;
    //  this.createdBy=subjectinfo.user.id ;
    //  this. updatedBy=subjectinfo.user.id ;
      this.comments= subjectinfo.comments;
      this.confirmationSelected = subjectinfo.isActive;
  
    // this.selectedEditBlock = "" +(subjectinfo.blockId)
   console.log(this.firstName);
  
  
    this.modalService.open(
      editpndtDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
  
  }
  openEdithaematologist(edithaematologistDetail, subjectinfo) {

    console.log(subjectinfo);
  
    this.id = subjectinfo.id;
      this.userGovCode=subjectinfo.userGovCode;
      this.userName=subjectinfo.userName  ;
      this.editddlState();
      this.ddlEditChc(subjectinfo.blockId);
      this.ddlEditDistrict();
    //  this.ddleditUserRole(type);
      this.selectedEditUserrole = subjectinfo.userRoleId;
      this.selectedEditUserrole = subjectinfo.userRoleId;
      this.selectedEditState = subjectinfo.stateId;
      this.selectedEditChc =subjectinfo.chcId;
      this.selectedEditDistrict = subjectinfo.districtId;
      this.ddlEditBlock(subjectinfo.districtId);
      this.selectedEditBlock =subjectinfo.blockId;
     this.firstName=subjectinfo.firstName;
     this.middleName=subjectinfo.middleName;
     this.lastName=subjectinfo.lastName;
     this. mobileNo=subjectinfo.mobileNo;
     this.email=subjectinfo.email;
      this.comments= subjectinfo.comments;
      this.confirmationSelected = subjectinfo.isActive;
  
   console.log(this.firstName);
  
  
    this.modalService.open(
      edithaematologistDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
  
  }
  openEditsupport(editsupportDetail, subjectinfo) {

    console.log(subjectinfo);
  
    this.id = subjectinfo.id;
      this.userGovCode=subjectinfo.userGovCode;
      this.userName=subjectinfo.userName  ;
      // this.password='odisha';
      this.editddlState();
      this.ddlEditChc(subjectinfo.blockId);
  
      this.ddlEditDistrict();
   //   this.ddleditUserRole(type);
      this.selectedEditUserrole = subjectinfo.userRoleId;
      // this.ddlEdtiSc();
      this.selectedEditUserrole = subjectinfo.userRoleId;
      this.selectedEditState = subjectinfo.stateId;
      this.selectedEditChc =subjectinfo.chcId;
  
      this.selectedEditDistrict = subjectinfo.districtId;
      // this.centralLabId= 0;
  
  
      this.ddlEditBlock(subjectinfo.districtId);
      this.selectedEditBlock =subjectinfo.blockId;
      // this.blockdata = subjectinfo.blockName;
      // this. blockId =0;
  
      // this.chcId=0;
  
      // this.phcId=0;
      // this.selectedEditSc = "" +(subjectinfo.scId)
      // this.scId=0;
  
     this.firstName=subjectinfo.firstName;
     this.middleName=subjectinfo.middleName;
     this.lastName=subjectinfo.lastName;
     this. mobileNo=subjectinfo.mobileNo;
    //  this.contactNo2=null;
     this.email=subjectinfo.email;
    //  this.govIdTypeId=0;
    //  this. govIdDetails=null;
    //  this.address=null;
    //  this. pincode=null;
    //  this.createdBy=subjectinfo.user.id ;
    //  this. updatedBy=subjectinfo.user.id ;
      this.comments= subjectinfo.comments;
      this.confirmationSelected = subjectinfo.isActive;
  
    // this.selectedEditBlock = "" +(subjectinfo.blockId)
   console.log(this.firstName);
  
  
    this.modalService.open(
      editsupportDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
  
  }

  openEditanm(editanmDetail, subjectinfo) {

    console.log(subjectinfo);
  
    this.id = subjectinfo.id;
      this.userGovCode=subjectinfo.userGovCode;
      this.userName=subjectinfo.userName  ;
      this.ddlEditDistrict();
      this.ddlEditBlock(subjectinfo.districtId);
      this.editddlState();
      this.ddlEditChc(subjectinfo.blockId);
      this.ddlEdtiSc(subjectinfo.phcId);
      this.ddlEdtiPhc(subjectinfo.chcId);
  
      this.selectedEditState = subjectinfo.stateId;
      this.selectedEditChc =subjectinfo.chcId;
      this.selectedEditPhc =subjectinfo.phcId;
      this.selectedEditDistrict = subjectinfo.districtId;
      this.selectedEditBlock =subjectinfo.blockId;
      this.selectedEditSc=subjectinfo.scId;
  
     this.firstName=subjectinfo.firstName;
     this.middleName=subjectinfo.middleName;
     this.lastName=subjectinfo.lastName;
     this. mobileNo=subjectinfo.mobileNo;
  
     this.email=subjectinfo.email;
      this.comments= subjectinfo.comments;
      this.confirmationSelected = subjectinfo.isActive;
  
   console.log(this.firstName);
  
  
    this.modalService.open(
      editanmDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
  
  }
  ddlEditChc(id) {
    console.log(id);
    let district = this.UsersService.getCHCByBlock(id).subscribe(response => {
      this.chcListResponse = response;
      if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
        this.chclists = this.chcListResponse.data;
        // this.selectedEditChc = this.getchc;

      }
      else {
        this.sclistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.sclistErrorMessage = err.toString();

      });
  }
  ddlEdtiSc(code) {

    //this.selectedEditPhc = '';
    let district = this.UsersService.getscbyphc(code).subscribe(response => {
      this.scListResponse = response;
      if (this.scListResponse !== null && this.scListResponse.status === "true") {
        this.sclists = this.scListResponse.data;
        // if(this.sclists.length > 0){
        //   this.selectedEditSc = this.getsc;

        // }

      }
      else {
        this.ripointlistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.ripointlistErrorMessage = err.toString();

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
  ddlEditBlock(code) {
    this.selectedBlock = '';
    let district = this.UsersService.getBlocklist(code).subscribe(response => {
      this.blockListResponse = response;
      if (this.blockListResponse !== null && this.blockListResponse.status === "true") {
        this.blocklists = this.blockListResponse.data;

      }
      else {
        this.chclistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.chclistErrorMessage = err.toString();

      });
  }
  ddlEditDistrict() {
    let district = this.UsersService.getDistrictList().subscribe(response => {
      this.districtListResponse = response;
      if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
        this.districtlists = this.districtListResponse.data;

      }
      else {
        this.userslistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.userslistErrorMessage = err.toString();

      });
  }
  ddleditUserRole(type) {
    let district = this.UsersService.getUserroleListType(type).subscribe(response => {
      this.userroleListResponse = response;
      if (this.userroleListResponse !== null && this.userroleListResponse.status === "true") {
        this.userrolelists = this.userroleListResponse.userRoles;
        // this.selectedEditUserrole = this.getstate;
      }
      else {
        this.userslistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.userslistErrorMessage = err.toString();

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
  onChangeBlock(event) {

    if (this.selectedBlock === '') {
      this.selectedChc = '';
    }
    else {
      this.ddlChc(this.selectedBlock);
    }
  }

  ddlChc(id) {
    console.log(id);
        this.selectedChc = '';
    
        let district = this.UsersService.getCHCByBlock(id).subscribe(response => {
          this.chcListResponse = response;
          console.log(this.chcListResponse);
          if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
            this.chclists = this.chcListResponse.data;
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
    
   onChangeChc(event) {
    console.log(this.selectedChc);
      if (this.selectedChc === '') {
        this.selectedPhc = '';
      }
      else {
        this.ddlPhc(this.selectedChc);
      }
    }
    ddlPhc(code) {
      this.selectedPhc = '';
      let district = this.UsersService.getPhcbychc(code).subscribe(response => {
        this.phcListResponse = response;
        console.log(this.phcListResponse);
        if (this.phcListResponse !== null && this.phcListResponse.status === "true") {
          this.phclists = this.phcListResponse.data;
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
    ddlSc(code) {
      this.selectedPhc = '';
      console.log(code);
      let district = this.UsersService.getscbyphc(code).subscribe(response => {
        this.scListResponse = response;
        console.log(this.scListResponse);
        if (this.scListResponse !== null && this.scListResponse.status === "true") {
          this.sclists = this.scListResponse.data;
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
  ddlEdtiPhc(code) {
    // this.selectedEditPhc = '';
    let district = this.UsersService.getPhcbychc(code).subscribe(response => {
      this.phcListResponse = response;
      if (this.phcListResponse !== null && this.phcListResponse.status === "true") {
        this.phclists = this.phcListResponse.data;
        // if(this.phclists.length > 0){
        //   this.selectedEditPhc = this.getphc;

        // }

      }
      else {
        this.sclistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.sclistErrorMessage = err.toString();

      });
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
        this.showResponseMessage('Sadmin User added Sucessfully', 's')
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
  onSubmitanm(addIlrForm: NgForm){

    console.log(addIlrForm.value);
    this.selectedDistrict = addIlrForm.value.ddlDistrict;
    this.selectedBlock = addIlrForm.value.ddlBlock;
    this.selectedChc = addIlrForm.value.ddlChc;
    this.selectedPhc = addIlrForm.value.ddlPhc;
    this.selectedSc = addIlrForm.value.ddlSc;
    this.riId = addIlrForm.value.riId;
    // this.userName = addIlrForm.value.Username;
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
        userName:this.email,
        password:'odisha',
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
       this.showResponseMessage('ANM User added Successfully', 's')
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
  // this.userName = addIlrForm.value.Username;
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
      userName:this.email,
      password:'odisha',
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
    this.showResponseMessage('CHC User added Sucessfully', 's')
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
// this.userName = addIlrForm.value.Username;
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
    userName:this.email,
    password:'odisha',
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
  this.showResponseMessage('HPLC User added Sucessfully', 's')
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
// this.userName = addIlrForm.value.Username;
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
  userRoleId:9,
    userGovCode:this.userGovCode,
    userName:this.email,
    password:'odisha',
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
  this.showResponseMessage('PNDTC User added Sucessfully', 's')
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
// this.userName = addIlrForm.value.Username;
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
  userRoleId:11,
    userGovCode:this.userGovCode,
    userName:this.email,
    password:'odisha',
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
    this.showResponseMessage('MTP User added Sucessfully', 's')
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
// this.userName = addIlrForm.value.Username;
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
  userRoleId:12,
    userGovCode:this.userGovCode,
    userName:this.email,
    password:'odisha',
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
  this.showResponseMessage('DC User added Sucessfully', 's')
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
// this.userName = addIlrForm.value.Username;
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
  userRoleId:+(this.selectedUserrole),
    userGovCode:this.userGovCode,
    userName:this.email,
    password:'odisha',
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
  this.showResponseMessage('Molecular Lab User added Sucessfully', 's')
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
// this.userName = addIlrForm.value.Username;
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
  userTypeId:10,
  userRoleId:14,
    userGovCode:this.userGovCode,
    userName:this.email,
    password:'odisha',
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
  this.showResponseMessage('SPC User added Sucessfully', 's')
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
// this.userName = addIlrForm.value.Username;
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
  userTypeId:11,
  userRoleId:15,
    userGovCode:this.userGovCode,
    userName:this.email,
    password:'odisha',
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
  this.showResponseMessage('NHM User added Sucessfully', 's')
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
// this.userName = addIlrForm.value.Username;
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
  userTypeId:12,
  userRoleId:10,
    userGovCode:this.userGovCode,
    userName:this.email,
    password:'odisha',
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
  this.showResponseMessage('PNDT User added Sucessfully', 's')
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

onSubmithaematologist(addIlrForm: NgForm){

console.log(addIlrForm.value);
// this.selectedUserrole = addIlrForm.value.ddlUserRole;
this.selectedDistrict = addIlrForm.value.ddlDistrict;
this.selectedBlock = addIlrForm.value.ddlBlock;
// this.userName = addIlrForm.value.Username;
this.firstName = addIlrForm.value.firstName;
this.middleName = addIlrForm.value.middleName;
this.lastName = addIlrForm.value.lastName;
this.contactNo1 = addIlrForm.value.contactNo1;
this.userGovCode = addIlrForm.value.userGovCode;
this.selectedState = addIlrForm.value.ddlState;
this.email = addIlrForm.value.email;
this.comments = addIlrForm.value.Comments;

console.log(addIlrForm);
this.Userslistrequest = {
  userTypeId:13,
  userRoleId:17,
    userGovCode:this.userGovCode,
    userName:this.email,
    password:'odisha',
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
  this.showResponseMessage('Haematologist User added Sucessfully', 's')
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
// this.userName = addIlrForm.value.Username;
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
  userTypeId:14,
  userRoleId:18,
    userGovCode:this.userGovCode,
    userName:this.email,
    password:'odisha',
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
  this.showResponseMessage('Support Admin User added Sucessfully', 's')
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
      contactNo1:this.mobileNo,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:null,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
      isActive: (this.confirmationSelected? "1": "0")
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

editsubmitanm(editanmForm: NgForm){
  console.log(editanmForm.value);
 
   // this.userName = editanmForm.value.userName;
     this.firstName = editanmForm.value.firstName;
     this.riId = editanmForm.value.riId;
     this.middleName = editanmForm.value.middleName;
     this.lastName = editanmForm.value.lastName;
     // this.userGovCode = editanmForm.value.userGovCode;
     this.email = editanmForm.value.email;
     // this.selectedEditChc = editanmForm.value.ddlChc;
     // this.selectedEditState = editanmForm.value.ddlState;
     //   this.selectedEditPhc = editanmForm.value.ddlPhc;
     //  this.selectedEditDistrict = editanmForm.value.ddlDistrict;
     // this.selectedEditSc = editanmForm.value.ddlSc;
     //   this.selectedEditBlock = editanmForm.value.ddlBlock;
     this.mobileNo = editanmForm.value.mobileNo;
     this.comments = editanmForm.value.Comments;
 
   this.userListRequest = {
     id:this.id ,
     userTypeId:3,
     userRoleId:3,
     userGovCode:this.userGovCode,
       userName:this.userName,
       password:'odisha',
       stateId: +(this.selectedEditState),
       centralLabId: 0,
 
       molecularLabId: 0,
       districtId: +(this.selectedEditDistrict),
         blockId: +(this.selectedEditBlock),
         chcId: +(this.selectedEditChc),
         phcId: +(this.selectedEditPhc),
         scId: +(this.selectedEditSc),
       riId:this.riId,
       firstName:this.firstName,
       middleName:this.middleName,
       lastName:this.lastName,
       contactNo1:this.mobileNo,
       contactNo2:null,
       email:this.email,
       govIdTypeId:0,
       govIdDetails:null,
       address:null,
       pincode:null,
       createdBy:this.user.id ,
       updatedBy:this.user.id ,
       comments: this.comments,
     isActive:(this.confirmationSelected? "1": "0")
   };
   console.log(this.userListRequest);
 
   //Remove below 2 lines after successfully tested
   // this.showResponseMessage('Successfully registered', 's');
   // return false;
 
   let damagedsampleCollection = this.UsersService.updateusers(this.userListRequest)
   .subscribe(response => {
     this.AddUsersResponse = response;
     if(this.AddUsersResponse !== null){
       this.showResponseMessage('ANM user Updated succesfully ', 's')
        this.retrirveIlrlist();
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
 
 editsubmitchc(editchcform: NgForm){
  console.log("abc");
  console.log(editchcform.value);
    // this.userName = editchcform.value.userName;
    this.firstName = editchcform.value.firstName;
    this.middleName = editchcform.value.middleName;
    this.lastName = editchcform.value.lastName;
    // this.userGovCode = editchcform.value.userGovCode;
    this.email = editchcform.value.email;
    // this.selectedEditChc = editchcform.value.ddlChc;
    // this.selectedEditUserrole = editchcform.value.ddlUserRole;
    // this.selectedEditState = editchcform.value.ddlState;
    //  this.selectedEditDistrict = editchcform.value.ddlDistrict;
    //   this.selectedEditBlock = editchcform.value.ddlBlock;
    this.mobileNo = editchcform.value.mobileNo;
    this.comments = editchcform.value.Comments;

  this.userListRequest = {
    id:this.id ,
    userTypeId:4,
   userRoleId:6,
    userGovCode:this.userGovCode,
      userName:this.userName,
      password:'odisha',
      stateId: +(this.selectedEditState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: +(this.selectedEditDistrict),
        blockId: +(this.selectedEditBlock),
        chcId: +(this.selectedEditChc),
        phcId: 0,
        scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.mobileNo,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:null,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
    isActive:(this.confirmationSelected? "1": "0")
  };
  console.log(this.userListRequest);

  //Remove below 2 lines after successfully tested
  // this.showResponseMessage('Successfully registered', 's');
  // return false;

  let damagedsampleCollection = this.UsersService.updateusers(this.userListRequest)
  .subscribe(response => {
    this.AddUsersResponse = response;
    if(this.AddUsersResponse !== null){
      this.showResponseMessage('CHC user Updated Sucessfully', 's')
       this.retrirveIlrlist();
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
editSubmithplc(edithplcform: NgForm){

  console.log(edithplcform.value);
    this.firstName = edithplcform.value.firstName;
    this.middleName = edithplcform.value.middleName;
    this.lastName = edithplcform.value.lastName;
    this.email = edithplcform.value.email;
    // this.selectedEditChc = edithplcform.value.ddlChc;
    // this.selectedEditUserrole = edithplcform.value.ddlUserRole;
    // this.selectedEditState = edithplcform.value.ddlState;
    //  this.selectedEditDistrict = edithplcform.value.ddlDistrict;
    //   this.selectedEditBlock = edithplcform.value.ddlBlock;
    this.mobileNo = edithplcform.value.mobileNo;
    this.comments = edithplcform.value.Comments;

  this.userListRequest = {
    id:this.id ,
    userTypeId:5,
    userRoleId:0,
    userGovCode:this.userGovCode,
      userName:this.userName,
      password:'odisha',
      stateId: +(this.selectedEditState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: +(this.selectedEditDistrict),
        blockId: 0,
        chcId: 0,
        phcId: 0,
        scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.mobileNo,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:null,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
    isActive:(this.confirmationSelected? "1": "0")
  };
  console.log(this.userListRequest);

  //Remove below 2 lines after successfully tested
  // this.showResponseMessage('Successfully registered', 's');
  // return false;

  let damagedsampleCollection = this.UsersService.updateusers(this.userListRequest)
  .subscribe(response => {
    this.AddUsersResponse = response;
    if(this.AddUsersResponse !== null){
      this.showResponseMessage('HPLC user Updated Sucessfully', 's')
       this.retrirveIlrlist();
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
editSubmitpndtc(edithplcform: NgForm){

  console.log(edithplcform.value);
    // this.userName = edithplcform.value.userName;
    this.firstName = edithplcform.value.firstName;
    this.middleName = edithplcform.value.middleName;
    this.lastName = edithplcform.value.lastName;
    // this.userGovCode = edithplcform.value.userGovCode;
    this.email = edithplcform.value.email;
    // this.selectedEditState = edithplcform.value.ddlState;
    //  this.selectedEditDistrict = edithplcform.value.ddlDistrict;
    //   this.selectedEditBlock = edithplcform.value.ddlBlock;
    this.mobileNo = edithplcform.value.mobileNo;
    this.comments = edithplcform.value.Comments;

  this.userListRequest = {
    id:this.id ,
    userTypeId:6,
    userRoleId:9,
    userGovCode:this.userGovCode,
      userName:this.userName,
      password:'odisha',
      stateId: +(this.selectedEditState),
      centralLabId: 0,
      molecularLabId: 0,
      districtId: 0,
        blockId:0,
        chcId:0,
        phcId: 0,
        scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.mobileNo,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:null,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
    isActive:(this.confirmationSelected? "1": "0")
  };
  console.log(this.userListRequest);

  //Remove below 2 lines after successfully tested
  // this.showResponseMessage('Successfully registered', 's');
  // return false;

  let damagedsampleCollection = this.UsersService.updateusers(this.userListRequest)
  .subscribe(response => {
    this.AddUsersResponse = response;
    if(this.AddUsersResponse !== null){
      this.showResponseMessage('PNDTC user Updated Sucessfully','s')
       this.retrirveIlrlist();
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
editSubmitmtp(editmtpForm: NgForm){

  console.log(editmtpForm.value);
    // this.userName = editmtpForm.value.userName;
    this.firstName = editmtpForm.value.firstName;
    this.middleName = editmtpForm.value.middleName;
    this.lastName = editmtpForm.value.lastName;
    // this.userGovCode = editmtpForm.value.userGovCode;
    this.email = editmtpForm.value.email;
    // this.selectedEditChc = editmtpForm.value.ddlChc;
    // this.selectedEditUserrole = editmtpForm.value.ddlUserRole;
    // this.selectedEditState = editmtpForm.value.ddlState;
    //  this.selectedEditDistrict = editmtpForm.value.ddlDistrict;
    //   this.selectedEditBlock = editmtpForm.value.ddlBlock;
    this.mobileNo = editmtpForm.value.mobileNo;
    this.comments = editmtpForm.value.Comments;

  this.userListRequest = {
    id:this.id ,
    userTypeId:7,
    userRoleId:11,
    userGovCode:this.userGovCode,
      userName:this.userName,
      password:'odisha',
      stateId: +(this.selectedEditState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: 0,
        blockId: 0,
        chcId: 0,
        phcId: 0,
        scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.mobileNo,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:null,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
    isActive:(this.confirmationSelected? "1": "0")
  };
  console.log(this.userListRequest);

  //Remove below 2 lines after successfully tested
  // this.showResponseMessage('Successfully registered', 's');
  // return false;

  let damagedsampleCollection = this.UsersService.updateusers(this.userListRequest)
  .subscribe(response => {
    this.AddUsersResponse = response;
    if(this.AddUsersResponse !== null){
      this.showResponseMessage('MTP User Updated Sucessfully', 's')
       this.retrirveIlrlist();
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

editSubmitdc(editdcForm: NgForm){

  console.log(editdcForm.value);
    // this.userName = editdcForm.value.userName;
    this.firstName = editdcForm.value.firstName;
    this.middleName = editdcForm.value.middleName;
    this.lastName = editdcForm.value.lastName;
    // this.userGovCode = editdcForm.value.userGovCode;
    this.email = editdcForm.value.email;
    // this.selectedEditChc = editdcForm.value.ddlChc;
    // this.selectedEditUserrole = editdcForm.value.ddlUserRole;
    // this.selectedEditState = editdcForm.value.ddlState;
    //  this.selectedEditDistrict = editdcForm.value.ddlDistrict;
    //   this.selectedEditBlock = editdcForm.value.ddlBlock;
    this.mobileNo = editdcForm.value.mobileNo;
    this.comments = editdcForm.value.Comments;

  this.userListRequest = {
    id:this.id ,
    userTypeId:8,
    userRoleId:12,
    userGovCode:this.userGovCode,
      userName:this.userName,
      password:'odisha',
      stateId: +(this.selectedEditState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: +(this.selectedEditDistrict),
        blockId: 0,
        chcId: 0,
        phcId: 0,
        scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.mobileNo,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:null,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
    isActive:(this.confirmationSelected? "1": "0")
  };
  console.log(this.userListRequest);

  //Remove below 2 lines after successfully tested
  // this.showResponseMessage('Successfully registered', 's');
  // return false;

  let damagedsampleCollection = this.UsersService.updateusers(this.userListRequest)
  .subscribe(response => {
    this.AddUsersResponse = response;
    if(this.AddUsersResponse !== null){
      this.showResponseMessage('DC User Updated Sucessfully', 's')
       this.retrirveIlrlist();
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

editSubmitmolecular(editmolecularForm: NgForm){

  console.log(editmolecularForm.value);
    // this.userName = editmolecularForm.value.userName;
    this.firstName = editmolecularForm.value.firstName;
    this.middleName = editmolecularForm.value.middleName;
    this.lastName = editmolecularForm.value.lastName;
    // this.userGovCode = editmolecularForm.value.userGovCode;
    this.email = editmolecularForm.value.email;
    // this.selectedEditChc = editmolecularForm.value.ddlChc;
    // this.selectedEditUserrole = editmolecularForm.value.ddlUserRole;
    // this.selectedEditState = editmolecularForm.value.ddlState;
    //  this.selectedEditDistrict = editmolecularForm.value.ddlDistrict;
    //   this.selectedEditBlock = editmolecularForm.value.ddlBlock;
    this.mobileNo = editmolecularForm.value.mobileNo;
    this.comments = editmolecularForm.value.Comments;

  this.userListRequest = {
    id:this.id,
    userTypeId:9,
    userRoleId:0,
    userGovCode:this.userGovCode,
      userName:this.userName,
      password:'odisha',
      stateId: +(this.selectedEditState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: 0,
        blockId: 0,
        chcId: 0,
        phcId: 0,
        scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.mobileNo,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:null,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
    isActive:(this.confirmationSelected? "1": "0")
  };
  console.log(this.userListRequest);

  //Remove below 2 lines after successfully tested
  // this.showResponseMessage('Successfully registered', 's');
  // return false;

  let damagedsampleCollection = this.UsersService.updateusers(this.userListRequest)
  .subscribe(response => {
    this.AddUsersResponse = response;
    if(this.AddUsersResponse !== null){
      this.showResponseMessage('Molecular Lab User Updated Sucessfully', 's')
       this.retrirveIlrlist();
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

editSubmitspc(editspcForm: NgForm){

  console.log(editspcForm.value);
    // this.userName = editspcForm.value.userName;
    this.firstName = editspcForm.value.firstName;
    this.middleName = editspcForm.value.middleName;
    this.lastName = editspcForm.value.lastName;
    // this.userGovCode = editspcForm.value.userGovCode;
    this.email = editspcForm.value.email;
    // this.selectedEditChc = editspcForm.value.ddlChc;
    // this.selectedEditUserrole = editspcForm.value.ddlUserRole;
    // this.selectedEditState = editspcForm.value.ddlState;
    //  this.selectedEditDistrict = editspcForm.value.ddlDistrict;
    //   this.selectedEditBlock = editspcForm.value.ddlBlock;
    this.mobileNo = editspcForm.value.mobileNo;
    this.comments = editspcForm.value.Comments;

  this.userListRequest = {
    id:this.id,
    userTypeId:10,
    userRoleId:14,
    userGovCode:this.userGovCode,
      userName:this.userName,
      password:'odisha',
      stateId: +(this.selectedEditState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: +(this.selectedEditDistrict),
        blockId:0,
        chcId:0,
        phcId: 0,
        scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.mobileNo,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:null,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
    isActive:(this.confirmationSelected? "1": "0")
  };
  console.log(this.userListRequest);

  //Remove below 2 lines after successfully tested
  // this.showResponseMessage('Successfully registered', 's');
  // return false;

  let damagedsampleCollection = this.UsersService.updateusers(this.userListRequest)
  .subscribe(response => {
    this.AddUsersResponse = response;
    if(this.AddUsersResponse !== null){
      this.showResponseMessage('SPC User Updated Sucessfully', 's')
       this.retrirveIlrlist();
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

editSubmitnhm(editnhmForm: NgForm){

  console.log(editnhmForm.value);

    // this.userName = editnhmForm.value.userName;
    this.firstName = editnhmForm.value.firstName;
    this.middleName = editnhmForm.value.middleName;
    this.lastName = editnhmForm.value.lastName;
    // this.userGovCode = editnhmForm.value.userGovCode;
    this.email = editnhmForm.value.email;
    // this.selectedEditChc = editnhmForm.value.ddlChc;
    // this.selectedEditUserrole = editnhmForm.value.ddlUserRole;
    // this.selectedEditState = editnhmForm.value.ddlState;
    //  this.selectedEditDistrict = editnhmForm.value.ddlDistrict;
    //   this.selectedEditBlock = editnhmForm.value.ddlBlock;
    this.mobileNo = editnhmForm.value.mobileNo;
    this.comments = editnhmForm.value.Comments;

  this.userListRequest = {
    id:this.id,
    userTypeId:15,
    userRoleId:11,
    userGovCode:this.userGovCode,
      userName:this.userName,
      password:'odisha',
      stateId: +(this.selectedEditState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: +(this.selectedEditDistrict),
        blockId: +(this.selectedEditBlock),
        chcId: 0,
        phcId: 0,
        scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.mobileNo,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:null,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
    isActive:(this.confirmationSelected? "1": "0")
  };
  console.log(this.userListRequest);

  //Remove below 2 lines after successfully tested
  // this.showResponseMessage('Successfully registered', 's');
  // return false;

  let damagedsampleCollection = this.UsersService.updateusers(this.userListRequest)
  .subscribe(response => {
    this.AddUsersResponse = response;
    if(this.AddUsersResponse !== null){
      this.showResponseMessage('NHM User Updated Sucessfully', 's')
       this.retrirveIlrlist();
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

editSubmitpndt(editpndtForm: NgForm){

  console.log(editpndtForm.value);
    // this.userName = editpndtForm.value.userName;
    this.firstName = editpndtForm.value.firstName;
    this.middleName = editpndtForm.value.middleName;
    this.lastName = editpndtForm.value.lastName;
    // this.userGovCode = editpndtForm.value.userGovCode;
    this.email = editpndtForm.value.email;
    // this.selectedEditChc = editpndtForm.value.ddlChc;
    // this.selectedEditUserrole = editpndtForm.value.ddlUserRole;
    // this.selectedEditState = editpndtForm.value.ddlState;
    //  this.selectedEditDistrict = editpndtForm.value.ddlDistrict;
    //   this.selectedEditBlock = editpndtForm.value.ddlBlock;
    this.mobileNo = editpndtForm.value.mobileNo;
    this.comments = editpndtForm.value.Comments;

  this.userListRequest = {
    id:this.id,
    userTypeId:6,
    userRoleId:9,
    userGovCode:this.userGovCode,
      userName:this.userName,
      password:'odisha',
      stateId: +(this.selectedEditState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: 0,
        blockId: 0,
        chcId: 0,
        phcId: 0,
        scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.mobileNo,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:null,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
    isActive:(this.confirmationSelected? "1": "0")
  };
  console.log(this.userListRequest);

  //Remove below 2 lines after successfully tested
  // this.showResponseMessage('Successfully registered', 's');
  // return false;

  let damagedsampleCollection = this.UsersService.updateusers(this.userListRequest)
  .subscribe(response => {
    this.AddUsersResponse = response;
    if(this.AddUsersResponse !== null){
      this.showResponseMessage('PNDT User Updated Sucessfully', 's')
       this.retrirveIlrlist();
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

editSubmithaematologist(edithaematologistForm: NgForm){

  console.log(edithaematologistForm.value);
    // this.userName = edithaematologistForm.value.userName;
    this.firstName = edithaematologistForm.value.firstName;
    this.middleName = edithaematologistForm.value.middleName;
    this.lastName = edithaematologistForm.value.lastName;
    // this.userGovCode = edithaematologistForm.value.userGovCode;
    this.email = edithaematologistForm.value.email;
    // this.selectedEditState = edithaematologistForm.value.ddlState;
    this.mobileNo = edithaematologistForm.value.mobileNo;
    this.comments = edithaematologistForm.value.Comments;

  this.userListRequest = {
    id:this.id ,
    userTypeId:13,
    userRoleId:17,
    userGovCode:this.userGovCode,
      userName:this.userName,
      password:'odisha',
      stateId: +(this.selectedEditState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: 0,
        blockId:0,
        chcId: 0,
        phcId: 0,
        scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.mobileNo,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:null,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
    isActive:(this.confirmationSelected? "1": "0")
  };
  console.log(this.userListRequest);

  //Remove below 2 lines after successfully tested
  // this.showResponseMessage('Successfully registered', 's');
  // return false;

  let damagedsampleCollection = this.UsersService.updateusers(this.userListRequest)
  .subscribe(response => {
    this.AddUsersResponse = response;
    if(this.AddUsersResponse !== null){
      this.showResponseMessage('Haemotologist User Updated Sucessfully', 's')
       this.retrirveIlrlist();
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
editSubmitsupport(editsupportForm: NgForm){

  console.log(editsupportForm.value);
    // this.userName = editsupportForm.value.userName;
    this.firstName = editsupportForm.value.firstName;
    this.middleName = editsupportForm.value.middleName;
    this.lastName = editsupportForm.value.lastName;
    // this.userGovCode = editsupportForm.value.userGovCode;
    this.email = editsupportForm.value.email;
    // this.selectedEditChc = editsupportForm.value.ddlChc;
    // this.selectedEditUserrole = editsupportForm.value.ddlUserRole;
    // this.selectedEditState = editsupportForm.value.ddlState;
    //  this.selectedEditDistrict = editsupportForm.value.ddlDistrict;
    //   this.selectedEditBlock = editsupportForm.value.ddlBlock;
    this.mobileNo = editsupportForm.value.mobileNo;
    this.comments = editsupportForm.value.Comments;

  this.userListRequest = {
    id:this.id ,
    userTypeId:14,
    userRoleId:18,
    userGovCode:this.userGovCode,
      userName:this.userName,
      password:'odisha',
      stateId: +(this.selectedEditState),
      centralLabId: 0,

      molecularLabId: 0,
      districtId: 0,
        blockId: 0,
        chcId: 0,
        phcId: 0,
        scId: 0,
      riId:null,
      firstName:this.firstName,
      middleName:this.middleName,
      lastName:this.lastName,
      contactNo1:this.mobileNo,
      contactNo2:null,
      email:this.email,
      govIdTypeId:0,
      govIdDetails:null,
      address:null,
      pincode:null,
      createdBy:this.user.id ,
      updatedBy:this.user.id ,
      comments: this.comments,
    isActive:(this.confirmationSelected? "1": "0")
  };
  console.log(this.userListRequest);

  //Remove below 2 lines after successfully tested
  // this.showResponseMessage('Successfully registered', 's');
  // return false;

  let damagedsampleCollection = this.UsersService.updateusers(this.userListRequest)
  .subscribe(response => {
    this.AddUsersResponse = response;
    if(this.AddUsersResponse !== null){
      this.showResponseMessage('Support Admin User Updated Sucessfully', 's')
       this.retrirveIlrlist();
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

  ngAfterViewInit(): void {
    //this.rerender();
  }
  ngOnChanges(changes:SimpleChanges): void {

    //this.dtTrigger.next();
    //this.rerender();
    //this.cdr.detectChanges();
  }
  rerender(): void {
    if(this.dtElement.dtInstance)
    {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

        // Destroy the table first   
        dtInstance.clear();   
        dtInstance.destroy();
        // Call the dtTrigger to rerender again       
        this.dtTrigger.next();
      });
    }
else 
{
  this.dtTrigger.next();
}
  }

  openTrackpopup(subjectInfo)
  {
      this.openpopup.emit(subjectInfo);
  }
  opensubjectdetail(subjectInfo)
  {
    this.opensubjectdetails.emit(subjectInfo);
  }
  resetTableFromParent()
  {
      this.rerender();
      
  }
}
