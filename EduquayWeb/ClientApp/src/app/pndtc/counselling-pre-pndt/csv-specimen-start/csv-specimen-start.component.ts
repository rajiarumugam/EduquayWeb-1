import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { PndtMtpMasterService } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master.service';
import { TokenService } from 'src/app/shared/token.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { user } from 'src/app/shared/auth-response';
import { PndtMtpMasterResponse, dataModel } from 'src/app/shared/pndtc/pndt-mtp-master-service/pndt-mtp-master-response';
import { HttpErrorResponse } from '@angular/common/http';
import { CounsellPrePndtService } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt.service';
import { CounsellPrePndtResquest } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt-resquest';
import { CounsellPrePndtResponse, CounsellingList } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-pre-pndt-response';
import { Router } from '@angular/router';
import { PNDTCmasterService } from "../../../shared/pndtc/pndtc-masterdata.service";
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { chcshipmentService } from 'src/app/shared/centrallab/central-shipment.service';
import Swal from 'sweetalert2';
declare var $: any


@Component({
  selector: 'app-csv-specimen-start',
  templateUrl: './csv-specimen-start.component.html',
  styleUrls: ['./csv-specimen-start.component.css']
})
export class CSVspecimenStartComponent implements AfterViewInit, OnDestroy, OnInit  {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  prepndtcounsellingErrorMessage: string;
  masterdataErrorMessage: string;
  searchbarcode;
 
  user: user;
  pndtmtpMasterResponse: PndtMtpMasterResponse;
  counsellingprepndtRequest: CounsellPrePndtResquest;
  counsellingprepndtResponse: CounsellPrePndtResponse;
  counsellinglists: CounsellingList[] = [];
  counsellingTemplists;
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
  checkAllEnabled = true;
  firstFormCheck = false;
  showDatatable = true;

  counsellingStartlist= [];
  molecularLabData = [];
  firstFormGroup: FormGroup;
  selectedSendingLocation;
  selectedsenderContact;
  selectedsenderName;
  selectedreceivingMolecularLab = null;
  selectedshipmentDate = new Date(Date.now());
  errorMessage;
  chcUploadResponse;

  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y H:i',
    enableTime: true,
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

  constructor(
    private dataservice: DataService,
    private pndtmtpMasterService: PndtMtpMasterService,
    private counsellingprepndtService: CounsellPrePndtService,
    private tokenService: TokenService,
    private loaderService: LoaderService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private PNDTCmasterService: PNDTCmasterService,
    private ref: ChangeDetectorRef,
    private masterService: masterService,
    private chcshipmentService: chcshipmentService
  ) { }

  ngOnInit() {
    this.loaderService.display(true);
    this.recordCount = 0;
    this.user = JSON.parse(this.tokenService.getUser('lu'));
   // this.dataservice.sendData(JSON.stringify({"module": "PNDTC Counsellor", "submodule": "Counselling – Pre PNDT", "page": "To be Counselled"}));
  
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
    
    this.getMolecularLab();
    this.ddlDistrict(this.user.id);
    this.counsellingprepndtRequest = {
      userId: this.user.id, districtId: 0,
      chcId: 0,
      phcId: 0,
      anmId: 0
    };
   
    let counsellingdata = this.counsellingprepndtService.retrievePNDTPickAndPack()
      .subscribe(response => {
        this.counsellingprepndtResponse = response;
        this.loaderService.display(false);
        if (this.counsellingprepndtResponse !== null && this.counsellingprepndtResponse.status === "true") {
          if (this.counsellingprepndtResponse.data.length <= 0) {
            this.prepndtcounsellingErrorMessage = response.message;
          }
          else {
            this.counsellinglists = JSON.parse(JSON.stringify(this.counsellingprepndtResponse.data));
            this.counsellingTemplists = this.counsellingprepndtResponse.data;
            this.counsellingStartlist = this.dataservice.getdata().csvspecimenstartdata;
            this.counsellingStartlist = this.counsellingStartlist != undefined ? this.counsellingStartlist : [];
            if(this.counsellingStartlist != undefined)
            {
              this.counsellingStartlist.forEach(function(element,index) {
                  this.counsellingTemplists.forEach(function(val,ind) 
                  {
                      if(element.rchId === val.rchId)
                      {
                        this.counsellingTemplists.splice(ind,1);
                      }
                  },this);
              },this);
            }
            var _tempStartLength = this.counsellingStartlist != undefined ? this.counsellingStartlist.length : 0;
            this.dataservice.sendData(JSON.stringify({"module": "CSV SPECIMEN","pending":this.counsellingTemplists.length,"start":_tempStartLength}));
            
            //this.rerender();
          }
        }
        else {
          this.prepndtcounsellingErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.prepndtcounsellingErrorMessage = err.toString();
        });


        this.firstFormGroup = this._formBuilder.group({
          sendingLocation : ['', Validators.required],
          senderName: ['', Validators.required],
          receivingMolecularLab: ['', Validators.required],
          senderContact: ['', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
          shipmentDate: ['', Validators.required],
       });
  }

  getMolecularLab()
  {
    this.masterService.retriveReceivingMocularLab()
    .subscribe(response => {
      this.molecularLabData = response.data;
    },
    (err: HttpErrorResponse) =>{
    });
  }
  ddlDistrict(userId) {
    let district = this.PNDTCmasterService.retrieveDistrictByPNDTLocation().subscribe(response => {
      this.pndtmtpMasterResponse = response;
      if (this.pndtmtpMasterResponse !== null && this.pndtmtpMasterResponse.status === "true") {
        this.districts = this.pndtmtpMasterResponse.data;
        this.selectedDistrict = "";
      }
      else {
        this.masterdataErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.masterdataErrorMessage = err.toString();

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
          this.masterdataErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.masterdataErrorMessage = err.toString();

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
          this.masterdataErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.masterdataErrorMessage = err.toString();

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
          this.masterdataErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.masterdataErrorMessage = err.toString();

        });
  }



  openpndtdetail(counsellingdata: CounsellingList ){

    this.anwSubjectId = counsellingdata.anwSubjectId;
    this.router.navigateByUrl(`/app/update-pre-pndtc?q=${this.anwSubjectId}`);
    
  }

  rerender(): void {
    if(this.dtElement.dtInstance != undefined)
    {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first   
          //dtInstance.clear();   
          dtInstance.destroy();
          // Call the dtTrigger to rerender again       
    
          this.dtTrigger.next();
        });
    }
    else
    {
      this.dtTrigger.next();
    }
   
  }   

  rerender1(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first   
      dtInstance.clear();   
      dtInstance.destroy();
      // Call the dtTrigger to rerender again       

      this.dtTrigger.next();
    });
   
  }   

  clicksearchBarcode()
  {
    let term = this.searchbarcode;
    var _index = this.counsellinglists.findIndex(com => com.rchId === term);
    if(_index >= 0)
    {
      this.counsellingStartlist.push(this.counsellinglists[_index]);
    }
  }
  searchBarCodetype()
  {
    let term = this.searchbarcode;
    var _tempSliceArr = [];
    var _tempRemainingArray = [];
    
    if(term.length === 12)
    {
      var _index = this.counsellingStartlist.findIndex(com => com.rchId === term);
      if(_index >= 0)
      {
        this.searchbarcode = ""; 
        return;
      }
      var _tempCounsellingList = JSON.parse(JSON.stringify(this.counsellinglists));
  
      for(var i=0;i<this.counsellinglists.length;i++)
      {
          if(term === this.counsellinglists[i].rchId)
          {
            this.checkAllEnabled = true;
            this.counsellinglists[i]['checked'] = true;
            this.counsellingStartlist.push(this.counsellinglists[i]);
            _tempSliceArr.push(i);
           // _tempCounsellingList.splice(i,1); 
          }
      }
        _tempCounsellingList.forEach(function(element,k) {
          var _keepGoing = true;
          for(var j=0;j<_tempSliceArr.length;j++)
          {
                if(_tempSliceArr[j] == k)
                {
                  _keepGoing = false;
                }
          }
        if(_keepGoing)
            _tempRemainingArray.push(element);
        });
        
      this.rerender();
      
      this.searchbarcode = ""; 
      this.dataservice.setdata({'csvspecimenstartdata':this.counsellingStartlist});
           
      this.dataservice.sendData(JSON.stringify({"module": "CSV SPECIMEN","pending":this.counsellinglists.length-this.counsellingStartlist.length,"start":this.counsellingStartlist.length}));
    }
    
          //this.counsellingTemplists = JSON.parse(JSON.stringify(_tempRemainingArray));


  }
  selectAll(event)
  {
      this.counsellingStartlist = [];
      this.dataservice.setdata({'csvspecimenstartdata':this.counsellingStartlist});
      this.dataservice.sendData(JSON.stringify({"module": "CSV SPECIMEN","pending":this.counsellingTemplists.length,"start":this.counsellingStartlist.length}));
      this.rerender();
      
  }
  removeCounsellingData(i, event)
  {
    var _tempRCHID = this.counsellingStartlist[i].rchId;
    var _rchMatchArray = [];
    for(var k =0;k<this.counsellingStartlist.length;k++)
    {
          if(this.counsellingStartlist[k].rchId == _tempRCHID)
          {
            _rchMatchArray.push(this.counsellingStartlist[k]);
          }
    }
    for( var l=this.counsellingStartlist.length - 1; l>=0; l--){
      for( var j=0; j<_rchMatchArray.length; j++){
          if(this.counsellingStartlist[l] && (this.counsellingStartlist[l].rchId === _rchMatchArray[j].rchId)){
            this.counsellingStartlist.splice(l, 1);
          }
      }
  }
    this.rerender();
    this.dataservice.setdata({'csvspecimenstartdata':this.counsellingStartlist});
    this.dataservice.sendData(JSON.stringify({"module": "CSV SPECIMEN","pending":this.counsellinglists.length-this.counsellingStartlist.length,"start":this.counsellingStartlist.length}));
   
  }
  ngAfterViewInit(): void {
    //this.dtTrigger.next();
  }   

  submitShipment()
  {
      this.firstFormCheck = true;

  if(this.firstFormGroup.valid)
  {
      var _tempBarcode;
      this.counsellingStartlist.forEach(function(val,index){
          if(index===0)
              _tempBarcode = val.pndtFoetusId;
          else
              _tempBarcode += ","+val.pndtFoetusId;
      });
      var _obj = {};
      _obj['pndtFoetusId'] = _tempBarcode;
      _obj['senderName'] = this.firstFormGroup.get('senderName').value;
      _obj['senderContact'] = this.firstFormGroup.get('senderContact').value;
      _obj['sendingLocation'] = this.firstFormGroup.get('sendingLocation').value;
      _obj['receivingMolecularLabId'] = Number(this.firstFormGroup.get('receivingMolecularLab').value);
      _obj['shipmentDateTime'] = moment(new Date(this.firstFormGroup.get('shipmentDate').value)).format("DD/MM/YYYY HH:MM"),
      _obj['pndtLocationId'] = this.user.pndtLocationId;
      _obj['userId'] = this.user.id;
      

      this.chcshipmentService.addPNDTShipment(_obj)
      .subscribe(response => {
        this.chcUploadResponse = response;
        if (this.chcUploadResponse !== null && this.chcUploadResponse.status === "true") {
          Swal.fire({ allowOutsideClick: false,icon:'success', title: 'Shipment ID is '+this.chcUploadResponse.shipment.shipmentId,
          showCancelButton: true, confirmButtonText: 'Shipment Log', cancelButtonText: 'Close' })
             .then((result) => {
                $('#fadeinModal').modal('hide');
               if (result.value) {
                this.dataservice.deleteProp('csvspecimenstartdata');
                this.counsellingStartlist = [];
                this.router.navigateByUrl(`app/csv-specimen`);
               }
               else{
                this.firstFormGroup.reset();
               
                this.dataservice.deleteProp('csvspecimenstartdata');
                this.counsellingStartlist = [];
                this.router.navigateByUrl(`app/csv-specimen`);
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
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
