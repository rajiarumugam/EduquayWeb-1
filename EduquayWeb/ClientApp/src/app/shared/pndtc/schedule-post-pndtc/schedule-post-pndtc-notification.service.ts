import { Injectable } from '@angular/core';
import { TokenService } from '../../token.service';
import { SchedulePostPndtcService } from './schedule-post-pndtc.service';
import { user } from '../../auth-response';
import { SchedulePostPndtcModel } from './schedule-post-pndtc-model';
import { SchedulePostPndtcRequest } from './schedule-post-pndtc-request';
import { SchedulePostPndtcResponse } from './schedule-post-pndtc-response';

@Injectable({
  providedIn: 'root'
})
export class SchedulePostPndtcNotificationService {

  user: user;
  SchedulePostPndtcModel: SchedulePostPndtcModel = new SchedulePostPndtcModel();

  pndtmtpScheduledResponse: SchedulePostPndtcResponse;
  schedulingSampleCount: number;

  pndtmtpSchedulingResponse: SchedulePostPndtcResponse;
  scheduledSampleCount: number;

  constructor(
    private tokenService: TokenService,
    private postpndtmtpScheduleService: SchedulePostPndtcService,
  ) { }

  notificationCount() {
    this.SchedulePostPndtcModel = new SchedulePostPndtcModel();
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    return new Promise(async resolve => {
      await this.schedulingdata().then((data) => {
        data !== undefined ? this.schedulingSampleCount = +data : 0;
      });
      await this.scheduleddata().then((data) => {
        data !== undefined ? this.scheduledSampleCount = +data : 0;
      });
      
      this.SchedulePostPndtcModel.scheduling = this.schedulingSampleCount;
      this.SchedulePostPndtcModel.scheduled = this.scheduledSampleCount;
      resolve(this.SchedulePostPndtcModel);
    });
  }

  async schedulingdata(){
    this.schedulingSampleCount = 0;
    let schedulingListRequest = {userId: this.user.id, districtId: 0,
      chcId: 0,
      phcId: 0,
      anmId: 0 };
    return new Promise(resolve=>{
    this.postpndtmtpScheduleService.getschedulingLists(schedulingListRequest).subscribe( response => {
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
      this.postpndtmtpScheduleService.getscheduledLists(scheduledListRequest).subscribe( response => {
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
