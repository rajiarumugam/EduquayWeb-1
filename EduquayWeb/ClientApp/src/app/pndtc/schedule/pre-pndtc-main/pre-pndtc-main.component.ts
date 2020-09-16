import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  

  constructor(
    private router: Router,
    private schedulenotificationService: ScheduleNoificationServiceService,
    private dataservice: DataService
  ) { }

  ngOnInit() {
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    this.notificationCount();
  }

  async notificationCount(){
    await this.schedulenotificationService.notificationCount().then((data) => {
      this.schedulenotificationModel = data as ScheduleNotificationModel;
      this.schedulingCount =  this.schedulenotificationModel.scheduling;
      this.scheduledCount = this.schedulenotificationModel.scheduled;
     
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
