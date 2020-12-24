import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/token.service';
import { GenericService } from 'src/app/shared/generic.service';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { ENDPOINT } from 'src/app/app.constant';
import { pathoHPLCService } from "./patho-hplc.service";

@Injectable({
  providedIn: 'root'
})
export class PathoReportPrintResolverService implements Resolve<any> {

  constructor(
    private tokenService: TokenService,
    private httpClient: HttpClientService,
    private genericService: GenericService,
    private pathoHPLCService:pathoHPLCService
    ) { }

    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    var _subjectObj = {
      "sampleStatus": 3,
      "centrelLabId": user.centralLabId,
      "chcId": 0,
      "phcId": 0,
      "anmId": 0,
      "fromDate": moment().subtract(7,'d').format("DD/MM/YYYY"),
      "toDate": moment().format("DD/MM/YYYY")
    }

    return this.pathoHPLCService.getPathoSampleReport(_subjectObj).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));

  }
}
