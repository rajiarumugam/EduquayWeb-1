import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { PndtMtpMasterResponse } from './pndt-mtp-master-response';

@Injectable({
  providedIn: 'root'
})
export class PndtMtpMasterService {

  districtApi: string = "api/v1/PNDTMTPMaster/RetrieveDistrict";
  chcApi: string = "api/v1/PNDTMTPMaster/RetrieveCHC";
  phcApi: string = "api/v1/PNDTMTPMaster/RetrievePHC";
  anmApi: string = "api/v1/PNDTMTPMaster/RetrieveANM";
  counsellornameApi: string = "api/v1/PNDTMTPMaster/RetrieveCounsellor";

  userId: number;

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getDistrict(userId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.userId = user.id;
    let apiUrl = this.genericServices.buildApiUrl(`${this.districtApi}/${userId}`);
    return this.http.get<PndtMtpMasterResponse>({url: apiUrl });
  }

  getChc(id){
    let apiUrl = this.genericServices.buildApiUrl(`${this.chcApi}/${id}`);
    return this.http.get<PndtMtpMasterResponse>({url: apiUrl });
  }

  getPhc(id){
    let apiUrl = this.genericServices.buildApiUrl(`${this.phcApi}/${id}`);
    return this.http.get<PndtMtpMasterResponse>({url: apiUrl });
  }

  getAnm(id){
    let apiUrl = this.genericServices.buildApiUrl(`${this.anmApi}/${id}`);
    return this.http.get<PndtMtpMasterResponse>({url: apiUrl });
  }

  getCounsellorName(){
    let apiUrl = this.genericServices.buildApiUrl(this.counsellornameApi);
    return this.http.get<PndtMtpMasterResponse>({url: apiUrl });
  }

}
