import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OkulLider } from '../liderkayit/okulLider';
import { Ogrenci } from '../ogrenci-liste/ogrenci-liste';

@Injectable({
  providedIn: 'root'
})
export class LiderkayitService { 

  constructor(private http: HttpClient) { }
  
  private baseUrl: string = "https://localhost:7245/api/SchoolLeader/";

  signUp(leaderObj:any){
return this.http.post<any>(`${this.baseUrl}register`,leaderObj);
  }
}

