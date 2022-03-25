import { Component, OnInit, Pipe, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
declare var $: any
import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import { DataService } from './../../../../shared/data.service';
import { errorCorrectionService } from 'src/app/shared/errorcorrection/error-correction.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { TokenService } from './../../../../shared/token.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { ExcelService } from 'src/app/shared/excel.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sa-upload-file',
  templateUrl: './sa-upload-file.component.html',
  styleUrls: ['./sa-upload-file.component.css']
})

@Injectable({ providedIn: 'root' })

export class SAUploadComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('inputFile', {static: false}) myInputVariable: ElementRef;
  dtTrigger: Subject<any> = new Subject();
  errorMessage: string;
  ErrorCount;
  path:any;
  uploadComplete = false;
  dataValidationComplete = false;
  dataValidationError = false;
  dataCreatedDone = false;
  errorSpouseMessage: string;
  curDate=new Date();
  SheetName:string;
  centralReceiptsData: any[] = [];
  popupData:any;
  processingDate;
  maintabSelected = 7;
  mainsubtabSelected = 1;
  centralPickpackPendingData = [];
  pickpackStartList = [];
  searchbarcode;
  dtOptions: DataTables.Settings = {};
  secondFormCheck = false;
  secondFormGroup: FormGroup;
  selectedRevisedBarcode;
  barcodeValid = false;
  user;
  validateData;
  countMain1Sub1;
  countMain2Sub1;
  countMain3Sub1;
  countMain4Sub1;
  countMain5Sub1;
  countMain6Sub1;
  countMain7Sub1;
  countMain8Sub1;
  countMain9Sub1;
  countMain10Sub1;
  countMain11Sub1;
  countMain12Sub1;
  countMain13Sub1;
  showValidationError = false;

  baseErrorData = [];

  name = 'Angular';
  fileToUpload: any;
  imageUrl: any;
  fileName: string = 'SheetJS.xlsx';

  _imageArray = [];

  data;

  constructor(
    zone: NgZone,
    private route: ActivatedRoute,
    private DataService:DataService,
    private errorCorrectionService: errorCorrectionService,
    private _formBuilder: FormBuilder,
    private tokenService: TokenService,
    private loaderService: LoaderService,
    private excelService:ExcelService,
    private UsersService:ExcelService,

    ) { }


  ngOnInit() {

    var today1 = new Date();
var dd = String(today1.getDate()).padStart(2, '0');
var mm = String(today1.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today1.getFullYear();

var today = mm + '/' + dd + '/' + yyyy;
this.dtOptions = {
  pagingType: 'simple_numbers',
  retrieve: true,
  pageLength: 20,
  processing: true,
  stripeClasses: [],
  lengthMenu: [5, 10, 20, 50],
  language: {
    search: '<div><span class="note">Search by any AVD information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
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

    this.DataService.sendData(JSON.stringify({"module": "Upload", "page": "Bulk Upload"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.loaderService.display(false);


    this.secondFormGroup = this._formBuilder.group({
      barcode: ['', Validators.required]
    });

    this.centralReceiptsData = [];
    //this.getErrorDetailst();
  }



    handleFileInput(file: FileList) {

    this.fileToUpload = file.item(0);
    var _fileList = file.item(0).name.split('.');
    this.SheetName=file.item(0).name;
    this.SheetName=this.SheetName.concat("    ","Sheet 1")

    if(_fileList[_fileList.length-1] === 'csv' || _fileList[_fileList.length-1] === 'xlsx' || _fileList[_fileList.length-1] === 'xls')
    {
      this._imageArray.push(file.item(0));
      this.myInputVariable.nativeElement.value = '';
      //Show image preview
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      }
    }

    else
    {

      Swal.fire({icon:'error', title: "Please upload excel file with the given template​", confirmButtonText: 'Close', allowOutsideClick: false});
      this.myInputVariable.nativeElement.value = '';
      return;
    }
    if (this._imageArray.length>1){
      Swal.fire({icon:'error', title: "Please upload only one file.", confirmButtonText: 'Close', allowOutsideClick: false});
      this.deleteFile(1)
       return;

    }


    //reader.readAsDataURL(this.fileToUpload);
  }

  downloadMyFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'http://tands.eduquay.com/assets/assets/img/menu/TSCOD Master Data Template - New.xlsx');
    link.setAttribute('download', `TSCOD Master Data Template - New.xlsx`);
    document.body.appendChild(link)
;
    link.click();
    link.remove();
}



  uploadFiles()
  {
    this.showValidationError = true;
    var _obj = {};
    const frmData = new FormData();
    for (var i = 0; i < this._imageArray.length; i++) {
      frmData.append("formFiles", this._imageArray[i]);
    }
    this.errorCorrectionService.uploadSAFiles(frmData)
    .subscribe(response => {
      this.uploadComplete = true;
     
      Swal.fire(
        {icon:'success', title: response.message, confirmButtonText: 'Validate Data', allowOutsideClick: false,
        allowEscapeKey: false,
        onOpen: () => {
          Swal.showLoading()
          setTimeout(() => { Swal.hideLoading() }, 3000)
        },})
      .then((result) => {
        if (result.value) {
          this.validateBulkUpload();
          //this.resetData();
          this.maintabSelected=7;
          this.deleteFile(1);
          
        }
      });

    },
      (err: HttpErrorResponse) => {
        this.loaderService.display(false);
        this.uploadComplete = false;
        Swal.fire({icon:'error', title: err.toString(), confirmButtonText: 'Close', allowOutsideClick: false})
        //this.showResponseMessage(err.toString(), 'e');
      });
  }
  validateBulkUpload()
  {
    this.errorCorrectionService.validateuploadSAFiles()
    .subscribe(response => {
      this.validateData = response.data;
      this.baseErrorData = JSON.parse(JSON.stringify(response.data));
      if(response.status === 'true')
      {
        this.dataValidationComplete = true;
        this.dataValidationError = false;

        setTimeout(() => {
          Swal.fire({icon:'success', title: response.message, confirmButtonText: 'Move to Database', allowOutsideClick: false})
          .then((result) => {
            if (result.value) {
              this.createBulkUpload();
            // this.resetData();
            }
          });

        }, 1000)
        //Swal.fire({icon:'success', title: response.message, confirmButtonText: 'Create', allowOutsideClick: false})




      }
      else{
         this.maintabSelected=1;

         this.dataValidationComplete = false;
        this.dataValidationError = true;
         this.resetData();
          this.showValidateData();
          this.countMain1Sub1=response.data.length;    
          this.countMain2Sub1=response.data.filter(item => item.errorColumn=='B'|| item.errorColumn=='C'  || item.errorColumn=='B&C').length; 
          this.countMain3Sub1=response.data.filter(item => item.errorColumn =='E'|| item.errorColumn =='D'  || item.errorColumn=='E&D').length; 
          this.countMain4Sub1=response.data.filter(item => item.errorColumn =='F'||item.errorColumn =='G'  || item.errorColumn=='F&G').length;       
          this.countMain5Sub1=response.data.filter(item => item.errorColumn =='H'|| item.errorColumn =='I' || item.errorColumn=='H&I').length; 
          this.countMain6Sub1=response.data.filter(item => item.errorColumn =='J' || item.errorColumn =='K' || item.errorColumn=='J&K').length; 
          this.countMain7Sub1=response.data.filter(item => item.errorColumn =='O' || item.errorColumn =='P' || item.errorColumn=='O&P').length; 
          this.countMain8Sub1=response.data.filter(item => item.errorColumn ==item.errorColumn).length; 
          this.countMain9Sub1=response.data.filter(item => item.errorColumn =='W' || item.errorColumn =='X' || item.errorColumn=='W&X').length; 
          this.countMain10Sub1=response.data.filter(item =>item.errorColumn =='Y' || item.errorColumn =='Z' || item.errorColumn=='Y&Z').length; 
          this.countMain11Sub1=response.data.filter(item =>item.errorColumn =='AA' || item.errorColumn =='AB' || item.errorColumn=='AA&AB').length; 
          this.countMain12Sub1=response.data.filter(item => item.errorColumn =='AC' || item.errorColumn =='AD' || item.errorColumn=='AC&AD').length; 
          this.countMain13Sub1=response.data.filter(item =>item.errorColumn =='AE' || item.errorColumn =='AF' || item.errorColumn=='AE&AF').length;

          Swal.fire({icon:'error', title: 'Data validated successfully. Errors identified in the file uploaded. Please check the error report', confirmButtonText: 'Error Report', allowOutsideClick: false})

          this.showValidationError = true;
          setTimeout(() => {
            this.custumTabClick(1,1);
          }, 1);
         
      }
    },
      (err: HttpErrorResponse) => {
        this.loaderService.display(false);
        this.dataValidationComplete = false;
        this.dataValidationError = true;
        Swal.fire({icon:'error', title: err.toString(), confirmButtonText: 'Close', allowOutsideClick: false})

      });

  }
  showValidateData()
  {

  }

  createBulkUpload()
  {
    this.errorCorrectionService.createuploadSAFiles()
    .subscribe(response => {
      Swal.fire({icon:'success', title:'Data uploaded successfully to the main database. Kindly check the TSCOD Admin module.', confirmButtonText: 'Close', allowOutsideClick: false})
      .then((result) => {
        if (result.value) {
          this.resetData();
          this.dataCreatedDone = true;
        }
      });

    },
      (err: HttpErrorResponse) => {
        this.loaderService.display(false);
        Swal.fire({icon:'error', title: err.toString(), confirmButtonText: 'Close', allowOutsideClick: false})
        //this.showResponseMessage(err.toString(), 'e');
      });
  }

  custumTabClick(i,j)
  {
      this.maintabSelected = i;
      this.mainsubtabSelected = j;
      this.validateData = [];

      setTimeout(() => {
      if(i == 1)
      {
        this.validateData = this.baseErrorData.filter(item => item.errorColumn=='B'|| item.errorColumn=='C' || item.errorColumn=='B&C');
      } else  if(i==2){
        this.validateData =  this.baseErrorData.filter(item => item.errorColumn =='E'|| item.errorColumn =='D'  || item.errorColumn=='E&D');
      }
      else  if(i==3){
      this.validateData =  this.baseErrorData.filter(item => item.errorColumn =='F'||item.errorColumn =='G' || item.errorColumn=='F&G' );
      }
      else  if(i==4){
      this.validateData= this.baseErrorData.filter(item => item.errorColumn =='H'|| item.errorColumn =='I' || item.errorColumn=='H&I');
      }
      else  if(i==5){
      this.validateData =  this.baseErrorData.filter(item => item.errorColumn =='J' || item.errorColumn =='K' || item.errorColumn=='J&K');
      }
      else  if(i==6){
      this.validateData =  this.baseErrorData.filter(item => item.errorColumn =='O' || item.errorColumn =='P' || item.errorColumn=='O&P');
      }
      else  if(i==7){
        this.validateData =  this.baseErrorData.filter(item => item);
      }
      else  if(i==8){
        this.validateData =  this.baseErrorData.filter(item => item.errorColumn =='W' || item.errorColumn =='X' || item.errorColumn=='W&X');
      }
      else  if(i==9){
      this.validateData =  this.baseErrorData.filter(item =>item.errorColumn =='Y' || item.errorColumn =='Z' || item.errorColumn=='Y&BZ');
      }
      else  if(i==10){
        this.validateData =  this.baseErrorData.filter(item =>item.errorColumn =='AA' || item.errorColumn =='AB' || item.errorColumn=='AA&AB');
      }
      else  if(i==11){
        this.validateData =  this.baseErrorData.filter(item => item.errorColumn =='AC' || item.errorColumn =='AD' || item.errorColumn=='AC&AD');
      }
      else  if(i==12){
        this.validateData = this.baseErrorData.filter(item =>item.errorColumn =='AE' || item.errorColumn =='AF' || item.errorColumn=='AE&AF');
      }
  console.log(this.validateData);

  this.rerender();
}, 1);
      // this.anmSubjectProfileList(1,i,j);
  }
  resetData()
  {
    this._imageArray = [];
    this.myInputVariable.nativeElement.value = '';
  }
  deleteFile(i)
  {
    console.log(i);
    this._imageArray.splice(i, 1);
  }
  
  rerender(): void {
   if(this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.clear();
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    } else {
      this.dtTrigger.next();
    }
    
  }
  ngAfterViewInit(): void {
    //this.dtTrigger.next();
  }
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
}
