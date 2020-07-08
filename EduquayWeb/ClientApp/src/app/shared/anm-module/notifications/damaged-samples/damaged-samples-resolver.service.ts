import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DamagedSamplesRequest } from './damaged-samples-request';
import { DamagedSamplesService } from './damaged-samples.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from 'src/app/shared/token.service';

@Injectable({
  providedIn: 'root'
})
export class DamagedSamplesResolverService implements Resolve<any>{

  damagedsamplesResponse;
  damagedsamplesRequest: DamagedSamplesRequest;

  constructor(
    private DamagedSamplesService: DamagedSamplesService, 
    private tokenService: TokenService
    ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.damagedsamplesRequest = {
     anmId: user.userTypeId, notification: 1
    };

    return this.DamagedSamplesService.getdamagedSamples(this.damagedsamplesRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}
