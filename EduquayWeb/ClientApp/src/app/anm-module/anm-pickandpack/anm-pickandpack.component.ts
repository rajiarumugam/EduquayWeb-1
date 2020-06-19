import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { PicknpackService } from 'src/app/shared/anm-module/picnpack/picknpack.service';
import { PicknpackRequest } from 'src/app/shared/anm-module/picnpack/picknpack-request';
import { PicknpackResponse, SampleList } from 'src/app/shared/anm-module/picnpack/picknpack-response';
import { HttpErrorResponse } from '@angular/common/http';
//import { library } from '@fortawesome/fontawesome-svg-core'
//import { fas } from '@fortawesome/free-solid-svg-icons'
//import { far } from '@fortawesome/free-regular-svg-icons'
//import { fab } from '@fortawesome/free-brands-svg-icons'


@Component({
  selector: 'app-anm-pickandpack',
  templateUrl: './anm-pickandpack.component.html',
  styleUrls: ['./anm-pickandpack.component.css']
})
export class AnmPickandPackComponent implements OnInit {

  picknpackErrorMessage: string;
  picknpackRequest: PicknpackRequest;
  picknpackResponse: PicknpackResponse;
  sampleList: SampleList[] = [];

  constructor(
    private PicknpackService: PicknpackService
    ) { }

  ngOnInit() {
    console.log(this.PicknpackService.pickandpackListApi);
    this.anmpicknpackList();
  }

  anmpicknpackList(){
    this.picknpackRequest = {userId: 10, registeredFrom: '' };
    let picknpack = this.PicknpackService.getpickandpackList(this.picknpackRequest)
    .subscribe(response => {
      this.picknpackResponse = response;
      if(this.picknpackResponse !== null && this.picknpackResponse.status === "true"){
        if(this.picknpackResponse.sampleList.length <= 0){
          this.picknpackErrorMessage = response.message;
        }
        else{
          this.sampleList = this.picknpackResponse.sampleList;
        }
      }
      else{
        this.picknpackErrorMessage = response.message;
      }
    },
    (err: HttpErrorResponse) => {
      this.picknpackErrorMessage = err.toString();
    });
    
  }
  
}
