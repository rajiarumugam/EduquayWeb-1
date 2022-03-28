import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddDistrictResponse } from '../add-district/add-district-response';
import { AddHPLCRequest } from './add-hplc-request';
import { AddHPLCDataresponse, AddHPLCResponse } from './add-hplc-response'; 

@Injectable({
  providedIn: 'root'
})
export class AddHPLCService {

  retrieveHPLCApi: string = "api/v1/HPLCLocation/RetrieveAllHPLC";
  addHPLCApi: string = "api/v1/HPLCLocation/Add";
  retrieveDistrictApi: string = "api/v1/SA/RetrieveAllDistricts";
  updateHPLCApi: string = "api/v1/HPLCLocation/UpdateHPLC";

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

  getHPLCList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveHPLCApi);
    return this.http.get<AddHPLCResponse>({url: apiUrl});
  }

  addHPLC(hplcadd){
    let apiUrl=this.genericService.buildApiUrl(this.addHPLCApi);
    return this.http.post<AddHPLCDataresponse>({url: apiUrl, body: hplcadd});
  }

  updateHPLC(hplcadd){
    let apiUrl=this.genericService.buildApiUrl(this.updateHPLCApi);
    return this.http.post<AddHPLCDataresponse>({url: apiUrl, body: hplcadd});
  }
}
