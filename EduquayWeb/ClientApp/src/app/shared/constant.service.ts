import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  API_ENDPOINT :String;
  CONSUMER_KEY : String;

  constructor() { 
    //this.API_ENDPOINT = 'http://localhost/eduquayapi/';
    this.API_ENDPOINT = 'https://localhost:44337/'

    this.CONSUMER_KEY = 'someReallyStupidTextWhichWeHumansCantRead'
  }
}
