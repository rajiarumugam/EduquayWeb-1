import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SubjectProfileRequest, ParticularSubjectProfileRequest, anmSubjectTrackerRequest, subjectTrackerRequest } from 'src/app/shared/anm-module/subject-profile/subject-profile-request';
import { SubjectProfileResponse, PrimaryDetail, AddressDetail, ParentDetail, PregnancyDetail, RetrieveSubjectProfileList, SubjectProfileList, trackingANWSubjectResponse, trackingSubjectResponse, ANMSubject, SubjectTrack } from 'src/app/shared/anm-module/subject-profile/subject-profile-response';
import { SubjectProfileService } from 'src/app/shared/anm-module/subject-profile/subject-profile.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { DataService } from 'src/app/shared/data.service';
import { TokenService } from 'src/app/shared/token.service';
import { user } from 'src/app/shared/auth-response';
import { Router } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-anm-subject-profile-list',
  templateUrl: './anm-subject-profile-list.component.html',
  styleUrls: ['./anm-subject-profile-list.component.css']
})
export class AnmSubjectProfileListComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('startPicker', { static: false }) startPicker;
  @ViewChild('endPicker', { static: false }) endPicker;

  subjectprofilelistErrorMessage: string;

  subjectProfileRequest: SubjectProfileRequest;
  particularanmSubProfile: ParticularSubjectProfileRequest;
  anmsubjectProfileResponse: RetrieveSubjectProfileList;
  trackingAnmSubjectTrackerRequest: anmSubjectTrackerRequest;
  trackingAnmSubjectTrackerResponse: trackingANWSubjectResponse;
  trackingSubjectRequest: subjectTrackerRequest;
  trackingSubjectResponse: trackingSubjectResponse;
  anmSubjectTrackerDetail: ANMSubject;
  anmSubjectTrackerItem: ANMSubject;
  subjectTrackerItem: SubjectTrack;
  childsubjectTrackerItem: SubjectTrack;

  subjectprofileLists: SubjectProfileList[]=[];
  subjectprofileItem: SubjectProfileList;
  basicInfo: PrimaryDetail;
  // basicInfo: PrimaryDetail;
  socioDemographicInfo: AddressDetail;
  parentInfo: ParentDetail;
  personalInfo: PregnancyDetail;
  user: user;
  subjectid: string;
  searchsubjectid: string;
  userId: number;

  /*Date Range configuration starts*/
  dateform: FormGroup;
  DAY = 86400000;
  dyCollectionDate: Date = new Date(Date.now());
  anmSPFromDate: string ="";
  anmSPToDate: string = "";

  startOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: '',
    maxDate: new Date(Date.now())
  };
  endOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: '',
    minDate: new Date(moment().add(-1, 'day').format()),
    maxDate: new Date(Date.now())
  };

  
  spouseSubjectIdValue: string;
  spouseSamplingStatus: boolean;
  uniqueSubjectId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  religionId: number;
  religionName: string;
  casteId: number;
  casteName: string;
  communityId: number;
  communityName: string;
  address1: string;
  address2: string;
  address3: string;
  stateName: string;
  pincode: string;
  districtName: string;
  chcName: string;
  phcName: string;
  scName: string;
  riSite: string;
  dob: string;
  age: number;
  gender: string;
  mobileNo: string;
  emailId: string;
  spouseSubjectId: string;
  spouseFirstName: string;
  spouseMiddleName: string;
  spouseLastName: string;
  spouseContactNo: string;
  govIdTypeId: number;
  govIdType: string;
  govIdDetail: string;
  rchId: string;
  ecNumber: string;
  lmpDate: string;
  gestationalperiod: number;
  childSubjectTypeId: number;
  g: number;
  p: number;
  l: number;
  a: number;
  barcodes: string;
  ga: number;

  constructor(
    private SubjectProfileService: SubjectProfileService,
    private httpService: HttpClient,
    private _formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private tokenService: TokenService,
    private dataservice: DataService,
    private router: Router
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "ANM", "page": "Subject Profile"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.loaderService.display(true);
    this.SubprofileInitializeDateRange();

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
      }   
    };
    console.log(this.SubjectProfileService.subjectprofileListApi);
    this.subjectProfileRequest = {
      userId: this.user.id, 
      fromDate: '',
      toDate: '',
    }
    //this.subjectprofileItem = new SubjectProfileList();
    let subProfile = this.SubjectProfileService.getSubjectProfileList(this.subjectProfileRequest)
      .subscribe(response => {
        this.anmsubjectProfileResponse = response;
        this.loaderService.display(false);
        if (this.anmsubjectProfileResponse !== null && this.anmsubjectProfileResponse.status === "true") {
          if (this.anmsubjectProfileResponse.subjectsDetail.length <= 0 ) {
            this.subjectprofilelistErrorMessage = response.message;
          }
          else {
            this.subjectprofileLists = this.anmsubjectProfileResponse.subjectsDetail;
            this.rerender();
          }
        }
        else {
          this.subjectprofilelistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.subjectprofilelistErrorMessage = err.toString();
        });
  }


  anmSubjectProfileList() {
     
    this.loaderService.display(true);
    this.subjectprofilelistErrorMessage = '';
    this.subjectprofileLists=[];
    this.subjectProfileRequest = {
      userId: this.user.id, 
      fromDate: this.anmSPFromDate !== '' ? this.anmSPFromDate : '',
      toDate: this.anmSPToDate !== '' ? this.anmSPToDate : '',
    }
   
    //this.subjectprofileItem = new SubjectProfileList();
    let subProfile = this.SubjectProfileService.getSubjectProfileList(this.subjectProfileRequest)
      .subscribe(response => {
        this.anmsubjectProfileResponse = response;
        this.loaderService.display(false);
        if (this.anmsubjectProfileResponse !== null && this.anmsubjectProfileResponse.status === "true") {
          if (this.anmsubjectProfileResponse.subjectsDetail.length <= 0 ) {
            this.subjectprofilelistErrorMessage = response.message;
          }
          else {
            this.subjectprofileLists = this.anmsubjectProfileResponse.subjectsDetail;
            this.rerender();
          }
        }
        else {
          this.subjectprofilelistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.subjectprofilelistErrorMessage = err.toString();
        });

  }

  anmSubjectProfile() {

    this.loaderService.display(true);
    this.subjectprofileLists = [];
    this.subjectprofilelistErrorMessage = '';
    this.particularanmSubProfile = {
      userId: this.user.id, 
      userInput: this.searchsubjectid
    }

    let subProfile = this.SubjectProfileService.getparticularanmSubjectProfileList(this.particularanmSubProfile)
      .subscribe(response => {
        this.anmsubjectProfileResponse = response;
        this.loaderService.display(false);
        if (this.anmsubjectProfileResponse !== null && this.anmsubjectProfileResponse.status === "true") {
          if (this.anmsubjectProfileResponse.subjectsDetail.length <= 0 ) {
            this.subjectprofilelistErrorMessage = response.message;
          }
          else {
            this.subjectprofileLists = this.anmsubjectProfileResponse.subjectsDetail;
            this.rerender();
          }
        }
        else {
          this.subjectprofilelistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.subjectprofilelistErrorMessage = err.toString();
        });
   }

   openpopup(index, subjectinfo: SubjectProfileList){

    console.log(subjectinfo); 

    this.childSubjectTypeId = subjectinfo.primaryDetail.childSubjectTypeId;
    this.uniqueSubjectId = subjectinfo.primaryDetail.uniqueSubjectId;
    this.firstName = subjectinfo.primaryDetail.firstName;
    this.lastName = subjectinfo.primaryDetail.lastName;
    this.gender = subjectinfo.primaryDetail.gender;
    this.age = subjectinfo.primaryDetail.age;
    this.barcodes = subjectinfo.pregnancyDetail.barcodes;
    this.lmpDate = subjectinfo.pregnancyDetail.lmpDate;
    this.ga = subjectinfo.pregnancyDetail.gestationalperiod
    this.spouseSubjectId = subjectinfo.primaryDetail.spouseSubjectId;
    this.spouseFirstName = subjectinfo.primaryDetail.spouseFirstName;
    this.spouseLastName = subjectinfo.primaryDetail.spouseLastName;

    if((subjectinfo.primaryDetail.childSubjectTypeId === 1 && subjectinfo.primaryDetail.spouseSubjectId === '') ||(subjectinfo.primaryDetail.childSubjectTypeId === 4 && subjectinfo.primaryDetail.spouseSubjectId === '' && subjectinfo.primaryDetail.gender === "Female")){
      this.uniqueSubjectId = subjectinfo.primaryDetail.uniqueSubjectId;
      this.trackingAnmSubjectTrackerRequest = {
        uniqueSubjectId: this.uniqueSubjectId
      }

    let subProfile = this.SubjectProfileService.getTrackingANWSubject(this.trackingAnmSubjectTrackerRequest)
      .subscribe(response => {
        this.trackingAnmSubjectTrackerResponse = response;
        this.loaderService.display(false);
        if (this.trackingAnmSubjectTrackerResponse !== null && this.trackingAnmSubjectTrackerResponse.status === "true") {
          // if (this.trackingAnmSubjectTrackerResponse.data.length <= 0 ) {
          //   this.subjectprofilelistErrorMessage = response.message;
          // }
          // else {
            this.anmSubjectTrackerItem = this.trackingAnmSubjectTrackerResponse.data;
            this.spouseSubjectIdValue = this.anmSubjectTrackerItem.spouseSubjectId;
            //this.rerender();
          }
        //}
        else {
          this.subjectprofilelistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.subjectprofilelistErrorMessage = err.toString();
        });


    }
    else if((subjectinfo.primaryDetail.childSubjectTypeId === 1 && subjectinfo.primaryDetail.spouseSubjectId !== '' ) || (subjectinfo.primaryDetail.childSubjectTypeId === 4 && subjectinfo.primaryDetail.spouseSubjectId !== '' && subjectinfo.primaryDetail.gender === "Female")){
      this.spouseSubjectId = subjectinfo.primaryDetail.spouseSubjectId;
      this.uniqueSubjectId = subjectinfo.primaryDetail.uniqueSubjectId;
  
     
      this.trackingAnmSubjectTrackerRequest = {
        uniqueSubjectId: this.uniqueSubjectId
      }
     
      let anmSubjectTracking = this.SubjectProfileService.getTrackingANWSubject(this.trackingAnmSubjectTrackerRequest)
        .subscribe(response => {
         
          this.trackingAnmSubjectTrackerResponse = response;
          this.loaderService.display(false);
       
              if (this.trackingAnmSubjectTrackerResponse !== null && this.trackingAnmSubjectTrackerResponse.status === "true") {
                this.anmSubjectTrackerItem = this.trackingAnmSubjectTrackerResponse.data;
              //this.spouseSamplingStatus = this.subjectTrackerItem.samplingStatus;
              this.trackingSubjectRequest = {
                uniqueSubjectId: this.spouseSubjectId
              }
              let subjectTracking = this.SubjectProfileService.getTrackingSubject(this.trackingSubjectRequest)
              .subscribe(response => {
                this.trackingSubjectResponse = response;
                if (this.trackingSubjectResponse !== null && this.trackingSubjectResponse.status === "true") {
                  // if (this.trackingAnmSubjectTrackerResponse.data.length <= 0 ) {
                  //   this.subjectprofilelistErrorMessage = response.message;
                  // }
                  // else {
                    this.subjectTrackerItem = this.trackingSubjectResponse.data;
    
                }
                else{
                  this.subjectprofilelistErrorMessage = response.message;
                }
              })
              
            }
          //}
          else {
            this.subjectprofilelistErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.subjectprofilelistErrorMessage = err.toString();
          });
  
  
      }
    else if((subjectinfo.primaryDetail.childSubjectTypeId === 2 ) || (subjectinfo.primaryDetail.childSubjectTypeId === 4 && subjectinfo.primaryDetail.gender === "Male" && subjectinfo.primaryDetail.spouseSubjectId !== '')){
      this.spouseSubjectId = subjectinfo.primaryDetail.spouseSubjectId;
      this.uniqueSubjectId = subjectinfo.primaryDetail.uniqueSubjectId;
  
      this.trackingSubjectRequest = {
        uniqueSubjectId: this.uniqueSubjectId
      }      
      let subjectTracking = this.SubjectProfileService.getTrackingSubject(this.trackingSubjectRequest)      
        .subscribe(response => {
          console.log(response);
          this.trackingSubjectResponse = response;        
          this.loaderService.display(false);
          if (this.trackingSubjectResponse !== null && this.trackingSubjectResponse.status === "true") {
            // if (this.trackingAnmSubjectTrackerResponse.data.length <= 0 ) {
            //   this.subjectprofilelistErrorMessage = response.message;
            // }
            // else {
              this.subjectTrackerItem = this.trackingSubjectResponse.data;
              this.spouseSamplingStatus = this.subjectTrackerItem.samplingStatus;
              this.trackingAnmSubjectTrackerRequest = {
                uniqueSubjectId: this.spouseSubjectId
              }
              let anmSubjectTracking = this.SubjectProfileService.getTrackingANWSubject(this.trackingAnmSubjectTrackerRequest)
              .subscribe(response => {
                console.log(response);
                this.trackingAnmSubjectTrackerResponse = response;
                this.barcodes = response.data.barcodeNo;
                this.lmpDate = response.data.lmpDate;
                this.ga = Number(response.data['ga']);
                if (this.trackingAnmSubjectTrackerResponse !== null && this.trackingAnmSubjectTrackerResponse.status === "true") {
                  this.anmSubjectTrackerItem = this.trackingAnmSubjectTrackerResponse.data;
    
                }
                else{
                  this.subjectprofilelistErrorMessage = response.message;
                }
              });
              
            }
          //}
          else {
            this.subjectprofilelistErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.subjectprofilelistErrorMessage = err.toString();
          });
  
  
      }
      else if(subjectinfo.primaryDetail.childSubjectTypeId === 4 && subjectinfo.primaryDetail.gender === "Male" && subjectinfo.primaryDetail.spouseSubjectId === ''){
        this.uniqueSubjectId = subjectinfo.primaryDetail.uniqueSubjectId;
        this.trackingSubjectRequest = {
          uniqueSubjectId: this.uniqueSubjectId
        }
  
      let subProfile = this.SubjectProfileService.getTrackingANWSubject(this.trackingSubjectRequest)
        .subscribe(response => {
          this.trackingSubjectResponse = response;
          this.loaderService.display(false);
          if (this.trackingSubjectResponse !== null && this.trackingSubjectResponse.status === "true") {
            // if (this.trackingAnmSubjectTrackerResponse.data.length <= 0 ) {
            //   this.subjectprofilelistErrorMessage = response.message;
            // }
            // else {
              this.subjectTrackerItem = this.trackingSubjectResponse.data;
              this.spouseSubjectIdValue = this.anmSubjectTrackerItem.spouseSubjectId;
              //this.rerender();
            }
          //}
          else {
            this.subjectprofilelistErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.subjectprofilelistErrorMessage = err.toString();
          });
  
  
      }
      else if(subjectinfo.primaryDetail.childSubjectTypeId === 3){
        this.uniqueSubjectId = subjectinfo.primaryDetail.uniqueSubjectId;
        this.trackingAnmSubjectTrackerRequest = {
          uniqueSubjectId: this.uniqueSubjectId
        }
  
      let subProfile = this.SubjectProfileService.getTrackingANWSubject(this.trackingAnmSubjectTrackerRequest)
        .subscribe(response => {
          this.trackingAnmSubjectTrackerResponse = response;
          this.loaderService.display(false);
          if (this.trackingAnmSubjectTrackerResponse !== null && this.trackingAnmSubjectTrackerResponse.status === "true") {
            // if (this.trackingAnmSubjectTrackerResponse.data.length <= 0 ) {
            //   this.subjectprofilelistErrorMessage = response.message;
            // }
            // else {
              this.anmSubjectTrackerItem = this.trackingAnmSubjectTrackerResponse.data;
              this.spouseSubjectIdValue = this.anmSubjectTrackerItem.spouseSubjectId;
              //this.rerender();
            }
          //}
          else {
            this.subjectprofilelistErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.subjectprofilelistErrorMessage = err.toString();
          });
  
  
      }
    
        $('#fadeinModal').modal('show');
  
  }

  opensubjectdetail(subjectinfo: SubjectProfileList ){

    if(subjectinfo.primaryDetail.registeredFrom === 'ANM'){
      this.subjectid = subjectinfo.primaryDetail.uniqueSubjectId;
      this.router.navigateByUrl(`/app/anm-viewsubjectprofile?q=${this.subjectid}`);
    }
    else if(subjectinfo.primaryDetail.registeredFrom === 'CHC'){
      this.subjectid = subjectinfo.primaryDetail.uniqueSubjectId;
      this.router.navigateByUrl(`/app/chc-reg-viewsubjectprofile?q=${this.subjectid}`);
    }
    
    //   if(index.length > 0){
    //     this.subjectprofileLists.find(element => {
    //     // var subjectid = element.primaryDetail.uniqueSubjectId;
    //     this.router.navigateByUrl(`/app/anm-viewsubjectprofile?q=${element.primaryDetail.uniqueSubjectId}`);    
    // });
  //}
    
  }

  SubprofileInitializeDateRange() {
    
    this.dateform = this._formBuilder.group({
      fromDate: [''],
      toDate: [''],
    });

    // Start Date Changes
    this.dateform.controls.fromDate.valueChanges.subscribe(changes => {
      if (!changes[0]) return;
      const selectedDate = changes[0].getTime();
      this.anmSPFromDate = moment(new Date(selectedDate)).format("DD/MM/YYYY");
      const monthLaterDate = selectedDate + (this.DAY * 30);
      // console.log(monthLaterDate > Date.now() ? new Date() : new Date(monthLaterDate));
      if (changes > this.dateform.controls.toDate.value) {
        this.endPicker.flatpickr.set({
          defaultDate: new Date(Date.now()),
          minDate: new Date(selectedDate),
        });
      }
      else {
        this.endPicker.flatpickr.set({
          minDate: new Date(selectedDate),
        });
      }
    });

    // // End Date Changes
    this.dateform.controls.toDate.valueChanges.subscribe(changes => {
      console.log('end: ', changes);
      if (!changes[0]) return;
      const selectedDate1 = changes[0].getTime();
      this.anmSPToDate = moment(new Date(selectedDate1)).format("DD/MM/YYYY");

    });

  }

  returnTimeStamp(da)
  {
    var _date = da.split('/')[0];
    var _month = da.split('/')[1];
    var _year = da.split('/')[2];
    return moment(_month+"/"+_date+"/"+_year).unix();
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

