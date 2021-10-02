import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddBlockResponse } from '../add-block/add-block-response';
import { AddChcResponse } from '../add-chc/add-chc-response';
import { AddDistrictResponse } from '../add-district/add-district-response';
import { AddPhcResponse } from '../add-phc/add-phc-response';
import { AddScResponse } from '../add-sc/add-sc-response';
import { AddUserRequest } from './add-user-request';
import { AddUserResponse, AddUserDataresponse } from './add-user-response';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  retrieveBlockApi: string = "api/v1/WebMaster/RetrieveBlockByDistrict/";
  retrieveUserApi: string = "api/v1/UserIdentity/Retrieve";
  addChcApi: string = "api/v1/SA/AddNewCHC";
  retrieveDistrictApi: string = "api/v1/SA/RetrieveAllDistricts";
  RetrieveTestingCHCByDistrict ="api/v1/WebMaster/RetrieveTestingCHCByDistrict/";
  RetrieveUserIdentity="api/v1/UserType/Retrieve";
  RetrieveCHC="api/v1/WebMaster/RetrieveCHCByBlock/";
  RetrievePHCByCHC="api/v1/WebMaster/RetrievePHCByCHC/";
  RetrieveSCByPHC="api/v1/WebMaster/RetrieveSCByPHC/";
 

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }
  getCHC(code){
    let apiUrl = this.genericService.buildApiUrl(`${this.RetrieveCHC}${code}`);
    return this.http.get<AddChcResponse>({url:apiUrl})
  }
  getUserTypeList(){
    let apiUrl=this.genericService.buildApiUrl(this.RetrieveUserIdentity);
    return this.http.get<AddUserResponse>({url:apiUrl})
  }
  getDistrictList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveDistrictApi);
    return this.http.get<AddDistrictResponse>({url: apiUrl});
  }

  getUserList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveUserApi);
    return this.http.get<AddUserResponse>({url: apiUrl});
  }

  addChc(chcadd: AddUserRequest){
    let apiUrl=this.genericService.buildApiUrl(this.addChcApi);
    return this.http.post<AddUserDataresponse>({url: apiUrl, body: chcadd});
  }

  getBlocklist(code){
    //var user = JSON.parse(this.tokenService.getUser('lu'));
    //this.userId = user.id;
    let apiUrl = this.genericService.buildApiUrl(`${this.retrieveBlockApi}${code}`);
    return this.http.get<AddBlockResponse>({url: apiUrl });
  }
  getPHCByCHC(code){
    let apiurl=this.genericService.buildApiUrl(`${this.RetrievePHCByCHC}${code}`)
    return this.http.get<AddPhcResponse>({url:apiurl});
  }
  getSCByPHC(code){
    let apiUrl=this.genericService.buildApiUrl(`${this.RetrieveSCByPHC}${code}`)
    return this.http.get<AddScResponse>({url:apiUrl})
  }

  gettestingCHC(code){
    //var user = JSON.parse(this.tokenService.getUser('lu'));
    //this.userId = user.id;
    let apiUrl = this.genericService.buildApiUrl(`${this.RetrieveTestingCHCByDistrict}${code}`);
    return this.http.get<AddBlockResponse>({url: apiUrl });
  }


  
}
