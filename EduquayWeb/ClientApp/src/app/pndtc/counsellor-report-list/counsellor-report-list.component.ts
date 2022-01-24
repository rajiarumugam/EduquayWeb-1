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


@Component({
  selector: 'app-counsellor-report-list',
  templateUrl: './counsellor-report-list.component.html',
  styleUrls: ['./counsellor-report-list.component.css']
})
export class CounsellorreportListComponent implements AfterViewInit, OnDestroy, OnInit {


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
  selectedphc  =false;
  CHCdata;
  PHCdata;
  districts;
  selectedDistrict = null;
  blocklists;
  selectedBlock = null;
  selectedchc = null;
  selectedAnm = null;
  showDistrict = true;
  showChc = true;
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

    this.selectedDistrict = this.user.districtId === 0 ? null : this.user.districtId;

    console.log(this.selectedDistrict);
    if(this.selectedDistrict != null)
    {
      this.showDistrict = false;
      this.getCHCData();
    }
    else
        this.showDistrict = true;

    this.selectedchc = null ;

    if(this.selectedchc != null)
    {

      this.getPhcData();
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
      chcId:this.user.districtId === 0 ? 0 : this.user.chcId,
      phcId:this.user.chcId === 0 ? 0 : this.user.phcId,
      anmId:0,
      /*userInput:"",
      searchType:1*/
      "searchSection":5,
      "status":1
    }
    //this.subjectprofileItem = new SubjectProfileList();
    let subProfile = this.SubjectProfileService.getPNDTReportList(_obj)
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

        //this.phcChange();
  }

  getDistrictData(){
    this.selectedDistrict =null;
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

  getPhcData(){

    this.ANMdata = [];

    this.selectedAnm = null;
    if(this.selectedchc !=null){
      this.loaderService.display(true);
    this.PNDTCmasterService.getPhcByChc(this.selectedchc)
    .subscribe(response => {
      console.log(response);
      this.PHCdata = response['data'];
      this.loaderService.display(false);
    },
    (err: HttpErrorResponse) =>{
      this.blocklists = [];
      this.erroMessage = err.toString();
    });
  }
  else{
    this.PHCdata = [];
      this.ANMdata = [];
    this.selectedphc=null;
    this.selectedAnm=null;
  }
  }

  getCHCData(){

    if(this.selectedDistrict !=null){
      this.loaderService.display(true);
      this.ANMdata = [];
    this.PNDTCmasterService.getChcbydistrict(this.selectedDistrict)
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
  else
  {
    this.CHCdata = [];
      this.PHCdata = [];
      this.ANMdata = [];
      this.selectedchc = null;
    this.selectedphc=null;
    this.selectedAnm=null;

  }
  }

  getANMData(){
    if(this.selectedphc!=null){
    this.loaderService.display(true);
    this.PNDTCmasterService.getANMByPHC(this.selectedphc)
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
  else{
    this.ANMdata=[];
    this.selectedAnm =null;
  }
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
     var callingvariable;
    this.loaderService.display(true);
    this.subjectprofilelistErrorMessage = '';
    this.subjectprofileLists=[];
    if (maintab == 1)
    {
      callingvariable = 6;
    }
    else if (maintab == 2 && subtab == 1 )
    {
      callingvariable =7;
    }
    else if (maintab == 2 && subtab == 2 )
    {
      callingvariable =8;
    }
    else if (maintab == 3 && subtab == 1 )
    {
      callingvariable =3;
    }
    else if (maintab == 3 && subtab == 2 )
    {
      callingvariable =4;
    }
    else if (maintab == 3 && subtab == 3 )
    {
      callingvariable =5;
    }
    console.log(callingvariable,'Test Check')
    var _obj = {
      fromDate: this.anmSPFromDate !== '' ? this.anmSPFromDate : '',
      toDate: this.anmSPToDate !== '' ? this.anmSPToDate : '',
      districtId: this.selectedDistrict === null ? 0 : Number(this.selectedDistrict),
      chcId: this.selectedchc === null ? 0 : Number(this.selectedchc),
      phcId: this.selectedphc === null ? 0 : Number(this.selectedphc),
      anmId: this.selectedAnm === null ? 0 : Number(this.selectedAnm),
      userInput:"",

      searchSection:5,
      status:callingvariable
    }



    //this.subjectprofileItem = new SubjectProfileList();
    let subProfile = this.SubjectProfileService.getPNDTReportList(_obj)
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
          this.anmSubjectBadgeProfileListCount(1,5,6);

        }
        if(maintab === 2)
        {
          this.anmSubjectBadgeProfileListCount(1,5,7);
          this.anmSubjectBadgeProfileListCount(1,5,8);
        }
        if(maintab === 3)
        {
           this.anmSubjectBadgeProfileListCount(1,5,3);
          this.anmSubjectBadgeProfileListCount(1,5,4);
          this.anmSubjectBadgeProfileListCount(1,5,4);

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
      anmId: this.selectedAnm === null ? 0 : Number(this.selectedAnm),
      userInput:"",

      searchSection:5,
      status:subtab
    }

    //this.subjectprofileItem = new SubjectProfileList();
    let subProfile = this.SubjectProfileService.getPNDTReportList(_obj)
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
          searchSection:0,
          status:0
        }

        //this.subjectprofileItem = new SubjectProfileList();
        let subProfile = this.SubjectProfileService.getPNDTReportList(_obj)
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

  onChangeDistrict(event)
   {
      this.getCHCData( );
  }


  onChangechc(event)
  {
    this.getPhcData( );
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

