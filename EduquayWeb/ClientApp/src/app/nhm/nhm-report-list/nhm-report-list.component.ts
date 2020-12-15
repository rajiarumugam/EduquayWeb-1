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
  selector: 'app-nhm-report-list',
  templateUrl: './nhm-report-list.component.html',
  styleUrls: ['./nhm-report-list.component.css']
})
export class NHMreportListComponent implements AfterViewInit, OnDestroy, OnInit {

 
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
  districts;
  selectedDistrict = null;
  blocklists;
  selectedBlock = null;
  selectedchc = null;
  selectedAnm = null;
  showDistrict = true;
  showBlock = true;
  

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
      this.getBlockData();
    } 
    else
        this.showDistrict = true;

    this.selectedBlock = this.user.blockId === 0 ? null : this.user.blockId;

    if(this.selectedBlock != null)
    {
      this.showBlock = false;
      this.getBlockData();
    } 
    else
        this.showBlock = true;
        
    this.loaderService.display(true);
    this.SubprofileInitializeDateRange();

    this.getDistrictData();
    //this.getCHCData();

    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 20,
      processing: true,
      stripeClasses: [],
      lengthMenu: [5, 10, 20, 50],
       // Declare the use of the extension in the dom parameter
       dom: "<'row mt-3'<'col-sm-6 float left'f><'col-sm-4 mb-2 float right'l><'col-sm-2 float right'B>>" +
       "<'row'<'col-sm-12'tr>>" +
       "<'row'<'col-sm-4'i><'col-sm-4 text-center'p>>",
       // Configure the buttons
         buttons: [
           {
             titleAttr: 'Download as Excel',     
             extend: 'excelHtml5',
             title: 'Report - NHM',
             className: 'custom-btn',
             text: '<img src="assets/assets/img/excelimage.png" width="23px" />'
           },
         {
           titleAttr: 'Download as PDF',
           extend: 'pdfHtml5',
           title: 'Report - NHM',
           orientation: 'landscape',
           pageSize: 'LEGAL',
           className: 'custom-btn',
           margin: [5,5,5,5],
           //filename: 'dt_custom_pdf',
          customize: function(doc) {doc.styles.tableHeader.vertical = 'middle'
               //Remove the title created by datatTables
               
						doc.content.splice(0,1);
						//Create a date string that we use in the footer. Format is dd-mm-yyyy
						var now = new Date();
            var jsDate = now.getDate()+'-'+(now.getMonth()+1)+'-'+now.getFullYear();
            doc.pageMargins = [20,60,20,30];
						// Set the font size fot the entire document
						doc.defaultStyle.fontSize = 10;
						// Set the fontsize for the table header
            doc.styles.tableHeader.fontSize = 11;
            doc.styles.tableHeader.alignment = 'center'
						// Create a header object with 3 columns
						// Left side: Logo
						// Middle: brandname
						// Right side: A document title
						doc['header']=(function() {
							return {
								columns: [
									// {
									// 	//image: logo,
									// 	width: 24
									// },
									// {
									// 	alignment: 'left',
									// 	italics: true,
									// 	text: 'dataTables',
									// 	fontSize: 18,
									// 	margin: [10,0]
									// },
									// {
									// 	alignment: 'right',
									// 	fontSize: 14,
									// 	text: 'Custom PDF export with dataTables'
									// }
								],
								margin: 20
							}
						});
						// Create a footer object with 2 columns
						// Left side: report creation date
						// Right side: current page and total pages
						doc['footer']=(function(page, pages) {
							return {
								columns: [
									{
										alignment: 'left',
										text: ['Created on: ', { text: jsDate.toString() }]
									},
									{
										alignment: 'right',
										text: ['page ', { text: page.toString() },	' of ',	{ text: pages.toString() }]
									}
								],
								margin: 20
							}
						});
						// Change dataTable layout (Table styling)
						// To use predefined layouts uncomment the line below and comment the custom lines below
						// doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
						var objLayout = {};
						objLayout['hLineWidth'] = function(i) { return .5; };
						objLayout['vLineWidth'] = function(i) { return .5; };
						objLayout['hLineColor'] = function(i) { return '#aaa'; };
						objLayout['vLineColor'] = function(i) { return '#aaa'; };
						objLayout['paddingLeft'] = function(i) { return 4; };
						objLayout['paddingRight'] = function(i) { return 4; };
						doc.content[0].layout = objLayout;
				},				
          exportOptions: {
              columns: ':visible'
          },
           text: '<img src="../../../../assets/assets/img/pdfimage.png" width="23px" />'
         },
         
         // {
         //   titleAttr: 'Download as CSV',     
         //   extend: 'csvHtml5',
         //   className: 'custom-btn fa fa-file-text-o',
         //   text: ''
         // },
         // {
         // titleAttr: 'Print',     
         // extend: 'print',
         // className: 'custom-btn fa fa-print',
         // text: ''
         // }
 
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
      userInput:"",
      searchType:1
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

  getCHCData(){
    this.loaderService.display(true);
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
    this.PNDTCmasterService.getANMByCHC(this.selectedBlock)
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
  
  blockselected(event)
  {
    this.getCHCData();
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

  anmSubjectProfileList(id) {
     
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
      searchType:id
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

  anmSubjectProfileList1(id) {
     
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
          searchType:id
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

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }   


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}

