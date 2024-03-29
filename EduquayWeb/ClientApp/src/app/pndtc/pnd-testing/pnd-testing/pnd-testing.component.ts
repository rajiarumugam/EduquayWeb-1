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
import { LoaderService } from './../../../shared/loader/loader.service';

@Component({
  selector: 'app-pnd-testing',
  templateUrl: './pnd-testing.component.html',
  styleUrls: ['./pnd-testing.component.css']
})
export class pndTestingComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
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

  constructor(private PNDTCmasterService: PNDTCmasterService,private tokenService: TokenService,private route: ActivatedRoute,private PNDCService:PNDCService
    ,private dataservice: DataService,private router: Router,private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.loaderService.display(false);
    var pndtcTestingArr = this.route.snapshot.data.pndtcTesting;
    console.log(pndtcTestingArr);
    if(pndtcTestingArr !== undefined && pndtcTestingArr.status.toString() === "true"){
      //var _tempData = centralReceiptsArr.hplcDetail;
      this.pndPendingArray = pndtcTestingArr.data;
    }

    var _subjectObj = {
      "districtId": 0,
      "chcId": 0,
      "phcId": 0,
      "anmId": 0
    }
    this.PNDCService.getnotCompleteDetails(_subjectObj) .subscribe(response => {
      console.log(response);
      this.pndNotCompleteArray = response.data;
      this.dataservice.sendData(JSON.stringify({"screen": "PNDTCTESTING","pendingCount":this.pndPendingArray.length,"notcompleteCount":this.pndNotCompleteArray.length, "module": "PNDTC Obstetrician", "submodule": "PND testing" }));
    },
    (err: HttpErrorResponse) =>{
     
    });
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.getDistrictData();
    //this.dataservice.sendData(JSON.stringify({"screen": "PNDTCTESTING","pendingCount":this.pndPendingArray.length}));
    this.dtOptions = {
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
  }

  getDistrictData(){
    this.PNDTCmasterService.retrieveDistrictByPNDTLocation()
    .subscribe(response => {
      this.districts = response['data'];
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
      this.loaderService.display(false);
    },
    (err: HttpErrorResponse) =>{
      this.CHCdata = [];
      this.erroMessage = err.toString();
      this.loaderService.display(false);
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
      this.loaderService.display(false);
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
      this.loaderService.display(false);
    });
  }

  refreshData()
  {
    this.loaderService.display(true);
    var _subjectObj = {
      "districtId":this.selectedDistrict != null ? Number(this.selectedDistrict) : 0,
      "chcId":this.selectedchc != null ? Number(this.selectedchc) : 0,
      "phcId":this.selectedphc != null ? Number(this.selectedphc) : 0,
      "anmId":this.selectedAnm != null ? Number(this.selectedAnm) : 0
    }
    this.PNDCService.getPedingDetails(_subjectObj) .subscribe(response => {
      console.log(response);
      this.pndPendingArray = response.data;
      this.rerender();
      this.loaderService.display(false);
    },
    (err: HttpErrorResponse) =>{
      this.loaderService.display(false);
    });
  }

  openResultPage(data)
  {
    console.log(data);
    this.dataservice.setdata({'pndtestingResult':data});
    this.router.navigate(['/app/pndtc-testing-result']);
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

