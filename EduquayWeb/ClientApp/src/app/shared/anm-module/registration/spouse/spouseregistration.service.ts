import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { GenericService } from 'src/app/shared/generic.service';
import { ENDPOINT } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class SpouseregistrationService {

  constructor(
    private httpClient: HttpClientService,
    private genericService: GenericService
    ) { }


  spouseDetails(subjectObj){
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.SUBJECT.RETRIVE);
    return this.httpClient.post<any>( {url:apiUrl, body: subjectObj});
  }
}
