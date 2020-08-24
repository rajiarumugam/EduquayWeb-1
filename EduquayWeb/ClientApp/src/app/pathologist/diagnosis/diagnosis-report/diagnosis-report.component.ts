import { Component, OnInit,HostListener } from '@angular/core';
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
import { valHooks } from 'jquery';

@Component({
  selector: 'app-diagnosis-report',
  templateUrl: './diagnosis-report.component.html',
  styleUrls: ['./diagnosis-report.component.css']
})
export class DiagosisReportComponent implements OnInit {
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
    console.log(this.diagnosisReportData);
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    this.FormGroup = this._formBuilder.group({
      cd: ['', Validators.required],
      swapcase:[this.diagnosisReportData.isNormal ? 'normal' : 'abnormal'],
      consulSeniorPatho:["false"],
      diagnosticSummary:['',Validators.required],
      pathologistName:[''],
      remarks:[''],
      others: ['']
   });
    this.getClinicalDiagnosis();
    this.getHPLCmaster();
  }

  getClinicalDiagnosis()
  {
    this.masterService.getClinicalDiagnosis()
    .subscribe(response => {
      console.log(response);
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
        console.log(event.currentTarget.value);
        console.log(val);
        if(event.currentTarget.value === "normal" && val.hplcResultName === "Normal")
            val.disable = false;
       else if(event.currentTarget.value === "abnormal" && val.hplcResultName != "Normal")
            val.disable = false;
        else
            val.disable = true;

        val.checked = false;
      },this);
    console.log(event.currentTarget.value);
  }
  getHPLCmaster()
  {
    this.pathoHPLCService.retriveHPLCResultMaster().subscribe(response => {
      console.log(response);
      this.HPLCmasterData = response.hplcResults;
      this.HPLCmasterData.forEach(function(val,index){
        if(this.diagnosisReportData.isNormal && val.hplcResultName === 'Normal')
            val.disable = false;
        else if(!this.diagnosisReportData.isNormal && val.hplcResultName === 'Normal')
            val.disable = true;
        else
            val.disable = false;

        val.checked = false;
      },this);
      console.log(this.HPLCmasterData);
    },
    (err: HttpErrorResponse) =>{
      this.HPLCmasterData = [];
    });
  }
  pathologistChange(event)
  {
      console.log(event.target.value);
      console.log(this.FormGroup.get('consulSeniorPatho').value)
  }

  hplcChange(i)
  {
    this.HPLCmasterData[i].checked = !this.HPLCmasterData[i].checked;
    console.log(this.HPLCmasterData);
    this.HPLCmasterData.forEach(function(val,index){
      if(this.HPLCmasterData[i].hplcResultName === "Others" && this.HPLCmasterData[i].checked)
      {
        this.showOthersTextbox = true;
        if(val.hplcResultName != "Others")
            val.disable = true;
      }
      if(this.HPLCmasterData[i].hplcResultName === "Others" && !this.HPLCmasterData[i].checked)
      {
        this.showOthersTextbox = false;
        if(val.hplcResultName === "Normal")
            val.disable = true;
        else
            val.disable = false;
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
      }
    },this);
    console.log(this.HPLCmasterData);
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
          console.log(this.tempHPLCmasterChecked);
          if(this.tempHPLCmasterChecked != undefined && this.tempHPLCmasterChecked != "")
              this.tempHPLCmasterChecked += ","+val.id;
          else
              this.tempHPLCmasterChecked = val.id;
        }
    },this);
     
    console.log(this.tempHPLCmasterChecked);
    console.log(this.HPLCmasterData);

    console.log(this.FormGroup.valid)

    
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

  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    
  }
}
