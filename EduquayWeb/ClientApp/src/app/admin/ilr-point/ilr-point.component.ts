import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AddChcResponse, ChcList } from 'src/app/shared/admin/add-chc/add-chc-response';
import { AddPhcResponse, PhcList } from 'src/app/shared/admin/add-phc/add-phc-response';
import { AddIlrpointRequest } from 'src/app/shared/admin/add-ilr/add-ilrpoint-request';
import { AddIlrpointResponse,AddIlrPtDataresponse,IlrList} from 'src/app/shared/admin/add-ilr/add-ilrpoint-response';
import { AddRipointRequest } from 'src/app/shared/admin/add-ripoint/add-ripoint-request';
import { AddRipointResponse, AddRiPtDataresponse, RiList } from 'src/app/shared/admin/add-ripoint/add-ripoint-response';
import { AddRipointService } from 'src/app/shared/admin/add-ripoint/add-ripoint.service';
import { AddIlrpointService } from 'src/app/shared/admin/add-ilr/add-ilrpoint.service';
import { AddScRequest } from 'src/app/shared/admin/add-sc/add-sc-request';
import { AddScResponse, ScList } from 'src/app/shared/admin/add-sc/add-sc-response';
import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';
import * as internal from 'assert';

@Component({
  selector: 'app-ri-point',
  templateUrl: './ilr-point.component.html',
  styleUrls: ['./ilr-point.component.css']
})
export class IlrPointComponent implements AfterViewInit, OnDestroy, OnInit {

    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;
    
    loadDataTable: boolean = false;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
  
    ripointlistErrorMessage: string;
    user: user;
    //variable used to carry id of update instead of using hidden field of id
    Tempeditid:number
   temp:number;
   tempchcname:string;
    confirmationSelected: boolean ;
    riPtListResponse;
    riptlists: RiList[];
    
    ilrptListRequest
    addilrptResponse: AddIlrPtDataresponse;
    chcListResponse;
    chclists: ChcList[];
    phcListResponse;
    phclists: PhcList[];
    scListResponse;
    sclists: ScList[];
    scListRequest: AddScRequest;
   
    selectedChc: string;
    ilrCode1:string;
    getstate: string;
    selectedEditChc: string;
  
    districtGovCode: string;
    stateName: string;

    selectedDistrict = '';
    selectedEditDistrict='';
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
    selectedEditSc: string = '';
    riNamedata: string;
    riCodedata: string;
    districtListResponse;
    districtlists;
  ilrPtListResponse: AddIlrpointResponse;
  ilrptlists: IlrList[];
  
    constructor(
    
      private  IlrPtService: AddIlrpointService,
      private modalService: NgbModal,
      private httpService: HttpClient,
      private _formBuilder: FormBuilder,
      private loaderService: LoaderService,
      private activatedRoute: ActivatedRoute,
      private tokenService: TokenService,
      private dataservice: DataService,
    ) { }
  
    ngOnInit() {
      this.dataservice.sendData(JSON.stringify({"module": "Master", "submodule": "ILR Point"}));
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
      this.retrieveRiPtList();
      this.ddlDistrict();
    }
  
    retrieveRiPtList(){
      this.loaderService.display(true);
      this.sclists = [];
      this.ripointlistErrorMessage ='';
      let samplesList = this.IlrPtService.getRiList()
      .subscribe(response => {
        this.ilrPtListResponse = response;
        console.log(response)
        this.loaderService.display(false);
        if(this.ilrPtListResponse !== null){
          console.log("does not get data");
          if(this.ilrPtListResponse.ilrDetails.length <= 0){
            this.ripointlistErrorMessage = response.message;
            
          }
          else{
            this.ilrptlists = this.ilrPtListResponse.ilrDetails;
            console.log("got data");
            
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
      let district = this.IlrPtService.getCHCByDis(this.selectedDistrict).subscribe(response => {
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
    districteditChange()
    {
          console.log(this.selectedDistrict);

          this.selectedChc = '';
      let district = this.IlrPtService.getCHCByDis(this.selectedEditDistrict).subscribe(response => {
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
      let district = this.IlrPtService.getDistrictList().subscribe(response => {
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
      let district = this.IlrPtService.getChcList().subscribe(response => {
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
      console.log(this.selectedEditChc);
      let district = this.IlrPtService.getChcList().subscribe(response => {
        this.chcListResponse = response;
        if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
          this.chclists = this.chcListResponse.chcDetails;
        //  this.selectedEditChc = this.getchc;
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
      let district = this.IlrPtService.getPhcList(code).subscribe(response => {
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
      let district = this.IlrPtService.getPhcList(code).subscribe(response => {
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
      let district = this.IlrPtService.getScList(code).subscribe(response => {
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
      let district = this.IlrPtService.getScList(code).subscribe(response => {
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
     this.temp=0
     this.tempchcname=" ";
    
      console.log(this.selectedChc)
      for(let i=0; i<this.ilrptlists.length; i++){
       if(this.ilrptlists[i].chcId==Number(this.selectedChc)){
       
         this.temp=this.temp+1;
         console.log(this.ilrptlists[i].chcName)
       }
    }
    console.log(this.chclists)
    console.log(this.selectedChc)
    for(let i=0;i<this.chclists.length;i++){
      if (this.chclists[i].id==Number(this.selectedChc)){
          this.tempchcname=this.chclists[i].name
      }
    }
   
    
    this.riName="ILR-".concat(this.tempchcname);
    this.ilrCode1=this.riName.concat(String(this.temp+1)).replace(/ /g,'')
    console.log(this.ilrCode1)
  
      if (this.selectedChc === '') {
        this.selectedPhc = '';
      }
      else {
        // this.riName="ILR-".concat(this.tempchcname).concat(String(this.temp+1))
     
      }
    }
    onChangeEditChc(event) {
         console.log(this.selectedEditChc);
      if (this.selectedEditChc === '') {
        this.selectedEditPhc = '';
      }
      else {
       
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
  
    openEditRiPt(editRiPtDetail, sample:IlrList) {
  
      this.ddlEditChc();
      this.Tempeditid=sample.id
      //this.ddlEdtiPhc(this.user.chcId);
      this.riNamedata = sample.ilrPoint;
      this.riCodedata = sample.ilrCode;
      
      this.selectedEditChc =""+(sample.chcId)
      // this.selectedEditPhc = "" +(sample.phcId);
      // this.selectedEditSc = "" +(sample.scId)
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
      this.riCode = addRiPtForm.value.riCode;
      this.riName = addRiPtForm.value.riName;
     
      this.ilrptListRequest = {
      
        chcId: +(this.selectedChc),
        ilrCode:this.riCode,
        ilrPoint:this.riName,
        comments:this.comments,
        isActive: ""+this.confirmationSelected,
      
        createdBy: this.user.id,
        updatedBy: this.user.id
      };
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.IlrPtService.addRiPt(this.ilrptListRequest)
      .subscribe(response => {
        this.addilrptResponse = response;
        if(this.addilrptResponse !== null){
          this.showResponseMessage(this.addilrptResponse.message, 's')
           this.retrieveRiPtList();
        }else{
          this.showResponseMessage(this.addilrptResponse.message, 'e');
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
     
      this.selectedEditChc = editScForm.value.ddlEditChc;
    
      this.riCodedata = editScForm.value.scCodedata;
      this.riNamedata = editScForm.value.riNamedata;
    
  
      this.ilrptListRequest = {
        id:this.Tempeditid,
        chcId: +(this.selectedEditChc),
        name:this.riNamedata,
        ilrCode:this.riCodedata,
        isActive:this.confirmationSelected,
        comments: this.commentsdata,
       userid:this.user.id
      };
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.IlrPtService.editRiPt(this.ilrptListRequest)
      .subscribe(response => {
        this.addilrptResponse = response;
        if(this.addilrptResponse !== null){
          this.showResponseMessage(this.addilrptResponse.message, 's')
           this.retrieveRiPtList();
        }else{
          this.showResponseMessage(this.addilrptResponse.message, 'e');
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

