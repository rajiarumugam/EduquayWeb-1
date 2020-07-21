import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../shared/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chc-update-cbc',
  templateUrl: './chc-update-cbc.component.html',
  styleUrls: ['./chc-update-cbc.component.css']
})
export class CHCUpdateCBCComponent implements OnInit {
  receivedSampleCount;
  uploadCBCCount = 0;
  subscription: Subscription;
  currentPage = "";
  constructor(private DataService:DataService,private router: Router) { }

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
