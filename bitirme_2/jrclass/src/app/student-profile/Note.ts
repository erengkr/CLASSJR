import { Injectable } from "@angular/core";
import { Lesson } from "../ogrenci-giris/lesson";


@Injectable({
    providedIn: 'root'
  })
export class Note{
    noteID!:number;
    note1!:string;
    note2!:string;
    note3!:string;
    note4!:string;
    Lesson!:Lesson;
    lessonID!:number;   
}