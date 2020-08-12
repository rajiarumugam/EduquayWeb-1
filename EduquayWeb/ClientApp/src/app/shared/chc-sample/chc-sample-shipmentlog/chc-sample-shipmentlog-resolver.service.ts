import { Injectable } from '@angular/core';
import { ChcSampleShipmentlogResponse } from './chc-sample-shipmentlog-response';
import { ChcSampleShipmentlogService } from './chc-sample-shipmentlog.service';
import { TokenService } from '../../token.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChcSampleShipmentlogResolverService implements Resolve<any> {

  chcshipmentlogResponse: ChcSampleShipmentlogResponse;

  constructor(
    private ChcSampleShipmentlogService: ChcSampleShipmentlogService,
    private tokenService: TokenService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    return this.ChcSampleShipmentlogService.getshipmentLog(user.chcId).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}
