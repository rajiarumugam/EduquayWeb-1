import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { ChcNotificationSamplesRequest, AddChcSampleRecollectionRequest } from './chc-notification-samples-request';
import { ChcNotificationSamplesResponse, AddChcSampleRecollectionResponse } from './chc-notification-samples-response';

@Injectable({
  providedIn: 'root'
})
export class ChcNotificationSamplesService {

  notificationSamplesApi: string = "api/CHCNotifications/RetrieveCHCNotificationSamples"
  addchcSampleRecollectionApi: string = 'api/CHCNotifications/AddSampleRecollection'

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService
  ) { }

  getnotificationChcSamples(samplesList: ChcNotificationSamplesRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.notificationSamplesApi);
    return this.http.post<ChcNotificationSamplesResponse>({url: apiUrl, body: samplesList});
  }

  postAddSample(notifiedSample: AddChcSampleRecollectionRequest){
    let apiUrl = this.genericServices.buildApiUrl(this.addchcSampleRecollectionApi);
    return this.http.post<AddChcSampleRecollectionResponse>({url:apiUrl, body: notifiedSample });

  }
}
