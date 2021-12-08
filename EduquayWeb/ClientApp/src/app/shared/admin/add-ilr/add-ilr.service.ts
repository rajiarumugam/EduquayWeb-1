import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddChcResponse } from '../add-chc/add-chc-response';
import { AddIlrRequest } from './add-ilr-request';
import { AddIlrResponse, AddIlrDataresponse } from './add-ilr-response';

@Injectable({
  providedIn: 'root'
})
export class AddIlrService {

  retrieveBlockApi: string = "api/v1/SA/RetrieveAllBlocks";
  retrievePhcApi: string = "api/v1/SA/RetrieveAllPHCs";
  addPhcApi: string = "api/v1/SA/AddNewPHC";
  retrieveChcApi: string = "api/v1/SA/RetrieveAllCHCs";
  updatePhcApi: string = "api/v1/SA/UpdatePHC";
  retrieveDistrictApi: string = "api/v1/SA/RetrieveAllDistricts";
  RetrieveCHCbyDistrict="api/v1/PNDTMTPMaster/RetrieveCHC/";

  updateIlrApi: string = "api/v1/SA/UpdateILR";
  RetrieveAllIlr: string = "api/v1/SA/RetrieveAllILR";
  addIlrApi: string = "api/v1/SA/AddNewILR";
  
  
  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  
  getIlrList(){
    let apiUrl = this.genericService.buildApiUrl(this.RetrieveAllIlr);
    return this.http.get<AddIlrResponse>({url: apiUrl});
  }

  addIlr(ilradd){
    let apiUrl=this.genericService.buildApiUrl(this.addIlrApi);
    return this.http.post<AddIlrDataresponse>({url: apiUrl, body: ilradd});
  }

  getDistrictList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveDistrictApi);
    return this.http.get<any>({url: apiUrl});
  }

  getCHCByDis(id){
    let apiUrl = this.genericService.buildApiUrl(this.RetrieveCHCbyDistrict+id);
    return this.http.get<any>({url: apiUrl});
  }
  getChcList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveChcApi);
    return this.http.get<AddChcResponse>({url: apiUrl});
  }
  updateIlr(ilradd){
    let apiUrl=this.genericService.buildApiUrl(this.updateIlrApi);
    return this.http.post<AddIlrDataresponse>({url: apiUrl, body: ilradd});
  }



}
