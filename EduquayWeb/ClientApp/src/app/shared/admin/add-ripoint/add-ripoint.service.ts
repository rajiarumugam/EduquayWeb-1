import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddChcResponse } from '../add-chc/add-chc-response';
import { AddPhcResponse } from '../add-phc/add-phc-response';
import { AddSCbyANMResponse, AddScResponse } from '../add-sc/add-sc-response';
import { IlrResponse } from './add-ripoint-response';
import { AddtestingchcbydistrictResponse } from './add-ripoint-response';
import { AddBlockResponse } from '../add-block/add-block-response';
import { AddRipointRequest } from './add-ripoint-request';
import { AddRipointResponse, AddRiPtDataresponse } from './add-ripoint-response';
import { AddchcbydistrictResponse } from '../add-chc/add-chc-response';

@Injectable({
  providedIn: 'root'
})
export class AddRipointService {

  retrieveScApi: string = "api/v1/WebMaster/RetrieveSCByPHC/";
  RetrieveANMBySC: string = "api/v1/WebMaster/RetrieveANMBySC/";
  retrieveRiPointApi: string = "api/v1/SA/RetrieveAllRISites";
  retrievePhcApi: string = "api/v1/WebMaster/RetrievePHCByCHC/";
  addRiPtApi: string = "api/v1/RI/Add";
  updateRiPtApi: string = "api/v1/SA/UpdateRISite";
  retrieveChcApi: string = "api/v1/CHC/Retrieve";
  RetrieveTestingCHCByDistrict ="api/v1/WebMaster/RetrieveTestingCHCByDistrict/";
  retrieveDistrictApi: string = "api/v1/SA/RetrieveAllDistricts";
  RetrieveCHCbyDistrict="api/v1/PNDTMTPMaster/RetrieveCHC/";
  RetrieveILRByCHC: string = "api/v1/WebMaster/RetrieveILRByCHC/";
  RetrieveCHCByDistrict= "api/v1/WebMaster/RetrieveCHCByDistrict";

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

  getCHCByDistrict(id){
    let apiUrl = this.genericService.buildApiUrl(`${this.RetrieveCHCByDistrict}/${id}`);
    return this.http.get<AddchcbydistrictResponse>({url: apiUrl});
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

  getANMbyScList(id){
    let apiUrl = this.genericService.buildApiUrl(`${this.RetrieveANMBySC}${id}`);
    return this.http.get<AddSCbyANMResponse>({url: apiUrl});
  }

  getIlrbychcList(id){
    let apiUrl = this.genericService.buildApiUrl(`${this.RetrieveILRByCHC}${id}`);
    return this.http.get<IlrResponse>({url: apiUrl});
  }

  getRiList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveRiPointApi);
    return this.http.get<AddRipointResponse>({url: apiUrl});
  }

  updateRiPt(riPtedit){
    let apiUrl=this.genericService.buildApiUrl(this.updateRiPtApi);
    return this.http.post<AddRiPtDataresponse>({url: apiUrl, body: riPtedit});
  }


  addRiPt(riptadd: AddRipointRequest){
    let apiUrl=this.genericService.buildApiUrl(this.addRiPtApi);
    return this.http.post<AddRiPtDataresponse>({url: apiUrl, body: riptadd});
  }

  

  getDistrictList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveDistrictApi);
    return this.http.get<any>({url: apiUrl});
  }

  getCHCByDis(id){
    console.log(id,'cll');
    let apiUrl = this.genericService.buildApiUrl(this.RetrieveCHCbyDistrict+id);
    return this.http.get<any>({url: apiUrl});
  }
  gettestingCHC(code){
    //var user = JSON.parse(this.tokenService.getUser('lu'));
    //this.userId = user.id;
    let apiUrl = this.genericService.buildApiUrl(this.RetrieveTestingCHCByDistrict+code);
    return this.http.get<AddtestingchcbydistrictResponse>({url: apiUrl });
  }

}
