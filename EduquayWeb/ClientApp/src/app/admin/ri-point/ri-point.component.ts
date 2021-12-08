import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AddChcResponse, ChcList } from 'src/app/shared/admin/add-chc/add-chc-response';
import { AddPhcResponse, PhcList } from 'src/app/shared/admin/add-phc/add-phc-response';
import { AddRipointRequest } from 'src/app/shared/admin/add-ripoint/add-ripoint-request';
import { AddRipointResponse, AddRiPtDataresponse, RiList } from 'src/app/shared/admin/add-ripoint/add-ripoint-response';
import { AddRipointService } from 'src/app/shared/admin/add-ripoint/add-ripoint.service';
import { AddScRequest } from 'src/app/shared/admin/add-sc/add-sc-request';
import { AddScResponse, ScList } from 'src/app/shared/admin/add-sc/add-sc-response';
import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ri-point',
  templateUrl: './ri-point.component.html',
  styleUrls: ['./ri-point.component.css']
})
export class RiPointComponent implements AfterViewInit, OnDestroy, OnInit {

    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;
    
    loadDataTable: boolean = false;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
  
    ripointlistErrorMessage: string;
    user: user;
  
    confirmationSelected: boolean ;
    riPtListResponse;
    riptlists: RiList[];
    riptListRequest: AddRipointRequest;
    addriptResponse: AddRiPtDataresponse;
    chcListResponse;
    chclists: ChcList[];
    phcListResponse;
    phclists: PhcList[];
    scListResponse;
    sclists: ScList[];
    scListRequest: AddScRequest;
   
    selectedChc: string;
    getstate: string;
    selectedEditChc: string = '';
  
    districtGovCode: string;
    stateName: string;

    selectedDistrict = '';
    districtName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
    stateCode: string;
    blocknamedata: string;
    blockcodedata: string;
    districtnamedata: string;
    commentsdata: string;
    getchc: string;
    getphc: string;
    getsc: string;
    blockCodedata: string;
    selectedPhc: string = '';
    selectedSc: string = '';
    riCode: string;
    riName: string;
    pincode: string;
    
  
    testingchcId : string;
    centrallablid : string;
    
    
    pincodeData: string;
    chcNamedata: string;
    chcCodedata: string;
    selectedEditPhc: string = '';
    selectedEditSc: string = '';
    riNamedata: string;
    riCodedata: string;
    districtListResponse;
    districtlists;
  
    constructor(
    
      private RiPtService: AddRipointService,
      private modalService: NgbModal,
      private httpService: HttpClient,
      private _formBuilder: FormBuilder,
      private loaderService: LoaderService,
      private activatedRoute: ActivatedRoute,
      private tokenService: TokenService,
      private dataservice: DataService,
    ) { }
  
    ngOnInit() {
      this.dataservice.sendData(JSON.stringify({"module": "Master", "submodule": "RI Point"}));
      this.loaderService.display(false);
      this.user = JSON.parse(this.tokenService.getUser('lu'));
      this.dtOptions = { 
        pagingType: 'simple_numbers',
        pageLength: 20,
        processing: true,
        stripeClasses: [],
        lengthMenu: [5, 10, 20, 50],
        language: {
          search: '<div><span class="note">Search by any Ri information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
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
      this.retrieveRiPtList();
      this.ddlDistrict();
    }
  
    retrieveRiPtList(){
      this.loaderService.display(true);
      this.sclists = [];
      this.ripointlistErrorMessage ='';
      let samplesList = this.RiPtService.getRiList()
      .subscribe(response => {
        this.riPtListResponse = response;
        this.loaderService.display(false);
        if(this.riPtListResponse !== null){
          if(this.riPtListResponse.data.length <= 0){
            this.ripointlistErrorMessage = response.message;
            
          }
          else{
            this.riptlists = this.riPtListResponse.data;
            this.riptlists.forEach(element => {
              this.getchc = '' +(element.chcId);
              this.getphc = '' +(element.phcId);
              this.getsc = '' +(element.scId)
            });
            //this.getstate = this.
            this.rerender();
            
          }
        }
        else{
          this.ripointlistErrorMessage = response.message;
        }
       
      },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.ripointlistErrorMessage = err.toString();
      });
    }

    districtChange()
    {
          console.log(this.selectedDistrict);

          this.selectedChc = '';
      let district = this.RiPtService.getCHCByDis(this.selectedDistrict).subscribe(response => {
        this.chcListResponse = response;
        if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
          this.chclists = this.chcListResponse.data;
          this.selectedChc = "";
          //this.disabledChc = true;
        }
        else {
          this.ripointlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.ripointlistErrorMessage = err.toString();
  
        });
    }
    ddlDistrict() {
      let district = this.RiPtService.getDistrictList().subscribe(response => {
        this.districtListResponse = response;
        if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
          this.districtlists = this.districtListResponse.data;
          //this.selectedDistrict = "";
        }
        else {
          this.ripointlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.ripointlistErrorMessage = err.toString();
  
        });
    }
    ddlChc() {

      this.selectedChc = '';
      let district = this.RiPtService.getChcList().subscribe(response => {
        this.chcListResponse = response;
        if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
          this.chclists = this.chcListResponse.chcDetails;
          this.selectedChc = "";
        }
        else {
          this.ripointlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.ripointlistErrorMessage = err.toString();
  
        });
    }

    ddlEditChc() {
      this.selectedEditChc = '';
      let district = this.RiPtService.getChcList().subscribe(response => {
        this.chcListResponse = response;
        if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
          this.chclists = this.chcListResponse.chcDetails;
          this.selectedEditChc = this.getchc;
          this.onChangeEditChc(this.getchc);
        }
        else {
          this.ripointlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.ripointlistErrorMessage = err.toString();
  
        });
    }
    ddlPhc(code) {
      this.selectedPhc = '';
      let district = this.RiPtService.getPhcList(code).subscribe(response => {
        this.phcListResponse = response;
        if (this.phcListResponse !== null && this.phcListResponse.status === "true") {
          this.phclists = this.phcListResponse.data;
          this.selectedPhc = "";
         
        }
        else {
          this.ripointlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.ripointlistErrorMessage = err.toString();
  
        });
    }
    ddlEdtiPhc(code) {
      this.selectedEditPhc = '';
      let district = this.RiPtService.getPhcList(code).subscribe(response => {
        this.phcListResponse = response;
        if (this.phcListResponse !== null && this.phcListResponse.status === "true") {
          this.phclists = this.phcListResponse.phcDetails;
          if(this.phclists.length > 0){
            this.selectedEditPhc = this.getphc;
            
          }
                  
        }
        else {
          this.ripointlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.ripointlistErrorMessage = err.toString();
  
        });
    }
    ddlSc(code) {
      this.selectedPhc = '';
      let district = this.RiPtService.getScList(code).subscribe(response => {
        this.scListResponse = response;
        if (this.scListResponse !== null && this.scListResponse.status === "true") {
          this.sclists = this.scListResponse.data;
          this.selectedSc = "";
         
        }
        else {
          this.ripointlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.ripointlistErrorMessage = err.toString();
  
        });
    }
    ddlEdtiSc(code) {
      this.selectedEditPhc = '';
      let district = this.RiPtService.getScList(code).subscribe(response => {
        this.scListResponse = response;
        if (this.scListResponse !== null && this.scListResponse.status === "true") {
          this.sclists = this.scListResponse.scDetails;
          if(this.sclists.length > 0){
            this.selectedEditSc = this.getsc;
            
          }
                  
        }
        else {
          this.ripointlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.ripointlistErrorMessage = err.toString();
  
        });
    }
    onChangeChc(event) {
  
      if (this.selectedChc === '') {
        this.selectedPhc = '';
      }
      else {
        this.ddlPhc(this.selectedChc);
      }
    }
    onChangeEditChc(event) {
  
      if (this.selectedEditChc === '') {
        this.selectedEditPhc = '';
      }
      else {
        this.ddlEdtiPhc(this.selectedEditChc);
      }
    }
    onChangePhc(event) {
  
      if (this.selectedPhc === '') {
        this.selectedSc = '';
      }
      else {
        this.ddlSc(this.selectedPhc);
      }
    }
    onChangeEditPhc(event) {
  
      if (this.selectedEditPhc === '') {
        this.selectedEditSc = '';
      }
      else {
        this.ddlEdtiSc(this.selectedEditPhc);
      }
    }
   
  
    openAddRiPt(addRiPtDetail) {
      
      //this.ddlChc();
      //this.ddlPhc(this.selectedPhc);
      this.confirmationSelected = Boolean("True");
      this.modalService.open(
        addRiPtDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    openEditRiPt(editRiPtDetail, sample: RiList) {
  
      this.ddlEditChc();
      //this.ddlEdtiPhc(this.user.chcId);
      this.riNamedata = sample.riSite;
      this.riCodedata = sample.riGovCode;
      this.pincodeData = sample.pincode;
    
      
      this.selectedEditChc = "" +(sample.chcId);
      this.selectedEditPhc = "" +(sample.phcId);
      this.selectedEditSc = "" +(sample.scId)
      this.commentsdata = sample.comments;
      this.confirmationSelected = Boolean(sample.isActive);
  
      this.modalService.open(
        editRiPtDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    onSubmit(addRiPtForm: NgForm){
  
      console.log(addRiPtForm.value);
      
      this.comments = addRiPtForm.value.Comments;
      this.selectedChc = addRiPtForm.value.ddlChc;
      this.selectedPhc = addRiPtForm.value.ddlPhc;
      this.selectedSc = addRiPtForm.value.ddlSc;
      this.riCode = addRiPtForm.value.riCode;
      this.riName = addRiPtForm.value.riName;
      this.pincode = addRiPtForm.value.pincodeData;
     
  
      this.riptListRequest = {
        testingCHCId: 0,
        chcId: +(this.selectedChc),
        phcId: +(this.selectedPhc),
        scId: +(this.selectedSc),
        riGovCode: this.riCode,
        riSite: this.riName,
        ilrId: 0, 
        pincode: this.pincode,
        isActive: ""+this.confirmationSelected,
        comments: this.comments,
        
        createdBy: this.user.id,
        updatedBy: this.user.id
      };
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.RiPtService.addRiPt(this.riptListRequest)
      .subscribe(response => {
        this.addriptResponse = response;
        if(this.addriptResponse !== null){
          this.showResponseMessage(this.addriptResponse.message, 's')
           this.retrieveRiPtList();
        }else{
          this.showResponseMessage(this.addriptResponse.message, 'e');
                  this.ripointlistErrorMessage = response.message;
        }
  
      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.ripointlistErrorMessage = err.toString();
      });
      //swal ("Here's the title!", "...and here's the text!");
    }
  
    editSubmit(editScForm: NgForm){
  
      console.log(editScForm.value);
      
      this.commentsdata = editScForm.value.commentsdata;
      this.selectedEditPhc = editScForm.value.ddlEditChc;
      this.selectedEditChc = editScForm.value.ddlEditPhc;
      this.selectedEditSc = editScForm.value.ddlEditSc;
      this.riCodedata = editScForm.value.scCodedata;
      this.riNamedata = editScForm.value.scNamedata;
      this.pincodeData = editScForm.value.pincodeData;
     
  
  
      this.riptListRequest = {
        testingCHCId: 0,
        chcId: +(this.selectedEditChc),
        phcId: +(this.selectedEditPhc),
        scId: +(this.selectedEditSc),
        riGovCode: this.riCodedata,
        riSite: this.riNamedata,
        ilrId: 0, 
        pincode: this.pincodeData,
        isActive: ""+this.confirmationSelected,
        comments: this.commentsdata,
      
        createdBy: this.user.id,
        updatedBy: this.user.id
      };
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.RiPtService.addRiPt(this.riptListRequest)
      .subscribe(response => {
        this.addriptResponse = response;
        if(this.addriptResponse !== null){
          this.showResponseMessage(this.addriptResponse.message, 's')
           this.retrieveRiPtList();
        }else{
          this.showResponseMessage(this.addriptResponse.message, 'e');
                  this.ripointlistErrorMessage = response.message;
        }
  
      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.ripointlistErrorMessage = err.toString();
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

