import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AddBlockRequest } from 'src/app/shared/admin/add-block/add-block-request';
import { AddBlockDataresponse, AddBlockResponse, BlockList } from 'src/app/shared/admin/add-block/add-block-response';
import { AddBlockService } from 'src/app/shared/admin/add-block/add-block.service';
import { AddDistrictResponse, DistrictList } from 'src/app/shared/admin/add-district/add-district-response';
import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements AfterViewInit, OnDestroy, OnInit {

    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;

    loadDataTable: boolean = false;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();

    blocklistErrorMessage: string;
    user: user;
    Editsample;
    confirmationSelected;
    blockListResponse;
    blocklists: BlockList[];
    blockListRequest: AddBlockRequest;
    addBlockResponse: AddBlockDataresponse;
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
    blocknamedata: string;
    blockcodedata: string;
    districtnamedata: string;
    commentsdata: string;
    getdistrict: string;
    blockCodedata: string;
    editBlockDetails;


    constructor(
      private BlockService: AddBlockService,
      private modalService: NgbModal,
      private httpService: HttpClient,
      private _formBuilder: FormBuilder,
      private loaderService: LoaderService,
      private activatedRoute: ActivatedRoute,
      private tokenService: TokenService,
      private dataservice: DataService,
    ) { }

    ngOnInit() {
      this.dataservice.sendData(JSON.stringify({"module": "Master", "submodule": "Block"}));
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
          search: '<div><span class="note">Search by any Block information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
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
      this.retrirveBlocklist();
    }

    retrirveBlocklist(){
      this.loaderService.display(true);
      this.blocklists = [];
      this.blocklistErrorMessage ='';
      let samplesList = this.BlockService.getBlockList()
      .subscribe(response => {
        this.blockListResponse = response;
        this.loaderService.display(false);
        if(this.blockListResponse !== null){
          if(this.blockListResponse.data.length <= 0){
            this.blocklistErrorMessage = response.message;
          }
          else{
            this.blocklists = this.blockListResponse.data;
            this.blocklists.forEach(element => {
              this.getdistrict = element.districtId;
            });
            //this.getstate = this.
            this.rerender();
          }
        }
        else{
          this.blocklistErrorMessage = response.message;
        }

      },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.blocklistErrorMessage = err.toString();
      });
    }

    ddlDistrict() {
      let district = this.BlockService.getDistrictList().subscribe(response => {
        this.districtListResponse = response;
        if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
          this.districtlists = this.districtListResponse.data;
          this.selectedDistrict = "";
        }
        else {
          this.blocklistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.blocklistErrorMessage = err.toString();
        });
    }

    openAddBlock(addBlockDetail) {

      this.ddlDistrict();
      this.confirmationSelected = true;
      this.modalService.open(
        addBlockDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
    }

    openEditBlock(editBlockDetail, sample) {

      console.log(editBlockDetail.value);
      this.editBlockDetails = sample;
      this.ddlDistrict();
      this.selectedEditDistrict = sample.districtId;
      this.blocknamedata = sample.name;
      this.blockCodedata = sample.blockGovCode;
      this.commentsdata = sample.comments;
      this.confirmationSelected = sample.isActive == 'True' ? true : false;

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

    onSubmit(addBlockForm: NgForm){

      console.log(addBlockForm.value);
      this.blocknamedata = addBlockForm.value.blockname;
      this.blockcodedata = addBlockForm.value.blockCode;
      this.districtName = addBlockForm.value.districtname;
      this.comments = addBlockForm.value.Comments;
      this.selectedDistrict = addBlockForm.value.ddlDistrict;

      var _obj = {
        blockGovCode: this.blockcodedata,
        name: this.blocknamedata,
        districtId: +(this.selectedDistrict),
        comments: this.comments,
        userId: this.user.id
      };

      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;

      let damagedsampleCollection = this.BlockService.addBlock(_obj)
      .subscribe(response => {
        this.addBlockResponse = response;
        if(this.addBlockResponse !== null && this.addBlockResponse.status === "true"){
          this.showResponseMessage(this.addBlockResponse.message, 's')
           this.retrirveBlocklist();
        }else{
          this.showResponseMessage(this.addBlockResponse.message, 'e');
                  this.blocklistErrorMessage = response.message;
        }

      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.blocklistErrorMessage = err.toString();
      });
      //swal ("Here's the title!", "...and here's the text!");
    }

    editSubmit(editDistrictForm: NgForm){

      console.log(editDistrictForm.value);
     
 console.log(this.blockCodedata);
     var _obj = {
        id:this.editBlockDetails.id,
        blockGovCode: this.blockCodedata,
        name: this.blocknamedata,
        districtId: +(this.selectedEditDistrict),
        isActive: this.confirmationSelected,
        comments: this.commentsdata,
        userId: this.user.id
      };

      let damagedsampleCollection = this.BlockService.updateBlock(_obj)
      .subscribe(response => {
        this.addBlockResponse = response;
        if(this.addBlockResponse !== null && this.addBlockResponse.status === "true"){
          this.showResponseMessage(this.addBlockResponse.message, 's')
           this.retrirveBlocklist();
        }else{
          this.showResponseMessage(this.addBlockResponse.message, 'e');
                  this.blocklistErrorMessage = response.message;
        }

      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.blocklistErrorMessage = err.toString();
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
