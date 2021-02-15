import { Component, OnInit } from '@angular/core';
import { CounsellNotificationModel } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-notification-model';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { CounsellNotificationService } from 'src/app/shared/pndtc/counsell-pre-pndt/counsell-notification.service';

@Component({
  selector: 'app-csv-specimen-main',
  templateUrl: './csv-specimen-main.component.html',
  styleUrls: ['./csv-specimen-main.component.css']
})
export class CSVSpecimenMainComponent implements OnInit {

  counsellnotificationModel: CounsellNotificationModel = new CounsellNotificationModel();

  counsellingnumber: number = 0;
  counselledyesnumber: number = 0;
  counsellednonumber: number = 0;
  counselledpendingnumber: number = 0;
  currentPage = "";

  constructor(
    private router: Router,
    private counsellNotificationService: CounsellNotificationService,
    private dataservice: DataService
  ) { }

  ngOnInit() {
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    this.notificationCount();
  }

  async notificationCount(){
    this.dataservice.receiveData().subscribe(x => { 
      console.log(JSON.parse(x).module);
      if(JSON.parse(x).module === "CSV SPECIMEN")
      {
        this.counsellingnumber = JSON.parse(x).pending;
        this.counselledyesnumber = JSON.parse(x).start;
      }
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
