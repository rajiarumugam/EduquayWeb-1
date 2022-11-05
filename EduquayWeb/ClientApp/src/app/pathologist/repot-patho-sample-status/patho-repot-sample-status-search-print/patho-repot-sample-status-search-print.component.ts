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
import { chcsampleService } from "../../../shared/chc-sample/chc-sample.service";
import { LoaderService } from '../../../shared/loader/loader.service';
import { pathoHPLCService } from "../../../shared/pathologist/patho-hplc.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patho-repot-sample-status-search-print',
  templateUrl: './patho-repot-sample-status-search-print.component.html',
  styleUrls: ['./patho-repot-sample-status-search-print.component.css']
})
export class PathoreportSampleStatusSearchPrintComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('startPicker1', { static: false }) pickerStart;
  @ViewChild('endPicker', { static: false }) pickerEnd;
  loadDataTable: boolean = false;
  //dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

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
  fromDate ;
  toDate;

  sampleStatusData = [];
  selectedSampleStatus = null;
  sampleStatusData1 = [];
  checkdAllEnabled = true;
  blocklists = [];
  selectedBlock = null;
  DAY = 86400000;
  dateform:FormGroup;
  startOptions1: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: new Date(Date.now()- (this.DAY*7)),
    maxDate: new Date(Date.now()),
  };

  startOptions2: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: new Date(Date.now()),
    maxDate: new Date(Date.now())
  };
  currentDate;
  printArray = [];
  searchbarcode;
  constructor(private PNDTCmasterService: PNDTCmasterService,private tokenService: TokenService,private route: ActivatedRoute,private PNDCService:PNDCService
    ,private dataservice: DataService,private router: Router,private _formBuilder: FormBuilder, private pathoHPLCService:pathoHPLCService,private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.currentDate = moment(new Date()).format("DD-MM-YYYY");
    this.loaderService.display(false);
    var pndtcTestingArr = this.route.snapshot.data.pndtcTesting;
   

    this.fromDate = new Date(Date.now()- (this.DAY*7));
    this.toDate = new Date(Date.now());
    this.selectedDistrict = null;

    //this.getDistrictData();
    
    
    if(pndtcTestingArr !== undefined && pndtcTestingArr.status.toString() === "true"){
      //var _tempData = centralReceiptsArr.hplcDetail;
      this.pndPendingArray = pndtcTestingArr.subjects;
      this.pndPendingArray.forEach(function(val,ind){
        val.checked = true;
      })
    }

    this.dataservice.sendData(JSON.stringify({ "module": "Pathologist - HPLC", "page": "Report - Sample Status"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.getSampleStatusData();
    //this.getCHCData();
    //this.dataservice.sendData(JSON.stringify({"screen": "PNDTCTESTING","pendingCount":this.pndPendingArray.length}));
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 20,
      processing: true,
      stripeClasses: [],
      lengthMenu: [5, 10, 20, 50],
       // Declare the use of the extension in the dom parameter
       /*dom: "<'row mt-3'<'col-sm-6 float left'f><'col-sm-4 mb-2 float right'l><'col-sm-2 float right'B>>" +
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
 
         ], */
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

    
  }
  getSampleStatusData(){
    this.pathoHPLCService.getSampleStatus()
    .subscribe(response => {
      this.sampleStatusData = response['sampleStatus'];
      this.sampleStatusData.forEach(function(val,i){
          if(val.id != 1 && val.id != 2 && val.id != 6)
          {
            this.sampleStatusData1.push(val);
          }
      },this);
      this.selectedSampleStatus = '3';
    },
    (err: HttpErrorResponse) =>{
      this.sampleStatusData = [];
    });
  }
  



  searchBarCodetype()
  {
      console.log(this.searchbarcode);
      
      this.refreshData();
  }
  refreshData()
  {

    this.loaderService.display(true);
    var _subjectObj = {
      "barcode": this.searchbarcode,
    }
    this.pathoHPLCService.getPathoSampleReport(_subjectObj).subscribe(response => {
      this.pndPendingArray = response.subjects;
      this.pndPendingArray.forEach(function(val,ind){
        val.checked = true;
      })
      this.rerender();
      this.loaderService.display(false);
    },
    (err: HttpErrorResponse) =>{
      this.loaderService.display(false);
    });
   
  }

  openResultPage(data)
  {
    $('#fadeinModal').modal('show');
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
  openReportPage(data)
  { 
    this.dataservice.setdata({'diagnosisHPLC':data});
    this.router.navigate(['/app/view-Patho-report']);
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }   
  printPdf()
  {
    var _tempArray = [];
    this.pndPendingArray.forEach(function(val,index){
      if(val.checked)
            _tempArray.push(val);
    });
    this.printArray = _tempArray;
    //document.title=this.diagnosisReportData.subjectName+"_"+this.diagnosisReportData.barcodeNo+"_Patho Report";
    if(this.printArray.length > 0)
    {
      setTimeout(() => {
        window.print();
      }, 1);
    }
    else
    {
      Swal.fire({icon:'error', title: "Please select atleast one data!", confirmButtonText: 'Close', allowOutsideClick: false})
    }
      //alert('Please select atleast one data!');
    //document.title='CMC - Thalassemia & Sickle cell';
    
  }
  checkIfSelected(i)
  {
      if(this.pndPendingArray[i].checked == true)
      {
        this.pndPendingArray[i].checked = false;
        this.checkdAllEnabled = false;
      }
      else
        this.pndPendingArray[i].checked = true;
  }
  checkAllSelected()
  {
    if(this.checkdAllEnabled == true)
      this.checkdAllEnabled = false;
    else
      this.checkdAllEnabled = true;

        if(this.checkdAllEnabled)
        {
          this.pndPendingArray.forEach(function(val,ind){
            val.checked = true;
          })
        }
        else
        {
          this.pndPendingArray.forEach(function(val,ind){
            val.checked = false;
          })
        }
  }
  returnmcv(val) {
      if(Number(val) > 0) {
          return val+" fL";
      } else {
          return 'N/A';
      }
  }
  returnrdw(val) {
    if(Number(val) > 0) {
        return val+" %";
    } else {
        return 'N/A';
    }
}
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
