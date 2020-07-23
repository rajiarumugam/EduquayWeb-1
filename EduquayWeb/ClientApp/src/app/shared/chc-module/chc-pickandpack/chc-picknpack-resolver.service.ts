import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ChcPicknpackRequest } from './chc-picknpack-request';
import { ChcPicknpackService } from './chc-picknpack.service';
import { TokenService } from '../../token.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChcPicknpackResolverService implements Resolve<any>{

  chcpicknpackRequest: ChcPicknpackRequest;

  constructor(
    private ChcPicknpackService: ChcPicknpackService,
    private tokenService: TokenService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    var user = JSON.parse(this.tokenService.getUser('lu'));
   
    this.chcpicknpackRequest = {userId: user.id, collectionFrom: user.sampleCollectionFrom };
    return this.ChcPicknpackService.getchcpickandpackList(this.chcpicknpackRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}
