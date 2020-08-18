import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { user } from 'src/app/shared/auth-response';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { TokenService } from 'src/app/shared/token.service';
import { DateService } from 'src/app/shared/utility/date.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { ChcNotificationSamplesRequest, AddChcSampleRecollectionRequest } from 'src/app/shared/chc-module/chc-notification-samples/chc-notification-samples-request';
import { ChcNotificationSamplesResponse, AddChcSampleRecollectionResponse, ChcNotifiedSampleList } from 'src/app/shared/chc-module/chc-notification-samples/chc-notification-samples-response';
import { ChcNotificationSamplesService } from 'src/app/shared/chc-module/chc-notification-samples/chc-notification-samples.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-chc-timeout-samples',
  templateUrl: './chc-timeout-samples.component.html',
  styleUrls: ['./chc-timeout-samples.component.css']
})
export class ChcTimeoutSamplesComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @Output() onLoadSubject: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('collectionDatePicker', { static: false }) collectionDatePicker;

  loadDataTable: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  user: user;

  chctimeoutSamplesErrorMessage: string;
  chctimeoutSamplesInitResponse: any;
  chctimeoutsamplesRequest: ChcNotificationSamplesRequest;
  chctimeoutsamplesResponse: ChcNotificationSamplesResponse;
  chcaddtimeoutSampleRecollectionRequest: AddChcSampleRecollectionRequest;
  chcaddtimeoutSampleRecollectionResponse: AddChcSampleRecollectionResponse;

  recordCount: number;
  result: string;
  chctimeoutSamples: ChcNotifiedSampleList[] = [];
  subjectName: string;
  uniqueSubjectId: string;
  rchId: string;
  reason: string;
  barcodeNo: string;
  collectionDate: string;
  collectionTime: string;
  notifySamples: string;
  sampleCollectionDate: string;
  sampleCollectionTime: string;
  popupform: FormGroup;
  DAY = 86400000;

  collectionDateOptions: FlatpickrOptions = {
    mode: 'single',
    dateFormat: 'd/m/Y H:i',
    defaultDate: new Date(Date.now()),
    // minDate: this.dyCollectionDate,
    maxDate: new Date(Date.now()),
    enableTime: true,

  };

  constructor(

    private ChctimeoutSamplesService: ChcNotificationSamplesService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private dateService: DateService,
    private tokenService: TokenService,
    private _formBuilder: FormBuilder,
    private dataservice: DataService

  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "CHC", "submodule": "Notification", "page": "Sample Timeout"}));
    this.recordCount = 0;
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.InitializeDateRange();
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
    console.log(this.ChctimeoutSamplesService.notificationSamplesApi);
    //this.chctimeoutSampleslist();

    this.chctimeoutSamplesInitResponse = this.route.snapshot.data.chctimeoutSamplesData;
    if (this.chctimeoutSamplesInitResponse.status === 'false') {
      this.chctimeoutSamples = [];
      if (this.chctimeoutSamplesInitResponse.message !== null && this.chctimeoutSamplesInitResponse.message.code === "ENOTFOUND") {
        this.chctimeoutSamplesErrorMessage = "Unable to connect to api source";
      }
      else if (this.chctimeoutSamplesInitResponse.message !== null || this.chctimeoutSamplesInitResponse.message == undefined) {
        this.chctimeoutSamplesErrorMessage = this.chctimeoutSamplesInitResponse.message;
      }
    }
    else {

      if (this.chctimeoutSamplesInitResponse.sampleList!= null && this.chctimeoutSamplesInitResponse.sampleList.length > 0) {
        this.chctimeoutSamples = this.chctimeoutSamplesInitResponse.sampleList;
      }
    }

  }

  chctimeoutSampleslist() {

    this.recordCount = 0;
    this.chctimeoutSamples = [];
    this.chctimeoutSamplesErrorMessage = '';
    this.chctimeoutsamplesRequest = { userId: this.user.id, notification: 3, collectionFrom: this.user.sampleCollectionFrom };
    let samplesList = this.ChctimeoutSamplesService.getnotificationChcSamples(this.chctimeoutsamplesRequest)
      .subscribe(response => {
        this.chctimeoutsamplesResponse = response;
        if (this.chctimeoutsamplesResponse !== null && this.chctimeoutsamplesResponse.status === "true") {
          if (this.chctimeoutsamplesResponse.sampleList.length <= 0) {
            this.chctimeoutSamplesErrorMessage = response.message;
          }
          else {
            this.chctimeoutSamples = this.chctimeoutsamplesResponse.sampleList;
            this.recordCount = this.chctimeoutSamples.length;
          }
        }
        else {
          this.chctimeoutSamplesErrorMessage = response.message;
        }
        this.onLoadSubject.emit(this.recordCount);
        this.rerender();
        this.loadDataTable = true;
      },
        (err: HttpErrorResponse) => {
          if (this.loadDataTable) this.rerender();
          this.chctimeoutSamplesErrorMessage = err.toString();
        });
  }

  openchctimeoutSamples(chctimeoutSamplesDetail, chcsample: ChcNotifiedSampleList) {

    this.subjectName = chcsample.subjectName;
    this.uniqueSubjectId = chcsample.uniqueSubjectId;
    this.rchId = chcsample.rchId;
    this.reason = chcsample.reason;
    this.sampleCollectionDate = moment().format("DD/MM/YYYY");
    this.sampleCollectionTime = moment().format("HH:mm");
    this.collectionDateOptions.defaultDate = moment().format("DD/MM/YYYY HH:mm");
    this.collectionDateOptions.maxDate = moment().format("DD/MM/YYYY HH:mm");

    //var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    var pattern = /(\d{2})\/(\d{2})\/(\d{4})\ (\d{2})\:(\d{2})/;
    const regDate = new Date(chcsample.sampleCollectionDateTime.replace(pattern, '$3/$2/$1 $4:$5'));
    this.collectionDateOptions.minDate = regDate;

    this.modalService.open(
      chctimeoutSamplesDetail, {
      centered: true,
      size: 'xl',
      scrollable: true,
      backdrop:'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title'
    });

  }

  onSubmit(chctimeoutSamplesForm: NgForm) {

    console.log(chctimeoutSamplesForm.value);
    this.barcodeNo = chctimeoutSamplesForm.value.sampleBarcode;
    this.chcaddtimeoutSampleRecollectionRequest = {
      uniqueSubjectId: this.uniqueSubjectId,
      reason: this.reason,
      barcodeNo: this.barcodeNo,
      collectionFrom: this.user.sampleCollectionFrom,
      sampleCollectionDate: this.sampleCollectionDate,
      sampleCollectionTime: this.sampleCollectionTime,
      collectedBy: this.user.id,
    };

    //Remove below 2 lines after successfully tested
    // this.showResponseMessage('Successfully registered', 's');
    //return false;

    let timeoutSamples = this.ChctimeoutSamplesService.postAddSample(this.chcaddtimeoutSampleRecollectionRequest)
      .subscribe(response => {
        this.chcaddtimeoutSampleRecollectionResponse = response;
        if (this.chcaddtimeoutSampleRecollectionResponse !== null && this.chcaddtimeoutSampleRecollectionResponse.status === "true") {
          this.showResponseMessage(this.chcaddtimeoutSampleRecollectionResponse.message, 's')
          this.chctimeoutSampleslist();
        } else {
          this.showResponseMessage(this.chcaddtimeoutSampleRecollectionResponse.message, 'e');
          this.chctimeoutSamplesErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.showResponseMessage(err.toString(), 'e');
          this.chctimeoutSamplesErrorMessage = err.toString();
        });
    //swal ("Here's the title!", "...and here's the text!");
  }

  showResponseMessage(message: string, type: string) {
    var messageType = '';
    if (type === 'e') {
      Swal.fire({ icon: 'error', title: message, confirmButtonText: 'Close' })
    }
    else {
      Swal.fire({ icon: 'success', title: message, confirmButtonText: 'Close' })
        .then((result) => {
          if (result.value) {
            if (this.modalService.hasOpenModals) {
              this.modalService.dismissAll();
            }
          }
        });
    }
  }

  fetchBarcodes() {
    this.notifySamples = '';
    var isFirst = true;
    this.chctimeoutSamples.forEach(element => {
      console.log('notifiedStatus :' + element.notifiedStatus);
      if (element.notifiedStatus === "True") {
        if (isFirst) {
          this.notifySamples += element.barcodeNo;
          isFirst = false;
        }
        else {
          this.notifySamples += ',' + element.barcodeNo;
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

  InitializeDateRange() {

    this.popupform = this._formBuilder.group({
      collectionDate: [new Date(moment().add(-1, 'day').format())],
    });

    //Change of sample collection date
    this.popupform.controls.collectionDate.valueChanges.subscribe(changes => {
      console.log('end: ', changes);
      if (!changes[0]) return;
      const selectedDate2 = changes[0].getTime();
      this.sampleCollectionDate = moment(new Date(selectedDate2)).format("DD/MM/YYYY");
      this.sampleCollectionTime = moment(new Date(selectedDate2)).format("HH:mm");
    });

  }



}
