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

@Component({
  selector: 'app-mtp-testing-summary',
  templateUrl: './mtp-testing-summary.component.html',
  styleUrls: ['./mtp-testing-summary.component.css']
})
export class mtpTestingSummaryComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
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
  mtpPendingArray = [];  

  constructor(private PNDTCmasterService: PNDTCmasterService,private tokenService: TokenService,private route: ActivatedRoute,private PNDCService:PNDCService
    ,private dataservice: DataService,private router: Router
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "MTP services Obstetrician", "submodule": "MTP Summary Report"}));
    var mtpTestingArr = this.route.snapshot.data.mtpTestingData;
    console.log(mtpTestingArr);
    if(mtpTestingArr !== undefined && mtpTestingArr.status.toString() === "true"){
      //var _tempData = centralReceiptsArr.hplcDetail;
      this.mtpPendingArray = mtpTestingArr.data;
    }


    this.user = JSON.parse(this.tokenService.getUser('lu'));
    //this.dataservice.sendData(JSON.stringify({"screen": "PNDTCTESTING","pendingCount":this.pndPendingArray.length}));
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 5,
      processing: true,
      stripeClasses: [],
      lengthMenu: [5, 10, 20, 50],
      dom: "<'row mt-3'<'col-sm-4 float left'f><'col-sm-4 mb-2 float right'l><'col-sm-4 float right'B>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-4'i><'col-sm-4 text-center'p>>",
      // Configure the buttons
        buttons: [
          {
            titleAttr: 'Download as Excel',     
            extend: 'excelHtml5',
            title: 'MTP Summary Report',
            className: 'custom-btn',
            text: '<img src="assets/assets/img/excelimage.png" width="23px" />'
          },
        {
          titleAttr: 'Download as PDF',
          extend: 'pdfHtml5',
          title: 'MTP Summary Report',
          orientation: 'landscape',
          pageSize: 'LEGAL',
          className: 'custom-btn',
          margin: [5,5,5,5],
          //filename: 'dt_custom_pdf',
          exportOptions: {
            columns: ':visible',
            search: 'applied',
            order: 'applied'
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
  }



  openViewPage(data)
  {
    console.log(data);
    this.dataservice.setdata({'mtptestingSummary':data});
    this.router.navigate(['/app/view-mtp-summary']);
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

