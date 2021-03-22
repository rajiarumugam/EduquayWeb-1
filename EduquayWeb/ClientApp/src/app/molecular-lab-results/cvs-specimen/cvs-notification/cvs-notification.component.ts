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

  constructor(

    private router: Router,
    private dataservice: DataService
  ) { }

  ngOnInit() {
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
  }

}
