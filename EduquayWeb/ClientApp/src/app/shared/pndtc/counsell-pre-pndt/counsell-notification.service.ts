import { Injectable } from '@angular/core';
import { TokenService } from '../../token.service';
import { CounsellPrePndtService } from './counsell-pre-pndt.service';
import { CounsellPrePndtResponse, CounselledprepndtResponse } from './counsell-pre-pndt-response';
import { user } from '../../auth-response';
import { CounsellNotificationModel } from './counsell-notification-model';

@Injectable({
  providedIn: 'root'
})
export class CounsellNotificationService {

  user: user;
  counsellnotificationModel: CounsellNotificationModel = new CounsellNotificationModel();

  counsellingprepndtResponse: CounsellPrePndtResponse;
  counsellingSampleCount: number;

  counselledyesprepndtResponse: CounselledprepndtResponse;
  counselledyesSampleCount: number;

  counsellednoprepndtResponse: CounselledprepndtResponse;
  counsellednoSampleCount: number;  

  counselledpendingprepndtResponse: CounselledprepndtResponse;
  counselledpendingSampleCount: number;

  constructor(
    private tokenService: TokenService,
    private counsellingprepndtService: CounsellPrePndtService
  ) { }

  notificationCount() {
    this.counsellnotificationModel = new CounsellNotificationModel();
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
      
      this.counsellnotificationModel.counselling = this.counsellingSampleCount;
      this.counsellnotificationModel.counselledyes = this.counselledyesSampleCount;
      this.counsellnotificationModel.counselledno = this.counsellednoSampleCount;
      this.counsellnotificationModel.counselledpending = this.counselledpendingSampleCount;
      resolve(this.counsellnotificationModel);
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
      this.counsellingprepndtService.getcounsellingLists(counsellingListRequest).subscribe(response => {
        this.counsellingprepndtResponse = response;
        if (this.counsellingprepndtResponse.status === "true") {
          if (this.counsellingprepndtResponse.data != undefined && this.counsellingprepndtResponse.data.length > 0) {
            this.counsellingSampleCount = this.counsellingprepndtResponse.data.length;
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
      this.counsellingprepndtService.getcounselledYesLists(counselledyesListRequest).subscribe(response => {
        this.counselledyesprepndtResponse = response;
        if (this.counselledyesprepndtResponse.status === "true") {
          if (this.counselledyesprepndtResponse.data != undefined && this.counselledyesprepndtResponse.data.length > 0) {
            this.counselledyesSampleCount = this.counselledyesprepndtResponse.data.length;
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
      this.counsellingprepndtService.getcounselledNoLists(counsellednoListRequest).subscribe(response => {
        this.counsellednoprepndtResponse = response;
        if (this.counsellednoprepndtResponse.status === "true") {
          if (this.counselledyesprepndtResponse.data != undefined && this.counsellednoprepndtResponse.data.length > 0) {
            this.counsellednoSampleCount = this.counsellednoprepndtResponse.data.length;
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
      this.counsellingprepndtService.getcounselledPendingLists(counselledpendingListRequest).subscribe(response => {
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
