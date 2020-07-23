import { Injectable } from '@angular/core';
import { ChcShipmentlogRequest } from './chc-shipmentlog-request';
import { ChcShipmentlogService } from './chc-shipmentlog.service';
import { TokenService } from '../../token.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChcShipmentlogResolverService implements Resolve<any>{

  chcshipmentlogResponse;
  chcshipmentlogRequest: ChcShipmentlogRequest;

  constructor(
    private ChcShipmentlogService: ChcShipmentlogService,
    private tokenService: TokenService
  ) { }
  
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    var user = JSON.parse(this.tokenService.getUser('lu'));

    this.chcshipmentlogRequest = {userId: user.id, shipmentFrom: user.shipmentFrom };
    return this.ChcShipmentlogService.getchcshipmentLog(this.chcshipmentlogRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}
