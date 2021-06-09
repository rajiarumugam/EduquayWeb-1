import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { HttpClientService } from '../../../../shared/http-client.service';
import { ENDPOINT } from '../../../../app.constant';
import { GenericService } from '../../../../shared/generic.service';
import { Subject } from 'rxjs';
import { TokenService } from 'src/app/shared/token.service';
import { DataTableDirective } from 'angular-datatables';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { DataService } from '../../../../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'che-spouse-registration',
  templateUrl: './che-spouse-registration.component.html',
  styleUrls: ['./che-spouse-registration.component.css']
})
export class CheSpouseRegistrationComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('dorPicker', { static: false }) DORPicker;
  @ViewChild('dobPicker', { static: false }) DOBPicker;
  @ViewChild('startPicker', { static: false }) pickerStart;
  @ViewChild('endPicker', { static: false }) pickerEnd;
  DAY = 86400000;
  erroMessage: string;
  dateform:FormGroup;
  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: new Date(Date.now()),
    maxDate: new Date(Date.now())
  };
  startOptions1: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: "",
    maxDate: ""
  };
  startOptions2: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: "",
    maxDate: ""
  };
  startOptionsDOR: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: new Date(Date.now()),
    maxDate: new Date(Date.now())
  };
  user;
  createdSubjectId="";

  spouseData = [];

  fromDate = "";
  toDate = "";
  currentPage = "";
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(zone: NgZone,private httpClientService:HttpClientService,private genericService: GenericService,private tokenService: TokenService,private _formBuilder: FormBuilder,private DataService:DataService,private router: Router) { }

  ngOnInit() {
    if (this.router.url.indexOf('/block-subregn') > -1) {
        this.DataService.sendData(JSON.stringify({"module": "Block - REG & SAMPLING", "submodule": " Registration", "page": "Married & Spouse Registered"}));
    }
    else
    {
      this.DataService.sendData(JSON.stringify({"module": "CHC - REG & SAMPLING", "submodule": " Registration", "page": "Married & Spouse Registered"}));
    }
    
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.dateform = this._formBuilder.group({
      fromDate: [''],
      toDate: ['']
    });
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
        //Search: '<a class="btn searchBtn" id="searchBtn"><i class="fa fa-search"></i></a>'
        
      } 
    };
    

     // End Date Changes
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
    this.getSpouseDetails();
  }

  getSpouseDetails()
  {
    var _subjectObj = {
      "chcId":this.user.chcId,
      "fromDate":this.fromDate != '' ? moment(new Date(this.fromDate)).format("DD/MM/YYYY") : '',
      "toDate":this.toDate != '' ? moment(new Date(this.toDate)).format("DD/MM/YYYY") : '',
      "registeredFrom":this.user.registeredFrom
    }
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.SUBJECT.RETRIVECHCANWPOSITIVESUBJECTS);
    //var apiUrl = this.genericService.buildApiUrl(ENDPOINT.SUBJECT.RETRIVE);
        this.httpClientService.post<any>({url:apiUrl, body: _subjectObj }).subscribe(response => {
          console.log(response);
          setTimeout(function(){
            this.spouseData = response.anwPositiveSubjects;
            console.log(this.spouseData);
            this.rerender();
          }.bind(this),1);
          
        },
        (err: HttpErrorResponse) =>{
          console.log(err);
        });
  }
  refreshData()
  {
    this.getSpouseDetails();
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
