import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../generic.service';
import { HttpClientService } from '../http-client.service';
import { ENDPOINT } from 'src/app/app.constant';
import { TokenService } from 'src/app/shared/token.service';


@Injectable({
  providedIn: 'root'
})
export class MolecularLabsampleService {

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService) { }

  retriveMLSampleReceipt()
  {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.MOLECULARLAB.RETRIVEMOLECULARLABRECEPIT+user.molecularLabId);
    return this.http.get<any>( {url:apiUrl});
  }
  
  retriveMLUpdateResult()
  {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.MOLECULARLAB.RETRIVERECEIVEDSUBJECTS+user.molecularLabId);
    return this.http.get<any>( {url:apiUrl});
  }

  getMolecularReport(subjectObj){
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.MOLECULARLAB.RETRIVEMOLECULARREPORTS1);
    return this.http.post<any>( {url:apiUrl, body: subjectObj});
  }
}
