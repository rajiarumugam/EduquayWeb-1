import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from 'src/app/shared/generic.service';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { DamagedSamplesRequest, AddSampleRecollectionRequest, DamagedUpdateStatusRequest } from './damaged-samples-request';
import { DamagedSamplesResponse, AddSampleRecollectionResponse, DamagedUpdateStatusResponse } from './damaged-samples-response';

@Injectable({
  providedIn: 'root'
})
export class DamagedSamplesService {

  damagedSamplesApi: string = "api/v1/ANMNotifications/RetrieveANMNotificationSamples"
  addSampleRecollectionApi: string = 'api/v1/ANMNotifications/AddSampleRecollection'
  updatedamagedSamplesApi: string = 'api/v1/ANMNotifications/UpdateStatus';

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService
  ) { }

  getdamagedSamples(samplesList: DamagedSamplesRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.damagedSamplesApi);
    return this.http.post<DamagedSamplesResponse>({url: apiUrl, body: samplesList});
  }

  postdamagedSample(damagedSample: AddSampleRecollectionRequest){
    let apiUrl = this.genericServices.buildApiUrl(this.addSampleRecollectionApi);
    return this.http.post<AddSampleRecollectionResponse>({url:apiUrl, body: damagedSample });

  }

  updatedamagedSample(updatedamagedSample: DamagedUpdateStatusRequest){
    let apiUrl = this.genericServices.buildApiUrl(this.updatedamagedSamplesApi);
    return this.http.post<DamagedUpdateStatusResponse>({url:apiUrl, body: updatedamagedSample });

  }
}
