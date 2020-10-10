import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { Subscription } from 'rxjs';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-HPLC-update-new',
  templateUrl: './HPLC-update-new.component.html',
  styleUrls: ['./HPLC-update-new.component.css']
})
export class HPLCUpdateNewComponent implements OnInit {
  receivedSampleCount;
  uploadCBCCount = 0;
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
      if(events[0].urlAfterRedirects.indexOf('chc-update-cbc') == -1)
      {
          this.DataService.deleteProp('cbcuploaddata');
      }
    });
    this.subscription = this.DataService.receiveData().subscribe(x => { 
      if(JSON.parse(x).screen === "CBC")
      {
          if(JSON.parse(x).page === "upload")
          {
            this.uploadCBCCount = JSON.parse(x).uploadcount;
            this.receivedSampleCount = JSON.parse(x).receivedcount;
          }
              
          if(JSON.parse(x).page === "received")
              this.receivedSampleCount = JSON.parse(x).receivedcount;
      }
      
    });

    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    this.DataService.sendData(JSON.stringify({"module": "CHC- SAMPLE REC & PROCESS", "page": "Update CBC Results"}));
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
