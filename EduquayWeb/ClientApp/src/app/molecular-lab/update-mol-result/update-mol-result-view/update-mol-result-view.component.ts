import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-mol-result-view',
  templateUrl: './update-mol-result-view.component.html',
  styleUrls: ['./update-mol-result-view.component.css']
})
export class UpdateMolResultViewComponent implements OnInit {
  constructor(private DataService:DataService,private router: Router, private dataservice: DataService) { }
  @HostListener('window:scroll')
  checkScroll() {

    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    //console.log('[scroll]', scrollPosition);

    if (scrollPosition > 180) {
      $('#showhidediv').show();
    }
    else
      $('#showhidediv').hide();

  }
  pndSummarydata;
  ngOnInit() {
    this.dataservice.sendData(JSON.stringify({"module": "Molecular Lab", "submodule": "Update Molecular Results", "page": "View Case Sheet"}));
    if(this.DataService.getdata().updateMolResu === undefined)
    {
      this.router.navigate(['/app/update-molecular-result']);
    }
    this.pndSummarydata = this.DataService.getdata().updateMolResu;
    console.log(this.pndSummarydata);

  }

}
