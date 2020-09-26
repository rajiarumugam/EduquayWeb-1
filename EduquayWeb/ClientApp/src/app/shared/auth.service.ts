import { Injectable } from '@angular/core';
import { authResponse, resetLoginResponse } from './auth-response';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GenericService } from './generic.service';
import { AuthRequest } from './auth-request';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authresultobj: authResponse;
  loginApi: string = 'api/v1/UserIdentity/Login';
  patientApi: string = 'api/v1/Patient/GetPatients';
  logoutApi: string = 'api/v1/User/Logout';
  resetloginApi: string = 'api/v1/UserIdentity/ResetLogin';

  constructor(
    private httpClient: HttpClient,
    private http: HttpClientService, 
    private tokenService: TokenService, 
    private genericService: GenericService) { }

  //Observable<HttpResponse<authresult>>
  userAuthentication(emailInput: string, passwordInput: string): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
      'No-Auth': 'True',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    let postData = { 'userName': emailInput, 'password': passwordInput };
    let loginUrl = this.genericService.buildApiUrl(this.loginApi);
    return this.httpClient.post(loginUrl, postData, options);
    // .pipe(
    //   catchError(errorRes => {
    //     let errorMessage = "An unknown error occurred";
    //     if(!errorRes.error || !errorRes.error.error){
    //       return throwError(errorMessage);
    //     }
    //     switch(errorRes.error.error.message){
    //       case 'email':
    //         console.log('error');
    //     }
    //     return throwError(errorMessage);
    //   })
    // );
    //.pipe(retry(3), catchError(this.handleError('userAuthentication', [])));
  }

  

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

  // resetLoginFunc(resetdata: AuthRequest): Observable<any>{
  //   let httpHeaders = new HttpHeaders({
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  //     'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
  //     'No-Auth': 'True',
  //     'Content-Type': 'application/json',
  //     'Cache-Control': 'no-cache'
  //   });
  //   let options = {
  //     headers: httpHeaders
  //   };
  //   let apiUrl = this.genericService.buildApiUrl(this.resetloginApi);
  //   return this.http.post<resetLoginResponse>({url:apiUrl, header: options, body: resetdata });
  // }

}
