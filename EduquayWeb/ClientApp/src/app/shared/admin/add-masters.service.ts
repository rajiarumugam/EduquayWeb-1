import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../generic.service';
import { HttpClientService } from '../http-client.service';
import { TokenService } from '../token.service';
import { AddGvtIdTypeRequest, AddUserTypeRequest } from './add-masters-request';
import { AddGvtIdTypeResponse, RetrieveGvtIdTypeResponse, RetrieveUserTypeResponse } from './add-masters-response';

@Injectable({
  providedIn: 'root'
})
export class AddMastersService {

  retrieveGvtIdTypeApi: string = "api/v1/GovIDType/Retrieve";
  addGvtIdTypeApi: string = "api/v1/GovIDType/Add";

  retrieveUserTypeApi: string = "api/v1/UserType/Retrieve";
  addUserTypeApi: string = "api/v1/UserType/Add";

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService,
  ) { }

  getGvtIdTypeList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveGvtIdTypeApi);
    return this.http.get<RetrieveGvtIdTypeResponse>({url: apiUrl});
  }

  addGvtType(gvtIdType: AddGvtIdTypeRequest){
    let apiUrl=this.genericService.buildApiUrl(this.addGvtIdTypeApi);
    return this.http.post<AddGvtIdTypeResponse>({url: apiUrl, body: gvtIdType});
  }

  getUserTypeList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveUserTypeApi);
    return this.http.get<RetrieveUserTypeResponse>({url: apiUrl});
  }

  addUserType(gvtIdType: AddUserTypeRequest){
    let apiUrl=this.genericService.buildApiUrl(this.addGvtIdTypeApi);
    return this.http.post<AddGvtIdTypeResponse>({url: apiUrl, body: gvtIdType});
  }
}
