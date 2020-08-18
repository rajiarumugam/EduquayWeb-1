import { Component, OnInit } from '@angular/core';
import { DamagedSamplesService } from 'src/app/shared/anm-module/notifications/damaged-samples/damaged-samples.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/anm-module/notifications/notification.service';
import { NotificationModel } from 'src/app/shared/anm-module/notifications/notification.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-anm-notification',
  templateUrl: './anm-notification.component.html',
  styleUrls: ['./anm-notification.component.css']
})
export class AnmNotificationComponent implements OnInit {
  //Parent component

  notificationModel: NotificationModel = new NotificationModel();

  damagedSample: number = 0;
  unsentSample: number = 0;
  timeoutSample: number = 0;
  positiveSample: number = 0;
  pndReferralSample: number = 0;
  mtpReferralSample: number = 0;
  updateChcSample: number = 0;
  postmtpfollowup: number = 0;
  //Sample: number;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private dataservice: DataService
  ) { }

  ngOnInit() {
    this.dataservice.sendData(JSON.stringify({"module": "ANM", "submodule":"Notification"}));
    this.notificationCount();
  }

  async notificationCount(){
    await this.notificationService.notificationCount().then((data) => {
      this.notificationModel = data as NotificationModel;
      this.damagedSample =  this.notificationModel.damaged;
      this.unsentSample = this.notificationModel.unsent;
      this.timeoutSample = this.notificationModel.timeout;
      this.positiveSample = this.notificationModel.positive;
      this.pndReferralSample = this.notificationModel.pndreferral;
      this.mtpReferralSample = this.notificationModel.mtpreferral;
      this.updateChcSample = this.notificationModel.chcupdate;
      this.postmtpfollowup = this.notificationModel.postmtp;
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
      else if(this.router.url.indexOf('pndreferral') >= 0){
        this.pndReferralSample = data;
      }
      else if(this.router.url.indexOf('mtpreferral') >= 0){
        this.mtpReferralSample = data;
      }
      else if(this.router.url.indexOf('updatechc') >= 0){
        this.updateChcSample = data;
      }
      else if(this.router.url.indexOf('postmtp') >= 0){
        this.postmtpfollowup = data;
      }
      else{
        this.damagedSample = data;
      }
    });
  }

  getSubjectCount(){
    
  }
}
