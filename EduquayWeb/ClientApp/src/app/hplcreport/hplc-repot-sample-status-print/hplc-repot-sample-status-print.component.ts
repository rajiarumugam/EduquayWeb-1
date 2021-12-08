import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from 'src/app/shared/token.service';
import { ActivatedRoute } from '@angular/router';
import { PNDTCmasterService } from "./../../shared/pndtc/pndtc-masterdata.service";
import { PNDCService } from "./../../shared/pndtc/pndc.service";
import { DataService } from 'src/app/shared/data.service';
import { Router } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
declare var $: any;
import * as moment from 'moment';
import { chcsampleService } from "./../../shared/chc-sample/chc-sample.service";
import { LoaderService } from './../../shared/loader/loader.service';
import { pathoHPLCService } from "./../../shared/pathologist/patho-hplc.service";
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-hplc-repot-sample-status-print',
  templateUrl: './hplc-repot-sample-status-print.component.html',
  styleUrls: ['./hplc-repot-sample-status-print.component.css']
})
export class HplcreportSampleStatusPrintComponent implements AfterViewInit, OnDestroy, OnInit {

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
  RetrieveDiagnosisSampleStatusbybarcode="api/v1/Pathologist/RetrievePathologistReportsByBarcode?barcode=";

  constructor(private PNDTCmasterService: PNDTCmasterService,private tokenService: TokenService,private route: ActivatedRoute,private PNDCService:PNDCService, private authService: AuthService,
    private dataservice: DataService,private router: Router,private _formBuilder: FormBuilder, private pathoHPLCService:pathoHPLCService,private loaderService: LoaderService,private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.currentDate = moment(new Date()).format("DD-MM-YYYY");
    this.getuserHPLCData();
  }


  getuserHPLCData(){
    console.log(sessionStorage.getItem('hplcuserDetails'));
    if(sessionStorage.getItem('hplcuserDetails') === undefined || sessionStorage.getItem('hplcuserDetails') === null || sessionStorage.getItem('hplcuserDetails') === '')
    {
      this.router.navigate(['/home/hplclogin']);
    }
    let _hplcUserDetails = JSON.parse(sessionStorage.getItem('hplcuserDetails'));
      let adddamagedsample = this.authService.retrievehplcByBarcode(_hplcUserDetails)
      .subscribe(response => {
       console.log(response);

        this.printArray = response.subjects[0];
      },
      (err: HttpErrorResponse) =>{

      });

  }

  openResultPage(data)
  {
    $('#fadeinModal').modal('show');
  }

  ngAfterViewInit(): void {

  }
  printPdf()
  {
    console.log('print pdf');
    setTimeout(() => {
      window.print();
    }, 1);
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

