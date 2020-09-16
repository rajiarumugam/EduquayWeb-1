import { Injectable } from '@angular/core';
import { TokenService } from '../token.service';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../generic.service';
import { HttpClientService } from '../http-client.service';
import { DcNotificationResponse, dcUpdateSamples, dcPositiveSubjectsResponse, dcpndtReferralResponse, dcmtpReferralResponse, DcUpdatePndtMtpReferralResponse, dcpostMTPResponse, DcUpdatePostMTPResponse } from './dc-notification-response';
import { DcNotificationRequest, DcPndtMtpReferralRequest, DcPostMTPRequest } from './dc-notification-request';

@Injectable({
  providedIn: 'root'
})
export class DistrictCoordinatorService {

  damagedSampleApi: string = "api/v1/DistrictCoordinator/RetrieveDamagedSamples";
  unsentSampleApi: string = "api/v1/DistrictCoordinator/RetrieveUnsentSamples";
  timeoutSampleApi: string = "api/v1/DistrictCoordinator/RetrieveTimeoutExpirySamples";
  positiveSubjectApi: string = "api/v1/DistrictCoordinator/RetrievePositiveSubjectSamples";
  pndtReferralApi: string = "api/v1/DistrictCoordinator/RetrievePNDTReferal";
  mtpReferralApi: string = "api/v1/DistrictCoordinator/RetrieveMTPReferal";
  postMTPApi: string = "api/v1/DistrictCoordinator/RetrievePostMTPFollowUp";
  updateSampleStatusApi: string = "api/v1/DistrictCoordinator/UpdateSamplesStatus";
  updatePositiveStatusApi: string = "api/v1/DistrictCoordinator/UpdatePositiveSubjectStatus";
  updatePndtReferralApi: string = "api/v1/DistrictCoordinator/UpdatePNDTReferalStatus";
  updateMtpReferralApi: string = "api/v1/DistrictCoordinator/UpdateMTPReferalStatus";
  updatePostMTPApi: string = "api/v1/DistrictCoordinator/UpdatePostMTPFollowupStatus"

  districtId: number;

  constructor(
    private tokenService: TokenService,
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService
  ) { }

  getdamagedSampleList(districtId) {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.districtId = user.districtId;
    let apiUrl = this.genericServices.buildApiUrl(`${this.damagedSampleApi}/${districtId}`);
    return this.http.get<DcNotificationResponse>({ url: apiUrl });
  }

  gettimeoutSampleList(districtId) {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.districtId = user.districtId;
    let apiUrl = this.genericServices.buildApiUrl(`${this.timeoutSampleApi}/${districtId}`);
    return this.http.get<DcNotificationResponse>({ url: apiUrl });
  }

  getunsentSampleList(districtId) {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.districtId = user.districtId;
    let apiUrl = this.genericServices.buildApiUrl(`${this.unsentSampleApi}/${districtId}`);
    return this.http.get<DcNotificationResponse>({ url: apiUrl });
  }

  getpositiveSubjectList(districtId) {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.districtId = user.districtId;
    let apiUrl = this.genericServices.buildApiUrl(`${this.positiveSubjectApi}/${districtId}`);
    return this.http.get<dcPositiveSubjectsResponse>({ url: apiUrl });
  }

  getpndtReferral(districtId) {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.districtId = user.districtId;
    let apiUrl = this.genericServices.buildApiUrl(`${this.pndtReferralApi}/${districtId}`);
    return this.http.get<dcpndtReferralResponse>({ url: apiUrl });
  }

  getmtpReferral(districtId) {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.districtId = user.districtId;
    let apiUrl = this.genericServices.buildApiUrl(`${this.mtpReferralApi}/${districtId}`);
    return this.http.get<dcmtpReferralResponse>({ url: apiUrl });
  }

  getPostMtp(districtId) {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.districtId = user.districtId;
    let apiUrl = this.genericServices.buildApiUrl(`${this.postMTPApi}/${districtId}`);
    return this.http.get<dcpostMTPResponse>({ url: apiUrl });
  }

  updateSelectedSamples(updateSamples: DcNotificationRequest) {
    let apiUrl = this.genericServices.buildApiUrl(this.updateSampleStatusApi);
    return this.http.post<dcUpdateSamples>({ url: apiUrl, body: updateSamples });
  }

  updatepositivSubjects(updateSamples: DcNotificationRequest) {
    let apiUrl = this.genericServices.buildApiUrl(this.updatePositiveStatusApi);
    return this.http.post<dcUpdateSamples>({ url: apiUrl, body: updateSamples });
  }

  updatePndtReferral(updateSamples: DcPndtMtpReferralRequest) {
    let apiUrl = this.genericServices.buildApiUrl(this.updatePndtReferralApi);
    return this.http.post<DcUpdatePndtMtpReferralResponse>({ url: apiUrl, body: updateSamples });
  }

  updateMtpReferral(updateSamples: DcPndtMtpReferralRequest) {
    let apiUrl = this.genericServices.buildApiUrl(this.updateMtpReferralApi);
    return this.http.post<DcUpdatePndtMtpReferralResponse>({ url: apiUrl, body: updateSamples });
  }

  updatePostMTP(updateSamples: DcPostMTPRequest) {
    let apiUrl = this.genericServices.buildApiUrl(this.updatePostMTPApi);
    return this.http.post<DcUpdatePostMTPResponse>({ url: apiUrl, body: updateSamples });
  }

}
