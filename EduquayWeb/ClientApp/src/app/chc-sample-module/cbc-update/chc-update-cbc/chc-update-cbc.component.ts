import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../shared/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chc-update-cbc',
  templateUrl: './chc-update-cbc.component.html',
  styleUrls: ['./chc-update-cbc.component.css']
})
export class CHCUpdateCBCComponent implements OnInit {
  receivedSampleCount;
  uploadCBCCount = 0;
  subscription: Subscription;
  constructor(private DataService:DataService) { }

  ngOnInit() {
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
