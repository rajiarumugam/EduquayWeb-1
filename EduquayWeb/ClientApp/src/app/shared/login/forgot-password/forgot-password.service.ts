import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { ForgotPasswordRequest } from './forgot-password-request';
import { ForgotPasswordResponse } from './forgot-password-response';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  sendotpApi: string = "api/v1/UserIdentity/SendOTP";
  validateotpApi: string = "api/v1/UserIdentity/ValidateOTP";
  resetpasswordApi: string = "api/v1/UserIdentity/ChangePassword";

  constructor(
    private tokenService: TokenService,
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService
  ) { }

  sendotp(sendotp: ForgotPasswordRequest): Observable<any>{
    let httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
      'No-Auth': 'True',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    let apiUrl = this.genericService.buildApiUrl(this.sendotpApi);
    return this.httpClient.post<ForgotPasswordResponse>(apiUrl, sendotp, options);
    // return this.httpClient.post<ForgotPasswordResponse>({apiUrl, sendotp, options});
  }
}
