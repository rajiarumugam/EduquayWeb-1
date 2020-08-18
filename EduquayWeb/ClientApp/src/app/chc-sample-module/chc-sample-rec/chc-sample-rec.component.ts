import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { ENDPOINT } from './../../app.constant';
declare var $: any 
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { TokenService } from 'src/app/shared/token.service';
import { GenericService } from './../../shared/generic.service';
import { HttpClientService } from './../../shared/http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { chcsampleService } from 'src/app/shared/chc-sample/chc-sample.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-chc-sample-rec',
  templateUrl: './chc-sample-rec.component.html',
  styleUrls: ['./chc-sample-rec.component.css']
})
export class CHCSampleRcptComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('receivedPicker', { static: false }) receivedPicker;
  @ViewChild('processingPicker', { static: false }) processingPicker;
  @ViewChild('ilrInDatePicker', { static: false }) ilrInDatePicker;
  @ViewChild('ilrOutDatePicker', { static: false }) ilrOutDatePicker;
  
  errorMessage: string;
  errorSpouseMessage: string;
  form: FormGroup;
  ILRform:FormGroup;
  receivedDateSelected = false;
  ILRInDate;
  ILROutDate;
  processingDateEnter = false;
  
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
  ilrInDateOptions: FlatpickrOptions = {
    enableTime: true,
    dateFormat: 'd/m/Y H:i',
    defaultDate: "",
    maxDate: new Date(),
    static: true,
    time_24hr: true,
    enable: ["22/10/2036"]
  };
  ilrOutDateOptions: FlatpickrOptions = {
    enableTime: true,
    dateFormat: 'd/m/Y H:i',
    defaultDate: "",
    maxDate: new Date(),
    static: true,
    time_24hr: true,
    enable: ["22/10/2036"]
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

  chcReceiptsData: any[] = [];
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
    private chcsampleService: chcsampleService,
    private dataservice: DataService
    ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "CHC- SAMPLE REC & PROCESS", "page": "Sample Receipt"}));
    this.form = this._formBuilder.group({
      processingDate: ['', Validators.required]/*,
      receivedDate: ["", Validators.required]*/
    });
    this.ILRform= this._formBuilder.group({
      ilrInDateTime: [''],
        ilrOutDateTime: [""]
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
    
    

    this.chcReceiptsData = [];
    var chcReceiptsArr = this.route.snapshot.data.positiveSubjects;
    if(chcReceiptsArr !== undefined && chcReceiptsArr.status.toString() === "true"){
      this.chcReceiptsData = chcReceiptsArr.chcReceipts;
    }
    else{
      this.errorMessage = chcReceiptsArr.message;
    }
  }
  
  openPopup(data) {
    console.log(data);
    var _data:any = data;
    this.popupData = _data;
    this.formCheck = false;
    this.currentshipmentDateTime = data.shipmentDateTime;
    this.processingPicker.flatpickr.setDate("");
    this.processingPicker.flatpickr.set({
      enable: ["22/10/2036"]
    });
    if(this.popupData.shipmentFrom === 'CHC - CHC')
    {
      this.processingPicker.flatpickr.set({
        maxDate: new Date(Date.now()),
        minDate: data.shipmentDateTime,
        enable: [],
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
      }); 
    }
    
    this.popupData['receiptDetail'].forEach(function(val,index){
        val.sampleTimeout = false;
        val.accept = false;
        val.reject = false;
        val.sampleDamaged = false;
        val.barcodeDamaged = false;
        
    });
    
    /*this.receivedPicker.flatpickr.set({
      defaultDate: "",
      minDate: data.shipmentDateTime
    });*/
    /*this.processingPicker.flatpickr.set({
      defaultDate: "",
      minDate: data.shipmentDateTime
    });*/
    if(this.ilrInDatePicker)
    {
        /*this.ilrInDatePicker.flatpickr.set({
          defaultDate: ""
        });
        */
        
        this.ilrInDatePicker.flatpickr.set({
          maxDate: new Date(Date.now()),
          minDate: this.currentshipmentDateTime,
          enable: [],
          enableTime: true,
          dateFormat: 'd/m/Y H:i',
        });
        this.ilrInDatePicker.flatpickr.setDate("");
    }
    else{
     
    }
    if(this.ilrOutDatePicker)
    {
      this.ilrOutDatePicker.flatpickr.set({
        defaultDate: ""
      });
      this.ilrOutDatePicker.flatpickr.setDate("");
    }
    
    this.processingDate = "";
    this.selectedreceivedDate = ""; 
    this.ILRInDate = "";
    this.ILROutDate = ""; 
    //this.processingPicker.flatpickr.setDate("");
    //this.receivedPicker.flatpickr.setDate("");
    
    /*this.processingPicker.flatpickr.set({
      maxDate: new Date(Date.now()),
      minDate: this.currentshipmentDateTime,
      enable: [],
      enableTime: true,
      dateFormat: 'd/m/Y H:i',
    });*/
    
    $('#fadeinModal').modal('show');
  }
  receivedDateChange()
  {

      this.processingPicker.flatpickr.set({
        minDate: new Date(this.selectedreceivedDate),
        enable: [],
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
      });
      this.ilrInDatePicker.flatpickr.set({
        maxDate: new Date(this.selectedreceivedDate),
        minDate: this.currentshipmentDateTime,
        enable: [],
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
      });
  }
  inDateChange()
  {
    this.ilrOutDatePicker.flatpickr.setDate("");
    this.processingPicker.flatpickr.setDate("");
    this.ilrOutDatePicker.flatpickr.set({
      minDate: new Date(this.ILRInDate),
      maxDate: new Date(Date.now()),
      enable: [],
      enableTime: true,
      dateFormat: 'd/m/Y H:i',
    });
    this.processingPicker.flatpickr.set({
    enable: ["22/10/2036"]
    });
  }
  outDateChange()
  {
      this.processingPicker.flatpickr.setDate("");
      this.processingPicker.flatpickr.set({
        maxDate: new Date(Date.now()),
        minDate:  new Date(this.ILROutDate),
        enable: [],
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
      });
  }
  processingDateChange()
  {
    if(this.form.get('processingDate').value.length > 0)
    {
      this.popupData['receiptDetail'].forEach(function(val,index){
        if(this.compareDate(this.form.get('processingDate').value,val.sampleCollectionDateTime) > 24)
            this.resettingTableEvents(val,true,false,true,false,false);
        else if(this.compareDate(this.form.get('processingDate').value,val.sampleCollectionDateTime) < 24 && this.compareDate(this.form.get('processingDate').value,val.sampleCollectionDateTime) >= 0)
            this.resettingTableEvents(val,false,true,false,false,false);
        else
          this.resettingTableEvents(val,true,false,true,false,false);
      },this);
      this.processingDateEnter= true;
    }
    
  }

  sampleDamageChange(index)
  {
    this.popupData['receiptDetail'][index].sampleDamaged = !this.popupData['receiptDetail'][index].sampleDamaged;
    if(this.popupData['receiptDetail'][index].sampleDamaged)
      this.resettingTableEvents(this.popupData['receiptDetail'][index],false,false,true,true,false);
    else{
      if(this.compareDate(this.form.get('processingDate').value,this.popupData['receiptDetail'][index].sampleCollectionDateTime) > 24)
      {
        this.resettingTableEvents(this.popupData['receiptDetail'][index],true,false,true,false,false);
      }  
      
      else if(this.compareDate(this.form.get('processingDate').value,this.popupData['receiptDetail'][index].sampleCollectionDateTime) < 24 && this.compareDate(this.form.get('processingDate').value,this.popupData['receiptDetail'][index].sampleCollectionDateTime) >= 0)
      {
          this.resettingTableEvents(this.popupData['receiptDetail'][index],false,true,false,false,false);
      }  
      else
      {
        this.resettingTableEvents(this.popupData['receiptDetail'][index],false,true,false,false,false);
      }
       
    }
  }

  resettingTableEvents(arr,sampleTO,accept,reject,sampleD,barcodeD)
  {
      arr.sampleTimeout = sampleTO;
      arr.accept = accept;
      arr.reject = reject;
      arr.sampleDamaged = sampleD;
      arr.barcodeDamaged = barcodeD;
  }
  barcodeDamageChange(index)
  {
      this.popupData['receiptDetail'][index].barcodeDamaged = !this.popupData['receiptDetail'][index].barcodeDamaged;
  }
  compareDate(date1,date2)
  {
      var _d = date2;
      var a = moment(date1[0]);
      let _temp1 = _d.split(" ")[0];
      let _temp2 = _temp1.split("/")[2]+"-"+_temp1.split("/")[1]+"-"+_temp1.split("/")[0]+" "+_d.split(" ")[1];
      var b = moment(_temp2);
      return (a.diff(b, 'hours')); 
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
  
    sampleSubmit()
    {
          this.formCheck = true;
          if(this.ILRform.valid && this.form.valid)
          {
              var user = JSON.parse(this.tokenService.getUser('lu'));
              var _sampleResult = [];

              for(var i=0;i<this.popupData['receiptDetail'].length;i++)
              {
                  var _obj = {};
                  _obj['shipmentId'] = this.popupData.shipmentId;
                  _obj['receivedDate'] = this.form.get('processingDate').value != undefined ? moment(new Date(this.form.get('processingDate').value)).format("DD/MM/YYYY") : '';
                  _obj['proceesingDateTime'] = this.form.get('processingDate').value != undefined ? moment(new Date(this.form.get('processingDate').value)).format("DD/MM/YYYY HH:MM") : '';
                  if(this.popupData.shipmentFrom === 'ANM - CHC')
                  {
                    _obj['ilrInDateTime'] = this.ILRform.get('ilrInDateTime').value != undefined ? moment(new Date(this.ILRform.get('ilrInDateTime').value)).format("DD/MM/YYYY HH:MM") : '';
                    _obj['ilrOutDateTime'] = this.ILRform.get('ilrOutDateTime').value != undefined ? moment(new Date(this.ILRform.get('ilrOutDateTime').value)).format("DD/MM/YYYY HH:MM") : '';
                  }
                  else{
                    _obj['ilrInDateTime'] = "";
                    _obj['ilrOutDateTime'] = "";
                  }
                    _obj['sampleDamaged'] = this.popupData['receiptDetail'][i].sampleDamaged;
                  _obj['sampleTimeout'] = this.popupData['receiptDetail'][i].sampleTimeout;
                  _obj['barcodeDamaged'] = this.popupData['receiptDetail'][i].barcodeDamaged;
                  _obj['isAccept'] = this.popupData['receiptDetail'][i].accept;
                  _obj['barcodeNo'] = this.popupData['receiptDetail'][i].barcodeNo;
                  _obj['updatedBy'] = user.id;

                  _sampleResult.push(_obj);
              }
              var apiUrl = this.genericService.buildApiUrl(ENDPOINT.CHC_SAMPLE_REC.ADDRECEIVEDSHIPMENT);
              this.httpClientService.post<any>({url:apiUrl, body: {"shipmentReceivedRequest":_sampleResult}}).subscribe(response => {
                this.createdSubjectId = response.uniqueSubjectId;
                if(response.status === "true")
                {
                  Swal.fire({icon:'success', title: 'Shipment Received Successfully',
                    showCancelButton: false, confirmButtonText: 'OK'})
                      .then((result) => {
                        if (result.value) {
                          $('#fadeinModal').modal('hide');
                          this.chcsampleService.retriveCHCReceipt().subscribe(response => {
                            if(response.status === "true")
                            {
                              this.chcReceiptsData = response.chcReceipts;
                              this.rerender();
                            }        
                          },
                          (err: HttpErrorResponse) =>{
                            console.log(err);
                          });
                        }
                      });
                }else{
                    this.errorMessage = response.message;
                }
                
                    },
                    (err: HttpErrorResponse) =>{
                      console.log(err);
                    });
          }

         
    }
  
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
}
