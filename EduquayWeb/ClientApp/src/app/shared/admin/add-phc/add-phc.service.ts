import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddChcResponse } from '../add-chc/add-chc-response';
import { AddPhcFilterRequest, AddPhcRequest } from './add-phc-request';
import { AddPhcResponse, AddPhcDataresponse } from './add-phc-response';

@Injectable({
  providedIn: 'root'
})
export class AddPhcService {
  

  retrieveBlockApi: string = "api/v1/SA/RetrieveAllBlocks";
  retrievePhcApi: string = "api/v1/SA/RetrieveAllPHCs";
  retrievePHCFilterApi: string ="api/v1/SA/RetrievePHCFilter";
  retrieveUserroleApi: string = "api/v1/SA/RetrieveAllPHCs";
  addPhcApi: string = "api/v1/SA/AddNewPHC";
  retrieveChcApi: string = "api/v1/SA/RetrieveAllCHCs";
  updatePhcApi: string = "api/v1/SA/UpdatePHC";
  retrieveDistrictApi: string = "api/v1/SA/RetrieveAllDistricts";
  RetrieveCHCbyDistrict="api/v1/PNDTMTPMaster/RetrieveCHC/";

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

  getuserroleList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrievePhcApi);
    return this.http.get<AddPhcResponse>({url: apiUrl});
  }

  getPhcList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrievePhcApi);
    return this.http.get<AddPhcResponse>({url: apiUrl});
  }

  getPHCFilterList(phcadd:AddPhcFilterRequest){
    let apiUrl = this.genericService.buildApiUrl(this.retrievePHCFilterApi);
    return this.http.post<AddPhcResponse>({url: apiUrl, body: phcadd});
  }

  getUserroleList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveUserroleApi);
    return this.http.get<AddPhcResponse>({url: apiUrl});
  }

  addPhc(phcadd){
    let apiUrl=this.genericService.buildApiUrl(this.addPhcApi);
    return this.http.post<AddPhcDataresponse>({url: apiUrl, body: phcadd});
  }

  updatePhc(phcadd){
    let apiUrl=this.genericService.buildApiUrl(this.updatePhcApi);
    return this.http.post<AddPhcDataresponse>({url: apiUrl, body: phcadd});
  }

  getDistrictList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveDistrictApi);
    return this.http.get<any>({url: apiUrl});
  }

  getCHCByDis(id){
    let apiUrl = this.genericService.buildApiUrl(this.RetrieveCHCbyDistrict+id);
    return this.http.get<any>({url: apiUrl});
  }
}
