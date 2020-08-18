import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-anm-pnd-referral',
  templateUrl: './anm-pnd-referral.component.html',
  styleUrls: ['./anm-pnd-referral.component.css']
})
export class AnmPndReferralComponent implements OnInit {

  constructor(
    private dataservice: DataService
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "ANM", "submodule": "Notification", "page": "PND Referal"}));
  }

}
