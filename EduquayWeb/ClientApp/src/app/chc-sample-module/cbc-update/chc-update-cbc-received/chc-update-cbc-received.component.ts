import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

import { DataService } from './../../../shared/data.service';

@Component({
  selector: 'app-chc-update-cbc-received',
  templateUrl: './chc-update-cbc-received.component.html',
  styleUrls: ['./chc-update-cbc-received.component.css']
})
export class CBCReceivedSampleComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  errorMessage: string;
  errorSpouseMessage: string;

  chcReceiptsData: any[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    zone: NgZone,
    private route: ActivatedRoute,
    private DataService:DataService
    ) { }

  ngOnInit() {

    //this.DataService.sendData(JSON.stringify({"module": "CHC- SAMPLE REC & PROCESS", "page": "Update CBC Results"}));
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
    
    this.chcReceiptsData = [];
    var chcReceiptsArr = this.route.snapshot.data.positiveSubjects;
    if(chcReceiptsArr !== undefined && chcReceiptsArr.status.toString() === "true"){
      var _tempData = chcReceiptsArr.cbcDetail;
      if(this.DataService.getdata().cbcuploaddata != undefined)
      {
          var _tempUploadData = this.DataService.getdata().cbcuploaddata;
          _tempUploadData.forEach((obj)=>{
            var existNotification = _tempData.findIndex(({barcodeNo}) => obj.barcodeNo == barcodeNo);
            _tempData.splice(existNotification,1);
          });
      }
        this.chcReceiptsData = _tempData;
      this.DataService.sendData(JSON.stringify({'screen':'CBC','page':"received","uploadcount":0,"receivedcount":this.chcReceiptsData.length, "module": "CHC- SAMPLE REC & PROCESS", "submodule": "Update CBC Results", "pagealter": "Received Samples"}));
    }
    else{
      this.errorMessage = chcReceiptsArr.message;
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
