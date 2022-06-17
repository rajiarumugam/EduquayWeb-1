import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AddChcResponse, ChcList } from 'src/app/shared/admin/add-chc/add-chc-response';
import { AddPhcRequest } from 'src/app/shared/admin/add-phc/add-phc-request';
import { AddPhcDataresponse, AddPhcResponse, PhcList } from 'src/app/shared/admin/add-phc/add-phc-response';
import { AddPhcService } from 'src/app/shared/admin/add-phc/add-phc.service';
import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-phc',
  templateUrl: './phc.component.html',
  styleUrls: ['./phc.component.css']
})
export class PhcComponent implements AfterViewInit, OnDestroy, OnInit {

    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;
    
    loadDataTable: boolean = false;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
  
    phclistErrorMessage: string;
    user: user;
  
    confirmationSelected: boolean ;
    phcListResponse;
    phclists: PhcList[];
    phcListRequest;
    addPhcResponse: AddPhcDataresponse;
    chcListResponse;
    chclists: ChcList[];
   
   
    selectedChc: string;
    getstate: string;
    selectedEditChc: string = '';
  
    districtGovCode: string;
    stateName: string;

    phcName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
    stateCode: string;
    phcnamedata: string;
    districtlists;
    hninId;
  
    commentsdata: string;
    getchc: string;
    phcCode: string;
  
    chcName: string;
    pincode: string;
   
   
    testingchcId : string;
    centrallablid : string;
    
   
    pincodeData: string;
    phcNamedata: string;
    phcCodedata: string;
    selectedEditBlock: string = '';
    districtListResponse;
    selectedDistrict = '';
    disabledChc = false;
    getdistrict = "";
    editPhcDetails;
  
    constructor(
    
      private PhcService: AddPhcService,
      private modalService: NgbModal,
      private httpService: HttpClient,
      private _formBuilder: FormBuilder,
      private loaderService: LoaderService,
      private activatedRoute: ActivatedRoute,
      private tokenService: TokenService,
      private dataservice: DataService,
    ) { }
  
    ngOnInit() {
      this.dataservice.sendData(JSON.stringify({"module": "Master", "submodule": "PHC"}));
      this.loaderService.display(false);
      this.user = JSON.parse(this.tokenService.getUser('lu'));
      this.dtOptions = { 
        pagingType: 'simple_numbers',
        pageLength: 20,
        processing: true,
        stripeClasses: [],
        lengthMenu: [5, 10, 20, 50],
        dom: "<'row mt-3'<'col-sm-6 float-right'f><'col-sm-4 mb-2 float-right'l><'col-sm-2 float-right'B>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-4'i><'col-sm-4 text-center'p>>",
        // Configure the buttons
          buttons: [
            {
              titleAttr: 'Download as Excel',     
              extend: 'excelHtml5',
              title: 'Report - Sample Status',
              className: 'custom-btn',
              text: '<img src="assets/assets/img/excelimage.png" width="23px" />'
            }
          ], 
        language: {
          search: '<div><span class="note">Search by any PHC information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
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
      this.retrirvePhclist();
    }
  
    retrirvePhclist(){
      this.loaderService.display(true);
      this.phclists = [];
      this.phclistErrorMessage ='';
      let samplesList = this.PhcService.getPhcList()
      .subscribe(response => {
        this.phcListResponse = response;
        this.loaderService.display(false);
        if(this.phcListResponse !== null){
          if(this.phcListResponse.data.length <= 0){
            this.phclistErrorMessage = response.message;
            
          }
          else{
            this.phclists = this.phcListResponse.data;
            this.phclists.forEach(element => {
              this.getchc = '' +(element.chcId);
             
            });
            //this.getstate = this.
            this.rerender();
            
          }
        }
        else{
          this.phclistErrorMessage = response.message;
        }
       
      },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.phclistErrorMessage = err.toString();
      });
    }

    ddlChc() {

      this.selectedChc = '';
      let district = this.PhcService.getChcList().subscribe(response => {
        this.chcListResponse = response;
        if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
          this.chclists = this.chcListResponse.data;
          this.selectedChc = "";
        }
        else {
          this.phclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.phclistErrorMessage = err.toString();
  
        });
    }

    ddlDistrict() {
      let district = this.PhcService.getDistrictList().subscribe(response => {
        this.districtListResponse = response;
        if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
          this.districtlists = this.districtListResponse.data;
          this.selectedDistrict = "";
        }
        else {
          this.phclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.phclistErrorMessage = err.toString();
  
        });
    }

    ddlEditDistrict() {
      let district = this.PhcService.getDistrictList().subscribe(response => {
        this.districtListResponse = response;
        if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
          this.districtlists = this.districtListResponse.data;
            this.selectedDistrict = this.getdistrict;
        }
        else {
          this.phclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.phclistErrorMessage = err.toString();
  
        });
    }
    ddlEditChc() {
      this.selectedEditChc = '';
      let district = this.PhcService.getChcList().subscribe(response => {
        this.chcListResponse = response;
        if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
          this.chclists = this.chcListResponse.chcDetails;
          this.selectedEditChc = this.getchc;
          
        }
        else {
          this.phclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.phclistErrorMessage = err.toString();
  
        });
    }
  
    districtChange()
    {
          console.log(this.selectedDistrict);

          this.selectedChc = '';
      let district = this.PhcService.getCHCByDis(this.selectedDistrict).subscribe(response => {
        this.chcListResponse = response;
        if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
          this.chclists = this.chcListResponse.data;
          this.selectedChc = "";
          this.disabledChc = true;
        }
        else {
          this.phclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.phclistErrorMessage = err.toString();
  
        });
    }

   
    openAddPhc(addPhcDetail) {
      
      //this.ddlChc();
      this.selectedChc="";
      this.disabledChc = false;
      this.ddlDistrict();
      this.confirmationSelected = Boolean("True");
      this.modalService.open(
        addPhcDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    openEditPhc(editPhcDetail, sample) {
  
      console.log(sample);
      //this.ddlEditChc();
      this.editPhcDetails = sample;
      this.getdistrict = sample.districtId;
      this.selectedDistrict =sample.districtId;
      this.ddlEditDistrict();
      setTimeout(() => {
        this.districtChange();
      }, 100);
     
      this.phcNamedata = sample.name;
      this.pincodeData = sample.pincode;
     
      this.selectedEditChc = "" +(sample.chcId)
      this.commentsdata = sample.comments;
      this.phcCodedata = sample.phcGovCode;
      this.hninId = sample.hninId;
      this.confirmationSelected = sample.isActive == 'True' ? true : false;
  
      this.modalService.open(
        editPhcDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    onSubmit(addPhcForm: NgForm){
  
      console.log(addPhcForm.value);
      
      this.comments = addPhcForm.value.Comments;
      this.selectedChc = addPhcForm.value.ddlChc;
      this.phcName = addPhcForm.value.phcName;
      this.pincode = addPhcForm.value.pincodeData;
      this.phcCode =  addPhcForm.value.phcCode     
      this.hninId = addPhcForm.value.hninId;
  

      this.phcListRequest = {
        chcId: +(this.selectedChc),
        hninId: this.hninId,
        phcGovCode: this.phcCode,
        name: this.phcName,
        pincode: this.pincode,
        comments: this.comments,      
        userId: this.user.id  
      };
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.PhcService.addPhc(this.phcListRequest)
      .subscribe(response => {
        this.addPhcResponse = response;
        if(this.addPhcResponse !== null && this.addPhcResponse.status == 'true'){
          this.showResponseMessage(this.addPhcResponse.message, 's')
           this.retrirvePhclist();
        }else{
          this.showResponseMessage(this.addPhcResponse.message, 'e');
                  this.phclistErrorMessage = response.message;
        }
  
      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.phclistErrorMessage = err.toString();
      });
      //swal ("Here's the title!", "...and here's the text!");
    }
  
    editSubmit(editPhcForm: NgForm){
  
      console.log(editPhcForm.value);
      
      this.commentsdata = editPhcForm.value.editcomments;
      this.selectedEditChc = editPhcForm.value.ddlEdChc;
      // this.phcCodedata = editPhcForm.value.phcCodedata;
      this.phcnamedata = editPhcForm.value.phcNamedata;
      this.pincodeData = editPhcForm.value.pincodeData;
       this.hninId = editPhcForm.value.hninId;
  
      this.phcListRequest = {
        id: this.editPhcDetails.id,
        chcId: +(this.selectedEditChc),
        
        phcGovCode: this.phcCodedata,
        name: this.phcNamedata,
        hninId: this.hninId,
        pincode: this.pincodeData,
        isActive: this.confirmationSelected,
        
        comments: this.commentsdata,
        userId: this.user.id,
      };
      console.log(this.phcListRequest);
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.PhcService.updatePhc(this.phcListRequest)
      .subscribe(response => {
        this.addPhcResponse = response;
        if(this.addPhcResponse !== null && this.addPhcResponse.status == 'true'){
          this.showResponseMessage(this.addPhcResponse.message, 's')
           this.retrirvePhclist();
        }else{
          this.showResponseMessage(this.addPhcResponse.message, 'e');
                  this.phclistErrorMessage = response.message;
        }
  
      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.phclistErrorMessage = err.toString();
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
