import { Component, OnInit } from '@angular/core';
import { SchedulePostPndtcModel } from 'src/app/shared/pndtc/schedule-post-pndtc/schedule-post-pndtc-model';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { SchedulePostPndtcNotificationService } from 'src/app/shared/pndtc/schedule-post-pndtc/schedule-post-pndtc-notification.service';

@Component({
  selector: 'app-schedule-post-pndtc-main',
  templateUrl: './schedule-post-pndtc-main.component.html',
  styleUrls: ['./schedule-post-pndtc-main.component.css']
})
export class SchedulePostPndtcMainComponent implements OnInit {

  SchedulePostPndtcModel: SchedulePostPndtcModel = new SchedulePostPndtcModel();

  schedulingCount: number = 0;
  scheduledCount: number = 0;
  

  constructor(
    private router: Router,
    private schedulenotificationService: SchedulePostPndtcNotificationService,
    private dataservice: DataService
  ) { }

  ngOnInit() {
    this.notificationCount();
  }

  async notificationCount(){
    await this.schedulenotificationService.notificationCount().then((data) => {
      this.SchedulePostPndtcModel = data as SchedulePostPndtcModel;
      this.schedulingCount =  this.SchedulePostPndtcModel.scheduling;
      this.scheduledCount = this.SchedulePostPndtcModel.scheduled;
     
    });
  }

  showNumberOnBadge(componentReference): void{
    console.log(componentReference, componentReference.recordCount);
    if(componentReference.onLoadSubject === undefined) return;
    componentReference.onLoadSubject.subscribe((data) => {
      if(this.router.url.indexOf('scheduled') >= 0){
        this.scheduledCount = data;
      }
      else{
        this.schedulingCount = data;
      }
    });
  }


}
