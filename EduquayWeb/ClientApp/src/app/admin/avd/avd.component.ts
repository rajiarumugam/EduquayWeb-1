import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AddRipointResponse, AddRiPtDataresponse, RiList } from 'src/app/shared/admin/add-ripoint/add-ripoint-response';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IlrResponse, IlrList } from 'src/app/shared/admin/add-ripoint/add-ripoint-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { masterService } from 'src/app/shared/master/district/masterdata.service';
import { DataTableDirective } from 'angular-datatables';
import { AddScResponse, ScList } from 'src/app/shared/admin/add-sc/add-sc-response';
import { Subject } from 'rxjs';
import { AddBlockResponse, BlockList } from 'src/app/shared/admin/add-block/add-block-response';
import { AddChcRequest } from 'src/app/shared/admin/add-chc/add-chc-request';
import { AddChcResponse, ChcList } from 'src/app/shared/admin/add-chc/add-chc-response';
import { AddChcService } from 'src/app/shared/admin/add-chc/add-chc.service';
import { AddDistrictResponse, DistrictList } from 'src/app/shared/admin/add-district/add-district-response';
import { user } from 'src/app/shared/auth-response';
import { AddRipointRequest, AddRipointRequest2 } from 'src/app/shared/admin/add-ripoint/add-ripoint-request';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import { AddPhcResponse, PhcList } from 'src/app/shared/admin/add-phc/add-phc-response';
import Swal from 'sweetalert2';
import { AddRipointService } from 'src/app/shared/admin/add-ripoint/add-ripoint.service';
import { AddAvdRequest } from 'src/app/shared/admin/add-avd/add-avd-request';
import { AddAvdResponse, AddAvdDataresponse,AvdList } from 'src/app/shared/admin/add-avd/add-avd-response';
import { AddAvdService } from 'src/app/shared/admin/add-avd/add-avd.service';
import { AddRibyAvdResponse, ribyavdList } from 'src/app/shared/admin/add-avd/add-avd-response';
import { sample } from 'rxjs/operators';

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
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();

    avdlistErrorMessage: string;
    rilistErrorMessage: string;
    user: user;
    pincode: string;
    confirmationSelected: boolean ;
    avdListResponse;
    riListResponse;
    avdlists: AvdList[];
    rilists: ribyavdList[];
    avdListRequest;
    ilrListResponse:IlrResponse;
    addAvdResponse: AddAvdDataresponse;
    // addAvdResponse: AddAvdDataresponse;
    districtListResponse;
    districtlists: DistrictList[];
    blockListResponse;
    blocklists: BlockList[];
    riPtListResponse;
    riptlists: RiList[];
    selectedDistrict: string;
    getstate: string;
    selectedEditDistrict: string = '';
    hninId;
    getchc: string;
    getphc: string;
    getsc: string;
    riptListRequest: AddRipointRequest;
    districtGovCode: string;
    stateName: string;

    districtName: string;
    isActive: string;
    comments: string;
    chclists: ChcList[];
    createdBy: number;
    updatedBy: number;
    stateCode: string;
    blocknamedata: string;
    blockcodedata: string;
    districtnamedata: string;
    commentsdata: string;
    riCode: string;
    ripointlistErrorMessage: string;
    getblock: string;
    blockCodedata: string;
    selectedBlock: string = '';
    contactNo:number;
    chcListResponse;
    selectedEditSc: string = '';
    contact:string;
    selectedsc = null;
    selectedIlr: string;
    riId: string;
    tcbydisList;
    phcListResponse;
    selectedassociatedANM;
    selectedAssociatedANMID;
    addriptResponse: AddRiPtDataresponse;
    selectedripoint = null;
    selectedTestingchc = null;
   tempeditid:number;
   selectedEditPhc: string = '';
    longitude : string;
    testingchcId : string;
    centrallablid : string;
    scListResponse;
    riName1;
    ilrlists: IlrList[];
    selectedEditChc: string = '';
    longitudedata: string;
    isaddform:boolean;
    latitudedata: string;
    selectedPhc: string = '';
    selectedChc: string;
    riptListRequest2: AddRipointRequest2;
    riName: string;
    sclists: ScList[];
    associatedCount = 0;
    riid: string;
    editriid: string;
    selectedSc: string = '';
    phclists: PhcList[];
    id: number;
    disabledChc = false;
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
      private RiPtService: AddRipointService,
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
      //this.avdlists = [];
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

    retrirveRilist(viewRiDetail,sample) {
  
      //   this.retrirveAvdlist();
         this.loaderService.display(true);
        // this.rilists = [];
         this.avdlistErrorMessage ='';
         let samplesList = this.Avdservice.getriviewavd(sample.id)
         .subscribe(avdresponse => {
           this.avdListResponse = avdresponse;
         
           this.loaderService.display(false);
           if(this.avdListResponse !== null){
             if(this.avdListResponse.ri.length <= 0){
               console.log("error in api");
               this.avdlistErrorMessage = avdresponse.message;
   
             }
             else{
               console.log("api works");
               this.rilists = this.avdListResponse.ri;
               console.log(this.rilists,this.avdListResponse)
             }
           }
           else{
             this.avdlistErrorMessage = avdresponse.message;
           }
   
         },
         (err: HttpErrorResponse) => {
           if (this.loadDataTable) this.rerender();
           this.avdlistErrorMessage = err.toString();
         });
 
       this.modalService.open(
         viewRiDetail, {
         centered: true,
         size: 'xl',
         scrollable: true,
         backdrop:'static',
         keyboard: false,
         ariaLabelledBy: 'modal-basic-title'
       });
 
     }

    retrieveRiPtList(){
      this.loaderService.display(true);
    
      this.ripointlistErrorMessage ='';
      let samplesList = this.RiPtService.getRiList()
      .subscribe(response => {
        this.riPtListResponse = response;
        this.loaderService.display(false);
        if(this.riPtListResponse !== null){
          if(this.riPtListResponse.data.length <= 0){
            this.ripointlistErrorMessage = response.message;
            
          }
          else{
            this.riptlists = this.riPtListResponse.data;
            this.riptlists.forEach(element => {
              this.getchc = '' +(element.chcId);
              this.getphc = '' +(element.phcId);
              this.testingchcId =  "" +(element.testingCHCId);
              this.getsc = '' +(element.scId);
            });
            //this.getstate = this.
           
            
          }
        }
        else{
          this.ripointlistErrorMessage = response.message;
        }
       
      },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.ripointlistErrorMessage = err.toString();
      });
    }
    

    ddlEdtiSc(code) {
      this.selectedEditPhc = '';
      let district = this.RiPtService.getScList(code).subscribe(response => {
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
ddlDistrict() {
      let district = this.RiPtService.getDistrictList().subscribe(response => {
        this.districtListResponse = response;
        if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
          this.districtlists = this.districtListResponse.data;
          //this.selectedDistrict = "";
        }
        else {
          this.ripointlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.ripointlistErrorMessage = err.toString();
  
        });
    }

    districtChange()
    {
          console.log(this.selectedDistrict);
          this.ddlTestingCHC(this.selectedDistrict);

          this.selectedChc = '';
      let district = this.RiPtService.getCHCByDis(this.selectedDistrict).subscribe(response => {
        this.chcListResponse = response;
        if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
          this.chclists = this.chcListResponse.data;
          this.selectedChc = "";
          //this.disabledChc = true;
        }
        else {
          this.ripointlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.ripointlistErrorMessage = err.toString();
  
        });
    }
    ddlIlr(id) {
      let district = this.RiPtService.getIlrbychcList(id).subscribe(response => {
        this.ilrListResponse = response;
        if (this.ilrListResponse !== null && this.ilrListResponse.status === "true") {
          this.ilrlists = this.ilrListResponse.data;
          //this.selectedIlr = "";
          //this.selectedIlr=
        }
        else {
          this.ripointlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.ripointlistErrorMessage = err.toString();
  
        });
    }

    ddlTestingCHC(code) {
      console.log("abc");
      this.selectedtestingCHCId = '';
      let district = this.RiPtService.gettestingCHC(code).subscribe(response => {
        this.testingCHCResponse = response;
        if (this.testingCHCResponse !== null && this.testingCHCResponse.status === "true") {
          this.tcbydisList = this.testingCHCResponse.data;
         
        }
        else {
          this.ripointlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.ripointlistErrorMessage = err.toString();
        });
    }
    

    ddlChc() {

      //  this.selectedChc = '';
        let district = this.RiPtService.getCHCByDistrict(+this.selectedDistrict).subscribe(response => {
          this.chcListResponse = response;
          if (this.chcListResponse !== null && this.chcListResponse.status === "true") {
            this.chclists = this.chcListResponse.data;
          //  this.selectedChc = "";
          }
          else {
            this.ripointlistErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.ripointlistErrorMessage = err.toString();
    
          });
      }

      ddlEdtiPhc(code) {
        this.selectedEditPhc = '';
        let district = this.RiPtService.getPhcList(code).subscribe(response => {
          this.phcListResponse = response;
          if (this.phcListResponse !== null && this.phcListResponse.status === "true") {
            this.phclists = this.phcListResponse.data;
            // if(this.phclists.length > 0){
              // this.selectedEditPhc = this.getphc;
              
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

    ddlEditDistrict() {
      let district = this.RiPtService.getDistrictList().subscribe(response => {
        this.districtListResponse = response;
        if (this.districtListResponse !== null && this.districtListResponse.status === "true") {
          this.districtlists = this.districtListResponse.data;
  
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

    ddlSc(code) {
      this.selectedPhc = '';
      let district = this.RiPtService.getScList(code).subscribe(response => {
        this.scListResponse = response;
        if (this.scListResponse !== null && this.scListResponse.status === "true") {
          this.sclists = this.scListResponse.data;
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

    

    onChangeChc(event) {
  
      if (this.selectedChc === '') {
        this.selectedPhc = '';
      }
      else {
        this.ddlPhc(this.selectedChc);
        this.ddlIlr(this.selectedChc);
     
      }
    }
  

    onChangetesting(event) {

      if (this.selectedDistrict === '') {
        this.selectedtestingCHCId = '';
      }
      else {
        this.ddlTestingCHC(this.selectedDistrict);
      }
    }
    

    onChangeEditChc(event) {
  
      if (this.selectedEditChc === '') {
        this.selectedEditPhc = '';
      }
      else {
        this.ddlEdtiPhc(this.selectedEditChc);
      }
    }
    onChangePhc(event) {
  
      if (this.selectedPhc === '') {
        this.selectedSc = '';
      }
      else {
        this.ddlSc(this.selectedPhc);
      }
    }
    onChangeEditPhc(event) {
  
      if (this.selectedEditPhc === '') {
        this.selectedEditSc = '';
      }
      else {
        this.ddlEdtiSc(this.selectedEditPhc);
      }
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

  

    openAddRiPt(addRiPtDetail) {
    
      this.isaddform=true;
    this.selectedIlr="";
    this.selectedtestingCHCId="";
    this.selectedPhc="";
    this.selectedSc="";
    this.pincode="";
    this.selectedChc="";
    this.selectedDistrict="";
    this.riName1=" ";
      this.ddlDistrict();
      this.confirmationSelected = true;

      
        this.modalService.open(
          addRiPtDetail, {
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

    ddlPhc(code) {
      this.selectedPhc = '';
      let district = this.RiPtService.getPhcList(code).subscribe(response => {
        this.phcListResponse = response;
        if (this.phcListResponse !== null && this.phcListResponse.status === "true") {
          this.phclists = this.phcListResponse.data;
          this.selectedPhc = "";
         
        }
        else {
          this.ripointlistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.ripointlistErrorMessage = err.toString();
  
        });
    }

    onSubmitRI(addRiPtForm: NgForm){
  
      console.log(addRiPtForm.value);
      this.selectedIlr = addRiPtForm.value.ddlIlr;
      this.comments = addRiPtForm.value.Comments;
      this.selectedChc = addRiPtForm.value.ddlChc;
      this.selectedPhc = addRiPtForm.value.ddlPhc;
      this.selectedSc = addRiPtForm.value.ddlSc;
      this.selectedtestingCHCId = addRiPtForm.value.ddlTestingCHC;
      this.riCode = addRiPtForm.value.riCode;
      this.riName = addRiPtForm.value.riName;
      this.pincode = addRiPtForm.value.pincode;
     
  
      this.riptListRequest = {
        
        testingCHCId:+(this.selectedtestingCHCId) ,       
        chcId: +(this.selectedChc),
        phcId: +(this.selectedPhc),
        scId: +(this.selectedSc),
        riGovCode:"0",
        riSite: this.riName,
        ilrId:+ (this.selectedIlr), 
        pincode: this.pincode,
        isActive: ""+this.confirmationSelected,
        comments: this.comments,
        createdBy: this.user.id,
        updatedBy: this.user.id
        
      };
  
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
  
      let damagedsampleCollection = this.RiPtService.addRiPt(this.riptListRequest)
      .subscribe(response => {
        this.addriptResponse = response;
        if(this.addriptResponse !== null){
          this.showResponseMessage(this.addriptResponse.message, 's')
          this.retrieveRiPtList();
        }else{
          this.showResponseMessage(this.addriptResponse.message, 'e');
                  this.ripointlistErrorMessage = response.message;
        }
  
      },
      (err: HttpErrorResponse) => {
        this.showResponseMessage(err.toString(), 'e');
        this.ripointlistErrorMessage = err.toString();
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

function viewRiDetail(viewRiDetail: any, sample: any) {
  throw new Error('Function not implemented.');
}

