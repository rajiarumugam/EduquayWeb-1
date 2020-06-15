import { Component, OnInit, Pipe, NgZone, ViewChild } from '@angular/core';
import { DistrictService } from 'src/app/shared/master/district/district.service';
import { DistrictResponse, District } from 'src/app/shared/master/district/district.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

declare var exposedFunction;


@Component({
  selector: 'app-anm-aw-registration',
  templateUrl: './anm-aw-registration.component.html',
  styleUrls: ['./anm-aw-registration.component.css']
})

export class AnmAwRegistrationComponent implements OnInit {
  //@ViewChild('f', { static: false }) subRegBasic: NgForm;

  
  districts: District[] = [];
  erroMessage: string;
  selectedDistrict;

  constructor(private districtService: DistrictService, zone: NgZone) {
    window['angularComponentReference'] = {
      zone: zone,
      componentFn: (id, value) => this.callFromOutside(id, value),
      component: this,
    };
    console.log('reference added');
  }

  ngOnInit() {
    this.getDistrictData();
  }

  public callFromOutside(id, subject: any): any {
    console.log('validating tab: ' + subject);
    let subjectdetail = JSON.parse(subject);
  }
  selected(eventval){
    console.log(eventval);
  }

  getDistrictData(){
    this.districtService.getAll()
    .subscribe(response => {
      if(response.status === 'true'){
        response.districts.forEach(element => {
          if(element.isActive.toString() === "True"){
            this.districts.push(element);
          }
        });
      }
      else{
        this.districts = [];
        this.erroMessage = response.message;
      }
    },
    (err: HttpErrorResponse) =>{
      console.log(err);
      this.districts = [];
      this.erroMessage = err.toString();
    });
  }


}
