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

    retrieveScApi: string = "api/v1/SA/RetrieveAllSCs";
    retrievePhcApi: string = "api/v1/WebMaster/RetrievePHCByCHC";
    addScApi: string = "api/v1/SA/AddNewSC";
    retrieveChcApi: string = "api/v1/CHC/Retrieve";
    retrieveDistrictApi: string = "api/v1/SA/RetrieveAllDistricts";
    RetrieveCHCbyDistrict="api/v1/PNDTMTPMaster/RetrieveCHC/";
    RetrievePHCByCHC="api/v1/WebMaster/RetrievePHCByCHC/";
    updateScApi: string = "api/v1/SA/UpdateSC";
  
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

    updateSc(scadd: AddScRequest){
      let apiUrl=this.genericService.buildApiUrl(this.updateScApi);
      return this.http.post<AddScDataresponse>({url: apiUrl, body: scadd});
    }

    getDistrictList(){
      let apiUrl = this.genericService.buildApiUrl(this.retrieveDistrictApi);
      return this.http.get<any>({url: apiUrl});
    }

    getCHCByDis(id){
      let apiUrl = this.genericService.buildApiUrl(this.RetrieveCHCbyDistrict+id);
      return this.http.get<any>({url: apiUrl});
    }

    getPHCByCHC(id){
      let apiUrl = this.genericService.buildApiUrl(this.RetrievePHCByCHC+id);
      return this.http.get<any>({url: apiUrl});
    }
  }
