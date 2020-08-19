import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { SiteSidebarComponent } from "./../../../_layout/site-sidebar/site-sidebar.component";
import { DataService } from 'src/app/shared/data.service';


@Component({
  selector: 'walkin-registration',
  templateUrl: './walkin-registration.component.html',
  styleUrls: ['./walkin-registration.component.css']
})

export class WalkinRegistrationComponent implements OnInit {

  selectedRegScreen = "other";
  @ViewChild('preg', {static:false}) preg;

  constructor(
    private dataservice: DataService
  ) {
    
  }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "CHC - Reg & Sampling", "submodule": "Subject Registration", "page": "Walk-in Registration"}));
    
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
