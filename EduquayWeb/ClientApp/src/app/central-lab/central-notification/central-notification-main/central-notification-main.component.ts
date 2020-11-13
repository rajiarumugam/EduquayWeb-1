import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { Subscription } from 'rxjs';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { TokenService } from 'src/app/shared/token.service';
import { GenericService } from 'src/app/shared/generic.service';
import { ENDPOINT } from 'src/app/app.constant';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-central-notification-main',
  templateUrl: './central-notification-main.component.html',
  styleUrls: ['./central-notification-main.component.css']
})
export class CentralNotificationMainComponent implements OnInit {
  receivedSampleCount;
  positiveCount = 0;
  negativeCount = 0;
  CBCCount = 0;
  SSTCount = 0;
  pickandPackCount = 0;
  subscription: Subscription;
  currentPage = "";
  constructor(private DataService:DataService,private router: Router,private tokenService: TokenService,private genericService: GenericService,private httpClient: HttpClientService) { }

  ngOnInit() {

    this.refreshData();
    this.DataService.sendData(JSON.stringify({"module": "Central Lab", "page": "Notification"}));
    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
     if(events[0].urlAfterRedirects.indexOf('chc-update-sst') == -1)
      {
          this.DataService.deleteProp('sstPositive');
          this.DataService.deleteProp('sstNegative');
      }
    });
    this.subscription = this.DataService.receiveData().subscribe(x => { 
      this.refreshData();
    });
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
  }
  refreshData()
  {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.RETRIVECENTRALLABRECEIPT+user.centralLabId);
    this.httpClient.get<any>( {url:apiUrl}).subscribe(response => {
      console.log(response);
      this.receivedSampleCount = response.centralLabReceipts.length;
    },
    (err: HttpErrorResponse) =>{
      console.log(err);
    });

    var apiUrl1 = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.RETRIVEHPLCTEST+user.centralLabId);
    this.httpClient.get<any>( {url:apiUrl1}).subscribe(response => {
      this.CBCCount = response.hplcDetail.length;
    },
    (err: HttpErrorResponse) =>{
      console.log(err);
    });

    let apiUrl4 = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.RETRIVEPICKANDPACK+user.centralLabId);
    this.httpClient.get<any>({url: apiUrl4 }).subscribe(response => {
      this.pickandPackCount = response.pickandPack.length;
    },
    (err: HttpErrorResponse) =>{
      console.log(err);
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
