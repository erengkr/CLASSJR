import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DersProgrami } from 'src/app/ders-programi/DersProgrami';
import { NgModel } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DersPrgoramiServiceService {

  constructor( private http:HttpClient) { }

  postDersProgrami(dersProgrami: DersProgrami): Observable<DersProgrami> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'

      })
    }
    return this.http.post<DersProgrami>("https://localhost:7245/api/DersProgrami",
      dersProgrami, httpOptions)
  }

  getDersProgrami(): Observable<DersProgrami[]> {
    return this.http.get<DersProgrami[]>("https://localhost:7245/api/DersProgrami")
  }
}
