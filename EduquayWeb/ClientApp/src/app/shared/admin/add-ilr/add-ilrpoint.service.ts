import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddChcResponse } from '../add-chc/add-chc-response';
import { AddPhcResponse } from '../add-phc/add-phc-response';
import { AddScResponse } from '../add-sc/add-sc-response';
import { AddIlrpointRequest } from './add-ilrpoint-request';
import { AddIlrpointResponse, AddIlrPtDataresponse } from './add-ilrpoint-response';

@Injectable({
  providedIn: 'root'
})
export class AddIlrpointService {

  retrieveScApi: string = "api/v1/WebMaster/RetrieveSCByPHC/";
  retrieveIlrPointApi: string = "api/v1/ILR/Retrieve";
  retrievePhcApi: string = "api/v1/WebMaster/RetrievePHCByCHC/";
  addIlrPtApi: string = "api/v1/ILR/Add";
  editIlrPtApi:string ="api/v1/SA/UpdateILR"
  retrieveChcApi: string = "api/v1/CHC/Retrieve";
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

  getPhcList(code){
    //var user = JSON.parse(this.tokenService.getUser('lu'));
    //this.userId = user.id;
    let apiUrl = this.genericService.buildApiUrl(`${this.retrievePhcApi}${code}`);
    return this.http.get<AddPhcResponse>({url: apiUrl });
  }

  getScList(code){
    let apiUrl = this.genericService.buildApiUrl(`${this.retrieveScApi}${code}`);
    return this.http.get<AddScResponse>({url: apiUrl});
  }

  getRiList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveIlrPointApi);
    return this.http.get<AddIlrpointResponse>({url: apiUrl});
  }

  addRiPt(riptadd: any){
    let apiUrl=this.genericService.buildApiUrl(this.addIlrPtApi);
    return this.http.post<AddIlrPtDataresponse>({url: apiUrl, body: riptadd});
  }
  editRiPt(riptadd: any){
    let apiUrl=this.genericService.buildApiUrl(this.editIlrPtApi);
    return this.http.post<AddIlrPtDataresponse>({url: apiUrl, body: riptadd});
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
