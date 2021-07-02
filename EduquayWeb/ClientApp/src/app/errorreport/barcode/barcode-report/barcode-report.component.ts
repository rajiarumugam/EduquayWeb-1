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
import { log } from 'console';




@Component({
  selector: 'app-rch-correction',
  templateUrl: './barcode-report.component.html',
  styleUrls: ['./barcode-report.component.css']
})
export class BarcodeReportComponent implements OnInit {
  submitted = false;
 





  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  date5:any
  errorMessage: string;
  fromdaterepo:any;
  recordcount=0;
  dateform: FormGroup;
  todaterepo:any;
  errorSpouseMessage: string;
  centralReceiptsData: any[] = [];
  popupData:any;
  processingDate;

  centralPickpackPendingData = [];
  pickpackStartList = [];
  searchbarcode;
  secondFormCheck = false;
  popupform:FormGroup;
  date= new FormControl();
  popupform1:FormGroup;
  reportform:FormGroup;
  secondFormGroup: FormGroup;
  selectedRevisedBarcode;
  districtListResponse;
  barcodeValid = false;
  selectedDistrict ='0';
  getdistrict = "";
  districtlists;
  user;
  chcListResponse: any;
  chclists: any;
  selectedEditChc='';
  getchc: any;
  selectedChc: string;


  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
 
  disabledChc: boolean;
  selectedEditPhc: string;
  selectedPhc: string=" ";
  phcListResponse: any;
  phclists: any;
  getphc: string;
  selectedanm: string=" ";
  anmlists: any[];
  pndtmtpMasterResponse:any;
  
  
 
  constructor(
    
    zone: NgZone,
   
    public fb: FormBuilder,
   
   
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
      defaultDate:new Date(moment().add(-7, 'day').format()),
      enableTime:false,
      
    };
    collectionDateOptions2: FlatpickrOptions = {
      mode: 'single',
      dateFormat: 'd/m/Y ',
      defaultDate:new Date(moment().add(0, 'day').format()),
      enableTime:false,
      
    };
    oppoSuitsForm = this.fb.group({
      name: ['']
    });
  ngOnInit() {
    this.DataService.sendData(JSON.stringify({"module": "Error Report", "page": "Barcode"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.loaderService.display(false);
    this.dateform = this._formBuilder.group({
      collectionDate1: [''],
      collectionDate2: [''],
      dis:['']
   
    });
    
    this.dtOptions = {
      dom: "<'row mt-3'<'col-sm-6 float-right'f><'col-sm-4 mb-2 float-right'l><'col-sm-2 float-right'B>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-4'i><'col-sm-4 text-center'p>>",
      // Configure the buttons
        buttons: [
          {
            titleAttr: 'Download as PDF',
            extend: 'pdfHtml5',
            title: 'Report - Barcode Error',
            orientation: 'landscape',
    
            exportOptions: {
              columns: ':visible'
            },
              text: '<img src="assets/assets/img/pdfimage.png" width="23px" />'},

          {
            titleAttr: 'Download as Excel',     
            extend: 'excelHtml5',
            title: 'Report - Barcode Error ',
            className: 'custom-btn',
            text: '<img src="assets/assets/img/excelimage.png" width="23px" />'
          },
        
        ],
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
      remarks: ['', Validators.required]
    });
    
    this.popupform = this._formBuilder.group({
      collectionDate: ['', Validators.required]
    });
    this.reportform = this._formBuilder.group({
      collectionDate: ['', Validators.required],
      collectionDate2: ['', Validators.required]
    });
    this.centralReceiptsData = [];

   
    let district = this.errorCorrectionService.getDistrictList().subscribe(response => {
      this.districtListResponse = response;
      if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
        this.districtlists = this.districtListResponse.data;
        this.selectedDistrict = "";}});
        
    

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
  onSubmit() {
    alert(JSON.stringify(this.oppoSuitsForm.value))
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
  
    ddlDistrict() {
      let district = this.errorCorrectionService.getDistrictList().subscribe(response => {
        this.districtListResponse = response;
        if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
          this.districtlists = this.districtListResponse.data;
          this.selectedDistrict = "";
        }
        else {
          // this.phclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          // this.phclistErrorMessage = err.toString();
  
        });
    }
    districtChange()
    {
      
          console.log(this.selectedDistrict);

          this.selectedChc = '';
      let district = this.errorCorrectionService.getCHCByDis(this.selectedDistrict).subscribe(response => {
        this.chcListResponse = response;
        console.log(this.chcListResponse);
        if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
          this.chclists = this.chcListResponse.data;
          this.selectedChc = "";
          this.disabledChc = true;
        }
        else {
         // this.phclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
         // this.phclistErrorMessage = err.toString();
  
        });
    }
    ddlEditDistrict() {
      console.log(this.selectedDistrict);
      let district = this.errorCorrectionService.getDistrictList().subscribe(response => {
        this.districtListResponse = response;
        if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
          this.districtlists = this.districtListResponse.data;
            this.selectedDistrict = this.getdistrict;
        }
        else {
          // this.phclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          // this.phclistErrorMessage = err.toString();
  
        });
    }

    ddlPhc(code) {
      this.selectedPhc = '';
      let district = this.errorCorrectionService.getPHCByCHC(code).subscribe(response => {
        this.phcListResponse = response;
        if (this.phcListResponse !== null && this.phcListResponse.status === "true") {
          this.phclists = this.phcListResponse.data;
          this.selectedPhc = "";
         
        }
        else {
         // this.ripointlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          //this.ripointlistErrorMessage = err.toString();
  
        });
    }
    ddlEdtiPhc(code) {
      this.selectedEditPhc = '';
      let district = this.errorCorrectionService.getPHCByCHC(code).subscribe(response => {
        this.phcListResponse = response;
        if (this.phcListResponse !== null && this.phcListResponse.status === "true") {
          this.phclists = this.phcListResponse.phcDetails;
          if(this.phclists.length > 0){
            this.selectedEditPhc = this.getphc;
            
          }
                  
        }
        else {
          //this.ripointlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          //this.ripointlistErrorMessage = err.toString();
  
        });
    }
  
    onChangeChc(event) {
  
      if (this.selectedEditChc === '') {
        this.selectedPhc = '';
        console.log("koel");
      }
      else {
        
        console.log(this.selectedEditChc);
        this.ddlPhc(this.selectedEditChc);
      }
    }
    onChangeEditChc(event) {
      console.log(event.value)
  
      if (this.selectedEditChc === '') {
        this.selectedEditPhc = '';
      }
      else {
        this.ddlEdtiPhc(this.selectedEditChc);
      }
    }
    
    onChangephc(event){
  
      if (this.selectedPhc === '') {
        this.selectedanm = ''; 
        console.log(this.selectedPhc); 
      }
      else {
        console.log(this.selectedPhc);
        this.ddlAnm(this.selectedPhc);
      }
  
    }
    
    ddlAnm(id) {
  
      this.anmlists = [];
      this.selectedanm = '';
      
      this.errorCorrectionService.getANMbyPHC(id)
        .subscribe(response => {
          this.pndtmtpMasterResponse = response;
          if (this.pndtmtpMasterResponse !== null && this.pndtmtpMasterResponse.status === "true") {
            this.anmlists = this.pndtmtpMasterResponse.data;
            console.log(this.anmlists);
            this.selectedanm = '';
            // if (this.anmlists.length > 0) {
            //   this.selectedanm = this.anmlists[0].id.toString();
            // }
          }
          else {
            //this.postpndtcounselledNoErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            //this.postpndtcounselledNoErrorMessage = err.toString();
  
          });
    }
   

    ngAfterViewInit(): void {
      this.dtTrigger.next();
    } 
   
    sampleSubmit()
    {
    
     // console.log(username)
    //  console.log(this.selectedDistrict);
    //  console.log(this.selectedEditChc);
     
    //  console.log(this.selectedChc);
    //  console.log(this.selectedEditPhc);
    //  console.log(this.selectedPhc)
    //  console.log(this.selectedanm);
      var latest_date=new Date();
      var datePipe = new DatePipe('en-US');
         var date = String(datePipe.transform(this.popupform.get('collectionDate').value, 'dd/MM/yyyy'));
      
      var _obj = {};
      _obj['subjectId'] = this.popupData.subjectId;
      _obj['oldLMP'] = String(this.popupData.lmpDate);
         
      _obj['newLMP'] = date;
      _obj["remarks"]=this.secondFormGroup.get('remarks').value;
      _obj['userId'] = this.user.id;
      console.log(_obj);
      this.loaderService.display(true);
    
       
  
        this.errorCorrectionService.updateLMP(_obj)
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
     
    
      console.log(this.dateform.controls.dis.value);
     
      this.loaderService.display(true);
      var datePipe = new DatePipe('en-US');
      console.log(this.fromdaterepo);
     
      var _obj = {};
      if(this.dateform.controls.collectionDate1.value.length==0){
        _obj["fromDate"] ="21/06/2021";
      
      }
      else{
        _obj["fromDate"] =String(datePipe.transform(this.dateform.controls.collectionDate1.value, 'dd/MM/yyyy'));

      }
      if(this.dateform.controls.collectionDate2.value.length==0){
        _obj["toDate"] ="29/06/2021";
      }
      else{
        _obj["toDate"] =String(datePipe.transform(this.dateform.controls.collectionDate2.value, 'dd/MM/yyyy'));


      }
     
  
      _obj["districtId"] =+this.selectedDistrict;
      if (this.selectedDistrict === '') {
        _obj["districtId"] =0
      }
      else {
        _obj["districtId"] =+this.selectedDistrict;
      }
      if (this.selectedEditChc === '') {
        _obj["chcid"] =0
      }
      else {
         _obj["chcid"]  =+this.selectedEditChc;
      }
      if (this.selectedPhc === '') {
        _obj["phcid"]=0
      }
      else {
        _obj["phcid"] =+this.selectedPhc;
      }
      if (this.selectedanm === '') {
        _obj["anmId"]=0;
      }
      else {
        _obj["anmid"] =+this.selectedanm;
    
      }
     
     
      this.errorCorrectionService.getBarcodeErrorReport(_obj)
      .subscribe(response => {
        console.log(response);
        this.centralPickpackPendingData = response.data;
        this.recordcount=response.data.length;
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
