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
  selector: 'app-chc-update-sst-negative',
  templateUrl: './chc-update-sst-negative.component.html',
  styleUrls: ['./chc-update-sst-negative.component.css']
})
export class SSTUpdateNegativeComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: true})  dtElement: DataTableDirective;
  errorMessage: string;
  errorSpouseMessage: string;
  negativeList = [];
  showUploadResult = false;

  chcReceiptsData: any[] = [];
  tempCHCData = [];
  popupData:any;
  processingDate;
  searchbarcode;
  user;
  chcUploadResponse;
  positiveList = [];


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
    
    this.chcReceiptsData = [];
    var chcReceiptsArr = this.route.snapshot.data.positiveSubjects;
    if(chcReceiptsArr !== undefined && chcReceiptsArr.status.toString() === "true"){
      var _tempData = chcReceiptsArr.sstDetail;
      if(this.DataService.getdata().sstNegative != undefined)
      {
        this.negativeList = this.DataService.getdata().sstNegative;
        this.showUploadResult = true;
        this.negativeList.forEach((obj)=>{
          var existNotification = _tempData.findIndex(({barcodeNo}) => obj.barcodeNo == barcodeNo);
          _tempData.splice(existNotification,1);
        });
      }

      if(this.DataService.getdata().sstPositive != undefined)
      {
        this.positiveList = this.DataService.getdata().sstPositive;
        this.positiveList.forEach((obj)=>{
          var existNotification = _tempData.findIndex(({barcodeNo}) => obj.barcodeNo == barcodeNo);
          _tempData.splice(existNotification,1);
        });
      }
        this.chcReceiptsData = _tempData;
        this.tempCHCData = JSON.parse(JSON.stringify(_tempData));
        this.DataService.sendData(JSON.stringify({'screen':'SST','page':"received","positivecount":this.positiveList.length,"negativecount":this.negativeList.length,"receivedcount":this.chcReceiptsData.length-this.negativeList.length-this.positiveList.length}));
      
    }
    else{
      this.errorMessage = chcReceiptsArr.message;
    }

  }

  searchBarCodetype()
  {
    console.log(this.searchbarcode);
    let term = this.searchbarcode;
    var _index = this.tempCHCData.findIndex(com => com.barcodeNo === term)
    console.log(_index);
    if(_index >= 0)
    {
      this.negativeList.push(this.tempCHCData[_index]);
      this.tempCHCData.splice(_index,1);
      this.DataService.sendData(JSON.stringify({'screen':'SST','page':"received","positivecount":this.positiveList.length,"negativecount":this.negativeList.length,"receivedcount":this.chcReceiptsData.length-this.negativeList.length-this.positiveList.length}));
      this.rerender();
      this.searchbarcode = ""; 
      this.DataService.setdata({'sstNegative':this.negativeList});
      this.showUploadResult = true;
    } 
    console.log(this.negativeList);
  }
  clicksearchBarcode()
  {
    console.log(this.searchbarcode);
  }

  removeItem(index)
  {
    this.negativeList.splice(index,1);
    this.DataService.sendData(JSON.stringify({'screen':'SST','page':"received","positivecount":this.positiveList.length,"negativecount":this.negativeList.length,"receivedcount":this.chcReceiptsData.length-this.negativeList.length-this.positiveList.length}));
    this.DataService.setdata({'sstNegative':this.negativeList});
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 2000
    })
    if(this.negativeList.length == 0)
        this.showUploadResult = false;
  }

  submitNegativeResult()
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "Submit the negative results",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#ffffff'
    }).then((result) => {
      if (result.value) {
        var _tempArr = [];
        this.negativeList.forEach(function(val,index){
          var _obj = {};
          _obj['isPositive'] = false;
          _obj['createdBy'] = this.user.id;
          _obj['testingCHCId'] = this.user.chcId;
          _obj['subjectId'] = val.subjectId;
          _obj['barcodeNo'] = val.barcodeNo;
          _tempArr.push(_obj);
        }.bind(this));
        this.chcsampleService.addCBCtest({"ssTestRequest":_tempArr})
      .subscribe(response => {
        this.chcUploadResponse = response;
        if (this.chcUploadResponse !== null && this.chcUploadResponse.status === "true") {
            Swal.fire({
              text: 'Negative results submitted successfully.',
              icon: 'success'
            }).then((result) => {
              this.negativeList = [];
              this.DataService.sendData(JSON.stringify({'screen':'SST','page':"received","positivecount":this.positiveList.length,"negativecount":this.negativeList.length,"receivedcount":this.chcReceiptsData.length-this.negativeList.length-this.positiveList.length}));
              this.DataService.deleteProp('sstNegative');
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
