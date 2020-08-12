import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { SiteSidebarComponent } from "./../../../_layout/site-sidebar/site-sidebar.component";


@Component({
  selector: 'walkin-registration',
  templateUrl: './walkin-registration.component.html',
  styleUrls: ['./walkin-registration.component.css']
})

export class WalkinRegistrationComponent implements OnInit {

  selectedRegScreen = "other";
  @ViewChild('preg', {static:false}) preg;

  constructor() {
    
  }

  ngOnInit() {
    
  }
  inputChange(evt)
  {
    var target = evt.target;
    console.log(target.value);
    //console.log(this.preg.returnpageNo());
    //this.selectedRegScreen = "pregnant";
    this.selectedRegScreen = target.value;
    //if(target.value === 'pregnant')
  }
}
