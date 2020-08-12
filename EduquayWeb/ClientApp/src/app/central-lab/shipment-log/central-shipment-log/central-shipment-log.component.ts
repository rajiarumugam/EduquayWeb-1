import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
declare var $: any 
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { TokenService } from 'src/app/shared/token.service';
import { GenericService } from '../../../shared/generic.service';
import { HttpClientService } from '../../../shared/http-client.service';
import { centralsampleService } from 'src/app/shared/centrallab/central-sample.service';

@Component({
  selector: 'app-central-shipment-log',
  templateUrl: './central-shipment-log.component.html',
  styleUrls: ['./central-shipment-log.component.css']
})
export class CentralCentralShipmentComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('receivedPicker', { static: false }) receivedPicker;
  @ViewChild('processingPicker', { static: false }) processingPicker;
  
  errorMessage: string;
  errorSpouseMessage: string;
  form: FormGroup;
  receivedDateSelected = false;
  maxmDays = 8;
  selectedShipmentLog;
  
  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: "",
    maxDate: new Date(Date.now())
  };
  startOptions1: FlatpickrOptions = {
    enableTime: true,
    dateFormat: 'd/m/Y h:i',
    defaultDate: "",
    maxDate: new Date(),
    static: true
  };
  
  receiveddateOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: "",
    maxDate: new Date(Date.now())
  };

  processingOption: FlatpickrOptions = {
    mode: 'single',
    defaultDate: "",
    enable: ["22/10/2036"],
    enableTime: true,
    dateFormat: 'd/m/Y H:i',
    time_24hr: true,
    maxDate: new Date(Date.now()),
    static: true
  };
  createdSubjectId="";

  centralReceiptsData: any[] = [];
  popupData:any;
  processingDate;


  fromDate = "";
  toDate = "";
  formCheck = false;
  selectedreceivedDate;
  currentshipmentDateTime;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    zone: NgZone,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private genericService: GenericService,
    private httpClientService:HttpClientService,
    private centralsampleService: centralsampleService
    ) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      processingDate: ['', Validators.required],
      receivedDate: ["", Validators.required]
    });
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 5,
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
    
    this.centralReceiptsData = [];
    var cetralReceiptsArr = this.route.snapshot.data.positiveSubjects;
    console.log(cetralReceiptsArr);
    if(cetralReceiptsArr !== undefined && cetralReceiptsArr.status.toString() === "true"){
      this.centralReceiptsData = cetralReceiptsArr.shipmentLogs;
      console.log(this.centralReceiptsData);
      //this.centralReceiptsData = [{}];
    }
    else{
      this.errorMessage = cetralReceiptsArr.message;
    }
  }
  
  openPopup(data,id) {
    this.selectedShipmentLog = id;
    console.log(this.selectedShipmentLog );
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
    ngAfterViewInit(): void {
      this.dtTrigger.next();
    }   
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
}
