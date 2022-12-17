import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { DistrictResponse, District } from 'src/app/shared/master/district/district.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { HttpClientService } from '../../../shared/http-client.service';
import { GenericService } from '../../../shared/generic.service';
declare var $: any 
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { SpouseregistrationService } from 'src/app/shared/anm-module/registration/spouse/spouseregistration.service';
import { PositiveSpouseResponse, positiveSubject } from 'src/app/shared/anm-module/registration/spouse/spouseregistration.models';
import { DataTableDirective } from 'angular-datatables';
import { TokenService } from 'src/app/shared/token.service';
import { DataService } from 'src/app/shared/data.service';
import { AddScreenService } from 'src/app/shared/NHM-Monthly-Indicators/add-screen/add-screen.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { BCCList, ScreenList } from 'src/app/shared/NHM-Monthly-Indicators/add-screen/add-screen-response';
import { AddUsersDataresponse, AddUsersResponse, Userrolelist, UserroleResponse, UsersList } from 'src/app/shared/admin/add-users/add-users-response';
import { StateList, StateResponse } from 'src/app/shared/admin/state/state-response';
import { DistrictList } from 'src/app/shared/admin/add-district/add-district-response';
import { BlockList } from 'src/app/shared/admin/add-block/add-block-response';
import { ChcList } from 'src/app/shared/admin/add-chc/add-chc-response';
import { PhcList } from 'src/app/shared/admin/add-phc/add-phc-response';
import { ScList } from 'src/app/shared/admin/add-sc/add-sc-response';
import { user } from 'src/app/shared/auth-response';
import { AddDistrictService } from 'src/app/shared/admin/add-district/add-district.service';
import { AddUsersService } from 'src/app/shared/admin/add-users/add-users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-users-spc',
  templateUrl: './users-spc.component.html',
  styleUrls: ['./users-spc.component.css']
})
export class UsersAdminSPCComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @ViewChild('startPicker1', { static: false }) pickerStart;
  @ViewChild('endPicker', { static: false }) pickerEnd;
  dtOptions: any = {};
  positiveSpouseResponse: PositiveSpouseResponse;
  districts: District[] = [];
  loadDataTable: boolean = false;
  errorMessage: string;
  errorSpouseMessage: string;
  pndPendingArray: BCCList[];
  dateform:FormGroup;
  DAY = 86400000;
  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'F Y',
    altFormat: "F Y",
    defaultDate: new Date(Date.now()),
  
  };

  user;
  createdSubjectId="";
  spouseData: positiveSubject[] = [];
  fromDate = "";
  toDate = "";
  id: number;
  userTypeId: number;
  userType: string;
  userRoleId: number;
  AddUsersResponse:AddUsersResponse;
  userRole: string;
  userRoleDescription: string;
  userRoleAccessModule: string;
  stateListResponse: StateResponse;
  userGovCode: string;
  districtlistErrorMessage: string;
  userName: string;
  riCode: string;
  stateId: number;
  centralLabId: number;
  centralLabName: string;
  molecularLabId: number;
  molecularLabName: string;
  districtId: number;
  districtName: string;
  blockId: number;
  blockName: string;
  chcId: number;
  chcName: string;
  phcId: number;
  selectedEditState: string;
  phcName: string;
  scId: number;
  scName: string;
  riId: string;
  name: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  Address: string;
  mobileNo: string;
  registeredFrom: number;
  sampleCollectionFrom: number;
  shipmentFrom: number;
  pndtLocationId: number;
ripointlistErrorMessage: string;
selectedEditPhc;
chcListResponse;
chclistErrorMessage: string;
disabledChc = false;
Userslistrequest;
getchc: string;
districtListResponse;
selectedEditChc: string = '';
districtlists: DistrictList[];
getstate: string;
comments: string;
blocklists: BlockList[];
statelists: StateList[];
blockListResponse;
confirmationSelected: boolean ;
phclistErrorMessage: string;
// selectedBlock= '';
selectedEditDistrict: string;
getphc: string;
chclists: ChcList[];
userprofileLists: UsersList[]=[];
phclists: PhcList[];
sclists: ScList[];

subjectid: string;
getdistrict: string;
searchsubjectid: string;
userId: number;
selectedChc: string;
  selectedState: string;
  selectedUserrole: string;
  selectedBlock: string;
  userroleListResponse:UserroleResponse;
  addPhcResponse: AddUsersDataresponse;

  religionId: number;
  religionName: string;
  phcListResponse;
  scListResponse;
  userListRequest;
  casteId: number;
  casteName: string;
  communityId: number;
  userslistErrorMessage: string;
  communityName: string;
  address:string;
  address1: string;
  address2: string;
  address3: string;
  selectedEditBlock: string = '';
  stateName: string;

  pincode: string;




  riSite: string;
  dob: string;
  age: number;
  gender: string;

  emailId: string;
  selectedPhc: string = '';
  selectedSc: string = '';
  spouseSubjectId: string;

  spouseFirstName: string;
  spouseMiddleName: string;

  userrolelists: Userrolelist[];
  spouseLastName: string;
  testingCHCists;
  spouseContactNo: string;
  govIdTypeId: number;
  govIdType: string;
  selectedEditSc: string = '';
  govIdDetails: string;

  rchId: string;
  testingCHCResponse;
  ecNumber: string;
  lmpDate: string;
  gestationalperiod: number;
  childSubjectTypeId: number;
  firstFormCheck = false;
  selectedDistrict = null;
  selecteddor = new Date(Date.now());
  selectedlmpdate;
  selectedspouseEmail;
  Ldisabled = true;
  Pdisabled = true;
  Adisabled = true;
  statelist = [];
  ageValidate = false;
  State: any;
  contactNo1: any;
  editComments: any;
  dtTrigger: Subject<any> = new Subject();
  selectedEditUserrole: any;
  chcfilterdata: { userTypeId: number; DistrictId: number; BlockId: number; ChcId: number; PhcId: number; ScId: number; };
  mobileNo1: any;
  constructor(
    zone: NgZone,
    private _formBuilder: FormBuilder,
    private spouseregistrationService: SpouseregistrationService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private dataservice: DataService,
    private modalService: NgbModal,
    private addbccreportservice: AddScreenService,
    private loaderService: LoaderService,
    private genericService: GenericService,
    private router: Router, 
    private DistrictService: AddDistrictService,
    private httpService: HttpClient,
    private DataService:DataService,
    private UsersService:AddUsersService,
    ) { }

  ngOnInit() {
    
    this.dataservice.sendData(JSON.stringify({"module": "Users", "submodule": "SPC"}));
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
        search: '<div><span class="note">Search by any Subject information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
        searchPlaceholder: "Search...",
        lengthMenu: "Records / Page :  _MENU_",
        paginate: {
          first: '',
          last: '', // or '←' 
          previous: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
          next: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
        }, 
      }   
    };

   
    this.ddlDistrict();

  }

  onChangeBlock(event) {

    if (this.selectedBlock === '') {
      this.selectedChc = '';
    }
    else {
      this.ddlChc(this.selectedBlock);
    }
  }

  onChangeChc(event) {
    console.log(this.selectedChc);
      if (this.selectedChc === '') {
        this.selectedPhc = '';
      }
      else {
        this.ddlPhc(this.selectedChc);
      }
    }

    ddlPhc(code) {
      this.selectedPhc = '';
      let district = this.UsersService.getPhcbychc(code).subscribe(response => {
        this.phcListResponse = response;
        console.log(this.phcListResponse);
        if (this.phcListResponse !== null && this.phcListResponse.status === "true") {
          this.phclists = this.phcListResponse.data;
          this.selectedPhc = "";
  
        }
        else {
          this.chclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.chclistErrorMessage = err.toString();
  
        });
    }

    onChangePhc(event) {
      console.log(this.selectedPhc);
      if (this.selectedPhc === '') {
        this.selectedSc = '';
      }
      else {
        this.ddlSc(this.selectedPhc);
      }
    }

    ddlSc(code) {
      this.selectedPhc = '';
      console.log(code);
      let district = this.UsersService.getscbyphc(code).subscribe(response => {
        this.scListResponse = response;
        console.log(this.scListResponse);
        if (this.scListResponse !== null && this.scListResponse.status === "true") {
          this.sclists = this.scListResponse.data;
          console.log(this.sclists);
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
    showResponseMessage(message: string, type: string){
      var messageType = '';
      if(type === 'e'){
        var str = message;
        // Swal.fire({icon:'error', title:str.split(' ').slice(6,).join(' ') ,confirmButtonText: 'Close', allowOutsideClick: false, })
        Swal.fire({icon:'error', title:(str.substring(6, str.length - 50)) ,confirmButtonText: 'Close', allowOutsideClick: false, })
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
  ddlChc(id) {
    console.log(id);
        this.selectedChc = '';
    
        let district = this.UsersService.getCHCByBlock(id).subscribe(response => {
          this.chcListResponse = response;
          console.log(this.chcListResponse);
          if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
            this.chclists = this.chcListResponse.data;
            this.selectedChc = "";
          }
          else {
            this.chclistErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.chclistErrorMessage = err.toString();
    
          });
      }
  openAddUsers(addIlrDetail) {
    //this.ddlChc();
    this.ddlState();
    this.ddlUserRole();
    this.disabledChc = false;
    this.ddlDistrict();
    this.disabledChc = false;
    this.selectedBlock="";
    this.ddlDistrict();
    this.selectedPhc="";
    this.selectedSc="";
    this.pincode="";
    this.selectedChc="";
    this.selectedDistrict="";


    this.confirmationSelected = Boolean("True");
    this.modalService.open(
      addIlrDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });
  }
  onChangeDistrict(event) {

    if (this.selectedDistrict === '') {
      this.selectedBlock = '';
    }
    else {
      this.ddlBlock(this.selectedDistrict);
     
    }
  }

  ddlState() {
    let district = this.DistrictService.getStateList().subscribe(response => {
      this.stateListResponse = response;
      if (this.stateListResponse !== null && this.stateListResponse.status === "true") {
        this.statelists = this.stateListResponse.data;
        this.selectedState = "1";
      }
      else {
        this.districtlistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.districtlistErrorMessage = err.toString();

      });
  }

  retrirveIlrlist(){
    this.loaderService.display(true);
    this.phclists = [];
    this.phclistErrorMessage ='';
    let samplesList = this.UsersService.getallUsersList()
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

  ddlDistrict() {
    let district = this.UsersService.getDistrictList().subscribe(response => {
      this.districtListResponse = response;
      if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
        this.districtlists = this.districtListResponse.data;
        this.selectedDistrict = "";
        console.log(this.districtlists);
      }
      else {
        this.userslistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.userslistErrorMessage = err.toString();

      });


  }
  
  ddlUserRole() {

    let district = this.UsersService.getUserroleListType(3).subscribe(response => {
      this.userroleListResponse = response;
      console.log(this.userroleListResponse);
      if (this.userroleListResponse !== null && this.userroleListResponse.status === "true") {
        this.userrolelists = this.userroleListResponse.userRoles;
        this.selectedUserrole = "";

      }

      else {
        this.districtlistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.districtlistErrorMessage = err.toString();

      });
  }
  refreshData()
      {
        this.loaderService.display(true);
        this.chcfilterdata ={

          userTypeId :10,
          DistrictId :+this.selectedDistrict,
          BlockId: 0,
          ChcId :0,
          PhcId :0,
          ScId : 0
        }
       
        this.UsersService.getUserFilterList(this.chcfilterdata).subscribe(response => {
          this.userprofileLists = response.users;
          this.loaderService.display(false);
           this.rerender();
         
        },
        (err: HttpErrorResponse) =>{
          this.loaderService.display(false);
        });
       
      }
      openEditspc(editspcDetail, subjectinfo) {

        console.log(subjectinfo);
      
        this.id = subjectinfo.id;
          this.userGovCode=subjectinfo.userGovCode;
          this.userName=subjectinfo.userName  ;
          this.editddlState();
          this.ddlEditChc(subjectinfo.blockId);      
          this.ddlEditDistrict();
          this.selectedEditUserrole = subjectinfo.userRoleId;
          this.selectedEditUserrole = subjectinfo.userRoleId;
          this.selectedEditState = subjectinfo.stateId;
          this.selectedEditChc =subjectinfo.chcId;      
          this.selectedEditDistrict = subjectinfo.districtId;
          this.ddlEditBlock(subjectinfo.districtId);
          this.selectedEditBlock =subjectinfo.blockId;
         this.firstName=subjectinfo.firstName;
         this.middleName=subjectinfo.middleName;
         this.lastName=subjectinfo.lastName;
         this. mobileNo=subjectinfo.mobileNo;
         this.email=subjectinfo.email;
          this.comments= subjectinfo.comments;
          this.confirmationSelected = subjectinfo.isActive;

       console.log(this.firstName);

        this.modalService.open(
          editspcDetail, {
          centered: true,
          size: 'xl',
          scrollable: true,
          backdrop:'static',
          keyboard: false,
          ariaLabelledBy: 'modal-basic-title'
        });
      
      
      }

      ddlEditDistrict() {
        let district = this.UsersService.getDistrictList().subscribe(response => {
          this.districtListResponse = response;
          if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
            this.districtlists = this.districtListResponse.data;
    
          }
          else {
            this.userslistErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.userslistErrorMessage = err.toString();
    
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

      ddlEditBlock(code) {
        this.selectedBlock = '';
        let district = this.UsersService.getBlocklist(code).subscribe(response => {
          this.blockListResponse = response;
          if (this.blockListResponse !== null && this.blockListResponse.status === "true") {
            this.blocklists = this.blockListResponse.data;
    
          }
          else {
            this.chclistErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.chclistErrorMessage = err.toString();
    
          });
      }
      ddlEdtiSc(code) {

        //this.selectedEditPhc = '';
        let district = this.UsersService.getscbyphc(code).subscribe(response => {
          this.scListResponse = response;
          if (this.scListResponse !== null && this.scListResponse.status === "true") {
            this.sclists = this.scListResponse.data;
            // if(this.sclists.length > 0){
            //   this.selectedEditSc = this.getsc;
    
            // }
    
          }
          else {
            this.ripointlistErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.ripointlistErrorMessage = err.toString();
    
          });
      }
      ddlBlock(code) {

        this.selectedBlock = '';
        let district = this.UsersService.getBlocklist(code).subscribe(response => {
          this.blockListResponse = response;
          console.log(this.blockListResponse);
          if (this.blockListResponse !== null && this.blockListResponse.status === "true") {
            this.blocklists = this.blockListResponse.data;
            // console.log(this.blocklists);
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
      ddlEdtiPhc(code) {
        // this.selectedEditPhc = '';
        let district = this.UsersService.getPhcbychc(code).subscribe(response => {
          this.phcListResponse = response;
          if (this.phcListResponse !== null && this.phcListResponse.status === "true") {
            this.phclists = this.phcListResponse.data;
            // if(this.phclists.length > 0){
            //   this.selectedEditPhc = this.getphc;
    
            // }
    
          }
          else {
            this.chclistErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.chclistErrorMessage = err.toString();
    
          });
      }
      onSubmitspc(addIlrForm: NgForm){

        console.log(addIlrForm.value);
        
        this.selectedDistrict = addIlrForm.value.ddlDistrict;
        this.firstName = addIlrForm.value.firstName;
        this.middleName = addIlrForm.value.middleName;
        this.lastName = addIlrForm.value.lastName;
        this.contactNo1 = addIlrForm.value.contactNo1;
        this.userGovCode = addIlrForm.value.userGovCode;
        this.selectedState = "1";
        this.email = addIlrForm.value.email;
        this.Address = addIlrForm.value.Address;
        this.comments = addIlrForm.value.comments;
        
        console.log(addIlrForm);
        this.Userslistrequest = {
          userTypeId:10,
          userRoleId:14,
            userGovCode:this.userGovCode,
            userName:this.userGovCode,
            password:'odisha',
            stateId:1,
            centralLabId: 0,
        
            molecularLabId: 0,
            districtId: +(this.selectedDistrict),
            blockId: 0,
            chcId:0,
            phcId: 0,
            scId: 0,
            riId:null,
            firstName:this.firstName,
            middleName:this.middleName,
            lastName:this.lastName,
            contactNo1:this.contactNo1,
            contactNo2:null,
            email:this.email,
            govIdTypeId:0,
            govIdDetails:null,
            address:this.Address,
            pincode:null,
            createdBy:this.user.id ,
            updatedBy:this.user.id ,
            comments: this.comments,
            isActive:"true",
        };
        
        console.log(this.Userslistrequest);
        //Remove below 2 lines after successfully tested
        // this.showResponseMessage('Successfully registered', 's');
        // return false;
        
        
        let damagedsampleCollection = this.UsersService.addUsers(this.Userslistrequest)
        .subscribe(response => {
         this.addPhcResponse = response;
        console.log(response );
        if(this.addPhcResponse !== null && this.addPhcResponse.status == 'true'){
          this.showResponseMessage('SPC User added Sucessfully', 's')
           this.refreshData();
            console.log(this.addPhcResponse.message );
         }else{
           this.showResponseMessage(this.addPhcResponse.message, 'e');
                 this.phclistErrorMessage = response.message;
         }
        
        },
        (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.phclistErrorMessage = err.toString();
        });
        // this.rerender();
        //swal ("Here's the title!", "...and here's the text!");
        }

     
        editSubmitspc(editspcForm: NgForm){

          console.log(editspcForm.value);
            // this.userName = editspcForm.value.userName;
            this.firstName = editspcForm.value.firstName;
            this.middleName = editspcForm.value.middleName;
            this.lastName = editspcForm.value.lastName;
          
            this.email = editspcForm.value.email;
            
            this.mobileNo = editspcForm.value.mobileNo1;
            this.comments = editspcForm.value.Comments;
        
          this.userListRequest = {
            id:this.id,
            userTypeId:10,
            userRoleId:14,
            userGovCode:this.userGovCode,
              userName:this.userName,
              password:'odisha',
              stateId: 1,
              centralLabId: 0,
        
              molecularLabId: 0,
              districtId: +(this.selectedEditDistrict),
                blockId:0,
                chcId:0,
                phcId: 0,
                scId: 0,
              riId:null,
              firstName:this.firstName,
              middleName:this.middleName,
              lastName:this.lastName,
              contactNo1:this.mobileNo,
              contactNo2:null,
              email:this.email,
              govIdTypeId:0,
              govIdDetails:null,
              address:null,
              pincode:null,
              createdBy:this.user.id ,
              updatedBy:this.user.id ,
              comments: this.comments,
            isActive:(this.confirmationSelected? "1": "0")
          };
          console.log(this.userListRequest);
        
          //Remove below 2 lines after successfully tested
          // this.showResponseMessage('Successfully registered', 's');
          // return false;
        
          let damagedsampleCollection = this.UsersService.updateusers(this.userListRequest)
          .subscribe(response => {
            this.AddUsersResponse = response;
            if(this.AddUsersResponse !== null){
              this.showResponseMessage('SPC User Updated Sucessfully', 's')
               this.refreshData();
            }else{
              this.showResponseMessage(this.AddUsersResponse.message, 'e');
                      this.userslistErrorMessage = response.message;
            }
        
          },
          (err: HttpErrorResponse) => {
            this.showResponseMessage(err.toString(), 'e');
            this.userslistErrorMessage = err.toString();
          });
          //swal ("Here's the title!", "...and here's the text!");
        }
     
      ddlEditChc(id) {
        console.log(id);
        let district = this.UsersService.getCHCByBlock(id).subscribe(response => {
          this.chcListResponse = response;
          if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
            this.chclists = this.chcListResponse.data;
            // this.selectedEditChc = this.getchc;
    
          }
          else {
            this.chclistErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.chclistErrorMessage = err.toString();
    
          });
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
function code(code: any) {
  throw new Error('Function not implemented.');
}

