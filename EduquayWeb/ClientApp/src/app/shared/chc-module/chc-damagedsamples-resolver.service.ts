import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../token.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChcNotificationSamplesRequest } from './chc-notification-samples/chc-notification-samples-request';
import { ChcNotificationSamplesService } from './chc-notification-samples/chc-notification-samples.service';

@Injectable({
  providedIn: 'root'
})
export class ChcDamagedsamplesResolverService implements Resolve<any>{

  chcdamagedSamplesResponse;
  chcdamagedsamplesRequest: ChcNotificationSamplesRequest;

  constructor(
    private ChcDamagedSamplesService: ChcNotificationSamplesService, 
    private tokenService: TokenService
    ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.chcdamagedsamplesRequest = {
     userId: user.id, notification: 1, collectionFrom: user.sampleCollectionFrom
    };

    return this.ChcDamagedSamplesService.getnotificationChcSamples(this.chcdamagedsamplesRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}
