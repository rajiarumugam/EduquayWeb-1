import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from 'src/app/shared/token.service';
import { ActivatedRoute } from '@angular/router';
import { PNDCService } from "../../../shared/pndtc/pndc.service";
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
declare var $: any;
import * as moment from 'moment';
import { ENDPOINT } from '../../../app.constant';
import { GenericService } from '../../../shared/generic.service';
import { HttpClientService } from '../../../shared/http-client.service';
import Swal from 'sweetalert2';
import { MolecularLabsampleService } from "./../../../shared/molecularlab/ml-sample.service";
import { DataService } from '../../../shared/data.service';

@Component({
  selector: 'app-update-mol-result',
  templateUrl: './update-mol-result.component.html',
  styleUrls: ['./update-mol-result.component.css']
})
export class UpdateMolResultComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  districts = [];
  selectedDistrict = null;
  user;
  CHCdata = [];
  selectedchc = null;
  erroMessage;
  PHCdata = [];
  selectedphc = null;
  ANMdata = []
  selectedAnm = null;
  pndPendingArray = [];  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selectedDiagnosis = null;
  selectedResult = null;
  popupSelectedData;
  clinicalDiagnosisData;
  molecularResultsData;
  showRemarks = false;
  selectedRemarks;
  firstFormCheck = false;
  errorMessage;
  



  constructor(private tokenService: TokenService,private route: ActivatedRoute,private PNDCService:PNDCService
    ,private router: Router,private _formBuilder: FormBuilder,private masterService:masterService,private genericService: GenericService, private httpClientService:HttpClientService,private MolecularLabsampleService: MolecularLabsampleService,private DataService:DataService,
  ) { }

  ngOnInit() {
    var pndtcTestingArr = this.route.snapshot.data.mlSampleData;
    console.log(pndtcTestingArr);

    this.firstFormGroup = this._formBuilder.group({
      geneticDiagnosis: [''],
      molecularresult: ['']
   });

   this.secondFormGroup = this._formBuilder.group({
    processSample: ['true', Validators.required]
 });
   
    if(pndtcTestingArr !== undefined && pndtcTestingArr.status.toString() === "true"){
      //var _tempData = centralReceiptsArr.hplcDetail;
      this.pndPendingArray = pndtcTestingArr.subjects;
    }

    this.user = JSON.parse(this.tokenService.getUser('lu'));
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

    this.getClinicalDiagnosisData();
    this.getMolecularResults();
  }

  radioChange(event)
  {
    console.log(event.target.value);
    if(event.target.value == 'false')
    {
      this.showRemarks = true;
      this.selectedDiagnosis = null;
      this.selectedResult = null;
    }
    else
    {
      this.selectedRemarks = "";
      this.showRemarks = false;
    }
      
  }
  getClinicalDiagnosisData(){
    this.masterService.getClinicalDiagnosis()
    .subscribe(response => {
      console.log(response);
        this.clinicalDiagnosisData = response['diagnosis'];
    },
    (err: HttpErrorResponse) =>{
      this.clinicalDiagnosisData = [];
      //this.erroMessage = err.toString();
    });
  }
  getMolecularResults(){
    this.masterService.getMolecularResults()
    .subscribe(response => {
      console.log(response);
      this.molecularResultsData = response['molecularResults'];
      console.log(this.molecularResultsData);
    },
    (err: HttpErrorResponse) =>{
      this.molecularResultsData = [];
      this.erroMessage = err.toString();
    });
  }
  

  openviewPage(data)
  {
      this.DataService.setdata({'updateMolResu':data});
      this.router.navigateByUrl(`/app/update-molecular-casesheet`);
  }
  openResultPage(data)
  {
    console.log(data);
    this.popupSelectedData = data;
    $('#fadeinModal').modal('show');
    this.selectedDiagnosis = null;
    this.selectedResult = null;
  }
  submitData()
  {
    this.firstFormCheck = true;
    console.log(this.firstFormGroup.valid);



      if(this.secondFormGroup.get('processSample').value == "false")
      {
          if(this.selectedRemarks == undefined || this.selectedRemarks == null)
          {
              return;
          }
      }
      else
      {
          if(this.firstFormGroup.get('geneticDiagnosis').value == undefined || this.firstFormGroup.get('molecularresult').value == undefined)
          {
            return;
          }
      }
        var user = JSON.parse(this.tokenService.getUser('lu'));

        var _obj = {};
        _obj['uniqueSubjectId'] = this.popupSelectedData.uniqueSubjectId;
        _obj['barcodeNo'] = this.popupSelectedData.barcodeNo;
        
        _obj['diagnosisId'] = this.secondFormGroup.get('processSample').value == "false" ? 0 : Number(this.firstFormGroup.get('geneticDiagnosis').value);
        _obj['resultId'] = this.secondFormGroup.get('processSample').value == "false" ? 0 : Number(this.firstFormGroup.get('molecularresult').value);
        _obj['processSample'] = Boolean(this.secondFormGroup.get('processSample').value);
        _obj['remarks'] = this.selectedRemarks == undefined ? "":this.selectedRemarks;
        _obj['userId'] = user.id;
      console.log(_obj);
        var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MOLECULARLAB.ADDMOLECULARRESULT);
        this.httpClientService.post<any>({url:apiUrl, body: _obj}).subscribe(response => {
          
          if(response.status === "true")
          {
            Swal.fire({ allowOutsideClick: false,icon:'success', title: 'Molecular Test Results updated Successfully',
              showCancelButton: false, confirmButtonText: 'OK'})
                .then((result) => {
                  if (result.value) {
                    $('#fadeinModal').modal('hide');
                    this.MolecularLabsampleService.retriveMLUpdateResult().subscribe(response => {
                      if(response.status === "true")
                      {
                        this.pndPendingArray = response.subjects;
                        this.rerender();
                      }
                                
                    },
                    (err: HttpErrorResponse) =>{
                      console.log(err);
                    });
                    
                  }
                  
                });
          }else{
              this.errorMessage = response.message;
          }
          
              },
              (err: HttpErrorResponse) =>{
                console.log(err);
              });

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

