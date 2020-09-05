import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pnd-testing-summary-view',
  templateUrl: './pnd-testing-summary-view.component.html',
  styleUrls: ['./pnd-testing-summary-view.component.css']
})
export class PndSummaryViewComponent implements OnInit {
  constructor(private DataService:DataService,private router: Router) { }

  pndSummarydata;
  ngOnInit() {

    if(this.DataService.getdata().pndtestingSummary === undefined)
    {
      this.router.navigate(['/app/pndtc-summary']);
    }
    this.pndSummarydata = this.DataService.getdata().pndtestingSummary;

  }

}
