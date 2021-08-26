import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { Subscription } from 'rxjs';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-upload-main',
  templateUrl: './upload-main.component.html',
  styleUrls: ['./upload-main.component.css']
})
export class UploadMainComponent implements OnInit {
  pendingPickupCount = 0;
  startPickCount = 0;
  subscription: Subscription;
  currentPage = "";
  constructor(private DataService:DataService,private router: Router) { }

  ngOnInit() {

    //this.dataservice.sendData(JSON.stringify({"module": "Central Lab", "page": "Pick & Pack"}));

    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      
      console.log('previous url', events[0].urlAfterRedirects.indexOf('central-pickpack'));
      console.log('current url', events[1].urlAfterRedirects);
      console.log('previous url', events[0].urlAfterRedirects);
     if(events[0].urlAfterRedirects.indexOf('central-pickpack') == -1)
      {
          this.DataService.deleteProp('centralPickPack');
      }
    });
    this.subscription = this.DataService.receiveData().subscribe(x => { 
      if(JSON.parse(x).screen === "errorBarcode")
      {
          this.pendingPickupCount = JSON.parse(x).pendingcount;
          this.startPickCount = JSON.parse(x).startpickCount;
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
