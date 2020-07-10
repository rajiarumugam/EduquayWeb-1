import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TimeoutExpiryServiceService } from './timeout-expiry-service.service';
import { Observable, of } from 'rxjs';
import { TimeoutExpiryRequest } from './timeout-expiry-request';
import { catchError } from 'rxjs/operators';
import { TokenService } from 'src/app/shared/token.service';

@Injectable({
  providedIn: 'root'
})
export class TimeoutExpiryResolverService implements Resolve<any>{

  timeoutsamplesResponse;
  timeoutsamplesRequest: TimeoutExpiryRequest;

  constructor(
    private TimeoutExpiryServiceService: TimeoutExpiryServiceService,
    private tokenService: TokenService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.timeoutsamplesRequest = { anmId: user.userTypeId, notification: 3 };

    return this.TimeoutExpiryServiceService.gettimeoutSamples(this.timeoutsamplesRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}