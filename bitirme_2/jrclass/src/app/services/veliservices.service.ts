import { Injectable } from '@angular/core';
import { Parent } from '../veli-kayit/veli-kayit';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class VeliservicesService {
  parentName: string = "";
  parentID: number = 0;
  parentSurname: string = "";
  parentMail: string = "";

  constructor(private http: HttpClient,
    private router:Router
    ) { }

  addParent(veli: Parent): Observable<Parent> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'

      })
    }
    return this.http.post<Parent>("https://localhost:7245/api/Parents",
      veli, httpOptions)
  }
  private baseUrl: string = "https://localhost:7245/api/Parent/";

  signUp(parentObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, parentObj);
  }
  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }
  getStudentForParent(){
    return this.http.get<any>("https://localhost:7245/api/LessonD/parentID?parentID="+this.parentID);
  }
  signout() {
    localStorage.clear();
    this.router.navigate(["/veli-login"]);
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
