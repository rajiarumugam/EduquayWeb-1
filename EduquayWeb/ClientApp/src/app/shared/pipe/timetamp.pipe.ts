import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'convertimestamp'})
export class timeStampPipe implements PipeTransform {
  transform(value) {
    var _date = value.split('/')[0];
  var _month = value.split('/')[1];
  var _year = value.split('/')[2];
  return moment(_month+"/"+_date+"/"+_year).unix();
  }
}