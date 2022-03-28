import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic.service';
import { HttpClientService } from '../../http-client.service';
import { AddPNDTDataresponse, AddPNDTResponse } from './add-pndtlocation-response';


@Injectable({
  providedIn: 'root'
})
export class AddPNDTService {
  retrieveallPndtLocationApi: string = "api/v1/PNDTLocation/Retrieve";
  addPNDTApi: string = "api/v1/PNDTLocation/Add";
  updatePNDTApi: string = "api/v1/PNDTLocation/UpdatePNDT";

  

  constructor(
    private genericService: GenericService,
    private http: HttpClientService,
  ) { }

  getallPNDTList(){
    let apiUrl = this.genericService.buildApiUrl(this.retrieveallPndtLocationApi);
    return this.http.get<AddPNDTResponse>({url: apiUrl});
  }
  addpndt(pndtadd){
    let apiUrl=this.genericService.buildApiUrl(this.addPNDTApi);
    return this.http.post<AddPNDTDataresponse>({url: apiUrl, body: pndtadd});
  }

  updatePNDT(PNDTadd){
    let apiUrl=this.genericService.buildApiUrl(this.updatePNDTApi);
    return this.http.post<AddPNDTDataresponse>({url: apiUrl, body: PNDTadd});
  }

}
