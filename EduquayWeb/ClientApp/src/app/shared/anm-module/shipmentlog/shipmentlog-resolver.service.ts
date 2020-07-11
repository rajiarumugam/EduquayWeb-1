import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ShipmentlogService } from './shipmentlog.service';
import { ShipmentRequest } from './shipment-request';
import { TokenService } from '../../token.service';

@Injectable({
  providedIn: 'root'
})
export class ShipmentlogResolverService implements Resolve<any>{
  shipmentResponse;
  shipmentRequest: ShipmentRequest
  constructor(
    private ShipmentLogService: ShipmentlogService,
    private tokenService: TokenService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    var user = JSON.parse(this.tokenService.getUser('lu'));

    this.shipmentRequest = {userId: user.id, shipmentFrom: user.shipmentFrom };

    return this.ShipmentLogService.getshipmentLog(this.shipmentRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}
