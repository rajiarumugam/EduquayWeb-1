import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { RetrieveSubjectProfileList, SubjectProfileList } from 'src/app/shared/anm-module/subject-profile/subject-profile-response';
import { SubjectProfileService } from 'src/app/shared/anm-module/subject-profile/subject-profile.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { TokenService } from 'src/app/shared/token.service';
import { DataService } from 'src/app/shared/data.service';
import { Router } from '@angular/router';
import { user } from 'src/app/shared/auth-response';

@Component({
  selector: 'app-chc-subject-profile-list',
  templateUrl: './chc-subject-profile-list.component.html',
  styleUrls: ['./chc-subject-profile-list.component.css']
})
export class ChcSubjectProfileListComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  chcsubjectprofilelistErrorMessage: string;
  user: user;

  //chcsubjectProfileRequest: SubjectProfileRequest;
  chcsubjectProfileResponse: RetrieveSubjectProfileList;

  subjectprofileLists: SubjectProfileList[]=[];
  subjectid: string;

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
    this.loaderService.display(false);

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
    this.chcSubjectProfileList(this.user.id);
  }

  chcSubjectProfileList(userId) {
    //this.basicInfo = {};  
    //this.basicInfo['firstName']='';  
    this.loaderService.display(true);

    this.chcsubjectprofilelistErrorMessage = '';
    //this.subjectprofileItem = new SubjectProfileList();
    let subProfile = this.SubjectProfileService.getchcSubjectProfileList(this.user.id)
      .subscribe(response => {
        this.chcsubjectProfileResponse = response;
        this.loaderService.display(false);
        if (this.chcsubjectProfileResponse !== null && this.chcsubjectProfileResponse.status === "true") {
          if (this.chcsubjectProfileResponse.subjectsDetail.length <= 0 ) {
            this.chcsubjectprofilelistErrorMessage = response.message;
          }
          else {
            this.subjectprofileLists = this.chcsubjectProfileResponse.subjectsDetail;
            //this.getKeys(Object);
            //this.subjectprofileLists = this.basicInfo;
                        
            //this.basicInfo
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
    
    //   if(index.length > 0){
    //     this.subjectprofileLists.find(element => {
    //     // var subjectid = element.primaryDetail.uniqueSubjectId;
    //     this.router.navigateByUrl(`/app/anm-viewsubjectprofile?q=${element.primaryDetail.uniqueSubjectId}`);    
    // });
  //}
    
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
