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
import { type } from 'jquery';

@Component({
  selector: 'app-patho-repot-sample-status-print',
  templateUrl: './patho-repot-sample-status-print.component.html',
  styleUrls: ['./patho-repot-sample-status-print.component.css']
})
export class PathoreportSampleStatusPrintComponentNHM implements AfterViewInit, OnDestroy, OnInit {

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
  districts1: any;
  blocklists1: any;
  CHCdata1: any;
  ANMdata1: any;
  constructor(private PNDTCmasterService: PNDTCmasterService,private tokenService: TokenService,private route: ActivatedRoute,private PNDCService:PNDCService
    ,private dataservice: DataService,private router: Router,private _formBuilder: FormBuilder, private pathoHPLCService:pathoHPLCService,private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.currentDate = moment(new Date()).format("DD-MM-YYYY");
    this.loaderService.display(false);
    var pndtcTestingArr = this.route.snapshot.data.pndtcTesting;
    this.dateform = this._formBuilder.group({
      fromDate: [''],
      toDate: [''],
      block: [''],
      district: [''],
      chc: [''],
      anm: [''],
    });

    this.fromDate = new Date(Date.now()- (this.DAY*7));
    this.toDate = new Date(Date.now());
    this.selectedDistrict = null;

    this.getDistrictData();
    
    
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

    /*this.pickerStart.flatpickr.set({
      defaultDate: new Date()
    });
    this.pickerEnd.flatpickr.set({
      defaultDate: new Date()
    });*/
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
  getDistrictData(){
    this.PNDTCmasterService.getPNDTCDistrict()
    .subscribe(response => {
      this.districts1 = response['data'];
      this.districts1.forEach(function(val,i){
        console.log(val.id,this.user.districtId,Number(val.id) ===Number(this.user.districtId),typeof(this.user.districtId),typeof(val.id))
        if(val.id ===this.user.districtId)
        {
        
          this.districts.push(val);
        }
    },this);
    if(this.user.districtId==0){
      this.districts=this.districts1
    }
      console.log(this.user)
      this.selectedDistrict = this.user.districtId;
      this.getBlockData();
      
    },
    (err: HttpErrorResponse) =>{
      this.districts = [];
      //this.erroMessage = err.toString();
    });
  }
  getBlockData(){
    if(this.selectedDistrict != null)
    {
        this.loaderService.display(true);
        this.ANMdata = [];
        this.selectedAnm = null;
        this.PNDTCmasterService.getBlockByDistrict(this.selectedDistrict)
        .subscribe(response => {
          this.blocklists1 = response['data'];
          this.blocklists1.forEach(function(val,i){
          console.log(val.id,this.user.blockId,Number(val.id) ==Number(this.user.blockid),typeof(this.user.blockId),typeof(val.id))
            if(val.id ===this.user.blockId )
            {
              
              this.blocklists.push(val);
            }
          
        },this);
         if(this.user.blockId==0){
           this.blocklists=this.blocklists1
         }
          this.selectedBlock=this.user.blockId
          this.loaderService.display(false);
          this.getCHCData();
        },
        (err: HttpErrorResponse) =>{
          this.blocklists = [];
          this.erroMessage = err.toString();
        });
    }
    else
    {
      this.blocklists = [];
      this.CHCdata = [];
      this.selectedBlock = null;
      this.selectedAnm = null
      this.selectedchc = null;
      this.ANMdata = [];
    }
    
    
  }
  getCHCData(){
    if(this.selectedBlock != null)
    {
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
    else
    {
      this.CHCdata = [];
      this.PHCdata = [];
      this.ANMdata = [];
      this.selectedchc = null;
      this.selectedBlock = null;
      this.selectedAnm = null
    }
     

  }
  chcChange(){
    if(this.selectedchc != null)
    {
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
      else
        this.PHCdata = [];

  }
  getANMData(){
    if(this.selectedchc != null)
    {
        this.loaderService.display(true);
        this.PNDTCmasterService.getANMByCHC(this.selectedchc)
        .subscribe(response => {
          this.ANMdata = response['data'];
          this.loaderService.display(false);
         
        
        console.log(this.selectedAnm)
     
        
          
        },
        (err: HttpErrorResponse) =>{
          this.ANMdata = [];
          this.erroMessage = err.toString();
        });
    }
    else
        this.ANMdata = [];
    
  }
  phcChange(){
    if(this.selectedphc != null)
    {
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
    else
      this.ANMdata = [];
    
  }

  districtselected(event)
  {
      this.getBlockData();
  }
  blockselected(event)
  {
    this.getCHCData();
  }
  refreshData()
  {
    this.loaderService.display(true);
    var _subjectObj = {
      "sampleStatus": this.selectedSampleStatus != null ? Number(this.selectedSampleStatus) : 0,
      "districtId": this.selectedDistrict != null ? Number(this.selectedDistrict) : 0,
      "blockId":this.selectedBlock != null ? Number(this.selectedBlock) : 0,
      "chcId":this.selectedchc != null ? Number(this.selectedchc) : 0,
      "anmId":this.selectedAnm != null ? Number(this.selectedAnm) : 0,
      "fromDate": this.fromDate != '' ? moment(new Date(this.fromDate)).format("DD/MM/YYYY") : '',
      "toDate": this.toDate != '' ? moment(new Date(this.toDate)).format("DD/MM/YYYY") : ''
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
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}

