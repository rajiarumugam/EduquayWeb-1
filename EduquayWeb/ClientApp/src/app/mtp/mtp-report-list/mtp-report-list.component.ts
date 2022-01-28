import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Output, EventEmitter,ViewChildren,QueryList, ChangeDetectorRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SubjectProfileRequest, ParticularSubjectProfileRequest, anmSubjectTrackerRequest, subjectTrackerRequest } from 'src/app/shared/anm-module/subject-profile/subject-profile-request';
import { SubjectProfileResponse, PrimaryDetail, AddressDetail, ParentDetail, PregnancyDetail, RetrieveSubjectProfileList, SubjectProfileList, trackingANWSubjectResponse, trackingSubjectResponse, ANMSubject, SubjectTrack } from 'src/app/shared/anm-module/subject-profile/subject-profile-response';
import { SubjectProfileService } from 'src/app/shared/anm-module/subject-profile/subject-profile.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { DataService } from 'src/app/shared/data.service';
import { TokenService } from 'src/app/shared/token.service';
import { user } from 'src/app/shared/auth-response';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
declare var $: any;
import { PNDTCmasterService } from "../../shared/pndtc/pndtc-masterdata.service";
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { SampleCollectionService } from 'src/app/shared/anm-module/sample-collection.service';
import { DateService } from 'src/app/shared/utility/date.service';

import { CommonDataTableComponent } from "./../../shared/common-data-table/common-data-table.component";

@Component({
  selector: 'app-mtp-report-list',
  templateUrl: './mtp-report-list.component.html',
  styleUrls: ['./mtp-report-list.component.css']
})
export class MTPreportListComponent implements AfterViewInit, OnDestroy, OnInit {


  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(CommonDataTableComponent,{static:true}) commonDataTable: CommonDataTableComponent;
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

  countMain1Sub1 = 0;
  countMain1Sub2 = 0;

  countMain2Sub1 = 0;
  countMain2Sub2 = 0;

  countMain3Sub1 = 0;
  countMain3Sub2 = 0;

  _headerData = [['SNo','SubjectName','SubjectID','RCH','GA','HPLCResults','FoetusName','SampleRefID','CVSSpecimenRefID','Molecular Lab Result','Status','MTP Scheduled DtTm','Track','Profile']]
  
  _keyData = [['subjectName','subjectId','rchId','ga','hplcResults','foetusName','sampleRefId','cvsSampleRefId','molecularResult','currentStatus']];
  tableHeader = [];
  curentObjectKey = [];

  constructor(
    private SubjectProfileService: SubjectProfileService,
    private httpService: HttpClient,
    private _formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private tokenService: TokenService,
    private dataservice: DataService,
    private router: Router,
    private PNDTCmasterService: PNDTCmasterService,
    private masterService: masterService,
    private sampleCollectionService: SampleCollectionService,
    private DataService:DataService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({ "module": "NHM", "page": "Report"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.dataservice.sendData(JSON.stringify({"tableHeader": ['SNo','SubjectName','SubjectID','Barcode','RCH','Contact','GA','CurrentStatus','Track','Profile']}));
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
      "searchSection":1,
      "status":1,
      "userId": this.user.id,
    }
    //this.subjectprofileItem = new SubjectProfileList();
    let subProfile = this.SubjectProfileService.getMTPReportList(_obj)
      .subscribe(response => {
        this.anmsubjectProfileResponse = response;
        this.loaderService.display(false);
        if (this.anmsubjectProfileResponse !== null && this.anmsubjectProfileResponse.status === "true") {
          if (this.anmsubjectProfileResponse['data'].length <= 0 ) {
            this.subjectprofilelistErrorMessage = response.message;
            this.subjectprofileLists = response['data'];
            this.cdr.detectChanges();
            this.commonDataTable.resetTableFromParent();
          }
          else {
            this.subjectprofileLists = response['data'];
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
      "searchSection":1,
      "status":maintab,
      "userId": this.user.id
    }

    //this.subjectprofileItem = new SubjectProfileList();
    let subProfile = this.SubjectProfileService.getMTPReportList(_obj)
      .subscribe(response => {
        this.anmsubjectProfileResponse = response;
        this.loaderService.display(false);
        if (this.anmsubjectProfileResponse !== null && this.anmsubjectProfileResponse.status === "true") {
          if (this.anmsubjectProfileResponse['data'].length <= 0 ) {
            this.subjectprofilelistErrorMessage = response.message;
            this.subjectprofileLists = response['data'];
            this.cdr.detectChanges();
            this.commonDataTable.resetTableFromParent();
           // this.rerender();
          }
          else {
            this.subjectprofileLists = response['data'];
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
        /*if(maintab === 1)
        {
          this.anmSubjectBadgeProfileListCount(1,1,1);
          this.anmSubjectBadgeProfileListCount(1,1,2);
        }*/
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
      searchSection:1,
      status:maintab,
      userId: this.user.id
    }

    //this.subjectprofileItem = new SubjectProfileList();
    let subProfile = this.SubjectProfileService.getMTPReportList(_obj)
      .subscribe(response => {
      

       

       
      
     
     
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
        let subProfile = this.SubjectProfileService.getMTPReportList(_obj)
          .subscribe(response => {
            this.anmsubjectProfileResponse = response;
            this.loaderService.display(false);
            if (this.anmsubjectProfileResponse !== null && this.anmsubjectProfileResponse.status === "true") {
              if (this.anmsubjectProfileResponse['data'].length <= 0 ) {
                this.subjectprofilelistErrorMessage = response.message;
                this.subjectprofileLists = [];
                  //this.rerender();
              }
              else {
                this.subjectprofileLists = response['data'];
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
      this.tableHeader = this._headerData[0];
      this.curentObjectKey = this._keyData[0];
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

