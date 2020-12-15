import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddChcResponse } from '../add-chc/add-chc-response';
import { AddPhcRequest } from './add-phc-request';
import { AddPhcResponse, AddPhcDataresponse } from './add-phc-response';

@Injectable({
  providedIn: 'root'
})
export class AddPhcService {

  retrieveBlockApi: string = "api/v1/Block/Retrieve";
  retrievePhcApi: string = "api/v1/PHC/Retrieve";
  addPhcApi: string = "api/v1/PHC/Add";
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

  getPhcList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrievePhcApi);
    return this.http.get<AddPhcResponse>({url: apiUrl});
  }

  addPhc(phcadd: AddPhcRequest){
    let apiUrl=this.genericService.buildApiUrl(this.addPhcApi);
    return this.http.post<AddPhcDataresponse>({url: apiUrl, body: phcadd});
  }
}
