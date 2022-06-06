import { Component, OnInit, Pipe, NgZone, ViewChild, NgModule } from '@angular/core';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { DistrictResponse, District } from 'src/app/shared/master/district/district.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { HttpClientService } from '../../../shared/http-client.service';
import { ENDPOINT } from '../../../app.constant';
import { GenericService } from '../../../shared/generic.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { TokenService } from 'src/app/shared/token.service';
declare var $: any 
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { PNDTCmasterService } from "src/app/shared/pndtc/pndtc-masterdata.service";
import { AddScreenService } from 'src/app/shared/NHM-Monthly-Indicators/add-screen/add-screen.service';
import { AddScreenDataRequest } from 'src/app/shared/NHM-Monthly-Indicators/add-screen/add-screen-request';
import { AddScreenDataResponse } from 'src/app/shared/NHM-Monthly-Indicators/add-screen/add-screen-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { LoaderService } from 'src/app/shared/loader/loader.service';

declare var exposedFunction;


@Component({
  selector: 'app-nhm-screen-registration',
  templateUrl: './nhm-screen-registration.component.html',
  styleUrls: ['./nhm-screen-registration.component.css']
})

export class NHMScreenRegistrationComponent implements OnInit {
  //@ViewChild('f', { static: false }) subRegBasic: NgForm;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  dtTrigger: Subject<any> = new Subject();
  DAY = 86400000;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";  
  districts: District[] = [];
  erroMessage: string;
  selectedDistrict ;
  pndPendingArray=[];
  screenListRequest: AddScreenDataRequest;
  addScreenResponse: AddScreenDataResponse;
  dateform:FormGroup;
  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'F Y',
    altFormat:'F Y',
    defaultDate: new Date(Date.now()),
    "disable": [
      function(date) {
          // return true to disable
          return (date.getDate() > 1);
      }
  ],
  };
  user;
  showentry:boolean=false;
  issubmitted=false;
  ANCSampled: any;
  MonthofActivities: any;
  Totalblocks: any;
  BlockCollectingSamples: any;
  Cellcountersites: any;
  ANCRegistered: any;
  CollectedbyANM: any;
  ShippedtoTCHC: any;
  EntryByANM: any;
  ReceivedByCHC: any;
  SamplesTested: any;
  FoundCarrier: any;
  SpouseTested: any;
  screenlistErrorMessage: string;
  CoupleFoundBothcarrier: any;
  NoofMTP: any;
  NoofCVS: any;
  MonthId: any;
  YearId: any;
  selectedDistricts: any;
  constructor(private masterService: masterService,
     zone: NgZone,
     private _formBuilder: FormBuilder,
     private modalService: NgbModal,
     private httpClientService:HttpClientService,
     private genericService: GenericService,
     private tokenService: TokenService,
     private router: Router, 
     private PNDTCmasterService: PNDTCmasterService,
     private dataservice: DataService,
     private addscreenservice: AddScreenService,
     private loaderService:LoaderService) {
    window['angularComponentReference'] = {
      zone: zone,
      componentFn: (id, value) => this.callFromOutside(id, value),
      component: this,
    };
  }

  ngOnInit() {   
    
    this.dataservice.sendData(JSON.stringify({"module": "ANM", "submodule": "Subject Registration", "page": "Antenatal Woman Registration"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.getDistrictData(); 
    this.dateform = this._formBuilder.group({
      fromDate: [''],
      toDate: ['']
    });
    // this.selectedDistricts="0: 0"
  }

  public callFromOutside(id, subject: any): any {
    let subjectdetail = JSON.parse(subject);
  }
  selected(eventval){
    console.log(eventval);
  }
 
  

  getDistrictData(){
    this.PNDTCmasterService.getPNDTCDistrict()
    .subscribe(response => {
      console.log(response);
      this.districts = response['data'];
      //this.selectedDistrict = this.user.districtId;
      console.log(this.districts,"districts")
    },
    (err: HttpErrorResponse) =>{
      this.districts = [];
      //this.erroMessage = err.toString();
    });
  }
  CalculatePercentage(chclt,tchc){
  if(chclt!=0){
  var percentage= ((chclt/tchc)*100).toFixed(2)
  return percentage
  }
  else
  return 0
}


  onChangeMonth(fromDate)
  {
    console.log(this.selectedDistricts,"selectedDistrict")
    if(this.dateform.value.fromDate!= null && this.dateform.value.fromDate!='' && this.dateform.value.fromDate!=undefined && this.selectedDistricts!==undefined)
    {
  var _subjectObj={
  MonthId: new Date(this.dateform.value.fromDate).getMonth()+1,
  YearId: new Date(this.dateform.value.fromDate).getFullYear(),
  districtId: +this.selectedDistricts
  }
  this.addscreenservice.addscreenreport(_subjectObj).subscribe(async response => {
    this.pndPendingArray = response.data
    if(this.pndPendingArray.length>=0){
      this.MonthofActivities=this.pndPendingArray[0].monthOfOnSetOfActivities,
      this.Totalblocks=this.pndPendingArray[0].totalBlocks,
      this.BlockCollectingSamples=this.pndPendingArray[0].blocksCollectingSamples,
      this.Cellcountersites=this.pndPendingArray[0].cellCountersitesActive,
      this.ANCRegistered=this.pndPendingArray[0].totalANCRegisteredHMActiveBlocks,
      this.ANCSampled=this.pndPendingArray[0].anCsSampled,
      this.CollectedbyANM=this.pndPendingArray[0].noOfSamplesCollectedByANM,
      this.ShippedtoTCHC=this.pndPendingArray[0].numberShippedToTheTCHC,
      this.EntryByANM=this.pndPendingArray[0].dataEntryByANM,
      this.ReceivedByCHC=this.pndPendingArray[0].samplesReceivedByCHCLT,
      this.SamplesTested=this.pndPendingArray[0].samplesTestedByCHCLT,
      this.FoundCarrier=this.pndPendingArray[0].foundCarrierDiseased,
      this.SpouseTested=this.pndPendingArray[0].spouseTested,
      this.CoupleFoundBothcarrier=this.pndPendingArray[0].coupleFoundBothCarrier,
      this.NoofMTP=this.pndPendingArray[0].numberOfMTP,
      this.NoofCVS=this.pndPendingArray[0].numberOfCVS
     this.loaderService.display(false);
    } 
  },
  (err: HttpErrorResponse) =>{
    this.loaderService.display(false);
  });
      this.showentry=true;
    }
    else
    {
      this.showentry=false;
    }
  }
 
  onchangedistrict(sd)
  {
 
console.log(sd,"test",sd!=="0: 0")
// this.selectedDistricts=sd;
console.log(this.districts,'ttt')   
if (sd!=="0: 0" && this.dateform.value.fromDate!= null && this.dateform.value.fromDate!='' && this.dateform.value.fromDate!=undefined ) 
{
  var _subjectObj={
  MonthId: new Date(this.dateform.value.fromDate).getMonth()+1,
  YearId: new Date(this.dateform.value.fromDate).getFullYear(),
  districtId: +this.selectedDistricts
  }
  this.addscreenservice.addscreenreport(_subjectObj).subscribe(async response => {
    this.pndPendingArray = response.data
    if(this.pndPendingArray.length>=0){
      this.MonthofActivities=this.pndPendingArray[0].monthOfOnSetOfActivities,
      this.Totalblocks=this.pndPendingArray[0].totalBlocks,
      this.BlockCollectingSamples=this.pndPendingArray[0].blocksCollectingSamples,
      this.Cellcountersites=this.pndPendingArray[0].cellCountersitesActive,
      this.ANCRegistered=this.pndPendingArray[0].totalANCRegisteredHMActiveBlocks,
      this.ANCSampled=this.pndPendingArray[0].anCsSampled,
      this.CollectedbyANM=this.pndPendingArray[0].noOfSamplesCollectedByANM,
      this.ShippedtoTCHC=this.pndPendingArray[0].numberShippedToTheTCHC,
      this.EntryByANM=this.pndPendingArray[0].dataEntryByANM,
      this.ReceivedByCHC=this.pndPendingArray[0].samplesReceivedByCHCLT,
      this.SamplesTested=this.pndPendingArray[0].samplesTestedByCHCLT,
      this.FoundCarrier=this.pndPendingArray[0].foundCarrierDiseased,
      this.SpouseTested=this.pndPendingArray[0].spouseTested,
      this.CoupleFoundBothcarrier=this.pndPendingArray[0].coupleFoundBothCarrier,
      this.NoofMTP=this.pndPendingArray[0].numberOfMTP,
      this.NoofCVS=this.pndPendingArray[0].numberOfCVS
     this.loaderService.display(false);
    } 
  },
  (err: HttpErrorResponse) =>{
    this.loaderService.display(false);
  });
      this.showentry=true;
    }
    else
    {
      this.showentry=false;
    }

    if((this.checkNullOrUndefined (this.MonthofActivities) || this.checkNullOrUndefined (this.Totalblocks) || this.checkNullOrUndefined (this.BlockCollectingSamples)
    || this.checkNullOrUndefined (this.Cellcountersites) || this.checkNullOrUndefined (this.ANCRegistered) || this.checkNullOrUndefined (this.ANCSampled) 
    || this.checkNullOrUndefined (this.CollectedbyANM) || this.checkNullOrUndefined (this.ShippedtoTCHC) || this.checkNullOrUndefined (this.EntryByANM)
    || this.checkNullOrUndefined (this.ReceivedByCHC) || this.checkNullOrUndefined (this.SamplesTested)|| this.checkNullOrUndefined (this.FoundCarrier)
    || this.checkNullOrUndefined (this.SpouseTested) || this.checkNullOrUndefined (this.CoupleFoundBothcarrier) || this.checkNullOrUndefined (this.NoofMTP)
    || this.checkNullOrUndefined (this.NoofCVS))){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
         this.ANCRegistered=null,
         this.ANCSampled=null,
         this.BlockCollectingSamples=null,
         this.Cellcountersites=null,
         this.CollectedbyANM=null,
         this.CoupleFoundBothcarrier=null,
         this.EntryByANM=null,
         this.FoundCarrier=null,
         this.MonthofActivities=null,
         this.NoofCVS=null,
         this.NoofMTP=null,
         this.ReceivedByCHC=null,
         this.SamplesTested=null,
         this.ShippedtoTCHC=null,
         this.SpouseTested=null,
         this.Totalblocks=null
        }
      })
    }
  }
    
    
 

  checkNullOrUndefined(checkvariable)
  {
    if(checkvariable!=null && checkvariable !=undefined && String(checkvariable) !="" ){
     return true
    }
    else{
    return false
  }
  }

  onSubmit(){
    this.issubmitted=true;
    if(this.checkNullOrUndefined (this.MonthofActivities) && this.checkNullOrUndefined (this.Totalblocks) && this.checkNullOrUndefined (this.BlockCollectingSamples)
     && this.checkNullOrUndefined (this.Cellcountersites) && this.checkNullOrUndefined (this.ANCRegistered) && this.checkNullOrUndefined (this.ANCSampled) 
     && this.checkNullOrUndefined (this.CollectedbyANM) && this.checkNullOrUndefined (this.ShippedtoTCHC) && this.checkNullOrUndefined (this.EntryByANM)
     && this.checkNullOrUndefined (this.ReceivedByCHC) && this.checkNullOrUndefined (this.SamplesTested)&& this.checkNullOrUndefined (this.FoundCarrier)
     && this.checkNullOrUndefined (this.SpouseTested) && this.checkNullOrUndefined (this.CoupleFoundBothcarrier) && this.checkNullOrUndefined (this.NoofMTP)
     && this.checkNullOrUndefined (this.NoofCVS)) 
    {
       this.MonthId = new Date(this.dateform.value.fromDate).getMonth()+1;
       this.YearId= new Date(this.dateform.value.fromDate).getFullYear();
    var _obj = {
      districtId: +(this.selectedDistricts),
      MonthId: this.MonthId,
      YearId: this.YearId,
      MonthOfOnSetOfActivities: +(this.MonthofActivities),
      totalBlocks: +(this.Totalblocks),
      blocksCollectingSamples: +(this.BlockCollectingSamples),
      cellCountersitesActive: +(this.Cellcountersites),
      totalANCRegisteredHMActiveBlocks: +(this.ANCRegistered),
      anCsSampled: +(this.ANCSampled),
      noOfSamplesCollectedByANM: +(this.CollectedbyANM),
      numberShippedToTheTCHC: +(this.ShippedtoTCHC),
      dataEntryByANM:this.CalculatePercentage(this.ShippedtoTCHC,this.CollectedbyANM),
      samplesReceivedByCHCLT: +(this.ReceivedByCHC),
      samplesTestedByCHCLT: +(this.SamplesTested),
      foundCarrierDiseased: +(this.FoundCarrier),
      spouseTested: +(this.SpouseTested),
      coupleFoundBothCarrier: +(this.CoupleFoundBothcarrier),
      numberOfMTP: +(this.NoofMTP),
      numberOfCVS: +(this.NoofCVS),
      userId: this.user.id
    };
console.log(_obj,"obj")
    let damagedsampleCollection = this.addscreenservice.addscreen(_obj)
    .subscribe(response => {
      this.addScreenResponse = response;
      if(this.addScreenResponse !== null && this.addScreenResponse.status === "true"){
        this.showResponseMessage(this.addScreenResponse.message, 's')
        
      }else{
        this.showResponseMessage(this.addScreenResponse.message, 'e');
                this.screenlistErrorMessage = response.message;
      }

    },
    (err: HttpErrorResponse) => {
      this.showResponseMessage(err.toString(), 'e');
      this.screenlistErrorMessage = err.toString();
    });
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

   
    showResponseMessage(message: string, type: string){
      var messageType = '';
      if(type === 'e'){
        Swal.fire({icon:'error', title: message, confirmButtonText: 'Close', allowOutsideClick: false})
      }
      else{
        Swal.fire({icon:'success', title: message, confirmButtonText: 'Close', allowOutsideClick: false})
        .then((result) => {
          if (result.value) {
            if(this.modalService.hasOpenModals){
              this.modalService.dismissAll();
            }
            this.router.navigate(['/app/nhm-subregn']);
          }
        });
      }
    }

   

  
}
