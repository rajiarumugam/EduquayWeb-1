import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  constructor(
    //private loaderService: LoaderService
  ) { }

  ngOnInit() {

    //this.loaderService.display(true);
  }

}
