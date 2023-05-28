import { Pipe, PipeTransform } from '@angular/core';
import { Ogretmen } from '../ogretmen-kayit/ogretmen';


@Pipe({
  name: 'teacherFilter'
})
export class TeacherFilterPipe implements PipeTransform {

  transform(value: Ogretmen[],filterTextTeacher?: any): Ogretmen[] {

    filterTextTeacher=filterTextTeacher?filterTextTeacher.toLocaleLowerCase():null
    
    return filterTextTeacher?value.filter((p:Ogretmen)=>p.teacherName.toLocaleLowerCase().indexOf(filterTextTeacher)!==-1):value;    
  }

}
