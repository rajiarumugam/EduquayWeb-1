import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-anm-post-mtp-followup',
  templateUrl: './anm-post-mtp-followup.component.html',
  styleUrls: ['./anm-post-mtp-followup.component.css']
})
export class AnmPostMtpFollowupComponent implements OnInit {

  constructor(
    private dataservice: DataService
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "ANM", "submodule": "Notifications", "page": "Post MTP Follow-up"}));
  }

}
