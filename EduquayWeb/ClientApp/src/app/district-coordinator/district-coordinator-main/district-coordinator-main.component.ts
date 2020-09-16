import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { DcNotificationModel } from 'src/app/shared/district-coordinator/dc-notification-model';
import { DcNotificationService } from 'src/app/shared/district-coordinator/dc-notification.service';
import { DistrictCoordinatorService } from 'src/app/shared/district-coordinator/district-coordinator.service';

@Component({
  selector: 'app-district-coordinator-main',
  templateUrl: './district-coordinator-main.component.html',
  styleUrls: ['./district-coordinator-main.component.css']
})
export class DistrictCoordinatorMainComponent implements OnInit {

  DcNotificationModel: DcNotificationModel = new DcNotificationModel();

  damagedSample: number = 0;
  unsentSample: number = 0;
  timeoutSample: number = 0;
  positiveSample: number = 0;
  pndReferralSample: number = 0;
  mtpReferralSample: number = 0;
  updateChcSample: number = 0;
  postmtpfollowup: number = 0;

  constructor(
    private router: Router,
    private dcnotificationService: DcNotificationService,
    private dataservice: DataService
  ) { }

  ngOnInit() {
    this.notificationCount();
  }

  async notificationCount() {
    await this.dcnotificationService.notificationCount().then((data) => {
      this.DcNotificationModel = data as DcNotificationModel;
      this.damagedSample = this.DcNotificationModel.damaged;
      this.unsentSample = this.DcNotificationModel.unsent;
      this.timeoutSample = this.DcNotificationModel.timeout;
      this.positiveSample = this.DcNotificationModel.positive;
      this.pndReferralSample = this.DcNotificationModel.pndreferral;
      this.mtpReferralSample = this.DcNotificationModel.mtpreferral;
      this.updateChcSample = this.DcNotificationModel.chcupdate;
      this.postmtpfollowup = this.DcNotificationModel.postmtp;
    });
  }

  showNumberOnBadge(componentReference): void {
    console.log(componentReference, componentReference.recordCount);
    if (componentReference.onLoadSubject === undefined) return;
    componentReference.onLoadSubject.subscribe((data) => {
      if (this.router.url.indexOf('unsent-samples') >= 0) {
        this.unsentSample = data;
      }
      else if (this.router.url.indexOf('sample-timeout') >= 0) {
        this.timeoutSample = data;
      }
      else if (this.router.url.indexOf('positive-subjects') >= 0) {
        this.positiveSample = data;
      }
      else if (this.router.url.indexOf('pndt-referral') >= 0) {
        this.pndReferralSample = data;
      }
      else if (this.router.url.indexOf('mtp-referral') >= 0) {
        this.mtpReferralSample = data;
      }
      else if (this.router.url.indexOf('updatechc') >= 0) {
        this.updateChcSample = data;
      }
      else if (this.router.url.indexOf('postmtp-follow-up') >= 0) {
        this.postmtpfollowup = data;
      }
      else {
        this.damagedSample = data;
      }
    });
  }

  getSubjectCount() {
  }

}
