import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anm-subject-registration',
  templateUrl: './anm-subject-registration.component.html',
  styleUrls: ['./anm-subject-registration.component.css']
})
export class AnmSubjectRegistrationComponent implements OnInit {
  currentPage = "";
  constructor(private router: Router) { }

  ngOnInit() {
    this.currentPage = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
  }

}
