import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConstantPool } from '@angular/compiler';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Console } from 'console';
import { Subject } from 'rxjs';
import { AddBlockResponse, BlockList } from 'src/app/shared/admin/add-block/add-block-response';
import { AddChcRequest } from 'src/app/shared/admin/add-chc/add-chc-request';
import { AddChcDataresponse, AddChcResponse, ChcList } from 'src/app/shared/admin/add-chc/add-chc-response';
import { AddChcService } from 'src/app/shared/admin/add-chc/add-chc.service';
import { AddDistrictResponse, DistrictList } from 'src/app/shared/admin/add-district/add-district-response';
import { UserList } from 'src/app/shared/admin/add-user/add-user-response';
import { AddUserService } from 'src/app/shared/admin/add-user/add-user.service';
import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chc',
  templateUrl: './anm.component.html',
  styleUrls: ['./anm.component.css']
})
export class ANMAdminComponent implements AfterViewInit, OnDestroy, OnInit {

    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;
    
    loadDataTable: boolean = false;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
  
    chclistErrorMessage: string;
    user: user;
  
    confirmationSelected: boolean ;
    chcListResponse;
    chclists: ChcList[];
    chcListRequest;
    addChcResponse: AddChcDataresponse;
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
    getdistrict: string;
    getblock: string;
    blockCodedata: string;
    selectedBlock: string = '';
    chcCode: string;
    chcName: string;
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
    selectedUserType:string;
    selectedEditBlock: string = '';
    isTestingFacility = true;
    selectedtestingCHCId = '';
    testingCHCResponse;
    testingCHCists;
    UserTypeResponse;
    UserTypelists: UserList[];
    UsertypeErrorMessage: string;
  selectedCHC: string;
  chcListResponse1;
  chclists1: ChcList[];
  selectedPHC: string;
  PhcListResponse;
  phclists: any;
  selectedSC: any;
  ScListResponse;
  sclists: any;
  
    constructor(
    
      private ChcService: AddUserService,
      private modalService: NgbModal,
      private httpService: HttpClient,
      private _formBuilder: FormBuilder,
      private loaderService: LoaderService,
      private activatedRoute: ActivatedRoute,
      private tokenService: TokenService,
      private dataservice: DataService,
    ) { }
  
    ngOnInit() {
      this.dataservice.sendData(JSON.stringify({"module": "Master", "submodule": "User"}));
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
      this.retrirveChclist();
    }
  
    retrirveChclist(){
      this.loaderService.display(true);
      this.chclists = [];
      this.chclistErrorMessage ='';
      let samplesList = this.ChcService.getUserList()
      .subscribe(response => {
        console.log(response)
        this.chcListResponse = response;
        console.log(this.chcListResponse)
        this.loaderService.display(false);
        if(this.chcListResponse !== null){
          if(this.chcListResponse.users.length <= 0){
            this.chclistErrorMessage = response.message;
            
          }
          else{
            this.chclists = this.chcListResponse.users;
            this.chclists.forEach(element => {
              this.getdistrict = '' +(element.districtId);
              this.getblock = '' +(element.blockId);
              this.testingchcId =  "" +(element.testingCHCId);
              this.centrallablid ='' +(element.centralLabId);
            });
            //this.getstate = this.
            this.rerender();
            
          }
        }
        else{
          this.chclistErrorMessage = response.message;
        }
       
      },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.chclistErrorMessage = err.toString();
      });
    }
    ddlUserType(){
      this.selectedUserType=""
      let UserType=this.ChcService.getUserTypeList().subscribe(response=>{
        this.UserTypeResponse=response;
        console.log(response)
        if(this.UserTypeResponse!==null && this.UserTypeResponse.status==="true" ){
          this.UserTypelists=this.UserTypeResponse.userTypes
          this.selectedUserType="";
        }
        else{
          this.UsertypeErrorMessage=response.message
        }
      },
      (err:HttpErrorResponse)=>{
        this.UsertypeErrorMessage=err.toString();
      }
      );
      console.log(this.UserTypelists)

    }

    ddlDistrict() {
     
      
    
     
      this.selectedDistrict = '';
      let district = this.ChcService.getDistrictList().subscribe(response => {
        this.districtListResponse = response;
        if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
          this.districtlists = this.districtListResponse.data;
          this.selectedDistrict = "";
        }
        else {
          this.chclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.chclistErrorMessage = err.toString();
  
        });
    }
    ddlCHC(code){

      
      this.selectedCHC='';
      let CHC = this.ChcService.getCHC(code).subscribe(response=>{
        this.chcListResponse1=response;
        console.log(this.chcListResponse1!=null && this.chcListResponse1.status=="true")
        if(this.chcListResponse1!=null && this.chcListResponse1.status=="true"){
          this.chclists1=this.chcListResponse1.data;
          console.log(this.chclists1)
          this.selectedCHC="";
        }
        else{
          this.chcListResponse=response.message;

        }
        console.log(this.chclists1)
      },
      (err:HttpErrorResponse)=>{
        this.chclistErrorMessage=err.toString()
      }
      )

    }
    ddlPHC(code){
      
      this.selectedPHC='';
      let CHC = this.ChcService.getPHCByCHC(code).subscribe(response=>{
        this.PhcListResponse=response;
        console.log(this.PhcListResponse!=null && this.PhcListResponse.status=="true")
        if(this.PhcListResponse!=null && this.PhcListResponse.status=="true"){
          this.phclists=this.PhcListResponse.data;
          console.log(this.phclists)
          this.selectedPHC="";
        }
        else{
          this.chcListResponse=response.message;

        }
        console.log(this.phclists)
      },
      (err:HttpErrorResponse)=>{
        this.chclistErrorMessage=err.toString()
      }
      )

    }
    ddlSC(code){
      this.selectedSC='';
      let CHC = this.ChcService.getSCByPHC(code).subscribe(response=>{
        this.ScListResponse=response;
        console.log(this.ScListResponse!=null && this.ScListResponse.status=="true")
        if(this.ScListResponse!=null && this.ScListResponse.status=="true"){
          this.sclists=this.ScListResponse.data;
          console.log(this.sclists)
          this.selectedSC="";
        }
        else{
          this.chcListResponse=response.message;

        }
        console.log(this.sclists)
      },
      (err:HttpErrorResponse)=>{
        this.chclistErrorMessage=err.toString()
      }
      )

    }


    ddlEditDistrict() {
      this.selectedDistrict = '';
      let district = this.ChcService.getDistrictList().subscribe(response => {
        this.districtListResponse = response;
        if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
          this.districtlists = this.districtListResponse.data;
          this.selectedEditDistrict = this.getdistrict;
          this.onChangeEditDistrict(this.getblock);
        }
        else {
          this.chclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.chclistErrorMessage = err.toString();
  
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
          this.chclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.chclistErrorMessage = err.toString();
  
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
          this.chclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.chclistErrorMessage = err.toString();
  
        });
    }
    ddlEditBlock(code) {
      this.selectedBlock = '';
      let district = this.ChcService.getBlocklist(code).subscribe(response => {
        this.blockListResponse = response;
        if (this.blockListResponse !== null && this.blockListResponse.status === "true") {
          this.blocklists = this.blockListResponse.data;
          if(this.blocklists.length > 0){
            this.selectedEditBlock = this.getblock;
            
          }
                  
        }
        else {
          this.chclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.chclistErrorMessage = err.toString();
  
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
        this.ddlEditBlock(this.selectedEditDistrict);
      }
    }
    onChangeBlock(event){
      console.log(this.selectedBlock)
      if (this.selectedBlock === '') {
       // this.selectedBlock = '';
      }
      else {
        console.log(this.selectedBlock)
        // this.ddlBlock(this.selectedDistrict);
        // this.ddlTestingCHC(this.selectedDistrict);
        this.ddlCHC(this.selectedBlock)
      }

    }
    onChangeCHC(event){
      console.log("ToDo")
      console.log(this.selectedCHC)
      this.ddlPHC(this.selectedCHC)
    }
    onChangePHC(event){
      console.log("todo")
      console.log(this.selectedPHC);
      this.ddlSC(this.selectedPHC);
    }
 
   
    chcChange()
    {
      console.log(this.chcName);
    }
    openAddChc(addChcDetail) {

      this.ddlUserType();
      this.ddlDistrict();
      this.confirmationSelected = Boolean("True");
      this.modalService.open(
        addChcDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    openEditChc(editBlockDetail, sample) {
  
      console.log(sample);
      this.getdistrict = sample.districtId;
      this.ddlEditDistrict();
      this.ddlEditBlock(sample.districtId);
      this.chcNamedata = sample.name;
      this.chcCodedata = sample.chcGovCode;
      this.pincodeData = sample.pincode;
      this.latitudedata = sample.latitude;
      this.longitudedata = sample.longitude;
      this.selectedEditDistrict = "" +(sample.districtId);
      this.selectedEditBlock = "" +(sample.blockId)
      this.commentsdata = sample.comments;
      this.confirmationSelected = Boolean(sample.isActive);


      this.isTestingFacility = sample.isTestingFacility === 'True' ? true : false;
      this.hninId = sample.hninId;
  
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
  
    onSubmit(addChcForm: NgForm){
  
      console.log(addChcForm.value);
      
      this.comments = addChcForm.value.Comments;
      this.selectedDistrict = addChcForm.value.ddlDistrict;
      this.selectedBlock = addChcForm.value.ddlBlock;
      this.chcCode = addChcForm.value.chcCode;
      this.chcName = addChcForm.value.chcName;
      this.pincode = addChcForm.value.pincodeData;
      this.latitude = addChcForm.value.latitudeData;
      this.longitude = addChcForm.value.longitudeData;
      this.hninId = addChcForm.value.hninId;
  
      this.chcListRequest = {
        districtId: +(this.selectedDistrict),
        blockId: +(this.selectedBlock),
        hninId:  this.hninId,
        chcGovCode: this.chcCode,
        name: this.chcName,
        isTestingFacility: this.isTestingFacility,
        testingCHCId: +this.testingchcId,
        centralLabId: +this.centrallablid,
        pincode: this.pincode,
        comments: this.comments,
        latitude: this.latitude,
        longitude: this.longitude,
        userId: this.user.id
      };
  
      console.log(this.chcListRequest);
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.ChcService.addChc(this.chcListRequest)
      .subscribe(response => {
        this.addChcResponse = response;
        if(this.addChcResponse !== null && this.addChcResponse.status == 'true'){
          this.showResponseMessage(this.addChcResponse.message, 's')
           this.retrirveChclist();
        }else{
          this.showResponseMessage(this.addChcResponse.message, 'e');
                  this.chclistErrorMessage = response.message;
        }
  
      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.chclistErrorMessage = err.toString();
      });
      //swal ("Here's the title!", "...and here's the text!");
    }
  
    editSubmit(editChcForm: NgForm){
  
      console.log(editChcForm.value);
      
      this.commentsdata = editChcForm.value.commentsdata;
      this.selectedEditDistrict = editChcForm.value.ddlDistrict;
      this.selectedEditBlock = editChcForm.value.ddlBlock;
      this.chcCodedata = editChcForm.value.chcCodedata;
      this.chcNamedata = editChcForm.value.chcNamedata;
      this.pincodeData = editChcForm.value.pincodeData;
      this.latitudedata = editChcForm.value.latitudeData;
      this.longitudedata = editChcForm.value.longitudeData;
  
  
      this.chcListRequest = {
        districtId: +(this.selectedEditDistrict),
        blockId: +(this.selectedEditBlock),
        hninId: "0",
        chcGovCode: this.chcCodedata,
        chcName: this.chcNamedata,
        isTestingFacility: "",
        testingCHCId: +this.testingchcId,
        centralLabId: +this.centrallablid,
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
  
      let damagedsampleCollection = this.ChcService.addChc(this.chcListRequest)
      .subscribe(response => {
        this.addChcResponse = response;
        if(this.addChcResponse !== null){
          this.showResponseMessage(this.addChcResponse.message, 's')
           this.retrirveChclist();
        }else{
          this.showResponseMessage(this.addChcResponse.message, 'e');
                  this.chclistErrorMessage = response.message;
        }
  
      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.chclistErrorMessage = err.toString();
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
