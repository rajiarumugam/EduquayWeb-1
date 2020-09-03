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
import { PNDCService } from "../../../shared/pndtc/pndc.service";


@Component({
  selector: 'app-pnd-testing-results',
  templateUrl: './pnd-testing-results.component.html',
  styleUrls: ['./pnd-testing-results.component.css']
})
export class PNDTestingResultsComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  @ViewChild('multiSelect',{static:false}) multiSelect;
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
  selectedprocedureOfTesting = null;
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

  tempHPLCmasterChecked = "";
  showOthersTextbox = false;
  showConfirmEditLater = false;
  selectedRemarks = "";
  SelecteddiagnosticSummary = "";
  selectedpathologistName = "";
  selectedOthers;

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
  constructor(private DataService:DataService,private router: Router,private masterService: masterService,private pathoHPLCService:pathoHPLCService,private _formBuilder: FormBuilder,private tokenService: TokenService,private _location: Location,private PNDTCmasterService: PNDTCmasterService, private PNDCService:PNDCService) {

   
   }

  ngOnInit() {

   
    this.user = JSON.parse(this.tokenService.getUser('lu'));
   
   this.testResultGroup = this._formBuilder.group({
    orders: new FormArray([])
   })
    if(this.DataService.getdata().pndtestingResult === undefined)
    {
      this.router.navigate(['/app/pndtc-testing']);
    }
    this.testingPNDData = this.DataService.getdata().pndtestingResult;
    this.selectedcounsellerName = this.testingPNDData.counsellorName;
    this.selectedpndtDate = this.testingPNDData.schedulePNDTDate+" "+this.testingPNDData.schedulePNDTTime;
    this.selectedObstetricianName = this.testingPNDData.obstetricianName;
    console.log(this.DataService.getdata().pndtestingResult);
    //this.showConfirmEditLater = this.compareDate(this.diagnosisReportData.dateOfTest,moment().format('DD-MM-YYYY')) <= 7;
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    this.FormGroup = this._formBuilder.group({
      pndtDate: ['', Validators.required],
      counsellorName: ['', Validators.required],
      obstetricianName: ['', Validators.required],
      clinicalHistory: ['', Validators.required],
      examination: ['', Validators.required],
      procedureOfTesting: ['', Validators.required],
      complications: [''],
      otherPOT: [''],
      anyOtherComplications: [""]
   });

   this.secondFormGroup = this._formBuilder.group({
    motherVoided: [''],
    motherVital: [''],
    foetalHeart: [''],
    PNDTDiagnosis: [''],
    PNDTResults: [''],
    planForPregenancy: [''],
   
 });
      
    this.getProcedureOfTesting();
    this.getComplecations();
    this.getPNDTCDiagnosis();
    this.getPNDTCResult();
  }

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
  }
  public onDeSelectAll(items: any) {
    console.log(items);
  }

  getProcedureOfTesting(){
    this.PNDTCmasterService.getProcedureOfTesting()
    .subscribe(response => {
      this.POTData = response['data'];
    },
    (err: HttpErrorResponse) =>{
      this.POTData = [];
      //this.erroMessage = err.toString();
    });
  }
  getComplecations(){
    this.PNDTCmasterService.getComplecations()
    .subscribe(response => {
      this.complicationsdata = response['data'];

      this.settings = {
        singleSelection: false,
        idField: 'id',
        textField: 'name',
        enableCheckAll: false,
        selectAllText: 'Select All',
        unSelectAllText: 'Hủy chọn',
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
  getPNDTCDiagnosis(){
    this.PNDTCmasterService.getPNDTCDiagnosis()
    .subscribe(response => {
      this.POTDiagnosis = response['data'];
    },
    (err: HttpErrorResponse) =>{
      this.POTDiagnosis = [];
      //this.erroMessage = err.toString();
    });
  }
  getPNDTCResult(){
    this.PNDTCmasterService.getPNDTCResult()
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
   _obj['anwsubjectId'] = this.testingPNDData.anwSubjectId;
   _obj['spouseSubjectId'] = this.testingPNDData.spouseSubjectId;
   _obj['counsellorId'] = this.testingPNDData.counsellorId;
   _obj['obstetricianId'] = this.testingPNDData.obstetricianId;
   
  
   _obj['userId'] = this.user.id;
   _obj['prePNDTCounsellingId'] = this.testingPNDData.prePNDTCounsellingId;
    this.firstFormCheck = true;
    if(type === "save")
    {
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
           _obj['isCompletePNDT'] = false;
           _obj['clinicalHistory'] = this.FormGroup.get('clinicalHistory').value;
           _obj['examination'] = this.FormGroup.get('examination').value;
           _obj['procedureOfTestingId'] = Number(this.FormGroup.get('procedureOfTesting').value);
           _obj['pndtComplecationsId'] = _tempComplectionData;
           _obj['othersProcedureofTesting'] = this.FormGroup.get('otherPOT').value != undefined ? this.FormGroup.get('otherPOT').value : "";
           _obj['othersComplecations'] = this.FormGroup.get('anyOtherComplications').value != undefined ? this.FormGroup.get('anyOtherComplications').value : "";

           console.log(_obj);

           this.sendDataToService(_obj);
        }
    }
    else
    {
      this.secondFormCheck = true;
      if(this.FormGroup.valid && this.secondFormGroup.valid && this.selectedcomplicationsItems.length > 0)
        {
          var _tempComplectionData;
          this.selectedcomplicationsItems.forEach((element,index) => {
            if(index === 0)
              _tempComplectionData = element.id;
            else
            _tempComplectionData += ","+element.id;
          });
          _obj['isCompletePNDT'] = false;
           _obj['clinicalHistory'] = this.FormGroup.get('clinicalHistory').value;
           _obj['examination'] = this.FormGroup.get('examination').value;
           _obj['procedureOfTestingId'] = Number(this.FormGroup.get('procedureOfTesting').value);
           _obj['pndtComplecationsId'] = _tempComplectionData;
           _obj['othersProcedureofTesting'] = this.FormGroup.get('otherPOT').value != undefined ? this.FormGroup.get('otherPOT').value : "";
           _obj['othersComplecations'] = this.FormGroup.get('anyOtherComplications').value != undefined ? this.FormGroup.get('anyOtherComplications').value : "";
          _obj['pndtDiagnosisId'] = this.secondFormGroup.get('PNDTDiagnosis').value != undefined ? Number(this.secondFormGroup.get('PNDTDiagnosis').value) : "";
          _obj['pndtResultId'] = this.secondFormGroup.get('PNDTResults').value != undefined ? Number(this.secondFormGroup.get('PNDTResults').value) : "";
          _obj['motherVoided'] = this.secondFormGroup.get('motherVoided').value != undefined ? this.secondFormGroup.get('motherVoided').value : "";
          _obj['motherVitalStable'] = this.secondFormGroup.get('motherVital').value != undefined ? this.secondFormGroup.get('motherVital').value : "";
          _obj['foetalHeartRateDocumentScan'] = this.secondFormGroup.get('foetalHeart').value != undefined ? this.secondFormGroup.get('foetalHeart').value : "";
          _obj['planForPregnencyContinue'] = this.secondFormGroup.get('planForPregenancy').value != undefined ? this.secondFormGroup.get('planForPregenancy').value : "";
       
            _obj['isCompletePNDT'] = true;

            console.log(_obj);

            this.sendDataToService(_obj);
        }
    }
      
  }
  reportSubmit(type)
  {
    this.tempHPLCmasterChecked = '';
    this.firstFormCheck = true;
    this.HPLCmasterData.forEach(function(val,index){
        if(val.checked)
        {
          if(this.tempHPLCmasterChecked != undefined && this.tempHPLCmasterChecked != "")
              this.tempHPLCmasterChecked += ","+val.id;
          else
              this.tempHPLCmasterChecked = val.id;
        }
    },this);
   
    if(this.tempHPLCmasterChecked != "" && this.FormGroup.valid)
    {
        var _obj = {};
        _obj['uniqueSubjectId'] = this.diagnosisReportData.uniqueSubjectId ;
        _obj['barcodeNo'] = this.diagnosisReportData.barcodeNo ;
        _obj['centralLabId'] = this.user.centralLabId ;
        _obj['hplcTestResultId'] = this.diagnosisReportData.hplcTestResultId;
        _obj['clinicalDiagnosisId'] = Number(this.FormGroup.get('cd').value);
        _obj['hplcResultMasterId'] = ""+this.tempHPLCmasterChecked;
        _obj['isNormal'] = this.FormGroup.get('swapcase').value === "normal" ? true : false;
        _obj['diagnosisSummary'] = this.FormGroup.get('diagnosticSummary').value; 
        _obj['isConsultSeniorPathologist'] = this.FormGroup.get('consulSeniorPatho').value === 'true' ? true : false;
        _obj['seniorPathologistName'] = this.FormGroup.get('pathologistName').value != undefined ? this.FormGroup.get('pathologistName').value : "";
        _obj['seniorPathologistRemarks'] = this.FormGroup.get('remarks').value != undefined ? this.FormGroup.get('remarks').value : ""; 
        _obj['userId'] = this.user.id;
       
        _obj['othersResult'] = this.FormGroup.get('others').value != undefined ? this.FormGroup.get('others').value : "";
        _obj['isDiagnosisComplete'] = (type === "save") ? false : true;

        console.log(_obj);

        if(type === "save")
        {
            Swal.fire({icon:'success', title: 'You will be able to edit the diagnosis within 7 days of aging, after which the current Diagnosis will be auto confirmed.  Please confirm ',
            showCancelButton: true, confirmButtonText: 'Yes', cancelButtonText: 'No', allowOutsideClick: false })
              .then((result) => {
                if (result.value) {
                    this.sendDataToService(_obj);
                }
                else{
                
                }
              });
        }
        else
        {
          Swal.fire({icon:'success', title: 'Your Diagnosis is FINAL  and you will not be able to edit later.  If sample is positive Notification will be sent.  Please confirm',
          showCancelButton: true, confirmButtonText: 'Yes', cancelButtonText: 'No', allowOutsideClick: false })
            .then((result) => {
              if (result.value) {
                  this.sendDataToService(_obj);
              }
              else{
              
              }
            });
        }
        

    }

  }
  sendDataToService(_obj)
  {
    this.PNDCService.postPNDTest(_obj)
        .subscribe(response => {
          this.diagnosisReportResponse = response;
          if (this.diagnosisReportResponse !== null && this.diagnosisReportResponse.status === "true") {
              Swal.fire({ allowOutsideClick: false,
                text: 'PNDT Updated Successfully.',
                icon: 'success'
              }).then((result) => {
             
              this._location.back();
               this.FormGroup.reset();
              });
          } else {
            
            //this.errorMessage = response.message;
          }
  
        },
          (err: HttpErrorResponse) => {
            //this.showResponseMessage(err.toString(), 'e');
          });
  }
  compareDate(date1,date2)
  {
        var startDate = moment(date1, "DD/MM/YYYY");
        var endDate = moment(date2, "DD-MM-YYYY");
        var result = endDate.diff(startDate, 'days');
        return result;
    }
   
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    
  }
}
