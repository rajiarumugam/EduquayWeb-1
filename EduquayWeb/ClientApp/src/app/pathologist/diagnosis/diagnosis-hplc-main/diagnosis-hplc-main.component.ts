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
  editCount = 0;
  pathoCount = 0;
  constructor(private DataService:DataService,private router: Router) {

   
   }

  ngOnInit() {

    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
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
        this.editCount = JSON.parse(x).editcount;
        this.pathoCount= JSON.parse(x).pathocount;
        
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
