import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PicknpackService } from './picknpack.service';
import { PicknpackRequest } from './picknpack-request';
import { TokenService } from '../../token.service';

@Injectable({
  providedIn: 'root'
})
export class PicknpackResolverService implements Resolve<any>{

  picknpackRequest: PicknpackRequest;
  constructor(
    private PicknpackService: PicknpackService,
   
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
   
    this.picknpackRequest = {userId: 1, collectionFrom: 10 };
    return this.PicknpackService.getpickandpackList(this.picknpackRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
}
