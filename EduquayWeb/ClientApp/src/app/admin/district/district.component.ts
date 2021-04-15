import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AddDistrictRequest } from 'src/app/shared/admin/add-district/add-district-request';
import { AddDistrictDataresponse, AddDistrictResponse, DistrictList } from 'src/app/shared/admin/add-district/add-district-response';
import { AddDistrictService } from 'src/app/shared/admin/add-district/add-district.service';
import { StateList, StateResponse } from 'src/app/shared/admin/state/state-response';

import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements AfterViewInit, OnDestroy, OnInit {

    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;
    
    loadDataTable: boolean = false;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
  
    districtlistErrorMessage: string;
    user: user;
  
    confirmationSelected: boolean ;
    districtListResponse;
    districtlists: DistrictList[];
    addDistrictRequest: AddDistrictRequest;
    addDistrictResponse;
    stateListResponse: StateResponse;
    statelists: StateList[];
    selectedState: string;
    getstate: string;
    selectedEditState: string;
  
    districtGovCode: string;
    stateName: string;

    districtName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
    stateCode: string;
    statetnamedata: string;
    districtcodedata: string;
    districtnamedata: string;
    commentsdata: string;
    selectedDistrictData;
   
  
    constructor(
      private DistrictService: AddDistrictService,
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
          search: '<div><span class="note">Search by any Subject information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
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
      this.retrirveDistrictlist();
    }
  
    retrirveDistrictlist(){
      this.loaderService.display(true);
      this.districtlists = [];
      this.districtlistErrorMessage ='';
      let samplesList = this.DistrictService.getDistrictList()
      .subscribe(response => {
        this.districtListResponse = response;
        this.loaderService.display(false);
        if(this.districtListResponse !== null && this.districtListResponse.status === "true"){
          if(this.districtListResponse.data.length <= 0){
            this.districtlistErrorMessage = response.message;
          }
          else{
            this.districtlists = this.districtListResponse.data;
            this.districtlists.forEach(element => {
              this.getstate = element.stateId;
            });
            this.rerender();
            
          }
        }
        else{
          this.districtlistErrorMessage = response.message;
        }
       
      },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.districtlistErrorMessage = err.toString();
      });
    }

    ddlState() {
      let district = this.DistrictService.getStateList().subscribe(response => {
        this.stateListResponse = response;
        if (this.stateListResponse !== null && this.stateListResponse.status === "true") {
          this.statelists = this.stateListResponse.data;
          this.selectedState = "";
        }
        else {
          this.districtlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.districtlistErrorMessage = err.toString();
  
        });
    }

    editddlState() {
      let district = this.DistrictService.getStateList().subscribe(response => {
        this.stateListResponse = response;
        if (this.stateListResponse !== null && this.stateListResponse.status === "true") {
          this.statelists = this.stateListResponse.data;
          this.selectedState = this.getstate;
        }
        else {
          this.districtlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.districtlistErrorMessage = err.toString();
  
        });
    }
  
    openAddDistrict(addDistrictDetail) {
      
      this.ddlState();
      this.modalService.open(
        addDistrictDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    openEditDistrict(editDistrictDetail, sample) {
  
      console.log(sample);
      this.editddlState();
      this.selectedDistrictData = sample;
      this.districtnamedata = sample.name;
      this.districtcodedata = sample.districtGovCode;
      this.selectedEditState = sample.stateId;
      this.commentsdata = sample.comments;
      this.confirmationSelected = Boolean(sample.isActive);
  
      this.modalService.open(
        editDistrictDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    onSubmit(addDistrictForm: NgForm){
  
      console.log(addDistrictForm.value);
      this.stateName = addDistrictForm.value.statename;
      this.districtGovCode = addDistrictForm.value.districtCode;
      this.districtName = addDistrictForm.value.districtname;
      this.comments = addDistrictForm.value.Comments;
      this.selectedState = addDistrictForm.value.ddlState;
  
      var _obj = {
        districtGovCode: this.districtGovCode,
        name: this.districtName,
        stateId: +(this.selectedState),
        comments: this.comments,
        userId: this.user.id
      };
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.DistrictService.addDistrict(_obj)
      .subscribe(response => {
        this.addDistrictResponse = response;
        if(this.addDistrictResponse !== null){
          this.showResponseMessage(this.addDistrictResponse.message, 's')
           this.retrirveDistrictlist();
        }else{
          this.showResponseMessage(this.addDistrictResponse.message, 'e');
                  this.districtlistErrorMessage = response['message'];
        }
  
      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.districtlistErrorMessage = err.toString();
      });
      //swal ("Here's the title!", "...and here's the text!");
    }
  
    editSubmit(editDistrictForm: NgForm){
      var _obj = {
        id:this.selectedDistrictData.id,
        districtGovCode: this.districtcodedata,
        name: this.districtnamedata,
        stateId: this.selectedEditState,
        isActive: this.confirmationSelected,
        comments: this.commentsdata,
        userId: this.user.id,
      };
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.DistrictService.updateDistrict(_obj)
      .subscribe(response => {
        this.addDistrictResponse = response;
        if(this.addDistrictResponse !== null){
          this.showResponseMessage(this.addDistrictResponse.message, 's')
           this.retrirveDistrictlist();
        }else{
          this.showResponseMessage(this.addDistrictResponse.message, 'e');
                  this.districtlistErrorMessage = response.string;
        }
  
      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.districtlistErrorMessage = err.toString();
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
