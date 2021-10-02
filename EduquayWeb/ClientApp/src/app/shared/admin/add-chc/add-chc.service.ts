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

  retrieveBlockApi: string = "api/v1/WebMaster/RetrieveBlockByDistrict/";
  retrieveAvdApi: string = "api/v1/SA/RetrieveAllCHCs";
  addChcApi: string = "api/v1/SA/AddNewCHC";
  retrieveDistrictApi: string = "api/v1/SA/RetrieveAllDistricts";
  RetrieveTestingCHCByDistrict ="api/v1/WebMaster/RetrieveTestingCHCByDistrict/";

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
    let apiUrl = this.genericService.buildApiUrl(this.retrieveAvdApi);
    return this.http.get<AddChcResponse>({url: apiUrl});
  }

  addChc(chcadd: AddChcRequest){
    let apiUrl=this.genericService.buildApiUrl(this.addChcApi);
    return this.http.post<AddChcDataresponse>({url: apiUrl, body: chcadd});
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
