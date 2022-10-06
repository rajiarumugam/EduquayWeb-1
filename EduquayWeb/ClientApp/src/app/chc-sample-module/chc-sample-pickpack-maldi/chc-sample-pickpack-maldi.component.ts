import { Component, OnInit, ViewChild, Output, EventEmitter, QueryList, OnDestroy, AfterViewInit, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/shared/utility/date.service';
import { ChcSamplePickpackService } from 'src/app/shared/chc-sample/chc-sample-pickpack/chc-sample-pickpack.service';
import { TokenService } from 'src/app/shared/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { sample } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { startPickpack, tempCHCData, centalLabModel, logisticsProviderModel, ChcSampleAddShipmentResponse, chcsampleProviderNameResponse, chcsampleCentrallabResponse, ChcSamplePickpackResponse, SamplePickpack } from 'src/app/shared/chc-sample/chc-sample-pickpack/chc-sample-pickpack-response';
import { user } from 'src/app/shared/auth-response';
import { ChcSampleAddShipmentRequest } from 'src/app/shared/chc-sample/chc-sample-pickpack/chc-sample-pickpack-request';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';


@Component({
  selector: 'app-chc-sample-pickpack-maldi',
  templateUrl: './chc-sample-pickpack-maldi.component.html',
  styleUrls: ['./chc-sample-pickpack-maldi.component.css']
})
export class ChcSamplePickpackMaldiComponent implements AfterViewInit, OnDestroy, OnInit  {
  
  //@ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>;

  @Output() public onLoadSamples = new EventEmitter();
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtOptions1: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject();

  samplepicknpackErrorMessage: string;
  chcsamplepickpack: SamplePickpack[];
  chcsamplepicknpickResponse: ChcSamplePickpackResponse;
  chcsamplepickpackinitResponse: any;
  chcsamplecentralLab: chcsampleCentrallabResponse;
  chcsampleprovidername: chcsampleProviderNameResponse;
  chcsampleAddShipmentRequest: ChcSampleAddShipmentRequest;
  chcsampleAddShipmentResponse: ChcSampleAddShipmentResponse;
  providerNames: logisticsProviderModel[] = [];
  centralLab: centalLabModel[]=[]; 
  user: user;

  shipmentId: string;
  errorMessage: string;
  selectedBarcodes: string;
  searchbarcode: string = '';
  selectedcentralLab: string = '';
  selectedproviderName:string = '';
  alliquotetubebarcode: string = '';
  isAddShipmentTrue: boolean = false;
  isAliquoteBarcodeMatch: boolean = false;
  tempCHCDatas: tempCHCData[] = [];
  startPickpackData: startPickpack[] = [];
  primarytubeSelected: boolean = true;
  alliquotedtubeSelected: boolean = true;
  startpickpackSelected: boolean = true;
  //tempCHC=[];
  uniqueSubjectId: string;
  sampleCollectionId: number;
  subjectName: string;
  rchId: string;
  barcodeNo: string;
  sampleDateTime: string;
  gestationalAge: string;
  samplepicknPackdetail;
  sampleShipmentDate: string;
  sampleShipmentTime: string;
  popupform: FormGroup;
  DAY = 86400000;
  selectedAll: any;
  selectedall: boolean = true;
  chclabtechnician:string;
  testingChcname:string;
  labTechnicianName: string;
  chcUserId: number;
  testingCHCId: number;
  receivingCentralLabId: number;
  logisticsProviderId: number;
  deliveryExecutiveName: string;
  executiveContactNo: string;
  dateOfShipment: string;
  timeOfShipment: string;
  createdBy: number;

  shipmentDateOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y H:i',
    defaultDate: new Date(Date.now()),
    //minDate: this.dyCollectionDate,
    maxDate: new Date(Date.now()),
    enableTime: true,
  };

  pendingBadgeSampleCount: number = 0;
  startBadgePickpackCount: number = 0;
  _intSelectedBarcode :number;
  _strSelectedBarcode: string;
  _intSelectedBarcoderemove: number;

  constructor(
    private chcsamplePickpackService: ChcSamplePickpackService,
    private modalService: NgbModal,
    private dateService: DateService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private dataservice: DataService,
    private loaderService: LoaderService

  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "CHC- SAMPLE REC & PROCESS", "page": "Pick & Pack for HPLC lab"}));

   // this.dtOptions[0] = this.chcsamplepickpack;
    //this.dtOptions1[1] = this.startPickpackData;
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.InitializeDateRange();
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
    this.dtOptions1 = {
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
    console.log(this.chcsamplePickpackService.chcSamplePickPackApi);
    this.chcsamplepicknpackList(this.user.chcId);
    // Resolver //
    // this.chcsamplepickpackinitResponse = this.route.snapshot.data.chcpickpackSamplesData;
    // if (this.chcsamplepickpackinitResponse.status === 'false') {
    //   this.chcsamplepickpack = [];
    //   if (this.chcsamplepickpackinitResponse.message !== null && this.chcsamplepickpackinitResponse.message.code === "ENOTFOUND") {
    //     this.samplepicknpackErrorMessage = "Unable to connect to api source";
    //   }
    //   else if (this.chcsamplepickpackinitResponse.message !== null || this.chcsamplepickpackinitResponse.message == undefined) {
    //     this.samplepicknpackErrorMessage = this.chcsamplepickpackinitResponse.message;
    //   }
    // }
    // else {

    //   if (this.chcsamplepickpackinitResponse.pickandPack != null && this.chcsamplepickpackinitResponse.pickandPack.length > 0) {
    //     this.chcsamplepickpack = this.chcsamplepickpackinitResponse.pickandPack;
    //     this.pendingBadgeSampleCount = this.chcsamplepickpack.length;
       
    //   }
    // }
  }
 
  chcsamplepicknpackList(chcId) {

    this.loaderService.display(true);
    this.chcsamplepickpack = [];
    let picknpack = this.chcsamplePickpackService.getsamplePickpackChcMaldi(this.user.chcId)
      .subscribe(response => {
        this.chcsamplepicknpickResponse = response;
        this.loaderService.display(false);
        if (this.chcsamplepicknpickResponse !== null && this.chcsamplepicknpickResponse.status === "true") {
          if (this.chcsamplepicknpickResponse.pickandPack.length <= 0) {
            this.samplepicknpackErrorMessage = response.message;
          }
          else {
            this.chcsamplepickpack = this.chcsamplepicknpickResponse.pickandPack;
            this.pendingBadgeSampleCount = this.chcsamplepickpack.length;
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
  onChange(samplepicknPackdetail, primarytube) {

    this.tempCHCDatas = [];
    console.log('changed', this.searchbarcode, primarytube);
    primarytube = this.searchbarcode;
    //this.searchbarcode = primarytube;
    var getindex = this.chcsamplepickpack.findIndex(com => com.barcodeNo === primarytube)
    //var getexistsindex = this.tempCHCDatas.findIndex(data => data.barcodeNo === term)
    if (getindex >= 0) {
      this.tempCHCDatas.push(this.chcsamplepickpack[getindex]);
      primarytube = true;
      this.alliquotetubebarcode = '';
      this.isAliquoteBarcodeMatch = false;
      

      this.modalService.open(
        samplepicknPackdetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
    }
    // else if (this.tempCHCDatas.filter(({ barcodeNo }) => this.barcodeNo == barcodeNo).length) {
    //   console.log('User already exists');
    //  }

    // else {
    //   Swal.fire({ allowOutsideClick: false,
    //     icon: 'error', title: "Barcode is  invalid", confirmButtonText: 'Ok'
    //   });
    //   this.searchbarcode=''; 
    // }

  }
  clicksearchBarcode(samplepicknPackdetail){
    console.log(this.searchbarcode);
  }

  ddlcentrallab(chcId) {
    let riPoint = this.chcsamplePickpackService.getCentrallab(this.user.chcId).subscribe(response => {
      this.chcsamplecentralLab = response;
      if (this.chcsamplecentralLab !== null && this.chcsamplecentralLab.status === "true") {
        this.centralLab = this.chcsamplecentralLab.centalLab;
        //this.selectedtestingCHC = "";
        if (this.centralLab.length > 0) {
          this.selectedcentralLab = this.centralLab[0].id.toString();
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

  ddlProviderName() {
    let riPoint = this.chcsamplePickpackService.getProviderName().subscribe(response => {
      this.chcsampleprovidername = response;
      if (this.chcsampleprovidername !== null && this.chcsampleprovidername.status === "true") {
        this.providerNames = this.chcsampleprovidername.logisticsProvider;
        if (this.providerNames.length > 0) {
          this.selectedproviderName = this.providerNames[0].id.toString();
        }
        //this.selectedproviderName = "";
      }
      else {
        this.samplepicknpackErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.samplepicknpackErrorMessage = err.toString();
      });
  }

  // clicksearchBarcode(samplepicknPackdetail) {

  //   this.fetchmatchingBarcodeData();
  //   this.alliquotetubebarcode = '';
  //   this.isAliquoteBarcodeMatch = false;
  //   this.modalService.open(
  //     samplepicknPackdetail, {
  //     centered: true,
  //     size: 'xl',
  //     scrollable: true,
  //     backdrop:'static',
  //     keyboard: false,
  //     ariaLabelledBy: 'modal-basic-title'
  //   });

  // }

  openshipmentform(sampleShipmentDetails, startpicknpack: startPickpack){

    this.ddlcentrallab(this.user.chcId);
    this.ddlProviderName();
    this.fetchMaxDate();
    this.selectedBarcodes = this._strSelectedBarcode = this.getSelectedBarcode();

    this.chclabtechnician = this.user.name;
    this.testingChcname = this.user.chcName;

    this.sampleShipmentDate = moment().format("DD/MM/YYYY");
    this.sampleShipmentTime = moment().format("HH:mm");
    this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");
    this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");

    this.modalService.open(
      sampleShipmentDetails, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
  }

  onSubmit(chcShipmentForm: NgForm){
    this.samplepicknpackErrorMessage = '';
    var _arrsubmitSelectedBarcode = [];
    this.fetchMaxDate();
    this.selectedBarcodes = this._strSelectedBarcode = this.getSelectedBarcode();
    //var shipmentId = "123";
    console.log(chcShipmentForm.value);

    // if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
    //   this.showResponseMessage(this.constantService.SelectOneSample, 'e');
    //   return false;
    // }
    this.receivingCentralLabId = chcShipmentForm.value.DDLcentrallab;
    this.logisticsProviderId =  chcShipmentForm.value.DDLserviceproviderName;
    this.executiveContactNo = chcShipmentForm.value.contactNo;
    this.deliveryExecutiveName = chcShipmentForm.value.deliveryexecutivename;

    this.chcsampleAddShipmentRequest = {

      labTechnicianName: this.user.name,
      barcodeNo: this.selectedBarcodes,
      chcUserId: this.user.id,
      receivingCentralLabId: +(1),
      logisticsProviderId: +(this.logisticsProviderId),
      deliveryExecutiveName: this.deliveryExecutiveName,
      executiveContactNo: this.executiveContactNo,
      testingCHCId:1,
      dateOfShipment: this.sampleShipmentDate,
      timeOfShipment: this.sampleShipmentTime,
      createdBy: this.user.id,
      source: 'N'
    }
    // this.showResponseMessage('testing', 's');
    //return false;
    let addshipment = this.chcsamplePickpackService.chcSampleAddShipmentMaldi(this.chcsampleAddShipmentRequest)
      .subscribe(response => {
        this.chcsampleAddShipmentResponse = response;
        if (this.chcsampleAddShipmentResponse !== null && this.chcsampleAddShipmentResponse.status === "true") {
          this.showResponseMessage(this.chcsampleAddShipmentResponse.shipment.shipmentId, 's');
          this.chcsamplepicknpackList(this.user.chcId);
          this.removeSelectedBarcode(); 
          
        } else {
          this.showResponseMessage(this.chcsampleAddShipmentResponse.shipment.errorMessage, 'e');
          this.samplepicknpackErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.showResponseMessage(err.toString(), 'e');
          this.samplepicknpackErrorMessage = err.toString();
        });
  }
  onSubmitMaldi(chcShipmentForm: NgForm){
    this.samplepicknpackErrorMessage = '';
    var _arrsubmitSelectedBarcode = [];
    this.fetchMaxDate();
    this.selectedBarcodes = this._strSelectedBarcode = this.getSelectedBarcode();
   
    //var shipmentId = "123";
    console.log(chcShipmentForm.value);

    // if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
    //   this.showResponseMessage(this.constantService.SelectOneSample, 'e');
    //   return false;
    // }
    this.receivingCentralLabId = chcShipmentForm.value.DDLcentrallab;
    this.logisticsProviderId =  chcShipmentForm.value.DDLserviceproviderName;
    this.executiveContactNo = chcShipmentForm.value.contactNo;
    this.deliveryExecutiveName = chcShipmentForm.value.deliveryexecutivename;

    this.chcsampleAddShipmentRequest = {

      labTechnicianName: this.user.name,
      barcodeNo: this.selectedBarcodes,
      chcUserId: this.user.id,
      receivingCentralLabId: +(1),
      logisticsProviderId: +(this.logisticsProviderId),
      deliveryExecutiveName: this.deliveryExecutiveName,
      executiveContactNo: this.executiveContactNo,
      testingCHCId:1,
      dateOfShipment: this.sampleShipmentDate,
      timeOfShipment: this.sampleShipmentTime,
      createdBy: this.user.id,
      source: 'N'
    }
    // this.showResponseMessage('testing', 's');
    //return false;
    let addshipment = this.chcsamplePickpackService.chcSampleAddShipmentMaldi(this.chcsampleAddShipmentRequest)
      .subscribe(response => {
        this.chcsampleAddShipmentResponse = response;
        if (this.chcsampleAddShipmentResponse !== null && this.chcsampleAddShipmentResponse.status === "true") {
          this.showResponseMessage(this.chcsampleAddShipmentResponse.shipment.shipmentId, 's');
          this.chcsamplepicknpackList(this.user.chcId);
          this.removeSelectedBarcode(); 
          
        } else {
          this.showResponseMessage(this.chcsampleAddShipmentResponse.shipment.errorMessage, 'e');
          this.samplepicknpackErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.showResponseMessage(err.toString(), 'e');
          this.samplepicknpackErrorMessage = err.toString();
        });
  }

  showResponseMessage(shipmentId: string, type: string) {
    var messageType = '';
    var title = `Shipment Id is ${shipmentId}`;
    if (type === 'e') {
      Swal.fire({ allowOutsideClick: false, icon: 'error', title: shipmentId, confirmButtonText: 'Close' })
    }
    else {
      Swal.fire({ allowOutsideClick: false,
        icon: 'success', title: title,
        showCancelButton: true, confirmButtonText: 'Shipment Log', cancelButtonText: 'Close'
      })
        .then((result) => {
          if (result.value) {
            this.modalService.dismissAll();
            //this.router.navigate(['/app/anm-viewshipment',{'q':shipmentId}]);
            this.router.navigateByUrl(`/app/chc-sample-viewshipment-maldi?q=${shipmentId}`);

          }
          else {
            this.modalService.dismissAll();
          }
        });
    }
  }
  clickvalidateAlliqutetubeMatch(){
    console.log(this.alliquotetubebarcode);
  }
  
  validateAlliqutetubeMatch(alliquotetube) {
    
    //this.tempCHCDatas = [];
    //let alliquotetube = this.alliquotetubebarcode;
    this.alliquotetubebarcode = alliquotetube;

    var alliquotetubeExist = this.tempCHCDatas.filter(alli => alli.barcodeNo === alliquotetube);
    if(alliquotetubeExist !== undefined && alliquotetubeExist.length > 0){
      this.isAliquoteBarcodeMatch = true;
      this.searchbarcode='';
    }
    
    /*
    this.tempCHCDatas.forEach(element => {
      if (element.barcodeNo === alliquotetube) {
        this.isAliquoteBarcodeMatch = true;
        this.searchbarcode='';
        break;
      }
      // else {
      //   Swal.fire({ allowOutsideClick: false, icon: 'error', title: "Barcode didn't match", text: 'Please scan the correct barcode', confirmButtonText: 'Ok' });
      //   this.alliquotetubebarcode='';
      // }
    });*/

  }

  submittoshipment(){ 

    if(this.alliquotedtubeSelected === true){
     
      this.modalService.dismissAll();
     
      this.tempCHCDatas.forEach(element1 => {
        var getdataindex = this.chcsamplepickpack.findIndex(com => com.barcodeNo === element1.barcodeNo)
        if (getdataindex >= 0) {
          this.startPickpackData.push(this.chcsamplepickpack[getdataindex]);
          this.chcsamplepickpack.splice(getdataindex,1);
         // this.searchbarcode = '';
          this.isAddShipmentTrue = true;
          this.pendingBadgeSampleCount = this.chcsamplepickpack.length;
          this.startBadgePickpackCount = this.startPickpackData.length;
          this.rerender();

        }
      }); 
      // this.searchbarcode = '';    
      // this.searchbarcode = '';    
    }
    else{
      Swal.fire({ allowOutsideClick: false,
        icon: 'warning',
        title: 'Please select the Primary and Alliquoted HPLC tube',
        showConfirmButton: true,
        confirmButtonText: 'OK'
      })
    }

  }

  // selectAll(index) {
  //   for (var i = 0; i < this.startPickpackData.length; i++) {
  //     this.startPickpackData[i].startpickpackSelected = this.selectedAll;
  //     console.log(this.startPickpackData);
  //   }
  // }
  checkIfSelected(index)
  {
    this.chcsamplepickpack.push(this.startPickpackData[index]);
    this.startPickpackData.splice(index,1);
    this.pendingBadgeSampleCount = this.chcsamplepickpack.length;
    this.startBadgePickpackCount = this.startPickpackData.length;
    this.rerender();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Back to ship',
      showConfirmButton: false,
      timer: 2000
    })
    if(this.startPickpackData.length == 0)
        this.isAddShipmentTrue = false;
  }

  // checkIfSelected(index){

  //   this.startpickpackSelected;
  //   this.isAddShipmentTrue = false;
  //   console.log(this.startPickpackData);
  //   this.selectedAll = this.startPickpackData.every(function (item: any) {
  //     return item.startpickpackSelected == true;
  //   })
  //   if(this.startpickpackSelected === false){
      
  //     this.chcsamplepickpack.push(this.startPickpackData[index]);
  //     this.startPickpackData.splice(index,1);
  //     this.pendingBadgeSampleCount = this.chcsamplepickpack.length;
  //     this.startBadgePickpackCount = this.startPickpackData.length;
  //     this.rerender();
  //     this.isAddShipmentTrue = false;
     
  //     Swal.fire({ allowOutsideClick: false,
  //       position: 'top-end',
  //       icon: 'success',
  //       title: 'Back to Ship',
  //       showConfirmButton: false,
  //       timer: 2000
  //     })
  //   }
  //   else{
  //     this.isAddShipmentTrue = true;
  //   }
  // }

  InitializeDateRange() {

    this.popupform = this._formBuilder.group({
      shipmentDate: [new Date(moment().add(-1, 'day').format())],
    });

    //Change of sample shipment date
    this.popupform.controls.shipmentDate.valueChanges.subscribe(changes => {
      console.log('end: ', changes);
      if (!changes[0]) return;
      const selectedDate2 = changes[0].getTime();
      this.sampleShipmentDate = moment(new Date(selectedDate2)).format("DD/MM/YYYY");
      this.sampleShipmentTime = moment(new Date(selectedDate2)).format("HH:mm");
    });

  }
  removeSelectedBarcode() {
  
    var _arrsubmitSelectedBarcode = [];
    this.startPickpackData.forEach(element => {
      console.log('sampleSelected :' + element.startpickpackSelected);
      if (this.startpickpackSelected === true) {
        _arrsubmitSelectedBarcode.push(element.barcodeNo);
      }
    });
      this._intSelectedBarcoderemove = _arrsubmitSelectedBarcode.length;
      this.startPickpackData = [];
      this.startPickpackData.splice(this._intSelectedBarcode, 1)
      this.startBadgePickpackCount = this.startPickpackData.length;
      this.rerender();
  }

  getSelectedBarcode() {
  
        var _arrSelectedBarcode = [];
        this.startPickpackData.forEach(element => {
          console.log('sampleSelected :' + element.startpickpackSelected);
          if (this.startpickpackSelected === true) {
            _arrSelectedBarcode.push(element.barcodeNo);
          }
        });
        this._intSelectedBarcode = _arrSelectedBarcode.length;
        return _arrSelectedBarcode.join(',');
      }

  fetchMaxDate() {
    this.selectedBarcodes = '';
    var isFirst = true;
    var getdates;
    this.startPickpackData.forEach(element => {
      console.log('sampleSelected :' + element.startpickpackSelected);
      if (this.startpickpackSelected === true) {
        //if (element.sampleSelected) {
        if (isFirst) {
          //this.selectedBarcodes += element.barcodeNo;
          getdates = [{ "selecteddate": this.convertToDateFormat(element.cbcTestCompletedDate) }];
          isFirst = false;
        }
        else {
           //this.selectedBarcodes += ',' + element.barcodeNo;
          
          getdates.push({ "selecteddate": this.convertToDateFormat(element.cbcTestCompletedDate) });
        }
      }
    });
    var comparedate;
    comparedate = getdates.reduce(function (r, a) {
      return r.selecteddate > a.selecteddate ? r : a;
    });
   
    this.shipmentDateOptions.minDate = comparedate.selecteddate;
  }

  convertToDateFormat(strDate){
  
    var pattern = /(\d{2})\/(\d{2})\/(\d{4})\ (\d{2})\:(\d{2})/;
    if (strDate=''){
    var dateFormat = new Date(strDate.toString().replace(pattern, '$3/$2/$1 $4:$5'));
    console.log(dateFormat);
    return dateFormat;
  }
  else
  {
    return strDate
  }
  }
  rerender(): void {
    // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      
    //   // Destroy the table first   
    //   dtInstance.clear();
    //   dtInstance.destroy();
    //   // Call the dtTrigger to rerender again       
    //   this.dtTrigger.next();
    // });
    // this.dtElement1.dtInstance.then((dtInstance: DataTables.Api) => {
      
    //   // Destroy the table first   
    //   dtInstance.clear();
    //   dtInstance.destroy();
    //   // Call the dtTrigger to rerender again       
    //   this.dtTrigger1.next();
    // });
    // this.dtElements.forEach((dtElement: DataTableDirective) => {
    //   if(dtElement.dtInstance)
    //     dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //       dtInstance.clear();
    //       dtInstance.destroy(); 
    //       dtInstance.draw();         
    //   });
    // });

    this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
      dtElement.dtInstance.then((dtInstance: any) => {
        console.log(`The DataTable ${index} instance ID is: ${dtInstance.table().node().id}`);
        //dtInstance.clear();
        dtInstance.destroy();
        //dtInstance.draw();
      });    
    });
    this.dtTrigger.next();
    this.dtTrigger1.next();   
    
  }
  returnTimeStamp(da)
  {
    var _date = da.split('/')[0];
    var _month = da.split('/')[1];
    var _year = da.split('/')[2];
    return moment(_month+"/"+_date+"/"+_year).unix();
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

  // receiveBadgeCount(componentReference){
  //   //onLoadSamples
  //   componentReference.onLoadSamples.subscribe((data: number) => {
  //     if(this.router.url.indexOf('sample-pickpack') >= 0){
  //       this.pendingBadgeSampleCount = data;
  //     }
  //     else if(this.router.url.indexOf('startpickpack') >= 0){
  //       this.startBadgePickpackCount = data;
  //     }
  //   });
  // }
}
