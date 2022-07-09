import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT } from 'src/app/app.constant';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddBCCReportResponse, AddScreenDataResponse, AddScreenReportResponse, AddTrainingReportResponse } from './add-screen-response'; 

@Injectable({
  providedIn: 'root'
})
export class AddScreenService {

  addscreenApi: string = "api/v1/NHMMonthly/AddScreenData";
  addbccApi: string = "api/v1/NHMMonthly/AddBCCData";
  addtrainingApi:string ="api/v1/NHMMonthly/AddTrainingData";
  addscreenreportApi="api/v1/NHMMonthly/RetrieveScreeningData";
  addbccreportApi ="api/v1/NHMMonthly/RetrieveBCCData";
  addtrainingreportApi="api/v1/NHMMonthly/RetrieveTrainingData";

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  addscreen(screenadd){
    let apiUrl=this.genericService.buildApiUrl(this.addscreenApi);
    return this.http.post<AddScreenDataResponse>({url: apiUrl, body: screenadd});
  }

  addbcc(bccadd){
    let apiUrl=this.genericService.buildApiUrl(this.addbccApi);
    return this.http.post<AddScreenDataResponse>({url: apiUrl, body: bccadd});
  }

  addtraining(trainingadd){
  let apiUrl=this.genericService.buildApiUrl(this.addtrainingApi);
  return this.http.post<AddScreenDataResponse>({url: apiUrl, body: trainingadd});
}

addscreenreport(obj)
  {
    let apiUrl = this.genericService.buildApiUrl(this.addscreenreportApi);
    return this.http.post<AddScreenReportResponse>({url:apiUrl, body: obj });
  }

  addbccreport(obj)
  {
    let apiUrl = this.genericService.buildApiUrl(this.addbccreportApi);
    return this.http.post<AddBCCReportResponse>({url:apiUrl, body: obj });
  }

  addtrainingreport(obj)
  {
    let apiUrl = this.genericService.buildApiUrl(this.addtrainingreportApi);
    return this.http.post<AddTrainingReportResponse>({url:apiUrl, body: obj });
  }

}
