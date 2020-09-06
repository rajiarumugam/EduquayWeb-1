import { Component, OnInit } from '@angular/core';
import { CounsellPostPndtNotificationService } from 'src/app/shared/pndtc/counsell-post-pndt/counsell-post-pndt-notification.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { CounsellPostPndtModel } from 'src/app/shared/pndtc/counsell-post-pndt/counsell-post-pndt-model';

@Component({
  selector: 'app-counselling-post-pndt-main',
  templateUrl: './counselling-post-pndt-main.component.html',
  styleUrls: ['./counselling-post-pndt-main.component.css']
})
export class CounsellingPostPndtMainComponent implements OnInit {

  CounsellPostPndtModel: CounsellPostPndtModel = new CounsellPostPndtModel();

  counsellingnumber: number = 0;
  counselledyesnumber: number = 0;
  counsellednonumber: number = 0;
  counselledpendingnumber: number = 0;

  constructor(
    private router: Router,
    private postcounsellingNotificationService: CounsellPostPndtNotificationService,
    private dataservice: DataService) { }

    ngOnInit() {
      this.notificationCount();
    }
  
    async notificationCount(){
      await this.postcounsellingNotificationService.notificationCount().then((data) => {
        this.CounsellPostPndtModel = data as CounsellPostPndtModel;
        this.counsellingnumber =  this.CounsellPostPndtModel.counselling;
        this.counselledyesnumber = this.CounsellPostPndtModel.counselledyes;
        this.counsellednonumber = this.CounsellPostPndtModel.counselledno;
        this.counselledpendingnumber = this.CounsellPostPndtModel.counselledpending;
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
