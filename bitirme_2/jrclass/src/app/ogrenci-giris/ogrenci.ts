import { Injectable } from "@angular/core";
import { Lesson } from "./lesson";
import { Parent } from "../veli-kayit/veli-kayit";

@Injectable({
    providedIn: 'root'
  })
export class Ogrenci{
    studentID!:number;
    studentName!:string;
    studentSurname!:string;
    studentNo!:string;
    studentClass!:string;
    studentPassword!:string;
    lesson!:Lesson;
  role!: string;
  parent!:Parent;
   
}