import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counselling-post-pndt-main',
  templateUrl: './counselling-post-pndt-main.component.html',
  styleUrls: ['./counselling-post-pndt-main.component.css']
})
export class CounsellingPostPndtMainComponent implements OnInit {

  counsellingnumber: number = 0;
  counselledyesnumber: number = 0;
  counsellednonumber: number = 0;
  counselledpendingnumber: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
