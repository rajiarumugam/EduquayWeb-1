import { Component, OnInit, Pipe, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
declare var $: any
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
export class SAUploadComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('inputFile', {static: false}) myInputVariable: ElementRef;
  errorMessage: string;
  ErrorCount;

  errorSpouseMessage: string;
  curDate=new Date();
  SheetName:string;
  centralReceiptsData: any[] = [];
  popupData:any;
  processingDate;
  centralPickpackPendingData = [];
  pickpackStartList = [];
  searchbarcode;
  dtOptions: any = {};
  secondFormCheck = false;
  secondFormGroup: FormGroup;
  selectedRevisedBarcode;
  barcodeValid = false;
  user;
  validateData;
  countMain1Sub1;
  showValidationError = false;

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
    private excelService:ExcelService
    ) { }


  ngOnInit() {

    var today1 = new Date();
var dd = String(today1.getDate()).padStart(2, '0');
var mm = String(today1.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today1.getFullYear();

var today = mm + '/' + dd + '/' + yyyy;
    this.dtOptions = {
       // Declare the use of the extension in the dom parameter
       dom: "<'row mt-3'<'col-sm-11 float-right'><'col-sm-1 float-right'B>>" +
       "<'row'<'col-sm-12'tr>>" +
       "<'row'<'col-sm-4'i><'col-sm-4 text-center'p>>",
       // Configure the buttons

         buttons: [
           {
             titleAttr: 'Download as Excel',
             extend: 'excelHtml5',
             title: ' Bulk Upload TSCOD Error-Report   ' +today,
             className: 'custom-btn',
             text: '<img src="assets/assets/img/excelimage.png" width="23px" />'
           }

         ],
      language: {

        paginate: {
          first: '',
          last: '', // or '←'
          previous: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
          next: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
        },
      }
    };
    this.DataService.sendData(JSON.stringify({"module": "Upload", "page": "Bluk Upload"}));
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

      Swal.fire({icon:'error', title: "Please upload Excel or CSV file only.", confirmButtonText: 'Close', allowOutsideClick: false});
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

  uploadFiles()
  {
    this.showValidationError = false;
    var _obj = {};
    const frmData = new FormData();
    for (var i = 0; i < this._imageArray.length; i++) {
      frmData.append("formFiles", this._imageArray[i]);
    }
    this.errorCorrectionService.uploadSAFiles(frmData)
    .subscribe(response => {
      Swal.fire({icon:'success', title: response.message, confirmButtonText: 'Validate', allowOutsideClick: false})
      .then((result) => {
        if (result.value) {
          this.validateBulkUpload();
          //this.resetData();
        }
      });

    },
      (err: HttpErrorResponse) => {
        this.loaderService.display(false);
        Swal.fire({icon:'error', title: err.toString(), confirmButtonText: 'Close', allowOutsideClick: false})
        //this.showResponseMessage(err.toString(), 'e');
      });
  }
  validateBulkUpload()
  {
    this.errorCorrectionService.validateuploadSAFiles()
    .subscribe(response => {
      this.validateData = response.data;
      console.log(this.validateData);
      if(response.status === 'true')
      {
        setTimeout(() => {
          Swal.fire({icon:'success', title: response.message, confirmButtonText: 'Create', allowOutsideClick: false})
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
          this.showValidateData();
          this.countMain1Sub1=response.data.length;
          Swal.fire({icon:'error', title: 'Data validated successfully. Errors identified in the file uploaded. Please check the error report', confirmButtonText: 'View Error Report', allowOutsideClick: false})

          this.showValidationError = true;
      }
    },
      (err: HttpErrorResponse) => {
        this.loaderService.display(false);
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
      Swal.fire({icon:'success', title:'Data uploaded to main database”​', confirmButtonText: 'Close', allowOutsideClick: false})
      .then((result) => {
        if (result.value) {
          this.resetData();
        }
      });

    },
      (err: HttpErrorResponse) => {
        this.loaderService.display(false);
        Swal.fire({icon:'error', title: err.toString(), confirmButtonText: 'Close', allowOutsideClick: false})
        //this.showResponseMessage(err.toString(), 'e');
      });
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

    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
    }
}
