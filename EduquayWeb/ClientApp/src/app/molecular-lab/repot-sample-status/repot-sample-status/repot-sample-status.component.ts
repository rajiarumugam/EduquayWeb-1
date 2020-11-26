import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from 'src/app/shared/token.service';
import { ActivatedRoute } from '@angular/router';
import { PNDTCmasterService } from "../../../shared/pndtc/pndtc-masterdata.service";
import { PNDCService } from "../../../shared/pndtc/pndc.service";
import { DataService } from 'src/app/shared/data.service';
import { Router } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
declare var $: any;
import * as moment from 'moment';
import { MolecularLabsampleService } from "./../../../shared/molecularlab/ml-sample.service";
import { LoaderService } from './../../../shared/loader/loader.service';
import * as XLSX from 'xlsx'; 
import { Button } from 'protractor';

@Component({
  selector: 'app-repot-sample-status',
  templateUrl: './repot-sample-status.component.html',
  styleUrls: ['./repot-sample-status.component.css']
})
export class ReportSampleStatusComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('startPicker1', { static: false }) pickerStart;
  @ViewChild('endPicker', { static: false }) pickerEnd;
  loadDataTable: boolean = false;
  //dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  sampleStatusData = [];
  selectedSampleStatus = null;
  districts = [];
  selectedDistrict = null;
  user;
  CHCdata = [];
  selectedchc = null;
  erroMessage;
  PHCdata = [];
  selectedphc = null;
  ANMdata = []
  selectedAnm = null;
  pndPendingArray = [];  
  pndNotCompleteArray = [];
  fromDate = "";
  toDate = "";
  selectedData;
  fileName: any;

  DAY = 86400000;
  dateform:FormGroup;
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

  constructor(private PNDTCmasterService: PNDTCmasterService,private tokenService: TokenService,private route: ActivatedRoute,private PNDCService:PNDCService
    ,private dataservice: DataService,private router: Router,private _formBuilder: FormBuilder,private MolecularLabsampleService:MolecularLabsampleService,private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.dataservice.sendData(JSON.stringify({"module": "Molecular Lab", "page": "Report - Sample Status"}));
    this.loaderService.display(false);
    var pndtcTestingArr = this.route.snapshot.data.mlReport;
    console.log(pndtcTestingArr);
    this.dateform = this._formBuilder.group({
      fromDate: [''],
      toDate: ['']
    });
    console.log(pndtcTestingArr);
    if(pndtcTestingArr !== undefined && pndtcTestingArr.status.toString() === "true"){
      //var _tempData = centralReceiptsArr.hplcDetail;
      this.pndPendingArray = pndtcTestingArr.subjects;
    }


    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.getDistrictData();
    this.getSampleStatus();
    //this.dataservice.sendData(JSON.stringify({"screen": "PNDTCTESTING","pendingCount":this.pndPendingArray.length}));
    this.dtOptions = {
       // Declare the use of the extension in the dom parameter
       dom: "<'row mt-3'<'col-sm-6 float left'f><'col-sm-4 mb-2 float right'l><'col-sm-2 float right'B>>" +
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
           },
         {
           titleAttr: 'Download as PDF',
           extend: 'pdfHtml5',
           title: 'Report - Sample Status',
           orientation: 'landscape',
           pageSize: 'LEGAL',
           className: 'custom-btn',
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
         ], 
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

    this.dateform.controls.toDate.valueChanges.subscribe(changes => {
      if (!changes[0]) return;
      const selectedDate1 = changes[0].getTime();
      const monthLaterDate = selectedDate1;
      this.pickerStart.flatpickr.set({
        maxDate: new Date(selectedDate1)
      });
    });

    // Start Date Changes
    this.dateform.controls.fromDate.valueChanges.subscribe(changes => {
      if (!changes[0]) return;
      const selectedDate = changes[0].getTime();
      const monthLaterDate = selectedDate + (this.DAY*30);
      this.pickerEnd.flatpickr.set({
        minDate: new Date(selectedDate),
      });
    });
  }

  getDistrictData(){
    this.loaderService.display(true);
    this.PNDTCmasterService.getPNDTCDistrict()
    .subscribe(response => {
      this.districts = response['data'];
      this.loaderService.display(false);
      //this.selectedDistrict = this.user.districtId;
    },
    (err: HttpErrorResponse) =>{
      this.districts = [];
      //this.erroMessage = err.toString();
    });
  }
  districtChange(){
    this.loaderService.display(true);
    this.PNDTCmasterService.getDistrictBasedCHC(this.selectedDistrict)
    .subscribe(response => {
      console.log(response);
      this.CHCdata = response['data'];
      console.log(this.selectedchc);
      this.loaderService.display(false);
    },
    (err: HttpErrorResponse) =>{
      this.CHCdata = [];
      this.erroMessage = err.toString();
    });
  }
  chcChange(){
    this.loaderService.display(true);
    this.PNDTCmasterService.getCHCBasedPHC(this.selectedchc)
    .subscribe(response => {
      this.PHCdata = response['data'];
      this.loaderService.display(false);
    },
    (err: HttpErrorResponse) =>{
      this.PHCdata = [];
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
    });
  }

  getSampleStatus(){
    
    this.PNDTCmasterService.getMLSampleStatus()
    .subscribe(response => {
      console.log(response);
      this.sampleStatusData = response['sampleStatus'];

    },
    (err: HttpErrorResponse) =>{
      this.sampleStatusData = [];
      this.erroMessage = err.toString();
    });
  }

  refreshData()
  {
    this.loaderService.display(true);
    var _subjectObj = {
      "sampleStatus": this.selectedSampleStatus != null ? Number(this.selectedSampleStatus) : 0,
      "molecularLabId": this.user.molecularLabId,
      "districtId":this.selectedDistrict != null ? Number(this.selectedDistrict) : 0,
      "chcId":this.selectedchc != null ? Number(this.selectedchc) : 0,
      "phcId":this.selectedphc != null ? Number(this.selectedphc) : 0,
      "anmId":this.selectedAnm != null ? Number(this.selectedAnm) : 0,
      "fromDate": this.fromDate != '' ? moment(new Date(this.fromDate)).format("DD/MM/YYYY") : '',
      "toDate": this.toDate != '' ? moment(new Date(this.toDate)).format("DD/MM/YYYY") : ''
    }
    this.MolecularLabsampleService.getMolecularReport(_subjectObj).subscribe(response => {
      console.log(response);
      this.pndPendingArray = response.subjects;
      this.rerender();
      this.loaderService.display(false);
    },
    (err: HttpErrorResponse) =>{
     
    });
  }

  openResultPage(data)
  {
    console.log(data);
    this.selectedData = data;
    $('#fadeinModal').modal('show');
  }

  exportexcel(): void 
  {
    this.fileName = "ML-Report-samples.xlsx"
     /* table id is passed over here */   
     let element = document.getElementById('ML-report-samples'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
    
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


}

