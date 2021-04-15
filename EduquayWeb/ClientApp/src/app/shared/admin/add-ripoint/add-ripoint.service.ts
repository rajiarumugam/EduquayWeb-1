import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddChcResponse } from '../add-chc/add-chc-response';
import { AddPhcResponse } from '../add-phc/add-phc-response';
import { AddScResponse } from '../add-sc/add-sc-response';
import { AddRipointRequest } from './add-ripoint-request';
import { AddRipointResponse, AddRiPtDataresponse } from './add-ripoint-response';

@Injectable({
  providedIn: 'root'
})
export class AddRipointService {

  retrieveScApi: string = "api/v1/SC/Retrieve";
  retrieveRiPointApi: string = "api/v1/RI/Retrieve";
  retrievePhcApi: string = "api/v1/SA/RetrieveAllPHCs";
  addRiPtApi: string = "api/v1/RI/Add";
  retrieveChcApi: string = "api/v1/CHC/Retrieve";

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService,
  ) { }

  getChcList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveChcApi);
    return this.http.get<AddChcResponse>({url: apiUrl});
  }

  getPhcList(code){
    //var user = JSON.parse(this.tokenService.getUser('lu'));
    //this.userId = user.id;
    let apiUrl = this.genericService.buildApiUrl(`${this.retrievePhcApi}/${code}`);
    return this.http.get<AddPhcResponse>({url: apiUrl });
  }

  getScList(code){
    let apiUrl = this.genericService.buildApiUrl(`${this.retrieveScApi}/${code}`);
    return this.http.get<AddScResponse>({url: apiUrl});
  }

  getRiList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveRiPointApi);
    return this.http.get<AddRipointResponse>({url: apiUrl});
  }

  addRiPt(riptadd: AddRipointRequest){
    let apiUrl=this.genericService.buildApiUrl(this.addRiPtApi);
    return this.http.post<AddRiPtDataresponse>({url: apiUrl, body: riptadd});
  }

}
