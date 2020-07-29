import { Injectable } from '@angular/core';
import { ChcUnsentSamplesRequest } from './chc-unsent-samples-request';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ChcUnsentSamplesService } from './chc-unsent-samples.service';
import { TokenService } from '../../token.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChcUnsentSamplesResolverService implements Resolve<any>{

  chcunsentSamplesRequest: ChcUnsentSamplesRequest;
  chcunsentSamplesResponse;

  constructor(
    private ChcUnsentSamplesService: ChcUnsentSamplesService,
    private tokenService: TokenService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    var user = JSON.parse(this.tokenService.getUser('lu'));
   
    this.chcunsentSamplesRequest = {userId: user.id, collectionFrom: user.sampleCollectionFrom, notification:2 };
    return this.ChcUnsentSamplesService.getchcUnsentSamples(this.chcunsentSamplesRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}
