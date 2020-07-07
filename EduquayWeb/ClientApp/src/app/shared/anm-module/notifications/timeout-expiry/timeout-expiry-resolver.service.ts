import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TimeoutExpiryServiceService } from './timeout-expiry-service.service';
import { Observable, of } from 'rxjs';
import { TimeoutExpiryRequest } from './timeout-expiry-request';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeoutExpiryResolverService implements Resolve<any>{

  timeoutsamplesResponse;
  timeoutsamplesRequest: TimeoutExpiryRequest;

  constructor(
    private TimeoutExpiryServiceService: TimeoutExpiryServiceService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.timeoutsamplesRequest = { anmId: 1, notification: 3 };

    return this.TimeoutExpiryServiceService.gettimeoutSamples(this.timeoutsamplesRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}