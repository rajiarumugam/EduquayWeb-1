import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(list: any[], value: number) {

    
   console.log(list[0].errorColumn==value,'ll');
 
  if(value==1)
  {
    return value ? list.filter(item => item.errorColumn=='B') : list;
  }
  else  if(value==2){
     
      return value ? list.filter(item => item.errorColumn =='E') : list;

  }
  else  if(value==3){
     
      return value ? list.filter(item => item.errorColumn =='F') : list;

  }
  else  if(value==4){
     
      return value ? list.filter(item => item.errorColumn =='H') : list;

  }
  else  if(value==5){
     
      return value ? list.filter(item => item.errorColumn =='J') : list;

  }
  else  if(value==6){
     
      return value ? list.filter(item => item.errorColumn =='O') : list;

  }
  else  if(value==7){
     
      return value ? list.filter(item => item.errorColumn ==item.errorColumn) : list;

  }
  }

}