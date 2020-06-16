import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  API_ENDPOINT :String;
  CONSUMER_KEY : String;

  constructor() { 
    this.API_ENDPOINT = 'http://localhost/eduquayapi/';
    this.CONSUMER_KEY = 'someReallyStupidTextWhichWeHumansCantRead'
  }
}
