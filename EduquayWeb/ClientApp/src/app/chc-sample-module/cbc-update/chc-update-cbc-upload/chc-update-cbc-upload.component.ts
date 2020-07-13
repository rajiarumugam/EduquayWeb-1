import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../../shared/data.service';
import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
    selector: 'app-chc-update-cbc-upload',
    templateUrl: './chc-update-cbc-upload.component.html',
    styleUrls: ['./chc-update-cbc-upload.component.css']
  })
  export class CBCUploadComponent implements OnInit {
    chcReceiptsData;
    errorMessage;

    data: AOA = [[1, 2], [3, 4]];
    wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
    fileName: string = 'SheetJS.xlsx';

    constructor(
      private DataService:DataService,
      private route: ActivatedRoute,
      ) { }
      
  ngOnInit() {

    var chcReceiptsArr = this.route.snapshot.data.positiveSubjects;
    console.log(chcReceiptsArr);
    if(chcReceiptsArr !== undefined && chcReceiptsArr.status.toString() === "true"){
      this.chcReceiptsData = chcReceiptsArr.chcReceipts;
      this.DataService.sendData(JSON.stringify({'page':"received","uploadcount":0,"receivedcount":this.chcReceiptsData.length}));
    }
    else{
      this.errorMessage = chcReceiptsArr.message;
    }
  }

  onFileChange(evt: any) {
    console.log(evt);
    /* wire up file reader */
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    const target: DataTransfer = <DataTransfer>(evt.target);
    console.log(target.files[0].type);
    if(target.files[0].type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    {
        alert('Please upload only Excel file!');
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
        console.log(this.data);
      };
      reader.readAsBinaryString(target.files[0]);
    }
  }
}