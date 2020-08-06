import { Component, OnInit,HostListener } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { Router } from '@angular/router';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
declare var $: any;
import { HttpErrorResponse } from '@angular/common/http';
import { pathoHPLCService } from "./../../../shared/pathologist/patho-hplc.service";

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
  clinicalDiagnosisData = [];
  HPLCmasterData= [];
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
  constructor(private DataService:DataService,private router: Router,private masterService: masterService,private pathoHPLCService:pathoHPLCService) {

   
   }

  ngOnInit() {
    console.log(this.DataService.getdata().diagnosisHPLC);
    if(this.DataService.getdata().diagnosisHPLC === undefined)
    {
      this.router.navigate(['/app/pathologist-hplc/abnormal']);
    }
    this.diagnosisReportData = this.DataService.getdata().diagnosisHPLC;
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    this.getClinicalDiagnosis();
    this.getHPLCmaster();
  }

  getClinicalDiagnosis()
  {
    this.masterService.getClinicalDiagnosis()
    .subscribe(response => {
      console.log(response);
      this.clinicalDiagnosisData = response['diagnosis'];
    },
    (err: HttpErrorResponse) =>{
      this.clinicalDiagnosisData = [];
    });
  }

  getHPLCmaster()
  {
    this.pathoHPLCService.retriveHPLCResultMaster().subscribe(response => {
      console.log(response);
      this.HPLCmasterData = response.hplcResults;
    },
    (err: HttpErrorResponse) =>{
      this.HPLCmasterData = [];
    });
  }

  receivedSamples(event)
  {
    console.log(event);
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    
  }
}
