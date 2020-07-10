import { Injectable, OnInit } from '@angular/core';
import { DamagedSamplesService } from './damaged-samples/damaged-samples.service';
import { UnsentSamplesServiceService } from './unsent-samples/unsent-samples-service.service';
import { TimeoutExpiryServiceService } from './timeout-expiry/timeout-expiry-service.service';
import { user } from '../../auth-response';
import { TokenService } from '../../token.service';
import { DamagedSamplesResponse } from './damaged-samples/damaged-samples-response';
import { TimeoutExpiryResponse } from './timeout-expiry/timeout-expiry-response';
import { NotificationModel } from './notification.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  user: user;
  notificationModel: NotificationModel = new NotificationModel();
  damagedSamplesResponse: DamagedSamplesResponse;
  damagedSampleCount: number;
  
  timeoutSamplesResponse: TimeoutExpiryResponse;
  timeoutSampleCount: number;
  
  positiveSampleCount: number = 0;
  unsentSampleCount: number = 0;
  pndtdSampleCount: number = 0;
  mtpSampleCount:number = 0;
  chcUpdateSampleCount:number = 0;

  constructor(
    private tokenService: TokenService,
    private damagedSampleService: DamagedSamplesService,
    private unsentServiceService: UnsentSamplesServiceService,
    private timeoutExpiryService: TimeoutExpiryServiceService,
  ) { }


  notificationCount() {
    this.notificationModel = new NotificationModel();
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    return new Promise(async resolve => {
      await this.damagedSamples().then((data) => {
        data !== undefined ? this.damagedSampleCount = +data : 0;
      });
      await this.unsentSamples().then((data) => {
        data !== undefined ? this.unsentSampleCount = +data : 0;
      });
      await this.timeoutSamples().then((data) => {
        data !== undefined ? this.timeoutSampleCount = +data : 0;
      });
      this.notificationModel.damaged = this.damagedSampleCount;
      this.notificationModel.unsent = this.unsentSampleCount;
      this.notificationModel.timeout = this.timeoutSampleCount;
      this.notificationModel.positive = this.positiveSampleCount;
      this.notificationModel.pndreferral = this.pndtdSampleCount;
      this.notificationModel.mtpreferral = this.mtpSampleCount;
      this.notificationModel.chcupdate = this.chcUpdateSampleCount;
      resolve(this.notificationModel);
    });
  }

  async damagedSamples(){
    this.damagedSampleCount = 0;
    let damagedsamplesRequest = {anmId: this.user.userTypeId, notification: 1};
    return new Promise(resolve=>{
    this.damagedSampleService.getdamagedSamples(damagedsamplesRequest).subscribe( response => {
      this.damagedSamplesResponse = response;
      if(this.damagedSamplesResponse.status === "true"){
        if(this.damagedSamplesResponse.sampleList != undefined && this.damagedSamplesResponse.sampleList.length > 0){
          this.damagedSampleCount = this.damagedSamplesResponse.sampleList.length;
        }
      }
      resolve(this.damagedSampleCount);
    });
  });
  }

  async unsentSamples(){
    return new Promise(resolve => {
      resolve()
    });
  }

  async timeoutSamples() {
    this.timeoutSampleCount = 0;
    let timeoutsamplesRequest = { anmId: this.user.userTypeId, notification: 3 };
    return new Promise(resolve => {
      let samplesList = this.timeoutExpiryService.gettimeoutSamples(timeoutsamplesRequest).subscribe(response => {
        this.timeoutSamplesResponse = response;
        if (this.timeoutSamplesResponse.status === "true") {
          if (this.timeoutSamplesResponse.sampleList != undefined && this.timeoutSamplesResponse.sampleList.length > 0) {
            this.timeoutSampleCount = this.timeoutSamplesResponse.sampleList.length;
          }
        }
        resolve(this.timeoutSampleCount);
      });
    });
  }



}
