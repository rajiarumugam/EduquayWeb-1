import { Injectable } from '@angular/core';
import { user } from '../auth-response';
import { TokenService } from '../token.service';
import { DcNotificationModel } from './dc-notification-model';
import { dcmtpReferralResponse, DcNotificationResponse, dcpndtReferralResponse, dcPositiveSubjectsResponse, dcpostMTPResponse } from './dc-notification-response';
import { DistrictCoordinatorService } from './district-coordinator.service';

@Injectable({
  providedIn: 'root'
})
export class DcNotificationService {

  user: user;
  DcNotificationModel: DcNotificationModel = new DcNotificationModel();
  damagedSamplesResponse: DcNotificationResponse;
  damagedSampleCount: number;
  
  timeoutSamplesResponse: DcNotificationResponse;
  timeoutSampleCount: number;
  
  unsentSamplesResponse: DcNotificationResponse;
  positivubjectResponse: dcPositiveSubjectsResponse;

  pndtReferralResponse: dcpndtReferralResponse;
  mtpReferralResponse: dcmtpReferralResponse;

  postMTPResponse: dcpostMTPResponse;

  positiveSampleCount: number = 0;
  unsentSampleCount: number = 0;
  pndtdSampleCount: number = 0;
  mtpSampleCount:number = 0;
  chcUpdateSampleCount:number = 0;
  postmtpSampleCount:number = 0;

  constructor(
    private tokenService: TokenService,
    private damagedSampleService: DistrictCoordinatorService,
    private unsentSampleService: DistrictCoordinatorService,
    private timeoutExpiryService: DistrictCoordinatorService,
    private positiveSubjectsService: DistrictCoordinatorService,
    private pndtReferralService: DistrictCoordinatorService,
    private mtpReferralService: DistrictCoordinatorService,
    private postMTPService: DistrictCoordinatorService,
  ) { }

  notificationCount() {
    this.DcNotificationModel = new DcNotificationModel();
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    return new Promise(async resolve => {
      await this.positiveSubjects(this.user.districtId).then((data) => {
        data !== undefined ? this.positiveSampleCount = +data : 0;
      });
      await this.damagedSamples(this.user.districtId).then((data) => {
        data !== undefined ? this.damagedSampleCount = +data : 0;
      });
      await this.unsentSamples(this.user.districtId).then((data) => {
        data !== undefined ? this.unsentSampleCount = +data : 0;
      });
      await this.timeoutSamples(this.user.districtId).then((data) => {
        data !== undefined ? this.timeoutSampleCount = +data : 0;
      });
      await this.pndtReferral(this.user.districtId).then((data) => {
        data !== undefined ? this.pndtdSampleCount = +data : 0;
      });
      await this.mtpReferral(this.user.districtId).then((data) => {
        data !== undefined ? this.mtpSampleCount = +data : 0;
      });
      await this.postMTP(this.user.districtId).then((data) => {
        data !== undefined ? this.postmtpSampleCount = +data : 0;
      });
      
      this.DcNotificationModel.damaged = this.damagedSampleCount;
      this.DcNotificationModel.unsent = this.unsentSampleCount;
      this.DcNotificationModel.timeout = this.timeoutSampleCount;
      this.DcNotificationModel.positive = this.positiveSampleCount;
      this.DcNotificationModel.pndreferral = this.pndtdSampleCount;
      this.DcNotificationModel.mtpreferral = this.mtpSampleCount;
      this.DcNotificationModel.chcupdate = this.chcUpdateSampleCount;
      this.DcNotificationModel.postmtp = this.postmtpSampleCount;
      resolve(this.DcNotificationModel);
    });
  }

  async damagedSamples(districtId){
    this.damagedSampleCount = 0;

    return new Promise(resolve=>{
    this.damagedSampleService.getdamagedSampleList(districtId).subscribe( response => {
      this.damagedSamplesResponse = response;
      if(this.damagedSamplesResponse.status === "true"){
        if(this.damagedSamplesResponse.samples != undefined && this.damagedSamplesResponse.samples.length > 0){
          this.damagedSampleCount = this.damagedSamplesResponse.samples.length;
        }
      }
      resolve(this.damagedSampleCount);
    });
  });
  }

  async unsentSamples(districtId) {
    this.unsentSampleCount = 0;
    return new Promise(resolve => {
      let unsentsample = this.unsentSampleService.getunsentSampleList(districtId)
        .subscribe(response => {
          this.unsentSamplesResponse = response;
          if (this.unsentSamplesResponse !== null && this.unsentSamplesResponse.status === "true") {
            if (this.unsentSamplesResponse.samples !== undefined && this.unsentSamplesResponse.samples.length > 0) {
              this.unsentSampleCount = this.unsentSamplesResponse.samples.length;
            }
          }
          resolve(this.unsentSampleCount);
        });
    });
  }

  async positiveSubjects(districtId) {
    this.positiveSampleCount = 0;
    return new Promise(resolve => {
      let unsentsample = this.positiveSubjectsService.getpositiveSubjectList(districtId)
        .subscribe(response => {
          this.positivubjectResponse = response;
          if (this.positivubjectResponse !== null && this.positivubjectResponse.status === "true") {
            if (this.positivubjectResponse.samples !== undefined && this.positivubjectResponse.samples.length > 0) {
              this.positiveSampleCount = this.positivubjectResponse.samples.length;
            }
          }
          resolve(this.positiveSampleCount);
        });
    });
  }

  async timeoutSamples(districtId) {
    this.timeoutSampleCount = 0;
    return new Promise(resolve => {
      let samplesList = this.timeoutExpiryService.gettimeoutSampleList(districtId).subscribe(response => {
        this.timeoutSamplesResponse = response;
        if (this.timeoutSamplesResponse.status === "true") {
          if (this.timeoutSamplesResponse.samples != undefined && this.timeoutSamplesResponse.samples.length > 0) {
            this.timeoutSampleCount = this.timeoutSamplesResponse.samples.length;
          }
        }
        resolve(this.timeoutSampleCount);
      });
    });
  }

  async pndtReferral(districtId) {

    this.pndtdSampleCount = 0;
    return new Promise(resolve => {
      let samplesList = this.pndtReferralService.getpndtReferral(districtId).subscribe(response => {
        this.pndtReferralResponse = response;
        if (this.pndtReferralResponse.status === "true") {
          if (this.pndtReferralResponse.samples != undefined && this.pndtReferralResponse.samples.length > 0) {
            this.pndtdSampleCount = this.pndtReferralResponse.samples.length;
          }
        }
        resolve(this.pndtdSampleCount);
      });
    });
  }

  async mtpReferral(districtId) {

    this.mtpSampleCount = 0;
    return new Promise(resolve => {
      let samplesList = this.mtpReferralService.getmtpReferral(districtId).subscribe(response => {
        this.mtpReferralResponse = response;
        if (this.mtpReferralResponse.status === "true") {
          if (this.mtpReferralResponse.samples != undefined && this.mtpReferralResponse.samples.length > 0) {
            this.mtpSampleCount = this.mtpReferralResponse.samples.length;
          }
        }
        resolve(this.mtpSampleCount);
      });
    });
  }

  async postMTP(districtId) {

    this.postmtpSampleCount = 0;
    return new Promise(resolve => {
      let samplesList = this.postMTPService.getPostMtp(districtId).subscribe(response => {
        this.postMTPResponse = response;
        if (this.postMTPResponse.status === "true") {
          if (this.postMTPResponse.samples != undefined && this.postMTPResponse.samples.length > 0) {
            this.postmtpSampleCount = this.postMTPResponse.samples.length;
          }
        }
        resolve(this.postmtpSampleCount);
      });
    });
  }

 
}
