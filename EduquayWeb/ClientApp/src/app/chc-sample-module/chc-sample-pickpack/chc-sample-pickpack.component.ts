import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/shared/utility/date.service';
import { ChcSamplePickpackService } from 'src/app/shared/chc-sample/chc-sample-pickpack/chc-sample-pickpack.service';
import { TokenService } from 'src/app/shared/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { sample } from 'rxjs/operators';


@Component({
  selector: 'app-chc-sample-pickpack',
  templateUrl: './chc-sample-pickpack.component.html',
  styleUrls: ['./chc-sample-pickpack.component.css']
})
export class ChcSamplePickpackComponent implements OnInit {

  pendingBadgeSampleCount: number = 0;
  startBadgePickpackCount: number = 0;

  constructor(
    private chcsamplePickpackService: ChcSamplePickpackService,
    private modalService: NgbModal,
    private dateService: DateService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder

  ) { }

  ngOnInit() {

  }  


  receiveBadgeCount(componentReference){
    //onLoadSamples
    componentReference.onLoadSamples.subscribe((data: number) => {
      if(this.router.url.indexOf('sample-pickpack') >= 0){
        this.pendingBadgeSampleCount = data;
      }
      else if(this.router.url.indexOf('startpickpack') >= 0){
        this.startBadgePickpackCount = data;
      }
    });
  }
}
