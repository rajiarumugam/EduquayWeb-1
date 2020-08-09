import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, OnChanges } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { ChcPicknpackRequest, AddChcShipmentRequest, chcMoveTimeoutExpiryRequest } from 'src/app/shared/chc-module/chc-pickandpack/chc-picknpack-request';
import { ChcPicknpackResponse, ChcSampleList, ChcResponse, ChcModel, ProviderNameResponse, logisticsProviderModel, AddChcShipmentResponse, chcMoveTimeoutExpiryResponse, TestingChcResponse, ChcTestingModel } from 'src/app/shared/chc-module/chc-pickandpack/chc-picknpack-response';
import { ChcPicknpackService } from 'src/app/shared/chc-module/chc-pickandpack/chc-picknpack.service';
import { user } from 'src/app/shared/auth-response';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { ConstantService } from 'src/app/shared/constant.service';

@Component({
  selector: 'app-chc-picknpack',
  templateUrl: './chc-picknpack.component.html',
  styleUrls: ['./chc-picknpack.component.css']
})
export class ChcPicknpackComponent implements AfterViewInit, OnDestroy, OnInit {

  chcPicknpackErrorMessage: string;
  chcpicknpackInitResponse: any;
  chcpicknpackRequest: ChcPicknpackRequest;
  chcpicknpackResponse: ChcPicknpackResponse;
  chcSampleList: ChcSampleList[] = [];
  collectionChcResponse: ChcResponse;
  collectionchc: ChcModel[] = [];
  providernameResponse: ProviderNameResponse;
  providerNames: logisticsProviderModel[] = [];
  addchcshipmentRequest: AddChcShipmentRequest;
  addchcshipmentResponse: AddChcShipmentResponse;
  chcmovetimeoutExpiryRequest: chcMoveTimeoutExpiryRequest;
  chcmovetimeoutExpiryResponse: chcMoveTimeoutExpiryResponse;
  testingchcResponse: TestingChcResponse;
  testingCHCNames: ChcTestingModel[]=[];
  selectedAll: any;
  
  
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('shipmentDatePicker', { static: false }) shipmentDatePicker;
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  user: user;

  shipmentId: string;
  errorMessage: string;
  selectedBarcodes: string;
  name: string;
  sampleSelected: boolean;
  sampleShipmentDate: string;
  sampleShipmentTime: string;
  selectedChc: '';
  selectedproviderName:string ='';
  selectedtestingCHC:string= '';
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
  length = 0;
  selecteddate: any;

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
    private ChcpicknpackService: ChcPicknpackService,
    private modalService: NgbModal,
    //private dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private _formBuilder: FormBuilder,
    private constantService: ConstantService
  ) {}

  ngOnInit() {
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

    console.log(this.ChcpicknpackService.chcpickandpackListApi);
    // this.ddlChc(this.user.id);
    // this.ddlProviderName();
    //this.anmpicknpackList();

    this.chcpicknpackInitResponse = this.route.snapshot.data.chcpicknpackData;
    if (this.chcpicknpackInitResponse.status === 'false') {
      this.chcSampleList = [];
      if (this.chcpicknpackInitResponse.message !== null && this.chcpicknpackInitResponse.message.code === "ENOTFOUND") {
        this.chcPicknpackErrorMessage = "Unable to connect to api source";
      }
      else if (this.chcpicknpackInitResponse.message !== null || this.chcpicknpackInitResponse.message == undefined) {
        this.chcPicknpackErrorMessage = this.chcpicknpackInitResponse.message;
      }
    }
    else {

      if (this.chcpicknpackInitResponse.sampleList != null && this.chcpicknpackInitResponse.sampleList.length > 0) {
        this.chcSampleList = this.chcpicknpackInitResponse.sampleList;
      }
    }
  }

  ddltestingChc(chcId) {
    let riPoint = this.ChcpicknpackService.getTestingChc(chcId).subscribe(response => {
      this.testingchcResponse = response;
      if (this.testingchcResponse !== null && this.testingchcResponse.status === "true") {
        this.testingCHCNames = this.testingchcResponse.testingCHC;
        //this.selectedtestingCHC = "";
        if (this.testingCHCNames.length > 0) {
          this.selectedtestingCHC = this.testingCHCNames[0].id.toString();
        }
      }
      else {
        this.chcPicknpackErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.chcPicknpackErrorMessage = err.toString();

      });
  }

  ddlProviderName() {
    let riPoint = this.ChcpicknpackService.getProviderName().subscribe(response => {
      this.providernameResponse = response;
      if (this.providernameResponse !== null && this.providernameResponse.status === "true") {
        this.providerNames = this.providernameResponse.logisticsProvider;
        if (this.providerNames.length > 0) {
          this.selectedproviderName = this.providerNames[0].id.toString();
        }
        //this.selectedproviderName = "";
      }
      else {
        this.chcPicknpackErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.chcPicknpackErrorMessage = err.toString();
      });
  }


  chcpicknpackList() {
    this.chcSampleList = [];
    this.chcpicknpackRequest = { userId: this.user.id, collectionFrom: this.user.sampleCollectionFrom };
    let picknpack = this.ChcpicknpackService.getchcpickandpackList(this.chcpicknpackRequest)
      .subscribe(response => {
        this.chcpicknpackResponse = response;
        if (this.chcpicknpackResponse !== null && this.chcpicknpackResponse.status === "true") {
          if (this.chcpicknpackResponse.sampleList.length <= 0) {
            this.chcPicknpackErrorMessage = response.message;
          }
          else {
            this.chcSampleList = this.chcpicknpackResponse.sampleList;
            this.chcSampleList.forEach(element => {
              element.sampleSelected = true;
            });
            this.rerender();
          }
        }
        else {
          this.chcPicknpackErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.chcPicknpackErrorMessage = err.toString();
        });

  }


  // openchcPicknpack(chcpicknPackdetail) {
    
  //   this.chcPicknpackErrorMessage = '';
  //   this.ddlProviderName();
  //   this.ddltestingChc(this.user.chcId); 
  //   this.fetchBarcode();
  //   this.fetchMaxDate();

  //   if (this.chcSampleList === null || this.chcSampleList.length <= 0) {
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
  //   this.sampleShipmentDate = moment().format("DD/MM/YYYY");
  //   this.sampleShipmentTime = moment().format("HH:mm");
  //   this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");
  //   this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
  
  //   //this.shipmentDateOptions.minDate = new Date(moment().add(-1,'day').format());

  //   this.chclabtechnician = this.user.name;
  //   this.testingchcname = this.user.chcName;
  //   this.collectionchcname = this.user.chcName;
    
  //   this.modalService.open(
  //     chcpicknPackdetail, {
  //     centered: true,
  //     size: 'xl',
  //     scrollable: true,
  //     ariaLabelledBy: 'modal-basic-title'
  //   });
  // }


  onSubmit(chcShipmentForm: NgForm) {
    this.chcPicknpackErrorMessage = '';
    // this.fetchBarcode();
    //var shipmentId = "123";
    console.log(chcShipmentForm.value);

    if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
      this.showResponseMessage(this.constantService.SelectOneSample, 'e');
      return false;
    }

    this.logisticsProviderId =  chcShipmentForm.value.DDLserviceproviderName;
    this.executiveContactNo = chcShipmentForm.value.contactNo;
    this.deliveryExecutiveName = chcShipmentForm.value.deliveryexecutivename;

    this.addchcshipmentRequest = {
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
    let addshipment = this.ChcpicknpackService.chcAddShipment(this.addchcshipmentRequest)
      .subscribe(response => {
        this.addchcshipmentResponse = response;
        if (this.addchcshipmentResponse !== null && this.addchcshipmentResponse.status === "true") {
          this.showResponseMessage(this.addchcshipmentResponse.shipment.shipmentId, 's');
          this.chcpicknpackList();
        } else {
          this.showResponseMessage(this.addchcshipmentResponse.shipment.errorMessage, 'e');
          this.chcPicknpackErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.showResponseMessage(err.toString(), 'e');
          this.chcPicknpackErrorMessage = err.toString();
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

  // chcgetconfirmation() {
  //   this.chcPicknpackErrorMessage = '';
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

  getSelectedBarcode(agingMode) {
    //gt24bc
    //lt24bc
    //allbc
        this._arrSelectedDate = [];
        var _arrSelectedBarcode = [];
        this.chcSampleList.forEach(element => {
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
  getChcCreateShipmentConfirmation(chcpicknPackdetail) {
    this.selectedBarcodes = '';

    var hasAnySelected = this.chcSampleList.filter(x => x.sampleSelected === true);
    if(hasAnySelected.length <= 0){
      this.showResponseMessage(`${this.constantService.SelectOneSample}`, 'e');
      return false;
    }

    var hasGreaterThan24 = this.chcSampleList.filter(x => x.sampleSelected === true && +(x.sampleAging) >= 24);
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
      
          this.chcPicknpackErrorMessage = '';
          this.ddlProviderName();
          this.ddltestingChc(this.user.chcId);

          this.sampleShipmentDate = moment().format("DD/MM/YYYY");
          this.sampleShipmentTime = moment().format("HH:mm");
          this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
          this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

          this.name = this.user.name;
          this.modalService.open(
            chcpicknPackdetail, {
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
          
          this.chcPicknpackErrorMessage = '';
          this.ddlProviderName();
          this.ddltestingChc(this.user.chcId);
          
          this.sampleShipmentDate = moment().format("DD/MM/YYYY");
          this.sampleShipmentTime = moment().format("HH:mm");
          this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
          this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

          this.name = this.user.name;
          this.modalService.open(
            chcpicknPackdetail, {
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
      this.chcSampleList.forEach(element => {
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
      this.chcPicknpackErrorMessage = '';
          this.ddlProviderName();
          this.ddltestingChc(this.user.chcId);
          
          this.sampleShipmentDate = moment().format("DD/MM/YYYY");
          this.sampleShipmentTime = moment().format("HH:mm");
          this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
          this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

          this.name = this.user.name;
      
      this.modalService.open(
        chcpicknPackdetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        ariaLabelledBy: 'modal-basic-title'
      });      
    }
    
  }


  fetchBarcodes() {
    this.selectedBarcodes = '';
    var isFirst = true;
    this.chcSampleList.forEach(element => {
      console.log('sampleSelected :' + element.sampleSelected);
      if (element.sampleSelected === true && +element.sampleAging < 24) {
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
  getChcExpirySamplesConfirmation() {
    this.selectedBarcodes = '';

    var hasAnySelected = this.chcSampleList.filter(x => x.sampleSelected === true);
    if(hasAnySelected.length <= 0){
      this.showResponseMessage(`${this.constantService.SelectOneSample}`, 'e');
      return false;
    }

    var hasLessThan24 = this.chcSampleList.filter(x => x.sampleSelected === true && +(x.sampleAging) < 24);
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
          if(this.selectedBarcodes === '') return;
          this.chcpickpackMoveExpirySamples();
        }
        else {

          this.selectedBarcodes = this._strSelectedBarcode = this.getSelectedBarcode('gt24bc');
          if(this.selectedBarcodes === '') return;
          this.chcpickpackMoveExpirySamples();
        }
      })      
    }
    else{
      var _arrSelectedBarcode = []; 
      this.chcSampleList.forEach(element => {
        if(element.sampleSelected){
          _arrSelectedBarcode.push(element.barcodeNo);
        }
      });
      this.selectedBarcodes = this._strSelectedBarcode = this.getSelectedBarcode('gt24bc');
      this.chcpickpackMoveExpirySamples();     
    }  
    
  }

  fetchExpirySamplesBarcode() {
    this.selectedBarcodes = '';
    var isFirst = true;
    this.chcSampleList.forEach(element => {
      console.log('sampleSelected :' + element.sampleSelected);
      if (element.sampleSelected === true && +element.sampleAging >= 24) {
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

 


  chcpickpackMoveExpirySamples() {

    this.chcPicknpackErrorMessage = '';
    if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
      this.expirySampleResponseMessage(`${this.constantService.SelectOneSample}`, 'e');
      return false;
    }
    
    this.chcmovetimeoutExpiryRequest = {
      userId: this.user.id,
      barcodeNo: this.selectedBarcodes,
    }
    // Swal.fire({icon: 'success', title: "successfull",
    //  confirmButtonText: 'Ok'})
    // return false;
   // return false;
    let expirysamples = this.ChcpicknpackService.chcMoveExpirySamples(this.chcmovetimeoutExpiryRequest)
      .subscribe(response => {
        this.chcmovetimeoutExpiryResponse = response;
        if (this.chcmovetimeoutExpiryResponse !== null && this.chcmovetimeoutExpiryResponse.status === "true") {
          this.expirySampleResponseMessage(this.chcmovetimeoutExpiryResponse.message, 's');
          this.chcpicknpackList();
        }
        else {
          this.expirySampleResponseMessage(this.chcmovetimeoutExpiryResponse.message, 'e');
          this.chcPicknpackErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.expirySampleResponseMessage(err.toString(), 'e');
          this.chcPicknpackErrorMessage = err.toString();
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

  fetchMaxDategt24() {

    this.selecteddate = '';
    var isFirst = true;
    var getdates;
  
    this.chcSampleList.forEach(element => {
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
  
    this.chcSampleList.forEach(element => {
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
      this.showResponseMessage(`${this.constantService.SelectOneSample}`, 'e');
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
  
    this.chcSampleList.forEach(element => {
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
      this.showResponseMessage(`${this.constantService.SelectOneSample}`, 'e');
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

  selectAll() {
    for (var i = 0; i < this.chcSampleList.length; i++) {
      this.chcSampleList[i].sampleSelected = this.selectedAll;
      console.log(this.chcSampleList);
    }
  }

  checkIfAllSelected() {
    console.log(this.chcSampleList);
    this.selectedAll = this.chcSampleList.every(function (item: any) {
      return item.sampleSelected == true;

    })
  }

  ngDoCheck() {

    let count = this.chcSampleList.filter(ite => ite.sampleSelected).length
    if (count != this.length) {
      this.length = count
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
