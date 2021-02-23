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
import { HplcPosBloodsamplesService } from 'src/app/shared/molecularlab-results/hplc-pos-bloodsamples/hplc-pos-bloodsamples.service';
import { TokenService } from 'src/app/shared/token.service';
import { DateService } from 'src/app/shared/utility/date.service';
import { confirmedBloodSamples, HplcPosBloodsamplesConfirmedResponse } from 'src/app/shared/molecularlab-results/hplc-pos-bloodsamples/hplc-pos-bloodsamples-response';

@Component({
  selector: 'app-confirmed-results',
  templateUrl: './confirmed-results.component.html',
  styleUrls: ['./confirmed-results.component.css']
})
export class ConfirmedResultsComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();

  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  user: user;
  confirmSamplesErrorMessage;

  retrieveBloodConfSamplesResponse: HplcPosBloodsamplesConfirmedResponse;
  testedConfirmSamples: confirmedBloodSamples[];

  constructor(
    private confirmSamplesServiceService: HplcPosBloodsamplesService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private dateService: DateService,
    private tokenService: TokenService,
    private _formBuilder: FormBuilder,
    private constantService: ConstantService,
    private loaderService: LoaderService,
    private dataservice: DataService
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "Update Molecular Test Results", "submodule":"HPLC Positive Blood Sample", "page": "Confirmed Results"}));
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

    // this.dateOfShipment = this.dateService.getDate();
    // this.timeOfShipment = this.dateService.getTime();
    console.log(this.confirmSamplesServiceService.retrieveBloodSamplesApi);
    this.updateResultSamples(this.user.molecularLabId);

  }

  updateResultSamples(molecularLabId) {
    this.loaderService.display(true);
    this.testedConfirmSamples = [];
    this.confirmSamplesServiceService.getconfirmbloodSampleList(molecularLabId)
      .subscribe(response => {
        this.retrieveBloodConfSamplesResponse = response;
        this.loaderService.display(false);
        if (this.retrieveBloodConfSamplesResponse !== null && this.retrieveBloodConfSamplesResponse.status === "true") {
          if (this.retrieveBloodConfSamplesResponse.subjects.length <= 0) {
            this.confirmSamplesErrorMessage = response.message;  
          }
          else {
            this.testedConfirmSamples = this.retrieveBloodConfSamplesResponse.subjects;
            // this.unsentSamples.forEach(element => {
            //   element.sampleSelected = true;
            // });
            //this.recordCount = this.unsentSamples.length;

          }
        }
        else {
          this.confirmSamplesErrorMessage = response.message;
        }
        //this.onLoadSubject.emit(this.recordCount);
        this.rerender();
      },
        (err: HttpErrorResponse) => {
          this.confirmSamplesErrorMessage = err.toString();
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
