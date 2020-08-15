import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/shared/utility/date.service';
import { UnsentSampleList, RIModel, IlrModel, TestingChcModel, AvdNameModel, UnsentSamplesResponse, AddUnsentSampleResponse, RiPointResponse, ILRpointResponse, TestingCHCResponse, AvdNameResponse, MoveTimeoutExpiryResponse } from 'src/app/shared/anm-module/notifications/unsent-samples/unsent-samples-response';
import { AddUnsentSampleRequest, MoveTimeoutExpiryRequest } from 'src/app/shared/anm-module/notifications/unsent-samples/unsent-samples-request';
import { UnsentSamplesServiceService } from 'src/app/shared/anm-module/notifications/unsent-samples/unsent-samples-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { user } from 'src/app/shared/auth-response';
import { TokenService } from 'src/app/shared/token.service';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { ConstantService } from 'src/app/shared/constant.service';

@Component({
  selector: 'app-anm-unsent-samples',
  templateUrl: './anm-unsent-samples.component.html',
  styleUrls: ['./anm-unsent-samples.component.css']
})
export class AnmUnsentSamplesComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();

  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  user: user;

  unsentSamplesErrorMessage: string;
  //unsentSamplesRequest: UnsentSamplesRequest;
  unsentSamplesResponse: UnsentSamplesResponse;
  addUnsentSamplesRequest: AddUnsentSampleRequest;
  addUnsentSamplesResponse: AddUnsentSampleResponse;
  riPointResponse: RiPointResponse;
  ilrpointResponse: ILRpointResponse;
  testingCHCResponse: TestingCHCResponse;
  avdNameResponse: AvdNameResponse;
  movetimeoutExpiryRequest: MoveTimeoutExpiryRequest;
  movetimeoutExpiryResponse: MoveTimeoutExpiryResponse;
  unsentSampleInitResponse: any;

  recordCount: number;
  unsentSamples: UnsentSampleList[] = [];
  riPoints: RIModel[] = [];
  selectedriPoint: '';
  ilrPoints: IlrModel[] = [];
  selectedilrPoint: string = '';
  testingCHCNames: TestingChcModel[] = [];
  selectedtestingCHC: string = '';
  AvdNames: AvdNameModel;
  selectedAvdName: string = '';
  selectedAvdContact: string = '';
  barcodeNo: string;
  shipmentFrom: number;
  source: string;
  anmId: number;
  riId: number;
  ilrId: number;
  avdId: number;
  avdContactNo: string;
  testingCHCId: number;
  dateOfShipment: string;
  timeOfShipment: string;
  createdBy: number;
  //AddShipment: ShipmentId[] = [];
  shipmentId: string;
  errorMessage: string;
  selectedBarcodes: string;
  name: string;
  sampleSelected: boolean;
  selectedAll: any;
  userId: number;
  sampleAging: string;
  sampleDateTime: string;
  sampleShipmentDate: string;
  sampleShipmentTime: string;
  popupform: FormGroup;
  DAY = 86400000;
  selecteddate: any;
  length = 0;
  avdName: string;
  contactNo: string;
  alternateAVD: string;
  alternateAVDContactNo: string;
  

  hasAlternateContactNumber = true;
  hasAlternateAvdName = true;

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

  // shipmentTimeOptions: FlatpickrOptions = {
  //   mode: 'single',
  //   enableTime: true,
  //   noCalendar: true,
  //   dateFormat: "H:i",    
  //   defaultDate: new Date(Date.now()),
  //   maxDate: new Date(Date.now())
  // };


  constructor(
    private UnsentSamplesServiceService: UnsentSamplesServiceService,
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
    };

    // this.dateOfShipment = this.dateService.getDate();
    // this.timeOfShipment = this.dateService.getTime();
    console.log(this.UnsentSamplesServiceService.unsentSampleApi);
    //this.anmunsentSampleList();
    this.ddlRiPoint(this.user.id);

    this.unsentSampleInitResponse = this.route.snapshot.data.unsentSamplesData;
    if (this.unsentSampleInitResponse.status === 'false') {
      this.unsentSamples = [];
      if (this.unsentSampleInitResponse.message !== null && this.unsentSampleInitResponse.message.code === "ENOTFOUND") {
        this.unsentSamplesErrorMessage = "Unable to connect to api source";
      }
      else if (this.unsentSampleInitResponse.message !== null || this.unsentSampleInitResponse.message == undefined) {
        this.unsentSamplesErrorMessage = this.unsentSampleInitResponse.message;
      }
    }
    else {

      if (this.unsentSampleInitResponse.unsentSamplesDetail != null && this.unsentSampleInitResponse.unsentSamplesDetail.length > 0) {
        this.unsentSamples = this.unsentSampleInitResponse.unsentSamplesDetail;
      }
    }

  }

  ddlRiPoint(userId) {
    let riPoint = this.UnsentSamplesServiceService.getRiPoint(userId).subscribe(response => {
      this.riPointResponse = response;
      if (this.riPointResponse !== null && this.riPointResponse.status === "true") {
        this.riPoints = this.riPointResponse.ri;
        this.selectedriPoint = "";
      }
      else {
        this.unsentSamplesErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.unsentSamplesErrorMessage = err.toString();

      });
  }
  onChangeriPoint() {
    if(this.selectedriPoint === ''){
      this.selectedilrPoint = '';
      this.selectedtestingCHC = '';
      this.selectedAvdName = '';
      this.selectedAvdContact = '';
    }
    else{
      this.getILRPoints(this.selectedriPoint);
      this.getTestingCHC(this.selectedriPoint);
      this.getAVDName(this.selectedriPoint);
    }

  }

  anmunsentSampleList(userId) {
    this.recordCount = 0;
    this.unsentSamples = [];
    this.UnsentSamplesServiceService.getunsentSampleList(userId)
      .subscribe(response => {
        this.unsentSamplesResponse = response;
        if (this.unsentSamplesResponse !== null && this.unsentSamplesResponse.status === "true") {
          if (this.unsentSamplesResponse.unsentSamplesDetail.length <= 0) {
            this.unsentSamplesErrorMessage = response.message;
          }
          else {
            this.unsentSamples = this.unsentSamplesResponse.unsentSamplesDetail;
            // this.unsentSamples.forEach(element => {
            //   element.sampleSelected = true;
            // });
            this.recordCount = this.unsentSamples.length;

          }
        }
        else {
          this.unsentSamplesErrorMessage = response.message;
        }
        this.onLoadSubject.emit(this.recordCount);
        this.rerender();
      },
        (err: HttpErrorResponse) => {
          this.unsentSamplesErrorMessage = err.toString();
        });

  }

  // openunsentSamples(unsentSamplesDetail) {

  //   this.unsentSamplesErrorMessage = '';
  //   this.fetchBarcode();
  //   this.fetchMaxDate();

  //   if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
  //     this.showResponseMessage(`${this.constantService.SelectOneSample}`, 'e');
  //     return false;
  //   }

  //   if (unsentSamplesDetail.sampleAging > 24) {
  //     this.showResponseMessage(`Aging of selected sample is more than 24 hrs. Please move it to expiry`, 'e');
  //     return false;
  //   }
  //   this.sampleShipmentDate = moment().format("DD/MM/YYYY");
  //   this.sampleShipmentTime =  moment().format("HH:mm"); 
  //   this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
  //   this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

  //   this.name = this.user.name;
  //   this.modalService.open(
  //     unsentSamplesDetail, {
  //     centered: true,
  //     size: 'xl',
  //     scrollable: true,
  //     ariaLabelledBy: 'modal-basic-title'
  //   });

  // }

  getILRPoints(riPointId) {
    this.ilrPoints = [];
    this.selectedilrPoint = '';
    this.UnsentSamplesServiceService.getIlrPoint(riPointId)
      .subscribe(response => {
        this.ilrpointResponse = response;
        if (this.ilrpointResponse !== null && this.ilrpointResponse.status === "true") {
          this.ilrPoints = this.ilrpointResponse.ilr;
          if (this.ilrPoints.length > 0) {
            this.selectedilrPoint = this.ilrPoints[0].id.toString();
          }
        }
        else {
          this.unsentSamplesErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.unsentSamplesErrorMessage = err.toString();

        });

  }

  getTestingCHC(riPointId) {
    this.testingCHCNames = [];
    this.selectedtestingCHC = "";
    this.UnsentSamplesServiceService.getTestingCHC(riPointId)
      .subscribe(response => {
        this.testingCHCResponse = response;
        if (this.testingCHCResponse !== null && this.testingCHCResponse.status === "true") {
          this.testingCHCNames = this.testingCHCResponse.testingCHC;
          if (this.testingCHCNames.length > 0) {
            this.selectedtestingCHC = this.testingCHCNames[0].id.toString();
          }
        }
        else {
          this.unsentSamplesErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.unsentSamplesErrorMessage = err.toString();

        });
  }

  getAVDName(riPointId) {
    this.AvdNames = new AvdNameModel();
    this.selectedAvdName = "";
    this.UnsentSamplesServiceService.getAvdName(riPointId)
      .subscribe(response => {
        this.avdNameResponse = response;
        if (this.avdNameResponse !== null && this.avdNameResponse.status === "true") {
          this.AvdNames = this.avdNameResponse.avd;
          if (this.AvdNames !== null) {
            this.selectedAvdName = this.AvdNames.avdName;
            this.selectedAvdContact = this.avdContactNo = this.AvdNames.contactNo;
          }

        }
        else {
          this.unsentSamplesErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.unsentSamplesErrorMessage = err.toString();

        });
  }

  onSubmit(unsentsampleForm: NgForm) {
    this.unsentSamplesErrorMessage = '';
    //this.fetchBarcode();
    //var shipmentId = "123";
    this.hasAlternateContactNumber = this.hasAlternateAvdName = true;

    var hasAlternateContactNumber = unsentsampleForm.value.alternatecontactNo !== '' && unsentsampleForm.value.alternatecontactNo !== undefined;
    var hasAlternateAvdName = unsentsampleForm.value.alternatename !== '' && unsentsampleForm.value.alternatename !== undefined;
    if(hasAlternateContactNumber !== hasAlternateAvdName){
      if((unsentsampleForm.value.alternatecontactNo !== '' && unsentsampleForm.value.alternatecontactNo !== undefined) && (unsentsampleForm.value.alternatename === '' || unsentsampleForm.value.alternatename === undefined)){
        this.hasAlternateAvdName = false;
      }
      else if((unsentsampleForm.value.alternatecontactNo === '' || unsentsampleForm.value.alternatecontactNo === undefined)  && (unsentsampleForm.value.alternatename !== '' && unsentsampleForm.value.alternatename !== undefined)){
        this.hasAlternateContactNumber = false;
      }
      return false;
    }
    console.log(unsentsampleForm.value);

    //this.avdContactNo = unsentsampleForm.value.contactNo;
    this.riId = unsentsampleForm.value.DDriPoint;
    this.ilrId = unsentsampleForm.value.DDilrPoint;
    this.testingCHCId = unsentsampleForm.value.DDLtestingChc;
    this.alternateAVD = unsentsampleForm.value.alternatename;
    this.alternateAVDContactNo = unsentsampleForm.value.alternatecontactNo;

    this.addUnsentSamplesRequest = {
      anmId: this.user.id,
      riId: +(this.riId),
      ilrId: +(this.ilrId),
      avdId: +(this.AvdNames.id),
      avdContactNo: this.avdContactNo,
      testingCHCId: +(this.testingCHCId),
      dateOfShipment: this.sampleShipmentDate,
      timeOfShipment: this.sampleShipmentTime,
      alternateAVD: this.alternateAVD,
      alternateAVDContactNo: this.alternateAVDContactNo,
      barcodeNo: this.selectedBarcodes,
      shipmentFrom: this.user.shipmentFrom,
      createdBy: this.user.id,
      source: 'N',
    }
    //Remove below 2 lines after successfully tested
    // this.showResponseMessage('Successfully registered', 's');
    // return false;

    let addunsentsample = this.UnsentSamplesServiceService.AddUnsentSamples(this.addUnsentSamplesRequest)
      .subscribe(response => {
        this.addUnsentSamplesResponse = response;
        if (this.addUnsentSamplesResponse !== null && this.addUnsentSamplesResponse.status === "true") {
          this.showResponseMessage(this.addUnsentSamplesResponse.shipment.shipmentId, 's');
          this.anmunsentSampleList(this.user.id);
        } else {
          this.showResponseMessage(this.addUnsentSamplesResponse.shipment.errorMessage, 'e');
          this.unsentSamplesErrorMessage = response.message;
        }

      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.unsentSamplesErrorMessage = err.toString();
      });
  }

  // getconfirmation() {
  //   this.unsentSamplesErrorMessage = '';
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
  //         this.moveExpirySamples();
  //       }
  //     })
  //   }

  // }

  moveExpirySamples() {

    this.unsentSamplesErrorMessage = '';
    if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
      this.expirySampleResponseMessage(`${this.constantService.SelectOneSample}`, 'e');
      return false;
    }
    
    this.movetimeoutExpiryRequest = {
      anmId: this.user.id,
      barcodeNo: this.selectedBarcodes,
    }
    // Swal.fire({icon: 'success', title: "successfull",
    //  confirmButtonText: 'Ok'})
    // return false;

    let expirysamples = this.UnsentSamplesServiceService.MoveExpirySamples(this.movetimeoutExpiryRequest)
      .subscribe(response => {
        this.movetimeoutExpiryResponse = response;
        if (this.movetimeoutExpiryResponse !== null && this.movetimeoutExpiryResponse.status === "true") {
          this.expirySampleResponseMessage(this.movetimeoutExpiryResponse.message, 's');
          this.anmunsentSampleList(this.user.id);
        }
        else {
          this.expirySampleResponseMessage(this.movetimeoutExpiryResponse.message, 'e');
          this.unsentSamplesErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.expirySampleResponseMessage(err.toString(), 'e');
          this.unsentSamplesErrorMessage = err.toString();
        });
  }

  getSelectedBarcode(agingMode) {
    //gt24bc
    //lt24bc
    //allbc
        this._arrSelectedDate = [];
        var _arrSelectedBarcode = [];
        this.unsentSamples.forEach(element => {
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
  getCreateShipmentConfirmation(unsentSamplesDetail) {
    this.selectedBarcodes = '';

    var hasAnySelected = this.unsentSamples.filter(x => x.sampleSelected === true);
    if(hasAnySelected.length <= 0){
      this.showResponseMessage(`${this.constantService.SelectOneSample}`, 'e');
      //this.showResponseMessage(`Please select the aging of sample is less than 24 hrs to create shipment`, 'e');
      return false;
    }

    var hasGreaterThan24 = this.unsentSamples.filter(x => x.sampleSelected === true && +(x.sampleAging) >= 24);
    if(hasGreaterThan24.length > 0){
      Swal.fire({
        title: `${this.constantService.MoreThan24Hours}`,
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
      
          this.unsentSamplesErrorMessage = '';
          this.ddlRiPoint(this.user.id);
          this.alternateAVD = '';
          this.alternateAVDContactNo = '';

          this.sampleShipmentDate = moment().format("DD/MM/YYYY");
          this.sampleShipmentTime = moment().format("HH:mm");
          this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
          this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

          this.name = this.user.name;
          this.modalService.open(
            unsentSamplesDetail, {
            centered: true,
            size: 'xl',
            scrollable: true,
            backdrop:'static',
            keyboard: false,
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
          
          this.unsentSamplesErrorMessage = '';
          this.ddlRiPoint(this.user.id);
          this.alternateAVD = '';
          this.alternateAVDContactNo = '';
          
          this.sampleShipmentDate = moment().format("DD/MM/YYYY");
          this.sampleShipmentTime = moment().format("HH:mm");
          this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
          this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

          this.name = this.user.name;
          this.modalService.open(
            unsentSamplesDetail, {
            centered: true,
            size: 'xl',
            scrollable: true,
            backdrop:'static',
            keyboard: false,
            ariaLabelledBy: 'modal-basic-title'
          });
        }
      })      
    }
    else{
      var _arrSelectedBarcode = []; 
      this.unsentSamples.forEach(element => {
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
      this.unsentSamplesErrorMessage = '';
      this.ddlRiPoint(this.user.id);
      this.alternateAVD = '';
      this.alternateAVDContactNo = '';

      this.sampleShipmentDate = moment().format("DD/MM/YYYY");
      this.sampleShipmentTime = moment().format("HH:mm");
      this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
      this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

      this.name = this.user.name;

      this.modalService.open(
        unsentSamplesDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });      
    }
    
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

  fetchBarcodes() {
    this.selectedBarcodes = '';
    var isFirst = true;
    this.unsentSamples.forEach(element => {
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
  getExpirySamplesConfirmation() {
    this.selectedBarcodes = '';

    var hasAnySelected = this.unsentSamples.filter(x => x.sampleSelected === true);
    if(hasAnySelected.length <= 0){
      this.showResponseMessage(`${this.constantService.SelectOneSample}`, 'e');
      //this.showResponseMessage(`Please select the aging of sample is greater than 24 hrs for move to expiry`, 'e');
      return false;
    }

    var hasLessThan24 = this.unsentSamples.filter(x => x.sampleSelected === true && +(x.sampleAging) < 24);
    if(hasLessThan24.length > 0){
      Swal.fire({
        title: `${this.constantService.LessThan24Hours}`,
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
          this.moveExpirySamples();
        }
        else {

          this.selectedBarcodes = this._strSelectedBarcode = this.getSelectedBarcode('gt24bc');
          if(this.selectedBarcodes === '') return;
          this.moveExpirySamples();
        }
      })      
    }
    else{
      var _arrSelectedBarcode = []; 
      this.unsentSamples.forEach(element => {
        if(element.sampleSelected){
          _arrSelectedBarcode.push(element.barcodeNo);
        }
      });
      this.selectedBarcodes = this._strSelectedBarcode = this.getSelectedBarcode('gt24bc');
      this.moveExpirySamples();     
    }  
    
  }

  fetchExpirySamplesBarcode() {
    this.selectedBarcodes = '';
    var isFirst = true;
    this.unsentSamples.forEach(element => {
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
            this.router.navigateByUrl(`/app/anm-viewshipment?q=${shipmentId}`);

          }
          else {
            this.modalService.dismissAll();
          }
        });
    }
  }

  // updateSampleSelected(event, object, value){
  //     object.sampleSelected = value;
  //     console.log(this.unsentSamples);
  // }

  ngDoCheck() {

    let count = this.unsentSamples.filter(ite => ite.sampleSelected).length
    if (count != this.length) {
      this.length = count
    }

  }

  selectAll() {
    for (var i = 0; i < this.unsentSamples.length; i++) {
      this.unsentSamples[i].sampleSelected = this.selectedAll;
      console.log(this.unsentSamples);
    }
  }

  checkIfAllSelected() {
    console.log(this.unsentSamples);
    this.selectedAll = this.unsentSamples.every(function (item: any) {
      return item.sampleSelected == true;

    })
  }

  fetchMaxDategt24() {

    this.selecteddate = '';
    var isFirst = true;
    var getdates;

    this.unsentSamples.forEach(element => {
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

    this.unsentSamples.forEach(element => {
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
    // var maximumdate = Object.values(comparedate);
    // console.log(maximumdate);
    // var pattern = /(\d{2})\/(\d{2})\/(\d{4})\ (\d{2})\:(\d{2})/;
    // var maxDate = new Date(maximumdate.toString().replace(pattern, '$3/$2/$1 $4:$5'));
    // console.log(maxDate);
    this.shipmentDateOptions.minDate = comparedate.selecteddate;

  }
  fetchMaxDatelt24() {

    this.selecteddate = '';
    var isFirst = true;
    var getdates;

    this.unsentSamples.forEach(element => {
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
    // var maximumdate = Object.values(comparedate);
    // console.log(maximumdate);
    // var pattern = /(\d{2})\/(\d{2})\/(\d{4})\ (\d{2})\:(\d{2})/;
    // var maxDate = new Date(maximumdate.toString().replace(pattern, '$3/$2/$1 $4:$5'));
    // console.log(maxDate);
    this.shipmentDateOptions.minDate = comparedate.selecteddate;

  }

  convertToDateFormat(strDate){

    var pattern = /(\d{2})\/(\d{2})\/(\d{4})\ (\d{2})\:(\d{2})/;
    var dateFormat = new Date(strDate.toString().replace(pattern, '$3/$2/$1 $4:$5'));
    console.log(dateFormat);
    return dateFormat;

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

    // //Change of sample collection time
    // this.popupform.controls.collectionTime.valueChanges.subscribe(changes => {
    //   console.log('end: ', changes);
    //   if (!changes[0]) return;
    //   const selectedDate3 = changes[0].getTime();
    //   this.sampleCollectionTime = moment(new Date(selectedDate3)).format("HH:i");

    //   //const monthLaterDate = selectedDate1;
    //   // this.startPicker.flatpickr.set({
    //   //   defaultDate: new Date(selectedDate1)
    //   // });
    // });
  }

}
