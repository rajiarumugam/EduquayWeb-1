import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AddMTPRequest } from 'src/app/shared/admin/add-mtp/add-mtp-request';
import { AddMTPDataresponse,AddMTPResponse,MTPList } from 'src/app/shared/admin/add-mtp/add-mtp-response';
import { AddDistrictResponse, DistrictList } from 'src/app/shared/admin/add-district/add-district-response';
import { AddMTPService } from 'src/app/shared/admin/add-mtp/add-mtp.service';
import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mtp',
  templateUrl: './mtp.component.html',
  styleUrls: ['./mtp.component.css']
})
export class MTPComponent implements AfterViewInit, OnDestroy, OnInit {

    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;

    loadDataTable: boolean = false;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

    MTPlistErrorMessage: string;
    user: user;
    Editsample;
    confirmationSelected;
    MTPListResponse;
    MTPLists: MTPList[];
    MTPListRequest: AddMTPRequest;
    addMTPResponse: AddMTPDataresponse;
    districtListResponse;
    disableddis:boolean =true;
    districtlists: DistrictList[];
    selectedDistrict: string;
    getstate: string;
    selectedEditDistrict: string;
    districtName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
    mtpNamedata: string;
    mtpCodedata: string;
    districtnamedata: string;
    commentsdata: string;
    getdistrict: string;  
    editMTPDetails;
 


    constructor(
      private MTPService: AddMTPService,
      private modalService: NgbModal,
      private httpService: HttpClient,
      private _formBuilder: FormBuilder,
      private loaderService: LoaderService,
      private activatedRoute: ActivatedRoute,
      private tokenService: TokenService,
      private dataservice: DataService,
    ) { }

    ngOnInit() {
      this.dataservice.sendData(JSON.stringify({"module": "Master", "submodule": "MTP"}));
      this.loaderService.display(false);
      this.user = JSON.parse(this.tokenService.getUser('lu'));
      this.dtOptions = {
        pagingType: 'simple_numbers',
        pageLength: 20,
        processing: true,
        stripeClasses: [],
        lengthMenu: [5, 10, 20, 50],
        language: {
          search: '<div><span class="note">Search by any MTP information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
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
      this.retrieveMTPlist();
      this.rerender();
    }

    retrieveMTPlist(){
      this.loaderService.display(true);
      this.MTPLists = [];
      this.MTPlistErrorMessage ='';
      let samplesList = this.MTPService.getMTPList()
      .subscribe(response => {
        this.MTPListResponse = response;
        this.loaderService.display(false);
        if(this.MTPListResponse !== null){
          if(this.MTPListResponse.data.length <= 0){
            this.MTPlistErrorMessage = response.message;
          }
          else{
            this.MTPLists = this.MTPListResponse.data;
            this.MTPLists.forEach(element => {
              this.getdistrict = element.districtId;
            });
            //this.getstate = this.
          
          }
        }
        else{
          this.MTPlistErrorMessage = response.message;
        }

      },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.MTPlistErrorMessage = err.toString();
      });
    }

    ddlDistrict() {
      let district = this.MTPService.getDistrictList().subscribe(response => {
        this.districtListResponse = response;
        if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
          this.districtlists = this.districtListResponse.data;
          this.selectedDistrict = "";
        }
        else {
          this.MTPlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.MTPlistErrorMessage = err.toString();
        });
    }

    openAddMTP(addMTPDetail) {

      this.ddlDistrict();
      this.confirmationSelected = true;
      this.modalService.open(
        addMTPDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
    }

    openEditMTP(editMTPDetail, sample) {

      this.editMTPDetails = sample;
      this.ddlDistrict();
      this.selectedEditDistrict = sample.districtID;
      this.mtpNamedata = sample.mtpName;
      this.mtpCodedata = sample.mtpCode;
      this.commentsdata = sample.comments;
      this.confirmationSelected = sample.isActive == 'True' ? true : false;

      this.modalService.open(
        editMTPDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
    }

    onSubmit(addMTPForm: NgForm){

      console.log(addMTPForm.value);
      this.mtpNamedata = addMTPForm.value.mtpName;
      this.mtpCodedata = addMTPForm.value.mtpCode;
      this.districtName = addMTPForm.value.districtname;
      this.comments = addMTPForm.value.Comments;
      this.selectedDistrict = addMTPForm.value.ddlDistrict;

      var _obj = {
        mtpCode: this.mtpCodedata,
        mtpName: this.mtpNamedata,
        districtId: +(this.selectedDistrict),
        comments: this.comments,
        userId: this.user.id+"",
        isactive:this.confirmationSelected+""
      };

      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;

      let damagedsampleCollection = this.MTPService.addMTP(_obj)
      .subscribe(response => {
        this.addMTPResponse = response;
        if(this.addMTPResponse !== null && this.addMTPResponse.status === "true"){
          this.showResponseMessage(this.addMTPResponse.message, 's')
           this.retrieveMTPlist();
        }else{
          this.showResponseMessage(this.addMTPResponse.message, 'e');
                  this.MTPlistErrorMessage = response.message;
        }

      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.MTPlistErrorMessage = err.toString();
      });
      //swal ("Here's the title!", "...and here's the text!");
    }

    editSubmit(editDistrictForm: NgForm){

      console.log(editDistrictForm.value);
     
 console.log(this.mtpCodedata);
     var _obj = {
        id:this.editMTPDetails.id,
        mtpCode: this.mtpCodedata,
        mtpName: this.mtpNamedata,
        districtId: +(this.selectedEditDistrict),
        isActive: this.confirmationSelected+"",
        comments: this.commentsdata,
        userId: this.user.id+""
      };

      let damagedsampleCollection = this.MTPService.updateMTP(_obj)
      .subscribe(response => {
        this.addMTPResponse = response;
        if(this.addMTPResponse !== null && this.addMTPResponse.status === "true"){
          this.showResponseMessage(this.addMTPResponse.message, 's')
           this.retrieveMTPlist();
        }else{
          this.showResponseMessage(this.addMTPResponse.message, 'e');
                  this.MTPlistErrorMessage = response.message;
        }

      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.MTPlistErrorMessage = err.toString();
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
