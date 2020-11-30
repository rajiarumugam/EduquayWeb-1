import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CasteList, CasteResponse, CommunityeResponse, CommunityList, GovIdType, GovtIDTypeResponse, Religion, ReligionResponse, RetrieveSubjectProfileList, SubjectProfileList, PrimaryDetail, AddressDetail, PregnancyDetail, ParentDetail, trackingANWSubjectResponse, trackingSubjectResponse, ANMSubject, SubjectTrack } from 'src/app/shared/anm-module/subject-profile/subject-profile-response';
import { SubjectProfileService } from 'src/app/shared/anm-module/subject-profile/subject-profile.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import { DataService } from 'src/app/shared/data.service';
import { Router } from '@angular/router';
import { user } from 'src/app/shared/auth-response';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { SubjectProfileRequest, ParticularSubjectProfileRequest, anmSubjectTrackerRequest, subjectTrackerRequest } from 'src/app/shared/anm-module/subject-profile/subject-profile-request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatStepper } from '@angular/material/stepper';
declare var $: any;

@Component({
  selector: 'app-chc-subject-profile-list',
  templateUrl: './chc-subject-profile-list.component.html',
  styleUrls: ['./chc-subject-profile-list.component.css']
})
export class ChcSubjectProfileListComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('startPicker', { static: false }) startPicker;
  @ViewChild('endPicker', { static: false }) endPicker;

  chcsubjectprofilelistErrorMessage: string;
  user: user;

  chcsubjectProfileRequest: SubjectProfileRequest;
  particularchcSubProfile: ParticularSubjectProfileRequest;
  chcsubjectProfileResponse: RetrieveSubjectProfileList;
  trackingAnmSubjectTrackerRequest: anmSubjectTrackerRequest;
  trackingAnmSubjectTrackerResponse: trackingANWSubjectResponse;
  trackingSubjectRequest: subjectTrackerRequest;
  trackingSubjectResponse: trackingSubjectResponse;
  anmSubjectTrackerDetail: ANMSubject;
  anmSubjectTrackerItem: ANMSubject;
  subjectTrackerItem: SubjectTrack;
  childsubjectTrackerItem: SubjectTrack;
  primaryDetail: PrimaryDetail;
  addressDetail: AddressDetail;
  pregnancyDetail: PregnancyDetail;
  parentDetail: ParentDetail;
  religionResponse: ReligionResponse;

  subjectprofileLists: SubjectProfileList[]=[];
  subjectprofileListitem: SubjectProfileList;
  subjectid: string;
  searchsubjectid: string;
  chcreligions: Religion[] = [];
  selectedreligion = '';
  govtIdTypeResponse: GovtIDTypeResponse;
  govtIdTypes: GovIdType[] = [];
  selectedgovtidtype = '';
  casteResponse: CasteResponse;
  chccastes: CasteList[] = [];
  selectedcaste = '';
  communityResponse: CommunityeResponse;
  chccommunities: CommunityList[] = [];
  selectedcommunity = '';

/*Date Range configuration starts*/
  dateform: FormGroup;
  DAY = 86400000;
  dyCollectionDate: Date = new Date(Date.now());
  chcSPFromDate: string ="";
  chcSPToDate: string = "";
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  firstFormCheck = false;
  secondFormCheck = false;
  selectedfirstName;

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
  ga: number

  constructor(
    private SubjectProfileService: SubjectProfileService,
    private httpService: HttpClient,
    private _formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private tokenService: TokenService,
    private dataservice: DataService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.dataservice.sendData(JSON.stringify({"module": "CHC - Reg & Sampling", "page": "Subject Profile"}));
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

    this.firstFormGroup = this._formBuilder.group({
      // dor: ['', Validators.required],
      // district: ['', Validators.required],
      // chc: ['', Validators.required],
      // phc: ['', Validators.required],
      // sc: ['', Validators.required],
      // ripoint: ['', Validators.required],
      // pincode: ['', Validators.required],
      // contactNumber: ['', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
      // subjectitle: ['Ms.'],
      firstname: ['null', Validators.required],
      middlename: [''],
      lastname: ['null', Validators.required],
      dob: [''],
      age: ['', [Validators.required,Validators.min(1), Validators.max(99)]],
      DDLreligion: ['null', Validators.required],
      DDLcaste: ['null', Validators.required],
      DDLcommunity: ['null', Validators.required],
   });
   this.secondFormGroup = this._formBuilder.group({
    ecNumber: [''],
    DDLGovtIDType: [''],
    GovtIDDetail: [''],
    house: ['null', Validators.required],
    street: ['null', Validators.required],
    city : ['null', Validators.required],
    stateName: ['null', Validators.required],
    mobileNo: ['null', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
    spouseFirstName: ['null', Validators.required],
    spouseMiddleName: [''],
    spouseLastName: ['null', Validators.required],
    spouseContactNo: ['null', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
    emailId: ['null',Validators.email],
    rchId: ['null', Validators.required],
  });
    console.log(this.SubjectProfileService.chcsubjectprofileListApi);
    //this.chcSubjectProfileList();
    this.chcsubjectProfileRequest = {
      userId: this.user.id, 
      fromDate: '',
      toDate: '',
    }
    //this.subjectprofileItem = new SubjectProfileList();
    let subProfile = this.SubjectProfileService.getchcSubjectProfileList(this.chcsubjectProfileRequest)
      .subscribe(response => {
        this.chcsubjectProfileResponse = response;
        this.loaderService.display(false);
        if (this.chcsubjectProfileResponse !== null && this.chcsubjectProfileResponse.status === "true") {
          if (this.chcsubjectProfileResponse.subjectsDetail.length <= 0 ) {
            this.chcsubjectprofilelistErrorMessage = response.message;
          }
          else {
            this.subjectprofileLists = this.chcsubjectProfileResponse.subjectsDetail;
            // this.subjectprofileListitem = this.chcsubjectProfileResponse.subjectsDetail;
            this.rerender();
          }
        }
        else {
          this.chcsubjectprofilelistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.chcsubjectprofilelistErrorMessage = err.toString();
        });
    
  }

  ddlReligion() {
    this.chcreligions = [];
    this.selectedreligion = '0';
    this.SubjectProfileService.getReligion().subscribe(response => {
      this.religionResponse = response;
      if (this.religionResponse !== null && this.religionResponse.status === "true") {
        this.chcreligions = this.religionResponse.religion;
        if (this.chcreligions.length > 0) {
          this.selectedreligion = this.subjectprofileListitem.addressDetail.religionId.toString();
          // this.firstFormGroup = new FormGroup({
          //   DDLreligion : new FormControl(this.addressDetail.religionId.toString())
          // });
        }

      }
      else {
        this.chcsubjectprofilelistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.chcsubjectprofilelistErrorMessage = err.toString();

      });
  }
  

  ddlGovtIdType() {
    this.govtIdTypes = [];
    this.selectedgovtidtype = '0';
    this.SubjectProfileService.getGovtIdType().subscribe(response => {
      this.govtIdTypeResponse = response;
      if (this.govtIdTypeResponse !== null && this.govtIdTypeResponse.status === "true") {
        this.govtIdTypes = this.govtIdTypeResponse.govIdType;
        if (this.govtIdTypes.length > 0) {
          this.selectedgovtidtype = this.primaryDetail.govIdTypeId.toString();
        }

      }
      else {
        this.chcsubjectprofilelistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.chcsubjectprofilelistErrorMessage = err.toString();

      });
  }

  ddlCaste() {
    this.chccastes = [];
    this.selectedcaste = '0';
    this.SubjectProfileService.getCaste().subscribe(response => {
      this.casteResponse = response;
      if (this.casteResponse !== null && this.casteResponse.status === "true") {
        this.chccastes = this.casteResponse.caste;
        if (this.chccastes.length > 0) {
          this.selectedcaste = this.addressDetail.casteId.toString();
          this.onChangecaste(this.addressDetail.casteId.toString())
        }

      }
      else {
        this.chcsubjectprofilelistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.chcsubjectprofilelistErrorMessage = err.toString();

      });
  }

  onChangecaste(code) {
    this.chccommunities = [];
    this.selectedcommunity = '0';
    this.SubjectProfileService.getCommunnity(code).subscribe(response => {
      this.communityResponse = response;
      if (this.communityResponse !== null && this.communityResponse.status === "true") {
        this.chccommunities = this.communityResponse.community;
        if (this.chccommunities.length > 0) {
          if (this.chccommunities.findIndex(com => com.id === this.addressDetail.communityId) >= 0) {
            this.selectedcommunity = this.addressDetail.communityId.toString();
          }
          else {
            this.selectedcommunity = '0';
          }
         }
      }
      else {
        this.chcsubjectprofilelistErrorMessage = response.message;
      }
    },
      (err: HttpErrorResponse) => {
        this.chcsubjectprofilelistErrorMessage = err.toString();

      });
  }

  chcSubjectProfileList() {
     
    this.loaderService.display(true);
    this.subjectprofileLists = [];
    this.chcsubjectprofilelistErrorMessage = '';
    this.chcsubjectProfileRequest = {
      userId: this.user.id, 
      fromDate: this.chcSPFromDate !== '' ? this.chcSPFromDate : '',
      toDate: this.chcSPToDate !== '' ? this.chcSPToDate : '',
    }

    let subProfile = this.SubjectProfileService.getchcSubjectProfileList(this.chcsubjectProfileRequest)
      .subscribe(response => {
        this.chcsubjectProfileResponse = response;
        this.loaderService.display(false);
        if (this.chcsubjectProfileResponse !== null && this.chcsubjectProfileResponse.status === "true") {
          if (this.chcsubjectProfileResponse.subjectsDetail.length <= 0 ) {
            this.chcsubjectprofilelistErrorMessage = response.message;
          }
          else {
            this.subjectprofileLists = this.chcsubjectProfileResponse.subjectsDetail;
            this.rerender();
          }
        }
        else {
          this.chcsubjectprofilelistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.chcsubjectprofilelistErrorMessage = err.toString();
        });

  }

   chcSubjectProfile() {

    this.loaderService.display(true);
    this.subjectprofileLists = [];
    this.chcsubjectprofilelistErrorMessage = '';
    this.particularchcSubProfile = {
      userId: this.user.id, 
      userInput: this.searchsubjectid
    }

    let subProfile = this.SubjectProfileService.getparticularchcSubjectProfileList(this.particularchcSubProfile)
      .subscribe(response => {
        this.chcsubjectProfileResponse = response;
        this.loaderService.display(false);
        if (this.chcsubjectProfileResponse !== null && this.chcsubjectProfileResponse.status === "true") {
          if (this.chcsubjectProfileResponse.subjectsDetail.length <= 0 ) {
            this.chcsubjectprofilelistErrorMessage = response.message;
          }
          else {
            this.subjectprofileLists = this.chcsubjectProfileResponse.subjectsDetail;
            this.rerender();
          }
        }
        else {
          this.chcsubjectprofilelistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.chcsubjectprofilelistErrorMessage = err.toString();
        });
   }

  opensubjectdetail(subjectinfo: SubjectProfileList ){

    this.subjectid = subjectinfo.primaryDetail.uniqueSubjectId;
    this.router.navigateByUrl(`/app/chc-viewsubjectprofile?q=${this.subjectid}`);
    
  }
  openpopup(index, subjectinfo: SubjectProfileList){

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

    if(subjectinfo.primaryDetail.childSubjectTypeId === 1 && subjectinfo.primaryDetail.spouseSubjectId === ''){
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
          this.chcsubjectprofilelistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.chcsubjectprofilelistErrorMessage = err.toString();
        });


    }
    else if(subjectinfo.primaryDetail.childSubjectTypeId === 1 && subjectinfo.primaryDetail.spouseSubjectId !== null){
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
            this.spouseSamplingStatus = this.subjectTrackerItem.samplingStatus;
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
                this.chcsubjectprofilelistErrorMessage = response.message;
              }
            })
            
          }
        //}
        else {
          this.chcsubjectprofilelistErrorMessage = response.message;
        }
      },
        (err: HttpErrorResponse) => {
          this.chcsubjectprofilelistErrorMessage = err.toString();
        });


    }
    else if(subjectinfo.primaryDetail.childSubjectTypeId === 2){
      this.spouseSubjectId = subjectinfo.primaryDetail.spouseSubjectId;
      this.uniqueSubjectId = subjectinfo.primaryDetail.uniqueSubjectId;
  
      this.trackingSubjectRequest = {
        uniqueSubjectId: this.uniqueSubjectId
      }
      
      let subjectTracking = this.SubjectProfileService.getTrackingSubject(this.trackingSubjectRequest)
      
        .subscribe(response => {
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
                this.trackingAnmSubjectTrackerResponse = response;
                if (this.trackingAnmSubjectTrackerResponse !== null && this.trackingAnmSubjectTrackerResponse.status === "true") {
                  this.anmSubjectTrackerItem = this.trackingAnmSubjectTrackerResponse.data;
    
                }
                else{
                  this.chcsubjectprofilelistErrorMessage = response.message;
                }
              });
              
            }
          //}
          else {
            this.chcsubjectprofilelistErrorMessage = response.message;
          }
        },
          (err: HttpErrorResponse) => {
            this.chcsubjectprofilelistErrorMessage = err.toString();
          });
  
  
      }
    
        $('#fadeinModal').modal('show');
  
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
      this.chcSPFromDate = moment(new Date(selectedDate)).format("DD/MM/YYYY");
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
      this.chcSPToDate = moment(new Date(selectedDate1)).format("DD/MM/YYYY");

    });

  }

  openEditSubjectdetail(chcsubjectProfiledetail, subjectinfo: SubjectProfileList) {
    
    this.ddlReligion();
    this.ddlGovtIdType();
    this.ddlCaste();
    //this.ddlGvalue();
    //this.selectedfirstName = subjectinfo.primaryDetail.firstName;
    this.firstFormGroup = new FormGroup({
      firstName: new FormControl(subjectinfo.primaryDetail.firstName),
      lastName: new FormControl(subjectinfo.primaryDetail.lastName),
      middleName: new FormControl(subjectinfo.primaryDetail.middleName),
      dob: new FormControl(subjectinfo.primaryDetail.dob),
      age: new FormControl(subjectinfo.primaryDetail.age),
      DDLreligion: new FormControl(subjectinfo.addressDetail.religionName),
      DDLcaste: new FormControl(subjectinfo.addressDetail.casteName),
      DDLcommunity: new FormControl(subjectinfo.addressDetail.communityName),
      
    });
    this.secondFormGroup = new FormGroup({
      house: new FormControl(subjectinfo.addressDetail.address1),
      street: new FormControl(subjectinfo.addressDetail.address2), 
      city: new FormControl(subjectinfo.addressDetail.address3),
      stateName: new FormControl(subjectinfo.addressDetail.stateName),
      pincode: new FormControl(subjectinfo.addressDetail.pincode),
      mobileNo: new FormControl(subjectinfo.primaryDetail.mobileNo),
      emailId: new FormControl(subjectinfo.primaryDetail.emailId),
      govIdDetail: new FormControl(subjectinfo.primaryDetail.govIdDetail),
      rchId: new FormControl(subjectinfo.pregnancyDetail.rchId),
      ecNumber: new FormControl(subjectinfo.pregnancyDetail.ecNumber),
      spouseFirstName: new FormControl(subjectinfo.primaryDetail.spouseFirstName),
      spouseMiddleName: new FormControl(subjectinfo.primaryDetail.spouseMiddleName),
      spouseLastName: new FormControl(subjectinfo.primaryDetail.spouseLastName),
      spouseContactNo: new FormControl(subjectinfo.primaryDetail.spouseContactNo),
      DDLGovtIDType: new FormControl(subjectinfo.primaryDetail.govIdType)

    });
    

    this.modalService.open(
      chcsubjectProfiledetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
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

  nextStep(stepper: MatStepper) {
    this.firstFormCheck = true;
      if(this.firstFormGroup.valid)
       stepper.next();
    }

    // prevStep() {
    //   this.stepper.previous();
    //   }

  prevStep(stepper: MatStepper) {
    stepper.previous();
  }



}
