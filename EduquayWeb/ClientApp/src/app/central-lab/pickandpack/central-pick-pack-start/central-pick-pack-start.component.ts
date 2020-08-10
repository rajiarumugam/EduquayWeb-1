import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { DataService } from '../../../shared/data.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { chcsampleService } from 'src/app/shared/chc-sample/chc-sample.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-central-pick-pack-start',
  templateUrl: './central-pick-pack-start.component.html',
  styleUrls: ['./central-pick-pack-start.component.css']
})
export class CentralPickPackStartComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: true})  dtElement: DataTableDirective;
  errorMessage: string;
  errorSpouseMessage: string;
  pickpackStartList = [];
  negativeList = [];
  showUploadResult = false;

  centralReceiptsData: any[] = [];
  tempCHCData = [];
  popupData:any;
  processingDate;
  searchbarcode;
  user;
  chcUploadResponse;


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    zone: NgZone,
    private route: ActivatedRoute,
    private DataService:DataService,
    private tokenService: TokenService,
    private chcsampleService: chcsampleService
    ) { }

  ngOnInit() {
  
    this.user = JSON.parse(this.tokenService.getUser('lu'));
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
    
    this.centralReceiptsData = [];
    var centralReceiptsArr = this.route.snapshot.data.positiveSubjects;
    if(centralReceiptsArr !== undefined && centralReceiptsArr.status.toString() === "true"){
      var _tempData = centralReceiptsArr.sstDetail;
      var _tempReceivedData = JSON.parse(JSON.stringify(centralReceiptsArr.sstDetail));
      if(this.DataService.getdata().centralpickpackstart != undefined)
      {
        this.pickpackStartList = this.DataService.getdata().centralpickpackstart;
        this.pickpackStartList.forEach((obj)=>{
          var existNotification = _tempData.findIndex(({barcodeNo}) => obj.barcodeNo == barcodeNo);
          _tempData.splice(existNotification,1);
        });
        this.showUploadResult = true;
      }
      
        this.centralReceiptsData = _tempData;
        this.tempCHCData = JSON.parse(JSON.stringify(_tempData));
        this.DataService.sendData(JSON.stringify({'screen':'centralpickpack','page':"","pendingcount":this.centralReceiptsData.length,"startpickCount":this.pickpackStartList.length}));
      
    }
    else{
      this.errorMessage = centralReceiptsArr.message;
    }

  }

  searchBarCodetype()
  {

    let term = this.searchbarcode;
    var _index = this.tempCHCData.findIndex(com => com.barcodeNo === term)
    if(_index >= 0)
    {
      this.pickpackStartList.push(this.tempCHCData[_index]);
      this.tempCHCData.splice(_index,1);
      this.searchbarcode = ""; 
      this.DataService.setdata({'centralpickpackstart':this.pickpackStartList});
      this.showUploadResult = true;
      this.DataService.sendData(JSON.stringify({'screen':'SST','page':"received","positivecount":this.pickpackStartList.length,"negativecount":this.negativeList.length,"receivedcount":this.tempCHCData.length}));
      this.rerender();
    } 

  }
  clicksearchBarcode()
  {
    console.log(this.searchbarcode);
  }

  removeItem(index)
  {
    this.tempCHCData.push(this.pickpackStartList[index]);
    this.pickpackStartList.splice(index,1);
    this.rerender();
    this.DataService.sendData(JSON.stringify({'screen':'SST','page':"received","positivecount":this.pickpackStartList.length,"negativecount":this.negativeList.length,"receivedcount":this.tempCHCData.length-this.pickpackStartList.length-this.negativeList.length}));
    this.DataService.setdata({'centralpickpackstart':this.pickpackStartList});
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Sample moved to Received Sample.',
      showConfirmButton: false,
      timer: 2000
    })
    if(this.pickpackStartList.length == 0)
        this.showUploadResult = false;
  }

  submitNegativeResult()
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "Submit the positive results",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#ffffff'
    }).then((result) => {
      if (result.value) {
        var _tempArr = [];
        this.pickpackStartList.forEach(function(val,index){
          var _obj = {};
          _obj['isPositive'] = true;
          _obj['createdBy'] = this.user.id;
          _obj['testingCHCId'] = this.user.chcId;
          _obj['subjectId'] = val.subjectId;
          _obj['barcodeNo'] = val.barcodeNo;
          _tempArr.push(_obj);
        }.bind(this));
        this.chcsampleService.addSSTtest({"ssTestRequest":_tempArr})
      .subscribe(response => {
        this.chcUploadResponse = response;
        if (this.chcUploadResponse !== null && this.chcUploadResponse.status === "true") {
            Swal.fire({
              text: 'Positive results submitted successfully.',
              icon: 'success'
            }).then((result) => {
              var _tempPositiveLength = this.pickpackStartList.length;
              this.pickpackStartList = [];
              this.DataService.sendData(JSON.stringify({'screen':'SST','page':"received","positivecount":this.pickpackStartList.length,"negativecount":this.negativeList.length,"receivedcount":this.centralReceiptsData.length-_tempPositiveLength-this.negativeList.length}));
              this.DataService.deleteProp('centralpickpackstart');
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

    rerender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first      
        //dtInstance.clear();
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
