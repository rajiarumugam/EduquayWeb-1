import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../shared/data.service';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { centralsampleService } from 'src/app/shared/centrallab/central-sample.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from 'src/app/shared/token.service';
import * as moment from 'moment';

type AOA = any[][];

@Component({
    selector: 'app-central-update-hplc-upload',
    templateUrl: './central-update-hplc-upload.component.html',
    styleUrls: ['./central-update-hplc-upload.component.css']
  })
  export class CentralHPLCUploadComponent implements OnInit {
    @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
    centralReceiptsData;
    errorMessage;
    user;

    data: AOA = [];
    wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
    fileName: string = 'SheetJS.xlsx';
    showUploadResult = false;
    centralUploadResponse;

    centralUploadResultData = [];

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    constructor(
      private DataService:DataService,
      private route: ActivatedRoute,
      private centralsampleService: centralsampleService,
      private tokenService: TokenService
      ) { }
      
  ngOnInit() {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var centralReceiptsArr = this.route.snapshot.data.positiveSubjects;
    if(centralReceiptsArr !== undefined && centralReceiptsArr.status.toString() === "true"){
      this.centralReceiptsData = centralReceiptsArr.hplcDetail;
      if(this.DataService.getdata().centraluploaddata != undefined)
      {
          this.centralUploadResultData = this.DataService.getdata().centraluploaddata;
          this.showUploadResult = true;
      }
      this.DataService.sendData(JSON.stringify({'screen':'CENTRAL','page':"upload","uploadcount":this.centralUploadResultData.length,"receivedcount":this.centralReceiptsData.length-this.centralUploadResultData.length, "module": "Central Lab", "pagealter": "Update HPLC Results"}));
    }
    else{
      this.errorMessage = centralReceiptsArr.message;
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
    this.centralUploadResultData = [];
    /* wire up file reader */
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    const target: DataTransfer = <DataTransfer>(evt.target);
    if(target.files[0].type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please upload only Excel file!', allowOutsideClick: false
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
        this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { raw: false }));
        this.centralUploadResultData = [];
        var _tempData = this.data;
        this.centralReceiptsData.forEach(function(val1,ind1){
          this.data.forEach(function(val,index){
            console.log(val);
            console.log(val1);
            if(val1.barcodeNo == val.Barcode)
            {
              var _obj = {};
              _obj['barcodeNo'] = ""+val.Barcode;
              _obj['subjectId'] = ""+val1.subjectId;
              _obj['rchId'] = ""+val1.rchId;
              _obj['hbF'] = ""+val.HbF;
              _obj['hbA0'] = ""+val.HbA0;
              _obj['hbA2']= ""+val.HbA2;
              _obj['hbS'] = ""+val.HbS;
              _obj['hbC'] = ""+val.HbC;
              _obj['hbD']= ""+val.HbD;
              _obj["createdBy"] = this.user.id;
              _obj["centralLabId"]=this.user.centralLabId;
              _obj["testCompleteOn"]=moment(val.TestedDate).format("DD/MM/YYYY HH:MM") == "Invalid date" ? val.TestedDate : moment(val.TestedDate).format("DD/MM/YYYY HH:MM");;
    
              this.centralUploadResultData.push(_obj);
            }
           
          },this);
        },this)
        
        
        if(this.centralUploadResultData.length > 0)
        {
          this.showUploadResult = true;
          this.DataService.sendData(JSON.stringify({'screen':'CENTRAL','page':"upload","uploadcount":this.centralUploadResultData.length,"receivedcount":this.centralReceiptsData.length-this.centralUploadResultData.length, "module": "Central Lab", "pagealter": "Update HPLC Results"}));
          this.DataService.setdata({'centraluploaddata':this.centralUploadResultData});
        }
        else{
          this.showUploadResult = false;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Data in your excel is already uploaded or not uploading correct data!', allowOutsideClick: false
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
      text: "Confirm Upload HPLC results",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#ffffff', allowOutsideClick: false
    }).then((result) => {
      if (result.value) {

        this.centralsampleService.addHSBCtest({"hplcTestRequest":this.centralUploadResultData})
      .subscribe(response => {
        this.centralUploadResponse = response;
        if (this.centralUploadResponse !== null && this.centralUploadResponse.status === "true") {
            Swal.fire({
              text: 'HPLC results uploaded successfully.',
              icon: 'success', allowOutsideClick: false
            }).then((result) => {
              this.DataService.sendData(JSON.stringify({'screen':'CENTRAL','page':"upload","uploadcount":0,"receivedcount":this.centralReceiptsData.length-this.centralUploadResultData.length, "module": "Central Lab", "pagealter": "Update HPLC Results"}));
              this.DataService.deleteProp('centraluploaddata');
              this.centralUploadResultData = [];
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
      Swal.fire({icon:'error', title: shipmentId, confirmButtonText: 'Close', allowOutsideClick: false})
    }
    else{
      Swal.fire({icon:'success', title: title,
      showCancelButton: true, confirmButtonText: 'Shipment Log', cancelButtonText: 'Close', allowOutsideClick: false })
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