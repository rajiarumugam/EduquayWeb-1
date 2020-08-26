import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { RetrieveSubjectProfileList, SubjectProfileList } from 'src/app/shared/anm-module/subject-profile/subject-profile-response';
import { SubjectProfileService } from 'src/app/shared/anm-module/subject-profile/subject-profile.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import { DataService } from 'src/app/shared/data.service';
import { Router } from '@angular/router';
import { user } from 'src/app/shared/auth-response';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { SubjectProfileRequest, ParticularSubjectProfileRequest } from 'src/app/shared/anm-module/subject-profile/subject-profile-request';

@Component({
  selector: 'app-chc-subject-profile-list',
  templateUrl: './chc-subject-profile-list.component.html',
  styleUrls: ['./chc-subject-profile-list.component.css']
})
export class ChcSubjectProfileListComponent implements AfterViewInit, OnDestroy, OnInit {

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

  subjectprofileLists: SubjectProfileList[]=[];
  subjectid: string;
  searchsubjectid: string;

/*Date Range configuration starts*/
  dateform: FormGroup;
  DAY = 86400000;
  dyCollectionDate: Date = new Date(Date.now());
  chcSPFromDate: string ="";
  chcSPToDate: string = "";

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
    this.dataservice.sendData(JSON.stringify({"module": "CHC - Reg & Sampling", "page": "Subject Profile"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.loaderService.display(true);
    this.SubprofileInitializeDateRange();  

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
      }   
    };
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
