import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/shared/utility/date.service';
import { ChcSamplePickpackResponse, SamplePickpack, tempCHCData, startPickpack } from 'src/app/shared/chc-sample/chc-sample-pickpack/chc-sample-pickpack-response';
import { ChcSamplePickpackService } from 'src/app/shared/chc-sample/chc-sample-pickpack/chc-sample-pickpack.service';
import { TokenService } from 'src/app/shared/token.service';
import { user } from 'src/app/shared/auth-response';
import { HttpErrorResponse } from '@angular/common/http';
import { ChcSampleList } from 'src/app/shared/chc-module/chc-pickandpack/chc-picknpack-response';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chc-sample-pickpack',
  templateUrl: './chc-sample-pickpack.component.html',
  styleUrls: ['./chc-sample-pickpack.component.css']
})
export class ChcSamplePickpackComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild(DataTableDirective, { static: false }) dtElement1: DataTableDirective;

  //@Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtOptions1: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject();

  samplepicknpackErrorMessage: string;
  chcsamplepickpack: SamplePickpack[];
  chcsamplepicknpickResponse: ChcSamplePickpackResponse;
  chcsamplepickpackinitResponse: any;
  user: user;

  searchbarcode: string = '';
  alliquotetubebarcode: string = '';
  isAliquoteBarcodeMatch: boolean = false;
  tempCHCDatas: tempCHCData[] = [];
  startPickpackData: startPickpack[] = [];
  primarytubeSelected: boolean = true;
  alliquotedtubeSelected: boolean = true;
  //tempCHC=[];
  uniqueSubjectId: string;
  sampleCollectionId: number;
  subjectName: string;
  rchId: string;
  barcodeNo: string;
  sampleDateTime: string;
  gestationalAge: string;
  samplepicknPackdetail;


  constructor(
    private chcsamplePickpackService: ChcSamplePickpackService,
    private modalService: NgbModal,
    private dateService: DateService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute,

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
    this.dtOptions1 = {
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

    console.log(this.chcsamplePickpackService.chcSamplePickPackApi);
    //this.chcsamplepicknpackList(this.user.chcId);

    this.chcsamplepickpackinitResponse = this.route.snapshot.data.chcpickpackSamplesData;
    if (this.chcsamplepickpackinitResponse.status === 'false') {
      this.chcsamplepickpack = [];
      if (this.chcsamplepickpackinitResponse.message !== null && this.chcsamplepickpackinitResponse.message.code === "ENOTFOUND") {
        this.samplepicknpackErrorMessage = "Unable to connect to api source";
      }
      else if (this.chcsamplepickpackinitResponse.message !== null || this.chcsamplepickpackinitResponse.message == undefined) {
        this.samplepicknpackErrorMessage = this.chcsamplepickpackinitResponse.message;
      }
    }
    else {

      if (this.chcsamplepickpackinitResponse.pickandPack != null && this.chcsamplepickpackinitResponse.pickandPack.length > 0) {
        this.chcsamplepickpack = this.chcsamplepickpackinitResponse.pickandPack;
      }
    }


  }

  chcsamplepicknpackList(chcId) {
    this.chcsamplepickpack = [];
    let picknpack = this.chcsamplePickpackService.getsamplePickpackChc(this.user.chcId)
      .subscribe(response => {
        this.chcsamplepicknpickResponse = response;
        if (this.chcsamplepicknpickResponse !== null && this.chcsamplepicknpickResponse.status === "true") {
          if (this.chcsamplepicknpickResponse.pickandPack.length <= 0) {
            this.samplepicknpackErrorMessage = response.message;
          }
          else {
            this.chcsamplepickpack = this.chcsamplepicknpickResponse.pickandPack;
            // this.sampleList.forEach(element => {
            //   element.sampleSelected = true;
            // });
            this.rerender();
          }
        }
        else {
          this.samplepicknpackErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.samplepicknpackErrorMessage = err.toString();
        });

  }
  fetchmatchingBarcodeData() {

    this.tempCHCDatas = [];
    let term = this.searchbarcode;
    var getindex = this.chcsamplepickpack.findIndex(com => com.barcodeNo === term)
    if (getindex >= 0) {
      this.tempCHCDatas.push(this.chcsamplepickpack[getindex]);
      this.searchbarcode='';
    }
    else {
      Swal.fire({
        icon: 'error', title: "Barcode is  invalid", confirmButtonText: 'Ok'
      })
        .then((result) => {
          if (result.value) {
            this.modalService.dismissAll();
          }
        });
    }

  }

  clicksearchBarcode(samplepicknPackdetail) {

    this.fetchmatchingBarcodeData();
    this.alliquotetubebarcode = '';
    this.isAliquoteBarcodeMatch = false;
    this.modalService.open(
      samplepicknPackdetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      ariaLabelledBy: 'modal-basic-title'
    });

  }
  

  validateAlliqutetubeMatch() {
    
    //this.tempCHCDatas = [];
  
    let alliquotetube = this.alliquotetubebarcode;
    this.tempCHCDatas.forEach(element => {
      if (element.barcodeNo === alliquotetube) {
        this.isAliquoteBarcodeMatch = true;
      }
      else {
        Swal.fire({ icon: 'error', title: "Barcode didn't match", text: 'Please scan the correct barcode', confirmButtonText: 'Ok' })
      }
    });
  }

  onSubmit(){

    if(this.primarytubeSelected === true && this.alliquotedtubeSelected === true){
      // this.tempCHCDatas.forEach(element1 => {
      //   this.chcsamplepickpack.forEach(element2 =>{
      //     if (element1.barcodeNo === element2.barcodeNo) {
      //       Swal.fire({ icon: 'error', title: "Barcode didn't match", text: 'Please scan the correct barcode', confirmButtonText: 'Ok' })
      //     }
      //   })
      // });
      this.modalService.dismissAll();
      this.tempCHCDatas.forEach(element1 => {
        var getdataindex = this.chcsamplepickpack.findIndex(com => com.barcodeNo === element1.barcodeNo)
        if (getdataindex >= 0) {
          this.startPickpackData.push(this.chcsamplepickpack[getdataindex]);
          //this.searchbarcode='';
        }
      });
      
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
    this.dtElement1.dtInstance.then((dtInstance: DataTables.Api) => {
      
      // Destroy the table first   
      dtInstance.clear();
      dtInstance.destroy();
      // Call the dtTrigger to rerender again       
      this.dtTrigger1.next();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.dtTrigger1.next();
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.dtTrigger1.unsubscribe();
  }

}
