import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DataService } from '../../../shared/data.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { chcshipmentService } from 'src/app/shared/centrallab/central-shipment.service';
import { HttpErrorResponse } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
declare var $: any
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-central-pick-pack-start',
  templateUrl: './central-pick-pack-start.component.html',
  styleUrls: ['./central-pick-pack-start.component.css']
})
export class CentralPickPackStartComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: true})  dtElement: DataTableDirective;
  errorMessage: string;
  errorSpouseMessage: string;
  pickpackStartList = [];
  negativeList = [];
  showUploadResult = false;
  firstFormGroup: FormGroup;

  firstFormCheck = false;
  selectedlabTechnicianName;
  selectedcentralLab;
  selectedreceivingMolecularLab = null;
  selecteddeliveryExecutiveName;

  centralReceiptsData: any[] = [];
  tempCHCData = [];
  popupData:any;
  processingDate;
  searchbarcode;
  user;
  chcUploadResponse;
 
  //missing models
  selectedlogisticsServiceProvider: any;
  selectedMobile: any;

  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: new Date(Date.now()),
    maxDate: new Date(Date.now())
  };
  startOptions1: FlatpickrOptions = {
    mode: 'single',
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: new Date(Date.now()),
    maxDate: new Date(Date.now())
  };

  selectedshipmentDate = new Date(Date.now());
  selectedshipmentTime = new Date(Date.now());
  molecularLabData = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    zone: NgZone,
    private route: ActivatedRoute,
    private DataService:DataService,
    private tokenService: TokenService,
    private chcshipmentService: chcshipmentService,
    private _formBuilder: FormBuilder,
    private masterService: masterService,
    private router: Router,
    private dataservice: DataService
    ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "Central Lab", "page": "Pick & Pack"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));

    this.firstFormGroup = this._formBuilder.group({
      labTechnicianName : ['', Validators.required],
      centralLab: ['', Validators.required],
      receivingMolecularLab: ['', Validators.required],
      logisticsServiceProvider : ['', Validators.required],
      deliveryExecutiveName: ['', Validators.required],
      contactNumber: ['', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
      shipmentDate: ['', Validators.required],
      shipmentTime: ['', Validators.required]
   });

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
    
    this.centralReceiptsData = [];
    var centralReceiptsArr = this.route.snapshot.data.positiveSubjects;
    if(centralReceiptsArr !== undefined && centralReceiptsArr.status.toString() === "true"){
      var _tempData = centralReceiptsArr.pickandPack;
      var _tempReceivedData = JSON.parse(JSON.stringify(centralReceiptsArr.pickandPack));
      if(this.DataService.getdata().centralpickpackstart != undefined)
      {
        this.pickpackStartList = this.DataService.getdata().centralpickpackstart;
        this.pickpackStartList.forEach((obj)=>{
          var existNotification = _tempData.findIndex(({barcodeNo}) => obj.barcodeNo == barcodeNo);
          _tempData.splice(existNotification,1);
        });
        this.showUploadResult = true;
      }
      
        this.centralReceiptsData = _tempData;
        this.tempCHCData = JSON.parse(JSON.stringify(_tempData));
        this.DataService.sendData(JSON.stringify({'screen':'centralpickpack','page':"","pendingcount":this.centralReceiptsData.length,"startpickCount":this.pickpackStartList.length,"module": "Central Lab", "pagealter": "Pick & Pack"}));
      
    }
    else{
      this.errorMessage = centralReceiptsArr.message;
    }
    
  }

  getMolecularLab()
  {
    this.masterService.retriveMocularLab()
    .subscribe(response => {
      console.log(response);
      this.molecularLabData = response.molecularLab;
    },
    (err: HttpErrorResponse) =>{
    });
  }
  searchBarCodetype()
  {

    let term = this.searchbarcode;
    console.log(term);
    var _index = this.tempCHCData.findIndex(com => com.barcodeNo === term);
    console.log(_index);
    if(_index >= 0)
    {
      this.pickpackStartList.push(this.tempCHCData[_index]);
      this.tempCHCData.splice(_index,1);
      this.searchbarcode = ""; 
      this.DataService.setdata({'centralpickpackstart':this.pickpackStartList});
      this.showUploadResult = true;
      this.DataService.sendData(JSON.stringify({'screen':'centralpickpack','page':"","pendingcount":this.tempCHCData.length,"startpickCount":this.pickpackStartList.length, "module": "Central Lab", "pagealter": "Pick & Pack"}));
      this.rerender();
    } 

  }
  clicksearchBarcode()
  {
    console.log(this.searchbarcode);
  }

  removeItem(index)
  {
    this.tempCHCData.push(this.pickpackStartList[index]);
    this.pickpackStartList.splice(index,1);
    this.rerender();
    this.DataService.sendData(JSON.stringify({'screen':'centralpickpack','page':"","pendingcount":this.tempCHCData.length,"startpickCount":this.pickpackStartList.length, "module": "Central Lab", "pagealter": "Pick & Pack"}));
    this.DataService.setdata({'centralpickpackstart':this.pickpackStartList});
    Swal.fire({ allowOutsideClick: false,
      position: 'top-end',
      icon: 'success',
      title: 'Back to Ship',
      showConfirmButton: false,
      timer: 2000
    })
    if(this.pickpackStartList.length == 0)
        this.showUploadResult = false;
  }

  createShipment()
  {
    this.getMolecularLab();
    this.selectedlabTechnicianName = this.user.name;
    this.selectedcentralLab = this.user.centralLabName;
    $('#fadeinModal').modal('show');
  }
  submitShipment()
  {
      this.firstFormCheck = true;
      console.log(this.firstFormGroup.valid);

  console.log(this.pickpackStartList);
  if(this.firstFormGroup.valid)
  {
      var _tempBarcode;
      this.pickpackStartList.forEach(function(val,index){
          if(index===0)
              _tempBarcode = val.barcodeNo;
          else
              _tempBarcode += ","+val.barcodeNo;
      });
      var _obj = {};
      _obj['barcodeNo'] = _tempBarcode;
      _obj['labTechnicianName'] = this.firstFormGroup.get('labTechnicianName').value;
      _obj['centralLabUserId'] = this.user.id;
      _obj['centralLabId'] = this.user.centralLabId;
      _obj['centralLabLocation'] = this.firstFormGroup.get('centralLab').value;;
      _obj['receivingMolecularLabId'] = Number(this.firstFormGroup.get('receivingMolecularLab').value);
      _obj['logisticsProviderName'] = this.firstFormGroup.get('logisticsServiceProvider').value;
      _obj['deliveryExecutiveName'] = this.firstFormGroup.get('deliveryExecutiveName').value;
      _obj['executiveContactNo'] = ''+this.firstFormGroup.get('contactNumber').value;
      _obj['dateOfShipment'] = moment(new Date(this.firstFormGroup.get('shipmentDate').value)).format("DD/MM/YYYY"),
      _obj['timeOfShipment'] = moment(new Date(this.firstFormGroup.get('shipmentTime').value)).format("hh:mm"),
      _obj['source'] = "N";

      console.log(_obj);

      this.chcshipmentService.addShipment(_obj)
      .subscribe(response => {
        this.chcUploadResponse = response;
        if (this.chcUploadResponse !== null && this.chcUploadResponse.status === "true") {
          Swal.fire({ allowOutsideClick: false,icon:'success', title: 'Shipment ID is '+this.chcUploadResponse.shipment.shipmentId,
          showCancelButton: true, confirmButtonText: 'Shipment Log', cancelButtonText: 'Close' })
             .then((result) => {
                $('#fadeinModal').modal('hide');
               if (result.value) {
                this.router.navigateByUrl(`app/central-shipment`);
               }
               else{
                this.firstFormGroup.reset();
                //this.router.navigateByUrl(`app/central-pickpack`);
                this.DataService.deleteProp('centralpickpackstart');
                this.pickpackStartList = [];
                this.DataService.sendData(JSON.stringify({'screen':'centralpickpack','page':"","pendingcount":this.tempCHCData.length,"startpickCount":this.pickpackStartList.length, "module": "Central Lab", "pagealter": "Pick & Pack"}));
               }
     
            });
        } else {
          this.errorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          //this.showResponseMessage(err.toString(), 'e');
        });
    }
  
  }
  submitNegativeResult()
  {
    Swal.fire({ allowOutsideClick: false,
      title: 'Are you sure?',
      text: "Submit the positive results",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#ffffff'
    }).then((result) => {
      if (result.value) {
        var _tempArr = [];
        this.pickpackStartList.forEach(function(val,index){
          var _obj = {};
          _obj['isPositive'] = true;
          _obj['createdBy'] = this.user.id;
          _obj['testingCHCId'] = this.user.chcId;
          _obj['subjectId'] = val.subjectId;
          _obj['barcodeNo'] = val.barcodeNo;
          _tempArr.push(_obj);
        }.bind(this));
        this.chcshipmentService.addShipment({"ssTestRequest":_tempArr})
      .subscribe(response => {
        this.chcUploadResponse = response;
        if (this.chcUploadResponse !== null && this.chcUploadResponse.status === "true") {
            Swal.fire({ allowOutsideClick: false,
              text: 'Positive results submitted successfully.',
              icon: 'success'
            }).then((result) => {
              var _tempPositiveLength = this.pickpackStartList.length;
              this.pickpackStartList = [];
              this.DataService.sendData(JSON.stringify({'screen':'SST','page':"received","positivecount":this.pickpackStartList.length,"negativecount":this.negativeList.length,"receivedcount":this.centralReceiptsData.length-_tempPositiveLength-this.negativeList.length, "module": "Central Lab", "pagealter": "Pick & Pack"}));
              this.DataService.deleteProp('centralpickpackstart');
              this.showUploadResult = false;
            });
        } else {
          
          this.errorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          //this.showResponseMessage(err.toString(), 'e');
        });
        
      }
    })
  }

    rerender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first      
        //dtInstance.clear();
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
