import { Component, OnInit, Pipe, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject , from, of, zip } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
declare var $: any 
import { DataService } from '../../shared/data.service';
import { errorCorrectionService } from 'src/app/shared/errorcorrection/error-correction.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { TokenService } from '../../shared/token.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import * as JSZip from 'jszip/dist/jszip';
import { switchMap} from 'rxjs/operators';

export interface ZipFile {
  readonly name: string;
  readonly dir: boolean;
  readonly date: Date;
  readonly data: any;
}
@Component({
  selector: 'app-tm-upload',
  templateUrl: './TechMed-upload.component.html',
  styleUrls: ['./TechMed-upload.component.css']
})



export class TechMedUploadComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('inputFile', {static: false}) myInputVariable: ElementRef;
  errorMessage: string;
  errorSpouseMessage: string;
  $zipFiles: Observable<ZipFile[]>;
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

    this.DataService.sendData(JSON.stringify({"module": "Upload", "page": "techmed"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.loaderService.display(false);
    
    
    this.secondFormGroup = this._formBuilder.group({
      barcode: ['', Validators.required]
    });
    this.centralReceiptsData = [];
    //this.getErrorDetailst();
  }
  ngOnFile(event: any): void {
    const fileList = event.target.files;
    const zipLoaded = new JSZip.default();
    this.$zipFiles = from(zipLoaded.loadAsync(fileList[0])).pipe(
      switchMap((zip: any):Observable<ZipFile[]> => {
        console.log(zip.files)
        return of(Object.keys(zip.files).map((key)=>zip.files[key]))
      })
      
    ) 
    var  Files=[]
    var Filedata;
    var PdfCount=0
    var ExcelCount=0
     const j = new JSZip();
     var jszip1=j.loadAsync(fileList[0]).then(function (zip) {
     console.log(zip)
     });
     //console.log(jszip.files)
    var jszip=j.loadAsync(fileList[0]).then(function (zip) {
      Object.keys(zip.files).forEach(function (filename) {
        let _this = this;
        zip.files[filename].async('string').then(function (fileData) {
          console.log(filename) // These are your file contents  
          var _fileList = filename.split('.');
          console.log(_fileList[_fileList.length-1]);
          if(_fileList[_fileList.length-1] === 'pdf')
          {
            PdfCount=PdfCount+1
            Filedata=fileData
            _this.sendfile(Filedata)
            Files.push(fileData)
            // this._imageArray.push(file.item(0));
            // this.myInputVariable.nativeElement.value = '';
            //Show image preview
            // let reader = new FileReader();
            // reader.onload = (event: any) => {
            //   this.imageUrl = event.target.result;
            }
            else if (_fileList[_fileList.length-1] === 'xlsx'){
              ExcelCount++;
              console.log('Transfer Files')
              
            }  
            console.log(ExcelCount,PdfCount,'FileCount')
        }).then(function(zip) {
          _this.sendfile(zip.files[0])
        }.bind(this))
      }.bind(this))
      console.log(ExcelCount,PdfCount,'FileCount')
    }.bind(this))
    
          
  //  this.handleFileInput(fileList)
  }
   sendfile(obj){
    console.log('enter')
    this.errorCorrectionService.uploadPdf(obj)
.subscribe(response => {
console.log(response);
/*Swal.fire({icon:'success', title: response.message, confirmButtonText: 'Close', allowOutsideClick: false})
.then((result) => {
if (result.value) {
  this.resetData();
}
});*/

},
(err: HttpErrorResponse) => {
this.loaderService.display(false);
Swal.fire({icon:'error', title: err.toString(), confirmButtonText: 'Close', allowOutsideClick: false})
//this.showResponseMessage(err.toString(), 'e');
});

  }
    handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var _fileList = file.item(0).name.split('.');
    console.log(_fileList[_fileList.length-1]);
    if(_fileList[_fileList.length-1] === 'zip')
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

      Swal.fire({icon:'error', title: "Please upload zip file only.", confirmButtonText: 'Close', allowOutsideClick: false});
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
    this.errorCorrectionService.uploadCHCHPLCFiles(frmData)
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
