import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  API_ENDPOINT :String;
  CONSUMER_KEY : String;

  SelectOneSample: string;

  constructor() { 
    this.API_ENDPOINT = 'http://localhost/eduquayapi/';
    this.CONSUMER_KEY = 'someReallyStupidTextWhichWeHumansCantRead';

    this.SelectOneSample = `Please select at least one sample !!!`;
    
  }
}
