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
declare var $: any 

@Component({
  selector: 'app-HPLC-update-new-received',
  templateUrl: './HPLC-update-new-received.component.html',
  styleUrls: ['./HPLC-update-new-received.component.css']
})
export class HPLCReceivedNewComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
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

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    zone: NgZone,
    private route: ActivatedRoute,
    private DataService:DataService,
    private tokenService: TokenService, 
    private centralsampleService: centralsampleService,
    private _formBuilder: FormBuilder
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
    
    this.chcReceiptsData = [];
    var chcReceiptsArr = this.route.snapshot.data.positiveSubjects;
    if(chcReceiptsArr !== undefined && chcReceiptsArr.status.toString() === "true"){
      var _tempData = chcReceiptsArr.hplcDetail;
      if(this.DataService.getdata().cbcuploaddata != undefined)
      {
          var _tempUploadData = this.DataService.getdata().cbcuploaddata;
          _tempUploadData.forEach((obj)=>{
            var existNotification = _tempData.findIndex(({barcodeNo}) => obj.barcodeNo == barcodeNo);
            _tempData.splice(existNotification,1);
          });
      }
        this.chcReceiptsData = _tempData;
        console.log(this.chcReceiptsData);
      this.DataService.sendData(JSON.stringify({'screen':'CBC','page':"received","uploadcount":0,"receivedcount":this.chcReceiptsData.length, "module": "CHC- SAMPLE REC & PROCESS", "submodule": "Update CBC Results", "pagealter": "Received Samples"}));
    }
    else{
      this.errorMessage = chcReceiptsArr.message;
    }

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
    .then((result) => {
      if (result.value) {
       //this.postData(_obj);
       this.updateData(_obj);
      }
      else {
        console.log('hitting no');
      }
    });
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
    refreshdata()
    {
      this.centralsampleService.retriveHPLCtestData().subscribe(response => {
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

    hplcEdit(data,type)
    {
      console.log(data);
      this.selectedData = data;
     

     this.selectedHBA0 = data.hbA0;
     this.selectedHbA2 = data.hbA2;
     this.selectedsHbD = data.hbD;
     this.selectedHbF = data.hbF;
     this.selectedHbS = data.hbS;
      $('#fadeinModal').modal('show');
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
