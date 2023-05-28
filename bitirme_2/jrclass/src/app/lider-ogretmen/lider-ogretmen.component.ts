import { Component, OnInit } from '@angular/core';
import { Ogretmen } from '../ogretmen-kayit/ogretmen';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { OgretmengetService } from '../services/ogretmenget.service';
import { LiderServiceService } from '../services/lider-service.service';

@Component({
  selector: 'app-lider-ogretmen',
  templateUrl: './lider-ogretmen.component.html',
  styleUrls: ['./lider-ogretmen.component.css']
})
export class LiderOgretmenComponent implements OnInit{
  constructor(private http: HttpClient,
    private apiGet:OgretmengetService,
    private service:LiderServiceService){}

schoolLeaderID:number=0;
    schoolLeaderName:string="";
    schoolLeaderSurname:string="";
    schoolLeaderMail:string="";


  ogretmen:Ogretmen =new Ogretmen();
  ogretmenv1!:Ogretmen[];

  filterText=""
  excelExport() {
   
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ogretmenv1);
  
   
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Öğretmenler');  
   
    XLSX.writeFile(wb, 'ogretmen-listesi.xlsx');
  } 

ngOnInit() {

  console.log(this.schoolLeaderID)
  this.schoolLeaderID=this.service.schoolLeaderID;
  this.schoolLeaderName=this.service.schoolLeaderName;
  this.schoolLeaderSurname=this.service.schoolLeaderSurname;
 
  this.service.getTeachersForLeader().subscribe({
    next:(res)=>{
      console.log(res);
      this.ogretmenv1=res;
      console.log("ogretmenler listelendi");
    
    }
  });
}
}
