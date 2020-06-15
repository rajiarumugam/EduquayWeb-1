import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  title: string;
  constructor() { }

  ngOnInit() {
    this.title = "CMC - Thalassemia & Sickle cell";
  }

}
