import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ogretmen } from '../ogretmen-kayit/ogretmen';

@Injectable({
  providedIn: 'root'
})
export class OgretmengetService {
  teacherName: string = "";
  teacherID: number = 0;
  teacherSurname: string = "";
  teacherMail: string = "";
  addTeache(ogretmen: Ogretmen) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getTeache(ogrentmen: Ogretmen) {
    let url = "https://localhost:7245/api/Teaches";
    return this.http.get(url)

  }
  // https://localhost:7245/api/LessonD/teacherID?teacherID=1

  getStudentsForTeacher() {
    return this.http.get<any>("https://localhost:7245/api/LessonD/teacherID?teacherID=" + this.teacherID)
  }
}
