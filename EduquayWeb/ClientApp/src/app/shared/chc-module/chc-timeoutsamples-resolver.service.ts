import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../token.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChcNotificationSamplesService } from './chc-notification-samples/chc-notification-samples.service';
import { ChcNotificationSamplesRequest } from './chc-notification-samples/chc-notification-samples-request';

@Injectable({
  providedIn: 'root'
})
export class ChcTimeoutsamplesResolverService implements Resolve<any>{

 
  chctimeoutsamplesResponse;
  chctimeoutsamplesRequest: ChcNotificationSamplesRequest;

  constructor(
    private ChctimeoutSamplesService: ChcNotificationSamplesService, 
    private tokenService: TokenService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.chctimeoutsamplesRequest = {  userId: user.id, notification: 3, collectionFrom: user.sampleCollectionFrom };

    return this.ChctimeoutSamplesService.getnotificationChcSamples(this.chctimeoutsamplesRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}
