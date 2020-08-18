import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
//import { library } from '@fortawesome/fontawesome-svg-core'
//import { fas } from '@fortawesome/free-solid-svg-icons'
//import { far } from '@fortawesome/free-regular-svg-icons'
//import { fab } from '@fortawesome/free-brands-svg-icons'


@Component({
  selector: 'app-anm-update-chc',
  templateUrl: './anm-update-chc.component.html',
  styleUrls: ['./anm-update-chc.component.css']
})
export class AnmUpdateChcComponent implements OnInit {

  constructor(
    private dataservice: DataService
  ) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({"module": "ANM", "submodule": "Notification", "page": "Update CHC Reg"}));
    // Add all icons to the library so you can use it in your page
    //library.add(fas, far, fab)
  }

}
