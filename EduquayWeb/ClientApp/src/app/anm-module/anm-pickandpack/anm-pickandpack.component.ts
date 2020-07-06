import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
// import { Router } from '@angular/router';
import { PicknpackService } from 'src/app/shared/anm-module/picnpack/picknpack.service';
import { PicknpackRequest, AnmAddShipmentRequest } from 'src/app/shared/anm-module/picnpack/picknpack-request';
import { PicknpackResponse, SampleList, RiPointResponse, RIModel, ILRpointResponse, IlrModel, TestingCHCResponse, TestingChcModel, AvdNameResponse, AvdNameModel, AnmAddShipmentResponse } from 'src/app/shared/anm-module/picnpack/picknpack-response';
import { HttpErrorResponse } from '@angular/common/http';
import { NgModel, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DateService } from 'src/app/shared/utility/date.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
//import { library } from '@fortawesome/fontawesome-svg-core'
//import { fas } from '@fortawesome/free-solid-svg-icons'
//import { far } from '@fortawesome/free-regular-svg-icons'
//import { fab } from '@fortawesome/free-brands-svg-icons'


@Component({
  selector: 'app-anm-pickandpack',
  templateUrl: './anm-pickandpack.component.html',
  styleUrls: ['./anm-pickandpack.component.css']
})
export class AnmPickandPackComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

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
  testingCHCId: number;
  dateOfShipment: string;
  timeOfShipment: string;
  createdBy: number;
  //AddShipment: ShipmentId[] = [];
  shipmentId: string;
  errorMessage: string;
  selectedBarcodes: string;

  constructor(
    private PicknpackService: PicknpackService,
    private modalService: NgbModal,
    private dateService: DateService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
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
    
    this.dateOfShipment =  this.dateService.getDate();
    this.timeOfShipment = this.dateService.getTime();
    console.log(this.PicknpackService.pickandpackListApi);
    this.ddlRiPoint();
    this.anmpicknpackList();

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
      
      if (this.picknpackInitResponse.sampleList!= null && this.picknpackInitResponse.sampleList.length > 0) {
        this.sampleList = this.picknpackInitResponse.sampleList;
      }
    }
  }

  ddlRiPoint(){
    //this.riPointRequest = {userId: 1};
    var userId = 2;
    let riPoint= this.PicknpackService.getRiPoint(userId).subscribe(response =>{
       this.riPointResponse = response;
       if(this.riPointResponse !== null && this.riPointResponse.status === "true"){
           this.riPoints  = this.riPointResponse.riDetails;
           this.selectedriPoint = "";
         }
         else{
           this.picknpackErrorMessage = response.message;
         }
     },
     (err: HttpErrorResponse) => {
       this.picknpackErrorMessage = err.toString();
 
     });
   }
   onChangeriPoint(){
    this.getILRPoints(this.selectedriPoint);
    this.getTestingCHC(this.selectedriPoint);
    this.getAVDName(this.selectedriPoint);

   }

  anmpicknpackList(){
    this.sampleList = [];
    this.picknpackRequest = {userId: 1, collectionFrom: 10 };
    let picknpack = this.PicknpackService.getpickandpackList(this.picknpackRequest)
    .subscribe(response => {
      this.picknpackResponse = response;
      if(this.picknpackResponse !== null && this.picknpackResponse.status === "true"){
        if(this.picknpackResponse.sampleList.length <= 0){
          this.picknpackErrorMessage = response.message;
        }
        else{
          this.sampleList = this.picknpackResponse.sampleList;
          this.sampleList.forEach(element => {
            element.sampleSelected = true;
          });
          this.rerender();
        }
      }
      else{
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
    if (this.selectedBarcodes === '') {
      this.picknpackErrorMessage = 'Please select atleast one sample to create shipment';
      return false;
    }
    this.modalService.open(
      picknPackdetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      ariaLabelledBy: 'modal-basic-title'
    });
  }


  getILRPoints(riPointId){
    this.ilrPoints = [];
    this.selectedilrPoint = '';
    this.PicknpackService.getIlrPoint(riPointId)
    .subscribe(response =>{
    this.ilrpointResponse = response;
      if(this.ilrpointResponse !== null && this.ilrpointResponse.status === "true"){
         this.ilrPoints = this.ilrpointResponse.ilr;
         if(this.ilrPoints.length > 0){
          this.selectedilrPoint = this.ilrPoints[0].id.toString();
         }
        }
        else{
          this.picknpackErrorMessage = response.message;
        }
    },
    (err: HttpErrorResponse) => {
      this.picknpackErrorMessage = err.toString();

    });

  }

  getTestingCHC(riPointId){
    this.testingCHCNames = [];
    this.selectedtestingCHC = "";
    this.PicknpackService.getTestingCHC(riPointId)
    .subscribe(response =>{
   this.testingCHCResponse = response;
      if(this.testingCHCResponse !== null && this.testingCHCResponse.status === "true"){
         this.testingCHCNames = this.testingCHCResponse.testingCHC;
         if(this.testingCHCNames.length > 0){
          this.selectedtestingCHC = this.testingCHCNames[0].id.toString();
         }
        }
        else{
          this.picknpackErrorMessage = response.message;
        }
    },
    (err: HttpErrorResponse) => {
      this.picknpackErrorMessage = err.toString();

    });
  }

  getAVDName(riPointId){
    this.AvdNames = [];
    this.selectedAvdName = "";
    this.PicknpackService.getAvdName(riPointId)
    .subscribe(response =>{
   this.avdNameResponse = response;
      if(this.avdNameResponse !== null && this.avdNameResponse.status === "true"){
         this.AvdNames = this.avdNameResponse.avd;
         if(this.AvdNames.length > 0){
          this.selectedAvdName = this.AvdNames[0].id.toString();
         }
          
        }
        else{
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
    if (this.selectedBarcodes === '') {
      this.picknpackErrorMessage = 'Please select atleast one sample to create shipment';
      return false;
    }

    this.avdContactNo = shipmentForm.value.contactNo;
    this.riId = shipmentForm.value.DDriPoint;
    this.ilrId = shipmentForm.value.DDilrPoint;
    this.testingCHCId = shipmentForm.value.DDLtestingChc;
    this.avdId = shipmentForm.value.DDLavdName;
    // console.log('openSampleCOlllection()');
    this.anmaddshipmentRequest = {
      anmId: 1,
      riId: +(this.riId),
      ilrId: +(this.ilrId),
      avdId: +(this.avdId),
      avdContactNo: this.avdContactNo,
      testingCHCId: +(this.testingCHCId),
      dateOfShipment: this.dateOfShipment,
      timeOfShipment: this.timeOfShipment,
      barcodeNo: this.selectedBarcodes,
      shipmentFrom: 4,
      createdBy: 2,
      source: 'N',
    }
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

    showResponseMessage(shipmentId: string, type: string){
      var messageType = '';
      var title = `Shipment Id is ${shipmentId}`;
      if(type === 'e'){
        Swal.fire({icon:'error', title: shipmentId, confirmButtonText: 'Close'})
      }
      else{
        Swal.fire({icon:'success', title: title,
        showCancelButton: true, confirmButtonText: 'Shipment Log', cancelButtonText: 'Close' })
           .then((result) => {
             if (result.value) {
              this.modalService.dismissAll();
              //this.router.navigate(['/app/anm-viewshipment',{'q':shipmentId}]);
              this.router.navigateByUrl(`/app/anm-viewshipment?q=${shipmentId}`);
             
             }
             else{
               this.modalService.dismissAll();
             }
           });
      }
    }

    updateSampleSelected(event, object, value){
        object.sampleSelected = value;
        console.log(this.sampleList);
    }

    fetchBarcode(){
      this.selectedBarcodes = '';
      var isFirst = true;
      this.sampleList.forEach(element => {
        console.log('sampleSelected :' + element.sampleSelected);
        if(element.sampleSelected){
          if(isFirst){
            this.selectedBarcodes += element.barcodeNo;
            isFirst = false;
          }else{
            this.selectedBarcodes += ',' + element.barcodeNo;
          }
        }
      });

    }

    rerender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first      
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