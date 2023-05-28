import { Injectable } from "@angular/core";
import { Ogrenci } from "./ogrenci";
import { Semester } from "./Semester";

@Injectable({
    providedIn: 'root'
  })
export class Lesson{
    lessonID!:number;
    lessonName!:string;
    studentID!:number;
    Ogrenci!:Ogrenci; 
  Semester!: Semester;
   
}