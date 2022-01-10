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
import { AddUserroleDataresponse, AddUserroleResponse, UserroleList } from 'src/app/shared/admin/add-user-role/add-user-role-response';
import { UserTypes , RetrieveUserTypeResponse } from 'src/app/shared/admin/add-masters-response';
import { AddPhcService } from 'src/app/shared/admin/add-phc/add-phc.service';
import { AddUserroleService } from 'src/app/shared/admin/add-user-role/add-user-role.service';
import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements AfterViewInit, OnDestroy, OnInit {

    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;
    
    loadDataTable: boolean = false;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
  
    phclistErrorMessage: string;
    user: user;
  
    confirmationSelected: boolean ;
    phcListResponse;
    phclists: PhcList[];
    userlists: UserroleList[];
    usertypelistresponse:RetrieveUserTypeResponse;
    userroleListRequest;
    usertypelists: UserTypes[];
    addUserroleResponse: AddUserroleDataresponse;
    chcListResponse;
    id: number;
    chclists: ChcList[];
   
   
    selectedChc: string;
    getstate: string;
    selectedEditChc: string = '';
  
    districtGovCode: string;
    stateName: string;
    selectededitUsertype: string;

    phcName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    
    updatedBy: number;
    selectedUsertype: string;

    stateCode: string;
    phcnamedata: string;
    districtlists;
    UsertypelistErrorMessage: string;
    hninId;
  
    Comments: string;
    getchc: string;
    phcCode: string;
  
    chcName: string;
    pincode: string;
   
   
    testingchcId : string;
    centrallablid : string;
    
   
    pincodeData: string;
    phcNamedata: string;
    userrolename: string;
    phcCodedata: string;
    selectedEditBlock: string = '';
    districtListResponse;
    selectedDistrict = '';
    disabledChc = false;
    getdistrict = "";
    editPhcDetails;
  
    constructor(
    
      private PhcService: AddPhcService,
      private UserroleService: AddUserroleService,
      private modalService: NgbModal,
      private httpService: HttpClient,
      private _formBuilder: FormBuilder,
      private loaderService: LoaderService,
      private activatedRoute: ActivatedRoute,
      private tokenService: TokenService,
      private dataservice: DataService,
      private userroleService: AddUserroleService
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
          search: '<div><span class="note">Search by any User Role information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
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
      this.retrirveUserrolelist();
    }
  
    retrirveUserrolelist(){
      this.loaderService.display(true);
      this.userlists = [];
      this.phclistErrorMessage ='';
      let samplesList = this.UserroleService.getUserroleList()
      .subscribe(response => {
        this.phcListResponse = response;
        console.log(this.userlists);
        this.loaderService.display(false);
        if(this.phcListResponse !== null){
          if(this.phcListResponse.userRoles.length <= 0){
            this.phclistErrorMessage = response.message;
            
          }
          else{
            this.userlists = this.phcListResponse.userRoles;
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

    ddlUsertype() {
      let district = this.userroleService.getUsertypeList().subscribe(response => {
        this.usertypelistresponse = response;
        if (this.usertypelistresponse !== null && this.usertypelistresponse.status === "true") {
          this.usertypelists = this.usertypelistresponse.userTypes;
          this.selectedUsertype = "";
        }
        else {
          this.UsertypelistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.UsertypelistErrorMessage = err.toString();
  
        });
    }
  
    
    openAdduserrole(adduserroledetail) {      
      this.ddlUsertype();
      this.confirmationSelected = Boolean("True");
      this.modalService.open(
        adduserroledetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    onSubmit(adduserroleForm: NgForm){
  
      console.log(adduserroleForm.value);
      
      
      this.selectedUsertype = adduserroleForm.value.ddlUsertype;
      this.userrolename = adduserroleForm.value.userrolename;
      this.comments = adduserroleForm.value.Comments;
  

      this.userroleListRequest = {
        userTypeId: +(this.selectedUsertype),
        userRoleName: this.userrolename,
        isActive: "true",
        comments: this.comments,
        createdBy: this.user.id  ,
        updatedBy: this.user.id  ,       
      };
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.userroleService.addUserrole(this.userroleListRequest)
      .subscribe(response => {
        this.addUserroleResponse = response;
        if(this.addUserroleResponse !== null && this.addUserroleResponse.status == 'true'){
          this.showResponseMessage(this.addUserroleResponse.message, 's')
           this.retrirveUserrolelist();
        }else{
          this.showResponseMessage(this.addUserroleResponse.message, 'e');
                  this.phclistErrorMessage = response.message;
        }
  
      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.phclistErrorMessage = err.toString();
      });
      //swal ("Here's the title!", "...and here's the text!");
    }
  
    openEdituserrole(edituserroleDetail, sample) {
  
      console.log(sample);
      this.ddlUsertype();    
      this.selectededitUsertype = sample.userTypeId;
      this.userrolename= sample.userrolename,    
      this.Comments= sample.Comments; 
      this.confirmationSelected = sample.isActive;   
     
     


      this.modalService.open(
        edituserroleDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }

    editSubmituserrole(editUserroleform: NgForm){
  
      console.log(editUserroleform.value);
      
      this.Comments = editUserroleform.value.Comments;
      this.selectedUsertype = editUserroleform.value.ddlUsertype;    
      this.userrolename = editUserroleform.value.userrolename;
  
      this.userroleListRequest = {
        id: this.id,
        userTypeId: +(this.selectedUsertype),               
        name: this.userrolename,     
        isActive: this.confirmationSelected,        
        comments: this.Comments,
        userId: this.user.id,
      };
      console.log(this.userroleListRequest);
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.PhcService.updatePhc(this.userroleListRequest)
      .subscribe(response => {
        this.addUserroleResponse = response;
        if(this.addUserroleResponse !== null && this.addUserroleResponse.status == 'true'){
          this.showResponseMessage(this.addUserroleResponse.message, 's')
           this.retrirveUserrolelist();
        }else{
          this.showResponseMessage(this.addUserroleResponse.message, 'e');
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
