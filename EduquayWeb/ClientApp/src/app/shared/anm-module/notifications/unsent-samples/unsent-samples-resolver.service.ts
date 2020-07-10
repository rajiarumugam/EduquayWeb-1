import { Injectable } from '@angular/core';
import { UnsentSamplesRequest } from './unsent-samples-request';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UnsentSamplesServiceService } from './unsent-samples-service.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnsentSamplesResolverService implements Resolve<any>{

  unsentSamplesRequest: UnsentSamplesRequest;
  unsentSamplesResponse;

  constructor(
    private UnsentSamplesServiceService: UnsentSamplesServiceService,
   
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
   
    this.unsentSamplesRequest = {userId: 1, collectionFrom: 10 };
    return this.UnsentSamplesServiceService.getunsentSampleList(this.unsentSamplesRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}

