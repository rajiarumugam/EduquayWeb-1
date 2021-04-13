import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { StateResponse } from '../state/state-response';
import { AddDistrictRequest } from './add-district-request';
import { AddDistrictResponse, AddDistrictDataresponse } from './add-district-response';

@Injectable({
  providedIn: 'root'
})
export class AddDistrictService {

  retrieveDistrictApi: string = "api/v1/SA/RetrieveAllDistricts";
  addDistrictApi: string = "api/v1/SA/AddNewDistrict";
  retrieveStateApi: string = "api/v1/SA/RetrieveAllStates";
  updateDistrictApi: string = "api/v1/SA/UpdateDistrict";

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

  getStateList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveStateApi);
    return this.http.get<StateResponse>({url: apiUrl});
  }

  addDistrict(districtadd){
    let apiUrl=this.genericService.buildApiUrl(this.addDistrictApi);
    return this.http.post<AddDistrictDataresponse>({url: apiUrl, body: districtadd});
  }

  updateDistrict(districtadd){
    let apiUrl=this.genericService.buildApiUrl(this.updateDistrictApi);
    return this.http.post<AddDistrictDataresponse>({url: apiUrl, body: districtadd});
  }
}
