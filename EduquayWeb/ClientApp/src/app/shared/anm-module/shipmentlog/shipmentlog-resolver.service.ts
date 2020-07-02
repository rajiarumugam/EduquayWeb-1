import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ShipmentlogService } from './shipmentlog.service';
import { ShipmentRequest } from './shipment-request';

@Injectable({
  providedIn: 'root'
})
export class ShipmentlogResolverService implements Resolve<any>{
  shipmentResponse;
  shipmentRequest: ShipmentRequest
  constructor(
    private ShipmentLogService: ShipmentlogService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.shipmentRequest = {userId: 1, shipmentFrom: 4 };

    return this.ShipmentLogService.getshipmentLog(this.shipmentRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}
