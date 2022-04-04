import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AddHPLCRequest } from 'src/app/shared/admin/add-hplc/add-hplc-request';
import { AddHPLCDataresponse,AddHPLCResponse, HPLCList } from 'src/app/shared/admin/add-hplc/add-hplc-response';
import { AddDistrictResponse, DistrictList } from 'src/app/shared/admin/add-district/add-district-response';
import { AddHPLCService } from 'src/app/shared/admin/add-hplc/add-hplc.service';
import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hplc',
  templateUrl: './hplc.component.html',
  styleUrls: ['./hplc.component.css']
})
export class HPLCComponent implements AfterViewInit, OnDestroy, OnInit {

    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;

    loadDataTable: boolean = false;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

    HPLClistErrorMessage: string;
    user: user;
    Editsample;
    confirmationSelected;
    HPLCListResponse;
    HPLClists: HPLCList[];
    HPLCListRequest: AddHPLCRequest;
    addHPLCResponse: AddHPLCDataresponse;
    districtListResponse;
    disableddis:boolean =true;
    districtlists: DistrictList[];
    selectedDistrict: string;
    getstate: string;
    selectedEditDistrict: string;
    districtName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
    HPLCnamedata: string;
    HPLCCodedata: string;
    districtnamedata: string;
    commentsdata: string;
    getdistrict: string;  
    editHPLCDetails;
  hplcCodedata: any;


    constructor(
      private HPLCService: AddHPLCService,
      private modalService: NgbModal,
      private httpService: HttpClient,
      private _formBuilder: FormBuilder,
      private loaderService: LoaderService,
      private activatedRoute: ActivatedRoute,
      private tokenService: TokenService,
      private dataservice: DataService,
    ) { }

    ngOnInit() {
      this.dataservice.sendData(JSON.stringify({"module": "Master", "submodule": "HPLC"}));
      this.loaderService.display(false);
      this.user = JSON.parse(this.tokenService.getUser('lu'));
      this.dtOptions = {
        pagingType: 'simple_numbers',
        pageLength: 20,
        processing: true,
        stripeClasses: [],
        lengthMenu: [5, 10, 20, 50],
        language: {
          search: '<div><span class="note">Search by any HPLC information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
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
      this.retrieveHPLCist();
      this.rerender();
    }

    retrieveHPLCist(){
      this.loaderService.display(true);
      this.HPLClists = [];
      this.HPLClistErrorMessage ='';
      let samplesList = this.HPLCService.getHPLCList()
      .subscribe(response => {
        this.HPLCListResponse = response;
        this.loaderService.display(false);
        if(this.HPLCListResponse !== null){
          if(this.HPLCListResponse.data.length <= 0){
            this.HPLClistErrorMessage = response.message;
          }
          else{
            this.HPLClists = this.HPLCListResponse.data;
            this.HPLClists.forEach(element => {
              this.getdistrict = element.districtId;
            });
            //this.getstate = this.
          
          }
        }
        else{
          this.HPLClistErrorMessage = response.message;
        }

      },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.HPLClistErrorMessage = err.toString();
      });
    }

    ddlDistrict() {
      let district = this.HPLCService.getDistrictList().subscribe(response => {
        this.districtListResponse = response;
        if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
          this.districtlists = this.districtListResponse.data;
          this.selectedDistrict = "";
        }
        else {
          this.HPLClistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.HPLClistErrorMessage = err.toString();
        });
    }

    openAddHPLC(addHPLCDetail) {

      this.ddlDistrict();
      this.confirmationSelected = true;
      this.modalService.open(
        addHPLCDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
    }

    openEditHPLC(editHPLCDetail, sample) {

      this.editHPLCDetails = sample;
      this.ddlDistrict();
      this.selectedEditDistrict = sample.districtID;
      this.HPLCnamedata = sample.hplcName;
      this.hplcCodedata = sample.hplcCode;
      this.commentsdata = sample.comments;
      this.confirmationSelected = sample.isActive == 'True' ? true : false;

      this.modalService.open(
        editHPLCDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
    }

    onSubmit(addHPLCForm: NgForm){

      console.log(addHPLCForm.value);
      this.HPLCnamedata = addHPLCForm.value.hplcName;
      this.hplcCodedata = addHPLCForm.value.hplcCode;
      this.districtName = addHPLCForm.value.districtname;
      this.comments = addHPLCForm.value.Comments;
      this.selectedDistrict = addHPLCForm.value.ddlDistrict;

      var _obj = {
        hplcCode: this.HPLCCodedata,
        hplcName: this.HPLCnamedata,
        districtId: +(this.selectedDistrict),
        comments: this.comments,
        userId: this.user.id+"",
        isactive:this.confirmationSelected+""
      };

      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;

      let damagedsampleCollection = this.HPLCService.addHPLC(_obj)
      .subscribe(response => {
        this.addHPLCResponse = response;
        if(this.addHPLCResponse !== null && this.addHPLCResponse.status === "true"){
          this.showResponseMessage(this.addHPLCResponse.message, 's')
           this.retrieveHPLCist();
        }else{
          this.showResponseMessage(this.addHPLCResponse.message, 'e');
                  this.HPLClistErrorMessage = response.message;
        }

      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.HPLClistErrorMessage = err.toString();
      });
      //swal ("Here's the title!", "...and here's the text!");
    }

    editSubmit(editDistrictForm: NgForm){

      console.log(editDistrictForm.value);
     
 console.log(this.HPLCCodedata);
     var _obj = {
        id:this.editHPLCDetails.id,
        hplcCode: this.hplcCodedata,
        hplcName: this.HPLCnamedata,
        districtId: +(this.selectedEditDistrict),
        isActive: this.confirmationSelected+"",
        comments: this.commentsdata,
        userId: this.user.id+""
      };

      let damagedsampleCollection = this.HPLCService.updateHPLC(_obj)
      .subscribe(response => {
        this.addHPLCResponse = response;
        if(this.addHPLCResponse !== null && this.addHPLCResponse.status === "true"){
          this.showResponseMessage(this.addHPLCResponse.message, 's')
           this.retrieveHPLCist();
        }else{
          this.showResponseMessage(this.addHPLCResponse.message, 'e');
                  this.HPLClistErrorMessage = response.message;
        }

      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.HPLClistErrorMessage = err.toString();
      });
      //swal ("Here's the title!", "...and here's the text!");
    }

    showResponseMessage(message: string, type: string){
      var messageType = '';
      if(type === 'e'){
        Swal.fire({icon:'error', title: message, confirmButtonText: 'Close', allowOutsideClick: false})
      }
      else{
        Swal.fire({icon:'success', title: message, confirmButtonText: 'Close', allowOutsideClick: false})
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
