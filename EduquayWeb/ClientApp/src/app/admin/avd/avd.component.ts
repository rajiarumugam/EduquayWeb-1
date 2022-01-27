import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
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
export class AVDComponent  implements AfterViewInit, OnDestroy, OnInit {

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
    contactNo:number;
    
    contact:string;
    selectedsc = null;
    riId: string;
    selectedassociatedANM;
    selectedAssociatedANMID;
    selectedripoint = null;
    selectedTestingchc = null;
   tempeditid:number;
    longitude : string;
    testingchcId : string;
    centrallablid : string;
    longitudedata: string;
    latitudedata: string;
    associatedCount = 0;
    riid: string;
    editriid: string;
    id: number;
    associatedANMData = [];
    c: number;
    avdName: string;
    name:string;
    selectedEditBlock: string = '';
    isTestingFacility = true;
    selectedtestingCHCId = '';
    testingCHCResponse;
    testingCHCists;


    constructor(
      private AddAvdService: AddAvdService,
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
      this.dataservice.sendData(JSON.stringify({"module": "Master", "submodule": "Avd"}));
      this.loaderService.display(false);
      this.user = JSON.parse(this.tokenService.getUser('lu'));
      this.dtOptions = {
        pagingType: 'simple_numbers',
        retrieve: true,
        pageLength: 20,
        processing: true,
        stripeClasses: [],
        lengthMenu: [5, 10, 20, 50],
        language: {
          search: '<div><span class="note">Search by any AVD information from below</span></div><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
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
        console.log(this.avdlists);
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

    openAddavd(addAvdDetail) {
      
    
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
    openEditAvd(editAvdDetail, sample) {
  

      console.log(sample);

      this.tempeditid=sample.id;
      // this.ddlEditBlock(sample.districtId);
      this.contactNo = sample.contactNo;
      this.avdName = sample.avdName;
      this.riid = "0";
      // this.editriid = sample.riId;
      this.id = sample.id;
      // this.selectedEditBlock = "" +(sample.blockId)
      this.commentsdata = sample.comments;
      this.confirmationSelected = sample.isActive == 'True' ? true : false;


      this.modalService.open(
        editAvdDetail, {
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
      this.contactNo = addAvdForm.value.contactNo;
     


      this.avdListRequest = {

        avdName: this.avdName,
        contactNo: this.contactNo,
        riId: "0",
        comments: this.comments,
        userId: this.user.id

      };

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
      console.log(editAvdForm.value);               
            this.commentsdata = editAvdForm.value.commentsdata;     
            this.avdName = editAvdForm.value.avdName;
            this.contactNo = editAvdForm.value.contactNo;
                 
            this.avdListRequest = {
              id:   this.tempeditid,
              name: this.avdName,
              contact:this.contactNo,
              riId: "0",
              comments: this.commentsdata,
              isActive: this.confirmationSelected,
              userId: this.user.id
      
            };
            let damagedsampleCollection = this.Avdservice.updateAvd(this.avdListRequest)
            .subscribe(response => {
              this.addAvdResponse = response;
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

          
          
          // getANMDetails(Avdid)
          // {
          //   this.loaderService.display(true);
          //     this.AddAvdService.getriviewavd(Avdid)
          //   .subscribe(response => {
          //   console.log(response);
          //   this.loaderService.display(false);
          //   this.associatedANMData = response.ri;
          //   if(this.associatedCount === 0)
          //       this.dtTrigger.next();
          //   else
          //       this.rerender();
          //   this.associatedCount++;
          //   $('#fadeinModal').modal('show');
          //   },
          //   (err: HttpErrorResponse) =>{
          //   });
            
          // }
           

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

