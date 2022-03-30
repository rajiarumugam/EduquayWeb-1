import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../../shared/data.service';
import { Subscription } from 'rxjs';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { ExcelService } from 'src/app/shared/excel.service';
import { uploadSharedService } from './../../uploadshared.service';

@Component({
  selector: 'app-sa-upload-main',
  templateUrl: './upload-sa-main.component.html',
  styleUrls: ['./upload-sa-main.component.css']
})
export class UploadSAMainComponent implements OnInit {
  pendingPickupCount = 0;
  startPickCount = 0;
  subscription: Subscription;
  currentPage = "";
  buttonClickedSubscription: Subscription;
  allowDataCreation = true;
  constructor(private DataService:DataService,private router: Router,private excelService:ExcelService,private uploadSharedService: uploadSharedService) { }

  ngOnInit() {

    //this.dataservice.sendData(JSON.stringify({"module": "Central Lab", "page": "Pick & Pack"}));

    this.buttonClickedSubscription = this.uploadSharedService.getButtonClicked().subscribe((event:any) => {
      if(event.screen) {
        this.currentPage = event.screen;
        console.log(this.currentPage)
      }
       
      if(event.allowDataCreation) {
        this.allowDataCreation = false;
      }else {
        this.allowDataCreation = true;
      }
      console.log(event)
    });

    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      
      console.log('previous url', events[0].urlAfterRedirects.indexOf('central-pickpack'));
      console.log('current url', events[1].urlAfterRedirects);
      console.log('previous url', events[0].urlAfterRedirects);
     if(events[0].urlAfterRedirects.indexOf('central-pickpack') == -1)
      {
          this.DataService.deleteProp('centralPickPack');
      }
    });
    this.subscription = this.DataService.receiveData().subscribe(x => { 
      if(JSON.parse(x).screen === "errorBarcode")
      {
          this.pendingPickupCount = JSON.parse(x).pendingcount;
          this.startPickCount = JSON.parse(x).startpickCount;
      }
    });
    //this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
  }

  receivedSamples(event)
  {
    console.log(event);
  }
  stageChange(event) {
    console.log(event);
  }
  uploadFile() {
    this.uploadSharedService.emitChange("upload");
  }
  validationFile() {
    this.uploadSharedService.emitChange("validation");
  }
  datacreationFile() {
    this.uploadSharedService.emitChange("datacreation");
  }
  downloadMyFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'http://tands.eduquay.com/assets/assets/img/menu/TSCOD Master Data Template - New.xlsx');
    link.setAttribute('download', `TSCOD Master Data Template - New.xlsx`);
    document.body.appendChild(link)
;
    link.click();
    link.remove();
}
  
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
