import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddBlockResponse } from '../add-block/add-block-response';
import { AddChcResponse } from '../add-chc/add-chc-response';
import { AddPhcResponse } from '../add-phc/add-phc-response';
import { AddUsersRequest } from './add-users-request';
import { AddUsersResponse, AddUsersDataresponse} from './add-users-response'; 
import { AddScResponse } from '../add-sc/add-sc-response';

@Injectable({
  providedIn: 'root'
})
export class AddUsersService {

  retrieveBlockApi: string = "api/v1/WebMaster/RetrieveBlockByDistrict/"
  retrieveScApi: string = "api/v1/SC/Retrieve";
  retrievePhcApi: string = "api/v1/PHC/Retrieve";
  addPhcApi: string = "api/v1/SA/AddNewPHC";
  retrieveChcApi: string = "api/v1/CHC/Retrieve";
  updatePhcApi: string = "api/v1/SA/UpdatePHC";
  retrieveDistrictApi: string = "api/v1/SA/RetrieveAllDistricts";
  RetrieveCHCbyDistrict="api/v1/PNDTMTPMaster/RetrieveCHC/";
  RetrieveCHCbyBlock= "api/v1/WebMaster/RetrieveCHCByBlock/{id}";
  RetrieveTestingCHCByDistrict ="api/v1/WebMaster/RetrieveTestingCHCByDistrict/";
  addusersapi="api/v1/UserIdentity/Add";
  RetrieveAllUsers="api/v1/UserIdentity/Retrieve";

  updateIlrApi: string = "api/v1/SA/UpdateILR";
  RetrieveAllIlr: string = "api/v1/SA/RetrieveAllILR";
  addIlrApi: string = "api/v1/SA/AddNewILR";
  retrieveUsersApi: string = "api/v1/UserIdentity/RetrieveByType";

  
  
  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getallUsersList(){
    let apiUrl = this.genericService.buildApiUrl(this.RetrieveAllUsers);
    return this.http.get<AddUsersResponse>({url: apiUrl});
  }
  
  getUsersList(code){
    //var user = JSON.parse(this.tokenService.getUser('lu'));
    //this.userId = user.id;
    let apiUrl = this.genericService.buildApiUrl(`${this.retrieveUsersApi}/${code}`);
    return this.http.get<AddUsersResponse>({url: apiUrl });
  }

  addUsers(avdadd){
    let apiUrl=this.genericService.buildApiUrl(this.addusersapi);
    return this.http.post<AddUsersDataresponse>({url: apiUrl, body: avdadd});
  }

  getScList(code){
    let apiUrl = this.genericService.buildApiUrl(`${this.retrieveScApi}/${code}`);
    return this.http.get<AddScResponse>({url: apiUrl});
  }
  getDistrictList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveDistrictApi);
    return this.http.get<any>({url: apiUrl});
  }
  
  getPhcList(code){
    //var user = JSON.parse(this.tokenService.getUser('lu'));
    //this.userId = user.id;
    let apiUrl = this.genericService.buildApiUrl(`${this.retrievePhcApi}/${code}`);
    return this.http.get<AddPhcResponse>({url: apiUrl });
  }
  getCHCByBlock(id){
    let apiUrl = this.genericService.buildApiUrl(this.RetrieveCHCbyBlock+id);
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

  getBlocklist(code){
    //var user = JSON.parse(this.tokenService.getUser('lu'));
    //this.userId = user.id;
    let apiUrl = this.genericService.buildApiUrl(`${this.retrieveBlockApi}${code}`);
    return this.http.get<AddBlockResponse>({url: apiUrl });
  }
  gettestingCHC(code){
    //var user = JSON.parse(this.tokenService.getUser('lu'));
    //this.userId = user.id;
    let apiUrl = this.genericService.buildApiUrl(`${this.RetrieveTestingCHCByDistrict}${code}`);
    return this.http.get<AddBlockResponse>({url: apiUrl });
  }



}
