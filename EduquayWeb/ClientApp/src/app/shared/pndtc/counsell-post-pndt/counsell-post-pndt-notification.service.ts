import { Injectable } from '@angular/core';
import { CounsellPostPndtModel } from './counsell-post-pndt-model';
import { CounsellPostPndtRequest } from './counsell-post-pndt-request';
import { CounsellPostPndtResponse, CounselledpostpndtResponse } from './counsell-post-pndt-response';
import { user } from '../../auth-response';
import { CounsellPostPndtService } from './counsell-post-pndt.service';
import { TokenService } from '../../token.service';

@Injectable({
  providedIn: 'root'
})
export class CounsellPostPndtNotificationService {

  user: user;
  CounsellPostPndtModel: CounsellPostPndtModel = new CounsellPostPndtModel();

  counsellingpostpndtResponse: CounsellPostPndtResponse;
  counsellingSampleCount: number;

  counselledyespostpndtResponse: CounselledpostpndtResponse;
  counselledyesSampleCount: number;

  counsellednopostpndtResponse: CounselledpostpndtResponse;
  counsellednoSampleCount: number;  

  counselledpendingprepndtResponse: CounselledpostpndtResponse;
  counselledpendingSampleCount: number;

  constructor(
    private tokenService: TokenService,
    private counsellingpostpndtService: CounsellPostPndtService
  ) { }

  notificationCount() {
    this.CounsellPostPndtModel = new CounsellPostPndtModel();
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    return new Promise(async resolve => {
      await this.counselingdata().then((data) => {
        data !== undefined ? this.counsellingSampleCount = +data : 0;
      });
      await this.counselledyesdata().then((data) => {
        data !== undefined ? this.counselledyesSampleCount = +data : 0;
      });
      await this.counsellednodata().then((data) => {
        data !== undefined ? this.counsellednoSampleCount = +data : 0;
      });
      await this.counselledpendingdata().then((data) => {
        data !== undefined ? this.counselledpendingSampleCount = +data : 0;
      });
      
      this.CounsellPostPndtModel.counselling = this.counsellingSampleCount;
      this.CounsellPostPndtModel.counselledyes = this.counselledyesSampleCount;
      this.CounsellPostPndtModel.counselledno = this.counsellednoSampleCount;
      this.CounsellPostPndtModel.counselledpending = this.counselledpendingSampleCount;
      resolve(this.CounsellPostPndtModel);
    });
  }
  async counselingdata() {
    this.counsellingSampleCount = 0;
    let counsellingListRequest = {
      userId: this.user.id, districtId: 0,
      chcId: 0,
      phcId: 0,
      anmId: 0
    };
    return new Promise(resolve => {
      this.counsellingpostpndtService.getcounsellingLists(counsellingListRequest).subscribe(response => {
        this.counsellingpostpndtResponse = response;
        if (this.counsellingpostpndtResponse.status === "true") {
          if (this.counsellingpostpndtResponse.data != undefined && this.counsellingpostpndtResponse.data.length > 0) {
            this.counsellingSampleCount = this.counsellingpostpndtResponse.data.length;
          }
        }
        resolve(this.counsellingSampleCount);
      });
    });
  }

  async counselledyesdata() {
    this.counselledyesSampleCount = 0;
    let counselledyesListRequest = {
      userId: this.user.id, districtId: 0,
      chcId: 0,
      phcId: 0,
      anmId: 0
    };
    return new Promise(resolve => {
      this.counsellingpostpndtService.getcounselledYesLists(counselledyesListRequest).subscribe(response => {
        this.counselledyespostpndtResponse = response;
        if (this.counselledyespostpndtResponse.status === "true") {
          if (this.counselledyespostpndtResponse.data != undefined && this.counselledyespostpndtResponse.data.length > 0) {
            this.counselledyesSampleCount = this.counselledyespostpndtResponse.data.length;
          }
        }
        resolve(this.counselledyesSampleCount);
      });
    });
  }

  async counsellednodata() {
    this.counsellednoSampleCount = 0;
    let counsellednoListRequest = {
      userId: this.user.id, districtId: 0,
      chcId: 0,
      phcId: 0,
      anmId: 0
    };
    return new Promise(resolve => {
      this.counsellingpostpndtService.getcounselledNoLists(counsellednoListRequest).subscribe(response => {
        this.counsellednopostpndtResponse = response;
        if (this.counsellednopostpndtResponse.status === "true") {
          if (this.counselledyespostpndtResponse.data != undefined && this.counsellednopostpndtResponse.data.length > 0) {
            this.counsellednoSampleCount = this.counsellednopostpndtResponse.data.length;
          }
        }
        resolve(this.counsellednoSampleCount);
      });
    });
  }

  async counselledpendingdata() {
    this.counselledpendingSampleCount = 0;
    let counselledpendingListRequest = {
      userId: this.user.id, districtId: 0,
      chcId: 0,
      phcId: 0,
      anmId: 0
    };
    return new Promise(resolve => {
      this.counsellingpostpndtService.getcounselledPendingLists(counselledpendingListRequest).subscribe(response => {
        this.counselledpendingprepndtResponse = response;
        if (this.counselledpendingprepndtResponse.status === "true") {
          if (this.counselledpendingprepndtResponse.data != undefined && this.counselledpendingprepndtResponse.data.length > 0) {
            this.counselledpendingSampleCount = this.counselledpendingprepndtResponse.data.length;
          }
        }
        resolve(this.counselledpendingSampleCount);
      });
    });
  }
}
