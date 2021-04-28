import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-cvs-notification',
  templateUrl: './cvs-notification.component.html',
  styleUrls: ['./cvs-notification.component.css']
})
export class CvsNotificationComponent implements OnInit {

  currentPage = "";
  updateResultCount = 0;
  editResultCount = 0;
  confirmedResultCount = 0;

  constructor(

    private router: Router,
    private dataservice: DataService
  ) { }

  ngOnInit() {
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    this.notificationCount();
  }

  async notificationCount(){
    this.dataservice.receiveData().subscribe(x => { 
      console.log(JSON.parse(x).module);
      if(JSON.parse(x).modulepage === "CSV SPECIMEN")
      {
        this.updateResultCount = JSON.parse(x).updatecount;
        this.editResultCount = JSON.parse(x).editCount;
        this.confirmedResultCount = JSON.parse(x).confirmedCount;
      }
    });
  }

}
