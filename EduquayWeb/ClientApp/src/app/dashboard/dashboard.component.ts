import { Component, OnInit} from '@angular/core';
import { CommonService } from '../shared/common.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CommonService]
})
export class DashboardComponent implements OnInit {

  constructor(private commonService: CommonService, private dataservice: DataService) { }

  ngOnInit() {

    this.dataservice.sendData(JSON.stringify({}));
    //this.commonService.addJsToElement('assets/assets/js/anm/sample-collection.js').onload = () => {
    //  console.log('sample-collection file loaded');
    //};
    //this.commonService.addJsToElement('assets/plugins/flatpickr/collection-flatpickr.js');
    //this.commonService.addJsToElement('assets/plugins/noUiSlider/custom-nouiSlider.js');
    //this.commonService.addJsToElement('assets/assets/js/elements/custom-search.js');
    //this.commonService.addJsToElement('assets/plugins/sweetalerts/custom-sweetalert.js');
  }


}
