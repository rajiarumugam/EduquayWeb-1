import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SampleCollectionResponse, SampleCollectionPostResponse, subjectTypesResponse } from './sample-collection-response';
import { GenericService } from '../generic.service';
import { SampleCollectionRequest, SampleCollectionDateTimeRequest } from './sample-collection-request';
import { HttpClientService } from '../http-client.service';


@Injectable({
  providedIn: 'root'
})
export class SampleCollectionService {

  sampleCollectionApi: string = "api/v1/SampleCollection/Retrieve";
  sampleCollectionAddApi: string = "api/v1/SampleCollection/Add";
  subjectTypeApi: string = "api/v1/SubjectType/Retrieve";
  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService) { }

  getSampleCollection(scCollection: SampleCollectionRequest){
    let apiUrl = this.genericService.buildApiUrl(this.sampleCollectionApi);
    return this.http.post<SampleCollectionResponse>({url:apiUrl, body: scCollection });
  }


  postSampleCollection(sampleCollection: SampleCollectionDateTimeRequest){
    let apiUrl = this.genericService.buildApiUrl(this.sampleCollectionAddApi);
    return this.http.post<SampleCollectionPostResponse>({url:apiUrl, body: sampleCollection });

  }

  getSubjectType(){
    let apiUrl = this.genericService.buildApiUrl(this.subjectTypeApi);
    return this.http.get<subjectTypesResponse>({url:apiUrl });
  }

  // getSampleCollectionSudetailDetail(ScSujectDetail){

  // }
}
