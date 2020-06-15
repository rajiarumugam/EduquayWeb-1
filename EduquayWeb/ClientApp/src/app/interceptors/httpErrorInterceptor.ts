import { catchError, tap } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap(data => console.log(data)),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }
          // return an observable with a user-facing error message
          if(error.status === 400 || error.error.status == 400){
            if(error.error.errors !== null) {
              if(error.error.errors.length > 0){
                return throwError(error.error.errors[0]);
              }else if(error.error.title != null){
                return throwError(error.error.title);
              }else if(error.error.errors.Email !== null && error.error.errors.Email.length > 0){
                return throwError(error.error.errors.Email[0]);
              }
              return throwError(error.error.title);
            }
          }
          return throwError(
            'Something bad happened; please try again later.');
        })
      );
  }
}