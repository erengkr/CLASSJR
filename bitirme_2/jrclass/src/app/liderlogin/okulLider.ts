import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class OkulLider{
    schoolLeaderID!:number;
    schoolName!:string;
    schoolLeaderName!:string;
    schoolLeaderSurname!:string;
    schoolLeaderMail!:string;
    schoolLeaderPassword!:string;
    token!:string;

}