import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { Subscription } from 'rxjs';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-chc-update-sst',
  templateUrl: './chc-update-sst.component.html',
  styleUrls: ['./chc-update-sst.component.css']
})
export class CHCUpdateSSTComponent implements OnInit {
  receivedSampleCount;
  positiveCount = 0;
  negativeCount = 0;
  subscription: Subscription;
  currentPage = "";
  constructor(private DataService:DataService,private router: Router) { }

  ngOnInit() {

    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      
      console.log('previous url', events[0].urlAfterRedirects.indexOf('chc-update-sst'));
      console.log('current url', events[1].urlAfterRedirects);
      console.log('previous url', events[0].urlAfterRedirects);
     if(events[0].urlAfterRedirects.indexOf('chc-update-sst') == -1)
      {
          this.DataService.deleteProp('sstPositive');
          this.DataService.deleteProp('sstNegative');
      }
    });
    this.subscription = this.DataService.receiveData().subscribe(x => { 
      if(JSON.parse(x).screen === "SST")
      {
          this.negativeCount = JSON.parse(x).negativecount;
          this.receivedSampleCount = JSON.parse(x).receivedcount;
          this.positiveCount = JSON.parse(x).positivecount;
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
