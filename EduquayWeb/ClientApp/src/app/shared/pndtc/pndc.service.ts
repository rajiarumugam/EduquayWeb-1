import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { GenericService } from 'src/app/shared/generic.service';
import { ENDPOINT } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class PNDCService {

  constructor(
    private httpClient: HttpClientService,
    private genericService: GenericService
    ) { }


  getPedingDetails(subjectObj){
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.PNDT.RETRIVEPNDTPENDING);
    return this.httpClient.post<any>( {url:apiUrl, body: subjectObj});
  }

  getnotCompleteDetails(subjectObj){
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.PNDT.RETRIVEPNDTCOMPLETEDSUMMARY);
    return this.httpClient.post<any>( {url:apiUrl, body: subjectObj});
  }

  postPNDTest(subjectObj){
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.PNDT.ADDPNDTEST);
    return this.httpClient.post<any>( {url:apiUrl, body: subjectObj});
  }
}
