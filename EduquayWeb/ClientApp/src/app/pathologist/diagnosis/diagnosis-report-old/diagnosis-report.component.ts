import { Component, OnInit,HostListener,QueryList,ElementRef,ViewChildren } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { Router } from '@angular/router';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
declare var $: any;
import { HttpErrorResponse } from '@angular/common/http';
import { pathoHPLCService } from "./../../../shared/pathologist/patho-hplc.service";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import {Location} from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-diagnosis-report',
  templateUrl: './diagnosis-report.component.html',
  styleUrls: ['./diagnosis-report.component.css']
})
export class DiagosisReportComponent1 implements OnInit {
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  receivedSampleCount;
  uploadCBCCount = 0;
  currentPage = "";
  diagnosisReportData;
  clinicalDiagnosisMasterData = [];
  clinicalDiagnosisData = [];
  HPLCmasterData= [];
  FormGroup: FormGroup;
  testResultGroup: FormGroup;
  ordersData = [];
  user;
  diagnosisReportResponse;

  selectedDiagnosis = null;
  firstFormCheck = false;
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
  constructor(private DataService:DataService,private router: Router,private masterService: masterService,private pathoHPLCService:pathoHPLCService,private _formBuilder: FormBuilder,private tokenService: TokenService,private _location: Location) {

   
   }

  ngOnInit() {
    
    this.user = JSON.parse(this.tokenService.getUser('lu'));
   
   this.testResultGroup = this._formBuilder.group({
    orders: new FormArray([])
   })
    if(this.DataService.getdata().diagnosisHPLC === undefined)
    {
      this.router.navigate(['/app/pathologist-hplc/abnormal']);
    }
    this.diagnosisReportData = this.DataService.getdata().diagnosisHPLC;
    this.showConfirmEditLater = this.compareDate(this.diagnosisReportData.dateOfTest,moment().format('DD-MM-YYYY')) <= 7;
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    this.FormGroup = this._formBuilder.group({
      cd: ['', Validators.required],
      swapcase:[this.diagnosisReportData.isNormal ? 'normal' : 'abnormal'],
      consulSeniorPatho:[this.diagnosisReportData.isConsultSeniorPathologist != undefined ? ''+this.diagnosisReportData.isConsultSeniorPathologist : 'false'],
      diagnosticSummary:['',Validators.required],
      pathologistName:[''],
      remarks:[''],
      others: ['']
   });

   if(this.diagnosisReportData.clinicalDiagnosisId != undefined)
        this.selectedDiagnosis = this.diagnosisReportData.clinicalDiagnosisId;
    if(this.diagnosisReportData.diagnosisSummary)
        this.SelecteddiagnosticSummary = this.diagnosisReportData.diagnosisSummary;
   if(this.diagnosisReportData.seniorPathologistName)
      this.selectedpathologistName = this.diagnosisReportData.seniorPathologistName;
  if(this.diagnosisReportData.seniorPathologistRemarks)
      this.selectedRemarks = this.diagnosisReportData.seniorPathologistRemarks;
  if(this.diagnosisReportData.othersResult)
      this.selectedOthers = this.diagnosisReportData.othersResult;
      
   
   
   
    this.getClinicalDiagnosis();
    this.getHPLCmaster();
  }

  getClinicalDiagnosis()
  {
    this.masterService.getClinicalDiagnosis()
    .subscribe(response => {
      this.clinicalDiagnosisMasterData = response['diagnosis'];

      if(this.diagnosisReportData.isNormal)
        this.clinicalDiagnosisData = this.clinicalDiagnosisMasterData.filter(report => report.diagnosisName === "Normal");
      else
        this.clinicalDiagnosisData = this.clinicalDiagnosisMasterData.filter(report => report.diagnosisName != "Normal");

    },
    (err: HttpErrorResponse) =>{
      this.clinicalDiagnosisData = [];
    });
  }

  radioChange(event)
  {
    if(event.currentTarget.value === "normal")
        this.clinicalDiagnosisData = this.clinicalDiagnosisMasterData.filter(report => report.diagnosisName === "Normal");
    else
      this.clinicalDiagnosisData = this.clinicalDiagnosisMasterData.filter(report => report.diagnosisName != "Normal");

      this.HPLCmasterData.forEach(function(val,index){
        if(event.currentTarget.value === "normal" && val.hplcResultName === "Normal")
            val.disable = false;
       else if(event.currentTarget.value === "abnormal" && val.hplcResultName != "Normal")
            val.disable = false;
        else
            val.disable = true;

        val.checked = false;
      },this);
  }
  getHPLCmaster()
  {
    this.pathoHPLCService.retriveHPLCResultMaster().subscribe(response => {
      this.HPLCmasterData = response.hplcResults;
      this.HPLCmasterData.forEach(function(val,index){
       /* if(this.diagnosisReportData.isNormal && val.hplcResultName === 'Normal')
            val.disable = true;*/
        if(this.diagnosisReportData.isNormal)
        {
            if(val.hplcResultName != 'Normal')
              val.disable = true;
            else
                val.disable = false;
        }
        else
        {
          if(val.hplcResultName === 'Normal')
            val.disable = true;
          else
              val.disable = false;
        }
        

        val.checked = false;

        if(this.diagnosisReportData.hplcResultMasterId != undefined)
        {
              var _tempHplcResultMaster = this.diagnosisReportData.hplcResultMasterId.split(',');
              _tempHplcResultMaster.forEach(element => {
                if(element == val.id)
                {
                  val.checked = true;
                }
                
              });
        }
      },this);
      if(this.HPLCmasterData[0].checked)
      {
        this.HPLCmasterData[1].disable = true;
        this.HPLCmasterData[2].disable = true;
        this.HPLCmasterData[3].disable = true;
      }

      if(this.HPLCmasterData[3].checked)
      {
        this.showOthersTextbox = true;
        this.HPLCmasterData[1].disable = true;
        this.HPLCmasterData[2].disable = true;
        this.HPLCmasterData[0].disable = true;
      }

      if(this.HPLCmasterData[1].checked || this.HPLCmasterData[2].checked)
      {
        this.HPLCmasterData[0].disable = true;
        this.HPLCmasterData[3].disable = true;
      }
    },
    (err: HttpErrorResponse) =>{
      this.HPLCmasterData = [];
    });
  }
  pathologistChange(event)
  {
  }

  hplcChange(i)
  {
   
    this.HPLCmasterData[i].checked = !this.HPLCmasterData[i].checked;
    this.HPLCmasterData.forEach(function(val,index){
      if(this.HPLCmasterData[i].hplcResultName === "Others" && this.HPLCmasterData[i].checked)
      {
        this.showOthersTextbox = true;
        this.checkboxes.forEach((element) => {
          element.nativeElement.checked = false;
        });
        if(val.hplcResultName != "Others")
        {
          val.checked = false;
          val.disable = true;
        }else
        val.checked = true;

            
      }
      if(this.HPLCmasterData[i].hplcResultName === "Others" && !this.HPLCmasterData[i].checked)
      {
        this.showOthersTextbox = false;
       
        if(val.hplcResultName === "Normal")
            val.disable = true;
        else
        {
          val.checked = false;
          val.disable = false;
        }
            
      }

      if((this.HPLCmasterData[i].hplcResultName === "Beta Thalassemia" || this.HPLCmasterData[i].hplcResultName === "Sickle Cell Disease") && this.HPLCmasterData[i].checked)
      {
        if(val.hplcResultName === "Normal" || val.hplcResultName === "Others")
            val.disable = true;
        else
          val.disable = false;
            
      }

      if((this.HPLCmasterData[i].hplcResultName === "Beta Thalassemia" || this.HPLCmasterData[i].hplcResultName === "Sickle Cell Disease") && !this.HPLCmasterData[i].checked)
      {
        if(val.hplcResultName === "Normal")
            val.disable = true;
        else
          val.disable = false;
        if(this.HPLCmasterData[1].checked || this.HPLCmasterData[2].checked)
        {
            if(this.HPLCmasterData[i].hplcResultName != "Others")
                this.HPLCmasterData[3].disable = true;
        }
        
            
      }
    },this);
    
  }
 
  receivedSamples(event)
  {
    console.log(event);
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
    this.pathoHPLCService.addHSBCtest(_obj)
        .subscribe(response => {
          this.diagnosisReportResponse = response;
          if (this.diagnosisReportResponse !== null && this.diagnosisReportResponse.status === "true") {
              Swal.fire({ allowOutsideClick: false,
                text: 'HPLC Results Updated Successfully.',
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
