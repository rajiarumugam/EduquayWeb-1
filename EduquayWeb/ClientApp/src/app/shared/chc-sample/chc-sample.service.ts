import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../generic.service';
import { HttpClientService } from '../http-client.service';
import { ENDPOINT } from 'src/app/app.constant';
import { TokenService } from 'src/app/shared/token.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class chcsampleService {

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService) { }

  retriveCHCReceipt()
  {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CHC_SAMPLE_REC.RETRIVECHCRECEIPT+user.chcId);
    return this.http.get<any>( {url:apiUrl});
  }
  

  addCBCtest(obj){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CHC_SAMPLE_REC.ADDCBCTEST);
    return this.http.post<any>({url:apiUrl, body: obj });

  }

  addSSTtest(obj){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CHC_SAMPLE_REC.ADDSSTTEST);
    return this.http.post<any>({url:apiUrl, body: obj });

  }

  getCHCSampleReport(subjectObj){
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.CHC_SAMPLE_REC.RETRIVECHCSAMPLEREPORT);
    return this.http.post<any>( {url:apiUrl, body: subjectObj});
  }

  getSampleStatus(): Observable<any> {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.CHC_SAMPLE_REC.RETRIVECHCSAMPLESTATUS);
    return this.http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  addCHCtestData(obj){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CHC_SAMPLE_REC.ADDCHCTESTRESULT);
    return this.http.post<any>({url:apiUrl, body: obj });

  }
  retriveCHCtestData()
  {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CHC_SAMPLE_REC.RETRIVECBCTEST+user.chcId);
    return this.http.get<any>( {url:apiUrl});
  }
}
