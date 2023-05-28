import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ogrenci } from '../ogrenci-liste/ogrenci-liste';
import { OgrenciservicesPostService } from './ogrenciservices-post.service';

@Injectable({
  providedIn: 'root'
})
export class OgrenciservicesGetService {

  constructor(private http:HttpClient,
    private ogrenciPost:OgrenciservicesPostService
    ) { } 
  
  baseUrl="https://localhost:7245/api/LessonD?StudentID=";
  getStudent():Observable<Ogrenci[]>{    
    return this.http.get<Ogrenci[]>("https://localhost:7245/api/Students")
  }
  getStudentsInfo(){
    return this.http.get<any>("https://localhost:7245/api/LessonD?StudentID="+this.ogrenciPost.studentid)
  }
  getSemester(){
    return this.http.get<any>("https://localhost:7245/api/LessonD/Semester")
  }
}
