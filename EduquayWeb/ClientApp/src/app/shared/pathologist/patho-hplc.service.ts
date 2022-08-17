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

  retrieveBloodSamplesReportApi: string = "api/v1/MLResultProcess/RetrieveBloodTestReports";
  retrieveIndividualBloodTestReport = "api/v1/MLResultProcess/RetrieveIndividualBloodTestReports";
  retrieveSpecimenTestReport="api/v1/MLResultProcess/RetrieveSpecimenTestReports";

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
  retriveEditHPLCDiagnosis()
  {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    console.log(user);
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.PATHOLOGIST.RETRIVEEDITHPLCDIAGOSIS+user.centralLabId);
    return this.http.get<any>( {url:apiUrl});
  }


  retrivePathoHPLCDiagnosis()
  {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    console.log(user);
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.RETRIVESRPATHOHPLCDIAGNOSISDETAILS+user.centralLabId);
    return this.http.get<any>( {url:apiUrl});
  }
  getPathoSampleReport(obj)
  {
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.PATHOLOGIST.RETRIEVEDIAGNOSISREPORTS);
    return this.http.post<any>({url:apiUrl, body: obj });
  }

  getFieldWeeklyReport(obj)
  {
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.WEEKREPORT.RETRIEVEFIELDWEEKREPORT);
    return this.http.post<any>({url:apiUrl, body: obj });
  }

  createReportData(obj,url)
  {
    let apiUrl = this.genericService.buildApiUrl(url);
    return this.http.post<any>({url:apiUrl, body: obj });
  }

  getActualWeeklyReport(obj)
  {
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.WEEKREPORT.RETRIEVEACTUALWEEKREPORT);
    return this.http.post<any>({url:apiUrl, body: obj });
  }


  getSampleStatus() {
    var apiUrl = this.genericService.buildApiUrl(ENDPOINT.PATHOLOGIST.RETRIVEDIAGNOSISSAMPLESTATUS);
    return this.http
      .getCached<any>({ url: apiUrl, cacheMins: 100 });
  }
  
  getbloodSampleReports(){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(`${this.retrieveBloodSamplesReportApi}/${user.molecularLabId}`);
    return this.http.get<any>({url: apiUrl });
  }

  postbloodSampleReports(obj){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(`${this.retrieveBloodSamplesReportApi}`);
    return this.http.post<any>({url: apiUrl, body: obj });
  }

  retrieveIndividualBloodTestReports(obj){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(`${this.retrieveIndividualBloodTestReport}`);
    return this.http.post<any>({url: apiUrl, body: obj });
  }

  retrieveSpecimenTestReports(obj){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericService.buildApiUrl(`${this.retrieveSpecimenTestReport}`);
    return this.http.post<any>({url: apiUrl, body: obj });
  }
}
