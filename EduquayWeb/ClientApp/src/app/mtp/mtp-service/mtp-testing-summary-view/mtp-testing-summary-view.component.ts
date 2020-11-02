import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mtp-testing-summary-view',
  templateUrl: './mtp-testing-summary-view.component.html',
  styleUrls: ['./mtp-testing-summary-view.component.css']
})
export class MtpSummaryViewComponent implements OnInit {
  constructor(private DataService:DataService,private router: Router) { }

  pndSummarydata;
  ngOnInit() {

    this.DataService.sendData(JSON.stringify({"module": "MTP services Obstetrician", "submodule": "MTP Summary Report"}));
    if(this.DataService.getdata().mtptestingSummary === undefined)
    {
      this.router.navigate(['/app/mtp-summary']);
    }
    this.pndSummarydata = this.DataService.getdata().mtptestingSummary;

  }

}
