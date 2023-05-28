import { Component, ElementRef, ViewChild } from '@angular/core';
import { OgrenciservicesPostService } from '../services/ogrenciservices-post.service';
import { OgrenciGirisComponent } from '../ogrenci-giris/ogrenci-giris.component';
import { OgrenciservicesGetService } from '../services/ogrenciservices-get.service';
import { Lesson } from '../ogrenci-giris/lesson';
import { Note } from './Note';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent {
  lesson=new Lesson;
  studentID: number = 0;
  studentName: string = "";
  studentSurname: string = "";
  studentClass: string = "";
  studentNo: string = "";
  filteredSemester!:any [];
  sum:number=0;
  avg:number=0;
  semesters:any[]=[];
 

  notes:any[]=[];

  constructor(
    private postService: OgrenciservicesPostService,
    private getService: OgrenciservicesGetService,
    
    
  ) { }
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
  
  
  ngOnInit(): void {
    this.studentID = this.postService.studentid;
    this.studentName = this.postService.studentName;
    this.studentSurname = this.postService.studentSurname;
    this.studentClass = this.postService.studentClass;
    this.studentNo=this.postService.studentNo;
   
    this.getService.getStudentsInfo().subscribe({
      next: (res) => {
        console.log(res);
        this.notes = res;
        
        console.log(this.notes[0].semester.semesterName)
        for (let i = 0; i < res.length; i++) {
          console.log(res[i].lessonName);    
          const notes2 = res[i].note || []; // Eğer note undefined ise boş bir dizi oluştur
          console.log(notes2.note1 || "Not girilmemiş"); // Eğer note1 undefined ise "Not girilmemiş" yazdır
          console.log(notes2.note2 || "Not girilmemiş");
          console.log(notes2.note3 || "Not girilmemiş");
          console.log(notes2.note4 || "Not girilmemiş");
        }
      }
    });
    this.getSemesters();
  }
  getSemesters(){
    this.getService.getSemester().subscribe({
      next: (res) => {
        console.log(res);
        this.semesters = res;
      }
    });
  }
  // filterTable(semesterName: string) {
  //   this.filteredSemester = this.notes.filter(note => note.semester.semesterName === semesterName);
  // }
  filterTable(event: any) {
    const semesterName = event.target.value;
  
    if (semesterName === "default") {
      this.filteredSemester = this.notes; // Tüm notlar gösterilecek
    } else {
      this.filteredSemester = this.notes.filter(note => note.semester.semesterName === semesterName);
      // Seçilen döneme göre filtreleme yapılıyor
    }
  }
  


  signOut() {
    this.postService.signout();
  }
}
