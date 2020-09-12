import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from 'src/app/shared/generic.service';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { TokenService } from 'src/app/shared/token.service';
import { PndtMtpReferralRequest, AnmPndtMtpReferralRequest } from './pndt-mtp-referral-request';
import { AnmMtpReferralResponse, AnmPndtReferralResponse, AnmUpdatePndtMtpReferralResponse } from './pndt-mtp-referral-response';

@Injectable({
  providedIn: 'root'
})
export class PndtMtpReferralService {

  pndtReferralApi: string = "api/v1/ANMNotifications/RetrievePNDTReferal";
  mtpReferralApi: string = "api/v1/ANMNotifications/RetrieveMTPReferal";
  updatepndtReferralApi: string = 'api/v1/ANMNotifications/UpdatePNDTReferalStatus';
  updatemtpReferralApi: string = '/api/v1/ANMNotifications/UpdateMTPReferalStatus';
  userId: number;

  constructor(
    private tokenService: TokenService,
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService
  ) { }

  getPndtReferralList(userId) {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.userId = user.id;
    let apiUrl = this.genericServices.buildApiUrl(`${this.pndtReferralApi}/${userId}`);
    return this.http.get<AnmPndtReferralResponse>({ url: apiUrl });
  }  
  
  getMtpReferralList(userId) {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.userId = user.id;
    let apiUrl = this.genericServices.buildApiUrl(`${this.mtpReferralApi}/${userId}`);
    return this.http.get<AnmMtpReferralResponse>({ url: apiUrl });
  }  

  updatePndtReferral(updatepndtSamples: AnmPndtMtpReferralRequest) {
    let apiUrl = this.genericServices.buildApiUrl(this.updatepndtReferralApi);
    return this.http.post<AnmUpdatePndtMtpReferralResponse>({ url: apiUrl, body: updatepndtSamples });
  }

  updateMtpReferral(updatemtpSamples: AnmPndtMtpReferralRequest) {
    let apiUrl = this.genericServices.buildApiUrl(this.updatemtpReferralApi);
    return this.http.post<AnmUpdatePndtMtpReferralResponse>({ url: apiUrl, body: updatemtpSamples });
  }

}
