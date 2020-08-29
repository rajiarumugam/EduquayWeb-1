import { Injectable } from '@angular/core';
import { TokenService } from '../../token.service';
import { SchedulePrePndtcService } from './schedule-pre-pndtc.service';
import { user } from '../../auth-response';
import { ScheduleNotificationModel } from './schedule-notification-model';
import { ScheduledPrePndtcResponse, SchedulePrePndtcResponse } from './schedule-pre-pndtc-response';

@Injectable({
  providedIn: 'root'
})
export class ScheduleNoificationServiceService {

  user: user;
  schedulenotificationModel: ScheduleNotificationModel = new ScheduleNotificationModel();

  pndtmtpScheduledResponse: ScheduledPrePndtcResponse;
  schedulingSampleCount: number;

  pndtmtpSchedulingResponse: SchedulePrePndtcResponse;
  scheduledSampleCount: number;

  constructor(
    private tokenService: TokenService,
    private pndtmtpScheduleService: SchedulePrePndtcService,
  ) { }

  notificationCount() {
    this.schedulenotificationModel = new ScheduleNotificationModel();
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    return new Promise(async resolve => {
      await this.schedulingdata().then((data) => {
        data !== undefined ? this.schedulingSampleCount = +data : 0;
      });
      await this.scheduleddata().then((data) => {
        data !== undefined ? this.scheduledSampleCount = +data : 0;
      });
      
      this.schedulenotificationModel.scheduling = this.schedulingSampleCount;
      this.schedulenotificationModel.scheduled = this.scheduledSampleCount;
      resolve(this.schedulenotificationModel);
    });
  }

  async schedulingdata(){
    this.schedulingSampleCount = 0;
    let schedulingListRequest = {userId: this.user.id, districtId: 0,
      chcId: 0,
      phcId: 0,
      anmId: 0 };
    return new Promise(resolve=>{
    this.pndtmtpScheduleService.getschedulingLists(schedulingListRequest).subscribe( response => {
      this.pndtmtpSchedulingResponse = response;
      if(this.pndtmtpSchedulingResponse.status === "true"){
        if(this.pndtmtpSchedulingResponse.data != undefined && this.pndtmtpSchedulingResponse.data.length > 0){
          this.schedulingSampleCount = this.pndtmtpSchedulingResponse.data.length;
        }
      }
      resolve(this.schedulingSampleCount);
    });
  });
  }

  async scheduleddata() {
    this.scheduledSampleCount = 0;
    let scheduledListRequest = {userId: this.user.id, districtId: 0,
      chcId: 0,
      phcId: 0,
      anmId: 0 };
    return new Promise(resolve => {
      this.pndtmtpScheduleService.getscheduledLists(scheduledListRequest).subscribe( response => {
        this.pndtmtpScheduledResponse = response;
        if(this.pndtmtpScheduledResponse.status === "true"){
          if(this.pndtmtpScheduledResponse.data != undefined && this.pndtmtpScheduledResponse.data.length > 0){
            this.scheduledSampleCount = this.pndtmtpScheduledResponse.data.length;
          }
        }
          resolve(this.scheduledSampleCount);
        });
    });
  }
}
