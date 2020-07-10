import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from 'src/app/shared/generic.service';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { RiPointResponse, ILRpointResponse, TestingCHCResponse, AvdNameResponse, UnsentSamplesResponse, AddUnsentSampleResponse } from './unsent-samples-response';
import { UnsentSamplesRequest, AddUnsentSampleRequest } from './unsent-samples-request';

@Injectable({
  providedIn: 'root'
})
export class UnsentSamplesServiceService {

  unsentSampleApi: string = "api/v1/ANMCHCPickandPack/Retrieve";
  riPointApi: string = "api/v1/RI/Retrieve";
  ilrPointApi: string = "api/v1/WebMaster/RetrieveILR";
  testingChcApi: string = "api/v1/WebMaster/RetrieveTestingCHC";
  avdNameApi: string = "api/v1/WebMaster/RetrieveAVD";
  AddUnsentSampleApi: string = "api/v1/ANMCHCShipment/AddANMShipment";

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService
  ) { }

  getunsentSampleList(unsentSampleList: UnsentSamplesRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.unsentSampleApi);
    return this.http.post<UnsentSamplesResponse>({url: apiUrl, body: unsentSampleList});
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

}
