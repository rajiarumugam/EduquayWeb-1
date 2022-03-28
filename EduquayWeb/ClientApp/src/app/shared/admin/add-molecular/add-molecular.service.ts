import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { TokenService } from '../../token.service';
import { AddDistrictResponse } from '../add-district/add-district-response';
import { AddMolecularRequest } from './add-molecular-request';
import { AddMolecularDataresponse, AddMolecularResponse } from './add-molecular-response'; 

@Injectable({
  providedIn: 'root'
})
export class AddMolecularService {

  retrieveMolecularApi: string = "api/v1/MolecularMaster/RetrieveAllMolecular";
  addMolecularApi: string = "api/v1/MolecularMaster/Add";
  retrieveDistrictApi: string = "api/v1/SA/RetrieveAllDistricts";
  updateMolecularApi: string = "api/v1/MolecularMaster/UpdateMolecular";

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService
  ) { }

  getDistrictList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveDistrictApi);
    return this.http.get<AddDistrictResponse>({url: apiUrl});
  }

  getMolecularList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveMolecularApi);
    return this.http.get<AddMolecularResponse>({url: apiUrl});
  }

  addMolecular(Molecularadd){
    let apiUrl=this.genericService.buildApiUrl(this.addMolecularApi);
    return this.http.post<AddMolecularDataresponse>({url: apiUrl, body: Molecularadd});
  }

  updateMolecular(Molecularadd){
    let apiUrl=this.genericService.buildApiUrl(this.updateMolecularApi);
    return this.http.post<AddMolecularDataresponse>({url: apiUrl, body: Molecularadd});
  }
}
