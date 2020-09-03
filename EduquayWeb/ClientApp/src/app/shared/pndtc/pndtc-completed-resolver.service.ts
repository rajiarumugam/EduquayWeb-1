import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/token.service';
import { GenericService } from 'src/app/shared/generic.service';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { ENDPOINT } from 'src/app/app.constant';
import { PNDCService } from "./pndc.service";

@Injectable({
  providedIn: 'root'
})
export class PNDTCCompletedResolverService implements Resolve<any> {

  constructor(
    private tokenService: TokenService,
    private httpClient: HttpClientService,
    private genericService: GenericService,
    private PNDCService:PNDCService
    ) { }

    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    var _subjectObj = {
      "userInput":""
    }

    return this.PNDCService.getnotCompleteDetails(_subjectObj).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));

  }
}
