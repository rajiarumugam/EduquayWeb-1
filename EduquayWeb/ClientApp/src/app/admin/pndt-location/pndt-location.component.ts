import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AddDistrictRequest } from 'src/app/shared/admin/add-district/add-district-request';

import { PndtList } from 'src/app/shared/admin/add-pndtlocation/add-pndtlocation-response';
import { AddPNDTService } from 'src/app/shared/admin/add-pndtlocation/add-pndtlocation.service';
import { StateList, StateResponse } from 'src/app/shared/admin/state/state-response';

import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pndt-location',
  templateUrl: './pndt-location.component.html',
  styleUrls: ['./pndt-location.component.css']
})
export class PndtLocationComponent implements AfterViewInit, OnDestroy, OnInit {

    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;

    loadDataTable: boolean = false;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

    pndtlistErrorMessage: string;
    user: user;
    confirmationSelected: boolean ;
    pndtListResponse;
    pndtlists: PndtList[];
    addpndtRequest: AddDistrictRequest;
    addPNDTResponse
    statelists: StateList[];
    selectedState: string;
    getstate: string;
    selectedEditState: string;
    pndtCode: string;
    stateName: string;
    pndtlocationName: string;
    isActive: string;

    comments: string;
    createdBy: number;
    updatedBy: number;
    stateCode: string;
    statetnamedata: string;
    pndtcodedata: string;
    pndtlocationNamedata: string;
    commentsdata: string;1
    selectedPNDTData;

    constructor(
      private PNDTService: AddPNDTService,
      private modalService: NgbModal,
      private httpService: HttpClient,
      private _formBuilder: FormBuilder,
      private loaderService: LoaderService,
      private activatedRoute: ActivatedRoute,
      private tokenService: TokenService,
      private dataservice: DataService,
    ) { }

    ngOnInit() {
      this.dataservice.sendData(JSON.stringify({"module": "Master", "submodule": "District"}));
      this.loaderService.display(false);
      this.user = JSON.parse(this.tokenService.getUser('lu'));
      this.dtOptions = {
        pagingType: 'simple_numbers',
        pageLength: 20,
        processing: true,
        stripeClasses: [],
        lengthMenu: [5, 10, 20, 50],
        language: {
          search: '<div><span class="note">Search by any PNDT information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
          searchPlaceholder: "Search...",
          lengthMenu: "Records / Page :  _MENU_",
          paginate: {
            first: '',
            last: '', // or '←'
            previous: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
            next: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
          },
          //Search: '<a class="btn searchBtn" id="searchBtn"><i class="fa fa-search"></i></a>'
        }
      };
      this.retrievePNDTlist();

    }

    retrievePNDTlist(){
      console.log("testing")
      this.loaderService.display(true);
      this.pndtlists = [];
      this.pndtlistErrorMessage ='';
      let samplesList = this.PNDTService.getallPNDTList()
      .subscribe(response => {
        this.pndtListResponse = response;
        this.loaderService.display(false);
        if(this.pndtListResponse !== null && this.pndtListResponse.status === "true"){
          if(this.pndtListResponse.data.length <= 0){
            this.pndtlistErrorMessage = response.message;
          }
          else{
            this.pndtlists = this.pndtListResponse.data;
            this.rerender();



          }
        }
        else{
          this.pndtlistErrorMessage = response.message;
        }
      },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.pndtlistErrorMessage = err.toString();
      });
    }



    openAddPNDT(addPNDTDetail) {


      this.modalService.open(
        addPNDTDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });

    }

    openEditPNDT(editPNDTDetail, sample) {

      console.log(sample);

      this.selectedPNDTData = sample;
      this.pndtlocationNamedata = sample.pndtlocationName;
      this.pndtcodedata = sample.pndtCode;

      this.commentsdata = sample.comments;
      this.confirmationSelected = sample.isActive == 'True' ? true : false;

      this.modalService.open(
        editPNDTDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });

    }

    onSubmit(addPndtForm: NgForm){

      console.log(addPndtForm.value);
      this.pndtCode = addPndtForm.value.pndtCode;
      this.pndtlocationName = addPndtForm.value.pndtlocationName;
      this.comments = addPndtForm.value.Comments;


      var _obj = {
        pndtCode: this.pndtCode,
        pndtlocationName: this.pndtlocationName,
        comments: this.comments,
        userId: this.user.id+"",
        isactive:this.confirmationSelected+""
      };

      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;

      let damagedsampleCollection = this.PNDTService.addpndt(_obj)
      .subscribe(response => {
        this.addPNDTResponse = response;
        if(this.addPNDTResponse !== null && this.addPNDTResponse.status === "true"){
          this.showResponseMessage(this.addPNDTResponse.message, 's')
           this.retrievePNDTlist();
        }else{
          this.showResponseMessage(this.addPNDTResponse.message, 'e');
                  this.pndtlistErrorMessage = response['message'];
        }

      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.pndtlistErrorMessage = err.toString();
      });
      //swal ("Here's the title!", "...and here's the text!");
    }

    editSubmit(editPNDTForm: NgForm){
      var _obj = {
        id:this.selectedPNDTData.id,
        pndtCode: this.pndtcodedata,
        pndtlocationName: this.pndtlocationNamedata,
        isActive: this.confirmationSelected+"",
        comments: this.commentsdata,
        userId: this.user.id+"",
      };

      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;

      let damagedsampleCollection = this.PNDTService.updatePNDT(_obj)
      .subscribe(response => {
        this.addPNDTResponse = response;
        if(this.addPNDTResponse !== null && this.addPNDTResponse.status === "true"){
          this.showResponseMessage(this.addPNDTResponse.message, 's')
           this.retrievePNDTlist();
        }else{
          this.showResponseMessage(this.addPNDTResponse.message, 'e');
                  this.pndtlistErrorMessage = response.string;
        }

      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.pndtlistErrorMessage = err.toString();
      });
      //swal ("Here's the title!", "...and here's the text!");
    }

    showResponseMessage(string: string, type: string){
      var messageType = '';
      if(type === 'e'){
        Swal.fire({icon:'error', title: string, confirmButtonText: 'Close', allowOutsideClick: false})
      }
      else{
        Swal.fire({icon:'success', title: string, confirmButtonText: 'Close', allowOutsideClick: false})
        .then((result) => {
          if (result.value) {
            if(this.modalService.hasOpenModals){
              this.modalService.dismissAll();

            }
          }
        });
      }
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
