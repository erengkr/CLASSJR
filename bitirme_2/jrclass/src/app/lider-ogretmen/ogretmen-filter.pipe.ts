import { Pipe, PipeTransform } from '@angular/core';
import { Ogretmen } from '../ogretmen-kayit/ogretmen';

@Pipe({
  name: 'ogretmenFilter'
})
export class OgretmenFilterPipe implements PipeTransform {

  transform(value: Ogretmen[],filterText?: any): Ogretmen[] {

    filterText=filterText?filterText.toLocaleLowerCase():null
    
    return filterText?value.filter((p:Ogretmen)=>p.teacherName.toLocaleLowerCase().indexOf(filterText)!==-1):value;    
  }

}
