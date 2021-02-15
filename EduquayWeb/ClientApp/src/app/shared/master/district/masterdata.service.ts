import { Injectable, OnInit } from '@angular/core';
import { HttpClientService } from '../../http-client.service';
import { Observable } from 'rxjs'
import { District, DistrictResponse } from './district.model';
import { GenericService } from '../../generic.service';
import { ENDPOINT } from '../../../app.constant';
import { TokenService } from 'src/app/shared/token.service';


@Injectable({
  providedIn: 'root'
})
export class masterService {
  user;
  

  constructor(private _http: HttpClientService, private genericService: GenericService, private tokenService: TokenService) {

   }

  
  getuserBasedDistrict(): Observable<DistrictResponse> {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVEDISTRICT+this.user.id);
    return this._http
      .getCached<DistrictResponse>({ url: apiUrl, cacheMins: 100 });
  }
  getuserBasedCHC(): Observable<any> {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVECHC+this.user.id);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }
  getuserBasedPHC(): Observable<any> {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVEPHC+this.user.id);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getuserBasedSC(): Observable<any> {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVESC+this.user.id);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getuserBasedRI(): Observable<any> {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVERI+this.user.id);
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


  getCommunityPerCaste(caste): Observable<any> {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVECOMMUNITY+"/"+caste);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getGovernmentTypeId(): Observable<any> {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVE_GOV_ID_TYPE);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getAssociatedANM(chcid)
  {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVE_ASSOCIATED_ANM+chcid);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getState()
  {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIVESTATE);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getClinicalDiagnosis()
  {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIVECLINICALDIAGNOSIS);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getMolecularResults()
  {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIVEMOLECULARRESULT);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  

  retriveMocularLab(): Observable<any> {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVEMOLECULARLAB+this.user.centralLabId);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  retriveANM(): Observable<any> {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var _userRi = this.user.riId.split(',')[0];
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIVEANM+_userRi);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }
  getCHCBasedRI(): Observable<any> {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIVERIBYCHC+this.user.chcId);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }
  retriveReceivingMocularLab(): Observable<any> {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MASTER.RETRIEVEMOLECULARLAB+1);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }
}
