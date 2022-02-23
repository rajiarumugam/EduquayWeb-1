import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(list: any[], value: number) {


   console.log(list[0].errorColumn==value,'ll');

  if(value==1)
  {
    return value ? list.filter(item => item.errorColumn=='B'|| item.errorColumn=='C') : list;
  }
  else  if(value==2){

      return value ? list.filter(item => item.errorColumn =='E'|| item.errorColumn =='D') : list;

  }
  else  if(value==3){

      return value ? list.filter(item => item.errorColumn =='F'||item.errorColumn =='G') : list;

  }
  else  if(value==4){

      return value ? list.filter(item => item.errorColumn =='H'|| item.errorColumn =='I') : list;

  }
  else  if(value==5){

      return value ? list.filter(item => item.errorColumn =='J' || item.errorColumn =='K') : list;

  }
  else  if(value==6){

      return value ? list.filter(item => item.errorColumn =='O' || item.errorColumn =='P') : list;

  }
  else  if(value==7){

      return value ? list.filter(item => item.errorColumn ==item.errorColumn) : list;

  }
  }

}
