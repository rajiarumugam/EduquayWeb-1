import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { StateRequest } from 'src/app/shared/admin/state/state-request';
import { AddStateResponse, StateList, StateResponse } from 'src/app/shared/admin/state/state-response';
import { StateService } from 'src/app/shared/admin/state/state.service';
import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
  @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;

  loadDataTable: boolean = false;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  statelistErrorMessage: string;
  user: user;
  confirmationSelected;
  stateListResponse: StateResponse;
  statelists: StateList[];
  addStateRequest: StateRequest;
  addStateResponse: AddStateResponse;
  stateGovCode: string;
  stateName: string;
  shortName: string;
  isActive: string;
  comments: string;
  createdBy: number;
  updatedBy: number;
  stateCode: string;
  statetnamedata: string;
  statetcodedata: string;
  shortnamedata: string;
  commentsdata: string;
  selectedStateForEdit;

  constructor(
    private StateService: StateService,
    private modalService: NgbModal,
    private httpService: HttpClient,
    private _formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private dataservice: DataService,
  ) { }

  ngOnInit() {
    this.dataservice.sendData(JSON.stringify({"module": "Master", "submodule": "State"}));
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
        search: '<div><span class="note">Search by any State information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
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
    this.statelists = [];
    this.statelistErrorMessage ='';
    let samplesList = this.StateService.getStateList()
    .subscribe(response => {
      this.stateListResponse = response;
      console.log(this.stateListResponse);
      this.loaderService.display(false);
      if(this.stateListResponse !== null && this.stateListResponse.status === "true"){
        if(this.stateListResponse.data.length <= 0){
          this.statelistErrorMessage = response.message;
        }
        else{
          this.statelists = this.stateListResponse.data;
          this.rerender();

        }
      }
      else{
        this.statelistErrorMessage = response.message;
      }

    },
    (err: HttpErrorResponse) => {
      if (this.loadDataTable) this.rerender();
      this.statelistErrorMessage = err.toString();
    });
  }

  openAddState(addStateDetail) {

    this.confirmationSelected = "True";
    this.modalService.open(
      addStateDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });

  }

  editAddState(editStateDetail, sample) {

    console.log(editStateDetail);
    console.log(sample);

    this.selectedStateForEdit = sample;
    this.shortnamedata = sample.shortName;
    this.statetcodedata = sample.stateGovCode;
    this.statetnamedata = sample.name;
    this.commentsdata = sample.comments;
    this.confirmationSelected = sample.isActive == 'True' ? true : false;

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

  onSubmit(addStateForm: NgForm){

    console.log(addStateForm.value);
    this.stateName = addStateForm.value.statename;
    this.stateCode = addStateForm.value.StateCode;
    this.shortName = addStateForm.value.shortName;
    this.comments = addStateForm.value.Comments;

    this.addStateRequest = {
      stateGovCode: this.stateCode,
      name: this.stateName,
      shortName: this.shortName,
     /* isActive: ""+this.confirmationSelected,*/
      comments: this.comments,
      /*createdBy: this.user.id,
      updatedBy: this.user.id,*/
    };

    //Remove below 2 lines after successfully tested
    // this.showResponseMessage('Successfully registered', 's');
    // return false;

    let damagedsampleCollection = this.StateService.addState(this.addStateRequest)
    .subscribe(response => {
      this.addStateResponse = response;
      if(this.addStateResponse !== null && this.addStateResponse.status ===String("true")){
        this.showResponseMessage(this.addStateResponse.message, 's')
         this.retrirveStatelist();
      }
      else{
        this.showResponseMessage(this.addStateResponse.message, 'e');
                this.statelistErrorMessage = response.message;
      }

    },
    (err: HttpErrorResponse) => {
      this.showResponseMessage(err.toString(), 'e');
      this.statelistErrorMessage = err.toString();
    });
    //swal ("Here's the title!", "...and here's the text!");
  }

  editSubmit(editStateForm: NgForm){

    console.log(editStateForm.value);
    /*this.statetnamedata = editStateForm.value.editstatename;
    this.statetcodedata = editStateForm.value.editStateCode;
    this.shortnamedata = editStateForm.value.editshortName;
    this.commentsdata = editStateForm.value.editComments;*/

    console.log(this.shortnamedata);
    console.log(this.statetcodedata);
    //shortnamedata
    var _obj = {
      id:this.selectedStateForEdit.id,
      stateGovCode: this.statetcodedata,
      name: this.statetnamedata,
      shortName: this.shortnamedata,
      comments: this.commentsdata,
      isActive: this.confirmationSelected,
      userId: this.user.id
    };

    //Remove below 2 lines after successfully tested
    // this.showResponseMessage('Successfully registered', 's');
    // return false;

    let damagedsampleCollection = this.StateService.updateState(_obj)
    .subscribe(response => {
      this.addStateResponse = response;

      if(this.addStateResponse !== null && this.addStateResponse.status == String('true')){
        this.showResponseMessage(this.addStateResponse.message, 's')
         this.retrirveStatelist();
      }else{
        this.showResponseMessage(this.addStateResponse.message, 'e');
                this.statelistErrorMessage = response.message;
      }

    },
    (err: HttpErrorResponse) => {
      this.showResponseMessage(err.toString(), 'e');
      this.statelistErrorMessage = err.toString();
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
