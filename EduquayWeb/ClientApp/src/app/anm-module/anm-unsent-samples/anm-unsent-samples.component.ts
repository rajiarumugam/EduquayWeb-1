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
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { user } from 'src/app/shared/auth-response';
import { TokenService } from 'src/app/shared/token.service';

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
  

  constructor(
    private UnsentSamplesServiceService: UnsentSamplesServiceService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private dateService: DateService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {

    this.recordCount = 0;
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
        //Search: '<a class="btn searchBtn" id="searchBtn"><i class="fa fa-search"></i></a>'
      }
    };

    this.dateOfShipment = this.dateService.getDate();
    this.timeOfShipment = this.dateService.getTime();
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
    this.getILRPoints(this.selectedriPoint);
    this.getTestingCHC(this.selectedriPoint);
    this.getAVDName(this.selectedriPoint);

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
            this.unsentSamples.forEach(element => {
              element.sampleSelected = true;
            });
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

  openunsentSamples(unsentSamplesDetail) {

    this.unsentSamplesErrorMessage = '';
    this.fetchBarcode();

    if (this.selectedBarcodes === "") {
      this.showResponseMessage(`Please select at least one sample to create shipment`, 'e');
      return false;
    }

    if (unsentSamplesDetail.sampleAging > 24) {
      this.showResponseMessage(`Aging of selected sample is more than 24 hrs. Please move it to expiry`, 'e');
      return false;
    }

    // if (this.selectedBarcodes === '') {
    //   this.unsentSamplesErrorMessage = 'Please select at least one sample to create shipment';
    //   return false;
    // }
    this.name = this.user.name;
    this.modalService.open(
      unsentSamplesDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      ariaLabelledBy: 'modal-basic-title'
    });

  }

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
    this.AvdNames = [];
    this.selectedAvdName = "";
    this.UnsentSamplesServiceService.getAvdName(riPointId)
      .subscribe(response => {
        this.avdNameResponse = response;
        if (this.avdNameResponse !== null && this.avdNameResponse.status === "true") {
          this.AvdNames = this.avdNameResponse.avd;
          if (this.AvdNames.length > 0) {
            this.selectedAvdName = this.AvdNames[0].id.toString();
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
    this.fetchBarcode();
    //var shipmentId = "123";
    console.log(unsentsampleForm.value);
    if (this.selectedBarcodes === '') {
      this.showResponseMessage(`Please select at least one sample to create shipment`, 'e');
      return false;
      // this.unsentSamplesErrorMessage = 'Please select at least one sample to create shipment';
      // return false;
    }

    this.avdContactNo = unsentsampleForm.value.contactNo;
    this.riId = unsentsampleForm.value.DDriPoint;
    this.ilrId = unsentsampleForm.value.DDilrPoint;
    this.testingCHCId = unsentsampleForm.value.DDLtestingChc;
    this.avdId = unsentsampleForm.value.DDLavdName;

    this.addUnsentSamplesRequest = {
      anmId: this.user.userTypeId,
      riId: +(this.riId),
      ilrId: +(this.ilrId),
      avdId: +(this.avdId),
      avdContactNo: this.avdContactNo,
      testingCHCId: +(this.testingCHCId),
      dateOfShipment: this.dateOfShipment,
      timeOfShipment: this.timeOfShipment,
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
          // this.anmunsentSampleList();
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

  moveExpirySamples(){

    this.unsentSamplesErrorMessage = '';
    if (this.selectedBarcodes === '' || this.selectedBarcodes === undefined) {
      this.expirySampleResponseMessage(`Please select at least one sample to create shipment`, 'e');
      return false;
    }
    
    this.expirysamplesBarcode();
    //Remove below 2 lines after successfully tested
    // this.expirySampleResponseMessage('Successfully registered', 's');
    // return false;

    this.movetimeoutExpiryRequest = {
      anmId: this.user.userTypeId,
      barcodeNo: this.selectedBarcodes,
    }

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

  expirySampleResponseMessage(message: string, type: string){
    var messageType = '';
    if(type === 'e'){
      Swal.fire({icon:'error', title: message, confirmButtonText: 'Close'})
    }
    else{
      Swal.fire({icon:'success', title: message, confirmButtonText: 'Close'})
    }
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

  fetchBarcode() {
    this.selectedBarcodes = '';
    var isFirst = true;
    this.unsentSamples.forEach(element => {
      console.log('sampleSelected :' + element.sampleSelected);
      if (element.sampleSelected === true && element.sampleAging <= '24') {
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

  expirysamplesBarcode() {
    this.selectedBarcodes = '';
    var isFirst = true;
    this.unsentSamples.forEach(element => {
      console.log('sampleSelected :' + element.sampleSelected);
      if (element.sampleSelected === true && element.sampleAging >= '24') {
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

}
