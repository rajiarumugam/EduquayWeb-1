import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { StateRequest } from './state-request';
import { AddStateResponse, StateResponse } from './state-response';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  retrieveStateApi: string = "api/v1/State/Retrieve";
  addStateApi: string = "api/v1/State/Add";

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getStateList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveStateApi);
    return this.http.get<StateResponse>({url: apiUrl});
  }

  addState(stateadd: StateRequest){
    let apiUrl=this.genericService.buildApiUrl(this.addStateApi);
    return this.http.post<AddStateResponse>({url: apiUrl, body: stateadd});
  }
}
