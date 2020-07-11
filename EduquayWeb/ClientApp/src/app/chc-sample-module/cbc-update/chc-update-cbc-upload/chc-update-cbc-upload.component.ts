import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../../shared/data.service';

@Component({
    selector: 'app-chc-update-cbc-upload',
    templateUrl: './chc-update-cbc-upload.component.html',
    styleUrls: ['./chc-update-cbc-upload.component.css']
  })
  export class CBCUploadComponent implements OnInit {
    chcReceiptsData;
    errorMessage;
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
}