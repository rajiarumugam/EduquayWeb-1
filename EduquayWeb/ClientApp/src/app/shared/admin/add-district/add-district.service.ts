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

  retrieveDistrictApi: string = "api/v1/District/Retrieve";
  addDistrictApi: string = "api/v1/District/Add";
  retrieveStateApi: string = "api/v1/State/Retrieve";

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

  addDistrict(districtadd: AddDistrictRequest){
    let apiUrl=this.genericService.buildApiUrl(this.addDistrictApi);
    return this.http.post<AddDistrictDataresponse>({url: apiUrl, body: districtadd});
  }
}
