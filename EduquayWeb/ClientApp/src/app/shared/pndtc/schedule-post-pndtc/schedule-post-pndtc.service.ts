import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { SchedulePostPndtcRequest, AddPostPndtcScheduleRequest } from './schedule-post-pndtc-request';
import { SchedulePostPndtcResponse, AddPostPndtcScheduleResponse, ScheduledPostPndtcResponse } from './schedule-post-pndtc-response';

@Injectable({
  providedIn: 'root'
})
export class SchedulePostPndtcService {

  retrievepostpndtSchedulingApi: string = "api/v1/PNDTC/RetrievePostPNDTScheduling";
  addpostpndtScheduleApi: string = "api/v1/PNDTC/ADDPostPNDTScheduling";
  retrievepostpndtScheduledApi: string = "api/v1/PNDTC/RetrievePostPNDTScheduled";

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getschedulingLists(schedulingList: SchedulePostPndtcRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.retrievepostpndtSchedulingApi);
    return this.http.post<SchedulePostPndtcResponse>({url: apiUrl, body: schedulingList});
  }

  Addschedule(addSchedule:AddPostPndtcScheduleRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.addpostpndtScheduleApi);
    return this.http.post<AddPostPndtcScheduleResponse>({url: apiUrl, body: addSchedule});
  }

  getscheduledLists(schedulingList: SchedulePostPndtcRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.retrievepostpndtScheduledApi);
    return this.http.post<ScheduledPostPndtcResponse>({url: apiUrl, body: schedulingList});
  }
}
