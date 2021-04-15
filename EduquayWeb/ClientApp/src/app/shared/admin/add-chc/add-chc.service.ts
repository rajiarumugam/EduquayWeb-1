import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddBlockResponse } from '../add-block/add-block-response';
import { AddDistrictResponse } from '../add-district/add-district-response';
import { AddChcRequest } from './add-chc-request';
import { AddChcResponse, AddChcDataresponse } from './add-chc-response';

@Injectable({
  providedIn: 'root'
})
export class AddChcService {

  retrieveBlockApi: string = "api/v1/Block/Retrieve";
  retrieveChcApi: string = "api/v1/SA/RetrieveAllCHCs";
  addChcApi: string = "api/v1/CHC/Add";
  retrieveDistrictApi: string = "api/v1/District/Retrieve";

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

  getChcList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveChcApi);
    return this.http.get<AddChcResponse>({url: apiUrl});
  }

  addChc(chcadd: AddChcRequest){
    let apiUrl=this.genericService.buildApiUrl(this.addChcApi);
    return this.http.post<AddChcDataresponse>({url: apiUrl, body: chcadd});
  }

  getBlocklist(code){
    //var user = JSON.parse(this.tokenService.getUser('lu'));
    //this.userId = user.id;
    let apiUrl = this.genericService.buildApiUrl(`${this.retrieveBlockApi}/${code}`);
    return this.http.get<AddBlockResponse>({url: apiUrl });
  }

}
