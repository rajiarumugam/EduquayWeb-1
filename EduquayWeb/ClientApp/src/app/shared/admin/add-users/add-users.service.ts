import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddBlockResponse } from '../add-block/add-block-response';
import { AddchcbyblockResponse, AddChcResponse } from '../add-chc/add-chc-response';
import { StateResponse } from '../state/state-response';
import { UserroleResponse } from './add-users-response';
import { AddPhcResponse } from '../add-phc/add-phc-response';
import { AddUsersFilterRequest, AddUsersRequest } from './add-users-request';
import { AddUsersResponse, AddUsersDataresponse} from './add-users-response'; 
import { AddScResponse } from '../add-sc/add-sc-response';
import { ENDPOINT } from 'src/app/app.constant';
import { errorreportresponse } from './add-users-response';

@Injectable({
  providedIn: 'root'
})
export class AddUsersService {

  retrieveBlockApi: string = "api/v1/WebMaster/RetrieveBlockByDistrict/"
  retrieveSCbyPhc:String="api/v1/WebMaster/RetrieveSCByPHC"
  retrieveScApi: string = "api/v1/SC/Retrieve";
  retrievePhcApi: string = "api/v1/PHC/Retrieve";
  retrievephcbychc:string='api/v1/WebMaster/RetrievePHCByCHC'
  addPhcApi: string = "api/v1/SA/AddNewPHC";
  retrieveChcApi: string = "api/v1/CHC/Retrieve";
  updatePhcApi: string = "api/v1/SA/UpdatePHC";
  retrieveDistrictApi: string = "api/v1/SA/RetrieveAllDistricts";
  RetrieveCHCbyDistrict="api/v1/PNDTMTPMaster/RetrieveCHC/";
  RetrieveCHCbyBlock= "api/v1/WebMaster/RetrieveCHCByBlock";
  RetrieveTestingCHCByDistrict ="api/v1/WebMaster/RetrieveTestingCHCByDistrict";
  addusersapi="api/v1/UserIdentity/Add";
  RetrieveAllUsers="api/v1/UserIdentity/Retrieve";
  Retrieveuserrolebytype="api/v1/UserRole/RetrieveUserroleByType";
  updateIlrApi: string = "api/v1/SA/UpdateILR";
  RetrieveAllIlr: string = "api/v1/SA/RetrieveAllILR";
  addIlrApi: string = "api/v1/SA/AddNewILR";
  retrieveUsersApi: string = "api/v1/UserIdentity/RetrieveByType";
  retrieveUserFilterApi: string ="api/v1/UserIdentity/RetrieveByTypeFilter";
  retrieveStateApi: string = "api/v1/SA/RetrieveAllStates";
  retrieveUserroleApi: string = "api/v1/UserRole/Retrieve";
  updateusersApi: string ="api/v1/UserIdentity/Edit";
  ValidateeBulkUploadNew:"api/v1/Support/ValidateBulkUploadNew";
  
  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService,
    
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

  getUserFilterList(rifilter:AddUsersFilterRequest){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveUserFilterApi);
    return this.http.post<AddUsersResponse>({url: apiUrl, body: rifilter});
  }
  

  addUsers(avdadd){
    let apiUrl=this.genericService.buildApiUrl(this.addusersapi);
    return this.http.post<AddUsersDataresponse>({url: apiUrl, body: avdadd});
  }
  
  validateuploadSAFiles(){
    let apiUrl =this.genericService.buildApiUrl(ENDPOINT.UPLOAD.ValidateBulkUploadNew)
    return this.http.post<any>({url:apiUrl,body:{}});
  }

  getScList(code){
    let apiUrl = this.genericService.buildApiUrl(`${this.retrieveScApi}/${code}`);
    return this.http.get<AddScResponse>({url: apiUrl});
  }
  getDistrictList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveDistrictApi);
    return this.http.get<any>({url: apiUrl});
  }

  getStateList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveStateApi);
    return this.http.get<StateResponse>({url: apiUrl});
  }

  updateusers(usersedit){
    let apiUrl=this.genericService.buildApiUrl(this.updateusersApi);
    return this.http.post<AddUsersDataresponse>({url: apiUrl, body: usersedit});
  }

  getUserroleList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveUserroleApi);
    return this.http.get<UserroleResponse>({url: apiUrl});
  }

  getUserroleListType(type){
    let apiUrl = this.genericService.buildApiUrl(`${this.Retrieveuserrolebytype}/${type}`);
    return this.http.get<UserroleResponse>({url: apiUrl});
  }
  
  
  getPhcList(code){
    //var user = JSON.parse(this.tokenService.getUser('lu'));
    //this.userId = user.id;
    let apiUrl = this.genericService.buildApiUrl(`${this.retrievePhcApi}/${code}`);
    return this.http.get<AddPhcResponse>({url: apiUrl });
  }

  

  getPhcbychc(code){
    //var user = JSON.parse(this.tokenService.getUser('lu'));
    //this.userId = user.id;
    let apiUrl = this.genericService.buildApiUrl(`${this.retrievephcbychc}/${code}`);
    return this.http.get<AddPhcResponse>({url: apiUrl });
  }
  getscbyphc(code){
    //var user = JSON.parse(this.tokenService.getUser('lu'));
    //this.userId = user.id;
    let apiUrl = this.genericService.buildApiUrl(`${this.retrieveSCbyPhc}/${code}`);
    return this.http.get<AddPhcResponse>({url: apiUrl });
  }

  getCHCByBlock(id){
    let apiUrl = this.genericService.buildApiUrl(`${this.RetrieveCHCbyBlock}/${id}`);
    return this.http.get<AddchcbyblockResponse>({url: apiUrl});
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
