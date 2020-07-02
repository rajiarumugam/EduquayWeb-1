import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { SubjectProfileResponse, ReligionResponse, GovtIDTypeResponse, CasteResponse, CommunityeResponse } from './subject-profile-response';
import { SubjectProfileRequest } from './subject-profile-request';


@Injectable({
  providedIn: 'root'
})
export class SubjectProfileService {

  subjectProfileApi: string = "api/v1/Subject/Retrieve";
  religionNameApi: string = "api/v1/WebMaster/RetrieveReligion";
  govtIdTypeApi: string = "api/v1/WebMaster/RetrieveGovIdType";
  casteApi: string = "api/v1/WebMaster/RetrieveCaste";
  communityApi: string = "api/v1/WebMaster/RetrieveCommunity";

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService
  ) { }

  getsubjectProfile(subProfile: SubjectProfileRequest){
    let apiUrl=this.genericService.buildApiUrl(this.subjectProfileApi);
    return this.http.post<SubjectProfileResponse>({url: apiUrl, body: subProfile});
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
