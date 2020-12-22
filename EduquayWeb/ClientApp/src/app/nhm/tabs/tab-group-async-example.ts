import {Component} from '@angular/core';
import {Observable, Observer} from 'rxjs';

export interface ExampleTab {
  label: string;
  content: string;
}

/**
 * @title Tab group with asynchronously loading tab contents
 */
@Component({
  selector: 'tab-group-async-example',
  templateUrl: 'tab-group-async-example.html',
  styleUrls: ['tab-group-async-example.css'],
})
export class TabGroupAsyncExample {
  asyncTabs: Observable<ExampleTab[]>;
  prefTabs: any;

  constructor() {
    this.asyncTabs = Observable.create((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'First', content: 'Content 1'},
          {label: 'Second', content: 'Content 2'},
          {label: 'Third', content: 'Content 3'},
        ]);
      }, 1000);
    });

    this.prefTabs = [
          {label: 'First', content: 'Content 1'}
          // {label: 'Second', content: 'Content 2'},
          // {label: 'Third', content: 'Content 3'},
    ];

    // Api would be called here to retrieve preference data; additional tabs will be added !!
    setTimeout(() => { 
        // *** How to push these additional tabs onto this.asyncTabs ??????
          // {label: 'Second', content: 'Content 2'},
          // {label: 'Third', content: 'Content 3'},
    }, 3000);

  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */