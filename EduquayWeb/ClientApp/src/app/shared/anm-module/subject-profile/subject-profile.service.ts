import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { SubjectProfileResponse, ReligionResponse, GovtIDTypeResponse, CasteResponse, CommunityeResponse, RetrieveSubjectProfileList } from './subject-profile-response';
import { SubjectProfileRequest, ParticularSubjectProfileRequest } from './subject-profile-request';
import { TokenService } from '../../token.service';


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

  userId: number;

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getparticularanmSubjectProfileList(anmparticularsubProfile: ParticularSubjectProfileRequest){
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

}
