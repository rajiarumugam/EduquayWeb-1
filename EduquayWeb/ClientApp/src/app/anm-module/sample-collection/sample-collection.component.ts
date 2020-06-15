import { Component, OnInit } from '@angular/core';
import { SampleCollectionService } from 'src/app/shared/anm-module/sample-collection.service';
import { SampleCollectionResponse } from 'src/app/shared/anm-module/sample-collection-response';
import { HttpErrorResponse } from '@angular/common/http';
import { SampleCollectionRequest } from 'src/app/shared/anm-module/sample-collection-request';

@Component({
  selector: 'app-sample-collection',
  templateUrl: './sample-collection.component.html',
  styleUrls: ['./sample-collection.component.css']
})
export class SampleCollectionComponent implements OnInit {
  sCollectionErrorMessage: string;
  scRequest: SampleCollectionRequest;
  sampleCollectionResponse: SampleCollectionResponse;
  
  constructor(private sampleCollectionService: SampleCollectionService) { }

  ngOnInit() {
    console.log(this.sampleCollectionService.sampleCollectionApi);
    this.anmSampleCollection();
  }

  anmSampleCollection(){
    this.scRequest = {anmid: 10,fromDate: '', toDate: '', subjectType: 0};
    let sampleCollection = this.sampleCollectionService.getSampleCollection(this.scRequest)
    .subscribe(response => {
      this.sampleCollectionResponse = response;
      if(this.sampleCollectionResponse !== null && this.sampleCollectionResponse.status === "true"){
        if(this.sampleCollectionResponse.subjectList.length <= 0){
          this.sCollectionErrorMessage = response.message;
        }
      }else{
        this.sCollectionErrorMessage = response.message;
      }
      
    },
    (err: HttpErrorResponse) => {
      this.sCollectionErrorMessage = err.toString();
    });
  }

}
