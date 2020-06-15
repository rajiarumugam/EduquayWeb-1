import { Injectable } from '@angular/core';
import { HttpClientService } from '../../http-client.service';
import { Observable } from 'rxjs'
import { District, DistrictResponse } from './district.model';
import { GenericService } from '../../generic.service';


@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  endpoint: string = "api/v1/District/Retrieve";
  constructor(private _http: HttpClientService, private genericService: GenericService) { }

  
  getAll(): Observable<DistrictResponse> {
    var apiUrl = this.genericService.buildApiUrl(this.endpoint);
    return this._http
      .getCached<DistrictResponse>({ url: apiUrl, cacheMins: 10 });
  }


}
