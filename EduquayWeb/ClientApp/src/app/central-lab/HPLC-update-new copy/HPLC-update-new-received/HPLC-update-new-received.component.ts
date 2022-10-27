import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { TokenService } from '../../../shared/token.service';

import { DataService } from '../../../shared/data.service';
import { chcsampleService } from '../../../shared/chc-sample/chc-sample.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { HttpErrorResponse } from '@angular/common/http';
import { centralsampleService } from 'src/app/shared/centrallab/central-sample.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any 
import { FlatpickrOptions } from 'ng2-flatpickr';

@Component({
  selector: 'app-HPLC-update-new-received',
  templateUrl: './HPLC-update-new-received.component.html',
  styleUrls: ['./HPLC-update-new-received.component.css']
})
export class HPLCReceivedNewMaldiComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;
  @ViewChild('startPicker', { static: false }) pickerStart;
  @ViewChild('endPicker', { static: false }) pickerEnd;
  errorMessage: string;
  errorSpouseMessage: string;
  sampleTimeOut = false;
  user;
  firstFormGroup: FormGroup;
  selectedHBA0;
  selectedHbA2;
  selectedsHbD;
  selectedHbF;
  selectedHbS;
  secondFormCheck = false;
  chcReceiptsData: any[] = [];

  selectedData;
  subjectName;
  subjectBarcode;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  searchbarcode: any;
  popupform: FormGroup;
  DAY = 86400000;
  collectionDateOptions: FlatpickrOptions = {
    mode: 'single',
    altFormat: 'd.m.Y H:i',
    enableTime: true,
    dateFormat: 'd.m.Y H:i',
    defaultDate: new Date(Date.now() ),
    
  };
  startOptions: FlatpickrOptions = {

    enableTime: true,
    dateFormat: "Y-m-d H:i",

  };

  endOptions: FlatpickrOptions = {
    
    mode: 'single',
    enableTime: true,
    altFormat: 'd.m.Y H:i',
    dateFormat: 'd.m.Y H:i',
    defaultDate: new Date(),


  };
  constructor(
    zone: NgZone,
    private route: ActivatedRoute,
    private DataService:DataService,
    private tokenService: TokenService, 
    private centralsampleService: centralsampleService,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal
    ) { }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      HbA0: ['', Validators.required],
      HbA2: ['', Validators.required],
      HbD: ['', Validators.required],
      HbF: ['', Validators.required],
      HbS: ['', Validators.required]
   });
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    console.log(JSON.stringify(this.user))
    //this.DataService.sendData(JSON.stringify({"module": "CHC- SAMPLE REC & PROCESS", "page": "Update CBC Results"}));
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
    
    this.refreshdata()

  }
  
    ngAfterViewInit(): void {
      this.dtTrigger.next();
    }   
  
    confirm(data,type)
    {
        console.log(data);
        console.log(type);

        var _obj = {};
        _obj["subjectId"] = data.subjectId;
        _obj["userId"] = this.user.id;
        _obj["centralLabId"] = this.user.centralLabId;
        _obj["testId"] = data.testId;


    
  Swal.fire({
    icon: 'success', title:  "Barcode: "+data.barcodeNo+" HbA0: "+data.hbA0+" HbA2: "+data.hbA2+" HbD: "+data.hbD+" HbF: "+data.hbF+" HbS: "+data.hbS+" Do you want to confirm?",
    showCancelButton: true, confirmButtonText: 'Yes', cancelButtonText: 'No', allowOutsideClick: false
  })
    .then((result) => {
      if (result.value) {
       this.postData(_obj);
      }
      else {
        console.log('hitting no');
        
      }
    });
    
    
  console.log(_obj);
    }

    sampleSubmit()
    {
        this.secondFormCheck = true;

        var _obj = {};
        _obj["hbF"] = this.selectedHbF;
        _obj["hbA0"] = this.selectedHBA0;
        _obj["hbA2"] = this.selectedHbA2;
        _obj["hbD"] = this.selectedsHbD;
        _obj["hbS"] = this.selectedHbS;
        _obj["userId"] = this.user.id;
        _obj["testId"] = this.selectedData.testId;

    
  Swal.fire({
    icon: 'success', title:  "HbA0: "+this.selectedHBA0+" HbA2: "+this.selectedHbA2+" HbD: "+this.selectedsHbD+" HbF: "+this.selectedHbF+" HbS: "+this.selectedHbS+" Do you want to Update?",
    showCancelButton: true, confirmButtonText: 'Yes', cancelButtonText: 'No', allowOutsideClick: false
  })
  Swal.fire({
    icon: 'success', title: "Updated Successfully",
    showCancelButton: true, confirmButtonText: 'Yes', cancelButtonText: 'No', allowOutsideClick: false
  })
    .then((result) => {
      if (result.value) {
       //this.postData(_obj);
       this.updateData(_obj);
      }
      else {
        console.log('hitting no');
      }
    });
    $('#fadeinModal').modal('hide');
    }
    postData(_obj)
    {

      this.centralsampleService.addHSBCtestNew(_obj)
      .subscribe(response => {
        var _response = response;
        if (_response !== null && _response.status === "true") {
            Swal.fire({ allowOutsideClick: false,
              text: _response.message,
              icon: 'success'
            }).then((result) => {
              this.refreshdata();
            });
            
        } else {
          
          this.errorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          //this.showResponseMessage(err.toString(), 'e');
        });
    }

    updateData(_obj)
    {

      this.centralsampleService.updateHSBCtest(_obj)
      .subscribe(response => {
        var _response = response;
        if (_response !== null && _response.status === "true") {
            Swal.fire({ allowOutsideClick: false,
              text: _response.message,
              icon: 'success'
            }).then((result) => {
              $('#fadeinModal').modal('hide');
              this.refreshdata();
            });
            
        } else {
          
          this.errorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          //this.showResponseMessage(err.toString(), 'e');
        });
    }
    onChange(samplepicknPackdetail, primarytube,addChcDetail) {

      console.log(samplepicknPackdetail);
      // this.tempCHCDatas = [];
      console.log('changed', this.searchbarcode, primarytube);
      primarytube = this.searchbarcode;
      //this.searchbarcode = primarytube;
      var getindex = this.chcReceiptsData.findIndex(com => com.barcodeNo === primarytube)
      if (getindex >= 0) {
        console.log(this.chcReceiptsData[getindex]);
        this.subjectName = this.chcReceiptsData[getindex].subjectId;
        this.subjectBarcode = this.chcReceiptsData[getindex].barcodeNo;
        
     /* Swal.fire({
        icon: 'success', title: "Do you want to update the Preparation time of Dried Blood Sample  with barcode  "+this.searchbarcode+"   as  "+moment().format('DD-MM-YY HH:mm')+" ? ",
        showCancelButton: true, confirmButtonText: 'Yes', cancelButtonText: 'No', allowOutsideClick: true
      }).then((result) => {
        if (result.value) {
        this.hplcEdit(this.searchbarcode,'')
        }
        else {
          console.log('hitting no');
          
       
        }
      });*/

      this.modalService.open(
        addChcDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
      this.popupform = this._formBuilder.group({
        collectionDate: [new Date(moment().add(-1, 'day').format())],
      });
    }
  
      // var getindex = this.chcsamplepickpack.findIndex(com => com.barcodeNo && com.dbsCompletedDate!=null === primarytube)
      //var getexistsindex = this.tempCHCDatas.findIndex(data => data.barcodeNo === term)
     
      
    }
    refreshdata()
    {
      this.centralsampleService.retriveMaldiSpotting().subscribe(response => {
        if(response.status === "true")
        {
          this.chcReceiptsData = response.hplcDetail;
          this.DataService.sendData(JSON.stringify({'screen':'CBC','page':"received","uploadcount":0,"receivedcount":this.chcReceiptsData.length, "module": "CHC- SAMPLE REC & PROCESS", "submodule": "Update CBC Results", "pagealter": "Received Samples"}));
          this.rerender();
        }        
      },
      (err: HttpErrorResponse) =>{
        console.log(err);
      });
    }
    submitDate() {
      console.log(this.popupform.value.collectionDate);

      this.hplcEdit(this.searchbarcode,this.popupform.value.collectionDate[0]);
    }
    hplcEdit(barcode,tim)
    {
      let temptime = moment().format('YYYY-MM-DD HH:mm:ss');
      if(tim === ''){
        temptime = moment().format('YYYY-MM-DD HH:mm:ss');
      } else {
        temptime = moment(tim).format('YYYY-MM-DD HH:mm:ss');
      }
      this.centralsampleService.addDbsSpottingTime({'dbsTime':temptime,'barcode':barcode}).subscribe(response => {
      console.log(response)
      
      },
      (err: HttpErrorResponse) =>{
        console.log(err);
      });
      this.modalService.dismissAll();
      Swal.fire({
        icon: 'success', title: "Updated Successfully",
        showCancelButton: false, confirmButtonText: 'Yes', cancelButtonText: 'No', allowOutsideClick: true
      })
      this.refreshdata()
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
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
}
