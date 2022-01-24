import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SubjectProfileRequest, ParticularSubjectProfileRequest, anmSubjectTrackerRequest, subjectTrackerRequest } from 'src/app/shared/anm-module/subject-profile/subject-profile-request';
import { SubjectProfileResponse, PrimaryDetail, AddressDetail, ParentDetail, PregnancyDetail, RetrieveSubjectProfileList, SubjectProfileList, trackingANWSubjectResponse, trackingSubjectResponse, ANMSubject, SubjectTrack } from 'src/app/shared/anm-module/subject-profile/subject-profile-response';
import { SubjectProfileService } from 'src/app/shared/anm-module/subject-profile/subject-profile.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { DataService } from 'src/app/shared/data.service';
import { TokenService } from 'src/app/shared/token.service';
import { user } from 'src/app/shared/auth-response';
import { Router } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
declare var $: any;
import { PNDTCmasterService } from "../../shared/pndtc/pndtc-masterdata.service";
import { runInThisContext } from 'vm';


@Component({
  selector: 'app-counsellor-phc-report-list',
  templateUrl: './counsellor-phc-report-list.component.html',
  styleUrls: ['./counsellor-phc-report-list.component.css']
})
export class CounsellorPhcreportListComponent implements AfterViewInit, OnDestroy, OnInit {

 
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
  ecNumber: string;
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
  erroMessage;
  selectedphc;
  CHCdata;
  districts;
  selectedDistrict = null;
  blocklists;
  PHCdata;
  selectedBlock = null;
  selectedchc ;

  selectedAnm = null;
  showDistrict = true;
  showBlock = true;
  globalTimeout = null;
  maintabSelected = 1;
  mainsubtabSelected = 1;

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
  showChc = true;
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

  

  constructor(
    private SubjectProfileService: SubjectProfileService,
    private httpService: HttpClient,
    private _formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private tokenService: TokenService,
    private dataservice: DataService,
    private router: Router,
    private PNDTCmasterService: PNDTCmasterService
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({ "module": "NHM", "page": "Report"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));

    
    console.log(this.user,"test");
    
    this.selectedDistrict = this.user.districtId === 0 ? null : this.user.districtId;

    console.log(this.selectedDistrict);
    if(this.selectedDistrict != null)
    {
      this.showDistrict = false;
      this.getBlockData();
    } 
    else
        this.showDistrict = true;

    this.selectedBlock = this.user.blockId === 0 ? null : this.user.blockId;
  
    if(this.selectedBlock != null)
    {
      this.showBlock = false;
      this.getCHCData(this.user.blockId);
    } 
    else
        this.showBlock = true;
        this.selectedchc = this.user.chcId;

        if(this.selectedchc != null)
        {
    
          this.getPhcData(this.user.chcId);
          this.selectedphc = this.user.phcId;
        }
        else
            this.showChc = true;
            this.selectedphc = this.user.phcId;

         if(this.selectedphc != null)
        {
    
          this.getANMData();
          
        }
        else
            this.showChc = true;
          
    this.loaderService.display(true);
    this.SubprofileInitializeDateRange();

    this.getDistrictData();
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

    console.log(this.SubjectProfileService.subjectprofileListApi);
    var _obj = {
      fromDate: '',
      toDate: '',
      districtId: this.user.districtId === 0 ? 0 : this.user.districtId,
      blockId:this.user.blockId === 0 ? 0 : this.user.blockId,
      chcId:0,
      anmId:0,
      /*userInput:"",
      searchType:1*/
      "searchSection":this.maintabSelected,
      "status":1
    }
    //this.subjectprofileItem = new SubjectProfileList();
    let subProfile = this.SubjectProfileService.getNHMReportList(_obj)
      .subscribe(response => {
        console.log(response);
        this.anmsubjectProfileResponse = response;
        this.loaderService.display(false);
        if (this.anmsubjectProfileResponse !== null && this.anmsubjectProfileResponse.status === "true") {
          if (this.anmsubjectProfileResponse['data'].length <= 0 ) {
            this.subjectprofilelistErrorMessage = response.message;
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

         
        this.anmSubjectBadgeProfileListCount(1,1,1);
        this.anmSubjectBadgeProfileListCount(1,1,2);
        this.anmSubjectBadgeProfileListCount(1,1,3);
      //  this.selectedchc=this.user.chcId;
        // this.selectedphc = this.user.phcId;
     
        //this.phcChange();
        
  }

  getDistrictData(){
    this.PNDTCmasterService.getPNDTCDistrict()
    .subscribe(response => {
      console.log(response);
      this.districts = response['data'];
      //this.selectedDistrict = this.user.districtId;
    },
    (err: HttpErrorResponse) =>{
      this.districts = [];
      //this.erroMessage = err.toString();
    });
  }
  getBlockData(){
    this.loaderService.display(true);
    this.ANMdata = [];
    this.selectedAnm = null;
    this.PNDTCmasterService.getBlockByDistrict(this.selectedDistrict)
    .subscribe(response => {
      console.log(response);
      this.blocklists = response['data'];
      this.loaderService.display(false);
    },
    (err: HttpErrorResponse) =>{
      this.blocklists = [];
      this.erroMessage = err.toString();
    });
  }

  getCHCData(id){
    this.loaderService.display(true);
    this.ANMdata = [];
    this.selectedAnm = null;
    this.PNDTCmasterService.getCHCByBlock(id)
    .subscribe(response => {
      console.log(response);
      this.selectedchc = this.user.chcId;
      this.CHCdata = response['data'];
      this.loaderService.display(false);
    },
    (err: HttpErrorResponse) =>{
      this.CHCdata = [];
      this.erroMessage = err.toString();
    });
    console.log(this.CHCdata,"chctest");
  }

  getPhcData(id){
    this.loaderService.display(true);
    this.ANMdata = [];
    this.selectedAnm = null;
    this.PNDTCmasterService.getPhcByChc(id)
    .subscribe(response => {
      console.log(response);   
      this.selectedphc = this.user.phcId;
      this.PHCdata = response['data'];  
      this.loaderService.display(false);    
    },
    (err: HttpErrorResponse) =>{
      this.PHCdata = [];
      this.erroMessage = err.toString();
    });
   
    console.log(this.PHCdata);
  }

  getANMData(){
    this.loaderService.display(true);
    this.PNDTCmasterService.getPhcByChc(this.selectedphc)
    .subscribe(response => { 
      this.selectedchc=this.user.chcId;   
        
      this.selectedphc = this.user.phcId;
      this.ANMdata = response['data'];
      this.loaderService.display(false);
    },
    (err: HttpErrorResponse) =>{
      this.ANMdata = [];
      this.erroMessage = err.toString();
    });
    console.log(this.ANMdata,"anmtest");
  }
  
  // getANMData(){
  //   if(this.selectedphc!=null){
  //   this.loaderService.display(true);
  //   this.PNDTCmasterService.getANMByPHC(this.selectedphc)
  //   .subscribe(response => {
  //     console.log(response);
  //     this.ANMdata = response['data'];
  //     this.loaderService.display(false);
  //   },
  //   (err: HttpErrorResponse) =>{
  //     this.ANMdata = [];
  //     this.erroMessage = err.toString();
  //   });
  // }
  // else{
  //   this.ANMdata=[];
  //   this.selectedAnm =null;
  // }
  // }

  blockselected(event)
  {
    this.getCHCData(this.userId);
  }
  onChangechc(event)
  {
    this.getPhcData(this.userId);
  }

  onChangeanm(event)
  {
    this.getANMData();
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
    this.subjectprofileLists=[];
    var _obj = {
      fromDate: this.anmSPFromDate !== '' ? this.anmSPFromDate : '',
      toDate: this.anmSPToDate !== '' ? this.anmSPToDate : '',
      districtId: this.selectedDistrict === null ? 0 : Number(this.selectedDistrict),
      blockId: this.selectedBlock === null ? 0 : Number(this.selectedBlock),
      chcId: this.selectedchc === null ? 0 : Number(this.selectedchc),
      phcId: this.selectedphc === null ? 0 : Number(this.selectedphc),
      anmId: this.selectedAnm === null ? 0 : Number(this.selectedAnm),
      userInput:"",
      searchType:id,
      "searchSection":maintab,
      "status":subtab
    }
   
    //this.subjectprofileItem = new SubjectProfileList();
    let subProfile = this.SubjectProfileService.getNHMReportList(_obj)
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
        console.log(maintab);
        if(maintab === 1)
        {
          this.anmSubjectBadgeProfileListCount(1,1,1);
          this.anmSubjectBadgeProfileListCount(1,1,2);
          this.anmSubjectBadgeProfileListCount(1,1,3);
        }
        if(maintab === 2)
        {
          this.anmSubjectBadgeProfileListCount(1,2,1);
          this.anmSubjectBadgeProfileListCount(1,2,2);
          this.anmSubjectBadgeProfileListCount(1,2,3);
          this.anmSubjectBadgeProfileListCount(1,2,4);
          this.anmSubjectBadgeProfileListCount(1,2,5);
          this.anmSubjectBadgeProfileListCount(1,2,6);
        }
        if(maintab === 3)
        {
          this.anmSubjectBadgeProfileListCount(1,3,1);
          this.anmSubjectBadgeProfileListCount(1,3,2);
          this.anmSubjectBadgeProfileListCount(1,3,3);
         
        }
        if(maintab === 4)
        {
          this.anmSubjectBadgeProfileListCount(1,4,1);
          this.anmSubjectBadgeProfileListCount(1,4,2);
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
          this.anmSubjectBadgeProfileListCount(1,7,4);
        }
        if(maintab === 8)
        {
          this.anmSubjectBadgeProfileListCount(1,8,1);
          this.anmSubjectBadgeProfileListCount(1,8,2);
         
        }


  }

  anmSubjectBadgeProfileListCount(id,maintab,subtab) {
     
    this.loaderService.display(true);
    this.subjectprofilelistErrorMessage = '';
    this.subjectprofileLists=[];
    var _obj = {
      fromDate: this.anmSPFromDate !== '' ? this.anmSPFromDate : '',
      toDate: this.anmSPToDate !== '' ? this.anmSPToDate : '',
      districtId: this.selectedDistrict === null ? 0 : Number(this.selectedDistrict),
      blockId: this.selectedBlock === null ? 0 : Number(this.selectedBlock),
      chcId: this.selectedchc === null ? 0 : Number(this.selectedchc),
      phcId: this.selectedphc === null ? 0 : Number(this.selectedphc),
      anmId: this.selectedAnm === null ? 0 : Number(this.selectedAnm),
      userInput:"",
      searchType:id,
      "searchSection":maintab,
      "status":subtab
    }
   
    //this.subjectprofileItem = new SubjectProfileList();
    let subProfile = this.SubjectProfileService.getNHMReportList(_obj)
      .subscribe(response => {
        
       console.log(response['data'].length);
       if(maintab ===1)
       {
            if(subtab === 1)
                  this.chcsamplingstatusCount = response['data'].length;

            if(subtab === 2)
                  this.chcsampledCount = response['data'].length;
            if(subtab === 3)
                  this.chcnotsampledount = response['data'].length;
       }
       if(maintab ===2)
       {
            if(subtab === 1)
                  this.chcsCBCResultsCount = response['data'].length;
            if(subtab === 2)
                  this.chcCBCPositiveCount = response['data'].length;
            if(subtab === 3)
                  this.chcCBCNegativeCount = response['data'].length;
            if(subtab === 4)
                  this.chcSSTResultCount = response['data'].length;
            if(subtab === 5)
                  this.chcSSTPositiveCount = response['data'].length;
            if(subtab === 6)
                  this.chcSSTNegativeCount = response['data'].length;
       }
       if(maintab ===3)
       {
            if(subtab === 1)
                  this.HPLCResultCount = response['data'].length;
            if(subtab === 2)
                  this.HPLCAbnormalCount = response['data'].length;
            if(subtab === 3)
                  this.HPLCNormalCount = response['data'].length;
       }

       if(maintab ===4)
       {
            if(subtab === 1)
                  this.registeredCount = response['data'].length;
            if(subtab === 2)
                  this.notregisteredCount = response['data'].length;
       }

       if(maintab ===5)
       {
            if(subtab === 1)
                  this.counsellingpendingCount = response['data'].length;
            if(subtab === 2)
                  this.counselledPNDTAgreedCount = response['data'].length;
            if(subtab === 3)
                  this.counselledPNDTDisagreedCount = response['data'].length;
            if(subtab === 4)
                  this.counselledPNDTDecisionPendingCount = response['data'].length;
       }
       if(maintab ===6)
       {
            if(subtab === 1)
                  this.PNDTpendingCount = response['data'].length;
            if(subtab === 2)
                  this.PNDTcompletedCount = response['data'].length;
            if(subtab === 3)
                  this.PNDTNormalCount = response['data'].length;
            if(subtab === 4)
                  this.PNDTAffectedCount = response['data'].length;
            if(subtab === 5)
                  this.PNDTcarrierCount = response['data'].length;
       }
       if(maintab ===7)
       {
            if(subtab === 1)
                  this.PNDcounsellingpendingCount = response['data'].length;
            if(subtab === 2)
                  this.PNDcounsellingMTPAgreedCount = response['data'].length;
            if(subtab === 3)
                  this.PNDCounselledMTPDisagreedCount = response['data'].length;      
            if(subtab === 4)
                  this.PNDcounsellingMTPDecisionPendingCount = response['data'].length;
       }
       if(maintab ===8)
       {
            if(subtab === 1)
                  this.MTPpendingCount = response['data'].length;
            if(subtab === 2)
                  this.MTPcompletedCount = response['data'].length;
           
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
          fromDate: '',
          toDate: '',
          districtId: 0,
          blockId: 0,
          chcId: 0,
          anmId: 0,
          userInput:this.searchsubjectid,
          searchType:id,
          "searchSection":0,
          "status":0
        }
      
        //this.subjectprofileItem = new SubjectProfileList();
        let subProfile = this.SubjectProfileService.getNHMReportList(_obj)
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
  

  opensubjectdetail(subjectinfo: SubjectProfileList ){

    if(subjectinfo.primaryDetail.registeredFrom === 'ANM'){
      this.subjectid = subjectinfo.primaryDetail.uniqueSubjectId;
      this.router.navigateByUrl(`/app/anm-viewsubjectprofile?q=${this.subjectid}`);
    }
    else if(subjectinfo.primaryDetail.registeredFrom === 'CHC'){
      this.subjectid = subjectinfo.primaryDetail.uniqueSubjectId;
      this.router.navigateByUrl(`/app/chc-reg-viewsubjectprofile?q=${this.subjectid}`);
    }
    
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

  districtselected(event)
  {
      this.getBlockData();
  }

  /*ngAfterViewInit(): void {
    this.dtTrigger.next();
  }   */

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

}

