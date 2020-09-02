import { Component, OnInit } from '@angular/core';
import { CounsellNotificationModel } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-notification-model';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { CounsellNotificationService } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-notification.service';

@Component({
  selector: 'app-counselling-pre-pndt-main',
  templateUrl: './counselling-pre-pndt-main.component.html',
  styleUrls: ['./counselling-pre-pndt-main.component.css']
})
export class CounsellingPrePndtMainComponent implements OnInit {

  counsellnotificationModel: CounsellNotificationModel = new CounsellNotificationModel();

  counsellingnumber: number = 0;
  counselledyesnumber: number = 0;
  counsellednonumber: number = 0;
  counselledpendingnumber: number = 0;

  constructor(
    private router: Router,
    private counsellNotificationService: CounsellNotificationService,
    private dataservice: DataService
  ) { }

  ngOnInit() {
    this.notificationCount();
  }

  async notificationCount(){
    await this.counsellNotificationService.notificationCount().then((data) => {
      this.counsellnotificationModel = data as CounsellNotificationModel;
      this.counsellingnumber =  this.counsellnotificationModel.counselling;
      this.counselledyesnumber = this.counsellnotificationModel.counselledyes;
      this.counsellednonumber = this.counsellnotificationModel.counselledno;
      this.counselledpendingnumber = this.counsellnotificationModel.counselledpending;
    });
  }

  showNumberOnBadge(componentReference): void{
    console.log(componentReference, componentReference.recordCount);
    if(componentReference.onLoadSubject === undefined) return;
    componentReference.onLoadSubject.subscribe((data) => {
      if(this.router.url.indexOf('counselledyes') >= 0){
        this.counselledyesnumber = data;
      }
      else if(this.router.url.indexOf('counselledno') >= 0){
        this.counsellednonumber = data;
      }
      else if(this.router.url.indexOf('counselledawaited') >= 0){
        this.counselledpendingnumber = data;
      }
      else{
        this.counsellingnumber = data;
      }
    });
  }

}
