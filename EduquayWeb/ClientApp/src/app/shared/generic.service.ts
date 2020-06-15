import { Injectable } from '@angular/core';
import { ConstantService } from './constant.service';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(private constantService: ConstantService) { }

  buildApiUrl(endpoint: string){
    return this.constantService.API_ENDPOINT + endpoint;
  }
}
