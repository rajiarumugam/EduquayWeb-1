import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddDistrictResponse } from '../add-district/add-district-response';
import { AddBlockRequest } from './add-block-request';
import { AddBlockDataresponse, AddBlockResponse } from './add-block-response';

@Injectable({
  providedIn: 'root'
})
export class AddBlockService {

  retrieveBlockApi: string = "api/v1/Block/Retrieve";
  addBlockApi: string = "api/v1/Block/Add";
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

  getBlockList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveBlockApi);
    return this.http.get<AddBlockResponse>({url: apiUrl});
  }

  addBlock(blockadd: AddBlockRequest){
    let apiUrl=this.genericService.buildApiUrl(this.addBlockApi);
    return this.http.post<AddBlockDataresponse>({url: apiUrl, body: blockadd});
  }
}
