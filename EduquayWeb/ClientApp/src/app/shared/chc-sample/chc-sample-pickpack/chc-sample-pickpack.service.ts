import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { ChcSamplePickpackResponse, chcsampleProviderNameResponse, chcsampleCentrallabResponse, ChcSampleAddShipmentResponse } from './chc-sample-pickpack-response';
import { ChcSampleAddShipmentRequest } from './chc-sample-pickpack-request';
import { MaldiReq } from '../../MaldiRequest';

@Injectable({
  providedIn: 'root'
})
export class ChcSamplePickpackService {

  chcSamplePickPackApi: string = "api/v1/CHCReceiptProcessing/RetrievePickandPack";
  MaldiTestPending:string="api/v1/CHCReceiptProcessing/RetrieveMaldiResult"
  chcMaldiSpottingApi: string = "api/v1/CHCReceiptProcessing/RetrieveMaldiSpotting";

  AddChcSampleShipmentMaldiApi:string ="api/v1/CHCReceiptProcessing/AddMaldiShipment";
  chcSamplePickPackMaldiApi: string = "api/v1/CHCReceiptProcessing/RetrieveMaldiPickandPack";
  AddChcSampleShipmentApi:string= "api/v1/CHCReceiptProcessing/AddShipment";
  providernameApi: string = "api/v1/WebMaster/RetrieveLogisticsProvider";
  centralLabApi: string = "api/v1/WebMaster/RetrieveCentralLab";

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getsamplePickpackChc(chcId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(`${this.chcSamplePickPackApi}/${user.chcId}`);
    return this.http.get<ChcSamplePickpackResponse>({url: apiUrl });
  }
  getMaldiTest(chcId,status){
     var  NewMaldiReq=new MaldiReq()
     NewMaldiReq.maldiId=chcId.toString()
     NewMaldiReq.status=status
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(`${this.MaldiTestPending}`);
    return this.http.post<ChcSamplePickpackResponse>({url: apiUrl ,body:NewMaldiReq});
  }
  getMaldiRsultChc(chcId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(`${this.chcSamplePickPackApi}/${user.chcId}`);
    return this.http.get<ChcSamplePickpackResponse>({url: apiUrl });
  }
  getsampleMaldiPickpackChc(chcId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(`${this.chcSamplePickPackApi}/${user.chcId}`);
    return this.http.get<ChcSamplePickpackResponse>({url: apiUrl });
  }
  getMaldiSpotting(chcId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(`${this.chcMaldiSpottingApi}/${user.chcId}`);
    return this.http.get<ChcSamplePickpackResponse>({url: apiUrl });
  }
  getsamplePickpackChcMaldi(chcId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(`${this.chcSamplePickPackMaldiApi}/${user.chcId}`);
    return this.http.get<ChcSamplePickpackResponse>({url: apiUrl });
  }

  getProviderName(){
    let apiUrl = this.genericService.buildApiUrl(this.providernameApi);
    return this.http.get<chcsampleProviderNameResponse>({url: apiUrl });
  }

  getCentrallab(chcId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(`${this.centralLabApi}/${user.chcId}`);
    return this.http.get<chcsampleCentrallabResponse>({url: apiUrl });
  }

  chcSampleAddShipment(addchcshipment: ChcSampleAddShipmentRequest){
    let apiUrl = this.genericService.buildApiUrl(this.AddChcSampleShipmentApi);
    return this.http.post<ChcSampleAddShipmentResponse>({url: apiUrl, body: addchcshipment});
  }
  chcSampleAddShipmentMaldi(addchcshipment: ChcSampleAddShipmentRequest){
    let apiUrl = this.genericService.buildApiUrl(this.AddChcSampleShipmentMaldiApi);
    return this.http.post<ChcSampleAddShipmentResponse>({url: apiUrl, body: addchcshipment});
  }
}
