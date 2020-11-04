import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { Router } from '@angular/router';
declare var $: any 

@Component({
  selector: 'app-pnd-testing-summary-view',
  templateUrl: './pnd-testing-summary-view.component.html',
  styleUrls: ['./pnd-testing-summary-view.component.css']
})
export class PndSummaryViewComponent implements OnInit {
  constructor(private DataService:DataService,private router: Router) { }

  pndSummarydata;
  showPrintBtn = true;
  ngOnInit() {

    this.DataService.sendData(JSON.stringify({"module": "PNDTC Obstetrician", "submodule": "PND Summary Report"}));
    if(this.DataService.getdata().pndtestingSummary === undefined)
    {
      this.router.navigate(['/app/pndtc-summary']);
    }
    this.pndSummarydata = this.DataService.getdata().pndtestingSummary;

  }

  printPdf()
  {
    window.print();
  }
}
