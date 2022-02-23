import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(list: any[], value: number) {


   console.log(list[0].errorColumn==value,'ll');

  if(value==1)
  {
    return value ? list.filter(item => item.errorColumn=='B'|| item.errorColumn=='C' || item.errorColumn=='B&C') : list;
  }
  else  if(value==2){

      return value ? list.filter(item => item.errorColumn =='E'|| item.errorColumn =='D'  || item.errorColumn=='E&D') : list;

  }
  else  if(value==3){

      return value ? list.filter(item => item.errorColumn =='F'||item.errorColumn =='G' || item.errorColumn=='F&G' ) : list;

  }
  else  if(value==4){

      return value ? list.filter(item => item.errorColumn =='H'|| item.errorColumn =='I' || item.errorColumn=='H&I') : list;

  }
  else  if(value==5){

      return value ? list.filter(item => item.errorColumn =='J' || item.errorColumn =='K' || item.errorColumn=='J&K') : list;

  }
  else  if(value==6){

      return value ? list.filter(item => item.errorColumn =='O' || item.errorColumn =='P' || item.errorColumn=='O&P') : list;

  }
  else  if(value==7){

      return value ? list.filter(item => item.errorColumn ==item.errorColumn) : list;

  }
  else  if(value==8){

    return value ? list.filter(item => item.errorColumn =='W' || item.errorColumn =='X' || item.errorColumn=='W&X') : list;

}
else  if(value==9){

  return value ? list.filter(item =>item.errorColumn =='Y' || item.errorColumn =='Z' || item.errorColumn=='Y&BZ') : list;

}
else  if(value==10){

  return value ? list.filter(item =>item.errorColumn =='AA' || item.errorColumn =='AB' || item.errorColumn=='AA&AB') : list;

}
else  if(value==11){

  return value ? list.filter(item => item.errorColumn =='AC' || item.errorColumn =='AD' || item.errorColumn=='AC&AD') : list;

}
else  if(value==12){

  return value ? list.filter(item =>item.errorColumn =='AE' || item.errorColumn =='AF' || item.errorColumn=='AE&AF') : list;

}

  }

}
