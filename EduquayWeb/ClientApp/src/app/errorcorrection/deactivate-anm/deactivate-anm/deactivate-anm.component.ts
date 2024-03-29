import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
declare var $: any 
import { DataService } from '../../../shared/data.service';
import { errorCorrectionService } from 'src/app/shared/errorcorrection/error-correction.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { TokenService } from '../../../shared/token.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-deactivate-anm',
  templateUrl: './deactivate-anm.component.html',
  styleUrls: ['./deactivate-anm.component.css']
})
export class DeactivateanmComponent implements OnInit {

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
  secondFormGroup: FormGroup;
  selectedRevisedBarcode;
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

  ngOnInit() {
    this.DataService.sendData(JSON.stringify({"module": "Error Correction", "submodule": "RCH"}));
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
      barcode: ['', Validators.required]
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
        $('#fadeinModal').modal('show');
    }
    ngAfterViewInit(): void {
      this.dtTrigger.next();
    } 
  
    sampleSubmit()
    {
      this.searchbarcode = "";
        this.secondFormCheck =    true;
        this.barcodeValid = false;
        console.log(this.secondFormGroup.get('barcode').value);
        console.log(String(this.secondFormGroup.get('barcode').value).length)
        
        if(String(this.secondFormGroup.get('barcode').value).length === 6)
        {
      
          this.loaderService.display(true);
             
              this.errorCorrectionService.checkBarcodeExist(this.secondFormGroup.get('barcode').value)
              .subscribe(response => {
                console.log(response);
                if(response.barcodeExist)
                {
                  if(response.barcodeValid)
                  {
                    this.loaderService.display(false);
                    Swal.fire({icon:'error', title: 'The barcode you are trying to update is already mapped to the following subject, Subject ID : '+response.data.subjectId+', Subject Name : '+response.data.subjectName+', ANM ID : '+response.data.anmCode+', ANM Name : '+response.data.anmName+', DC Contact : '+response.data.dcContact+', DC Name : '+response.data.dcName+'. DO YOU WANT to OVERWRITE ?',
                    showCancelButton: true, confirmButtonText: 'Yes', cancelButtonText: 'No', allowOutsideClick: false })
                 .then((result) => {
                   if (result.value) {
                    
                      console.log("hitting here");
                      
                      this.updateBarcode();
                   
                   }
                   else{
                    
                   }
                  });
                  }
                  else{
                    this.loaderService.display(false);
                    Swal.fire({icon:'warning', title: "Your Revised Barcode number Sample already Damaged / Timeout Expiry.", confirmButtonText: 'Close', allowOutsideClick: false})
                    .then((result) => {
                     
                      $('#fadeinModal').modal('hide');
                    })
                  }
                 
                }
                else
                {
                  this.loaderService.display(false);
                  Swal.fire({icon:'warning', title: 'Please confirm to update?',
                  showCancelButton: true, confirmButtonText: 'Yes', cancelButtonText: 'No', allowOutsideClick: false })
                  .then((result) => {
                    if (result.value) {
                      this.updateBarcode();
                    }
                    else{
                    
                    }
                })
                }
                (err: HttpErrorResponse) => {
                  this.loaderService.display(false);
                  //this.showResponseMessage(err.toString(), 'e');
                };
             
           
             
            });
          

        }
        else
        {
            this.barcodeValid = true;
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
      this.errorCorrectionService.getRCHErrorDetails(term)
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
