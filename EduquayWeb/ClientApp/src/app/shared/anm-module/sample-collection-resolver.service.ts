import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SampleCollectionService } from './sample-collection.service';
import { Observable, of } from 'rxjs';
import { SampleCollectionRequest } from './sample-collection-request';
import { formatDate } from '@angular/common';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SampleCollectionResolverService implements Resolve<any>{
  sampleCollectionResponse;
  scRequest: SampleCollectionRequest;
  fromDate: string = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');
  toDate: string = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');
  selectedSubjectType: string = '1';

  constructor(
    private sampleCollectionService: SampleCollectionService
  ) { }


  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.scRequest = {
      userId: 1, fromDate: '', toDate: '', subjectType: +(this.selectedSubjectType),
      registeredFrom: 8
    };

    return this.sampleCollectionService.getSampleCollection(this.scRequest).pipe(
      catchError(error => {
        console.log(error);
        return of({ message: error.toString(), status: 'false' });
      }));
  }
  
}
