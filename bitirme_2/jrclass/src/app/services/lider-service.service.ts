import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Ogrenci } from '../ogrenci-giris/ogrenci';

@Injectable({
  providedIn: 'root'
})
export class LiderServiceService {

  private baseUrl: string = "https://localhost:7245/api/SchoolLeader/";
  private schoolLeaderPayload: any;

  schoolLeaderID: number = 0;
  schoolLeaderName: string = "";
  schoolLeaderSurname: string = "";
  schoolLeaderMail: string = "";

  
  constructor(private http: HttpClient,
    private router: Router
  ) {
    this.schoolLeaderPayload=this.decodedToken();
   }  
  
   increaseClassLevels(semesterObj:any): Observable<any> {
    return this.http.post<any>( "https://localhost:7245/api/LessonD/createSemesterAndIncreaseClassLevels", semesterObj);
  }
  
  
  getStudent(): Observable<Ogrenci[]> {
    return this.http.get<Ogrenci[]>("https://localhost:7245/api/Students");
  }

  addStudent(ogrenciv1: Ogrenci): Observable<Ogrenci> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'

      })
    }
    return this.http.post<Ogrenci>("https://localhost:7245/api/Students",
      ogrenciv1, httpOptions)
  }

  getSchoolLeaders() {
    return this.http.get<any>(this.baseUrl);
  }

  signUp(leaderObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, leaderObj);
  }
  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }
  studentSignUp(studentObj: any) {
    return this.http.post<any>("https://localhost:7245/api/Student/register", studentObj);
  }
  signout() {
    localStorage.clear();
    this.router.navigate(["/liderlogin"]);
  }
  storeToken(tokenValue: string) {
    localStorage.setItem("token", tokenValue);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return token ? jwtHelper.decodeToken(token):{};
  } 
 
  getfullNameFromToken() {
    if(this.schoolLeaderPayload)
      return this.schoolLeaderPayload.name;    
  }
  getRoleFromToken(){
    if(this.schoolLeaderPayload)
      return this.schoolLeaderPayload.role;  
  }
  getStudentsForLeader(){
    return this.http.get<any>("https://localhost:7245/api/LessonD/leaderID?schoolLeaderID="+this.schoolLeaderID)    
  }
  getTeachersForLeader(){
   
    return this.http.get<any>("https://localhost:7245/api/LessonD/teacherFromLeaderID?schoolLeaderID="+this.schoolLeaderID)    
  }
  registerLesson(lessonObj:any){
    return this.http.post<any>("https://localhost:7245/api/LessonD",lessonObj);
  }

}

