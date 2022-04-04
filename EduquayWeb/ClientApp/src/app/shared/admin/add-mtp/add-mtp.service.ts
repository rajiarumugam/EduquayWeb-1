import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddDistrictResponse } from '../add-district/add-district-response';
import { AddMTPRequest } from './add-mtp-request';
import { AddMTPDataresponse, AddMTPResponse } from './add-mtp-response'; 

@Injectable({
  providedIn: 'root'
})
export class AddMTPService {

  retrieveMTPApi: string = "api/v1/MTP/RetrieveAllMTP";
  addMTPApi: string = "api/v1/MTP/Add";
  retrieveDistrictApi: string = "api/v1/SA/RetrieveAllDistricts";
  updateMTPApi: string = "api/v1/MTP/UpdateMTP";

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getDistrictList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveDistrictApi);
    return this.http.get<AddDistrictResponse>({url: apiUrl});
  }

  getMTPList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveMTPApi);
    return this.http.get<AddMTPResponse>({url: apiUrl});
  }

  addMTP(mtpadd){
    let apiUrl=this.genericService.buildApiUrl(this.addMTPApi);
    return this.http.post<AddMTPDataresponse>({url: apiUrl, body: mtpadd});
  }

  updateMTP(mtpadd){
    let apiUrl=this.genericService.buildApiUrl(this.updateMTPApi);
    return this.http.post<AddMTPDataresponse>({url: apiUrl, body: mtpadd});
  }
}
