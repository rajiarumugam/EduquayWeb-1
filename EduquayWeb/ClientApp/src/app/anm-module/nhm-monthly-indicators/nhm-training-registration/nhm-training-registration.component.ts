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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddScreenService } from 'src/app/shared/NHM-Monthly-Indicators/add-screen/add-screen.service';
import { AddScreenDataResponse } from 'src/app/shared/NHM-Monthly-Indicators/add-screen/add-screen-response';
import { LoaderService } from 'src/app/shared/loader/loader.service';

declare var exposedFunction;


@Component({
  selector: 'app-nhm-training-registration',
  templateUrl: './nhm-training-registration.component.html',
  styleUrls: ['./nhm-training-registration.component.css']
})
export class NHMTrainingRegistrationComponent implements OnInit {
  //@ViewChild('f', { static: false }) subRegBasic: NgForm;

  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild('dorPicker', { static: false }) DORPicker;
  @ViewChild('dobPicker', { static: false }) DOBPicker;
  @ViewChild('lmpdatePicker', { static: false }) LMPPicker;

  issubmitted=false;
  DAY = 86400000;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";  
  districts: District[] = [];
  erroMessage: string;
  pndPendingArray=[];
  firstFormGroup: FormGroup;
  selectedDistrict ;
  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'F Y',
    altFormat:'F Y',
    defaultDate: new Date(Date.now()),
   disable:[
     function(date)
     {
      return (date.getDate() > 1)
     }
   ]
  };
  
  selecteddor = new Date(Date.now());
  user;
  createdSubjectId="";
  showentry:boolean=false;
  ageValidate = false;
  MonthId: any;
  YearId: any;
  PlannedDLO: any;
  HeldDLO: any;
  TotalParticipantsDLO: any;
  PlannedTOT: any;
  HeldTOT: any;
  TotalParticipantsTOT: any;
  TotalBlockBLA: any;
  HeldBLA: any;
  dateform:FormGroup;
  TotalParticipantsBLA: any;
  TotalANMBLAO: any;
  TotalANMBLA: any;
  addTrainingResponse:AddScreenDataResponse;
  HeldBLAO: any;
  TotalParticipantsBLAO: any;
  PlannedLMTS: any;
  HeldLMTS: any;
  TotalParticipantsLMTS: any;
  screenlistErrorMessage: string;
  TotalBlockBLAO: any;
  constructor(private masterService: masterService, 
    zone: NgZone,
    private _formBuilder: FormBuilder,
    private httpClientService:HttpClientService,
    private genericService: GenericService,
    private tokenService: TokenService,
    private router: Router, 
    private PNDTCmasterService: PNDTCmasterService, 
    private dataservice: DataService,
    private modalService: NgbModal,
    private addtrainingService:AddScreenService ,
    private loaderService:LoaderService
    ) {
    window['angularComponentReference'] = {
      zone: zone,
      componentFn: (id, value) => this.callFromOutside(id, value),
      component: this,
    };
  }

  ngOnInit() {   
    
    this.dataservice.sendData(JSON.stringify({"module": "ANM", "submodule": "Subject Registration", "page": "Antenatal Woman Registration"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.dateform = this._formBuilder.group({
      fromDate:[''],
      
   });
   this.getDistrictData();
    
    this.getDistrictData();    
  }

  public callFromOutside(id, subject: any): any {
    let subjectdetail = JSON.parse(subject);
  }
  selected(eventval){
    console.log(eventval);
  }


  
  onchangedistrict(sd)
  {
 
console.log(sd,"test",sd!=="0: 0")
console.log(this.districts,'ttt')   
if (sd!=="0: 0" && this.dateform.value.fromDate!= null && this.dateform.value.fromDate!='' && this.dateform.value.fromDate!=undefined ) {
  // var tempdate= new Date(this.dateform.value.fromDate);
  var _subjectObj = {
    "monthId":new Date(this.dateform.value.fromDate).getMonth()+1,
    "YearId":new Date(this.dateform.value.fromDate).getFullYear(),
    districtId:+this.selectedDistrict
  }
  this.addtrainingService.addtrainingreport(_subjectObj).subscribe(async response => {
    this.pndPendingArray = response.data
    if(this.pndPendingArray.length>=0){
      this.PlannedDLO=this.pndPendingArray[0].plannedDLO,
      this.HeldDLO=this.pndPendingArray[0].heldDLO,
      this.TotalParticipantsDLO=this.pndPendingArray[0].totalParticipantsDLO,
      this.PlannedTOT=this.pndPendingArray[0].plannedTOT,
      this.HeldTOT=this.pndPendingArray[0].heldTOT,
      this.TotalParticipantsTOT=this.pndPendingArray[0].totalParticipantsTOT,
      this.TotalBlockBLA=this.pndPendingArray[0].totalblockANM,
      this.HeldBLA=this.pndPendingArray[0].heldANM,
      this.TotalParticipantsBLA=this.pndPendingArray[0].totalParticipantsANM,
      this.TotalANMBLA=this.pndPendingArray[0].totalANMDistrictBLA,
      this.TotalANMBLAO=this.pndPendingArray[0].totalblockANMO,
      this.HeldBLAO=this.pndPendingArray[0].heldANMO,
      this.TotalParticipantsBLAO=this.pndPendingArray[0].totalParticipantsANMO,
      this.TotalBlockBLAO=this.pndPendingArray[0].totalANMDistrictBLAO,
      this.PlannedLMTS=this.pndPendingArray[0].plannedLMT,
      this.HeldLMTS=this.pndPendingArray[0].heldLMT,
     this.TotalParticipantsLMTS=this.pndPendingArray[0].totalParticipantsLMT
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
    if(this.checkNullOrUndefined (this.PlannedDLO) || this.checkNullOrUndefined (this.HeldDLO) || this.checkNullOrUndefined (this.TotalParticipantsDLO)
    || this.checkNullOrUndefined (this.PlannedTOT) || this.checkNullOrUndefined (this.HeldTOT) || this.checkNullOrUndefined (this.TotalParticipantsTOT) 
    || this.checkNullOrUndefined (this.TotalBlockBLA) || this.checkNullOrUndefined (this.HeldBLA) || this.checkNullOrUndefined (this.TotalParticipantsBLA)
    || this.checkNullOrUndefined (this.TotalANMBLA) || this.checkNullOrUndefined (this.TotalBlockBLAO)|| this.checkNullOrUndefined (this.HeldBLAO)
    || this.checkNullOrUndefined (this.TotalParticipantsBLAO) || this.checkNullOrUndefined (this.TotalANMBLAO) || this.checkNullOrUndefined (this.PlannedLMTS)
    || this.checkNullOrUndefined (this.HeldLMTS)  || this.checkNullOrUndefined (this.TotalParticipantsLMTS)){
      Swal.fire({
        title: 'Fill Empty',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
         this.PlannedDLO='null',
         this.PlannedLMTS='null',
         this.HeldBLA='null',
         this.HeldBLAO='null',
         this.HeldLMTS='null',
         this.HeldTOT='null',
         this.LMPPicker='null',
         this.PlannedTOT='null',
         this.TotalANMBLA='null',
         this.TotalANMBLAO='null',
         this.TotalBlockBLA='null',
         this.TotalParticipantsBLA='null',
         this.TotalParticipantsBLAO='null',
         this.TotalParticipantsDLO='null',
         this.TotalParticipantsLMTS='null',
         this.TotalParticipantsTOT='null',
       this.TotalBlockBLAO='null',
         this.HeldDLO='null'
        }
      })
    }
  }

  onChangeMonth(fromDate)
  {
    console.log(this.selectedDistrict,"selectedDistrict")
    if(this.dateform.value.fromDate!= null && this.dateform.value.fromDate!=''  && this.selectedDistrict!==undefined && this.selectedDistrict!=undefined)
    {
      this.showentry=true;
    }
    else
    {
      this.showentry=false;
    }
  }

  getDistrictData(){
    this.PNDTCmasterService.getPNDTCDistrict()
    .subscribe(response => {
      console.log(response);
      this.districts = response['data'];
      //this.selectedDistrict = this.user.districtId;
    },
    (err: HttpErrorResponse) =>{
      this.districts = [];
      //this.erroMessage = err.toString();
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

  checkNullOrUndefined(checkvariable)
  {
    if(checkvariable!=null && checkvariable!=undefined && String(checkvariable)!=''){
      return true
    }
    else{
      return false
    }
  }
  onSubmit(){
    this.issubmitted=true;
    if(this.checkNullOrUndefined (this.PlannedDLO) && this.checkNullOrUndefined (this.HeldDLO) && this.checkNullOrUndefined (this.TotalParticipantsDLO)
     && this.checkNullOrUndefined (this.PlannedTOT) && this.checkNullOrUndefined (this.HeldTOT) && this.checkNullOrUndefined (this.TotalParticipantsTOT) 
     && this.checkNullOrUndefined (this.TotalBlockBLA) && this.checkNullOrUndefined (this.HeldBLA) && this.checkNullOrUndefined (this.TotalParticipantsBLA)
     && this.checkNullOrUndefined (this.TotalANMBLA) && this.checkNullOrUndefined (this.TotalBlockBLAO)&& this.checkNullOrUndefined (this.HeldBLAO)
     && this.checkNullOrUndefined (this.TotalParticipantsBLAO) && this.checkNullOrUndefined (this.TotalANMBLAO) && this.checkNullOrUndefined (this.PlannedLMTS)
     && this.checkNullOrUndefined (this.HeldLMTS)  && this.checkNullOrUndefined (this.TotalParticipantsLMTS)) 
    {
      this.MonthId=new Date(this.dateform.value.fromDate).getMonth()+1;
      this.YearId=new Date(this.dateform.value.fromDate).getFullYear()
    var _obj = {
      districtId:+(this.selectedDistrict),
      MonthId: this.MonthId,
      YearId: this.YearId,
      plannedDLO: +(this.PlannedDLO),
      heldDLO: +(this.HeldDLO),
      totalParticipantsDLO: +(this.TotalParticipantsDLO),
      plannedTOT: +(this.PlannedTOT),
      heldTOT: +(this.HeldTOT),
      totalParticipantsTOT: +(this.TotalParticipantsTOT),
      totalblockANM: +(this.TotalBlockBLA),
      heldANM: +(this.HeldBLA),
      totalParticipantsANM:+(this.TotalParticipantsBLA),
      totalANMDistrictBLA: +(this.TotalANMBLA),
      totalblockANMO: +(this.TotalBlockBLAO),
      heldANMO: +(this.HeldBLAO),
      totalParticipantsANMO: +(this.TotalParticipantsBLAO),
      totalANMDistrictBLAO: +(this.TotalANMBLAO),
      plannedLMT: +(this.PlannedLMTS),
      heldLMT: +(this.HeldLMTS),
      totalParticipantsLMT: +(this.TotalParticipantsLMTS),
      userId: this.user.id
    };

console.log(_obj,"obj")
    let damagedsampleCollection = this.addtrainingService.addtraining(_obj)
    .subscribe(response => {
      this.addTrainingResponse = response;
      if(this.addTrainingResponse !== null && this.addTrainingResponse.status === "true"){
        this.showResponseMessage(this.addTrainingResponse.message, 's')
        
      }else{
        this.showResponseMessage(this.addTrainingResponse.message, 'e');
                this.screenlistErrorMessage = response.message;
      }

    },
    (err: HttpErrorResponse) => {
      this.showResponseMessage(err.toString(), 'e');
      this.screenlistErrorMessage = err.toString();
    });
  }  
  }
   
}
