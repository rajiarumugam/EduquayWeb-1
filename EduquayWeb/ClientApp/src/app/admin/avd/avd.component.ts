import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AddBlockResponse, BlockList } from 'src/app/shared/admin/add-block/add-block-response';
import { AddChcRequest } from 'src/app/shared/admin/add-chc/add-chc-request';
// import { AddAvdDataresponse, addAvdResponse, ChcList } from 'src/app/shared/admin/add-chc/add-chc-response';
import { AddChcService } from 'src/app/shared/admin/add-chc/add-chc.service';
import { AddDistrictResponse, DistrictList } from 'src/app/shared/admin/add-district/add-district-response';
import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';
import { AddAvdRequest } from 'src/app/shared/admin/add-avd/add-avd-request';
import { AddAvdResponse, AddAvdDataresponse,AvdList } from 'src/app/shared/admin/add-avd/add-avd-response';
import { AddAvdService } from 'src/app/shared/admin/add-avd/add-avd.service';

@Component({
  selector: 'app-avd',
  templateUrl: './avd.component.html',
  styleUrls: ['./avd.component.css']
})
export class AVDComponent implements AfterViewInit, OnDestroy, OnInit {

    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;
    
    loadDataTable: boolean = false;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
  
    avdlistErrorMessage: string;
    user: user;
  
    confirmationSelected: boolean ;
    avdListResponse;
    avdlists: AvdList[];
    avdListRequest;
    addAvdResponse: AddAvdDataresponse;
    // addAvdResponse: AddAvdDataresponse;
    districtListResponse;
    districtlists: DistrictList[];
    blockListResponse;
    blocklists: BlockList[];
   
    selectedDistrict: string;
    getstate: string;
    selectedEditDistrict: string = '';
    hninId;
  
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
  
    getblock: string;
    blockCodedata: string;
    selectedBlock: string = '';
    avdcontactno:number;
    contactno: number;
    contact:string;
    riId: string;
   tempeditid:number;
    longitude : string;
    testingchcId : string;
    centrallablid : string;
    longitudedata: string;
    latitudedata: string;
    riid: string;
    id: number;
    c: number;
    avdName: string;
    name:string;
    selectedEditBlock: string = '';
    isTestingFacility = true;
    selectedtestingCHCId = '';
    testingCHCResponse;
    testingCHCists;
  
    constructor(
    
      private ChcService: AddChcService,
      private modalService: NgbModal,
      private httpService: HttpClient,
      private _formBuilder: FormBuilder,
      private loaderService: LoaderService,
      private activatedRoute: ActivatedRoute,
      private tokenService: TokenService,
      private dataservice: DataService,
      private Avdservice: AddAvdService
    ) { }
  
    ngOnInit() {
      this.dataservice.sendData(JSON.stringify({"module": "Master", "submodule": "CHC"}));
      this.loaderService.display(false);
      this.user = JSON.parse(this.tokenService.getUser('lu'));
      this.dtOptions = { 
        pagingType: 'simple_numbers',
        pageLength: 20,
        processing: true,
        stripeClasses: [],
        lengthMenu: [5, 10, 20, 50],
        language: {
          search: '<div><span class="note">Search by any Avd information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
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
      this.retrirveAvdlist();
    }
  
    retrirveAvdlist(){
      this.loaderService.display(true);
      this.avdlists = [];
      this.avdlistErrorMessage ='';
      let samplesList = this.Avdservice.getAvdList()
      .subscribe(response => {
        this.avdListResponse = response;
        console.log(this.avdlists,this.avdListResponse);
        this.loaderService.display(false);
        if(this.avdListResponse !== null){
          if(this.avdListResponse.avdDetails.length <= 0){
            console.log("error in api");
            this.avdlistErrorMessage = response.message;
            
          }
          else{
            console.log("api works");
            this.avdlists = this.avdListResponse.avdDetails;
            console.log(this.avdlists,this.avdListResponse)
            // this.avdlists.forEach(element => {
             
              // this.getblock = '' +(element.blockId);
              // this.testingchcId =  "" +(element.testingCHCId);
              // this.centrallablid ='' +(element.centralLabId);
            // });
            //this.getstate = this.
            this.rerender();
            
          }
        }
        else{
          this.avdlistErrorMessage = response.message;
        }
       
      },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.avdlistErrorMessage = err.toString();
      });
    }

    

  
    ddlBlock(code) {
      this.selectedBlock = '';
      let district = this.ChcService.getBlocklist(code).subscribe(response => {
        this.blockListResponse = response;
        if (this.blockListResponse !== null && this.blockListResponse.status === "true") {
          this.blocklists = this.blockListResponse.data;
          this.selectedBlock = "";
         
        }
        else {
          this.avdlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.avdlistErrorMessage = err.toString();
  
        });
    }
    ddlTestingCHC(code) {
      this.selectedBlock = '';
      let district = this.ChcService.gettestingCHC(code).subscribe(response => {
        this.testingCHCResponse = response;
        if (this.testingCHCResponse !== null && this.testingCHCResponse.status === "true") {
          this.testingCHCists = this.testingCHCResponse.data;
         
         
        }
        else {
          this.avdlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.avdlistErrorMessage = err.toString();
  
        });
    }
   
    onChangeDistrict(event) {
  
      if (this.selectedDistrict === '') {
        this.selectedBlock = '';
      }
      else {
        this.ddlBlock(this.selectedDistrict);
        this.ddlTestingCHC(this.selectedDistrict);
      }
    }
    onChangeEditDistrict(event) {
  
      if (this.selectedEditDistrict === '') {
        this.selectedEditBlock = '';
      }
      else {
        // this.ddlEditBlock(this.selectedEditDistrict);
      }
    }
   
    chcChange()
    {
      console.log(this.contactno);
    }
    openAddChc(addAvdDetail) {
      
     
      this.confirmationSelected = Boolean("True");
      this.modalService.open(
        addAvdDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
    
  
    openEditAvd(editBlockDetail, sample) {
  
      console.log(sample);
     
      this.tempeditid=sample.id;
      // this.ddlEditBlock(sample.districtId);
      this.avdcontactno = sample.contactNo;
      this.avdName = sample.avdName;
      this.riid = sample.riId;
      this.id = sample.id;
      
     
      
      // this.selectedEditBlock = "" +(sample.blockId)
      this.commentsdata = sample.comments;
      this.confirmationSelected = Boolean(sample.isActive);


      this.modalService.open(
        editBlockDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    onSubmit(addAvdForm: NgForm){
  
      console.log(addAvdForm.value);
      
      this.comments = addAvdForm.value.Comments;
      this.avdName = addAvdForm.value.avdName;
      this.contactno = addAvdForm.value.avdcontactno;
      this.riId = addAvdForm.value.riid;
      
    
      this.avdListRequest = {
        
        avdName: this.avdName,
        contactno: this.contactno,
        riId: this.riId,
        comments: this.comments,
        userId: this.user.id
      
      };
  
      console.log(this.avdListRequest);
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.Avdservice.addAvd(this.avdListRequest)
      .subscribe(response => {
        
        this.addAvdResponse = response;
        console.log(this.addAvdResponse);
        if(this.addAvdResponse !== null && this.addAvdResponse.status == 'true'){
          this.showResponseMessage(this.addAvdResponse.message, 's')
           this.retrirveAvdlist();
        }else{
          this.showResponseMessage(this.addAvdResponse.message, 'e');
                  this.avdlistErrorMessage = response.message;
        }
  
      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.avdlistErrorMessage = err.toString();
      });
      //swal ("Here's the title!", "...and here's the text!");
    }
  
    editSubmit(editAvdForm: NgForm){
  
      //console.log(editAvdForm.value);
      
      this.commentsdata = editAvdForm.value.commentsdata;
     
      this.avdName = editAvdForm.value.avdName;
      this.avdcontactno = editAvdForm.value.avdcontactno;
      this.riid = editAvdForm.value.riid;
      
      // avdcontactno
      // console.log(this.avdName);
      // console.log(this.avdcontactno);
      // console.log(this.riid);
      
  
  
      this.avdListRequest = {
        id:   this.tempeditid,
        name: this.avdName,
        contact:""+this.avdcontactno,
        riId: this.riid,
        comments: this.commentsdata,
        userId: this.user.id
       
      };
      console.log(this.avdListRequest);
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.Avdservice.updateAvd(this.avdListRequest)
      .subscribe(response => {
        this.addAvdResponse = response;
        if(this.addAvdResponse !== null){
          this.showResponseMessage(this.addAvdResponse.message, 's')
           this.retrirveAvdlist();
        }else{
          this.showResponseMessage(this.addAvdResponse.message, 'e');
                  this.avdlistErrorMessage = response.message;
        }
  
      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.avdlistErrorMessage = err.toString();
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
