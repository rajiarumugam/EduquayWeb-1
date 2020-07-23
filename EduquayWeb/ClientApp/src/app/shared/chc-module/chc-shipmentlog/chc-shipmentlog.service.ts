import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { ChcShipmentlogRequest } from './chc-shipmentlog-request';
import { ChcShipmentlogResponse } from './chc-shipmentlog-response';

@Injectable({
  providedIn: 'root'
})
export class ChcShipmentlogService {

  chcshipmentLogApi: string = 'api/v1/ANMCHCShipment/RetrieveCHCShipmentLog';

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService
  ) { }

  getchcshipmentLog(shipmentLog: ChcShipmentlogRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.chcshipmentLogApi);
    return this.http.post<ChcShipmentlogResponse>({url: apiUrl, body: shipmentLog});
  }
}
