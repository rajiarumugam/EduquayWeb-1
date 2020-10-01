import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';
import { DataService } from 'src/app/shared/data.service';
import { ScheduleNoificationServiceService } from 'src/app/shared/pndtc/schedule-pre-pndtc/schedule-noification-service.service';
import { ScheduleNotificationModel } from 'src/app/shared/pndtc/schedule-pre-pndtc/schedule-notification-model';

@Component({
  selector: 'app-pre-pndtc-main',
  templateUrl: './pre-pndtc-main.component.html',
  styleUrls: ['./pre-pndtc-main.component.css']
})
export class PrePndtcMainComponent implements OnInit {

  schedulenotificationModel: ScheduleNotificationModel = new ScheduleNotificationModel();

  schedulingCount: number = 0;
  scheduledCount: number = 0;
  currentPage = "";
  subscription: Subscription;
  

  constructor(
    private router: Router,
    private schedulenotificationService: ScheduleNoificationServiceService,
    private DataService: DataService
  ) { }

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
      if(JSON.parse(x).screen === "PreScheduling")
      {
        this.schedulingCount = JSON.parse(x).schedulingCount;
        this.scheduledCount = JSON.parse(x).scheduledCount;
       
      }
      
    });
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    //this.notificationCount();
  }

  // async notificationCount(){
  //   await this.schedulenotificationService.notificationCount().then((data) => {
  //     this.schedulenotificationModel = data as ScheduleNotificationModel;
  //     this.schedulingCount =  this.schedulenotificationModel.scheduling;
  //     this.scheduledCount = this.schedulenotificationModel.scheduled;
     
  //   });
  // }

  // showNumberOnBadge(componentReference): void{
  //   console.log(componentReference, componentReference.recordCount);
  //   if(componentReference.onLoadSubject === undefined) return;
  //   componentReference.onLoadSubject.subscribe((data) => {
  //     if(this.router.url.indexOf('scheduled') >= 0){
  //       this.scheduledCount = data;
  //     }
  //     else{
  //       this.schedulingCount = data;
  //     }
  //   });
  // }

  receivedSamples(event)
  {
    console.log(event);
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
