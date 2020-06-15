import { Component, OnInit} from '@angular/core';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CommonService]
})
export class DashboardComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    //this.commonService.addJsToElement('assets/assets/js/anm/sample-collection.js').onload = () => {
    //  console.log('sample-collection file loaded');
    //};
    //this.commonService.addJsToElement('assets/plugins/flatpickr/collection-flatpickr.js');
    //this.commonService.addJsToElement('assets/plugins/noUiSlider/custom-nouiSlider.js');
    //this.commonService.addJsToElement('assets/assets/js/elements/custom-search.js');
    //this.commonService.addJsToElement('assets/plugins/sweetalerts/custom-sweetalert.js');
  }


}
