import { Component, Injectable, OnInit } from '@angular/core';
import { Ogrenci } from './ogrenci-liste';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Comment } from './comment';
import { OgrenciservicesGetService } from '../services/ogrenciservices-get.service';
import { LessonNote } from './LessonNote';
import { LessonNoteService } from '../services/noteService/lesson-note.service';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-ogrenci-liste',
  templateUrl: './ogrenci-liste.component.html',
  styleUrls: ['./ogrenci-liste.component.css']
})

export class OgrenciListeComponent implements OnInit {
  lessonNote!: LessonNote[];
  lessonNote2!: LessonNote[];

  ogrenci2: Ogrenci = new Ogrenci();
  ogrenci!: Ogrenci[];
  comment!: Comment[];
  filteredStudents!: Ogrenci[];
  filterText = "";
  constructor(private http: HttpClient,
    private service: OgrenciservicesGetService,
   private noteService:LessonNoteService 
    ) { }
  ngOnInit(): void {
    this.service.getStudent().subscribe(data => {
      this.ogrenci = data;
      console.log(this.ogrenci)
    });   
    
    this.noteService.getNote().subscribe(data=>{
      this.lessonNote=data;
      console.log(this.lessonNote)
    }); 
    //Filtreleme için böyle bişey aklıma geldi bi bak 
    // this.lessonNote2=this.lessonNote.filter(this.lessonNote=> this.lessonNote.studentId==this.ogrenci2.id)


  }
  filterAll(){
    this.filteredStudents = this.ogrenci;
  }
  filter1A() {
    this.filteredStudents = this.ogrenci.filter(ogrenci => ogrenci.studentClass == "1/A");
  }
  filter1B() {
    this.filteredStudents = this.ogrenci.filter(ogrenci => ogrenci.studentClass == "1/B");
  }
  filter1C() {
    this.filteredStudents = this.ogrenci.filter(ogrenci => ogrenci.studentClass == "1/C");
  }
  filter2A() {
    this.filteredStudents = this.ogrenci.filter(ogrenci => ogrenci.studentClass == "2/A");
  }
  filter2B() {
    this.filteredStudents = this.ogrenci.filter(ogrenci => ogrenci.studentClass == "2/B");
  }
  filter2C() {
    this.filteredStudents = this.ogrenci.filter(ogrenci => ogrenci.studentClass == "2/C");
  }
  filter3A() {
    this.filteredStudents = this.ogrenci.filter(ogrenci => ogrenci.studentClass == "3/A");
  }
  filter3B() {
    this.filteredStudents = this.ogrenci.filter(ogrenci => ogrenci.studentClass == "3/B");
  }
  filter3C() {
    this.filteredStudents = this.ogrenci.filter(ogrenci => ogrenci.studentClass == "3/C");
  }
  filter4A() {
    this.filteredStudents = this.ogrenci.filter(ogrenci => ogrenci.studentClass == "4/A");
  }
  filter4B() {
    this.filteredStudents = this.ogrenci.filter(ogrenci => ogrenci.studentClass == "4/B");
  }
  filter4C() {
    this.filteredStudents = this.ogrenci.filter(ogrenci => ogrenci.studentClass == "4/C");
  }
  filter5A() {
    this.filteredStudents = this.ogrenci.filter(ogrenci => ogrenci.studentClass == "5/A");
  }
  filter5B() {
    this.filteredStudents = this.ogrenci.filter(ogrenci => ogrenci.studentClass == "5/B");
  }
  filter5C() {
    this.filteredStudents = this.ogrenci.filter(ogrenci => ogrenci.studentClass == "5/C");
  }
 
  populateForm(selectedRecord: Ogrenci) {
    this.ogrenci2 = selectedRecord;
  }
  
}

