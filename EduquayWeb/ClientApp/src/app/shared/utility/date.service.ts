import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getDateTime = function () {
    var currDate = new Date();
    var sDay = currDate.getDate();
    var sMonth = (currDate.getMonth() + 1);
    var sYear = currDate.getFullYear();
    var sHour = currDate.getHours();
    var sMinute = currDate.getMinutes()
    var sSecond = currDate.getSeconds();

    var ampm = sHour >= 12 ? 'PM' : 'AM';
    var cDay: string;
    var cMonth: string;
    var cHour: string;
    var cMinute: string;
    var cSecond: string;

    if (sDay.toString().length === 1) cDay = '0' + sDay.toString();  else      cDay = sDay.toString();
    if (sMonth.toString().length === 1) cMonth = '0' + sMonth.toString(); else cMonth = sMonth.toString();

    if (sHour.toString().length === 1) cHour = '0' + sHour;
    if (sMinute.toString().length === 1) cMinute = '0' + sMinute;
    if (sSecond.toString().length === 1) cSecond = '0' + sSecond;

    return cMonth + '/' + cDay + '/' + sYear + ' ' + cHour + ':' + cMinute + ':' + cSecond;// + ' ' + ampm;

};
getDate = function () {
    var currDate = new Date();
    var sDay = currDate.getDate();
    var sMonth = (currDate.getMonth() + 1);
    var sYear = currDate.getFullYear();
    var cDay: string;
    var cMonth: string;

    if (sDay.toString().length === 1) cDay = '0' + sDay.toString();  else      cDay = sDay.toString();
    
    if (sMonth.toString().length === 1) cMonth = '0' + sMonth.toString(); else cMonth = sMonth.toString();

    return cDay + '/' + cMonth + '/' + sYear;

};

getTime = function () {
  var currDate = new Date();
  var sHour = currDate.getHours();
  var sMinute = currDate.getMinutes()
  var sSecond = currDate.getSeconds();
  var cHour: string;
  var cMinute: string;

  if (sHour.toString().length === 1) cHour = '0' + sHour.toString();  else  cHour = sHour.toString();
  
  if (sMinute.toString().length === 1) cMinute = '0' + sMinute.toString(); else cMinute = sMinute.toString();

  return cHour + ':' + cMinute;

};

  navigatedate = function(t, anyDate){
    var setDate = new Date(anyDate);
    var newDate = new Date(setDate);
    if(t === 'l'){
        newDate.setDate(newDate.getDate() - 1)
    } 
    else if(t === 'r'){
        newDate.setDate(newDate.getDate() + 1)
    }
    
    return this.getDateFormat(newDate);
  }

  getDateFormat = function(anyDate){
    var sDay = anyDate.getDate();
    var sMonth = (anyDate.getMonth() + 1);
    var sYear = anyDate.getFullYear();

    if (sDay.toString().length === 1) sDay = '0' + sDay;
    if (sMonth.toString().length === 1) sMonth = '0' + sMonth;

    return sDay + '/' + sMonth + '/' + sYear;
  };

  getServerDate = function (serverDate) {
    var currDate = new Date(serverDate);
    return this.getDateTimeFormat(currDate);
  };

  addDays = function (date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  parsedDate = function (jsonDate) {
    return jsonDate.replace('/Date(', '').replace(')/', '');
  };
  

}
