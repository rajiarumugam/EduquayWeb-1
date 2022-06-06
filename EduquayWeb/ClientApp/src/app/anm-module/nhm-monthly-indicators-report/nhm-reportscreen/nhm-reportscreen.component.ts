import { Component, OnInit, Pipe, NgZone, ViewChild, NgModule } from '@angular/core';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { DistrictResponse, District } from 'src/app/shared/master/district/district.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { HttpClientService } from '../../../shared/http-client.service';
import { ENDPOINT } from '../../../app.constant';
import { GenericService } from '../../../shared/generic.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { TokenService } from 'src/app/shared/token.service';
declare var $: any 
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { AddScreenService } from 'src/app/shared/NHM-Monthly-Indicators/add-screen/add-screen.service';
import { ScreenList } from 'src/app/shared/NHM-Monthly-Indicators/add-screen/add-screen-response';
declare var exposedFunction;


@Component({
  selector: 'app-nhm-reportscreen',
  templateUrl: './nhm-reportscreen.component.html',
  styleUrls: ['./nhm-reportscreen.component.css']
})

export class NHMReportScreenRegistrationComponent implements OnInit {
  //@ViewChild('f', { static: false }) subRegBasic: NgForm;
  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild('dorPicker', { static: false }) DORPicker;
  @ViewChild('dobPicker', { static: false }) DOBPicker;
  @ViewChild('lmpdatePicker', { static: false }) LMPPicker;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  DAY = 86400000;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";  
  districts: District[] = [];
  erroMessage: string;
  firstFormGroup: FormGroup;
  firstFormCheck = false;
  selectedDistrict = null;
  GPLADATA = [{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'},{id:'10',value:'10'}];
  GPLAADATA = [{id:'00',value:'0'},{id:'1',value:'1'},{id:'2',value:'2'},{id:'3',value:'3'},{id:'4',value:'4'},{id:'5',value:'5'},{id:'6',value:'6'},{id:'7',value:'7'},{id:'8',value:'8'},{id:'9',value:'9'}];
 
  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'F Y',
    altFormat: "F Y",
    defaultDate: new Date(Date.now()),
    "disable": [
      function(date) {
          // return true to disable
          return (date.getDate() > 1);

      }
  ],
  };
 
 
  selecteddor = new Date(Date.now());
  selectedlmpdate;
  user;
  createdSubjectId="";

  fromDate ;
  toDate;
  dateform:FormGroup;
  pndPendingArray  :ScreenList[] ; 
  selectedspouseEmail;
  Ldisabled = true;
  Pdisabled = true;
  Adisabled = true;
  statelist = [];
  ageValidate = false;
  constructor(private masterService: masterService,
     private addscreenreportService:AddScreenService,
      private loaderService: LoaderService,
      private route: ActivatedRoute,
      zone: NgZone,
      private _formBuilder: FormBuilder,
      private httpClientService:HttpClientService,
      private genericService: GenericService,
      private tokenService: TokenService,
      private router: Router, 
      private dataservice: DataService) {
    window['angularComponentReference'] = {
      zone: zone,
      componentFn: (id, value) => this.callFromOutside(id, value),
      component: this,
    };
  }

  ngOnInit() {  
    this.dataservice.sendData(JSON.stringify({"module": "ANM", "submodule": "Subject Registration", "page": "Spouse Registration"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 20,
      processing: true,
      stripeClasses: [],
      lengthMenu: [5, 10, 20, 50],
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
    this.dateform = this._formBuilder.group({
      fromDate: [''],
      toDate: ['']
    });
    // this.loaderService.display(false);
    // var pndtcTestingArr = this.route.snapshot.data.pndtcTesting;
    // this.dateform = this._formBuilder.group({
    //   fromDate: [''],
    //   toDate: [''],  
    // });
    this.getDistrictData();

   

  }

  public callFromOutside(id, subject: any): any {
    let subjectdetail = JSON.parse(subject);
  }
  selected(eventval){
    console.log(eventval);
  }

calculatepercentage(proposed,samples)
{
  if(proposed!=0)
  {
    let percentage=((proposed/samples)*100).toFixed(2);
    return percentage
  }
  else
  {
    return 0
  }
}

  getDistrictData(){
    this.masterService.getuserBasedDistrict()
    .subscribe(response => {
      this.districts = response['district'];
      this.selectedDistrict = this.user.districtId;
    },
    (err: HttpErrorResponse) =>{
      this.districts = [];
      this.erroMessage = err.toString();
    });
  }
 
      refreshData()
      {
        this.loaderService.display(true);
        
        var _subjectObj = {
          // "fromDate": this.fromDate != '' ? moment(new Date(this.fromDate)).format("DD/MM/YYYY") : '',
          // "toDate": this.toDate != '' ? moment(new Date(this.toDate)).format("DD/MM/YYYY") : ''
          "monthId": new Date(this.dateform.value.fromDate).getMonth()+1,
            "yearId": new Date(this.dateform.value.fromDate).getFullYear()
          
        }
        this.addscreenreportService.addscreenreport(_subjectObj).subscribe(response => {
          this.pndPendingArray = response.data;
         
          this.loaderService.display(false);
           this.rerender();
         
        },
        (err: HttpErrorResponse) =>{
          this.loaderService.display(false);
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

    prePopulateFormDetails()
    {
      setTimeout(()=>{    
          this.selectedDistrict = this.user.districtId;
          this.selecteddor = new Date(Date.now());
          this.DORPicker.flatpickr.setDate(new Date(Date.now()- (this.DAY*0.00025)));
          this.LMPPicker.flatpickr.setDate(new Date(Date.now()- (this.DAY*30.00025)));
          this.DOBPicker.flatpickr.setDate(""); 
        }, 100);
    }
    ngAfterViewInit(): void {
      this.dtTrigger.next();
    }   

    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
    
}
