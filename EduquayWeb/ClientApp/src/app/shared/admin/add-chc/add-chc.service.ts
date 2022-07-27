import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddBlockResponse } from '../add-block/add-block-response';
import { AddDistrictResponse } from '../add-district/add-district-response';
import { AddChcRequest,ChcFilterRequest,UpdateChcRequest } from './add-chc-request';
import { AddChcResponse, AddChcDataresponse, AddchcbydistrictResponse } from './add-chc-response';

@Injectable({
  providedIn: 'root'
})
export class AddChcService {

  retrieveBlockApi: string = "api/v1/WebMaster/RetrieveBlockByDistrict/";
  retrieveChcApi: string = "api/v1/SA/RetrieveAllCHCs";
  retrieveCHCFilterApi: string ="api/v1/SA/RetrieveCHCFilter";
  retrieveAvdApi: string = "/api/v1/AVD/Retrieve";
  addChcApi: string = "api/v1/SA/AddNewCHC";
  updateChc: string = 'api/v1/SA/UpdateCHC';
  retrieveDistrictApi: string = "api/v1/SA/RetrieveAllDistricts";
  RetrieveTestingCHCByDistrict ="api/v1/WebMaster/RetrieveTestingCHCByDistrict/";
  updatePhcApi: string = "api/v1/SA/UpdateCHC";

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
  getCHCFilterList(chcadd:ChcFilterRequest){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveCHCFilterApi);
    return this.http.post<AddchcbydistrictResponse>({url: apiUrl, body: chcadd});
  }


  addChc(chcadd: AddChcRequest){
    let apiUrl=this.genericService.buildApiUrl(this.addChcApi);
    return this.http.post<AddChcDataresponse>({url: apiUrl, body: chcadd});
  }

 updateChcfn(chcadd: UpdateChcRequest){
  let apiUrl=this.genericService.buildApiUrl(this.updateChc);
  return this.http.post<AddChcDataresponse>({url: apiUrl, body: chcadd});

 }
  updatePhc(phcadd){
    let apiUrl=this.genericService.buildApiUrl(this.updatePhcApi);
    return this.http.post<AddChcDataresponse>({url: apiUrl, body: phcadd});
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
