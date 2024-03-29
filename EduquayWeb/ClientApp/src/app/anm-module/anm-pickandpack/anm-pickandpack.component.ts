import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
// import { Router } from '@angular/router';
import { PicknpackService } from 'src/app/shared/anm-module/picnpack/picknpack.service';
import { PicknpackRequest, AnmAddShipmentRequest, PickpackMoveTimeoutExpiryRequest } from 'src/app/shared/anm-module/picnpack/picknpack-request';
import { PicknpackResponse, SampleList, RiPointResponse, RIModel, ILRpointResponse, IlrModel, TestingCHCResponse, TestingChcModel, AvdNameResponse, AvdNameModel, AnmAddShipmentResponse, PickpackMoveTimeoutExpiryResponse } from 'src/app/shared/anm-module/picnpack/picknpack-response';
import { HttpErrorResponse } from '@angular/common/http';
import { NgModel, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DateService } from 'src/app/shared/utility/date.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { user } from 'src/app/shared/auth-response';
import { TokenService } from 'src/app/shared/token.service';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { ConstantService } from 'src/app/shared/constant.service';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';


@Component({
  selector: 'app-anm-pickandpack',
  templateUrl: './anm-pickandpack.component.html',
  styleUrls: ['./anm-pickandpack.component.css']
})
export class AnmPickandPackComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('shipmentDatePicker', { static: false }) shipmentDatePicker;
  //@Output() barcodeselected: EventEmitter<any> = new EventEmitter<any>(); 
  associatedANMData = [];
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  user: user;

  picknpackErrorMessage: string;
  picknpackRequest: PicknpackRequest;
  picknpackResponse: PicknpackResponse;
  riPointResponse: RiPointResponse;
  ilrpointResponse: ILRpointResponse;
  testingCHCResponse: TestingCHCResponse;
  avdNameResponse: AvdNameResponse;
  anmaddshipmentRequest: AnmAddShipmentRequest;
  anmaddshipmentResponse: AnmAddShipmentResponse;
  picknpackInitResponse: any;
  pickpackmovetimeoutExpiryRequest: PickpackMoveTimeoutExpiryRequest;
  pickpackmovetimeoutExpiryResponse: PickpackMoveTimeoutExpiryResponse;
  sampleList: SampleList[] = [];
  riPoints: RIModel[] = [];
  selectedriPoint: string ='';
  ilrPoints: IlrModel[] = [];
  selectedilrPoint: string = '';
  testingCHCNames: TestingChcModel[] = [];
  selectedtestingCHC: string = '';
  AvdNames: AvdNameModel ;
  selectedAvdName: string = '';
  selectedAvdContact: string = '';
  barcodeselected: string;
  length = 0;
  barcodeNo: string;
  shipmentFrom: number;
  source: string;
  anmId: number;
  riId: number;
  ilrId: number;
  avdId: number;
  avdContactNo: string;
  alternateAVD: string;
  alternateAVDContactNo: string;
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
  sampleDateTime: string;
  sampleShipmentDate: string;
  sampleShipmentTime: string;
  popupform: FormGroup;
  DAY = 86400000;
  dyCollectionDate: Date = new Date(Date.now());
  selecteddate: any;
  logdate: string[] = [];
  sampleAging: string;
  picknPackdetail: any;
  avdName: string;
  contactNo: string;

  //agingMode: any

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
    private PicknpackService: PicknpackService,
    private modalService: NgbModal,
    private constantService: ConstantService,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private _formBuilder: FormBuilder,
    private dataservice: DataService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "ANM", "page": "Pick & Pack to CHC"}));
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
        //Search: '<a class="btn searchBtn" id="searchBtn"><i class="fa fa-search"></i></a>'

      }
    };

    // this.dateOfShipment =  this.dateService.getDate();
    // this.timeOfShipment = this.dateService.getTime();
    console.log(this.PicknpackService.pickandpackListApi);
   // this.ddlRiPoint(this.user.id);
    this.anmpicknpackList();
     //--Resolver--//
    // this.picknpackInitResponse = this.route.snapshot.data.picknpackData;
    // if (this.picknpackInitResponse.status === 'false') {
    //   this.sampleList = [];
    //   if (this.picknpackInitResponse.message !== null && this.picknpackInitResponse.message.code === "ENOTFOUND") {
    //     this.picknpackErrorMessage = "Unable to connect to api source";
    //   }
    //   else if (this.picknpackInitResponse.message !== null || this.picknpackInitResponse.message == undefined) {
    //     this.picknpackErrorMessage = this.picknpackInitResponse.message;
    //   }
    // }
    // else {

    //   if (this.picknpackInitResponse.sampleList != null && this.picknpackInitResponse.sampleList.length > 0) {
    //     this.sampleList = this.picknpackInitResponse.sampleList;
    //   }
    // }
  }

  ddlRiPoint(userId) {
    let riPoint = this.PicknpackService.getRiPoint(userId).subscribe(response => {
      this.riPointResponse = response;
      if (this.riPointResponse !== null && this.riPointResponse.status === "true") {
        this.riPoints = this.riPointResponse.ri;
        this.selectedriPoint = "";
        // if (this.riPoints.length > 0) {
        //   this.selectedriPoint = this.riPoints[0].id.toString();
        // }
      }
    else {
        this.picknpackErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.picknpackErrorMessage = err.toString();

      });
  }
  onChangeriPoint() {

    if (this.selectedriPoint === '') {
      this.selectedilrPoint = '';
      this.selectedtestingCHC = '';
      this.selectedAvdName = '';
      this.selectedAvdContact = '';
    }
    else {
      this.getILRPoints(this.selectedriPoint);
      this.getTestingCHC(this.selectedriPoint);
      this.getAVDName(this.selectedriPoint);
    }
  }

  anmpicknpackList() {
    this.loaderService.display(true);
    this.sampleList = [];
    this.picknpackRequest = { userId: this.user.id, collectionFrom: this.user.sampleCollectionFrom };
    let picknpack = this.PicknpackService.getpickandpackList(this.picknpackRequest)
      .subscribe(response => {
        this.picknpackResponse = response;
        this.loaderService.display(false);
        if (this.picknpackResponse !== null && this.picknpackResponse.status === "true") {
          if (this.picknpackResponse.sampleList.length <= 0) {
            this.picknpackErrorMessage = response.message;
          }
          else {
            this.sampleList = this.picknpackResponse.sampleList;
            // this.sampleList.forEach(element => {
            //   element.sampleSelected = true;
            // });
            this.rerender();
          }
        }
        else {
          this.picknpackErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.picknpackErrorMessage = err.toString();
        });

  }

  // openPicknpack(picknPackdetail) {
  // this.picknpackErrorMessage = '';
  // //this.fetchBarcode();
  // //this.fetchMaxDate();

  // if (this.sampleList === null || this.sampleList.length <= 0) {
  //   this.showResponseMessage(`Sample collection does not exist to pick and pack`, 'e');
  //   return false;
  // }
  // if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
  //   this.showResponseMessage(`${this.constantService.SelectOneSample}`, 'e');
  //   return false;
  // }
  // // if (picknPackdetail.sampleAging > 24 || picknPackdetail.sampleAging === undefined) {
  // //   this.showResponseMessage(`Aging of selected sample is more than 24 hrs. Please move it to expiry`, 'e');
  // //   return false;
  // // }
  // this.sampleShipmentDate = moment().format("DD/MM/YYYY");
  // this.sampleShipmentTime =  moment().format("HH:mm"); 
  // this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
  // this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

  // //this.shipmentDateOptions.minDate = new Date(moment().add(-1,'day').format());

  // this.name = this.user.name;
  // this.modalService.open(
  //   picknPackdetail, {
  //   centered: true,
  //   size: 'xl',
  //   scrollable: true,
  //   ariaLabelledBy: 'modal-basic-title'
  // });
  //}

  getILRPoints(riPointId) {

    this.ilrPoints = [];
    this.selectedilrPoint = '';
    this.PicknpackService.getIlrPoint(riPointId)
      .subscribe(response => {
        this.ilrpointResponse = response;
        if (this.ilrpointResponse !== null && this.ilrpointResponse.status === "true") {
          this.ilrPoints = this.ilrpointResponse.ilr;
          if (this.ilrPoints.length > 0) {
            this.selectedilrPoint = this.ilrPoints[0].id.toString();
          }
        }
        else {
          this.picknpackErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.picknpackErrorMessage = err.toString();

        });
  }

  getTestingCHC(riPointId) {
    this.testingCHCNames = [];
    this.selectedtestingCHC = "";
    this.PicknpackService.getTestingCHC(riPointId)
      .subscribe(response => {
        this.testingCHCResponse = response;
        if (this.testingCHCResponse !== null && this.testingCHCResponse.status === "true") {
          this.testingCHCNames = this.testingCHCResponse.testingCHC;
          if (this.testingCHCNames.length > 0) {
            this.selectedtestingCHC = this.testingCHCNames[0].id.toString();
          }
        }
        else {
          this.picknpackErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.picknpackErrorMessage = err.toString();

        });
  }

  getAVDName(riPointId) {
    this.AvdNames = new AvdNameModel();
    this.selectedAvdName = "";
    this.PicknpackService.getAvdName(riPointId)
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
          this.picknpackErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.picknpackErrorMessage = err.toString();

        });
  }

  onSubmit(shipmentForm: NgForm) {
    this.picknpackErrorMessage = '';
    this.hasAlternateContactNumber = this.hasAlternateAvdName = true;

    var hasAlternateContactNumber = shipmentForm.value.alternatecontactNo !== '' && shipmentForm.value.alternatecontactNo !== undefined;
    var hasAlternateAvdName = shipmentForm.value.alternatename !== '' && shipmentForm.value.alternatename !== undefined;
    if(hasAlternateContactNumber !== hasAlternateAvdName){
      if((shipmentForm.value.alternatecontactNo !== '' && shipmentForm.value.alternatecontactNo !== undefined) && (shipmentForm.value.alternatename === '' || shipmentForm.value.alternatename === undefined)){
        this.hasAlternateAvdName = false;
      }
      else if((shipmentForm.value.alternatecontactNo === '' || shipmentForm.value.alternatecontactNo === undefined)  && (shipmentForm.value.alternatename !== '' && shipmentForm.value.alternatename !== undefined)){
        this.hasAlternateContactNumber = false;
      }
      return false;
    }


    console.log(shipmentForm.value);

    if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
      this.showResponseMessage(this.constantService.SelectOneSample, 'e');
      return false;
    }

    //this.contactNo = shipmentForm.value.avdcontactNo;
    this.alternateAVD = shipmentForm.value.alternatename;
    this.alternateAVDContactNo = shipmentForm.value.alternatecontactNo;
    this.riId = shipmentForm.value.DDriPoint;
    this.ilrId = shipmentForm.value.DDilrPoint;
    this.testingCHCId = shipmentForm.value.DDLtestingChc;
    //this.avdName = shipmentForm.value.DDLavdName;
    //this.avdContactNo = shipmentForm.value.alternatecontactNo;
    // console.log('openSampleCOlllection()');
    //Remove below 2 lines after successfully tested
    // this.showResponseMessage('Successfully registered', 's');
    // return false;

    this.anmaddshipmentRequest = {
      anmId: this.user.id,
      riId: +(this.riId),
      ilrId: +(this.ilrId),
      avdId: +(this.AvdNames.id),
      avdContactNo: this.avdContactNo,
      alternateAVD: this.alternateAVD,
      alternateAVDContactNo: this.alternateAVDContactNo,
      testingCHCId: +(this.testingCHCId),
      dateOfShipment: this.sampleShipmentDate,
      timeOfShipment: this.sampleShipmentTime,
      barcodeNo: this.selectedBarcodes,
      shipmentFrom: this.user.shipmentFrom,
      createdBy: this.user.id,
      source: 'N',
    }
    // Swal.fire({icon: 'success', title: "successfull",
    //  confirmButtonText: 'Ok'})
    // return false;
    let addshipment = this.PicknpackService.anmAddSipment(this.anmaddshipmentRequest)
      .subscribe(response => {
        this.anmaddshipmentResponse = response;
        if (this.anmaddshipmentResponse !== null && this.anmaddshipmentResponse.status === "true") {
          this.showResponseMessage(this.anmaddshipmentResponse.shipment.shipmentId, 's');
          this.anmpicknpackList();
        } else {
          this.showResponseMessage(this.anmaddshipmentResponse.shipment.errorMessage, 'e');
          this.picknpackErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.showResponseMessage(err.toString(), 'e');
          this.picknpackErrorMessage = err.toString();
        });
  }

  showResponseMessage(shipmentId: string, type: string) {
    var messageType = '';
    var title = `Shipment Id is ${shipmentId}`;
    if (type === 'e') {
      Swal.fire({ icon: 'error', title: shipmentId, confirmButtonText: 'Close', allowOutsideClick: false })
    }
    else {
      Swal.fire({
        icon: 'success', title: title,
        showCancelButton: true, confirmButtonText: 'Shipment Log', cancelButtonText: 'Close', allowOutsideClick: false
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

  pickpackMoveExpirySamples() {

    this.picknpackErrorMessage = '';
    
    if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
      this.expirySampleResponseMessage(this.constantService.SelectOneSample, 'e');
      return false;
    }

    this.pickpackmovetimeoutExpiryRequest = {
      anmId: this.user.id,
      barcodeNo: this.selectedBarcodes,
    }
    // Swal.fire({icon: 'success', title: "successfull",
    //  confirmButtonText: 'Ok'})
    // return false;
   
    let expirysamples = this.PicknpackService.PnPMoveExpirySamples(this.pickpackmovetimeoutExpiryRequest)
      .subscribe(response => {
        this.pickpackmovetimeoutExpiryResponse = response;
        if (this.pickpackmovetimeoutExpiryResponse !== null && this.pickpackmovetimeoutExpiryResponse.status === "true") {
          this.expirySampleResponseMessage(this.pickpackmovetimeoutExpiryResponse.message, 's');
          this.anmpicknpackList();
        }
        else {
          this.expirySampleResponseMessage(this.pickpackmovetimeoutExpiryResponse.message, 'e');
          this.picknpackErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.expirySampleResponseMessage(err.toString(), 'e');
          this.picknpackErrorMessage = err.toString();
        });
  }

  expirySampleResponseMessage(message: string, type: string) {
    var messageType = '';
    if (type === 'e') {
      Swal.fire({ icon: 'error', title: message, confirmButtonText: 'Close', allowOutsideClick: false })
    }
    else {
      Swal.fire({ icon: 'success', title: message, confirmButtonText: 'Close', allowOutsideClick: false })
    }
  }


  // updateSampleSelected(event, object, value){
  //     object.sampleSelected = value;
  //     console.log(this.sampleList);
  // }
  ngDoCheck() {

    let count = this.sampleList.filter(ite => ite.sampleSelected).length
    if (count != this.length) {
      this.length = count
    }

  }

  selectAll() {
    for (var i = 0; i < this.sampleList.length; i++) {
      this.sampleList[i].sampleSelected = this.selectedAll;
      console.log(this.sampleList);
    }
  }

  checkIfAllSelected() {
    console.log(this.sampleList);
    this.selectedAll = this.sampleList.every(function (item: any) {
      return item.sampleSelected == true;

    })
  }

  fetchMaxDategt24() {

    this.selecteddate = '';
    var isFirst = true;
    var getdates;
  
    this.sampleList.forEach(element => {
      console.log('sampleSelected :' + element.sampleSelected);
      if (element.sampleSelected === true && +element.sampleAging >= 36) {
        
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
  
    this.sampleList.forEach(element => {
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
  
    this.sampleList.forEach(element => {
      console.log('sampleSelected :' + element.sampleSelected);
      if (element.sampleSelected === true && +(element.sampleAging) < 36) {
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



    getSelectedBarcode(agingMode) {
//gt24bc
//lt24bc
//allbc
    this._arrSelectedDate = [];
    var _arrSelectedBarcode = [];
    this.sampleList.forEach(element => {
      if (element.sampleSelected) {
        if(agingMode === 'gt24bc' && +element.sampleAging >= 36){
          _arrSelectedBarcode.push(element.barcodeNo);
          //this._arrSelectedDate.push(element.sampleDateTime);
        }
        else if(agingMode === 'lt24bc' && +element.sampleAging < 36){
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

  getCreateShipmentConfirmation(picknPackdetail) {
    this.selectedBarcodes = '';
    this.hasAlternateContactNumber = this.hasAlternateAvdName = true;

    var hasAnySelected = this.sampleList.filter(x => x.sampleSelected === true);
    if(hasAnySelected.length <= 0){
      this.showResponseMessage(`${this.constantService.SelectOneSample}`, 'e');
      return false;
    }

    var hasGreaterThan24 = this.sampleList.filter(x => x.sampleSelected === true && +(x.sampleAging) >= 36);
    if(hasGreaterThan24.length > 0){
      Swal.fire({
        title: 'One or more selected samples that are aging more than 36 hours',
        text: "Do you still want to continue?",
        icon: 'warning',
        showCancelButton: true,         
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        allowOutsideClick: false
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
      
          this.picknpackErrorMessage = '';
          this.ddlRiPoint(this.user.id);
          this.alternateAVD = '';
          this.alternateAVDContactNo = '';

          this.sampleShipmentDate = moment().format("DD/MM/YYYY");
          this.sampleShipmentTime = moment().format("HH:mm");
          this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
          this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

          this.name = this.user.name;
          this.modalService.open(
            picknPackdetail, {
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
          
          this.picknpackErrorMessage = '';
           this.ddlRiPoint(this.user.id);
          this.alternateAVD = '';
          this.alternateAVDContactNo = '';
          
          this.sampleShipmentDate = moment().format("DD/MM/YYYY");
          this.sampleShipmentTime = moment().format("HH:mm");
          this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
          this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

          this.name = this.user.name;
          this.modalService.open(
            picknPackdetail, {
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
      this.sampleList.forEach(element => {
        if(element.sampleSelected){
          _arrSelectedBarcode.push(element.barcodeNo);
        }
      });
      this.selectedBarcodes =  this._strSelectedBarcode = this.getSelectedBarcode('lt24bc');
      if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
       // this.showResponseMessage(`Oops! No barcode have been selected aging less then 24 hours for create shipment`, 'e');
        return false;
      }
      this.fetchMaxDatelt24(); 

      this.picknpackErrorMessage = '';
      this.ddlRiPoint(this.user.id);
      this.alternateAVD = '';
      this.alternateAVDContactNo = '';
      
      this.sampleShipmentDate = moment().format("DD/MM/YYYY");
      this.sampleShipmentTime = moment().format("HH:mm");
      this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
      this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

      this.name = this.user.name;
      
      this.modalService.open(
        picknPackdetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });      
    }
    
  }
  fetchBarcodes() {
    this.selectedBarcodes = '';
    var isFirst = true;
    this.sampleList.forEach(element => {
      console.log('sampleSelected :' + element.sampleSelected);
      if (element.sampleSelected === true && +element.sampleAging < 36) {
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

    var hasAnySelected = this.sampleList.filter(x => x.sampleSelected === true);
    if(hasAnySelected.length <= 0){
      this.showResponseMessage(`${this.constantService.SelectOneSample}`, 'e');
      return false;
    }

    var hasLessThan24 = this.sampleList.filter(x => x.sampleSelected === true && +(x.sampleAging) < 36);
    if(hasLessThan24.length > 0){
      Swal.fire({
        title: 'One or more selected samples that are aging less than 36 hours',
        text: "Do you still want to continue?",
        icon: 'warning',
        showCancelButton: true,         
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
          var isFirst = true;
          this.selectedBarcodes = this._strSelectedBarcode = this.getSelectedBarcode('allbc');
          if(this.selectedBarcodes === '') return;
          this.pickpackMoveExpirySamples();
        }
        else {

          this.selectedBarcodes = this._strSelectedBarcode = this.getSelectedBarcode('gt24bc');
          if(this.selectedBarcodes === '') return;
          this.pickpackMoveExpirySamples();
        }
      })      
    }
    else{
      var _arrSelectedBarcode = []; 
      this.sampleList.forEach(element => {
        if(element.sampleSelected){
          _arrSelectedBarcode.push(element.barcodeNo);
        }
      });
      this.selectedBarcodes = this._strSelectedBarcode = this.getSelectedBarcode('gt24bc');
      this.pickpackMoveExpirySamples();     
    }  
    
  }

  fetchExpirySamplesBarcode() {
    this.selectedBarcodes = '';
    var isFirst = true;
    this.sampleList.forEach(element => {
      console.log('sampleSelected :' + element.sampleSelected);
      if (element.sampleSelected === true && +element.sampleAging >= 36) {
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
