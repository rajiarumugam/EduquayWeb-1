import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { SubjectProfileResponse, ReligionResponse, GovtIDTypeResponse, CasteResponse, CommunityeResponse, RetrieveSubjectProfileList, AddSubjectProfileResponse, trackingANWSubjectResponse, trackingSubjectResponse } from './subject-profile-response';
import { SubjectProfileRequest, ParticularSubjectProfileRequest, AddSubjectprofileRequest, anmSubjectTrackerRequest, subjectTrackerRequest } from './subject-profile-request';
import { TokenService } from '../../token.service';
import { ENDPOINT } from '../../../app.constant';


@Injectable({
  providedIn: 'root'
})
export class SubjectProfileService {

  subjectProfileApi: string = "api/v1/Subject/Retrieve";
  religionNameApi: string = "api/v1/WebMaster/RetrieveReligion";
  govtIdTypeApi: string = "api/v1/WebMaster/RetrieveGovIdType";
  casteApi: string = "api/v1/WebMaster/RetrieveCaste";
  communityApi: string = "api/v1/WebMaster/RetrieveCommunity";
  subjectprofileListApi: string = "api/v1/Subject/RetrieveSubjectList";
  chcsubjectprofileListApi: string = "api/v1/Subject/RetrieveCHCSubjectList";
  chcparticularSubProfile: string = "api/v1/Subject/RetrieveParticularCHCSubjectList";
  anmparticularSubProfile: string = "api/v1/Subject/RetrieveParticularSubjectList";
  addSubjectProfileApi: string = "api/v1/Subject/Add";
  trackingANWSubject:string = "api/v1/Reports/TrackingANWSubject";
  trackingSubject: string = "api/v1/Reports/TrackingSubject"

  userId: number;

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getparticularanmSubjectProfileList(anmparticularsubProfile){
    let apiUrl = this.genericService.buildApiUrl(this.anmparticularSubProfile);
    return this.http.post<RetrieveSubjectProfileList>({url: apiUrl, body: anmparticularsubProfile});
  }

  getSubjectProfileList(chcsubProfileList: SubjectProfileRequest){
    let apiUrl = this.genericService.buildApiUrl(this.subjectprofileListApi);
    return this.http.post<RetrieveSubjectProfileList>({url: apiUrl, body: chcsubProfileList});
  }

  getchcSubjectProfileList(chcsubProfileList: SubjectProfileRequest){
    let apiUrl = this.genericService.buildApiUrl(this.chcsubjectprofileListApi);
    return this.http.post<RetrieveSubjectProfileList>({url: apiUrl, body: chcsubProfileList});
  }

  getparticularchcSubjectProfileList(chcparticularsubProfile: ParticularSubjectProfileRequest){
    let apiUrl = this.genericService.buildApiUrl(this.chcparticularSubProfile);
    return this.http.post<RetrieveSubjectProfileList>({url: apiUrl, body: chcparticularsubProfile});
  }

  getReligion(){
    let apiUrl = this.genericService.buildApiUrl(this.religionNameApi);
    return this.http.get<ReligionResponse>({url:apiUrl});
  }

  getGovtIdType(){
    let apiUrl = this.genericService.buildApiUrl(this.govtIdTypeApi);
    return this.http.get<GovtIDTypeResponse>({url:apiUrl});
  }

  getCaste(){
    let apiUrl = this.genericService.buildApiUrl(this.casteApi);
    return this.http.get<CasteResponse>({url:apiUrl});
  }

  getCommunnity(code){
    let apiUrl = this.genericService.buildApiUrl(`${this.communityApi}/${code}`);
    return this.http.get<CommunityeResponse>({url: apiUrl });
  }

  addSubjectProfile(chcaddsubProfile: AddSubjectprofileRequest){
    let apiUrl = this.genericService.buildApiUrl(this.addSubjectProfileApi);
    return this.http.post<AddSubjectProfileResponse>({url: apiUrl, body: chcaddsubProfile});
  }

  getTrackingANWSubject(anwTracker: anmSubjectTrackerRequest){
    let apiUrl = this.genericService.buildApiUrl(this.trackingANWSubject);
    return this.http.post<trackingANWSubjectResponse>({url: apiUrl, body: anwTracker});
  }

  getTrackingSubject(subjectTracker: subjectTrackerRequest){
    let apiUrl = this.genericService.buildApiUrl(this.trackingSubject);
    return this.http.post<trackingSubjectResponse>({url: apiUrl, body: subjectTracker});
  }


  getNHMReportList(postData){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.NHM.GETNHMREPORTS);
    return this.http.post<RetrieveSubjectProfileList>({url: apiUrl, body: postData});
  }

  getCHCReceiptReportsDetail(postData){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.NHM.CHCRECEIPTREPORTSDETAIL);
    return this.http.post<RetrieveSubjectProfileList>({url: apiUrl, body: postData});
  }

  getCLReceiptReportsDetail(postData){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.NHM.CLRECEIPTREPORTSDETAIL);
    return this.http.post<RetrieveSubjectProfileList>({url: apiUrl, body: postData});
  }


  getANMReportList(postData){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.REPORTS.ANMREPORTDETAIL);
    return this.http.post<RetrieveSubjectProfileList>({url: apiUrl, body: postData});
  }

  getPNDTReportList(postData){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.REPORTS.PNDTREPORTDETAIL);
    return this.http.post<RetrieveSubjectProfileList>({url: apiUrl, body: postData});
  }

  getMTPReportList(postData){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.REPORTS.MTPReportsDetail);
    return this.http.post<RetrieveSubjectProfileList>({url: apiUrl, body: postData});
  }

  getCHCReportList(postData){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.REPORTS.CHCREPORTSDETAIL);
    return this.http.post<RetrieveSubjectProfileList>({url: apiUrl, body: postData});
  }
  getparticularanmSCHC(anmparticularsubProfile){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.REPORTS.RETRIVEPARTICULARCHC);
    return this.http.post<RetrieveSubjectProfileList>({url: apiUrl, body: anmparticularsubProfile});
  }
  getPathoReportList(postData){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.REPORTS.RETRIVEPARTICULARPATHOLOGIST);
    return this.http.post<RetrieveSubjectProfileList>({url: apiUrl, body: postData});
  }
}
