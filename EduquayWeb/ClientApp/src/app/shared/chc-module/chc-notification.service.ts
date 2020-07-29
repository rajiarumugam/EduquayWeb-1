import { Injectable } from '@angular/core';
import { TokenService } from '../token.service';
import { ChcNotification } from './chc-notification';
import { user } from '../auth-response';
import { ChcPositiveSubjectResponse } from './chc-positive-subject/chc-positive-subject-response';
import { ChcPositiveSubjectService } from './chc-positive-subject/chc-positive-subject.service';
import { ChcUnsentSamplesService } from './chc-unsent-samples/chc-unsent-samples.service';
import { ChcNotificationSamplesService } from './chc-notification-samples/chc-notification-samples.service';
import { ChcUnsentSamplesResponse } from './chc-unsent-samples/chc-unsent-samples-response';
import { ChcNotificationSamplesResponse } from './chc-notification-samples/chc-notification-samples-response';

@Injectable({
  providedIn: 'root'
})
export class ChcNotificationService {
  user: user;
  notificationModel: ChcNotification = new ChcNotification();
  damagedSamplesResponse: ChcNotificationSamplesResponse;
  damagedSampleCount: number;
  
 // timeoutSamplesResponse: ChcNotificationSamplesResponse;
  timeoutSampleCount: number;
  
  unsentSamplesResponse: ChcUnsentSamplesResponse;
  positivubjectResponse: ChcPositiveSubjectResponse;


  positiveSampleCount: number = 0;
  unsentSampleCount: number = 0;

  constructor(
    private tokenService: TokenService,
    private damagedSampleService: ChcNotificationSamplesService,
    private ChcUnsentSamplesService: ChcUnsentSamplesService,
    //private timeoutExpiryService: ChcNotificationSamplesService,
    private positiveSubjectsService: ChcPositiveSubjectService
  ) { }


  notificationCount() {
    this.notificationModel = new ChcNotification();
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    return new Promise(async resolve => {
      await this.positiveSubjects().then((data) => {
        data !== undefined ? this.positiveSampleCount = +data : 0;
      });
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
      resolve(this.notificationModel);
    });
  }

  async damagedSamples(){
    this.damagedSampleCount = 0;
    let damagedsamplesRequest = { userId: this.user.id, notification: 1, collectionFrom: this.user.sampleCollectionFrom};
    return new Promise(resolve=>{
    this.damagedSampleService.getnotificationChcSamples(damagedsamplesRequest).subscribe( response => {
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

  async unsentSamples() {
    this.unsentSampleCount = 0;
    let chcunsentSamplesRequest = {userId: this.user.id, collectionFrom: this.user.sampleCollectionFrom, notification:2 };
    return new Promise(resolve => {
      let unsentsample = this.ChcUnsentSamplesService.getchcUnsentSamples(chcunsentSamplesRequest)
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

  async positiveSubjects() {
    this.positiveSampleCount = 0;
    return new Promise(resolve => {
      let positivesubjectRequest = {chcId: this.user.chcId,  registeredFrom: this.user.registeredFrom };
      let unsentsample = this.positiveSubjectsService.getChcPositiveSubject(positivesubjectRequest)
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
    let timeoutsamplesRequest = { userId: this.user.id, notification: 3, collectionFrom: this.user.sampleCollectionFrom};
    return new Promise(resolve => {
      let samplesList = this.damagedSampleService.getnotificationChcSamples(timeoutsamplesRequest).subscribe(response => {
        this.damagedSamplesResponse = response;
        if (this.damagedSamplesResponse.status === "true") {
          if (this.damagedSamplesResponse.sampleList != undefined && this.damagedSamplesResponse.sampleList.length > 0) {
            this.timeoutSampleCount = this.damagedSamplesResponse.sampleList.length;
          }
        }
        resolve(this.timeoutSampleCount);
      });
    });
  }

}
