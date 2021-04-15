import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AddChcResponse, ChcList } from 'src/app/shared/admin/add-chc/add-chc-response';
import { AddPhcResponse, PhcList } from 'src/app/shared/admin/add-phc/add-phc-response';
import { AddScRequest } from 'src/app/shared/admin/add-sc/add-sc-request';
import { AddScDataresponse, AddScResponse, ScList } from 'src/app/shared/admin/add-sc/add-sc-response';
import { AddScService } from 'src/app/shared/admin/add-sc/add-sc.service';
import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sc',
  templateUrl: './sc.component.html',
  styleUrls: ['./sc.component.css']
})
export class ScComponent implements AfterViewInit, OnDestroy, OnInit {

    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;
    
    loadDataTable: boolean = false;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
  
    sclistErrorMessage: string;
    user: user;
  
    confirmationSelected: boolean ;
    scListResponse;
    sclists: ScList[];
    scListRequest: AddScRequest;
    addScResponse: AddScDataresponse;
    chcListResponse: AddChcResponse;
    chclists: ChcList[];
    phcListResponse:AddPhcResponse;
    phclists: PhcList[];
   
    selectedChc: string;
    getstate: string;
    selectedEditChc: string = '';
  
    districtGovCode: string;
    stateName: string;

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
    blockCodedata: string;
    selectedPhc: string = '';
    scCode: string;
    scName: string;
    pincode: string;
    latitude: string;
    longitude : string;
    testingchcId : string;
    centrallablid : string;
    longitudedata: string;
    latitudedata: string;
    pincodeData: string;
    chcNamedata: string;
    chcCodedata: string;
    selectedEditPhc: string = '';
    scNamedata: string;
    scCodedata: string;
  
    constructor(
    
      private ScService: AddScService,
      private modalService: NgbModal,
      private httpService: HttpClient,
      private _formBuilder: FormBuilder,
      private loaderService: LoaderService,
      private activatedRoute: ActivatedRoute,
      private tokenService: TokenService,
      private dataservice: DataService,
    ) { }
  
    ngOnInit() {
      this.dataservice.sendData(JSON.stringify({"module": "Master", "submodule": "SC"}));
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
      this.retrirveSclist();
    }
  
    retrirveSclist(){
      this.loaderService.display(true);
      this.sclists = [];
      this.sclistErrorMessage ='';
      let samplesList = this.ScService.getScList()
      .subscribe(response => {
        this.scListResponse = response;
        this.loaderService.display(false);
        if(this.scListResponse !== null){
          if(this.scListResponse.data.length <= 0){
            this.sclistErrorMessage = response.message;
            
          }
          else{
            this.sclists = this.scListResponse.data;
            this.sclists.forEach(element => {
              this.getchc = '' +(element.chcId);
              this.getphc = '' +(element.phcId);
             
            });
            //this.getstate = this.
            this.rerender();
            
          }
        }
        else{
          this.sclistErrorMessage = response.message;
        }
       
      },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.sclistErrorMessage = err.toString();
      });
    }

    ddlChc() {

      this.selectedChc = '';
      let district = this.ScService.getChcList().subscribe(response => {
        this.chcListResponse = response;
        if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
          this.chclists = this.chcListResponse.chcDetails;
          this.selectedChc = "";
        }
        else {
          this.sclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.sclistErrorMessage = err.toString();
  
        });
    }

    ddlEditChc() {
      this.selectedEditChc = '';
      let district = this.ScService.getChcList().subscribe(response => {
        this.chcListResponse = response;
        if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
          this.chclists = this.chcListResponse.chcDetails;
          this.selectedEditChc = this.getchc;
          this.onChangeEditChc(this.getchc);
        }
        else {
          this.sclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.sclistErrorMessage = err.toString();
  
        });
    }
    ddlPhc(code) {
      this.selectedPhc = '';
      let district = this.ScService.getPhcList(code).subscribe(response => {
        this.phcListResponse = response;
        if (this.phcListResponse !== null && this.phcListResponse.status === "true") {
          this.phclists = this.phcListResponse.phcDetails;
          this.selectedPhc = "";
         
        }
        else {
          this.sclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.sclistErrorMessage = err.toString();
  
        });
    }
    ddlEdtiPhc(code) {
      this.selectedEditPhc = '';
      let district = this.ScService.getPhcList(code).subscribe(response => {
        this.phcListResponse = response;
        if (this.phcListResponse !== null && this.phcListResponse.status === "true") {
          this.phclists = this.phcListResponse.phcDetails;
          if(this.phclists.length > 0){
            this.selectedEditPhc = this.getphc;
            
          }
                  
        }
        else {
          this.sclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.sclistErrorMessage = err.toString();
  
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
   
  
    openAddSc(addScDetail) {
      
      this.ddlChc();
      this.confirmationSelected = Boolean("True");
      this.modalService.open(
        addScDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    openEditSc(editScDetail, sample: ScList) {
  
      this.ddlEditChc();
      this.ddlEdtiPhc(this.user.chcId);
      this.scNamedata = sample.scName;
      this.scCodedata = sample.scGovCode;
      this.pincodeData = sample.pincode;
      this.latitudedata = sample.latitude;
      this.longitudedata = sample.longitude;
      this.selectedEditChc = "" +(sample.chcId);
      this.selectedEditPhc = "" +(sample.phcId)
      this.commentsdata = sample.comments;
      this.confirmationSelected = Boolean(sample.isActive);
  
      this.modalService.open(
        editScDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    onSubmit(addScForm: NgForm){
  
      console.log(addScForm.value);
      
      this.comments = addScForm.value.Comments;
      this.selectedChc = addScForm.value.ddlChc;
      this.selectedPhc = addScForm.value.ddlPhc;
      this.scCode = addScForm.value.scCode;
      this.scName = addScForm.value.scName;
      this.pincode = addScForm.value.pincodeData;
      this.latitude = addScForm.value.latitudeData;
      this.longitude = addScForm.value.longitudeData;
  
      this.scListRequest = {
        chcId: +(this.selectedChc),
        phcId: +(this.selectedPhc),
        hninId: "0",
        scGovCode: this.scCode,
        scName: this.scName,
        scAddress: "", 
        pincode: this.pincode,
        isActive: ""+this.confirmationSelected,
        comments: this.comments,
        latitude: this.latitude,
        longitude: this.longitude,
        createdBy: this.user.id,
        updatedBy: this.user.id
      };
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.ScService.addSc(this.scListRequest)
      .subscribe(response => {
        this.addScResponse = response;
        if(this.addScResponse !== null){
          this.showResponseMessage(this.addScResponse.message, 's')
           this.retrirveSclist();
        }else{
          this.showResponseMessage(this.addScResponse.message, 'e');
                  this.sclistErrorMessage = response.message;
        }
  
      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.sclistErrorMessage = err.toString();
      });
      //swal ("Here's the title!", "...and here's the text!");
    }
  
    editSubmit(editScForm: NgForm){
  
      console.log(editScForm.value);
      
      this.commentsdata = editScForm.value.commentsdata;
      this.selectedEditPhc = editScForm.value.ddlEditChc;
      this.selectedEditChc = editScForm.value.ddlEditPhc;
      this.scCodedata = editScForm.value.scCodedata;
      this.scNamedata = editScForm.value.scNamedata;
      this.pincodeData = editScForm.value.pincodeData;
      this.latitudedata = editScForm.value.latitudeData;
      this.longitudedata = editScForm.value.longitudeData;
  
  
      this.scListRequest = {
        chcId: +(this.selectedEditChc),
        phcId: +(this.selectedEditPhc),
        hninId: "0",
        scGovCode: this.scCodedata,
        scName: this.scNamedata,
        scAddress: "", 
        pincode: this.pincodeData,
        isActive: ""+this.confirmationSelected,
        comments: this.commentsdata,
        latitude: this.latitudedata,
        longitude: this.longitudedata,
        createdBy: this.user.id,
        updatedBy: this.user.id
      };
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.ScService.addSc(this.scListRequest)
      .subscribe(response => {
        this.addScResponse = response;
        if(this.addScResponse !== null){
          this.showResponseMessage(this.addScResponse.message, 's')
           this.retrirveSclist();
        }else{
          this.showResponseMessage(this.addScResponse.message, 'e');
                  this.sclistErrorMessage = response.message;
        }
  
      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.sclistErrorMessage = err.toString();
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
