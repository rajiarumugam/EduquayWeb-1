import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../../token.service';
import { SchedulePostPndtcRequest } from './schedule-post-pndtc-request';
import { SchedulePostPndtcService } from './schedule-post-pndtc.service';

@Injectable({
  providedIn: 'root'
})
export class PostScheduledResolverService implements Resolve<any>{

  SchedulePostPndtcRequest: SchedulePostPndtcRequest;
  userId:number;

  constructor(
    private SchedulePostPndtcService: SchedulePostPndtcService,
    private tokenService: TokenService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.userId = user.id;
    this.SchedulePostPndtcRequest = {
      districtId:0,
      chcId:0,
      phcId:0,
      anmId:0,
      userId: user.id
    }
    return this.SchedulePostPndtcService.getscheduledLists(this.SchedulePostPndtcRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}
