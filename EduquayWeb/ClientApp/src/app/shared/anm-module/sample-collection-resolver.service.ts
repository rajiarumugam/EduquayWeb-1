import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SampleCollectionService } from './sample-collection.service';
import { Observable, of } from 'rxjs';
import { SampleCollectionRequest } from './sample-collection-request';
import { formatDate } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class SampleCollectionResolverService implements Resolve<any>{
  sampleCollectionResponse;
  scRequest: SampleCollectionRequest;
  scFromDate: string = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');
  scToDate: string = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');
  selectedSubjectType: string = '1';

  constructor(
    private sampleCollectionService: SampleCollectionService,
    private tokenService: TokenService
  ) { }


  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    
    this.scRequest = {
      userId: user.id,  fromDate: this.scFromDate, // != '' ? moment(new Date(this.scFromDate)).format("DD/MM/YYYY") : '',
      toDate: this.scToDate, subjectType: +(this.selectedSubjectType),
      registeredFrom: user.registeredFrom
    };

    return this.sampleCollectionService.getSampleCollection(this.scRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
  
}
