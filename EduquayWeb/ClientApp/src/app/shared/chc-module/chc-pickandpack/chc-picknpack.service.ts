import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { ChcPicknpackRequest, AddChcShipmentRequest, chcMoveTimeoutExpiryRequest } from './chc-picknpack-request'
import { ChcPicknpackResponse, ChcResponse, ProviderNameResponse, AddChcShipmentResponse, chcMoveTimeoutExpiryResponse, TestingChcResponse } from './chc-picknpack-response';

@Injectable({
  providedIn: 'root'
})
export class ChcPicknpackService {

  chcpickandpackListApi: string = "api/v1/ANMCHCPickandPack/Retrieve";
  // getChcApi: string = "api/v1/WebMaster/RetrieveCHC";
  providernameApi: string = "api/v1/WebMaster/RetrieveLogisticsProvider";
  AddChcShipmentApi: string = "api/v1/ANMCHCShipment/AddCHCShipment";
  testingChcApi: string = "api/v1/WebMaster/RetrieveTestingCHCByCollectionCHC"
  timeoutExpirySampleApi: string = "api/CHCNotifications/MoveTimeoutExpiry";

  chcId: number;

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getchcpickandpackList(pnpList: ChcPicknpackRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.chcpickandpackListApi);
    return this.http.post<ChcPicknpackResponse>({url: apiUrl, body: pnpList});
  }

  chcAddShipment(addchcshipment: AddChcShipmentRequest){
    let apiUrl = this.genericServices.buildApiUrl(this.AddChcShipmentApi);
    return this.http.post<AddChcShipmentResponse>({url: apiUrl, body: addchcshipment});

  }

  getTestingChc(chcId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericServices.buildApiUrl(`${this.testingChcApi}/${chcId}`);
    return this.http.get<TestingChcResponse>({url: apiUrl });
  }

  // getChc(userId){
  //   var user = JSON.parse(this.tokenService.getUser('lu'));
  //   this.userId = user.id;
  //   let apiUrl = this.genericServices.buildApiUrl(`${this.getChcApi}/${userId}`);
  //   return this.http.get<ChcResponse>({url: apiUrl });
  // }

  getProviderName(){
    let apiUrl = this.genericServices.buildApiUrl(this.providernameApi);
    return this.http.get<ProviderNameResponse>({url: apiUrl });
  }

  chcMoveExpirySamples(moveExpirySamples: chcMoveTimeoutExpiryRequest){
    let apiUrl = this.genericServices.buildApiUrl(this.timeoutExpirySampleApi);
    return this.http.post<chcMoveTimeoutExpiryResponse>({url: apiUrl, body: moveExpirySamples});
  }

}
