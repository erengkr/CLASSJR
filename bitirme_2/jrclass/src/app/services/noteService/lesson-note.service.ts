import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LessonNote } from 'src/app/ogrenci-liste/LessonNote';

@Injectable({
  providedIn: 'root'
})
export class LessonNoteService {

  constructor(private http:HttpClient) { }

  postNote(lessonNote:LessonNote):Observable<LessonNote>{
    return this.http.post<LessonNote>("https://localhost:7245/api/LessonNote",lessonNote)
  }
  
  getNote():Observable<LessonNote[]>{
    return this.http.get<LessonNote[]>("https://localhost:7245/api/LessonNote")
  }
  
}
