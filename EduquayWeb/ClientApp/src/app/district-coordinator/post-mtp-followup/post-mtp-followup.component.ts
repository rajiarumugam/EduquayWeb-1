import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, EventEmitter, Output, HostListener } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { user } from 'src/app/shared/auth-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/shared/utility/date.service';
import { TokenService } from 'src/app/shared/token.service';
import { FormBuilder } from '@angular/forms';
import { ConstantService } from 'src/app/shared/constant.service';
import { DataService } from 'src/app/shared/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { dcpostMTP, dcpostMTPResponse, DcUpdatePostMTPResponse } from 'src/app/shared/district-coordinator/dc-notification-response';
import { DcPostMTPRequest } from 'src/app/shared/district-coordinator/dc-notification-request';
import { DistrictCoordinatorService } from 'src/app/shared/district-coordinator/district-coordinator.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-post-mtp-followup',
  templateUrl: './post-mtp-followup.component.html',
  styleUrls: ['./post-mtp-followup.component.css']
})
export class PostMtpFollowupComponent implements AfterViewInit, OnDestroy, OnInit {
    //Child component
    @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();  //step 1
    @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;
    
    loadDataTable: boolean = false;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    user: user;
  
    recordCount: number; //step 2
    dcpostMTPErrorMessage: string;
    dcpostMTPResponse: dcpostMTPResponse;
    postMTPList: dcpostMTP[]= [];
    dcpostMTPRequest: DcPostMTPRequest;
    dcupdatepostMTPResponse: DcUpdatePostMTPResponse;
  
    
    mtpId: number;
    uniqueSubjectId: string;
    subjectName: string;
    rchId: string;
    anmContactNo: string;
    anmName: string;
    mtpDateTime: string;
    chcName: string;
    firstFollowUp: string;
    secondFollowUp: string;
    thirdFollowUp: string;
    notifySamples: string;
  
    @HostListener('window:scroll')
    checkScroll() {
  
      // window의 scroll top
      // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.
  
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  
      //console.log('[scroll]', scrollPosition);
  
      if (scrollPosition > 180) {
        $('#showhidediv').show();
      }
      else
        $('#showhidediv').hide();
  
    }
  
    constructor(
      private dcpostMTPService: DistrictCoordinatorService,
      private modalService: NgbModal,
      private router: Router,
      private route: ActivatedRoute,
      private dateService: DateService,
      private tokenService: TokenService,
      private _formBuilder: FormBuilder,
      private constantService: ConstantService,
      private dataservice: DataService,
      private loaderService: LoaderService
    ) { }
  
    ngOnInit() {
  
      this.dataservice.sendData(JSON.stringify({"module": "District Coordinator", "submodule":"Notification", "page": "Post MTP Follow-up"}));
      this.recordCount = 0;
      this.user = JSON.parse(this.tokenService.getUser('lu'));
      //this.InitializeDateRange(); 
      this.dtOptions = { 
        pagingType: 'simple_numbers',
        pageLength: 5,
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
      // this.collectionDate = this.dateService.getDate();
      // this.collectionTime = this.dateService.getTime();
      // this.collectionDate = moment().format("DD/MM/YYYY");
      // this.collectionTime = moment().format("HH:mm");
      console.log(this.dcpostMTPService.damagedSampleApi);
      this.dcpostMTP(this.user.districtId);
  
      
    }
  
    dcpostMTP(districtId){

      this.loaderService.display(true);
      this.recordCount = 0; //step 3
      this.postMTPList = [];
      this.dcpostMTPErrorMessage ='';
      let samplesList = this.dcpostMTPService.getPostMtp(this.user.districtId)
      .subscribe(response => {
        this.dcpostMTPResponse = response;
        this.loaderService.display(false);
        if(this.dcpostMTPResponse !== null && this.dcpostMTPResponse.status === "true"){
          if(this.dcpostMTPResponse.samples.length <= 0){
            this.dcpostMTPErrorMessage = response.message;
          }
          else{
            this.postMTPList = this.dcpostMTPResponse.samples;
            this.recordCount = this.postMTPList.length; //step 4
          }
        }
        else{
          this.dcpostMTPErrorMessage = response.message;
        }
        this.onLoadSubject.emit(this.recordCount);    //step 5
        this.rerender();
        this.loadDataTable = true;
      },
      (err: HttpErrorResponse) => {
        if (this.loadDataTable) this.rerender();
        this.dcpostMTPErrorMessage = err.toString();
      });
    }
  
   
  
    postMTPUpdateStatus(){
      this.dcpostMTPErrorMessage = '';
      this.fetchBarcodes();
  
      if(this.notifySamples === ""){
        this.updatestatusResponseMessage(this.constantService.SelectOneSample, 'e');
        return false;
      }
     
      this.dcpostMTPRequest = {
        userId: this.user.id,
        mtpId: this.notifySamples,
       
      }
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
      let adddamagedsample = this.dcpostMTPService.updatePostMTP(this.dcpostMTPRequest)
        .subscribe(response => {
          this.dcupdatepostMTPResponse = response;
          if (this.dcupdatepostMTPResponse !== null && this.dcpostMTPResponse.status === "true") {
            this.updatestatusResponseMessage(this.dcupdatepostMTPResponse.message, 's');
          } else {
            this.updatestatusResponseMessage(this.dcupdatepostMTPResponse.message, 'e');
            this.dcpostMTPErrorMessage = response.message;
          }
  
        },
          (err: HttpErrorResponse) => {
            this.updatestatusResponseMessage(err.toString(), 'e');
            this.dcpostMTPErrorMessage = err.toString();
          });
  
    }
  
    updatestatusResponseMessage(result: string, type: string){
      var messageType = '';
      if(type === 'e'){
        Swal.fire({icon:'error', title: result, confirmButtonText: 'Close', allowOutsideClick: false})
      }
      else{
        Swal.fire({icon:'success', title: result, confirmButtonText: 'Close', allowOutsideClick: false})
        .then((result) => {
          if (result.value) {
            this.modalService.dismissAll();
          }
        });
      }
    }
  
    updateNotification(postmtp: dcpostMTP, notifiedStatus: string){
      if(notifiedStatus === '0'){
        postmtp.followupStatus = false;
      }
      else{
        postmtp.followupStatus = true;
      }
    }
  
  fetchBarcodes(){
    this.notifySamples = '';
    var isFirst = true;
    this.postMTPList.forEach(element => {
      console.log('notifiedStatus :' + element.followupStatus);
      if(element.followupStatus === true){
        if(isFirst){
          this.notifySamples += element.mtpId;
          isFirst = false;
        }
        else{
          this.notifySamples += ',' + element.mtpId;
        }
      }
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
