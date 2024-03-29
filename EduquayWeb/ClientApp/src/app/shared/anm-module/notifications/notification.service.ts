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
import { UnsentSamplesResponse } from './unsent-samples/unsent-samples-response';
import { PositiveSubjectsResponse } from '../positive-subjects/positive-subjects-response';
import { PositiveSubjectsService } from '../positive-subjects/positive-subjects.service';
import { AnmMtpReferralResponse, AnmPndtReferralResponse } from './pndt-mtp-referral/pndt-mtp-referral-response';
import { PndtMtpReferralService } from './pndt-mtp-referral/pndt-mtp-referral.service';
import { PostMtpFollowupResponse } from './post-mtp-followup/post-mtp-followup-response';
import { PostMtpFollowupService } from './post-mtp-followup/post-mtp-followup.service';

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
  
  unsentSamplesResponse: UnsentSamplesResponse;
  positivubjectResponse: PositiveSubjectsResponse;

  pndtReferralResponse: AnmPndtReferralResponse;
  mtpReferrralResponse: AnmMtpReferralResponse;
  postMTPResponse: PostMtpFollowupResponse;

  positiveSampleCount: number = 0;
  unsentSampleCount: number = 0;
  pndtdSampleCount: number = 0;
  mtpSampleCount:number = 0;
  chcUpdateSampleCount:number = 0;
  postmtpSampleCount:number = 0;

  constructor(
    private tokenService: TokenService,
    private damagedSampleService: DamagedSamplesService,
    private unsentServiceService: UnsentSamplesServiceService,
    private timeoutExpiryService: TimeoutExpiryServiceService,
    private positiveSubjectsService: PositiveSubjectsService,
    private pndtReferralService: PndtMtpReferralService,
    private mtpReferralService: PndtMtpReferralService,
    private postMTPService: PostMtpFollowupService
  ) { }


  notificationCount() {
    this.notificationModel = new NotificationModel();
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    return new Promise(async resolve => {
      await this.positiveSubjects(this.user.id).then((data) => {
        data !== undefined ? this.positiveSampleCount = +data : 0;
      });
      await this.damagedSamples().then((data) => {
        data !== undefined ? this.damagedSampleCount = +data : 0;
      });
      await this.unsentSamples(this.user.id).then((data) => {
        data !== undefined ? this.unsentSampleCount = +data : 0;
      });
      await this.timeoutSamples().then((data) => {
        data !== undefined ? this.timeoutSampleCount = +data : 0;
      });
      await this.pndtReferral(this.user.id).then((data) => {
        data !== undefined ? this.pndtdSampleCount = +data : 0;
      });
      await this.mtpReferral(this.user.id).then((data) => {
        data !== undefined ? this.mtpSampleCount = +data : 0;
      });
      await this.postMTP(this.user.id).then((data) => {
        data !== undefined ? this.postmtpSampleCount = +data : 0;
      });
      
      this.notificationModel.damaged = this.damagedSampleCount;
      this.notificationModel.unsent = this.unsentSampleCount;
      this.notificationModel.timeout = this.timeoutSampleCount;
      this.notificationModel.positive = this.positiveSampleCount;
      this.notificationModel.pndreferral = this.pndtdSampleCount;
      this.notificationModel.mtpreferral = this.mtpSampleCount;
      this.notificationModel.chcupdate = this.chcUpdateSampleCount;
      this.notificationModel.postmtp = this.postmtpSampleCount;
      resolve(this.notificationModel);
    });
  }

  async damagedSamples(){
    this.damagedSampleCount = 0;
    let damagedsamplesRequest = {anmId: this.user.id, notification: 1};
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

  async unsentSamples(userId) {
    this.unsentSampleCount = 0;
    return new Promise(resolve => {
      let unsentsample = this.unsentServiceService.getunsentSampleList(userId)
        .subscribe(response => {
          this.unsentSamplesResponse = response;
          if (this.unsentSamplesResponse !== null && this.unsentSamplesResponse.status === "true") {
            if (this.unsentSamplesResponse.unsentSamplesDetail !== undefined && this.unsentSamplesResponse.unsentSamplesDetail.length > 0) {
              this.unsentSampleCount = this.unsentSamplesResponse.unsentSamplesDetail.length;
            }
          }
          resolve(this.unsentSampleCount);
        });
    });
  }

  async positiveSubjects(userId) {
    this.positiveSampleCount = 0;
    return new Promise(resolve => {
      let unsentsample = this.positiveSubjectsService.getPositiveSubject(userId)
        .subscribe(response => {
          this.positivubjectResponse = response;
          if (this.positivubjectResponse !== null && this.positivubjectResponse.status === "true") {
            if (this.positivubjectResponse.positiveSubjects !== undefined && this.positivubjectResponse.positiveSubjects.length > 0) {
              this.positiveSampleCount = this.positivubjectResponse.positiveSubjects.length;
            }
          }
          resolve(this.positiveSampleCount);
        });
    });
  }

  async timeoutSamples() {
    this.timeoutSampleCount = 0;
    let timeoutsamplesRequest = { anmId: this.user.id, notification: 3 };
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

  async pndtReferral(userId) {

    this.pndtdSampleCount = 0;
    return new Promise(resolve => {
      let unsentsample = this.pndtReferralService.getPndtReferralList(userId)
        .subscribe(response => {
          this.pndtReferralResponse = response;
          if (this.pndtReferralResponse !== null && this.pndtReferralResponse.status === "true") {
            if (this.pndtReferralResponse.samples !== undefined && this.pndtReferralResponse.samples.length > 0) {
              this.pndtdSampleCount = this.pndtReferralResponse.samples.length;
            }
          }
          resolve(this.pndtdSampleCount);
        });
    });
  }

  async mtpReferral(userId) {

    this.mtpSampleCount = 0;
    return new Promise(resolve => {
      let unsentsample = this.mtpReferralService.getMtpReferralList(userId)
        .subscribe(response => {
          this.mtpReferrralResponse = response;
          if (this.mtpReferrralResponse !== null && this.mtpReferrralResponse.status === "true") {
            if (this.mtpReferrralResponse.samples !== undefined && this.mtpReferrralResponse.samples.length > 0) {
              this.mtpSampleCount = this.mtpReferrralResponse.samples.length;
            }
          }
          resolve(this.mtpSampleCount);
        });
    });
  }
    async postMTP(userId) {

      this.postmtpSampleCount = 0;
      return new Promise(resolve => {
        let unsentsample = this.postMTPService.getpostMTPList(userId)
          .subscribe(response => {
            this.postMTPResponse = response;
            if (this.postMTPResponse !== null && this.postMTPResponse.status === "true") {
              if (this.postMTPResponse.subjects !== undefined && this.postMTPResponse.subjects.length > 0) {
                this.postmtpSampleCount = this.postMTPResponse.subjects.length;
              }
            }
            resolve(this.postmtpSampleCount);
          });
      });
    }
}
