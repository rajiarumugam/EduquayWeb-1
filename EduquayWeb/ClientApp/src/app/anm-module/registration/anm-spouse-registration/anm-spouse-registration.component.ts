import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { DistrictResponse, District } from 'src/app/shared/master/district/district.model';
import { HttpErrorResponse } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { HttpClientService } from '../../../shared/http-client.service';
import { GenericService } from '../../../shared/generic.service';
declare var $: any 
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { SpouseregistrationService } from 'src/app/shared/anm-module/registration/spouse/spouseregistration.service';
import { PositiveSpouseResponse, positiveSubject } from 'src/app/shared/anm-module/registration/spouse/spouseregistration.models';
import { DataTableDirective } from 'angular-datatables';
import { TokenService } from 'src/app/shared/token.service';
import { DataService } from 'src/app/shared/data.service';


@Component({
  selector: 'app-anm-spouse-registration',
  templateUrl: './anm-spouse-registration.component.html',
  styleUrls: ['./anm-spouse-registration.component.css']
})
export class AnmSpouseRegistrationComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('startPicker1', { static: false }) pickerStart;
  @ViewChild('endPicker', { static: false }) pickerEnd;

  positiveSpouseResponse: PositiveSpouseResponse;
  districts: District[] = [];
  errorMessage: string;
  errorSpouseMessage: string;
  dateform:FormGroup;
  DAY = 86400000;
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
  user;
  createdSubjectId="";
  

  spouseData: positiveSubject[] = [];

  fromDate = "";
  toDate = "";



  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    zone: NgZone,
    private _formBuilder: FormBuilder,
    private spouseregistrationService: SpouseregistrationService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private dataservice: DataService
    ) { }

  ngOnInit() {
    
    this.dataservice.sendData(JSON.stringify({"module": "ANM", "submodule": "Subject Registration", "page": "Spouse Registration"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
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
    
    this.dateform = this._formBuilder.group({
      fromDate: [''],
      toDate: ['']
    });
    

    this.spouseData = [];
    var positiveSpouseResponse = this.route.snapshot.data.positiveSubjects;
    if(positiveSpouseResponse !== undefined && positiveSpouseResponse.status.toString() === "true"){
      this.spouseData = positiveSpouseResponse.anwSubjects;
    }
    else{
      this.errorMessage = positiveSpouseResponse.message;
    }

    console.log(this.spouseData);
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
  }

  fromDateChange()
  {
      console.log(this.fromDate);
  }
  getSpouseDetails() {
    var _subjectObj = {
      "anmId": this.user.id,
      "fromDate": this.fromDate != '' ? moment(new Date(this.fromDate)).format("DD/MM/YYYY") : '',
      "toDate": this.toDate != '' ? moment(new Date(this.toDate)).format("DD/MM/YYYY") : ''
    }
    this.spouseregistrationService.spouseDetails(_subjectObj).subscribe(response => {
      this.positiveSpouseResponse = response;
      if(this.positiveSpouseResponse !== undefined && this.positiveSpouseResponse.status.toString() === "true"){
        if(this.positiveSpouseResponse.anwSubjects.length > 0){
          this.spouseData = this.positiveSpouseResponse.anwSubjects;
        }
        else{
          this.errorMessage = this.positiveSpouseResponse.message;  
        }
        this.rerender();
      }
      else{
        this.errorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        console.log(err);
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
    ngAfterViewInit(): void {
      this.dtTrigger.next();
    }   

    refreshData()
    {
      this.getSpouseDetails();
    }
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
}
