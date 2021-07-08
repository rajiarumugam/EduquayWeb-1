import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-block-subject-registration',
  templateUrl: './block-subject-registration.component.html',
  styleUrls: ['./block-subject-registration.component.css']
})
export class BlockSubjecttRegistrationComponent implements OnInit {
  currentPage = "";
  constructor(private router: Router, private dataservice: DataService) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "ANM", "submodule": "Subject Registration"}));
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
  }

}
