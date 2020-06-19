import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SampleCollectionResponse } from './sample-collection-response';
import { GenericService } from '../generic.service';
import { SampleCollectionRequest } from './sample-collection-request';
import { HttpClientService } from '../http-client.service';


@Injectable({
  providedIn: 'root'
})
export class SampleCollectionService {

  sampleCollectionApi: string = "api/v1/SampleCollection/Retrieve";
  constructor(
    private httpClient: HttpClient, 
    private genericService: GenericService,
    private http: HttpClientService) { }

  getSampleCollection(scCollection: SampleCollectionRequest){
    let apiUrl = this.genericService.buildApiUrl(this.sampleCollectionApi);
    return this.http.post<SampleCollectionResponse>({url:apiUrl, body: scCollection });
  }
}
