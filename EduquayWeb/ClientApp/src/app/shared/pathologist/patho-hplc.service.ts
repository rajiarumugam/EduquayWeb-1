import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../generic.service';
import { HttpClientService } from '../http-client.service';
import { ENDPOINT } from 'src/app/app.constant';
import { TokenService } from 'src/app/shared/token.service';


@Injectable({
  providedIn: 'root'
})
export class pathoHPLCService {

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService) { }

    retriveHPLCResultMaster()
    {
      let apiUrl = this.genericService.buildApiUrl(ENDPOINT.PATHOLOGIST.RETRIVEHPLCRESULTMASTER);
      return this.http.get<any>( {url:apiUrl});
    }
  

  addHSBCtest(obj)
  {
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.PATHOLOGIST.ADDHPLCRESULT);
    return this.http.post<any>({url:apiUrl, body: obj });
  }

}
