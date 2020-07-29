import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TimeoutExpiryRequest } from '../anm-module/notifications/timeout-expiry/timeout-expiry-request';
import { TimeoutExpiryServiceService } from '../anm-module/notifications/timeout-expiry/timeout-expiry-service.service';
import { TokenService } from '../token.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChcTimeoutsamplesResolverService implements Resolve<any>{

  chctimeoutsamplesResponse;
  chctimeoutsamplesRequest: TimeoutExpiryRequest;

  constructor(
    private TimeoutExpiryServiceService: TimeoutExpiryServiceService,
    private tokenService: TokenService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.chctimeoutsamplesRequest = { anmId: user.userTypeId, notification: 3 };

    return this.TimeoutExpiryServiceService.gettimeoutSamples(this.chctimeoutsamplesRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}
