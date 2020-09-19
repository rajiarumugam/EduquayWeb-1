import { Component, OnInit,HostListener,QueryList,ElementRef,ViewChildren,ViewChild } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { Router } from '@angular/router';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
declare var $: any;
import { HttpErrorResponse } from '@angular/common/http';
import { pathoHPLCService } from "../../../shared/pathologist/patho-hplc.service";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import {Location} from '@angular/common';
import * as moment from 'moment';
import { PNDTCmasterService } from "../../../shared/pndtc/pndtc-masterdata.service";
import { MTPService } from "../../../shared/mtp/mtp.service";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FlatpickrOptions } from 'ng2-flatpickr';


@Component({
  selector: 'app-mtp-testing-results',
  templateUrl: './mtp-testing-results.component.html',
  styleUrls: ['./mtp-testing-results.component.css']
})
export class MTPTestingResultsComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  @ViewChild('multiSelect',{static:false}) multiSelect;
  @ViewChild('dorPicker', { static: false }) DORPicker;
  receivedSampleCount;
  uploadCBCCount = 0;
  currentPage = "";
  testingPNDData;
  counsellerName;
  selectedcounsellerName;
  selectedpndtDate;
  firstFormCheck = false;
  secondFormCheck = false;
  selectedclinicalHistory;
  selectedexamination;
  selectedprocedureOfTesting;
  selectedPNDTResults = null;
  POTDiagnosis= [];
  POTResultData = [];
  selectedothercomp;

  complicationsdata = [];
  settings = {};
  selectedcomplicationsItems = [];

  POTData =[];
  selectedotherPOT;
  selectedanyOtherComplications = false;

  diagnosisReportData;
  clinicalDiagnosisMasterData = [];
  clinicalDiagnosisData = [];
  HPLCmasterData= [];
  FormGroup: FormGroup;
  secondFormGroup: FormGroup;
  testResultGroup: FormGroup;
  ordersData = [];
  user;
  diagnosisReportResponse;
  selectedObstetricianName;
  selectedPNDTDiagnosis = null;

  selectedDiagnosis = null;
  selectedconditionAtDischarge = null;;

  tempHPLCmasterChecked = "";
  showOthersTextbox = false;
  showConfirmEditLater = false;
  selectedRemarks = "";
  SelecteddiagnosticSummary = "";
  selectedpathologistName = "";
  selectedOthers;
  fselectedMotherVoided;

  selectedItems = [];
  minMTPDate;

  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y H:i',
    defaultDate:"",
    minDate: new Date(Date.now()),
    enableTime: true,
  };

  @HostListener('window:scroll')
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    //console.log('[scroll]', scrollPosition);

    if(scrollPosition > 180)
    {
        $('#showhidediv').show();
    }
    else
      $('#showhidediv').hide();
    
  }
  constructor(private DataService:DataService,private router: Router,private masterService: masterService,private pathoHPLCService:pathoHPLCService,private _formBuilder: FormBuilder,private tokenService: TokenService,private _location: Location,private PNDTCmasterService: PNDTCmasterService, private MTPService:MTPService) {

   
   }

  ngOnInit() {

   
    this.user = JSON.parse(this.tokenService.getUser('lu'));
   
   this.testResultGroup = this._formBuilder.group({
    orders: new FormArray([])
   })
    if(this.DataService.getdata().MTPtestingResult === undefined)
    {
      this.router.navigate(['/app/mtp-service']);
    }
    this.testingPNDData = this.DataService.getdata().MTPtestingResult;
    this.selectedcounsellerName = this.testingPNDData.pndtCounsellorName;
    this.selectedpndtDate = this.testingPNDData.mtpScheduleDate+" "+this.testingPNDData.mtpScheduleTime;
    this.minMTPDate = this.testingPNDData.postPNDTCounsellingDateTime;
    this.selectedObstetricianName = this.testingPNDData.postPNDTObstetricianName;
    console.log(this.DataService.getdata().MTPtestingResult);
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);

    
   
    this.FormGroup = this._formBuilder.group({
      pndtDate: ['', Validators.required],
      counsellorName: ['', Validators.required],
      obstetricianName: ['', Validators.required],
      clinicalHistory: ['', Validators.required],
      examination: ['', Validators.required],
      procedureOfTesting: ['', Validators.required],
      complications: ['' ,Validators.compose(
        [Validators.required]
      )],
      conditionAtDischarge: ['', Validators.required]
   });
   this.getMTPDiagnosis();
    this.getComplecations();
   
    

    
    if(this.testingPNDData.mtpClinicalHistory != undefined)
        this.selectedclinicalHistory = this.testingPNDData.mtpClinicalHistory;
    if(this.testingPNDData.mtpExamination != undefined)
        this.selectedexamination = this.testingPNDData.mtpExamination;
    if(this.testingPNDData.mtpProcedureOfTesting != undefined)
      this.selectedprocedureOfTesting = this.testingPNDData.mtpProcedureOfTesting;

    if(this.testingPNDData.dischargeConditionId != undefined)
      this.selectedconditionAtDischarge = this.testingPNDData.dischargeConditionId;

    
  }
  get f() { return this.FormGroup.controls; }
  public onFilterChange(item: any) {
    console.log(item);
  }
  public onDropDownClose(item: any) {
    console.log(item);
  }

  public onItemSelect(item: any) {
    this.selectedcomplicationsItems.push(item);
    console.log(this.selectedcomplicationsItems);
    
    console.log(item);
    if(item.id == 7)
      this.selectedanyOtherComplications = true;
  }
  public onDeSelect(item: any) {
    var _index = this.selectedcomplicationsItems.findIndex(com => com.id === item.id);
    this.selectedcomplicationsItems.splice(_index,1);
    console.log(_index);
    console.log(item);
    if(item.id == 7)
    this.selectedanyOtherComplications = false;
  }

  public onSelectAll(items: any) {
    console.log(items);
    this.selectedanyOtherComplications = true;
  }
  public onDeSelectAll(items: any) {
    console.log(items);
    this.selectedanyOtherComplications = false;
  }

  getMTPDiagnosis(){
    this.PNDTCmasterService.getMTPDischarge()
    .subscribe(response => {
      this.POTData = response['data'];
    },
    (err: HttpErrorResponse) =>{
      this.POTData = [];
      //this.erroMessage = err.toString();
    });
  }
  getComplecations(){
    this.PNDTCmasterService.getMTPComplications()
    .subscribe(response => {
      this.complicationsdata = response['data'];
      if(this.testingPNDData.mtpComplecationsId != undefined)
      {                        
          var _tempArr = this.testingPNDData.mtpComplecationsId.split(",");
          var  _tempSelecedArr = [];
          this.complicationsdata.forEach(element => {
            _tempArr.forEach(element1 => {
                if(element.id == element1)
                {
                  _tempSelecedArr.push(element);
                  this.selectedcomplicationsItems.push(element);
                }
            });
          });
          this.selectedItems = _tempSelecedArr;
      }
      

      this.settings = {
        singleSelection: false,
        idField: 'id',  
        textField: 'name',
        enableCheckAll: false,
        selectAllText: 'Select All',
        unSelectAllText: 'Deselect All',
        allowSearchFilter: false,
        limitSelection: -1,
        clearSearchFilter: true,
        maxHeight: 197,
        itemsShowLimit: 2,
        searchPlaceholderText: 'Search',
        noDataAvailablePlaceholderText: 'No data',
        closeDropDownOnSelection: false,
        showSelectedItemsAtTop: false,
        defaultOpen: false
      };
    },
    (err: HttpErrorResponse) =>{
      this.complicationsdata = [];
      //this.erroMessage = err.toString();
    });
  }

  getMTPDischargeCondition(){
    this.PNDTCmasterService.getMTPDischarge()
    .subscribe(response => {
      this.POTResultData = response['data'];
    },
    (err: HttpErrorResponse) =>{
      this.POTResultData = [];
      //this.erroMessage = err.toString();
    });
  }
  POTchange()
  {
      console.log(this.selectedprocedureOfTesting);
  }
  receivedSamples(event)
  {
    console.log(event);
  }

  pndSubmit(type)
  {
   
    console.log(type);
   var _obj = {};
  
    this.firstFormCheck = true;

      console.log(this.FormGroup.valid);
        if(this.FormGroup.valid && this.selectedcomplicationsItems.length > 0) 
        {

          var _tempComplectionData;
          this.selectedcomplicationsItems.forEach((element,index) => {
            if(index === 0)
              _tempComplectionData = element.id;
            else
            _tempComplectionData += ","+element.id;
          });
          _obj["mtpDateTime"] = typeof(this.selectedpndtDate) == 'object' ? moment(this.selectedpndtDate[0]).format('DD/MM/YYYY HH:mm') : this.selectedpndtDate;
          _obj['anwsubjectId'] = this.testingPNDData.anwSubjectId;
          _obj['spouseSubjectId'] = this.testingPNDData.spouseSubjectId;
          _obj['counsellorId'] = this.testingPNDData.postPNDTCounsellorId;
          _obj['obstetricianId'] = this.testingPNDData.postPNDTObstetricianId;
          _obj['userId'] = this.user.id;
          _obj['postPNDTCounsellingId'] = this.testingPNDData.postPNDTCounsellingId;
           _obj["clinicalHistory"] = this.FormGroup.get('clinicalHistory').value;
           _obj['examination'] = this.FormGroup.get('examination').value;
           _obj['mtpComplecationsId'] = _tempComplectionData;
           _obj['procedureOfTesting'] = this.FormGroup.get('procedureOfTesting').value;
           _obj['dischargeConditionId'] = Number(this.FormGroup.get('conditionAtDischarge').value);
           
           console.log(_obj);
           this.sendDataToService(_obj);
        }
  }
  
  sendDataToService(_obj)
  {
    this.MTPService.postMTPTest(_obj)
        .subscribe(response => {
          this.diagnosisReportResponse = response;
          if (this.diagnosisReportResponse !== null && this.diagnosisReportResponse.status === "true") {
              Swal.fire({ allowOutsideClick: false,
                text: 'MTP Updated Successfully.',
                icon: 'success'
              }).then((result) => {
                $('#modal-dailog').modal('hide');
               this.FormGroup.reset();
                this._location.back();
               
              });
          } else {
            
            //this.errorMessage = response.message;
          }
  
        },
          (err: HttpErrorResponse) => {
            //this.showResponseMessage(err.toString(), 'e');
          });
  }
  openPopup()
  {
    //$('#modal-dailog').show();
    $('#modal-dailog').modal('show');

    var _tempCurrentDate = this.testingPNDData.mtpScheduleDate.split('/')[2]+"-"+this.testingPNDData.mtpScheduleDate.split('/')[1]+"-"+this.testingPNDData.mtpScheduleDate.split('/')[0]+" "+this.testingPNDData.mtpScheduleTime;
    console.log(new Date(this.testingPNDData.mtpScheduleDate.split('/')[2]+"-"+this.testingPNDData.mtpScheduleDate.split('/')[1]+"-"+this.testingPNDData.mtpScheduleDate.split('/')[0]));
    //this.DORPicker.flatpickr.setDate(new Date(_tempCurrentDate));
    this.DORPicker.flatpickr.setDate(new Date(_tempCurrentDate));
    this.DORPicker.flatpickr.set({
      minDate: this.minMTPDate,
      enable: [],
      enableTime: true,
      dateFormat: 'd/m/Y H:i',
    });
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    
  }
}
