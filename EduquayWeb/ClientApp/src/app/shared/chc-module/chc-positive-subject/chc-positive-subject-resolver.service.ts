import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ChcPositiveSubjectRequest } from './chc-positive-subject-request';
import { ChcPositiveSubjectService } from './chc-positive-subject.service';
import { TokenService } from '../../token.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChcPositiveSubjectResolverService implements Resolve<any>{

  positiveSubjectRequest: ChcPositiveSubjectRequest;
  positiveSubjectResponse;

  constructor(
    private ChcPositiveSubjectService: ChcPositiveSubjectService,
    private tokenService: TokenService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    var user = JSON.parse(this.tokenService.getUser('lu'));
   
    this.positiveSubjectRequest = {chcId:user.chcId,  registeredFrom: user.registeredFrom };
    return this.ChcPositiveSubjectService.getChcPositiveSubject(this.positiveSubjectRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}
