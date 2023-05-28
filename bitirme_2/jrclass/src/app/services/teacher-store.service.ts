import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherStoreService {
private fullNameTeacher$=new BehaviorSubject<string>("");
private roleTeacher$=new BehaviorSubject<string>("");
  constructor() { }
   public getRoleForStore(){
    return this.roleTeacher$.asObservable();
  }

  public setRoleForStore(role:string){
    this.roleTeacher$.next(role);
  }

  public getFullNameFromStore(){
    return this.fullNameTeacher$.asObservable();
  }
  public setFullNameForStore(fullName:string){
    this.fullNameTeacher$.next(fullName);
  }
}
