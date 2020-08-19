import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-anm-mtp-referral',
  templateUrl: './anm-mtp-referral.component.html',
  styleUrls: ['./anm-mtp-referral.component.css']
})
export class AnmMtpReferralComponent implements OnInit {

  constructor(
    private dataservice: DataService
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "ANM", "submodule": "Notifications", "page": "MTP Referal"}));
  }

}
