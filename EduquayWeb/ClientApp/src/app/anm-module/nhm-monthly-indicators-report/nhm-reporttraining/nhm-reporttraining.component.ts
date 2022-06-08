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
import { AddScreenService } from 'src/app/shared/NHM-Monthly-Indicators/add-screen/add-screen.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { ScreenList, TrainingList } from 'src/app/shared/NHM-Monthly-Indicators/add-screen/add-screen-response';

@Component({
  selector: 'app-nhm-reporttraining',
  templateUrl: './nhm-reporttraining.component.html',
  styleUrls: ['./nhm-reporttraining.component.css']
})
export class NHMReportTrainingRegistrationComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('startPicker1', { static: false }) pickerStart;
  @ViewChild('endPicker', { static: false }) pickerEnd;
  dtOptions: any = {};
  positiveSpouseResponse: PositiveSpouseResponse;
  districts: District[] = [];
  errorMessage: string;
  pndPendingArray:TrainingList[];
  errorSpouseMessage: string;
  dateform:FormGroup;
  DAY = 86400000;
  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'F Y',
    altFormat: "F  Y",
    defaultDate: "today",
    "disable": [
      function(date) {
          // return true to disable
          return (date.getDate() >1);

      }
  ],
   
  };

  
  user;
  createdSubjectId="";
 spouseData: positiveSubject[] = [];
  fromDate = "";
  previousValue: number;
  toDate = "";
  dtTrigger: Subject<any> = new Subject();
  constructor(
    zone: NgZone,
    private _formBuilder: FormBuilder,
    private spouseregistrationService: SpouseregistrationService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private dataservice: DataService,
    private addtrainingreportservice:AddScreenService,
    private loaderService: LoaderService
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

 
  CalculatePercentage(heldDLO,plannedDLO) {
    if(plannedDLO!=0) {
    let percentage = ((heldDLO/plannedDLO) * 100).toFixed(2);
    return percentage;
  }
  else{
  return 0;
  }
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
      this.loaderService.display(true); 
      var _subjectObj = {
        // "fromDate": this.fromDate != '' ? moment(new Date(this.fromDate)).format("DD/MM/YYYY") : '',
        // "toDate": this.toDate != '' ? moment(new Date(this.toDate)).format("DD/MM/YYYY") : ''
       
        "monthId": new Date(this.dateform.value.fromDate).getMonth()+1,
        "yearId": new Date(this.dateform.value.fromDate).getFullYear()
      }
      // this.addscreenreportService.addscreenreport(_subjectObj).subscribe(response => {
      this.addtrainingreportservice.addtrainingreport(_subjectObj).subscribe(async response => {
        this.pndPendingArray = response.data;
        this.loaderService.display(false);
        this.rerender();
       
      },
      (err: HttpErrorResponse) =>{
        this.loaderService.display(false);
      });
     
    }
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }

}
