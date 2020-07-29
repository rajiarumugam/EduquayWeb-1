import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { ChcPositiveSubjectRequest } from './chc-positive-subject-request';
import { ChcPositiveSubjectResponse } from './chc-positive-subject-response';

@Injectable({
  providedIn: 'root'
})
export class ChcPositiveSubjectService {

  chcpositiveSubjectsListApi: string = "api/CHCNotifications/RetrieveHPLCPositiveSubjects";
  userId: number;

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getChcPositiveSubject(chcpositivesubject: ChcPositiveSubjectRequest){
    let apiUrl = this.genericServices.buildApiUrl(this.chcpositiveSubjectsListApi);
    return this.http.post<ChcPositiveSubjectResponse>({url:apiUrl, body: chcpositivesubject });
  }
}
