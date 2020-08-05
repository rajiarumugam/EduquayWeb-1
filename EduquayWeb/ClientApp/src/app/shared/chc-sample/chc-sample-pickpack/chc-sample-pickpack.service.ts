import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { ChcSamplePickpackResponse } from './chc-sample-pickpack-response';

@Injectable({
  providedIn: 'root'
})
export class ChcSamplePickpackService {

  chcSamplePickPackApi: string = "api/v1/CHCReceiptProcessing/RetrievePickandPack";

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getsamplePickpackChc(chcId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(`${this.chcSamplePickPackApi}/${user.chcId}`);
    return this.http.get<ChcSamplePickpackResponse>({url: apiUrl });
  }
}
