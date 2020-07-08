import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SpouseregistrationService } from './spouseregistration.service';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/token.service';

@Injectable({
  providedIn: 'root'
})
export class SpouseResolverService implements Resolve<any> {


  fromDate: string = moment().add(-5, 'days') .format("DD/MM/YYYY");
  toDate: string = moment().format("DD/MM/YYYY");

  constructor(
    private spouseRegService: SpouseregistrationService,
    private tokenService: TokenService
    ) { }

    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
    //var loggedUser = this.tokenService.getUser('lu');
    var _subjectObj = {
      "anmId":2,
      "fromDate":this.fromDate,
      "toDate":this.toDate
    }

    return this.spouseRegService.spouseDetails(_subjectObj).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));

  }
}
