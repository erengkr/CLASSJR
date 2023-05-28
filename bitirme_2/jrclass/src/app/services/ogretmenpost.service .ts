import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Ogretmen } from '../ogretmen-kayit/ogretmen';

@Injectable({
  providedIn: 'root'
})
export class OgretmenpostService {
  private baseUrl: string = "https://localhost:7245/api/Teacher/";  
  constructor(private http: HttpClient,
    private router: Router) {    
   }

  addTeache(ogretmen: Ogretmen): Observable<Ogretmen> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'

      })
    }
    return this.http.post<Ogretmen>("https://localhost:7245/api/Teaches",
      ogretmen, httpOptions)
  }
  getTeacher(){
    return this.http.get<any>(this.baseUrl);
  } 

  signUp(teacherObj:any){
return this.http.post<any>(`${this.baseUrl}register`,teacherObj);
  }
  saveNote(noteObj:any){
    return this.http.post<any>("https://localhost:7245/api/LessonD/note",noteObj);

  }
  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
  }
  signout() {
    localStorage.clear();
    this.router.navigate(["/ogretmen-login"]);
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
}
