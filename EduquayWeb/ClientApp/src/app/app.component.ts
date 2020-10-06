import { Component,OnInit } from '@angular/core';
import { LoaderService } from './shared/loader/loader.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  title = 'app';
  showLoader: boolean;
  constructor(
    private loaderService: LoaderService) {
  }
  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
        this.showLoader = val;
    });
}
}

