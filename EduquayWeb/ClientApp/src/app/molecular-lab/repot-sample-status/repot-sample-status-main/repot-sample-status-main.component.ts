import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../shared/data.service';
import { Subscription } from 'rxjs';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-repot-sample-status-main',
  templateUrl: './repot-sample-status-main.component.html',
  styleUrls: ['./repot-sample-status-main.component.css']
})
export class ReportSampleStatusMainComponent implements OnInit {
  subscription: Subscription;
  currentPage = "";
  pendingCount=0;
  notcompleteCount = 0;

  constructor(private DataService:DataService,private router: Router) { }

  ngOnInit() {
    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      
      //console.log('previous url', events[0].urlAfterRedirects.indexOf('chc-update-cbc'));
      //console.log('current url', events[1].urlAfterRedirects);
      if(events[0].urlAfterRedirects.indexOf('central-update-hplc') == -1)
      {
          this.DataService.deleteProp('centraluploaddata');
      }
    });
    this.subscription = this.DataService.receiveData().subscribe(x => { 
      if(JSON.parse(x).screen === "PNDTCTESTING")
      {
        this.pendingCount = JSON.parse(x).pendingCount;
        this.notcompleteCount = JSON.parse(x).notcompleteCount;
       
      }
      
    });

    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
  }

}
