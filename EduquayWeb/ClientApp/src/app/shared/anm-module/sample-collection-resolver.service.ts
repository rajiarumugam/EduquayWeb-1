import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { SampleCollectionService } from './sample-collection.service';
import { Observable, of } from 'rxjs';
import { SampleCollectionRequest } from './sample-collection-request';
import { formatDate } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../token.service';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class SampleCollectionResolverService implements Resolve<any>{
  sampleCollectionResponse;
  scRequest: SampleCollectionRequest;
  scFromDate: string = moment().add(-1, 'day').format('DD/MM/yyyy');
  scToDate: string = moment().format('DD/MM/yyyy');
  selectedSubjectType: string = '0';
  sub: any;
  subjectTypeParam: string = '';
  constructor(
    private sampleCollectionService: SampleCollectionService,
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) { }


  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    var user = JSON.parse(this.tokenService.getUser('lu'));

    // this.sub = this.route.params.subscribe(params => {
    //   this.subjectTypeParam = params['subtype'] == undefined ? '' : params['subtype'];
    //   this.subjectTypeParam == 'f' ? this.selectedSubjectType = '1' : (this.subjectTypeParam == 'm' ? this.selectedSubjectType = '2' : (this.subjectTypeParam == 's' ? this.selectedSubjectType = '3' : this.selectedSubjectType = ''));
    // });

    this.scRequest = {
      userId: user.id, fromDate: this.scFromDate, // != '' ? moment(new Date(this.scFromDate)).format("DD/MM/YYYY") : '',
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
