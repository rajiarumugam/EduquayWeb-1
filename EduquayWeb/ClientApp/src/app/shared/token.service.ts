import { Injectable } from '@angular/core';
import { user } from './auth-response';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  setToken(key: string, value: string, name: string) {
    sessionStorage.setItem(key, value);
    sessionStorage.setItem(key, JSON.stringify({ token: value, name: name }));
  }

  getToken(key: string) {
    var currentUser = JSON.parse(sessionStorage.getItem(key));
    if (currentUser !== null) {
      var token = currentUser.token; // your token
      return token;
    } else {
      return null;
    }
  }

  setUser(key: string, value: user ){
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  
  getUser(key: string) {
    return sessionStorage.getItem(key);
  }

  clearToken() {
    sessionStorage.clear();
  }

  deleteToken(key: string) {
    sessionStorage.removeItem(key);
  }
  

}
