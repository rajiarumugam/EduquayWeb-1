import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../generic.service';
import { HttpClientService } from '../http-client.service';
import { ENDPOINT } from 'src/app/app.constant';
import { TokenService } from 'src/app/shared/token.service';


@Injectable({
  providedIn: 'root'
})
export class errorCorrectionService {

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService,
    private http: HttpClientService,
    private tokenService: TokenService) { }


  addShipment(obj){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.CENTRALLAB.ADDSHIPMENT);
    return this.http.post<any>({url:apiUrl, body: obj });

  }

  addPNDTShipment(obj){
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.PNDT.ADDPNDTSHIPMENT);
    return this.http.post<any>({url:apiUrl, body: obj });

  }
  getErrorCorrectionDetails(value)
  {
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.ERRORCORRECTION.RETRIVEBARCODEFORERRORCORRECTION+value);
    return this.http.get<any>({url:apiUrl});
  }
  checkBarcodeExist(value)
  {
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.ERRORCORRECTION.CHECKBARCODEEXIST+value);
    return this.http.post<any>({url:apiUrl, body: {}});
  }
  updateBarcodeError(obj)
  {
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.ERRORCORRECTION.UPDATEBARCODEERROR);
    return this.http.post<any>({url:apiUrl, body: obj});
  }

  getErrorDetails()
  {
    let apiUrl = this.genericService.buildApiUrl(ENDPOINT.ERRORCORRECTION.RETRIVEERRORBARCODE);
    return this.http.get<any>({url:apiUrl});
  }
}
