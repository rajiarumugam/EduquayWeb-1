import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { ChcSampleShipmentlogResponse } from './chc-sample-shipmentlog-response';

@Injectable({
  providedIn: 'root'
})
export class ChcSampleShipmentlogService {

  chcsampleShipmentLogApi: string = 'api/v1/CHCReceiptProcessing/RetrieveShipmentLog';

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getshipmentLog(chcId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericServices.buildApiUrl(`${this.chcsampleShipmentLogApi}/${chcId}`);
    return this.http.get<ChcSampleShipmentlogResponse>({url: apiUrl });
  }
}
