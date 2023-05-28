import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentTokenServiceService {
  private studentPayload: any;
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  constructor() { }

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
    return token ? jwtHelper.decodeToken(token) : {};
  }
  getfullNameFromToken() {
    if (this.studentPayload)
      return this.studentPayload.name;
  }
  getRoleFromToken() {
    if (this.studentPayload)
      return this.studentPayload.role;
  }
  public getRoleForStore() {
    return this.role$.asObservable();
  }

  public setRoleForStore(role: string) {
    this.role$.next(role);
  }

  public getFullNameFromStore() {
    return this.fullName$.asObservable();
  }
  public setFullNameForStore(fullName: string) {
    this.fullName$.next(fullName);
  }

}
