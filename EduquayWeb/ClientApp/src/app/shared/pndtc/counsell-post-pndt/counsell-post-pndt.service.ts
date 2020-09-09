import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { CounsellPostPndtRequest, AddPostPndtCounsellingRequest } from './counsell-post-pndt-request';
import { CounsellPostPndtResponse, AddPostPndtcCounsellingResponse, CounselledpostpndtResponse } from './counsell-post-pndt-response';
import { AddPrePndtcCounsellingResponse } from '../counsell-pre-pndt/counsell-pre-pndt-response';

@Injectable({
  providedIn: 'root'
})
export class CounsellPostPndtService {

  retrievepostpndtCounsellingApi: string = "api/v1/PNDTC/RetrievePostPNDTCounselling";
  addpostpndtCounsellingeApi: string = "api/v1/PNDTC/ADDPostPNDTCounselling";
  retrievepostpndtCounselledYesApi: string ="api/v1/PNDTC/RetrievePostPNDTCounselledYes";
  retrievepostpndtCounselledNoApi: string ="api/v1/PNDTC/RetrievePostPNDTCounselledNo";
  retrievepostpndtCounselledPendingApi: string ="api/v1/PNDTC/RetrievePostPNDTCounselledPending";

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getcounsellingLists(counsellingList: CounsellPostPndtRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.retrievepostpndtCounsellingApi);
    return this.http.post<CounsellPostPndtResponse>({url: apiUrl, body: counsellingList});
  }

  AddpostpndtCounselling(addCounselling: AddPostPndtCounsellingRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.addpostpndtCounsellingeApi);
    return this.http.post<AddPostPndtcCounsellingResponse>({url: apiUrl, body: addCounselling});
  }

  getcounselledYesLists(counselledYesList: CounsellPostPndtRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.retrievepostpndtCounselledYesApi);
    return this.http.post<CounselledpostpndtResponse>({url: apiUrl, body: counselledYesList});
  }

  getcounselledNoLists(counselledNoList: CounsellPostPndtRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.retrievepostpndtCounselledNoApi);
    return this.http.post<CounselledpostpndtResponse>({url: apiUrl, body: counselledNoList});
  }

  getcounselledPendingLists(counselledPendingList: CounsellPostPndtRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.retrievepostpndtCounselledPendingApi);
    return this.http.post<CounselledpostpndtResponse>({url: apiUrl, body: counselledPendingList});
  }
}
