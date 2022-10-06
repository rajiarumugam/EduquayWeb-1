import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GenericService } from '../generic.service';
import { HttpClientService } from '../http-client.service';
import { ENDPOINT } from 'src/app/app.constant';
import { TokenService } from 'src/app/shared/token.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class centralsampleService {

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService) { }

  retriveCentralReceipt()
  {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.RETRIVECENTRALLABRECEIPT+user.centralLabId);
    return this.http.get<any>( {url:apiUrl});
  }

  retriveCentralReceiptMaldi()
  {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.RETRIVEMALDIRECEIPT+user.centralLabId);
    return this.http.get<any>( {url:apiUrl});
  }
  retriveCentralReceiptMaldiHPLC()
  {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.RETRIVEMALDIRECEIPTHPLC+user.centralLabId);
    return this.http.get<any>( {url:apiUrl});
  }

  addHSBCtest(obj)
  {
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.ADDHPLCTEST);
    return this.http.post<any>({url:apiUrl, body: obj });
  }

  getCentralLabReport(subjectObj){
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.RETRIVECENTRALLABREPORT);
    return this.http.post<any>( {url:apiUrl, body: subjectObj});
  }
  addDbsSpottingTime(obj){
    var apiUrl=this.genericService.buildApiUrl('api/v1/CHCReceiptProcessing/AddDBSSpotting')
    return this.http.post<any>({url:apiUrl,body:obj})

  }


  getSampleStatus(): Observable<any> {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.RETRIVECENTRALLABSAMPLESTATUS);
    return this.http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }

  addHSBCtestNew(obj)
  {
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.ADDHPLCTETRESULT);
    return this.http.post<any>({url:apiUrl, body: obj });
  }

  updateHSBCtest(obj)
  {
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.UPDATEHPLCTESTRESULT);
    return this.http.post<any>({url:apiUrl, body: obj });
  }

  updateHSBCtestInCLReport(obj)
  {
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.UPDATEPROCESSEDHPLCTESTRESULT);
    return this.http.post<any>({url:apiUrl, body: obj});
  }

  downloadHPLCGraph(obj)
  {

   
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.DOWNLOADHPLCGRAPH+obj.fileName);
   return this.http.get<any>({url:apiUrl});
    /*return this.httpClient.post(apiUrl, obj, options);*/
    
  }

  retriveHPLCtestData()
  {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.RETRIVEHPLCTEST+user.centralLabId);
    return this.http.get<any>( {url:apiUrl});
  }
  retriveMaldiSpotting()
  {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.MaldiSpotting+user.chcId);
    return this.http.get<any>( {url:apiUrl});
  }
}
