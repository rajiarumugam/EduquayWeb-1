import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AddGvtIdTypeRequest } from 'src/app/shared/admin/add-masters-request';
import { AddGvtIdTypeResponse, GvtIdTypes, RetrieveGvtIdTypeResponse } from 'src/app/shared/admin/add-masters-response';
import { AddMastersService } from 'src/app/shared/admin/add-masters.service';
import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gvt-id-type',
  templateUrl: './gvt-id-type.component.html',
  styleUrls: ['./gvt-id-type.component.css']
})
export class GvtIdTypeComponent implements AfterViewInit, OnDestroy, OnInit {

    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;
    
    loadDataTable: boolean = false;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
  
    gvtidlistErrorMessage: string;
    user: user;
  
    confirmationSelected: string;
    gvtIdTypeListResponse: RetrieveGvtIdTypeResponse;
    gvtidtypeLists: GvtIdTypes[];
    addGvtIdTypeRequest: AddGvtIdTypeRequest;
    addGvtIdTypeResponse: AddGvtIdTypeResponse;
  
    stateGovCode: string;
    gvtidname: string;
    gvtidnamedata: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
    stateCode: string;
    statetnamedata: string;
    statetcodedata: string;
    shortnamedata: string;
    commentsdata: string;
  
    constructor(
      private GvtIdTypeService: AddMastersService,
      private modalService: NgbModal,
      private httpService: HttpClient,
      private _formBuilder: FormBuilder,
      private loaderService: LoaderService,
      private activatedRoute: ActivatedRoute,
      private tokenService: TokenService,
      private dataservice: DataService,
    ) { }
  
    ngOnInit() {
      this.dataservice.sendData(JSON.stringify({"module": "Master", "submodule": "Government ID Type"}));
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
      this.retrirveStatelist();
    }
  
    retrirveStatelist(){
      this.loaderService.display(true);
      this.gvtidtypeLists = [];
      this.gvtidlistErrorMessage ='';
      let samplesList = this.GvtIdTypeService.getGvtIdTypeList()
      .subscribe(response => {
        this.gvtIdTypeListResponse = response;
        this.loaderService.display(false);
        if(this.gvtIdTypeListResponse !== null && this.gvtIdTypeListResponse.status === "true"){
          if(this.gvtIdTypeListResponse.govIDTypes.length <= 0){
            this.gvtidlistErrorMessage = response.message;
          }
          else{
            this.gvtidtypeLists = this.gvtIdTypeListResponse.govIDTypes;
            this.rerender();
            
          }
        }
        else{
          this.gvtidlistErrorMessage = response.message;
        }
       
      },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.gvtidlistErrorMessage = err.toString();
      });
    }
  
    openAddGvtId(addGvtIdDetail) {
  
      this.confirmationSelected = "True";
      this.modalService.open(
        addGvtIdDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    editAddGvtIdType(editStateDetail, sample: GvtIdTypes) {
  
      this.gvtidname = sample.govIdTypeName;
      this.commentsdata = sample.comments;
      this.confirmationSelected = sample.isActive;
  
      this.modalService.open(
        editStateDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    onSubmit(addGvtIdForm: NgForm){
  
      console.log(addGvtIdForm.value);
      this.gvtidname = addGvtIdForm.value.gvtidname;
      this.comments = addGvtIdForm.value.Comments;
  
      this.addGvtIdTypeRequest = {
        govIdTypeName: this.gvtidname,
        isActive: this.confirmationSelected,
        comments: this.comments,
        createdBy: this.user.id,
        updatedBy: this.user.id
      };
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.GvtIdTypeService.addGvtType(this.addGvtIdTypeRequest)
      .subscribe(response => {
        this.addGvtIdTypeResponse = response;
        if(this.addGvtIdTypeResponse !== null){
          this.showResponseMessage(this.addGvtIdTypeResponse.message, 's')
           this.retrirveStatelist();
        }
        else{
          this.showResponseMessage(this.addGvtIdTypeResponse.message, 'e');
                  this.gvtidlistErrorMessage = response.message;
        }
  
      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.gvtidlistErrorMessage = err.toString();
      });
      //swal ("Here's the title!", "...and here's the text!");
    }
  
    editSubmit(editGvtidForm: NgForm){
  
      console.log(editGvtidForm.value);
      this.statetnamedata = editGvtidForm.value.editstatename;
      this.statetcodedata = editGvtidForm.value.editStateCode;
      this.shortnamedata = editGvtidForm.value.editshortName;
      this.commentsdata = editGvtidForm.value.editComments;
  
      this.addGvtIdTypeRequest = {
        govIdTypeName: this.gvtidname,
        isActive: this.confirmationSelected,
        comments: this.comments,
        createdBy: this.user.id,
        updatedBy: this.user.id
      };
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.GvtIdTypeService.addGvtType(this.addGvtIdTypeRequest)
      .subscribe(response => {
        this.addGvtIdTypeResponse = response;
        if(this.addGvtIdTypeResponse !== null){
          this.showResponseMessage(this.addGvtIdTypeResponse.message, 's')
           this.retrirveStatelist();
        }else{
          this.showResponseMessage(this.addGvtIdTypeResponse.message, 'e');
                  this.gvtidlistErrorMessage = response.message;
        }
  
      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.gvtidlistErrorMessage = err.toString();
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
