import { Component } from '@angular/core';
import { VeliservicesService } from '../services/veliservices.service';
import { Ogrenci } from '../ogrenci-giris/ogrenci';
import { Lesson } from '../ogrenci-giris/lesson';
import { OgrenciservicesGetService } from '../services/ogrenciservices-get.service';

@Component({
  selector: 'app-veli-profile',
  templateUrl: './veli-profile.component.html',
  styleUrls: ['./veli-profile.component.css']
})
export class VeliProfileComponent {
  ogrenci!: Ogrenci[];
  parentName: string = "";
  parentID: number = 0;
  parentSurname: string = "";
  parentMail: string = "";
  Lesson!: Lesson[];
  degerler: any[] = [];
  kisiler:any[]=[];
  filteredSemester!: any[];
  semesterName: string = "";
  semesters:any[]=[];

  constructor(
    private service: VeliservicesService,
    private studentService: OgrenciservicesGetService
  ) { }
// fonksiyon():void{
//   this.service.getStudentForParent().subscribe({
//     next: (res:any) => {
//       console.log(res);
//       this.kisiler=res;
//       this.degerler = res[0].lesson;
//       console.log(this.degerler);                     
//       // Öğrencilerin aldığı derslerin adlarını ve notlarını konsola yazdırma
//       for (let i = 0; i < res.length; i++) {
//         const student = res[i];
//         console.log(`Öğrenci: ${student.studentName} ${student.studentSurname}`);
//         console.log("Aldığı Dersler:");

//         for (let j = 0; j < student.lesson.length; j++) {
//           const lesson = student.lesson[j];
//           console.log(`- ${lesson.lessonName}`);

//           if (lesson.note) {
//             console.log(`  - 1. SINAV NOTU: ${lesson.note.note1}`);
//             console.log(`  - 2. SINAV NOTU: ${lesson.note.note2}`);
//             console.log(`  - ÖDEV NOTU: ${lesson.note.note3}`);
//             console.log(`  - DERSE KATILIM: ${lesson.note.note4}`);
//           } else {
//             console.log("  - Not girişi bulunmamaktadır.");
//           }
//         }
//       }
//     }
//   });
  
// }
  ngOnInit(): void {
    this.parentID = this.service.parentID;
    this.parentName = this.service.parentName;
    this.parentSurname = this.service.parentSurname;
    this.parentMail = this.service.parentMail;
  // this.fonksiyon();
  this.getSemesters();
  
  } 
  calculateAverage(note: any) {
    const grade1 = parseFloat(note?.note1) || 0;
    const grade2 = parseFloat(note?.note2) || 0;
    const grade3 = parseFloat(note?.note3) || 0;
    const grade4 = parseFloat(note?.note4) || 0;
  
    const validGradeCount = [grade1, grade2, grade3, grade4].filter(grade => grade !== 0).length;
  
    if (validGradeCount > 0) {
      const sum = grade1 + grade2 + grade3 + grade4;
      const average = sum / validGradeCount;
      return average.toFixed(2); // İsteğe bağlı olarak ondalık basamak sayısını ayarlayabilirsiniz
    } else {
      return "Not girilmemiş";
    }
  }

  filterTable(event: any) {
    this.service.getStudentForParent().subscribe({
      next: (res:any) => {
        console.log(res);
        this.kisiler=res;
        this.degerler = res[0].lesson;
        console.log(this.degerler);                     
        // Öğrencilerin aldığı derslerin adlarını ve notlarını konsola yazdırma
        this.semesterName = event.target.value;    
        if (this.semesterName === "") {
          this.filteredSemester = this.degerler;
        } else {
          console.log(this.degerler)    
          console.log(this.kisiler)
                  
          this.kisiler.forEach((element:any) => {
            element.lesson=element.lesson.filter((deger:any) => deger.semester.semesterName === this.semesterName);
           
          });            
         
        }
      
      }
    });     
  }  
  
  getSemesters(){
    this.studentService.getSemester().subscribe({
      next: (res) => {
        console.log(res);
        this.semesters = res;
      }
    });
  }
  
  

  
  logout() {
    this.service.signout();
  }
}
