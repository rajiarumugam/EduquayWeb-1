import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { user } from 'src/app/shared/auth-response';
import { ConstantService } from 'src/app/shared/constant.service';
import { DataService } from 'src/app/shared/data.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { CvsSpecimenEditResponse, editSpecimenSamples } from 'src/app/shared/molecularlab-results/CVS-specimen/cvs-specimen-response';
import { CVSSpecimenService } from 'src/app/shared/molecularlab-results/CVS-specimen/cvs-specimen.service';
import { TokenService } from 'src/app/shared/token.service';
import { DateService } from 'src/app/shared/utility/date.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
declare var $: any 
import { FlatpickrOptions } from 'ng2-flatpickr';
import * as moment from 'moment';
import { ENDPOINT } from 'src/app/app.constant';
import { GenericService } from 'src/app/shared/generic.service';
import { HttpClientService } from 'src/app/shared/http-client.service';
import Swal from 'sweetalert2';
import { HplcPosBloodsamplesService } from 'src/app/shared/molecularlab-results/hplc-pos-bloodsamples/hplc-pos-bloodsamples.service';

@Component({
  selector: 'app-cvs-editresult',
  templateUrl: './cvs-editresult.component.html',
  styleUrls: ['./cvs-editresult.component.css']
})
export class CvsEditresultComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('receivedPicker', { static: false }) receivedPicker;

  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  user: user;
  editSamplesErrorMessage;

  popupData;
  zygositylist;
  mutuationList;
  selecteZygosity = null;
  selectemutuation = null;
  selectedZygosityValue = null;
  showMutation = false;
  mutationText = "Mutation";
  selectedZygosityValueText =  "";
  selectemutuationText = "";
  showMutation2 = false;
  mutation3 = "";
  selectedmutuation2 = null;
  selectedmutuation2Text = "";
  firstFormGroup: FormGroup;
  firstFormCheck = false;
  showZygosity = false;
  showReason = false;
  selectedreasonforClose = "";
  receiveddateOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y',
    defaultDate: "",
    maxDate: new Date(Date.now())
  };
  selectedTestDate;
  firstTimeOpen = false;

  retrieveSpecimenEditSamplesResponse: CvsSpecimenEditResponse;
  testedEditSamples: editSpecimenSamples[];

  constructor(
    private editSamplesService: CVSSpecimenService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private dateService: DateService,
    private tokenService: TokenService,
    private _formBuilder: FormBuilder,
    private constantService: ConstantService,
    private loaderService: LoaderService,
    private dataservice: DataService,
    private genericService: GenericService,
    private httpClientService:HttpClientService,
    private updateSamplesServiceService: HplcPosBloodsamplesService,
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "Update Molecular Test Results", "submodule":"CVS Specimen", "page": "Edit Result"}));
    this.user = JSON.parse(this.tokenService.getUser('lu'));
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
        //Search: '<a class="btn searchBtn" id="searchBtn"><i class="fa fa-search"></i></a>'
      }
    };

    this.firstFormGroup = this._formBuilder.group({
      zygosity:[''],
      maritalStatus:['true'],
      reasonforClose:[""],
      mutation1: [""],
      mutation2:[""],
      mutation3:[""],
      testDate:[""]
      
   });
    // this.dateOfShipment = this.dateService.getDate();
    // this.timeOfShipment = this.dateService.getTime();
    console.log(this.editSamplesService.retrieveSpecimenSampleseditApi);
    this.editResultSamples(this.user.molecularLabId);

    this.getZygosityList();
    this.getAllMutuationList();

  }

  getZygosityList(){
    this.updateSamplesServiceService.retrieveAllZygositylist()
      .subscribe(response => { 

        console.log(response);
        this.zygositylist = response.data;
      },
        (err: HttpErrorResponse) => {
          this.editSamplesErrorMessage = err.toString();
        });

  }
  getAllMutuationList(){
    this.updateSamplesServiceService.retrieveAllMutuationList()
      .subscribe(response => { 

        console.log(response);
        this.mutuationList = response.data;
      },
        (err: HttpErrorResponse) => {
          this.editSamplesErrorMessage = err.toString();
        });

  }
  showPopup(data)
  {
      console.log(data);
      this.popupData = data;
      if(this.popupData.sampleDamaged)
      {
        this.showZygosity = true;
        //this.showReason = false;
      }
      else
      {
        this.showZygosity = true;
        //this.showReason = true;
      }
      this.receivedPicker.flatpickr.setDate(this.popupData.testDate);
      this.selectedTestDate = this.popupData.testDate;
      this.firstTimeOpen = true;
      this.selectedZygosityValue =this.popupData.zygosityId;
      this.selectemutuation = this.popupData.mutation1Id;
      
      $('#fadeinModal').modal('show');
  }
  zygosityChange(val)
  {
    console.log(val);
    //this.selectedZygosityValue = null;
    this.selectemutuation = null;
    this.selectemutuationText = "";
    this.selectedmutuation2Text = "";
    this.selectemutuation = null;
    this.selectedmutuation2 = null;
    //this.selectedZygosityValueText = "Suresh";
    
  this.zygositylist.forEach(element => {
    if(element.id == val)
    {
      this.selectedZygosityValueText = element.name;
    }

    if(this.popupData.mutation1Id != 0 && this.firstTimeOpen)
    {
      this.selectemutuation = ""+this.popupData.mutation1Id;
      //this.popupData.mutation1Id = 0;
    }
    if(this.popupData.mutation2Id != 0 && this.firstTimeOpen)
    {
      this.selectedmutuation2 = ""+this.popupData.mutation2Id;
      //this.popupData.mutation2Id = 0;
    }
    if(this.popupData.mutation3 != null && this.firstTimeOpen)
    {
      this.mutation3 = ""+this.popupData.mutation3;
      //this.popupData.mutation3 = null;
    }
    this.firstTimeOpen = false;
  });
    if(val == 1 || val == 2)
    {
      this.showMutation = true;
      this.showMutation2 = false;
      this.mutationText = "Mutation";
    }
    if(val == 3)
    {
      this.showMutation = true;
      this.showMutation2 = true;
      this.mutationText = "Mutation 1";
    }
    if(val == 4)
    {
      this.showMutation = false;
      this.showMutation2 = false;
      this.mutationText = "Mutation 1";
      this.mutation3 = "";
    }
  }
  mutationChange(val)
  {
    this.mutuationList.forEach(element => {
      if(element.id == val)
      {
        this.selectemutuationText = element.name;
      }
    });
      
  }
  mutationChange1(val)
  {
    this.mutuationList.forEach(element => {
      if(element.id == val)
      {
        this.selectedmutuation2Text = element.name;
      }
    });
      
  }

  sampleSubmit(index)
  {

    var _msg = "Confirm Update Molecular Test Results";
    if(index === 1)
    {
      _msg =  "";
    }
    if(index === 2)
    {
      _msg = "Confirm Update Molecular Test Results";
    }
    this.firstFormCheck = true;

    var _testResult = this.selectedZygosityValueText;
    if(this.selectemutuation != null)
    {
      _testResult += "for "+this.selectemutuationText;
    }
    if(this.selectedmutuation2 != null)
    {
      _testResult += "and "+this.selectedmutuation2Text;
    }
    var _obj = {};
    if(this.firstFormGroup.controls.maritalStatus.value === "true")
    {
      if(this.firstFormGroup.controls.testDate.value != undefined && this.firstFormGroup.valid && this.firstFormGroup.controls.zygosity.value != null) 
      {
        _obj['uniqueSubjectId'] = this.popupData.uniqueSubjectId;
        _obj['pndtFoetusId'] = this.popupData.pndtFoetusId;
        _obj['zygosityId'] = Number(this.firstFormGroup.controls.zygosity.value);
        _obj['mutation1Id'] = Number(this.selectemutuation);
        _obj['mutation2Id'] = this.selectedmutuation2 ? Number(this.selectedmutuation2) : 0;
        _obj['mutation3'] = this.mutation3 != undefined ? this.mutation3 : "";
        _obj['testResult'] = _testResult ;
        _obj['sampleDamaged'] = this.popupData.sampleDamaged;
        _obj['sampleProcessed'] =  this.firstFormGroup.controls.maritalStatus.value === "true" ? true : false;
        _obj['completeStatus'] = index == '1' ? false : true;
        _obj['reasonForClose'] = this.selectedreasonforClose != undefined ? this.selectedreasonforClose : "";
        _obj['testDate'] = moment(new Date(this.firstFormGroup.controls.testDate.value)).format("DD/MM/YYYY");
        _obj['userId'] = this.user.id;
        _obj['molecularLabId'] = this.user.molecularLabId;
        console.log(_obj);
        Swal.fire({
          title: 'Are you sure?',
          text: _msg,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#ffffff', allowOutsideClick: false
        }).then((result) => {
          
              this.submitData(_obj);
          })
      }
      
    }
    else
    {
      if(this.firstFormGroup.controls.testDate.value != undefined && this.firstFormGroup.valid)
      {
        _obj['uniqueSubjectId'] = this.popupData.uniqueSubjectId;
        _obj['pndtFoetusId'] = this.popupData.pndtFoetusId;
        _obj['zygosityId'] = Number(this.selectedZygosityValue);
        _obj['mutation1Id'] = Number(this.selectemutuation);
        _obj['mutation2Id'] = this.selectedmutuation2 ? Number(this.selectedmutuation2) : 0;
        _obj['mutation3'] = this.mutation3 != undefined ? this.mutation3 : "";
        _obj['testResult'] = _testResult ;
        _obj['sampleDamaged'] = this.popupData.sampleDamaged;
        _obj['sampleProcessed'] =  this.firstFormGroup.controls.maritalStatus.value === "true" ? true : false;
        _obj['completeStatus'] = index == '1' ? false : true;
        _obj['reasonForClose'] = this.selectedreasonforClose != undefined ? this.selectedreasonforClose : "";
        _obj['testDate'] = moment(new Date(this.firstFormGroup.controls.testDate.value)).format("DD/MM/YYYY");
        _obj['userId'] = this.user.id;
        _obj['molecularLabId'] = this.user.molecularLabId;
        console.log(_obj);
        Swal.fire({
          title: 'Are you sure?',
          text: _msg,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#ffffff', allowOutsideClick: false
        }).then((result) => {
          
              this.submitData(_obj);
          })
      }
    }
    
  }
  submitData(obj)
  {
      console.log(obj);
      var apiUrl = this.genericService.buildApiUrl(ENDPOINT.SUBJECT.ADDMOLECULARSPECIMENTESTRESULT);
      this.httpClientService.post<any>({url:apiUrl, body: obj }).subscribe(response => {
       console.log(response);
if(response.status == "true")
{
      Swal.fire({icon:'success', title: response.message,
      showCancelButton: false, cancelButtonText: 'Ok', allowOutsideClick: false })
    .then((result) => {
    if (result.value) {
      $('#fadeinModal').modal('hide');
      this.firstFormCheck = false;
      this.firstFormGroup.reset();
      //this.getpositiveSubjectList(this.user.id);
      this.editResultSamples(this.user.molecularLabId);
      if(this.modalService.hasOpenModals){
        this.modalService.dismissAll();
      }
    // this.router.navigateByUrl("app/anm-sample-collection");
    
    }
    })
}
});     
  }
  sampleDamagedChange(val)
  {
    this.firstFormCheck = false;
    console.log(val);
    if(val)
      {
        this.showZygosity = true;
        this.showReason = false;
      }
      else
      {
        this.showZygosity = false;
        this.showReason = true;
        this.showMutation = false;
        this.showMutation2 = false;
      }
  }
  editResultSamples(molecularLabId) {
    this.loaderService.display(true);
    this.testedEditSamples = [];
    this.editSamplesService.geteditspecimenSampleList(molecularLabId)
      .subscribe(response => {
        this.retrieveSpecimenEditSamplesResponse = response;
        this.loaderService.display(false);
        if (this.retrieveSpecimenEditSamplesResponse !== null && this.retrieveSpecimenEditSamplesResponse.status === "true") {
          if (this.retrieveSpecimenEditSamplesResponse.subjects.length <= 0) {
            this.editSamplesErrorMessage = response.message;  
          }
          else {
            this.testedEditSamples = this.retrieveSpecimenEditSamplesResponse.subjects;
            // this.unsentSamples.forEach(element => {
            //   element.sampleSelected = true;
            // });
            //this.recordCount = this.unsentSamples.length;

          }
        }
        else {
          this.editSamplesErrorMessage = response.message;
        }
        //this.onLoadSubject.emit(this.recordCount);
        this.rerender();
      },
        (err: HttpErrorResponse) => {
          this.editSamplesErrorMessage = err.toString();
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

