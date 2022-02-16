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
  ngAfterViewInit(): void {

  }
  ngOnChanges(changes:SimpleChanges): void {


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
