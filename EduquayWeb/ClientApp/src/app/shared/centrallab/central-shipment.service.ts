import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../generic.service';
import { HttpClientService } from '../http-client.service';
import { ENDPOINT } from 'src/app/app.constant';
import { TokenService } from 'src/app/shared/token.service';


@Injectable({
  providedIn: 'root'
})
export class chcshipmentService {

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService) { }


  addShipment(obj){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.ADDSHIPMENT);
    return this.http.post<any>({url:apiUrl, body: obj });

  }
}
