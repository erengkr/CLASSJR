import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Ogrenci } from '../ogrenci-liste/ogrenci-liste';
import { OkulLiderComponent } from '../okul-lider/okul-lider.component';

@Injectable({
  providedIn: 'root'
})
export class OgrenciservicesPostService {
  studentid: number = 0;
  studentName: string = "";
  studentSurname: string = "";
  studentClass: string = "";
  studentNo: string = "";



  private baseUrl: string = "https://localhost:7245/api/Student/";

  constructor(private http: HttpClient,
    private router: Router) { }


  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }
  signout() {
    localStorage.clear();
    this.router.navigate(["/ogrenci-giris"]);
  }

}
