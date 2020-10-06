import { Component, OnInit } from '@angular/core';
import { SchedulePostPndtcModel } from 'src/app/shared/pndtc/schedule-post-pndtc/schedule-post-pndtc-model';
import { Router, RoutesRecognized } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { SchedulePostPndtcNotificationService } from 'src/app/shared/pndtc/schedule-post-pndtc/schedule-post-pndtc-notification.service';
import { Subscription } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-schedule-post-pndtc-main',
  templateUrl: './schedule-post-pndtc-main.component.html',
  styleUrls: ['./schedule-post-pndtc-main.component.css']
})
export class SchedulePostPndtcMainComponent implements OnInit {

  SchedulePostPndtcModel: SchedulePostPndtcModel = new SchedulePostPndtcModel();

  schedulingCount: number = 0;
  scheduledCount: number = 0;
  currentPage = "";
  subscription: Subscription;

  constructor(
    private router: Router,
    private schedulenotificationService: SchedulePostPndtcNotificationService,
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
      if(JSON.parse(x).screen === "PostScheduling")
      {
        this.schedulingCount = JSON.parse(x).schedulingCount;
        this.scheduledCount = JSON.parse(x).scheduledCount;
       
      }
      
    });
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
   // this.notificationCount();
  }

  // async notificationCount(){
  //   await this.schedulenotificationService.notificationCount().then((data) => {
  //     this.SchedulePostPndtcModel = data as SchedulePostPndtcModel;
  //     this.schedulingCount =  this.SchedulePostPndtcModel.scheduling;
  //     this.scheduledCount = this.SchedulePostPndtcModel.scheduled;
     
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
