import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any 

@Component({
  selector: 'app-subject-tracker',
  templateUrl: './subject-tracker.component.html',
  styleUrls: ['./subject-tracker.component.css']
})
export class SubjectTrackerComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
  }

  openpopup(){
    $('#fadeinModal').modal('show');
  
  }

}
