import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { PndtMtpMasterService } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master.service';
import { CounsellPrePndtService } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt.service';
import { TokenService } from 'src/app/shared/token.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/shared/auth-response';
import { PndtMtpMasterResponse, dataModel } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master-response';
import { CounsellPrePndtResquest } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt-resquest';
import { CounselledprepndtResponse, CounselledList } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-counselled-decision-yes',
  templateUrl: './counselled-decision-yes.component.html',
  styleUrls: ['./counselled-decision-yes.component.css']
})
export class CounselledDecisionYesComponent implements AfterViewInit, OnDestroy, OnInit  {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  prepndtcounselledYesErrorMessage: string;
 
  user: user;
  pndtmtpMasterResponse: PndtMtpMasterResponse;
  counselledyesprepndtRequest: CounsellPrePndtResquest;
  counselledyesprepndtResponse: CounselledprepndtResponse;
  counselledyeslists: CounselledList[] = [];
  districts: dataModel[] = [];
  selectedDistrict: string = '';
  chclists: dataModel[] = [];
  selectedchc: string = '';
  phclists: dataModel[] = [];
  selectedphc: string = '';
  anmlists: dataModel[] = [];
  selectedanm: string = '';
  anwSubjectId: string;
  recordCount: number;
  
  constructor(
    private dataservice: DataService,
    private pndtmtpMasterService: PndtMtpMasterService,
    private counselledyesprepndtService: CounsellPrePndtService,
    private tokenService: TokenService,
    private loaderService: LoaderService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) { }
  
  ngOnInit() {

    this.loaderService.display(true);
    this.recordCount = 0;
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.dataservice.sendData(JSON.stringify({"module": "PNDTC Counsellor", "submodule": "Counselling – Pre PNDT", "page": "Counselled, PNDT Decision Yes"}));
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
    this.ddlDistrict(this.user.id);
    this.counselledyesprepndtRequest = {
      userId: this.user.id, districtId: 0,
      chcId: 0,
      phcId: 0,
      anmId: 0
    };
    let counselledyesdata = this.counselledyesprepndtService.getcounselledYesLists(this.counselledyesprepndtRequest)
      .subscribe(response => {
        this.counselledyesprepndtResponse = response;
        this.loaderService.display(false);
        if (this.counselledyesprepndtResponse !== null && this.counselledyesprepndtResponse.status === "true") {
          if (this.counselledyesprepndtResponse.data.length <= 0) {
            this.prepndtcounselledYesErrorMessage = response.message;
          }
          else {
            this.counselledyeslists = this.counselledyesprepndtResponse.data;
            this.rerender();
          }
        }
        else {
          this.prepndtcounselledYesErrorMessage = response.message;
        }
        
      },
        (err: HttpErrorResponse) => {
          this.prepndtcounselledYesErrorMessage = err.toString();
        });
  }

  ddlDistrict(userId) {
    let district = this.pndtmtpMasterService.getDistrict(userId).subscribe(response => {
      this.pndtmtpMasterResponse = response;
      if (this.pndtmtpMasterResponse !== null && this.pndtmtpMasterResponse.status === "true") {
        this.districts = this.pndtmtpMasterResponse.data;
        this.selectedDistrict = "";
      }
      else {
        this.prepndtcounselledYesErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.prepndtcounselledYesErrorMessage = err.toString();

      });
  }
   onChangeDistrict(event) {
  
    if (this.selectedDistrict === '') {
      this.selectedchc = '';
    }
    else {
      this.ddlChc(this.selectedDistrict);
    }
  }

  onChangechc(event){

    if (this.selectedchc === '') {
      this.selectedphc = '';
    }
    else {
      this.ddlPhc(this.selectedchc);
    }
    
  }

  onChangephc(event){

    if (this.selectedphc === '') {
      this.selectedanm = '';  
    }
    else {
      this.ddlAnm(this.selectedphc);
    }

  }

  ddlChc(id) {

    this.chclists = [];
    this.selectedchc = '';
    this.pndtmtpMasterService.getChc(id)
      .subscribe(response => {
        this.pndtmtpMasterResponse = response;
        if (this.pndtmtpMasterResponse !== null && this.pndtmtpMasterResponse.status === "true") {
          this.chclists = this.pndtmtpMasterResponse.data;
          this.selectedchc = '';
          // if (this.chclists.length > 0) {
          //   this.selectedchc = this.chclists[0].id.toString();
          // }
        }
        else {
          this.prepndtcounselledYesErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.prepndtcounselledYesErrorMessage = err.toString();

        });
  }

  ddlPhc(id) {

    this.phclists = [];
    this.selectedphc = '';
    this.pndtmtpMasterService.getPhc(id)
      .subscribe(response => {
        this.pndtmtpMasterResponse = response;
        if (this.pndtmtpMasterResponse !== null && this.pndtmtpMasterResponse.status === "true") {
          this.phclists = this.pndtmtpMasterResponse.data;
          this.selectedphc = '';
          // if (this.phclists.length > 0) {
          //   this.selectedphc = this.phclists[0].id.toString();
          // }
        }
        else {
          this.prepndtcounselledYesErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.prepndtcounselledYesErrorMessage = err.toString();

        });
  }

  ddlAnm(id) {

    this.anmlists = [];
    this.selectedanm = '';
    this.pndtmtpMasterService.getAnm(id)
      .subscribe(response => {
        this.pndtmtpMasterResponse = response;
        if (this.pndtmtpMasterResponse !== null && this.pndtmtpMasterResponse.status === "true") {
          this.anmlists = this.pndtmtpMasterResponse.data;
          this.selectedanm = '';
          // if (this.anmlists.length > 0) {
          //   this.selectedanm = this.anmlists[0].id.toString();
          // }
        }
        else {
          this.prepndtcounselledYesErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.prepndtcounselledYesErrorMessage = err.toString();

        });
  }

  retrivecounselledyeslists(){

    this.loaderService.display(true);
    this.recordCount = 0;
    this.counselledyeslists=[];
    this.prepndtcounselledYesErrorMessage='';
    this.counselledyesprepndtRequest = {
      userId: this.user.id, districtId: +(this.selectedDistrict),
      chcId: +(this.selectedchc),
      phcId: +(this.selectedphc),
      anmId: +(this.selectedanm)
    };
    let counselledyesdata = this.counselledyesprepndtService.getcounselledYesLists(this.counselledyesprepndtRequest)
      .subscribe(response => {
        this.counselledyesprepndtResponse = response;
        this.loaderService.display(false);
        if (this.counselledyesprepndtResponse !== null && this.counselledyesprepndtResponse.status === "true") {
          if (this.counselledyesprepndtResponse.data.length <= 0) {
            this.prepndtcounselledYesErrorMessage = response.message;
          }
          else {
            this.counselledyeslists = this.counselledyesprepndtResponse.data;
            this.recordCount = this.counselledyeslists.length;
          }
        }
        else {
          this.prepndtcounselledYesErrorMessage = response.message;
        }
        this.onLoadSubject.emit(this.recordCount);    //step 5
        this.rerender();
        this.loadDataTable = true;
        
      },
        (err: HttpErrorResponse) => {
          if (this.loadDataTable) this.rerender();
          this.prepndtcounselledYesErrorMessage = err.toString();
        });
  }

  openpndtdetail(counselledyesdata: CounselledList ){

    this.anwSubjectId = counselledyesdata.anwSubjectId;
    this.router.navigateByUrl(`/app/update-pre-pndtc-yes?q=${this.anwSubjectId}`);
    
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
