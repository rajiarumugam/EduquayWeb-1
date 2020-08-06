import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { Subscription } from 'rxjs';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-diagnosis-hplc-main',
  templateUrl: './diagnosis-hplc-main.component.html',
  styleUrls: ['./diagnosis-hplc-main.component.css']
})
export class DiagosisHPLCmainComponent implements OnInit {
  abnormalCount=0;
  normalCount = 0;
  subscription: Subscription;
  currentPage = "";
  constructor(private DataService:DataService,private router: Router) {

   
   }

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
      if(JSON.parse(x).screen === "PATHOLOGIST")
      {
        this.abnormalCount = JSON.parse(x).abnormalcount;
        this.normalCount = JSON.parse(x).normalcount;
      }
      
    });

    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
  }

  receivedSamples(event)
  {
    console.log(event);
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
