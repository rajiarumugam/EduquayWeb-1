import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe } from '@angular/common'

declare var $: any 
import { DataService } from '../../../shared/data.service';
import { errorCorrectionService } from 'src/app/shared/errorcorrection/error-correction.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import * as moment from 'moment'
import { TokenService } from '../../../shared/token.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { FlatpickrOptions } from 'ng2-flatpickr';



@Component({
  selector: 'app-rch-correction',
  templateUrl: './sst-correction.component.html',
  styleUrls: ['./sst-correction.component.css']
})
export class SSTCorrectionComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  errorMessage: string;
  errorSpouseMessage: string;

  centralReceiptsData: any[] = [];
  popupData:any;
  processingDate;
  centralPickpackPendingData = [];
  pickpackStartList = [];
  searchbarcode;
  secondFormCheck = false;
  popupform:FormGroup;
  secondFormGroup: FormGroup;
  selectedRevisedBarcode;
  RevisedBarcode1;
  barcodeValid = false;
  user;


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    zone: NgZone,
    private route: ActivatedRoute,
    private DataService:DataService,
    private errorCorrectionService: errorCorrectionService,
    private _formBuilder: FormBuilder,
    private tokenService: TokenService,
    private loaderService: LoaderService,
    ) { }
    collectionDateOptions: FlatpickrOptions = {
      mode: 'single',
      dateFormat: 'd/m/Y ',
    
      
      maxDate: new Date(moment().add(-30, 'day').format()),
      enableTime:false,
      
    };

  ngOnInit() {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.loaderService.display(false);
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
    
    this.secondFormGroup = this._formBuilder.group({
      barcode: ['', Validators.required],
      newsstresult:['',Validators.required]
    });
    this.popupform = this._formBuilder.group({
      collectionDate: ['', Validators.required]
    });
    this.centralReceiptsData = [];

   
    
    var centralReceiptsArr = this.route.snapshot.data.positiveSubjects;
    if(centralReceiptsArr !== undefined && centralReceiptsArr.status.toString() === "true"){
      var _tempReceivedData = JSON.parse(JSON.stringify(centralReceiptsArr.data));
      var _tempData = centralReceiptsArr.data;
      
        this.centralPickpackPendingData = _tempData.data;
        console.log(this.centralPickpackPendingData);
        this.DataService.sendData(JSON.stringify({'screen':'errorBarcode','page':"","pendingcount":0,"startpickCount":_tempData.length, "module": "Error Correction", "pagealter": "Barcode"}));
    }
    else{
      this.errorMessage = centralReceiptsArr.message;
    }

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
  
    showPopup(data)
    {
        console.log(data);
        this.popupData = data;
        this.selectedRevisedBarcode = "";
        if(this.popupData.sstResult=="Positive"){
          this.RevisedBarcode1="Negative";
        }
        else{
          this.RevisedBarcode1="Positive";

        }

       
        $('#fadeinModal').modal('show');
    }
    ngAfterViewInit(): void {
      this.dtTrigger.next();
    } 
  
  
    sampleSubmit()
    {
      console.log(this.secondFormGroup.get('barcode').value);
      console.log(this.popupform.get('collectionDate').value)
     
    console.log(this.popupData.barcode);
    if(this.secondFormGroup.get('barcode').value .length==0){
      this.barcodeValid=true;

    }
    else{
      var _obj = {};
      this.barcodeValid=false;
      _obj['sstId']=this.popupData.sstId;
      _obj['subjectId'] = this.popupData.subjectId;
      _obj['barcode']=this.popupData.barcodeNo;
      _obj['oldSST'] = String(this.popupData.sstResult);
      if(this.popupData.sstResult=="Positive"){
        _obj['newSST'] =false;
      }
      else{
        _obj['newSST'] =true;
      }
      
      _obj["remarks"]=this.secondFormGroup.get('barcode').value;
      _obj['userId'] = this.user.id;
    

     
   
      
      console.log(_obj);
      this.loaderService.display(true);
    
       
  
        this.errorCorrectionService.updateSST(_obj)
        .subscribe(response => {
          
          this.loaderService.display(false);
          Swal.fire({icon:'success', title: response.message, confirmButtonText: 'Close', allowOutsideClick: false})
          .then((result) => {
            $('#fadeinModal').modal('hide');
            this.getErrorDetailst();
          })
        },
        (err: HttpErrorResponse) => {
          //this.showResponseMessage(err.toString(), 'e');
        });
  
    
      }
        //if(String(this.selectedRevisedBarcode).length)
    }
    getErrorDetailst()
    {
      this.loaderService.display(true);
      this.errorCorrectionService.getErrorDetails()
              .subscribe(response => {
                console.log(response);
                //this.centralPickpackPendingData = response.data;
                var _tempData = response.data;
                this.DataService.sendData(JSON.stringify({'screen':'errorBarcode','page':"","pendingcount":0,"startpickCount":_tempData.length, "module": "Error Correction", "pagealter": "Barcode"}));
                this.rerender();
                this.loaderService.display(false);
              },
              (err: HttpErrorResponse) => {
                this.loaderService.display(false);
                //this.showResponseMessage(err.toString(), 'e');
              })
    }
    updateBarcode()
    {
      this.loaderService.display(true);
      var _obj = {};
      _obj['barcodeNo'] = this.popupData.barcodeNo;
      _obj['revisedBarcodeNo'] = String(this.secondFormGroup.get('barcode').value);
      _obj['userId'] = this.user.id;

      this.errorCorrectionService.updateBarcodeError(_obj)
      .subscribe(response => {
        
        this.loaderService.display(false);
        Swal.fire({icon:'success', title: response.message, confirmButtonText: 'Close', allowOutsideClick: false})
        .then((result) => {
          this.centralPickpackPendingData = [];
          $('#fadeinModal').modal('hide');
          this.getErrorDetailst();
          
          this.rerender();
        })
      },
      (err: HttpErrorResponse) => {
        this.loaderService.display(false);
        //this.showResponseMessage(err.toString(), 'e');
      });
    }
    searchBarCodetype()
    {
      let term = this.searchbarcode;
      //console.log(term);
    }
    clicksearchBarcode()
    {
      let term = this.searchbarcode;
      console.log(term);
      this.loaderService.display(true);
      var _obj = {};
      _obj["input"] =term.trim();
     
      this.errorCorrectionService.getSSTErrorDetails(_obj)
      .subscribe(response => {
        console.log(response);
        this.centralPickpackPendingData = response.data;
        this.loaderService.display(false);
        this.rerender();
        
      },
        (err: HttpErrorResponse) => {
          this.loaderService.display(false);
          //this.showResponseMessage(err.toString(), 'e');
        });
      
    }
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
}
