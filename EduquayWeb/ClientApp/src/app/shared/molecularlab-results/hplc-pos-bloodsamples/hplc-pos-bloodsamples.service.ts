import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { HplcPosBloodsamplesConfirmedResponse, HplcPosBloodsamplesEditResponse, HplcPosBloodsamplesResponse } from './hplc-pos-bloodsamples-response';

@Injectable({
  providedIn: 'root'
})
export class HplcPosBloodsamplesService {

  retrieveBloodSamplesApi: string = "api/v1/MLResultProcess/RetrieveBloodSamples";
  retrieveBloodSampleseditApi: string = "api/v1/MLResultProcess/RetrieveBloodTestEdit";
  retrieveBloodSamplesCompleteApi: string = "api/v1/MLResultProcess/RetrieveBloodTestComplete";

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getbloodSampleList(molecularLabId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericServices.buildApiUrl(`${this.retrieveBloodSamplesApi}/${user.molecularLabId}`);
    return this.http.get<HplcPosBloodsamplesResponse>({url: apiUrl });
  }
  geteditbloodSampleList(molecularLabId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericServices.buildApiUrl(`${this.retrieveBloodSampleseditApi}/${user.molecularLabId}`);
    return this.http.get<HplcPosBloodsamplesEditResponse>({url: apiUrl });
  }
  getconfirmbloodSampleList(molecularLabId){
    var user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl = this.genericServices.buildApiUrl(`${this.retrieveBloodSamplesCompleteApi}/${user.molecularLabId}`);
    return this.http.get<HplcPosBloodsamplesConfirmedResponse>({url: apiUrl });
  }
}
