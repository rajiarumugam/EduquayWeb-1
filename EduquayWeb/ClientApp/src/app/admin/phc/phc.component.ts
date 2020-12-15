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
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
  
    phclistErrorMessage: string;
    user: user;
  
    confirmationSelected: boolean ;
    phcListResponse: AddPhcResponse;
    phclists: PhcList[];
    phcListRequest: AddPhcRequest;
    addPhcResponse: AddPhcDataresponse;
    chcListResponse: AddChcResponse;
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
  
    commentsdata: string;
    getchc: string;
    phcCode: string;
  
    chcName: string;
    pincode: string;
    latitude: string;
    longitude : string;
    testingchcId : string;
    centrallablid : string;
    longitudedata: string;
    latitudedata: string;
    pincodeData: string;
    phcNamedata: string;
    phcCodedata: string;
    selectedEditBlock: string = '';
  
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
          if(this.phcListResponse.phcDetails.length <= 0){
            this.phclistErrorMessage = response.message;
            
          }
          else{
            this.phclists = this.phcListResponse.phcDetails;
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
          this.chclists = this.chcListResponse.chcDetails;
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
  
     
    openAddPhc(addPhcDetail) {
      
      this.ddlChc();
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
  
    openEditPhc(editPhcDetail, sample: PhcList) {
  
      this.ddlEditChc();
      this.phcNamedata = sample.phcName;
      this.pincodeData = sample.pincode;
      this.latitudedata = sample.latitude;
      this.longitudedata = sample.longitude;
      this.selectedEditChc = "" +(sample.chcId)
      this.commentsdata = sample.comments;
      this.phcCodedata = sample.phcGovCode;
      this.confirmationSelected = Boolean(sample.isActive);
  
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
      this.latitude = addPhcForm.value.latitudeData;
      this.longitude = addPhcForm.value.longitudeData;
  
      this.phcListRequest = {
        chcId: +(this.selectedChc),
        hninId: "",
        phcGovCode: this.phcCode,
        phcName: this.phcName,
        isActive: "" + this.confirmationSelected,
        pincode: this.pincode,
        comments: this.comments,
        latitude: this.latitude,
        longitude: this.longitude,
        createdBy: this.user.id,
        updatedBy: this.user.id
      };
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.PhcService.addPhc(this.phcListRequest)
      .subscribe(response => {
        this.addPhcResponse = response;
        if(this.addPhcResponse !== null){
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
      
      this.commentsdata = editPhcForm.value.commentsdata;
      this.selectedEditChc = editPhcForm.value.ddlEditChc;
      this.phcCodedata = editPhcForm.value.phcCodedata;
      this.phcnamedata = editPhcForm.value.phcNamedata;
      this.pincodeData = editPhcForm.value.pincodeData;
      this.latitudedata = editPhcForm.value.latitudeData;
      this.longitudedata = editPhcForm.value.longitudeData;
  
  
      this.phcListRequest = {
        chcId: +(this.selectedEditChc),
        hninId: "",
        phcGovCode: this.phcCodedata,
        phcName: this.phcnamedata,
        isActive: "" + this.confirmationSelected,
        pincode: this.pincodeData,
        comments: this.commentsdata,
        latitude: this.latitudedata,
        longitude: this.longitudedata,
        createdBy: this.user.id,
        updatedBy: this.user.id
      };
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.PhcService.addPhc(this.phcListRequest)
      .subscribe(response => {
        this.addPhcResponse = response;
        if(this.addPhcResponse !== null){
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
