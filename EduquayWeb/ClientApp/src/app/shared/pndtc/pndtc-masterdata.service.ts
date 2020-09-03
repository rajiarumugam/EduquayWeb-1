import { Injectable, OnInit } from '@angular/core';
import { HttpClientService } from './../http-client.service';
import { Observable } from 'rxjs'
import { GenericService } from './../generic.service';
import { ENDPOINT } from './../../app.constant';
import { TokenService } from 'src/app/shared/token.service';


@Injectable({
  providedIn: 'root'
})
export class PNDTCmasterService {
  user;
  

  constructor(private _http: HttpClientService, private genericService: GenericService, private tokenService: TokenService) {

   }

  
  getPNDTCDistrict(): Observable<any> {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.PNDTMASTER.RETRIVEALLDISTRICT);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }
  getDistrictBasedCHC(district): Observable<any> {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.PNDTMASTER.RETRIVECHCBASEDDISTRICT+district);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }
  getCHCBasedPHC(chc): Observable<any> {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.PNDTMASTER.RETRIVEPHCBASEDPHC+chc);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getPHCBasedANM(phc): Observable<any> {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.PNDTMASTER.RETRIVEPHCBASEDANM+phc);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getProcedureOfTesting(): Observable<any> {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.PNDTMASTER.RETRIVEPROCEDUREOFTESTING);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getComplecations(): Observable<any> {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.PNDTMASTER.RETRIVEPNDTCCOMPLECATIONS);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getPNDTCDiagnosis(): Observable<any> {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.PNDTMASTER.RETRIVEPNDTCDIAGNOSIS);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  getPNDTCResult(): Observable<any> {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.PNDTMASTER.RETRIVEPNDTRESULT);
    return this._http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }
  
}
