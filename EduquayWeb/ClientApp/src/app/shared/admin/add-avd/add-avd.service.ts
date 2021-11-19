import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';

import { AddAvdRequest } from './add-avd-request';
import { AddAvdResponse, AddAvdDataresponse } from './add-avd-response';

@Injectable({
  providedIn: 'root'
})
export class AddAvdService {
  getIlrList() {
    throw new Error('Method not implemented.');
  }

  retrieveBlockApi: string = "api/v1/WebMaster/RetrieveBlockByDistrict/";
  retrieveChcApi: string = "api/v1/SA/RetrieveAllCHCs";
  retrieveAvdApi: string = "api/v1/AVD/Retrieve";
  addAvdApi: string = "api/v1/AVD/Add";
  retrieveDistrictApi: string = "api/v1/SA/RetrieveAllDistricts";
  RetrieveTestingCHCByDistrict ="api/v1/WebMaster/RetrieveTestingCHCByDistrict/";
  updateAvdApi: string = "api/v1/AVD/UpdateAVD";

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  
  getAvdList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveAvdApi);
    return this.http.get<AddAvdResponse>({url: apiUrl});
  }

  addAvd(avdadd){
    let apiUrl=this.genericService.buildApiUrl(this.addAvdApi);
    return this.http.post<AddAvdDataresponse>({url: apiUrl, body: avdadd});
  }

  updateAvd(avdadd){
    let apiUrl=this.genericService.buildApiUrl(this.updateAvdApi);
    return this.http.post<AddAvdDataresponse>({url: apiUrl, body: avdadd});
  }

  
  
}
