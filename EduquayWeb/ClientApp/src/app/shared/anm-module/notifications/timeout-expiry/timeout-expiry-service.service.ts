import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from 'src/app/shared/generic.service';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { TimeoutExpiryRequest, AddtimeoutSampleRecollectionRequest } from './timeout-expiry-request';
import { TimeoutExpiryResponse, AddtimeoutSampleRecollectionResponse } from './timeout-expiry-response';

@Injectable({
  providedIn: 'root'
})
export class TimeoutExpiryServiceService {

  timeoutSamplesApi: string = "api/v1/ANMNotifications/RetrieveANMNotificationSamples"
  addtimeoutSampleRecollectionApi: string = 'api/v1/ANMNotifications/AddSampleRecollection'

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService
  ) { }

  gettimeoutSamples(samplesList: TimeoutExpiryRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.timeoutSamplesApi);
    return this.http.post<TimeoutExpiryResponse>({url: apiUrl, body: samplesList});
  }

  posttimeoutSample(timeoutSample: AddtimeoutSampleRecollectionRequest){
    let apiUrl = this.genericServices.buildApiUrl(this.addtimeoutSampleRecollectionApi);
    return this.http.post<AddtimeoutSampleRecollectionResponse>({url:apiUrl, body: timeoutSample });

  }

}
