import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor() { }

  buildApiUrl(endpoint: string){
    return `${environment.apiUrl}/${endpoint}`;
  }
}
