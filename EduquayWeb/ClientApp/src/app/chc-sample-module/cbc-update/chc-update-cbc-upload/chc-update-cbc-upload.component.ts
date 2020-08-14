import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../../shared/data.service';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { chcsampleService } from 'src/app/shared/chc-sample/chc-sample.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from 'src/app/shared/token.service';

type AOA = any[][];

@Component({
    selector: 'app-chc-update-cbc-upload',
    templateUrl: './chc-update-cbc-upload.component.html',
    styleUrls: ['./chc-update-cbc-upload.component.css']
  })
  export class CBCUploadComponent implements OnInit {
    @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
    chcReceiptsData;
    errorMessage;
    user;

    data: AOA = [];
    wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
    fileName: string = 'SheetJS.xlsx';
    showUploadResult = false;
    chcUploadResponse;

    chcUploadResultData = [];

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    constructor(
      private DataService:DataService,
      private route: ActivatedRoute,
      private chcsampleService: chcsampleService,
      private tokenService: TokenService
      ) { }
      
  ngOnInit() {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var chcReceiptsArr = this.route.snapshot.data.positiveSubjects;
    if(chcReceiptsArr !== undefined && chcReceiptsArr.status.toString() === "true"){
      this.chcReceiptsData = chcReceiptsArr.cbcDetail;
      if(this.DataService.getdata().cbcuploaddata != undefined)
      {
          this.chcUploadResultData = this.DataService.getdata().cbcuploaddata;
          this.showUploadResult = true;
      }
      this.DataService.sendData(JSON.stringify({'screen':'CBC','page':"upload","uploadcount":this.chcUploadResultData.length,"receivedcount":this.chcReceiptsData.length-this.chcUploadResultData.length}));
    }
    else{
      this.errorMessage = chcReceiptsArr.message;
    }

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
  }

  onFileChange(evt: any) {
    this.chcUploadResultData = [];
    /* wire up file reader */
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    const target: DataTransfer = <DataTransfer>(evt.target);
    if(target.files[0].type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please upload only Excel file!'
        })
    }
    else
    {
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        this.chcUploadResultData = [];
        var _tempData = this.data;
        this.chcReceiptsData.forEach(function(val1,ind1){
          this.data.forEach(function(val,index){
            if(val1.barcodeNo == val[3])
            {
              var _obj = {};
              _obj['barcodeNo'] = ""+val[3];
              _obj['subjectId'] = ""+val[1];
              _obj['rchId'] = ""+val[2];
              _obj['mcv'] = ""+val[4];
              _obj['rdw'] = ""+val[5];
              _obj['testingCHCId']= this.user.chcId;
              _obj["createdBy"] = this.user.id;
    
              this.chcUploadResultData.push(_obj);
            }
           
          },this);
        },this)
        
        
        if(this.chcUploadResultData.length > 0)
        {
          this.showUploadResult = true;
          this.DataService.sendData(JSON.stringify({'screen':'CBC','page':"upload","uploadcount":this.chcUploadResultData.length,"receivedcount":this.chcReceiptsData.length-this.chcUploadResultData.length}));
          this.DataService.setdata({'cbcuploaddata':this.chcUploadResultData});
        }
        else{
          this.showUploadResult = false;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Data in your excel is already uploaded or not uploading correct data!'
            })
        }
          
      };
      reader.readAsBinaryString(target.files[0]);
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

  uploadHPLCResult()
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "Confirm Upload CBC results",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#ffffff'
    }).then((result) => {
      if (result.value) {

        this.chcsampleService.addCBCtest({"cbcTestRequest":this.chcUploadResultData})
      .subscribe(response => {
        this.chcUploadResponse = response;
        if (this.chcUploadResponse !== null && this.chcUploadResponse.status === "true") {
            Swal.fire({
              text: 'HPLC results uploaded successfully.',
              icon: 'success'
            }).then((result) => {
              this.DataService.sendData(JSON.stringify({'screen':'CBC','page':"upload","uploadcount":0,"receivedcount":this.chcReceiptsData.length-this.chcUploadResultData.length}));
              this.DataService.deleteProp('cbcuploaddata');
              this.chcUploadResultData = [];
              this.showUploadResult = false;
            });
        } else {
          
          this.errorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          //this.showResponseMessage(err.toString(), 'e');
        });
        
      }
    })
  }
  showResponseMessage(shipmentId: string, type: string){
    var messageType = '';
    var title = `Shipment Id is ${shipmentId}`;
    if(type === 'e'){
      Swal.fire({icon:'error', title: shipmentId, confirmButtonText: 'Close'})
    }
    else{
      Swal.fire({icon:'success', title: title,
      showCancelButton: true, confirmButtonText: 'Shipment Log', cancelButtonText: 'Close' })
         .then((result) => {
           if (result.value) {
           
           
           }
           else{
             
           }
         });
    }
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }   
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}