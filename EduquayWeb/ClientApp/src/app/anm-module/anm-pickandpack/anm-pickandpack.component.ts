import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
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


@Component({
  selector: 'app-anm-pickandpack',
  templateUrl: './anm-pickandpack.component.html',
  styleUrls: ['./anm-pickandpack.component.css']
})
export class AnmPickandPackComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('shipmentDatePicker', { static: false }) shipmentDatePicker;
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
  selectedriPoint: '';
  ilrPoints: IlrModel[] = [];
  selectedilrPoint: string = '';
  testingCHCNames: TestingChcModel[] = [];
  selectedtestingCHC: string = '';
  AvdNames: AvdNameModel[] = [];
  selectedAvdName: string = '';
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
    //private dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private _formBuilder: FormBuilder
  ) { }

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
    };

    // this.dateOfShipment =  this.dateService.getDate();
    // this.timeOfShipment = this.dateService.getTime();
    console.log(this.PicknpackService.pickandpackListApi);
    this.ddlRiPoint(this.user.id);
    //this.anmpicknpackList();

    this.picknpackInitResponse = this.route.snapshot.data.picknpackData;
    if (this.picknpackInitResponse.status === 'false') {
      this.sampleList = [];
      if (this.picknpackInitResponse.message !== null && this.picknpackInitResponse.message.code === "ENOTFOUND") {
        this.picknpackErrorMessage = "Unable to connect to api source";
      }
      else if (this.picknpackInitResponse.message !== null || this.picknpackInitResponse.message == undefined) {
        this.picknpackErrorMessage = this.picknpackInitResponse.message;
      }
    }
    else {

      if (this.picknpackInitResponse.sampleList != null && this.picknpackInitResponse.sampleList.length > 0) {
        this.sampleList = this.picknpackInitResponse.sampleList;
      }
    }
  }

  ddlRiPoint(userId) {
    let riPoint = this.PicknpackService.getRiPoint(userId).subscribe(response => {
      this.riPointResponse = response;
      if (this.riPointResponse !== null && this.riPointResponse.status === "true") {
        this.riPoints = this.riPointResponse.ri;
        this.selectedriPoint = "";
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

    if(this.selectedriPoint === ''){
      this.selectedilrPoint = '';
      this.selectedtestingCHC = '';
      this.selectedAvdName = '';
    }
    else{
      this.getILRPoints(this.selectedriPoint);
      this.getTestingCHC(this.selectedriPoint);
      this.getAVDName(this.selectedriPoint);
    }
  }

  anmpicknpackList() {
    this.sampleList = [];
    this.picknpackRequest = { userId: this.user.id, collectionFrom: this.user.sampleCollectionFrom };
    let picknpack = this.PicknpackService.getpickandpackList(this.picknpackRequest)
      .subscribe(response => {
        this.picknpackResponse = response;
        if (this.picknpackResponse !== null && this.picknpackResponse.status === "true") {
          if (this.picknpackResponse.sampleList.length <= 0) {
            this.picknpackErrorMessage = response.message;
          }
          else {
            this.sampleList = this.picknpackResponse.sampleList;
            this.sampleList.forEach(element => {
              element.sampleSelected = true;
            });
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

  openPicknpack(picknPackdetail) {
    this.picknpackErrorMessage = '';
    this.fetchBarcode();
    this.fetchMaxDate();

    if (this.sampleList === null || this.sampleList.length <= 0) {
      this.showResponseMessage(`Sample collection does not exist to pick and pack`, 'e');
      return false;
    }
    if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
      this.showResponseMessage(`Please select at least one sample to create shipment`, 'e');
      return false;
    }
    // if (picknPackdetail.sampleAging > 24 || picknPackdetail.sampleAging === undefined) {
    //   this.showResponseMessage(`Aging of selected sample is more than 24 hrs. Please move it to expiry`, 'e');
    //   return false;
    // }
    this.shipmentDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
    this.shipmentDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

    //this.shipmentDateOptions.minDate = new Date(moment().add(-1,'day').format());

    this.name = this.user.name;
    this.modalService.open(
      picknPackdetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      ariaLabelledBy: 'modal-basic-title'
    });
  }


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
    this.AvdNames = [];
    this.selectedAvdName = "";
    this.PicknpackService.getAvdName(riPointId)
      .subscribe(response => {
        this.avdNameResponse = response;
        if (this.avdNameResponse !== null && this.avdNameResponse.status === "true") {
          this.AvdNames = this.avdNameResponse.avd;
          if (this.AvdNames.length > 0) {
            this.selectedAvdName = this.AvdNames[0].id.toString();
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
    this.fetchBarcode();
    //var shipmentId = "123";
    console.log(shipmentForm.value);

    if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
      this.showResponseMessage(`Please select at least one sample to create shipment`, 'e');
      return false;
    }

    this.avdContactNo = shipmentForm.value.contactNo;
    this.alternateAVD = shipmentForm.value.alternatename;
    this.alternateAVDContactNo = shipmentForm.value.alternatecontactNo;
    this.riId = shipmentForm.value.DDriPoint;
    this.ilrId = shipmentForm.value.DDilrPoint;
    this.testingCHCId = shipmentForm.value.DDLtestingChc;
    this.avdId = shipmentForm.value.DDLavdName;
    // console.log('openSampleCOlllection()');
    //Remove below 2 lines after successfully tested
    // this.showResponseMessage('Successfully registered', 's');
    // return false;

    this.anmaddshipmentRequest = {
      anmId: this.user.id,
      riId: +(this.riId),
      ilrId: +(this.ilrId),
      avdId: +(this.avdId),
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
    //return false;
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
  getconfirmation() {
    this.picknpackErrorMessage = '';
    this.expirysamplesBarcode();
    if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
      this.expirySampleResponseMessage(`Please select the aging of sample is more than 24 hrs to move to expiry`, 'e');
      return false;
    }
    if (this.selectedBarcodes !== null) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this back!",
        icon: 'warning',
        showCancelButton: true,
        // confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Move it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.value) {
          this.pickpackMoveExpirySamples();
        }
      })
    }

  }

  pickpackMoveExpirySamples() {

    this.picknpackErrorMessage = '';
    
    this.pickpackmovetimeoutExpiryRequest = {
      anmId: this.user.userTypeId,
      barcodeNo: this.selectedBarcodes,
    }

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
      Swal.fire({ icon: 'error', title: message, confirmButtonText: 'Close' })
    }
    else {
      Swal.fire({ icon: 'success', title: message, confirmButtonText: 'Close' })
    }
  }


  // updateSampleSelected(event, object, value){
  //     object.sampleSelected = value;
  //     console.log(this.sampleList);
  // }
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

  fetchMaxDate() {

    this.selecteddate = '';
    var isFirst = true;
    var getdates;

    this.sampleList.forEach(element => {
      console.log('sampleSelected :' + element.sampleSelected);
      if (element.sampleSelected === true && element.sampleAging < "24") {
        //   var pattern = /(\d{2})\/(\d{2})\/(\d{4})\ (\d{2})\:(\d{2})/;
        //   const regDate = new Date(element.sampleDateTime.replace(pattern,'$3/$2/$1 $4:$5'));
        // // var maximumDate=new Date(Math.max.apply(null, regDate)); 
        // // //var minimumDate=new Date(Math.min.apply(null, regDate)); 
        // // this.shipmentDateOptions.minDate = maximumDate;
        //   this.selecteddate += regDate;
        // new Date(Math.max.apply(null, a.map(function(e) {
        //   return new Date(e.MeasureDate);
        // }))); 
        if (isFirst) {
          getdates = [{ "selecteddate": element.sampleDateTime }];
          isFirst = false;
        }
        else {
          //logdate  += [',' + element.sampleDateTime];
          getdates.push({ "selecteddate": element.sampleDateTime });
        }
      }
    });

    if (getdates === '' || getdates === undefined) {
      this.showResponseMessage(`Please select at least one sample to create shipment`, 'e');
      return false;
    }
    
    var comparedate;
    comparedate = getdates.reduce(function (r, a) {
      return r.selecteddate > a.selecteddate ? r : a;
    });
    var maximumdate = Object.values(comparedate);
    console.log(maximumdate);
    var pattern = /(\d{2})\/(\d{2})\/(\d{4})\ (\d{2})\:(\d{2})/;
    var maxDate = new Date(maximumdate.toString().replace(pattern, '$3/$2/$1 $4:$5'));
    console.log(maxDate);
    this.shipmentDateOptions.minDate = maxDate;
    //document.write('<pre>' + JSON.stringify(latest, 0, 4) + '</pre>');
    // let moments = [logdate].map(d => moment(d)),
    // maxDate = moment.max(moments);
    // console.log(maxDate);
    // this.shipmentDateOptions.minDate = maxDate.toString();
    // const maxDate=moment().max(this.selecteddate);
    //let moments = [element.sampleDateTime].map(d => moment(d)),
    //maxDate = moment.max(moments);
    //console.log(maxDate);

    //this.shipmentDateOptions.minDate = maxDate;

    // function sortDates(a, b)
    // {
    //     return a.getTime() - b.getTime();
    // }
    // // var pattern = /(\d{2})\/(\d{2})\/(\d{4})\ (\d{2})\:(\d{2})/;
    // // var regDate = new Date(this.selecteddate.replace(pattern,'$3/$2/$1 $4:$5'));
    // var sorted = this.selecteddate.sort(sortDates);
    // //var minDate = sorted[0];
    // var maxDate = sorted[sorted.length-1];
    // console.log(maxDate);

  }

  fetchBarcode() {
    this.selectedBarcodes = '';
    var isFirst = true;
    this.sampleList.forEach(element => {
      console.log('sampleSelected :' + element.sampleSelected);
      if (element.sampleSelected === true && element.sampleAging < "24") {
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

  expirysamplesBarcode() {
    this.selectedBarcodes = '';
    var isFirst = true;
    this.sampleList.forEach(element => {
      console.log('sampleSelected :' + element.sampleSelected);
      if (element.sampleSelected === true && element.sampleAging > "24") {
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
