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
  
    // this.modalService.open(
    //   shippedChcSampleDetail,{
    //     centered: true,
    //     size: 'xl',
    //     //windowClass: 'modal-xl',
    //     scrollable: true,
    //     backdrop:'static',
    //     keyboard: false,
    //     ariaLabelledBy: 'modal-basic-title'
    //   });
  }

}
