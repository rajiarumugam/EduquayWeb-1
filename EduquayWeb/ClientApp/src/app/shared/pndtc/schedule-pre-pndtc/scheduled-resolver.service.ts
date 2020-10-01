import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../../token.service';
import { SchedulePrePndtcRequest } from './schedule-pre-pndtc-request';
import { SchedulePrePndtcService } from './schedule-pre-pndtc.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduledResolverService implements Resolve<any>{

  SchedulePrePndtcRequest: SchedulePrePndtcRequest;
  userId:number;

  constructor(
    private SchedulePrePndtcService: SchedulePrePndtcService,
    private tokenService: TokenService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.userId = user.id;
    this.SchedulePrePndtcRequest = {
      districtId:0,
      chcId:0,
      phcId:0,
      anmId:0,
      userId: user.id
    }
    return this.SchedulePrePndtcService.getscheduledLists(this.SchedulePrePndtcRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}
