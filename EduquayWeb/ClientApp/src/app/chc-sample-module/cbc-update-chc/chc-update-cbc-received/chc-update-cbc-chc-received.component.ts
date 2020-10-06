import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { TokenService } from '../../../shared/token.service';

import { DataService } from '../../../shared/data.service';
import { chcsampleService } from '../../../shared/chc-sample/chc-sample.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-chc-update-cbc-chc-received',
  templateUrl: './chc-update-cbc-chc-received.component.html',
  styleUrls: ['./chc-update-cbc-chc-received.component.css']
})
export class CBCCHCReceivedSampleComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  errorMessage: string;
  errorSpouseMessage: string;
  sampleTimeOut = false;
  user;

  chcReceiptsData: any[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    zone: NgZone,
    private route: ActivatedRoute,
    private DataService:DataService,
    private tokenService: TokenService, 
    private chcsampleService: chcsampleService,
    ) { }

  ngOnInit() {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    //this.DataService.sendData(JSON.stringify({"module": "CHC- SAMPLE REC & PROCESS", "page": "Update CBC Results"}));
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
        console.log(this.chcReceiptsData);
      this.DataService.sendData(JSON.stringify({'screen':'CBC','page':"received","uploadcount":0,"receivedcount":this.chcReceiptsData.length, "module": "CHC- SAMPLE REC & PROCESS", "submodule": "Update CBC Results", "pagealter": "Received Samples"}));
    }
    else{
      this.errorMessage = chcReceiptsArr.message;
    }

  }
  
    ngAfterViewInit(): void {
      this.dtTrigger.next();
    }   
  
    confirm(data,type)
    {
        console.log(data);
        console.log(type);

  var _obj = {};
  _obj["subjectId"] = data.subjectId;
  _obj["barcodeNo"] = data.barcodeNo;
  _obj["testingCHCId"] = this.user.chcId;
  _obj["mcv"] = data.mcv;
  _obj["rdw"] = data.rdw;
  _obj["testCompleteOn"] = data.testedDateTime;
  _obj["sampleDateTime"] = data.sampleDateTime;
  _obj["confirmStatus"] =type;
  _obj["userId"] = this.user.id;

  this.chcsampleService.addCHCtestData(_obj)
  .subscribe(response => {
    var _response = response;
    if (_response !== null && _response.status === "true") {
        /*Swal.fire({ allowOutsideClick: false,
          text: 'CBC results uploaded successfully.',
          icon: 'success'
        }).then((result) => {
         
        });*/
        this.refreshdata();
    } else {
      
      this.errorMessage = response.message;
    }

  },
    (err: HttpErrorResponse) => {
      //this.showResponseMessage(err.toString(), 'e');
    });
  console.log(_obj);
    }

    refreshdata()
    {
      this.chcsampleService.retriveCHCtestData().subscribe(response => {
        if(response.status === "true")
        {
          this.chcReceiptsData = response.cbcDetail;
          this.rerender();
        }        
      },
      (err: HttpErrorResponse) =>{
        console.log(err);
      });
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
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
}
