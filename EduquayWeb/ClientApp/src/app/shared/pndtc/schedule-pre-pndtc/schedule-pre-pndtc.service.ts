import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { SchedulePrePndtcRequest, AddPrePndtcScheduleRequest } from './schedule-pre-pndtc-request';
import { SchedulePrePndtcResponse, AddPrePndtcScheduleResponse, ScheduledPrePndtcResponse } from './schedule-pre-pndtc-response';

@Injectable({
  providedIn: 'root'
})
export class SchedulePrePndtcService {

  retrieveprepndtSchedulingApi: string = "api/v1/PNDTC/RetrievePrePNDTScheduling";
  addprepndtScheduleApi: string = "api/v1/PNDTC/ADDPrePNDTScheduling";
  retrieveprepndtScheduledApi: string = "api/v1/PNDTC/RetrievePrePNDTScheduled";

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getschedulingLists(schedulingList: SchedulePrePndtcRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.retrieveprepndtSchedulingApi);
    return this.http.post<SchedulePrePndtcResponse>({url: apiUrl, body: schedulingList});
  }

  Addschedule(addSchedule: AddPrePndtcScheduleRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.addprepndtScheduleApi);
    return this.http.post<AddPrePndtcScheduleResponse>({url: apiUrl, body: addSchedule});
  }

  getscheduledLists(schedulingList: SchedulePrePndtcRequest){
    let apiUrl=this.genericServices.buildApiUrl(this.retrieveprepndtScheduledApi);
    return this.http.post<ScheduledPrePndtcResponse>({url: apiUrl, body: schedulingList});
  }
}
