import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { GenericService } from 'src/app/shared/generic.service';
import { ENDPOINT } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class MTPService {

  constructor(
    private httpClient: HttpClientService,
    private genericService: GenericService
    ) { }


  getPedingDetails(subjectObj){
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MTP.RETRIVEMTPPENDING);
    return this.httpClient.post<any>( {url:apiUrl, body: subjectObj});
  }

  getnotCompleteDetails(subjectObj){
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MTP.RETRIVEMTPCOMPLETED);
    return this.httpClient.post<any>( {url:apiUrl, body: subjectObj});
  }

  postMTPTest(subjectObj){
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MTP.ADDMTPTEST);
    return this.httpClient.post<any>( {url:apiUrl, body: subjectObj});
  }

  getMTPSummary(){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.MTP.RETRIVEMTPSUMMARY);
    return this.httpClient.get<any>({url:apiUrl });
  }
}
