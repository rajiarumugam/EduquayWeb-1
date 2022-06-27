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
import { AddPhcService } from 'src/app/shared/admin/add-phc/add-phc.service';
import { user } from 'src/app/shared/auth-response';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import { AddIlrRequest } from 'src/app/shared/admin/add-ilr/add-ilr-request';
import { AddIlrResponse, AddIlrDataresponse, IlrList } from 'src/app/shared/admin/add-ilr/add-ilr-response';
import { AddDistrictResponse, DistrictList } from 'src/app/shared/admin/add-district/add-district-response';
import { AddIlrService } from 'src/app/shared/admin/add-ilr/add-ilr.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ilr',
  templateUrl: './ilr.component.html',
  styleUrls: ['./ilr.component.css']
})
export class IlrComponent implements AfterViewInit, OnDestroy, OnInit {

    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;
    
    loadDataTable: boolean = false;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
  
    phclistErrorMessage: string;
    user: user;
  
    confirmationSelected: boolean ;
    phcListResponse;
    phclists: IlrList[];
    ilrListRequest;
    addPhcResponse: AddPhcDataresponse;
    chcListResponse;
    chclists: ChcList[];
    districtListResponse;
    districtlists: DistrictList[];
    districtName: string;
    districtnamedata: string;
    selectedEditDistrict: string;
    selectedChc: string;
    getstate: string;
    selectedEditChc: string = '';
  
    districtGovCode: string;
    stateName: string;

    phcName: string;
    isActive: string;
    comments: string;
    createdBy: number;
    updatedBy: number;
    stateCode: string;
    chcname: string;
    name: string;
    hninId;
  
    commentsdata: string;
    getchc: string;
    phcCode: string;
  
    // chcName: string;
    pincode: string;
   
   
    testingchcId : string;
    centrallablid : string;
    
    
    ilrname: string;
    // chcName: string;
    ilrCode: string;
    selectedEditBlock: string = '';
    selectedDistrict = '';
    disabledChc = false;
    getdistrict = "";
    editIlrDetails;
  IlRFilterData: { DistrictId: number; ChcId: number; };

  // IlrService: any;
  
    constructor(
    
      private IlrService: AddIlrService,
      private modalService: NgbModal,
      private httpService: HttpClient,
      private _formBuilder: FormBuilder,
      private loaderService: LoaderService,
      private activatedRoute: ActivatedRoute,
      private tokenService: TokenService,
      private dataservice: DataService,
      private Ilrservice: AddIlrService
    ) { }
  
    ngOnInit() {
      this.dataservice.sendData(JSON.stringify({"module": "Master", "submodule": "ILR"}));
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
          search: '<div><span class="note">Search by any ILR information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
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

    ILRFilter()
    {
      this.retrirveIlrlist();
    }
  
    retrirveIlrlist(){
      this.loaderService.display(true);
      this.phclists = [];
      this.phclistErrorMessage ='';
      this.IlRFilterData={
        DistrictId: +this.selectedDistrict,
        ChcId: +this.selectedChc
      }
      let samplesList = this.Ilrservice.getILRFilterList(this.IlRFilterData)
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

    ddlChc(id) {
      
               
          let district = this.IlrService.getCHCByDis(id).subscribe(response => {
            this.chcListResponse = response;
            console.log(this.chcListResponse);
            if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
              this.chclists = this.chcListResponse.data;
              this.selectedChc = "";
            }
            else {
              this.phclistErrorMessage = response.message;
            }
          },
            (err: HttpErrorResponse) => {
              this.phclistErrorMessage = err.toString();
      
            });
        }



      onChangeDistrict(event) {
  
      if (this.selectedDistrict === '') {
        this.selectedChc = '';
      }
      else {
        this.ddlChc(this.selectedDistrict);
        
      }
    }
  
    ddlDistrict() {
      let district = this.Ilrservice.getDistrictList().subscribe(response => {
        this.districtListResponse = response;
        if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
          this.districtlists = this.districtListResponse.data;
          this.selectedDistrict = "";
          console.log(this.districtlists);
        }
        else {
          this.phclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.phclistErrorMessage = err.toString();
  
        });
        
        
    }
    ddlEditDistrict() {
      let district = this.Ilrservice.getDistrictList().subscribe(response => {
        this.districtListResponse = response;
        if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
          this.districtlists = this.districtListResponse.data;
       
        }
        else {
          this.phclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.phclistErrorMessage = err.toString();
  
        });
    }

    ddlEditChc(id) {
      this.selectedEditChc = '';
      let district = this.Ilrservice.getCHCByDis(id).subscribe(response => {
        this.chcListResponse = response;
        if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
          this.chclists = this.chcListResponse.data;
          // this.selectedEditChc = this.getchc;
          
        }
        else {
          this.phclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.phclistErrorMessage = err.toString();
  
        });
    }
    
    districtChange()
    {
      this.selectedChc = '';
          this.ddlChc(this.selectedDistrict);
          
      let district = this.Ilrservice.getCHCByDis(this.selectedDistrict).subscribe(response => {
        this.chcListResponse = response;
        console.log(this.chcListResponse);
        if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
          this.chclists = this.chcListResponse.data;
          this.selectedChc = "";
          this.disabledChc = true;
        }
        else {
          this.phclistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.phclistErrorMessage = err.toString();
  
        });
    }
  
  

   
    openAddIlr(addIlrDetail) {
      
      //this.ddlChc();
      this.selectedChc = '';    
      this.disabledChc = false;
      this.ddlDistrict();

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

    openEditIlr(editIlrDetail, sample) {
  
      console.log(sample);
      this.ddlEditDistrict();
      this.ddlEditChc(sample.districtId);
      this.editIlrDetails = sample;
    
     
      this.chcname = sample.chcName;
      this.ilrname = sample.name;
      this.selectedEditDistrict=sample.districtId
      this.selectedEditChc =sample.chcId; 
      this.commentsdata = sample.comments;
      this.ilrCode = sample.ilrCode;
      this.confirmationSelected = sample.isActive == 'True' ? true : false;
  
      this.modalService.open(
        editIlrDetail, {
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  
    }
  
    onSubmit(addIlrForm: NgForm){
  
      console.log(addIlrForm.value);
      
      this.comments = addIlrForm.value.Comments;
      this.selectedChc = addIlrForm.value.ddlChc;
      this.ilrCode = addIlrForm.value.ilrname;
      this.ilrname = addIlrForm.value.ilrname;

      this.ilrListRequest = {
        chcId: +(this.selectedChc),
       
        ilrCode: this.ilrname,
        name: this.ilrname,
        comments: this.comments,        
        userId: this.user.id  
      };

      console.log(this.ilrListRequest);
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.IlrService.addIlr(this.ilrListRequest)
      .subscribe(response => {
        this.addPhcResponse = response;
        console.log(response );
        if(this.addPhcResponse !== null && this.addPhcResponse.status == 'true'){
          this.showResponseMessage(this.addPhcResponse.message, 's')
           this.retrirveIlrlist();
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
      //swal ("Here's the title!", "...and here's the text!");
    }
  
    editSubmit(editIlrForm: NgForm){
  
      console.log(editIlrForm.value);
      
      this.commentsdata = editIlrForm.value.editComments;
      //this.selectedEditChc = editIlrForm.value.ddlChc;
      this.selectedEditDistrict = editIlrForm.value.ddlDistrict;
      // this.ilrCode = editIlrForm.value.ilrCode;
      // this.chcname = editIlrForm.value.chcname;
      this.ilrname = editIlrForm.value.ilrname1;
      console.log(editIlrForm.value.ddlEdChc);
     
  
      this.ilrListRequest = {
        id: this.editIlrDetails.id,
       chcId: this.selectedEditChc,
        // Dist
        ilrCode: this.ilrCode,
        // chcName: this.chcname,
        name: this.ilrname,
        isActive: this.confirmationSelected,
        comments: this.commentsdata,
        userId: this.user.id,
      };

      console.log(this.ilrListRequest);
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.IlrService.updateIlr(this.ilrListRequest)
      .subscribe(response => {
        this.addPhcResponse = response;
        if(this.addPhcResponse !== null && this.addPhcResponse.status == 'true'){
          this.showResponseMessage(this.addPhcResponse.message, 's')
           this.retrirveIlrlist();
        }else{
          this.showResponseMessage(this.addPhcResponse.message, 'e');
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
