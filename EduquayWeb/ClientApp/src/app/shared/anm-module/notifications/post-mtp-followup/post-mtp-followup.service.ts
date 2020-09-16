import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from 'src/app/shared/generic.service';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { TokenService } from 'src/app/shared/token.service';
import { PostMtpFollowupRequest } from './post-mtp-followup-request';
import { PostMtpFollowupResponse, UpdatePostMtpFollowupResponse } from './post-mtp-followup-response';

@Injectable({
  providedIn: 'root'
})
export class PostMtpFollowupService {

  postMTPApi: string = "api/v1/ANMNotifications/RetrievePostMTPFollowUp";
  updatepostMTPApi: string = 'api/v1/ANMNotifications/UpdateMTPFollowUpStatus';

  userId: number;

  constructor(
    private tokenService: TokenService,
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService
  ) { }

  getpostMTPList(userId) {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.userId = user.id;
    let apiUrl = this.genericServices.buildApiUrl(`${this.postMTPApi}/${userId}`);
    return this.http.get<PostMtpFollowupResponse>({ url: apiUrl });
  } 
  
  updatepostMtpReferral(updatemtpSamples: PostMtpFollowupRequest) {
    let apiUrl = this.genericServices.buildApiUrl(this.updatepostMTPApi);
    return this.http.post<UpdatePostMtpFollowupResponse>({ url: apiUrl, body: updatemtpSamples });
  }
}
