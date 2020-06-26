import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { PicknpackRequest, AnmAddShipmentRequest} from './picknpack-request';
import { PicknpackResponse, RiPointResponse, ILRpointResponse, TestingCHCResponse, AvdNameResponse, AnmAddShipmentResponse } from './picknpack-response';

@Injectable({
  providedIn: 'root'
})
export class PicknpackService {

  pickandpackListApi: string = "api/v1/ANMCHCPickandPack/Retrieve";
  riPointApi: string = "api/v1/RI/Retrieve";
  ilrPointApi: string = "api/v1/WebMaster/RetrieveILR";
  testingChcApi: string = "api/v1/WebMaster/RetrieveTestingCHC";
  avdNameApi: string = "api/v1/WebMaster/RetrieveAVD";
  AddShipmentApi: string = "api/v1/ANMCHCShipment/AddANMShipment";

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService
  ) { }

  getpickandpackList(pnpList: PicknpackRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.pickandpackListApi);
    return this.http.post<PicknpackResponse>({url: apiUrl, body: pnpList});
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

  anmAddSipment(addshipment: AnmAddShipmentRequest){
    let apiUrl = this.genericServices.buildApiUrl(this.AddShipmentApi);
    return this.http.post<AnmAddShipmentResponse>({url: apiUrl, body: addshipment});

  }
}

