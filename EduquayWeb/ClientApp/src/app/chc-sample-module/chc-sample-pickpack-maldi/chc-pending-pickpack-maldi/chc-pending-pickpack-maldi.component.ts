import { Component, OnInit, ViewChild, Output, EventEmitter, NgZone } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SamplePickpack, ChcSamplePickpackResponse, tempCHCData, startPickpack } from 'src/app/shared/chc-sample/chc-sample-pickpack/chc-sample-pickpack-response';
import { user } from 'src/app/shared/auth-response';
import { ChcSamplePickpackService } from 'src/app/shared/chc-sample/chc-sample-pickpack/chc-sample-pickpack.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/shared/utility/date.service';
import { TokenService } from 'src/app/shared/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/shared/data.service';


@Component({
  selector: 'app-chc-pending-pickpack-maldi',
  templateUrl: './chc-pending-pickpack-maldi.component.html',
  styleUrls: ['./chc-pending-pickpack-maldi.component.css']
})
export class ChcPendingPickpackMaldiComponent implements OnInit {
 
  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  errorMessage: string;
  errorSpouseMessage: string;

  centralReceiptsData: any[] = [];
  popupData:any;
  processingDate;
  chcsamplepickpack = [];
  pickpackStartList = [];

  samplepicknpackErrorMessage: string;
 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    zone: NgZone,
    private route: ActivatedRoute,
    private DataService:DataService
    ) { }

  ngOnInit() {
  
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
    
    this.centralReceiptsData = [];
    var centralReceiptsArr = this.route.snapshot.data.chcpickpackSamplesData;
    if(centralReceiptsArr !== undefined && centralReceiptsArr.status.toString() === "true"){
      var _tempReceivedData = JSON.parse(JSON.stringify(centralReceiptsArr.pickandPack));
      var _tempData = centralReceiptsArr.pickandPack;
      if(this.DataService.getdata().centralpickpackstart != undefined)
      {
        this.pickpackStartList = this.DataService.getdata().centralpickpackstart;
        this.pickpackStartList.forEach((obj)=>{
            var existNotification = _tempData.findIndex(({barcodeNo}) => obj.barcodeNo == barcodeNo);
            _tempData.splice(existNotification,1);
          });
      }
        this.chcsamplepickpack = _tempData;
        console.log(this.chcsamplepickpack);
       this.DataService.sendData(JSON.stringify({'screen':'centralpickpack','page':"","pendingcount":this.chcsamplepickpack.length,"startpickCount":this.pickpackStartList.length}));
    }
    else{
      this.errorMessage = centralReceiptsArr.message;
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
  
    ngAfterViewInit(): void {
      this.dtTrigger.next();
    } 
  
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }

}
