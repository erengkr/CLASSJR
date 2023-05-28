import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderStoreService {
  private id$=new BehaviorSubject<number>(0);
private fullName$=new BehaviorSubject<string>("");
private role$=new BehaviorSubject<string>("");
  constructor() { }

  public getRoleForStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    this.role$.next(role);
  }

  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }
  public setFullNameForStore(fullName:string){
    this.fullName$.next(fullName);
  }
 
}
