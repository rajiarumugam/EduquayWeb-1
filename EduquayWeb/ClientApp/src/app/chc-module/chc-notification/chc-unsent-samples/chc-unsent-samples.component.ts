import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { user } from 'src/app/shared/auth-response';
import { ChcUnsentSamplesRequest, AddChcUnsentsamplesRequest, unsentMoveTimeoutExpiryRequest } from 'src/app/shared/chc-module/chc-unsent-samples/chc-unsent-samples-request';
import { ChcUnsentSamplesResponse, AddChcUnsentSampleResponse, ChcUnsentSampleList, ChcUnsentResponse, ChcModel, UnsentProviderNameResponse, logisticsProviderModel, UnsentTestingChcResponse, ChcTestingModel, ChcUnsentMoveTimeoutExpiryResponse } from 'src/app/shared/chc-module/chc-unsent-samples/chc-unsent-samples-response';
import { ChcUnsentSamplesService } from 'src/app/shared/chc-module/chc-unsent-samples/chc-unsent-samples.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/shared/utility/date.service';
import { TokenService } from 'src/app/shared/token.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { ConstantService } from 'src/app/shared/constant.service';

@Component({
  selector: 'app-chc-unsent-samples',
  templateUrl: './chc-unsent-samples.component.html',
  styleUrls: ['./chc-unsent-samples.component.css']
})
export class ChcUnsentSamplesComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('shipmentDatePicker', { static: false }) shipmentDatePicker;

  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  user: user;

  chcunsentSamplesErrorMessage: string;
  chcunsentSampleInitResponse: any;
  //unsentSamplesRequest: UnsentSamplesRequest;
  chcunsentSamplesRequest: ChcUnsentSamplesRequest;
  chcunsentSamplesResponse: ChcUnsentSamplesResponse;
  AddchcunsentSamplesRequest: AddChcUnsentsamplesRequest;
  AddchcunsentSamplesResponse: AddChcUnsentSampleResponse;
  movetimeoutexpiryRequest: unsentMoveTimeoutExpiryRequest;
  movetimeoutexpiryResponse: ChcUnsentMoveTimeoutExpiryResponse;
  collectionChcResponse: ChcUnsentResponse;
  collectionchc: ChcModel[] = [];
  providernameResponse: UnsentProviderNameResponse;
  providerNames: logisticsProviderModel[] = [];
  testingchcResponse: UnsentTestingChcResponse;
  testingCHCNames: ChcTestingModel[]=[];
  selectedAll: any;
  chcunsentSamples: ChcUnsentSampleList[]=[];

  recordCount: number; 
  shipmentId: string;
  errorMessage: string;
  selectedBarcodes: string;
  name: string;
  sampleSelected: boolean;
  sampleShipmentDate: string;
  sampleShipmentTime: string;
  selectedChc: '';
  selectedproviderName:string ='';
  selectedtestingCHC:string = '';
  barcodeNo: string;
  shipmentFrom: number;
  chcUserId: number;
  collectionCHCId: number;
  logisticsProviderId: number;
  deliveryExecutiveName: string;
  executiveContactNo: string;
  testingCHCId: number;
  dateOfShipment: string;
  timeOfShipment: string;
  createdBy: number;
  source: string;
  testingchcname: string;
  collectionchcname: string;
  chclabtechnician: string;
  deliveryexecutive: string;
  popupform: FormGroup;
  DAY = 86400000;
  chcId: number;
  chcpicknPackdetail: any;
  dataOfPickPack: string;
  selecteddate: any;
  length = 0;

  _strSelectedBarcode: string;
  _intSelectedBarcode: number;
  _arrSelectedDate: any = [];


  shipmentDateOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y H:i',
    defaultDate: new Date(Date.now()),
    //minDate: this.dyCollectionDate,
    maxDate: new Date(Date.now()),
    enableTime: true,
  };


  constructor(
    private ChcUnsentSamplesService: ChcUnsentSamplesService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private dateService: DateService,
    private tokenService: TokenService,
    private _formBuilder: FormBuilder,
    private constantService: ConstantService
  ) { }

  ngOnInit() {

    this.recordCount = 0;
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.InitializeDateRange();
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
        //Search: '<a class="btn searchBtn" id="searchBtn"><i class="fa fa-search"></i></a>'
      }
  }
  console.log(this.ChcUnsentSamplesService.chcunsentSampleApi);
  // this.anmunsentSampleList();
  // this.ddlRiPoint(this.user.id);

  this.chcunsentSampleInitResponse = this.route.snapshot.data.chcunsentSamplesData;
  if (this.chcunsentSampleInitResponse.status === 'false') {
    this.chcunsentSamples = [];
    if (this.chcunsentSampleInitResponse.message !== null && this.chcunsentSampleInitResponse.message.code === "ENOTFOUND") {
      this.chcunsentSamplesErrorMessage = "Unable to connect to api source";
    }
    else if (this.chcunsentSampleInitResponse.message !== null || this.chcunsentSampleInitResponse.message == undefined) {
      this.chcunsentSamplesErrorMessage = this.chcunsentSampleInitResponse.message;
    }
  }
  else {

    if (this.chcunsentSampleInitResponse.unsentSamplesDetail != null && this.chcunsentSampleInitResponse.unsentSamplesDetail.length > 0) {
      this.chcunsentSamples = this.chcunsentSampleInitResponse.unsentSamplesDetail;
    }
  }

}


ddltestingChc(chcId) {
  let riPoint = this.ChcUnsentSamplesService.getTestingChc(chcId).subscribe(response => {
    this.testingchcResponse = response;
    if (this.testingchcResponse !== null && this.testingchcResponse.status === "true") {
      this.testingCHCNames = this.testingchcResponse.testingCHC;
      //this.selectedtestingCHC = "";
      if (this.testingCHCNames.length > 0) {
        this.selectedtestingCHC = this.testingCHCNames[0].id.toString();
      }
    }
    else {
      this.chcunsentSamplesErrorMessage = response.message;
    }
  },
    (err: HttpErrorResponse) => {
      this.chcunsentSamplesErrorMessage = err.toString();

    });
}

ddlProviderName() {
  let riPoint = this.ChcUnsentSamplesService.getProviderName().subscribe(response => {
    this.providernameResponse = response;
    if (this.providernameResponse !== null && this.providernameResponse.status === "true") {
      this.providerNames = this.providernameResponse.logisticsProvider;
      //this.selectedproviderName = "";
      if (this.providerNames.length > 0) {
        this.selectedproviderName = this.providerNames[0].id.toString();
      }
    }
    else {
      this.chcunsentSamplesErrorMessage = response.message;
    }
  },
    (err: HttpErrorResponse) => {
      this.chcunsentSamplesErrorMessage = err.toString();
    });
}

chcunsentSampleList() {
  this.recordCount = 0;
  this.chcunsentSamples = [];
  this.chcunsentSamplesRequest = {userId: this.user.id, collectionFrom: this.user.sampleCollectionFrom, notification: 2 }
  let getchcunsent = this.ChcUnsentSamplesService.getchcUnsentSamples(this.chcunsentSamplesRequest)
    .subscribe(response => {
      this.chcunsentSamplesResponse = response;
      if (this.chcunsentSamplesResponse !== null && this.chcunsentSamplesResponse.status === "true") {
        if (this.chcunsentSamplesResponse.unsentSamplesDetail.length <= 0) {
          this.chcunsentSamplesErrorMessage = response.message;
        }
        else {
          this.chcunsentSamples = this.chcunsentSamplesResponse.unsentSamplesDetail;
          this.chcunsentSamples.forEach(element => {
            element.sampleSelected = true;
          });
          this.recordCount = this.chcunsentSamples.length;

        }
      }
      else {
        this.chcunsentSamplesErrorMessage = response.message;
      }
      this.onLoadSubject.emit(this.recordCount);
      this.rerender();
    },
      (err: HttpErrorResponse) => {
        this.chcunsentSamplesErrorMessage = err.toString();
      });

}

// openchcunsentSamples(chcunsentSamplesDetail) {
    
//   this.chcunsentSamplesErrorMessage = '';
//   this.ddlProviderName();
//   this.ddltestingChc(this.user.chcId); 
//   this.fetchBarcode();
//   this.fetchMaxDate();

//   if (this.chcunsentSamples === null || this.chcunsentSamples.length <= 0) {
//     this.showResponseMessage(`Sample collection does not exist to pick and pack`, 'e');
//     return false;
//   }

//   if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
//     this.showResponseMessage(`${this.constantService.SelectOneSample}`, 'e');
//     return false;
//   }
  
//   // if (chcpicknPackdetail.sampleAging > 31 || chcpicknPackdetail.sampleAging === undefined) {
//   //   this.showResponseMessage(`Aging of selected sample is more than 24 hrs. Please move it to expiry`, 'e');
//   //   return false;
//   // }
 
//   this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");
//   this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
//   this.sampleShipmentDate = moment().format("DD/MM/YYYY");
//   this.sampleShipmentTime = moment().format("HH:mm");

//   //this.shipmentDateOptions.minDate = new Date(moment().add(-1,'day').format());

//   this.chclabtechnician = this.user.name;
//   this.testingchcname = this.user.chcName;
//   this.collectionchcname = this.user.chcName;
  
//   this.modalService.open(
//     chcunsentSamplesDetail, {
//     centered: true,
//     size: 'xl',
//     scrollable: true,
//     ariaLabelledBy: 'modal-basic-title'
//   });
// }


onSubmit(chcShipmentForm: NgForm) {
  this.chcunsentSamplesErrorMessage = '';
  //this.fetchBarcode();
  //var shipmentId = "123";
  console.log(chcShipmentForm.value);

  if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
    this.showResponseMessage(this.constantService.SelectOneSample, 'e');
    return false;
  }

  this.logisticsProviderId =  chcShipmentForm.value.DDLserviceproviderName;
  this.executiveContactNo = chcShipmentForm.value.contactNo;
  this.deliveryExecutiveName = chcShipmentForm.value.deliveryexecutivename;

  this.AddchcunsentSamplesRequest = {
    barcodeNo: this.selectedBarcodes,
    shipmentFrom: this.user.shipmentFrom,
    chcUserId: this.user.id,
    collectionCHCId: this.user.chcId,
    logisticsProviderId: +(this.logisticsProviderId),
    deliveryExecutiveName: this.deliveryexecutive,
    executiveContactNo: this.executiveContactNo,
    testingCHCId: this.user.chcId,
    dateOfShipment: this.sampleShipmentDate,
    timeOfShipment: this.sampleShipmentTime,
    createdBy: this.user.id,
    source: 'N',
  }
  //return false;
  let addshipment = this.ChcUnsentSamplesService.AddUnsentSamples(this.AddchcunsentSamplesRequest)
    .subscribe(response => {
      this.AddchcunsentSamplesResponse = response;
      if (this.AddchcunsentSamplesResponse !== null && this.AddchcunsentSamplesResponse.status === "true") {
        this.showResponseMessage(this.AddchcunsentSamplesResponse.shipment.shipmentId, 's');
        //this.chcunsentSampleList();
      } else {
        this.showResponseMessage(this.AddchcunsentSamplesResponse.shipment.errorMessage, 'e');
        this.chcunsentSamplesErrorMessage = response.message;
      }

    },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.chcunsentSamplesErrorMessage = err.toString();
      });

}

showResponseMessage(shipmentId: string, type: string) {
  var messageType = '';
  var title = `Shipment Id is ${shipmentId}`;
  if (type === 'e') {
    Swal.fire({ icon: 'error', title: shipmentId, confirmButtonText: 'Close' })
  }
  else {
    Swal.fire({
      icon: 'success', title: title,
      showCancelButton: true, confirmButtonText: 'Shipment Log', cancelButtonText: 'Close'
    })
      .then((result) => {
        if (result.value) {
          this.modalService.dismissAll();
          //this.router.navigate(['/app/anm-viewshipment',{'q':shipmentId}]);
          this.router.navigateByUrl(`/app/chc-viewshipment?q=${shipmentId}`);

        }
        else {
          this.modalService.dismissAll();
        }
      });
  }
}

getSelectedBarcode(agingMode) {
  //gt24bc
  //lt24bc
  //allbc
      this._arrSelectedDate = [];
      var _arrSelectedBarcode = [];
      this.chcunsentSamples.forEach(element => {
        if (element.sampleSelected) {
          if(agingMode === 'gt24bc' && +element.sampleAging >= 24){
            _arrSelectedBarcode.push(element.barcodeNo);
            //this._arrSelectedDate.push(element.sampleDateTime);
          }
          else if(agingMode === 'lt24bc' && +element.sampleAging < 24){
            _arrSelectedBarcode.push(element.barcodeNo);
           // this._arrSelectedDate.push(element.sampleDateTime);
          }
          else if(agingMode === 'allbc'){
            _arrSelectedBarcode.push(element.barcodeNo);
            //this._arrSelectedDate.push(element.sampleDateTime);
          }
        }
      });
      this._intSelectedBarcode = _arrSelectedBarcode.length;
      return _arrSelectedBarcode.join(',');
}

getUnsentExpirySamplesConfirmation() {
  this.selectedBarcodes = '';

  var hasAnySelected = this.chcunsentSamples.filter(x => x.sampleSelected === true);
  if(hasAnySelected.length <= 0){
    this.showResponseMessage(`${this.constantService.SelectOneSample}`, 'e');
    return false;
  }

  var hasLessThan24 = this.chcunsentSamples.filter(x => x.sampleSelected === true && +(x.sampleAging) < 24);
  if(hasLessThan24.length > 0){
    Swal.fire({
      title: 'One or more selected samples that are aging less than 24 hours',
      text: "Do you still want to continue?",
      icon: 'warning',
      showCancelButton: true,         
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        var isFirst = true;
        this.selectedBarcodes = this._strSelectedBarcode = this.getSelectedBarcode('allbc');
        this.chcpickpackMoveExpirySamples();
      }
      else {

        this.selectedBarcodes = this._strSelectedBarcode = this.getSelectedBarcode('gt24bc');
        if(this.selectedBarcodes === '') return false;
        this.chcpickpackMoveExpirySamples();
      }
    })      
  }
  else{
    var _arrSelectedBarcode = []; 
    this.chcunsentSamples.forEach(element => {
      if(element.sampleSelected){
        _arrSelectedBarcode.push(element.barcodeNo);
      }
    });
    this.selectedBarcodes = this._strSelectedBarcode = this.getSelectedBarcode('gt24bc');
    this.chcpickpackMoveExpirySamples();     
  }  
  
}

getUnsentCreateShipmentConfirmation(chcunsentSamplesDetail) {
  this.selectedBarcodes = '';

  var hasAnySelected = this.chcunsentSamples.filter(x => x.sampleSelected === true);
  if(hasAnySelected.length <= 0){
    this.showResponseMessage(`${this.constantService.SelectOneSample}`, 'e');
    return false;
  }

  var hasGreaterThan24 = this.chcunsentSamples.filter(x => x.sampleSelected === true && +(x.sampleAging) >= 24);
  if(hasGreaterThan24.length > 0){
    Swal.fire({
      title: 'One or more selected samples that are aging more than 24 hours',
      text: "Do you still want to continue?",
      icon: 'warning',
      showCancelButton: true,         
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        var isFirst = true;
        this.selectedBarcodes = this._strSelectedBarcode = this.getSelectedBarcode('allbc');
        //var getdates = this._arrSelectedDate;
        if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
          //this.showResponseMessage(`Oops! No barcode have been selected aging less then 24 hours for create shipment`, 'e');
          return false;
        }
        this.fetchMaxDateAllbc();
    
        this.chcunsentSamplesErrorMessage = '';
        this.ddlProviderName();
        this.ddltestingChc(this.user.chcId);

        this.sampleShipmentDate = moment().format("DD/MM/YYYY");
        this.sampleShipmentTime = moment().format("HH:mm");
        this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
        this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

        this.name = this.user.name;
        this.modalService.open(
          chcunsentSamplesDetail, {
          centered: true,
          size: 'xl',
          scrollable: true,
          ariaLabelledBy: 'modal-basic-title'
        });
      }
      else {

        this.selectedBarcodes = this._strSelectedBarcode = this.getSelectedBarcode('lt24bc');
        //var getdates = this._arrSelectedDate;
        if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
          //this.showResponseMessage(`Oops! No barcode have been selected aging less then 24 hours for create shipment`, 'e');
          return false;
        }
        this.fetchMaxDatelt24();
        
        this.chcunsentSamplesErrorMessage = '';
        this.ddlProviderName();
        this.ddltestingChc(this.user.chcId);
        
        this.sampleShipmentDate = moment().format("DD/MM/YYYY");
        this.sampleShipmentTime = moment().format("HH:mm");
        this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
        this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

        this.name = this.user.name;
        this.modalService.open(
          chcunsentSamplesDetail, {
          centered: true,
          size: 'xl',
          scrollable: true,
          ariaLabelledBy: 'modal-basic-title'
        });
      }
    })      
  }
  else{
    var _arrSelectedBarcode = []; 
    this.chcunsentSamples.forEach(element => {
      if(element.sampleSelected){
        _arrSelectedBarcode.push(element.barcodeNo);
      }
    });
    this.selectedBarcodes =  this._strSelectedBarcode = this.getSelectedBarcode('lt24bc');
    if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
      //this.showResponseMessage(`Oops! No barcode have been selected aging less then 24 hours for create shipment`, 'e');
      return false;
    }
    this.fetchMaxDatelt24(); 
    this.chcunsentSamplesErrorMessage = '';
    this.ddlProviderName();
    this.ddltestingChc(this.user.chcId);

    this.sampleShipmentDate = moment().format("DD/MM/YYYY");
    this.sampleShipmentTime = moment().format("HH:mm");
    this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
    this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

    this.name = this.user.name;

    this.modalService.open(
      chcunsentSamplesDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      ariaLabelledBy: 'modal-basic-title'
    });      
  }
  
}

// unsentgetconfirmation() {
//   this.chcunsentSamplesErrorMessage = '';
//   this.expirysamplesBarcode();
//   if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
//     this.expirySampleResponseMessage(`Please select the aging of sample is more than 24 hrs to move to expiry`, 'e');
//     return false;
//   }
//   if (this.selectedBarcodes !== null) {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this back!",
//       icon: 'warning',
//       showCancelButton: true,
//       // confirmButtonColor: '#3085d6',
//       // cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, Move it!',
//       cancelButtonText: 'Cancel'
//     }).then((result) => {
//       if (result.value) {
//         this.chcpickpackMoveExpirySamples();
//       }
//     })
//   }

// }


chcpickpackMoveExpirySamples() {

  this.chcunsentSamplesErrorMessage = '';
  if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
    this.expirySampleResponseMessage(`${this.constantService.SelectOneSample}`, 'e');
    return false;
  }
  
  this.movetimeoutexpiryRequest = {
    userId: this.user.id,
    barcodeNo: this.selectedBarcodes,
  }
  // Swal.fire({icon: 'success', title: "successfull",
  // confirmButtonText: 'Ok'})
  // return false;
  let expirysamples = this.ChcUnsentSamplesService.chcunsentMoveExpirySamples(this.movetimeoutexpiryRequest)
    .subscribe(response => {
      this.movetimeoutexpiryResponse = response;
      if (this.movetimeoutexpiryResponse !== null && this.movetimeoutexpiryResponse.status === "true") {
        this.expirySampleResponseMessage(this.movetimeoutexpiryResponse.message, 's');
        this.chcunsentSampleList();
      }
      else {
        this.expirySampleResponseMessage(this.movetimeoutexpiryResponse.message, 'e');
        this.chcunsentSamplesErrorMessage = response.message;
      }

    },
      (err: HttpErrorResponse) => {
        this.expirySampleResponseMessage(err.toString(), 'e');
        this.chcunsentSamplesErrorMessage = err.toString();
      });
}

expirySampleResponseMessage(message: string, type: string) {
  var messageType = '';
  if (type === 'e') {
    Swal.fire({ icon: 'error', title: message, confirmButtonText: 'Close' })
  }
  else {
    Swal.fire({ icon: 'success', title: message, confirmButtonText: 'Close' })
  }
}

ngDoCheck() {

  let count = this.chcunsentSamples.filter(ite => ite.sampleSelected).length
  if (count != this.length) {
    this.length = count
  }

}

selectAll() {
  for (var i = 0; i < this.chcunsentSamples.length; i++) {
    this.chcunsentSamples[i].sampleSelected = this.selectedAll;
    console.log(this.chcunsentSamples);
  }
}

checkIfAllSelected() {
  console.log(this.chcunsentSamples);
  this.selectedAll = this.chcunsentSamples.every(function (item: any) {
    return item.sampleSelected == true;

  })
}


fetchMaxDategt24() {

  this.selecteddate = '';
  var isFirst = true;
  var getdates;

  this.chcunsentSamples.forEach(element => {
    console.log('sampleSelected :' + element.sampleSelected);
    if (element.sampleSelected === true && +element.sampleAging >= 24) {
      
      if (isFirst) {
        getdates = [{ "selecteddate": this.convertToDateFormat(element.sampleDateTime) }];
        isFirst = false;
      }
      else {
        //logdate  += [',' + element.sampleDateTime];
        getdates.push({ "selecteddate": this.convertToDateFormat(element.sampleDateTime) });
      }
    }
  });

  if (getdates <= 0) {
    this.showResponseMessage(this.constantService.SelectOneSample, 'e');
    return false;
  }

  var comparedate;
  comparedate = getdates.reduce(function (r, a) {
    return r.selecteddate > a.selecteddate ? r : a;
  });
  // var maximumdate = Object.values(comparedate);
  // console.log(maximumdate);
  // var pattern = /(\d{2})\/(\d{2})\/(\d{4})\ (\d{2})\:(\d{2})/;
  // var maxDate = new Date(maximumdate.toString().replace(pattern, '$3/$2/$1 $4:$5'));
  // console.log(maxDate);
  this.shipmentDateOptions.minDate = comparedate.selecteddate;
  

}
fetchMaxDateAllbc() {

  this.selecteddate = '';
  var isFirst = true;
  var getdates;

  this.chcunsentSamples.forEach(element => {
    console.log('sampleSelected :' + element.sampleSelected);
    if (element.sampleSelected === true) {
      if (isFirst) {
        getdates = [{ "selecteddate": this.convertToDateFormat(element.sampleDateTime) }];
        isFirst = false;
      }
      else {
        //logdate  += [',' + element.sampleDateTime];
        getdates.push({ "selecteddate": this.convertToDateFormat(element.sampleDateTime) });
      }
    }
  });

  if (getdates <= 0) {
    this.showResponseMessage(this.constantService.SelectOneSample, 'e');
    return false;
  }

  var comparedate;
  comparedate = getdates.reduce(function (r, a) {
    return r.selecteddate > a.selecteddate ? r : a;
  });
  
  this.shipmentDateOptions.minDate = comparedate.selecteddate;

}
fetchMaxDatelt24() {

  this.selecteddate = '';
  var isFirst = true;
  var getdates;

  this.chcunsentSamples.forEach(element => {
    console.log('sampleSelected :' + element.sampleSelected);
    if (element.sampleSelected === true && +(element.sampleAging) < 24) {
      if (isFirst) {
        getdates = [{ "selecteddate": this.convertToDateFormat(element.sampleDateTime) }];
        isFirst = false;
      }
      else {
        //logdate  += [',' + element.sampleDateTime];
        getdates.push({ "selecteddate": this.convertToDateFormat(element.sampleDateTime) });
      }
    }
  });

  if (getdates <= 0) {
    this.showResponseMessage(this.constantService.SelectOneSample, 'e');
    return false;
  }

  var comparedate;
  comparedate = getdates.reduce(function (r, a) {
    return r.selecteddate > a.selecteddate ? r : a;
  });
  
  this.shipmentDateOptions.minDate = comparedate.selecteddate;

}

convertToDateFormat(strDate){

  var pattern = /(\d{2})\/(\d{2})\/(\d{4})\ (\d{2})\:(\d{2})/;
  var dateFormat = new Date(strDate.toString().replace(pattern, '$3/$2/$1 $4:$5'));
  console.log(dateFormat);
  return dateFormat;

}

expirysamplesBarcode() {
  this.selectedBarcodes = '';
  var isFirst = true;
  this.chcunsentSamples.forEach(element => {
    console.log('sampleSelected :' + element.sampleSelected);
    if (element.sampleSelected === true && +element.sampleAging > 24) {
      //if (element.sampleSelected) {
      if (isFirst) {
        this.selectedBarcodes += element.barcodeNo;
        isFirst = false;
      }
      else {
        this.selectedBarcodes += ',' + element.barcodeNo;
      }
    }
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

ngAfterViewInit(): void {
  this.dtTrigger.next();
}

ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();
}


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

}
