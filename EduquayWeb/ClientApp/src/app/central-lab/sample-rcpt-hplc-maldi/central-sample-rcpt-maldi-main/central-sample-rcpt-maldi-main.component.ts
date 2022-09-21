import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-central-sample-rcpt-maldi',
  templateUrl: './central-sample-rcpt-maldi-main.component.html',
  styleUrls: ['./central-sample-rcpt-maldi-main.component.css']
})
export class CentralSampleRcptMaldiHPLCMainComponent implements OnInit {

  
  constructor(
    private dataservice: DataService
  ) { }

  ngOnInit() {
    this.dataservice.sendData(JSON.stringify({"module": "Central Lab", "page": "Sample Receipt"}));
  }

 
}
