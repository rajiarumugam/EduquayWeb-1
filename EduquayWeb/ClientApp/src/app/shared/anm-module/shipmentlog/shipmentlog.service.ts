import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { ShipmentRequest } from './shipment-request';
import { ShipmentResponse } from './shipment-response';

@Injectable({
  providedIn: 'root'
})
export class ShipmentlogService {

  shipmentLogApi: string = 'api/v1/ANMCHCShipment/RetrieveANMShipmentLog';
  constructor(

    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService

  ) { }

  getshipmentLog(shipmentLog: ShipmentRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.shipmentLogApi);
    return this.http.post<ShipmentResponse>({url: apiUrl, body: shipmentLog});
  }
}
