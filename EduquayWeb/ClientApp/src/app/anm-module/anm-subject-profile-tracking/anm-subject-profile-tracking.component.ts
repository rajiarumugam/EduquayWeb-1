import { Component, OnInit, ViewChild, HostListener, ViewChildren } from '@angular/core';
import { SubjectProfileService } from 'src/app/shared/anm-module/subject-profile/subject-profile.service';
import { AddSubjectprofileRequest, SubjectProfileRequest } from 'src/app/shared/anm-module/subject-profile/subject-profile-request';
import { SubjectProfileResponse, PrimaryDetail, AddressDetail, ParentDetail, PregnancyDetail, ReligionResponse, Religion, GovtIDTypeResponse, GovIdType, CasteResponse, CommunityeResponse, CasteList, CommunityList, RetrieveSubjectProfileList, SubjectProfileList, prePndtCounselling, pndtTesting, postPndtCounselling, mtpService, AddSubjectProfileResponse } from 'src/app/shared/anm-module/subject-profile/subject-profile-response';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatStepper } from '@angular/material/stepper';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { DataService } from 'src/app/shared/data.service';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
import { user } from 'src/app/shared/auth-response';
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { DateService } from 'src/app/shared/utility/date.service';



@Component({
  selector: 'app-anm-subject-profile-tracking',
  templateUrl: './anm-subject-profile-tracking.component.html',
  styleUrls: ['./anm-subject-profile-tracking.component.css']
})
export class AnmSubjectProfileTrackingComponent implements OnInit {

  @ViewChildren('dobPicker') dobPicker;
    
  subjectProfileErrorMessage: string;

  religionResponse: ReligionResponse;
  user: user;
  anmsubjectProfileTrackingResponse;
  anmsubjectSpouseProfileTrackingResponse;
  uniqueSubjectId;

  /*Date Range configuration starts*/
  dateform: FormGroup;
  DAY = 86400000;
  dyCollectionDate: Date = new Date(Date.now());
  userId: number;
  anmSPFromDate: string ="";
  anmSPToDate: string = "";
  
  

  @HostListener('window:scroll')
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    //console.log('[scroll]', scrollPosition);

    if(scrollPosition > 180)
    {
        $('#showhidediv').show();
    }
    else
      $('#showhidediv').hide();
    
  }

  constructor(
    private SubjectProfileService: SubjectProfileService,
    private modalService: NgbModal,
    private httpService: HttpClient,
    private _formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private dataservice: DataService,
    private dateservice: DateService
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "ANM", "submodule": "Subject Profile", "page": "View Subject Profile"}));
    //this.loaderService.display(true);
    this.user = JSON.parse(this.tokenService.getUser('lu'));

    console.log(this.SubjectProfileService.subjectProfileApi);
    this.activatedRoute.queryParams.subscribe(params => {
      this.uniqueSubjectId = params['q'];
      console.log(this.uniqueSubjectId);
      this.anmSubjectProfile(this.uniqueSubjectId,"AW");
    });
  }

  anmSubjectProfile(subjectId,subject) {

    var   _obj = {
      uniqueSubjectId: subjectId
    }
    //this.subjectprofileItem = new SubjectProfileList();
    let subProfile = this.SubjectProfileService.getTrackingANWSubject(_obj)
      .subscribe(response => {
        console.log(response);
        if(subject === "AW")
        {
            this.anmsubjectProfileTrackingResponse = response['data'];
            if(this.anmsubjectProfileTrackingResponse.spouseSubjectId != null)
            {
              this.anmSubjectProfile(this.anmsubjectProfileTrackingResponse.spouseSubjectId,"spouse");
            }
        }  
        else
        {
          this.anmsubjectSpouseProfileTrackingResponse = response['data'];
        }
            
        this.loaderService.display(false);
        
      },
        (err: HttpErrorResponse) => {
          this.subjectProfileErrorMessage = err.toString();
        });

  }
  showResponseMessage(message: string, type: string) {
    var messageType = '';
    if (type === 'e') {
      Swal.fire({ allowOutsideClick: false, icon: 'error', title: message, confirmButtonText: 'Close' })
    }
    else {
      Swal.fire({ allowOutsideClick: false, icon: 'success', title: message, confirmButtonText: 'Close' })
        .then((result) => {
          if (result.value) {
            this.modalService.dismissAll();
            window.location.reload();
          }
        });
    }
  }  

  returnDate(a)
  {
      return (a != "" && a != null)  ? a.split(' ')[0] : "";
  }

  returnTime(a)
  {
    return (a != "" && a != null) ?  a.split(' ')[1] : "";
  }
}
