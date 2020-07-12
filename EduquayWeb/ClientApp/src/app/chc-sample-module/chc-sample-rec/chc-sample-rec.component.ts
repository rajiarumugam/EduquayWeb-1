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

@Component({
  selector: 'app-chc-sample-rec',
  templateUrl: './chc-sample-rec.component.html',
  styleUrls: ['./chc-sample-rec.component.css']
})
export class CHCSampleRcptComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  errorMessage: string;
  errorSpouseMessage: string;
  form: FormGroup;
  ILRform:FormGroup;
  
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
  
  userId = 2;
  createdSubjectId="";

  chcReceiptsData: any[] = [];
  popupData:any;
  processingDate;


  fromDate = "";
  toDate = "";
  formCheck = false;
  selectedreceivedDate;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    zone: NgZone,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private genericService: GenericService,
    private httpClientService:HttpClientService
    ) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      processingDate: ['', Validators.required],
      receivedDate: [""]
    });
    this.ILRform= this._formBuilder.group({
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

    console.log('test');
    console.log(chcReceiptsArr);
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
    this.popupData['receiptDetail'].forEach(function(val,index){
        val.sampleTimeout = false;
        val.accept = false;
        val.reject = false;
        val.sampleDamaged = false;
        val.barcodeDamaged = false;
        
    });
    if(this.popupData.shipmentFrom === 'ANM - CHC')
    {
      this.ILRform= this._formBuilder.group({
        ilrInDateTime: [''],
        ilrOutDateTime: [""]
      });
    }
    $('#fadeinModal').modal('show');
  }

  processingDateChange()
  {
    if(this.form.get('processingDate').value.length > 0)
    {
      this.popupData['receiptDetail'].forEach(function(val,index){
        console.log(val);
        console.log(index);
        console.log(this.compareDate(this.form.get('processingDate').value,moment(val.sampleCollectionDateTime).format('DD/MM/YYYY HH:MM')));
        if(this.compareDate(this.form.get('processingDate').value,moment(val.sampleCollectionDateTime).format('DD/MM/YYYY HH:MM')) > 24)
        {
            val.sampleTimeout = true;
            val.accept = false;
            val.reject = true;
            val.sampleDamaged = false;
            val.barcodeDamaged = false;
        }
        else if(this.compareDate(this.form.get('processingDate').value,moment(val.sampleCollectionDateTime).format('DD/MM/YYYY HH:MM')) < 24 && this.compareDate(this.form.get('processingDate').value,moment(val.sampleCollectionDateTime).format('DD/MM/YYYY HH:MM')) >= 0)
        {
            val.sampleTimeout = false;
            val.accept = true;
            val.reject = false;
            val.sampleDamaged = false;
            val.barcodeDamaged = false;
        }
        else
        {
          val.sampleTimeout = true;
          val.accept = false;
          val.reject = true;
          val.sampleDamaged = false;
          val.barcodeDamaged = false;
      }
      },this);
    }
    
  }

  sampleDamageChange(index)
  {
    this.popupData['receiptDetail'][index].sampleDamaged = !this.popupData['receiptDetail'][index].sampleDamaged;
    if(this.popupData['receiptDetail'][index].sampleDamaged)
    {
      this.popupData['receiptDetail'][index].sampleTimeout = false;
      this.popupData['receiptDetail'][index].accept = false;
      this.popupData['receiptDetail'][index].reject = true;
    }else{
      if(this.compareDate(this.form.get('processingDate').value,moment(this.popupData['receiptDetail'][index].sampleCollectionDateTime).format('DD/MM/YYYY HH:MM')) > 24)
      {
        this.popupData['receiptDetail'][index].sampleTimeout = true;
        this.popupData['receiptDetail'][index].accept = false;
        this.popupData['receiptDetail'][index].reject = true;
        this.popupData['receiptDetail'][index].sampleDamaged = false;
        this.popupData['receiptDetail'][index].barcodeDamaged = false;
      }
      else if(this.compareDate(this.form.get('processingDate').value,moment(this.popupData['receiptDetail'][index].sampleCollectionDateTime).format('DD/MM/YYYY HH:MM')) < 24 && this.compareDate(this.form.get('processingDate').value,moment(this.popupData['receiptDetail'][index].sampleCollectionDateTime).format('DD/MM/YYYY HH:MM')) >= 0)
      {
        this.popupData['receiptDetail'][index].sampleTimeout = false;
        this.popupData['receiptDetail'][index].accept = true;
        this.popupData['receiptDetail'][index].reject = false;
        this.popupData['receiptDetail'][index].sampleDamaged = false;
        this.popupData['receiptDetail'][index].barcodeDamaged = false;
      }
      else
      {
        this.popupData['receiptDetail'][index].sampleTimeout = true;
        this.popupData['receiptDetail'][index].accept = false;
        this.popupData['receiptDetail'][index].reject = true;
        this.popupData['receiptDetail'][index].sampleDamaged = false;
        this.popupData['receiptDetail'][index].barcodeDamaged = false;
    }
    }
  }
  barcodeDamageChange(index)
  {
      this.popupData['receiptDetail'][index].barcodeDamaged = !this.popupData['receiptDetail'][index].barcodeDamaged;
  }
  compareDate(date1,date2)
  {
    var _d = new Date(date2);
      var a = moment(date1[0]);
      var b = moment(_d);
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
          console.log(this.form.get('processingDate').value);
          console.log(this.form.get('receivedDate').value);
          
          if(this.form.get('processingDate').value)
          {
              var user = JSON.parse(this.tokenService.getUser('lu'));
              console.log(user);
              console.log(this.popupData['receiptDetail']);
              var _sampleResult = [];

              for(var i=0;i<this.popupData['receiptDetail'].length;i++)
              {
                  var _obj = {};
                  _obj['shipmentId'] = this.popupData.shipmentId;
                  _obj['receivedDate'] = this.form.get('receivedDate').value != undefined ? moment(new Date(this.form.get('receivedDate').value)).format("DD/MM/YYYY") : '';
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
              this.httpClientService.post<any>({url:apiUrl, body: {_sampleResult}}).subscribe(response => {
                this.createdSubjectId = response.uniqueSubjectId;
                Swal.fire({icon:'success', title: 'Shipment Received Successfully',
                    showCancelButton: false, confirmButtonText: 'OK'})
                      .then((result) => {
                        if (result.value) {
                   
                        }
                        
                      });
                    },
                    (err: HttpErrorResponse) =>{
                      console.log(err);
                    });
              console.log(_sampleResult);
          }
    }
  
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
}
