import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { PicknpackRequest } from './picknpack-request';
import { PicknpackResponse } from './picknpack-response';

@Injectable({
  providedIn: 'root'
})
export class PicknpackService {

  pickandpackListApi: string = "api/v1/ANMCHCPickandPack/Retrieve";
  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService
  ) { }

  getpickandpackList(pnpList: PicknpackRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.pickandpackListApi);
    return this.http.post<PicknpackResponse>({url: apiUrl, body: pnpList});
  }
}
