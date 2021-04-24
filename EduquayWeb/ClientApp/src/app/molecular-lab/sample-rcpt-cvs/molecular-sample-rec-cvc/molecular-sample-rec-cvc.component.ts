import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { ENDPOINT } from '../../../app.constant';
declare var $: any 
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { TokenService } from 'src/app/shared/token.service';
import { GenericService } from '../../../shared/generic.service';
import { HttpClientService } from '../../../shared/http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MolecularLabsampleService } from "../../../shared/molecularlab/ml-sample.service";
import { LoaderService } from '../../../shared/loader/loader.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-molecular-sample-rec-cvc',
  templateUrl: './molecular-sample-rec-cvc.component.html',
  styleUrls: ['./molecular-sample-rec-cvc.component.css']
})
export class MolecularSampleRcptCVCComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('receivedPicker', { static: false }) receivedPicker;
 
  errorMessage: string;
  errorSpouseMessage: string;
  form: FormGroup;
  ILRform:FormGroup;
  receivedDateSelected = false;

  receiveddateOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y H:i',
    defaultDate: "",
    maxDate: new Date(Date.now()),
    enableTime: true,
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
    private dataservice: DataService,
    private MolecularLabsampleService: MolecularLabsampleService,private loaderService: LoaderService
    ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "Molecular Lab - Receipt", "page": "Receipt/Sample Receipt - CVS Specimen"}));
    this.loaderService.display(false);
    this.form = this._formBuilder.group({
      receivedDate: ["", Validators.required]
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
      }   
    };
    
    

    this.chcReceiptsData = [];
    var chcReceiptsArr = this.route.snapshot.data.mlSampleData;
    if(chcReceiptsArr !== undefined && chcReceiptsArr.status.toString() === "true"){
      this.chcReceiptsData = chcReceiptsArr.molecularLabReceipts;
      console.log(this.chcReceiptsData);
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
    if(this.popupData.shipmentFrom === 'ANM - CHC')
    {
      /*this.ILRform= this._formBuilder.group({
        ilrInDateTime: ["", Validators.required],
        ilrOutDateTime: ["", Validators.required]
      });*/
      
    }
    
    this.popupData['receiptDetail'].forEach(function(val,index){
        val.accept = true;
        val.reject = false;
        val.sampleDamaged = false;
        val.barcodeDamaged = false;
        
    });
    console.log(data.shipmentDateTime);
    this.receivedPicker.flatpickr.set({
      defaultDate: "",
      minDate: data.shipmentDateTime
    });
    
    this.processingDate = "";
    this.selectedreceivedDate = ""; 
    this.receivedPicker.flatpickr.setDate("");
    
    
    this.currentshipmentDateTime = data.shipmentDateTime;
    $('#fadeinModal').modal('show');
  }
  receivedDateChange()
  {


  }
  
  

  sampleDamageChange(index)
  {
    this.popupData['receiptDetail'][index].sampleDamaged = !this.popupData['receiptDetail'][index].sampleDamaged;
    /*if(this.popupData['receiptDetail'][index].sampleDamaged)
      this.resettingTableEvents(this.popupData['receiptDetail'][index],false,false,true,true,false);
    else{
      if(this.compareDate(this.form.get('processingDate').value,moment(this.popupData['receiptDetail'][index].sampleCollectionDateTime).format('DD/MM/YYYY HH:MM')) > 24)
        this.resettingTableEvents(this.popupData['receiptDetail'][index],true,false,true,false,false);
      else if(this.compareDate(this.form.get('processingDate').value,moment(this.popupData['receiptDetail'][index].sampleCollectionDateTime).format('DD/MM/YYYY HH:MM')) < 24 && this.compareDate(this.form.get('processingDate').value,moment(this.popupData['receiptDetail'][index].sampleCollectionDateTime).format('DD/MM/YYYY HH:MM')) >= 0)
        this.resettingTableEvents(this.popupData['receiptDetail'][index],false,true,false,false,false);
      else
        this.resettingTableEvents(this.popupData['receiptDetail'][index],true,false,true,false,false);
    }*/
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
          console.log(this.form.valid);
          if(this.form.valid)
          {
            //this.loaderService.display(true);
              var user = JSON.parse(this.tokenService.getUser('lu'));
              var _sampleResult = [];

              for(var i=0;i<this.popupData['receiptDetail'].length;i++)
              {
                  var _obj = {};
                  _obj['shipmentId'] = this.popupData.shipmentId;
                  _obj['receivedDateTime'] = this.form.get('receivedDate').value != undefined ? moment(new Date(this.form.get('receivedDate').value)).format("DD/MM/YYYY") : '';
                  _obj['sampleDamaged'] = this.popupData['receiptDetail'][i].sampleDamaged;
                  _obj['barcodeDamaged'] = this.popupData['receiptDetail'][i].barcodeDamaged;
                  _obj['isAccept'] = this.popupData['receiptDetail'][i].accept;
                  _obj['pndtFoetusId'] = this.popupData['receiptDetail'].pndtFoetusId;
                  _obj["sampleRefId"]= this.popupData['receiptDetail'].sampleRefId;
                  _obj['userId'] = user.id;

                  _sampleResult.push(_obj);
              }

              Swal.fire({ allowOutsideClick: false,
                title: 'Are you sure?',
                text: "You want to confirm?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#ffffff'
              }).then((result) => {
                if (result.value) {
                  this.loaderService.display(true);
                  var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MOLECULARLAB.ADDRECEIVEDSPECIMENTSHIPMENT);
                  this.httpClientService.post<any>({url:apiUrl, body: {"shipmentReceivedRequest":_sampleResult}}).subscribe(response => {
                    this.createdSubjectId = response.uniqueSubjectId;
                    this.loaderService.display(false);
                    if(response.status === "true")
                    {
                      Swal.fire({ allowOutsideClick: false,icon:'success', title: 'Shipment Received Successfully',
                        showCancelButton: false, confirmButtonText: 'OK'})
                          .then((result) => {
                            if (result.value) {
                              $('#fadeinModal').modal('hide');
                              this.MolecularLabsampleService.retriveMLCSVSampleReceiptList().subscribe(response => {
                                if(response.status === "true")
                                {
                                  this.chcReceiptsData = response.molecularLabReceipts;
                                  this.rerender();
                                }         
                              },
                              (err: HttpErrorResponse) =>{
                                console.log(err);
                                this.loaderService.display(false);
                              });
                              
                            }
                            
                          });
                    }else{
                        this.errorMessage = response.message;
                    }
                    
                        },
                        (err: HttpErrorResponse) =>{
                          console.log(err);
                          this.loaderService.display(false);
                        });
                }

              })
          
   
             
          }

         
    }
  
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
}
