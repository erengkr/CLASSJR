import { Pipe, PipeTransform } from '@angular/core';
import { Ogrenci } from './ogrenci-liste';

@Pipe({
  name: 'ogrenciListe'
})
export class OgrenciListePipe implements PipeTransform {

 
  
  transform(value: Ogrenci[],filterText?: any): Ogrenci[] {

    filterText=filterText?filterText.toLocaleLowerCase():null
    
    return filterText?value.filter((p:Ogrenci)=>p.studentName.toLocaleLowerCase().indexOf(filterText)!==-1):value;    
  }

}
