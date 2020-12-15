import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddChcResponse } from '../add-chc/add-chc-response';
import { AddPhcResponse } from '../add-phc/add-phc-response';
import { AddScRequest } from './add-sc-request';
import { AddScDataresponse, AddScResponse } from './add-sc-response';

@Injectable({
  providedIn: 'root'
})
export class AddScService  {

    retrieveScApi: string = "api/v1/SC/Retrieve";
    retrievePhcApi: string = "api/v1/PHC/Retrieve";
    addScApi: string = "api/v1/SC/Add";
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
  
    getScList(){
      let apiUrl = this.genericService.buildApiUrl(this.retrieveScApi);
      return this.http.get<AddScResponse>({url: apiUrl});
    }
  
    addSc(scadd: AddScRequest){
      let apiUrl=this.genericService.buildApiUrl(this.addScApi);
      return this.http.post<AddScDataresponse>({url: apiUrl, body: scadd});
    }
  }
