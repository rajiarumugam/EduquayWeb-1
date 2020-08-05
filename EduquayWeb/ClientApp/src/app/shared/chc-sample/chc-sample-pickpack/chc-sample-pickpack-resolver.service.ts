import { Injectable } from '@angular/core';
import { ChcSamplePickpackService } from './chc-sample-pickpack.service';
import { TokenService } from '../../token.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChcSamplePickpackResolverService implements Resolve<any>{

  chcsamplepicknpickResponse;
  constructor(

    private ChcSamplePickpackService: ChcSamplePickpackService,
    private tokenService: TokenService

  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    var user = JSON.parse(this.tokenService.getUser('lu'));
  
      return this.ChcSamplePickpackService.getsamplePickpackChc(user.chcId).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}
