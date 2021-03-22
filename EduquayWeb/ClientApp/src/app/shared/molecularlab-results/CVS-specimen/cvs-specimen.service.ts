import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { CvsSpecimenConfirmResponse, CvsSpecimenEditResponse, CvsSpecimenResponse } from './cvs-specimen-response';

@Injectable({
  providedIn: 'root'
})
export class CVSSpecimenService {

  retrieveSpecimenSamplesApi: string = "api/v1/MLResultProcess/RetrieveSpecimenSamples";
  retrieveSpecimenSampleseditApi: string = "api/v1/MLResultProcess/RetrieveSpecimenTestEdit";
  retrieveSpecimenSamplesCompleteApi: string = "api/v1/MLResultProcess/RetrieveSpecimenTestCompleted";

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getspecimenSampleList(molecularLabId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericServices.buildApiUrl(`${this.retrieveSpecimenSamplesApi}/${user.molecularLabId}`);
    return this.http.get<CvsSpecimenResponse>({url: apiUrl });
  }
  geteditspecimenSampleList(molecularLabId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericServices.buildApiUrl(`${this.retrieveSpecimenSampleseditApi}/${user.molecularLabId}`);
    return this.http.get<CvsSpecimenEditResponse>({url: apiUrl });
  }
  getconfirmspecimenSampleList(molecularLabId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericServices.buildApiUrl(`${this.retrieveSpecimenSamplesCompleteApi}/${user.molecularLabId}`);
    return this.http.get<CvsSpecimenConfirmResponse>({url: apiUrl });
  }
}
