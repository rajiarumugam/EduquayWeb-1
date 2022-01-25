import { Component, OnInit, Pipe, NgZone, ViewChild, Output, EventEmitter,Input,  SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
declare var $: any 
import { TokenService } from 'src/app/shared/token.service';
import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';


@Component({
  selector: 'common-data-table',
  templateUrl: './common-data-table.component.html',
  styleUrls: ['./common-data-table.component.css']
})


export class CommonDataTableComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @Input() tableHeader:any = [];
  @Input() subjectprofileLists:any = [];
  @Input() objkey:any = [];
  @Output() openpopup: EventEmitter<any> = new EventEmitter<any>(); 
  @Output() opensubjectdetails: EventEmitter<any> = new EventEmitter<any>(); 
  
  user;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  subscription: Subscription;
  constructor(private masterService: masterService, zone: NgZone,private _formBuilder: FormBuilder,private tokenService: TokenService,  private router: Router,private DataService:DataService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
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
           }/*,
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
         },*/
         
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
console.log(this.tableHeader);
    console.log(this.subjectprofileLists);
    console.log(this.objkey);
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
