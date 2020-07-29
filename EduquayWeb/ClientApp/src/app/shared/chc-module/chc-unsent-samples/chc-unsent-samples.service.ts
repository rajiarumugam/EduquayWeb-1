import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { ChcUnsentSamplesRequest, AddChcUnsentsamplesRequest, unsentMoveTimeoutExpiryRequest } from './chc-unsent-samples-request';
import { AddChcUnsentSampleResponse, UnsentTestingChcResponse, UnsentProviderNameResponse, ChcUnsentMoveTimeoutExpiryResponse, ChcUnsentSamplesResponse } from './chc-unsent-samples-response';
import { TokenService } from '../../token.service';

@Injectable({
  providedIn: 'root'
})
export class ChcUnsentSamplesService {

  chcunsentSampleApi: string = "api/CHCNotifications/RetrieveCHCUnsentSamples";
  providernameApi: string = "api/v1/WebMaster/RetrieveLogisticsProvider";
  AddChcunsentApi: string = "api/v1/ANMCHCShipment/AddCHCShipment";
  testingChcApi: string = "api/v1/WebMaster/RetrieveTestingCHCByCollectionCHC";
  UnsenttimeoutExpirySampleApi: string = "api/CHCNotifications/MoveTimeoutExpiry";

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getchcUnsentSamples(getchcunsentsample: ChcUnsentSamplesRequest){
    let apiUrl = this.genericServices.buildApiUrl(this.chcunsentSampleApi);
    return this.http.post<ChcUnsentSamplesResponse>({url: apiUrl, body: getchcunsentsample});
  }

  AddUnsentSamples(addunsentsample: AddChcUnsentsamplesRequest){
    let apiUrl = this.genericServices.buildApiUrl(this.AddChcunsentApi);
    return this.http.post<AddChcUnsentSampleResponse>({url: apiUrl, body: addunsentsample});
  }

  getTestingChc(chcId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericServices.buildApiUrl(`${this.testingChcApi}/${chcId}`);
    return this.http.get<UnsentTestingChcResponse>({url: apiUrl });
  }

  // getChc(userId){
  //   var user = JSON.parse(this.tokenService.getUser('lu'));
  //   this.userId = user.id;
  //   let apiUrl = this.genericServices.buildApiUrl(`${this.getChcApi}/${userId}`);
  //   return this.http.get<ChcResponse>({url: apiUrl });
  // }

  getProviderName(){
    let apiUrl = this.genericServices.buildApiUrl(this.providernameApi);
    return this.http.get<UnsentProviderNameResponse>({url: apiUrl });
  }

  chcunsentMoveExpirySamples(moveExpirySamples: unsentMoveTimeoutExpiryRequest){
    let apiUrl = this.genericServices.buildApiUrl(this.UnsenttimeoutExpirySampleApi);
    return this.http.post<ChcUnsentMoveTimeoutExpiryResponse>({url: apiUrl, body: moveExpirySamples});
  }

}
