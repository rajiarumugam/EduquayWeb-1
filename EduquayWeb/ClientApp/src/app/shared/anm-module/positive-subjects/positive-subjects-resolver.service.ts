import { Injectable } from '@angular/core';
import { PositiveSubjectsService } from './positive-subjects.service';
import { TokenService } from '../../token.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PositiveSubjectsResolverService implements Resolve<any>{

  positiveSubjectResponse;
  userId:number;

  constructor(
    private PositiveSubjectsService: PositiveSubjectsService,
    private tokenService: TokenService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.userId = user.id;
    return this.PositiveSubjectsService.getPositiveSubject(this.userId).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}
