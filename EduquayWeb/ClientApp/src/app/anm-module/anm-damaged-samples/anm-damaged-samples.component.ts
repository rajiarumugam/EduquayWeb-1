import { Component, OnInit } from '@angular/core';
//import { library } from '@fortawesome/fontawesome-svg-core'
//import { fas } from '@fortawesome/free-solid-svg-icons'
//import { far } from '@fortawesome/free-regular-svg-icons'
//import { fab } from '@fortawesome/free-brands-svg-icons'


@Component({
  selector: 'app-anm-damaged-samples',
  templateUrl: './anm-damaged-samples.component.html',
  styleUrls: ['./anm-damaged-samples.component.css']
})
export class AnmDamagedSamplesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Add all icons to the library so you can use it in your page
    //library.add(fas, far, fab)
  }

}
