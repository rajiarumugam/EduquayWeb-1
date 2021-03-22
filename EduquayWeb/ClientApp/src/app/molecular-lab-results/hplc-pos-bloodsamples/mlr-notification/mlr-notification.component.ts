import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-mlr-notification',
  templateUrl: './mlr-notification.component.html',
  styleUrls: ['./mlr-notification.component.css']
})
export class MlrNotificationComponent implements OnInit {

  currentPage = "";

  constructor(

    private router: Router,
    private dataservice: DataService
  ) { }

  ngOnInit() {
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
  }
}
