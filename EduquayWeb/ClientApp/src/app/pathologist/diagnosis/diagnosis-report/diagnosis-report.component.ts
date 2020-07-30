import { Component, OnInit,HostListener } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { Subscription } from 'rxjs';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-diagnosis-report',
  templateUrl: './diagnosis-report.component.html',
  styleUrls: ['./diagnosis-report.component.css']
})
export class DiagosisReportComponent implements OnInit {
  receivedSampleCount;
  uploadCBCCount = 0;
  subscription: Subscription;
  currentPage = "";
  @HostListener('window:scroll')
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    //console.log('[scroll]', scrollPosition);

    if(scrollPosition > 180)
    {
        $('#showhidediv').show();
    }
    else
      $('#showhidediv').hide();
    
  }
  constructor(private DataService:DataService,private router: Router) {

   
   }

  ngOnInit() {

    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      
      //console.log('previous url', events[0].urlAfterRedirects.indexOf('chc-update-cbc'));
      //console.log('current url', events[1].urlAfterRedirects);
      if(events[0].urlAfterRedirects.indexOf('central-update-hplc') == -1)
      {
          this.DataService.deleteProp('centraluploaddata');
      }
    });
    this.subscription = this.DataService.receiveData().subscribe(x => { 
      if(JSON.parse(x).screen === "CENTRAL")
      {
          if(JSON.parse(x).page === "upload")
          {
            this.uploadCBCCount = JSON.parse(x).uploadcount;
            this.receivedSampleCount = JSON.parse(x).receivedcount;
          }
              
          if(JSON.parse(x).page === "received")
              this.receivedSampleCount = JSON.parse(x).receivedcount;
      }
      
    });

    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
  }

  receivedSamples(event)
  {
    console.log(event);
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
