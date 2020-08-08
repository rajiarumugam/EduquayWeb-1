import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-under-developement',
  templateUrl: './page-under-developement.component.html',
  styleUrls: ['./page-under-developement.component.css']
})
export class PageUnderDevelopementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goBack() {
    window.history.go(-1);
  }


}
