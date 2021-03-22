import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenericService } from './../generic.service';
import { HttpClientService } from './../http-client.service';
import { TokenService } from './../token.service';


@Injectable({
  providedIn: 'root'
})
export class updatePregnacyService {

  retrieveSpecimenMolecularResults: string = "api/v1/Haematologist/RetrieveSpecimenMolecularResults/";
  updatePregnancyDecision: string = "api/v1/Haematologist/UpdatePregnancyDecision";


  //formData: any;

  constructor(
    private httpClient: HttpClient,
    private genericServices: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getcounsellingLists(){
    let user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl=this.genericServices.buildApiUrl(this.retrieveSpecimenMolecularResults+user.molecularLabId);
    return this.http.get<any>({url: apiUrl});
  }

  updatePregnacyDetails(data)
  {
    let user = JSON.parse(this.tokenService.getUser('lu'));
    let apiUrl=this.genericServices.buildApiUrl(this.updatePregnancyDecision);
    return this.http.post<any>({url:apiUrl, body: data });

  }  
}
