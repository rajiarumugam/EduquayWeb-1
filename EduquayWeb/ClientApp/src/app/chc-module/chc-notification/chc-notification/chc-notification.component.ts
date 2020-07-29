import { Component, OnInit } from '@angular/core';
import { ChcNotification } from 'src/app/shared/chc-module/chc-notification';
import { Router } from '@angular/router';
import { ChcNotificationService } from 'src/app/shared/chc-module/chc-notification.service';

@Component({
  selector: 'app-chc-notification',
  templateUrl: './chc-notification.component.html',
  styleUrls: ['./chc-notification.component.css']
})
export class ChcNotificationComponent implements OnInit {

  notificationModel: ChcNotification = new ChcNotification();

  damagedSample: number = 0;
  unsentSample: number = 0;
  timeoutSample: number = 0;
  positiveSample: number = 0;

  constructor(
    private router: Router,
    private notificationService: ChcNotificationService
  ) { }

  ngOnInit() {
    this.notificationCount();
  }

  async notificationCount(){
    await this.notificationService.notificationCount().then((data) => {
      this.notificationModel = data as ChcNotification;
      this.damagedSample =  this.notificationModel.damaged;
      this.unsentSample = this.notificationModel.unsent;
      this.timeoutSample = this.notificationModel.timeout;
      this.positiveSample = this.notificationModel.positive;
      
    });
  }

  showNumberOnBadge(componentReference): void{
    console.log(componentReference, componentReference.recordCount);
    if(componentReference.onLoadSubject === undefined) return;
    componentReference.onLoadSubject.subscribe((data) => {
      if(this.router.url.indexOf('unsent') >= 0){
        this.unsentSample = data;
      }
      else if(this.router.url.indexOf('timeout') >= 0){
        this.timeoutSample = data;
      }
      else if(this.router.url.indexOf('positive') >= 0){
        this.positiveSample = data;
      }
      else{
        this.damagedSample = data;
      }
    });
  }

  getSubjectCount(){
    
  }

}
