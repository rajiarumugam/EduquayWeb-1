import { Injectable } from '@angular/core';
import { HttpClientService } from '../../http-client.service';
import { Observable } from 'rxjs'
import { District, DistrictResponse } from './district.model';
import { GenericService } from '../../generic.service';
import { ENDPOINT } from '../../../app.constant';


@Injectable({
  providedIn: 'root'
})
export class masterService {
  districtendpoint: string = "";
  chcendpoint: string = "api/v1/WebMaster/RetrieveDistrict/";
  phcendpoint: string = "api/v1/WebMaster/RetrieveDistrict/";
  reendpoint: string = "api/v1/WebMaster/RetrieveDistrict/";
  userId = 1;
  constructor(private _http: HttpClientService, private genericService: GenericService) { }

  
  getuserBasedDistrict(): Observable<DistrictResponse> {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVEDISTRICT+this.userId);
    return this._http
      .getCached<DistrictResponse>({ url: apiUrl, cacheMins: 100 });
  }
  getuserBasedCHC(): Observable<any> {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVECHC+this.userId);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }
  getuserBasedPHC(): Observable<any> {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVEPHC+this.userId);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getuserBasedSC(): Observable<any> {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVESC+this.userId);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getuserBasedRI(): Observable<any> {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVERI+this.userId);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getReligion(): Observable<any> {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVERELIGION);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getCaste(): Observable<any> {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVECASTE);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getCommunity(): Observable<any> {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVECOMMUNITY);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getGovernmentTypeId(): Observable<any> {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVE_GOV_ID_TYPE);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }


}
