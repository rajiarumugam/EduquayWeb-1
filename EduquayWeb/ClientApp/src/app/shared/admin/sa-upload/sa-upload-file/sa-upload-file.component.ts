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

@Component({
  selector: 'app-sa-upload-file',
  templateUrl: './sa-upload-file.component.html',
  styleUrls: ['./sa-upload-file.component.css']
})
export class SAUploadComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('inputFile', {static: false}) myInputVariable: ElementRef;
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


  name = 'Angular';
  fileToUpload: any;
  imageUrl: any;

  _imageArray = [];

  constructor(
    zone: NgZone,
    private route: ActivatedRoute,
    private DataService:DataService,
    private errorCorrectionService: errorCorrectionService,
    private _formBuilder: FormBuilder,
    private tokenService: TokenService,
    private loaderService: LoaderService
    ) { }

  ngOnInit() {

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
    console.log(_fileList[_fileList.length-1]);
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
    
    //reader.readAsDataURL(this.fileToUpload);
  }

  uploadFiles()
  {
    var _obj = {};

    const frmData = new FormData();
    
    for (var i = 0; i < this._imageArray.length; i++) { 
      frmData.append("formFiles", this._imageArray[i]);
    }
    this.errorCorrectionService.uploadSAFiles(frmData)
    .subscribe(response => {
      console.log(response);
      Swal.fire({icon:'success', title: response.message, confirmButtonText: 'Close', allowOutsideClick: false})
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
