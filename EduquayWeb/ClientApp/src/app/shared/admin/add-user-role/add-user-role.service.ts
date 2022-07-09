import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddChcResponse } from '../add-chc/add-chc-response';
// import { AddPhcRequest } from './add-phc-request';
import { AddPhcResponse, AddPhcDataresponse } from '../add-phc/add-phc-response';
import { AddUserroleResponse } from './add-user-role-response';
import { RetrieveUserTypeResponse } from '../add-masters-response';

@Injectable({
  providedIn: 'root'
})
export class AddUserroleService {
  

  retrieveBlockApi: string = "api/v1/SA/RetrieveAllBlocks";
  retrievePhcApi: string = "api/v1/SA/RetrieveAllPHCs";
  retrieveUserroleApi: string = "api/v1/UserRole/Retrieve";
  addUserroleApi: string = "api/v1/UserRole/Add";
  retrieveChcApi: string = "api/v1/SA/RetrieveAllCHCs";
  updatePhcApi: string = "api/v1/SA/UpdatePHC";
  retrieveDistrictApi: string = "api/v1/SA/RetrieveAllDistricts";
  RetrieveCHCbyDistrict="api/v1/PNDTMTPMaster/RetrieveCHC/";
  retrieveUsertypeApi="api/v1/UserType/Retrieve";

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

  getUsertypeList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveUsertypeApi);
    return this.http.get<RetrieveUserTypeResponse>({url: apiUrl});
  }


  getUserroleList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveUserroleApi);
    return this.http.get<AddUserroleResponse>({url: apiUrl});
  }

  addUserrole(Useradd){
    let apiUrl=this.genericService.buildApiUrl(this.addUserroleApi);
    return this.http.post<AddPhcDataresponse>({url: apiUrl, body: Useradd});
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
