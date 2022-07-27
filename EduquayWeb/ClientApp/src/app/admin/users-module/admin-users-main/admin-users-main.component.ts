import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-admin-users-main.component',
  templateUrl: './admin-users-main.component.html',
  styleUrls: ['./admin-users-main.component.css']
})
export class UsersAdminMainComponent implements OnInit {
  currentPage = "";
  constructor(private router: Router, private dataservice: DataService) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "NHM", "submodule": "Monthly Indicators"}));
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
  }

}
