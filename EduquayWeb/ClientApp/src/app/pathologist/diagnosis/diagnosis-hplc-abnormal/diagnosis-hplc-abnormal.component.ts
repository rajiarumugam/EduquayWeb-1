import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

import { DataService } from '../../../shared/data.service';

import { pathoHPLCService } from "./../../../shared/pathologist/patho-hplc.service";
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-diagnosis-hplc-abnormal',
  templateUrl: './diagnosis-hplc-abnormal.component.html',
  styleUrls: ['./diagnosis-hplc-abnormal.component.css']
})
export class DiagnosisHPLCAbnormaComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;
  errorMessage: string;
  errorSpouseMessage: string;

  centralReceiptsData: any[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  currentPage;
  constructor(
    zone: NgZone,
    private route: ActivatedRoute,
    private DataService:DataService,
    private router: Router,
    private pathoHPLCService:pathoHPLCService
    ) { }

  ngOnInit() {
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
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    this.centralReceiptsData = [];
    var centralReceiptsArr = this.route.snapshot.data.positiveSubjects;
    if(centralReceiptsArr !== undefined && centralReceiptsArr.status.toString() === "true"){
      var _tempData = centralReceiptsArr.subjectDetails;
      var tempNormalArray;
      var tempAbnormalArray;
      console.log(_tempData);
        tempAbnormalArray = _tempData.filter(function(item) {
          return !item.isNormal;
        });
        
        tempNormalArray = _tempData.filter(function(item) {
          return item.isNormal;
        });
        /*this.DataService.sendData(JSON.stringify({'screen':'PATHOLOGIST','page':"received","normalcount":tempNormalArray.length,"abnormalcount":tempAbnormalArray.length, "module": "Pathologist - HPLC", "pagealter": "Diagnostic - HPLC"}));*/
        console.log(tempNormalArray);

      if(this.currentPage === "abnormal")
        this.centralReceiptsData = tempAbnormalArray;
      else
        this.centralReceiptsData = tempNormalArray;

        console.log(this.centralReceiptsData);
        this.pathoHPLCService.retriveEditHPLCDiagnosis()
        .subscribe(response => {
          console.log(response);
          var _editArray  = response.subjectDetails;
          this.DataService.sendData(JSON.stringify({'screen':'PATHOLOGIST','page':"received","normalcount":tempNormalArray.length,"abnormalcount":tempAbnormalArray.length,"editcount":_editArray.length, "module": "Pathologist - HPLC", "pagealter": "Diagnostic - HPLC"}));
        console.log(tempNormalArray);

         
        },
        (err: HttpErrorResponse) => {
          //this.showResponseMessage(err.toString(), 'e');
        });
    }
    else{
      this.errorMessage = centralReceiptsArr.message;
    }

  }

  openReportComponent(data)
  {
    console.log(data);
    this.DataService.setdata({'diagnosisHPLC':data});
    this.router.navigate(['/app/pathologist-hplc-report']);
  }
  //returncompareDate(date1,date2)
  returncompareDate(date1)
  {
        var startDate = moment(date1, "DD/MM/YYYY");
        var endDate = moment(moment(), "DD-MM-YYYY");
        var result = endDate.diff(startDate, 'days');
        //console.log(result > 7);
        /*return result > 7;*/
        return result > 7;
    }
    
    ngAfterViewInit(): void {
      this.dtTrigger.next();
    }   
  
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
}
