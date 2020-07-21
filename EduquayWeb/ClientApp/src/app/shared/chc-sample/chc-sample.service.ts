import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../generic.service';
import { HttpClientService } from '../http-client.service';
import { ENDPOINT } from 'src/app/app.constant';


@Injectable({
  providedIn: 'root'
})
export class chcsampleService {

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService) { }

  addCBCtest(obj){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CHC_SAMPLE_REC.ADDCBCTEST);
    return this.http.post<any>({url:apiUrl, body: obj });

  }

  addSSTtest(obj){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CHC_SAMPLE_REC.ADDSSTTEST);
    return this.http.post<any>({url:apiUrl, body: obj });

  }

}
