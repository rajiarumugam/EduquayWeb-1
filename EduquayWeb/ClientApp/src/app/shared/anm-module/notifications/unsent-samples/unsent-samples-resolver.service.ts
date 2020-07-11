import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UnsentSamplesServiceService } from './unsent-samples-service.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from 'src/app/shared/token.service';

@Injectable({
  providedIn: 'root'
})
export class UnsentSamplesResolverService implements Resolve<any>{

  unsentSamplesResponse;
  userId:number;

  constructor(
    private UnsentSamplesServiceService: UnsentSamplesServiceService,
    private tokenService: TokenService
   
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    var user = JSON.parse(this.tokenService.getUser('lu'));
    this.userId = user.id;
    return this.UnsentSamplesServiceService.getunsentSampleList(this.userId).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}

