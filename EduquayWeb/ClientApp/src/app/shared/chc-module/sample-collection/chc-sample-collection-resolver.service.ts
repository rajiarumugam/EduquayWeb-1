import { Injectable } from '@angular/core';
import { SampleCollectionRequest } from '../../anm-module/sample-collection-request';
import { SampleCollectionService } from '../../anm-module/sample-collection.service';
import { TokenService } from '../../token.service';
import { formatDate } from '@angular/common';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChcSampleCollectionResolverService implements Resolve<any>{

  chcsampleCollectionResponse;
  chcscRequest: SampleCollectionRequest;
  chcSCFromDate: string;
  chcSCToDate: string;
  selectedSubjectType: string = '0';

  constructor(
    private sampleCollectionService: SampleCollectionService,
    private tokenService: TokenService
  ) { }

  
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    
    this.chcscRequest = {
      userId: user.id,  fromDate: '',
      toDate: '', subjectType: +(this.selectedSubjectType),
      registeredFrom: user.registeredFrom
    };

    return this.sampleCollectionService.getSampleCollection(this.chcscRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
  
}
