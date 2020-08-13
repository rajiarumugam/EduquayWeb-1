import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ChcSamplePickpackService } from 'src/app/shared/chc-sample/chc-sample-pickpack/chc-sample-pickpack.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/shared/utility/date.service';
import { TokenService } from 'src/app/shared/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { user } from 'src/app/shared/auth-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SamplePickpack, ChcSamplePickpackResponse, chcsampleCentrallabResponse, chcsampleProviderNameResponse, ChcSampleAddShipmentResponse, centalLabModel, tempCHCData, startPickpack } from 'src/app/shared/chc-sample/chc-sample-pickpack/chc-sample-pickpack-response';
import { ChcSampleAddShipmentRequest } from 'src/app/shared/chc-sample/chc-sample-pickpack/chc-sample-pickpack-request';
import { logisticsProviderModel } from 'src/app/shared/chc-module/chc-pickandpack/chc-picknpack-response';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-chc-start-pickpack',
  templateUrl: './chc-start-pickpack.component.html',
  styleUrls: ['./chc-start-pickpack.component.css']
})
export class ChcStartPickpackComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  //@ViewChild(DataTableDirective, { static: false }) dtElement1: DataTableDirective;

  @Output() public onLoadSamples = new EventEmitter();
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  // dtOptions1: DataTables.Settings = {};
  // dtTrigger1: Subject<any> = new Subject();

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

  constructor(
    private chcsamplePickpackService: ChcSamplePickpackService,
    private modalService: NgbModal,
    private dateService: DateService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute,
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
        
        this.onLoadSamples.emit(this.chcsamplepickpack.length);
        //this.onLoadSamples.emit(this.startPickpackData.length);
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

  clicksearchBarcode(samplepicknPackdetail) {

    this.tempCHCDatas = [];
    let term = this.searchbarcode;
    var getindex = this.chcsamplepickpack.findIndex(com => com.barcodeNo === term)
    //var getexistsindex = this.tempCHCDatas.findIndex(data => data.barcodeNo === term)
    if (getindex >= 0) {
      this.tempCHCDatas.push(this.chcsamplepickpack[getindex]);
      this.searchbarcode='';
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

    else {
      Swal.fire({
        icon: 'error', title: "Barcode is  invalid", confirmButtonText: 'Ok'
      });
      this.searchbarcode=''; 
    }

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
    this.fetchBarcodes();

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
    this.fetchBarcodes();
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
      receivingCentralLabId: +(this.receivingCentralLabId),
      logisticsProviderId: +(this.logisticsProviderId),
      deliveryExecutiveName: this.deliveryExecutiveName,
      executiveContactNo: this.executiveContactNo,
      testingCHCId: this.user.chcId,
      dateOfShipment: this.sampleShipmentDate,
      timeOfShipment: this.sampleShipmentTime,
      createdBy: this.user.id,
      source: 'N'
    }
    //return false;
    let addshipment = this.chcsamplePickpackService.chcSampleAddShipment(this.chcsampleAddShipmentRequest)
      .subscribe(response => {
        this.chcsampleAddShipmentResponse = response;
        if (this.chcsampleAddShipmentResponse !== null && this.chcsampleAddShipmentResponse.status === "true") {
          this.showResponseMessage(this.chcsampleAddShipmentResponse.shipment.shipmentId, 's');
          this.submittoshipment();
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
            this.router.navigateByUrl(`/app/chc-sample-viewshipment?q=${shipmentId}`);

          }
          else {
            this.modalService.dismissAll();
          }
        });
    }
  }
  
  validateAlliqutetubeMatch() {
    
    //this.tempCHCDatas = [];
    let alliquotetube = this.alliquotetubebarcode;
    this.tempCHCDatas.forEach(element => {
      if (element.barcodeNo === alliquotetube) {
        this.isAliquoteBarcodeMatch = true;
      }
      else {
        Swal.fire({ icon: 'error', title: "Barcode didn't match", text: 'Please scan the correct barcode', confirmButtonText: 'Ok' });
        this.alliquotetubebarcode='';
      }
    });
  }

  submittoshipment(){

    if(this.primarytubeSelected === true && this.alliquotedtubeSelected === true){
     
      this.modalService.dismissAll();
      
      this.tempCHCDatas.forEach(element1 => {
        var getdataindex = this.chcsamplepickpack.findIndex(com => com.barcodeNo === element1.barcodeNo)
        if (getdataindex >= 0) {
          this.startPickpackData.push(this.chcsamplepickpack[getdataindex]);
          this.chcsamplepickpack.splice(getdataindex,1);
          this.isAddShipmentTrue = true;
          this.onLoadSamples.emit(this.startPickpackData.length);
          this.onLoadSamples.emit(this.chcsamplepickpack.length);
         
          
        }
      });     
    }

  }

  checkIfSelected(index){

    this.startpickpackSelected;
    this.isAddShipmentTrue = false;
    console.log(this.startPickpackData);
    this.selectedAll = this.startPickpackData.every(function (item: any) {
      return item.startpickpackSelected == true;

    })
    if(this.startpickpackSelected === false){
      Swal.fire({
        title: 'One or more selected samples that are aging more than 24 hours',
        text: "Do you still want to continue?",
        icon: 'warning',
        showCancelButton: true,         
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          this.chcsamplepickpack.push(this.startPickpackData[index]);
          this.startPickpackData.splice(index,1);
          this.isAddShipmentTrue = false;
      //this.rerender();
          //this.searchbarcode='';
        }
        else {
            return false;             
        }
      })  
      
    }
    else{
      this.isAddShipmentTrue = true;
    }
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

  fetchBarcodes() {
    this.selectedBarcodes = '';
    var isFirst = true;
    var getdates;
    this.startPickpackData.forEach(element => {
      console.log('sampleSelected :' + element.startpickpackSelected);
      if (this.startpickpackSelected === true) {
        //if (element.sampleSelected) {
        if (isFirst) {
          this.selectedBarcodes += element.barcodeNo;
          getdates = [{ "selecteddate": this.convertToDateFormat(element.sampleDateTime) }];
          isFirst = false;
        }
        else {
          this.selectedBarcodes += ',' + element.barcodeNo;
          getdates.push({ "selecteddate": this.convertToDateFormat(element.sampleDateTime) });
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


}
