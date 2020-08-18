import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-central-sample-rcpt',
  templateUrl: './central-sample-rcpt-main.component.html',
  styleUrls: ['./central-sample-rcpt-main.component.css']
})
export class CentralSampleRcptMainComponent implements OnInit {

  
  constructor(
    private dataservice: DataService
  ) { }

  ngOnInit() {
    this.dataservice.sendData(JSON.stringify({"module": "Central Lab", "page": "Sample Receipt"}));
  }

 
}
