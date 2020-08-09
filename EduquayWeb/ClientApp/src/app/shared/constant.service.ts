import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  API_ENDPOINT :String;
  CONSUMER_KEY : String;

  SelectOneSample: string;
  LessThan24Hours: string = `One or more samples selected that are aging less than 24 hours`;
  MoreThan24Hours: string = `One or more samples selected that are aging more than 24 hours`;

  constructor() { 
    this.API_ENDPOINT = 'http://localhost/eduquayapi/';
    this.CONSUMER_KEY = 'someReallyStupidTextWhichWeHumansCantRead';

    this.SelectOneSample = `Please select at least one sample !!!`;
    this
    
  }
}
