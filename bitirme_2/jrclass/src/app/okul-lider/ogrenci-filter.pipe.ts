import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';
// import { Ogrenci } from '../ogrenci-liste/ogrenci-liste';
import { Ogrenci } from '../ogrenci-giris/ogrenci'

@Pipe({
  name: 'ogrenciFilter'
})
export class OgrenciFilterPipe implements PipeTransform {

  transform(value: Ogrenci[],filterTextStudent?: any): Ogrenci[] {

    filterTextStudent=filterTextStudent?filterTextStudent.toLocaleLowerCase():null
    
    return filterTextStudent?value.filter((p:Ogrenci)=>p.studentName.toLocaleLowerCase().indexOf(filterTextStudent)!==-1):value;    
  }


  
}
