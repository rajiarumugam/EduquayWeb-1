import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AddBlockResponse, BlockList } from 'src/app/shared/admin/add-block/add-block-response';
import { AddChcRequest } from 'src/app/shared/admin/add-chc/add-chc-request';
import { AddChcDataresponse, AddChcResponse, ChcList } from 'src/app/shared/admin/add-chc/add-chc-response';
import { AddChcService } from 'src/app/shared/admin/add-chc/add-chc.service';
import { AddDistrictResponse, DistrictList } from 'src/app/shared/admin/add-district/add-district-response';
import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chc',
  templateUrl: './chc.component.html',
  styleUrls: ['./chc.component.css']
})
export class ChcComponent implements AfterViewInit, OnDestroy, OnInit {

    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;

    loadDataTable: boolean = false;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();

    chclistErrorMessage: string;
    user: user;
    confirmationSelected;
    chcListResponse;
    Editsample;
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
    testingchcId : string;
    centrallablid : string;
    pincodeData: string;
    blockdata:string;
    block:string;
    chcNamedata: string;
    chcCodedata: string;
    selectedEditBlock: string = '';
    isTestingFacility : boolean = false;
    // isTestingFacility = true;
    selectedtestingCHCId: string = '';
    testingCHCResponse;
    testingCHCists;
    selectedEdittestingCHCId: string = '';
    editid: any;
  chcrequest: {};
  ChcFilterData: { DistrictId: number; BlockId: number; };

    constructor(

      private ChcService: AddChcService,
      private modalService: NgbModal,
      private httpService: HttpClient,
      private _formBuilder: FormBuilder,
      private loaderService: LoaderService,
      private activatedRoute: ActivatedRoute,
      private tokenService: TokenService,
      private dataservice: DataService,
    ) { }

    ngOnInit() {
      this.dataservice.sendData(JSON.stringify({"module": "Master", "submodule": "CHC"}));
      // this.loaderService.display(false);
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
          search: '<div><span class="note">Search by any CHC information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
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
    
      this.ddlDistrict();
    }
    ChcFilter(){
      this.retrirveChclist()
    }
    retrirveChclist(){
      this.loaderService.display(true);
      this.chclists = [];
      this.chclistErrorMessage ='';
      this.ChcFilterData ={
        DistrictId:+this.selectedDistrict,
        BlockId: +this.selectedBlock
      };
      let samplesList = this.ChcService.getCHCFilterList(this.ChcFilterData)
      .subscribe(response => {
        this.chcListResponse = response;
        this.loaderService.display(false);
        if(this.chcListResponse !== null){
          if(this.chcListResponse.data.length <= 0){
            this.chclistErrorMessage = response.message;
          }
          else{
            this.chclists = this.chcListResponse.data;
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

    ddlBlock(code) {
      this.selectedBlock = '';
      let district = this.ChcService.getBlocklist(code).subscribe(response => {
        this.blockListResponse = response;
        if (this.blockListResponse !== null && this.blockListResponse.status === "true") {
          this.blocklists = this.blockListResponse.data;
          //  this.selectedBlock = "";
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
      this.selectedtestingCHCId = '';
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

    onChangeDistrict(event) {

      if (this.selectedDistrict === '') {
        this.selectedBlock = '';
        this.selectedtestingCHCId ='';
      }
      else {
        this.ddlBlock(this.selectedDistrict);
        this.ddlTestingCHC(this.selectedDistrict);
      }
    }
   

    openAddChc(addChcDetail) {

      this.ddlDistrict();
      this.selectedBlock="";
      this.confirmationSelected = true;
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
      this.Editsample=sample;
      this.editid=sample.id
      this.getdistrict = sample.districtId;
      this.selectedEditDistrict =sample.districtId;
      this.selectedEdittestingCHCId=sample.testingCHCId;
      this.ddlBlock(sample.districtId);
      this.selectedEditBlock =sample.blockId;
      this.ddlDistrict();
      this.ddlTestingCHC(sample.districtId);
      //  this.selectedtestingCHCId
      this.pincodeData = sample.pincode;
      // setTimeout(() => {
      //   this.ddlEditDistrict();
      // }, 100);
      // setTimeout(() => {
      //   this.ddlEditBlock(sample.districtId);
      // }, 100);
      this.chcNamedata = sample.name;
      this.chcCodedata = sample.chcGovCode;
      this.pincodeData = sample.pincode;
      this.hninId = sample.hninId;
      this.commentsdata = sample.comments;
      this.confirmationSelected = sample.isActive == 'True' ? true : false;

      this.isTestingFacility = sample.isTestingFacility === 'True' ? true : false;
    console.log(this.isTestingFacility);

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

      console.log(addChcForm.value,"addchcform");

      this.comments = addChcForm.value.Comments;
      this.selectedDistrict = addChcForm.value.ddlDistrict;
      this.selectedBlock = addChcForm.value.ddlBlock;
      this.chcCode = addChcForm.value.chcCode;
      this.chcName = addChcForm.value.chcName;
      this.pincode = addChcForm.value.pincodeData;
      this.isTestingFacility=addChcForm.value.isTestingFacility === 'True' ? true : false;
      this.selectedtestingCHCId = addChcForm.value.ddlTestingCHC;
      this.block = addChcForm.value.blockdata;
      this.hninId = addChcForm.value.hninId;

      this.chcListRequest = {
        districtId: +(this.selectedDistrict),
        blockId: +(this.selectedBlock),
        hninId:  this.hninId,
        chcGovCode: this.chcCode,
        name: this.chcName,
        isTestingFacility: this.isTestingFacility,
        testingCHCId:+this.selectedtestingCHCId || 0,
        centralLabId: +this.centrallablid,
        pincode: this.pincode,
        comments: this.comments,
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
      console.log(editChcForm.form.valid);
      this.commentsdata = editChcForm.value.editcomments;
      //  this.selectedEditDistrict = editChcForm.value.ddlEditDistrict;
      //  this.selectedEditBlock = editChcForm.value.ddlEditBlock;
      // this.chcCodedata = editChcForm.value.chcCodedata;
      this.chcNamedata = editChcForm.value.chcNamedata1;
      this.isTestingFacility=editChcForm.value.isTestingFacility === 'True' ? true : false;
      this.pincodeData = editChcForm.value.pincodeData;
      this.selectedtestingCHCId = editChcForm.value.testingCHCId;
      this.hninId = editChcForm.value.hninId;
      

      this.chcListRequest = {
        id:this.editid,
        districtId: +(this.selectedEditDistrict),
        blockId: +(this.selectedEditBlock),
        hninId:this.hninId,
        chcGovCode: this.chcCodedata,
        name: this.chcNamedata,
        isTestingFacility:this.isTestingFacility,
        testingCHCId: +(this.selectedtestingCHCId || 0),
        centralLabId: +this.centrallablid,
        pincode: this.pincodeData,
        isActive: this.confirmationSelected==1?"true":"false",
        comments: this.commentsdata,
        createdBy: this.user.id,
        updatedBy: this.user.id
      };

      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;

      let damagedsampleCollection = this.ChcService.updateChcfn(this.chcListRequest)
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
