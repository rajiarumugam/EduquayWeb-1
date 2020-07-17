import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { PositiveSubjectsResponse, UpdatePositiveSubjectsResponse } from './positive-subjects-response';
import { PositiveSubjectsRequest } from './positive-subjects-request';

@Injectable({
  providedIn: 'root'
})
export class PositiveSubjectsService {

  positiveSubjectsListApi: string = "api/v1/ANMNotifications/RetrieveHPLCPositiveSubjects";
  updatepositivesubjectApi: string = "api/v1/ANMNotifications/UpdatePositiveSubjectStatus";
  userId: number;

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getPositiveSubject(userId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.userId = user.id;
    let apiUrl = this.genericServices.buildApiUrl(`${this.positiveSubjectsListApi}/${userId}`);
    return this.http.get<PositiveSubjectsResponse>({url: apiUrl });
  }

  updatePositiveSubject(updatepositivesubject: PositiveSubjectsRequest){
    let apiUrl = this.genericServices.buildApiUrl(this.updatepositivesubjectApi);
    return this.http.post<UpdatePositiveSubjectsResponse>({url:apiUrl, body: updatepositivesubject });
  }
}
