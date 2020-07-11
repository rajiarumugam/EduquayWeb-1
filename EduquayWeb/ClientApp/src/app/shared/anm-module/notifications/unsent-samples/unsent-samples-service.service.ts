import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from 'src/app/shared/generic.service';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { RiPointResponse, ILRpointResponse, TestingCHCResponse, AvdNameResponse, UnsentSamplesResponse, AddUnsentSampleResponse, MoveTimeoutExpiryResponse } from './unsent-samples-response';
import { AddUnsentSampleRequest, MoveTimeoutExpiryRequest } from './unsent-samples-request';
import { TokenService } from 'src/app/shared/token.service';

@Injectable({
  providedIn: 'root'
})
export class UnsentSamplesServiceService {

  unsentSampleApi: string = "api/v1/ANMNotifications/RetrieveANMUnsentSamples";
  riPointApi: string = "api/v1/RI/Retrieve";
  ilrPointApi: string = "api/v1/WebMaster/RetrieveILR";
  testingChcApi: string = "api/v1/WebMaster/RetrieveTestingCHC";
  avdNameApi: string = "api/v1/WebMaster/RetrieveAVD";
  AddUnsentSampleApi: string = "api/v1/ANMCHCShipment/AddANMShipment";
  timeoutExpirySampleApi: string = "api/v1/ANMNotifications/MoveTimoutExpiry"

  userId: number;

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  // getunsentSampleList(unsentSampleList: UnsentSamplesRequest){
  //   let apiUrl=this.genericServices.buildApiUrl(this.unsentSampleApi);
  //   return this.http.post<UnsentSamplesResponse>({url: apiUrl, body: unsentSampleList});
  // }
    
  getunsentSampleList(userId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.userId = user.id;
    let apiUrl = this.genericServices.buildApiUrl(`${this.unsentSampleApi}/${userId}`);
    return this.http.get<UnsentSamplesResponse>({url: apiUrl });
  }

  getRiPoint(userId){
    let apiUrl = this.genericServices.buildApiUrl(this.riPointApi);
    return this.http.get<RiPointResponse>({url: apiUrl });
  }

  getIlrPoint(riId){
    let apiUrl = this.genericServices.buildApiUrl(`${this.ilrPointApi}/${riId}`);
    return this.http.get<ILRpointResponse>({url: apiUrl });
  }

  getTestingCHC(riId){
    let apiUrl = this.genericServices.buildApiUrl(`${this.testingChcApi}/${riId}`);
    return this.http.get<TestingCHCResponse>({url: apiUrl}); 
  }

  getAvdName(riId){
    let apiUrl = this.genericServices.buildApiUrl(`${this.avdNameApi}/${riId}`);
    return this.http.get<AvdNameResponse>({url: apiUrl});  
  }

  AddUnsentSamples(addunsentsample: AddUnsentSampleRequest){
    let apiUrl = this.genericServices.buildApiUrl(this.AddUnsentSampleApi);
    return this.http.post<AddUnsentSampleResponse>({url: apiUrl, body: addunsentsample});
  }

 MoveExpirySamples(moveExpirySamples: MoveTimeoutExpiryRequest){
    let apiUrl = this.genericServices.buildApiUrl(this.timeoutExpirySampleApi);
    return this.http.post<MoveTimeoutExpiryResponse>({url: apiUrl, body: moveExpirySamples});
  }

}
