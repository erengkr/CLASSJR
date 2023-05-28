import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { DersProgrami } from '../ders-programi/DersProgrami';
import { DersPrgoramiServiceService } from '../services/dersProgramiService/ders-prgorami-service.service';
import { LiderServiceService } from '../services/lider-service.service';
import { OgretmenpostService } from '../services/ogretmenpost.service ';
import { TeacherStoreService } from '../services/teacher-store.service';
import { OgretmengetService } from '../services/ogretmenget.service';
import { Ogrenci } from '../ogrenci-liste/ogrenci-liste';
import { NgToastService } from 'ng-angular-popup';
// import { TeacherStoreService } from '../services/teacher-store.service';

@Component({
  selector: 'app-ogretmen-profile',
  templateUrl: './ogretmen-profile.component.html',
  styleUrls: ['./ogretmen-profile.component.css']
})
export class OgretmenProfileComponent {
  public teachers: any = [];
  constructor(private service: DersPrgoramiServiceService,
    private teacherStore: TeacherStoreService,
    private teacherService: OgretmenpostService,
    private leaderService: LiderServiceService,
  private toast:NgToastService,

  private fb:FormBuilder,

    private serviceGet: OgretmengetService
  ) { }
  noteForm!:FormGroup;
  teacherName: string = "";
  teacherSurname: string = "";
  teacherMail: string = "";
  teacherID: number = 0;
  ogrenci!: Ogrenci[];
  info: any = [];
  dersProgrami: DersProgrami = new DersProgrami();
  dersProgrami2!: DersProgrami[];
  public fullNameTeacher: string = "";
  filteredInfo: any[] = [];

  ngOnInit(form: NgForm): void {
    this.noteForm=this.fb.group({
      note1:[''],
      note2:[''],
      note3:[''],
      note4:[''],
      lessonID:['']
    })
    
    
    this.teacherID = this.serviceGet.teacherID;
    this.teacherName = this.serviceGet.teacherName;
    this.teacherSurname = this.serviceGet.teacherSurname;
    this.teacherMail = this.serviceGet.teacherMail;
    console.log(this.teacherName)
    this.serviceGet.getStudentsForTeacher().subscribe({
      next: (res) => {
        console.log(res);
        console.log(res[0].semester.semesterName)
        this.info = res;
        for (let i = 0; i < res.length; i++) {
          const lesson = res[i];
          console.log(`Ders Adı: ${lesson.lessonName}`);
          console.log(`Ders Notları: ${lesson.note.note1}, ${lesson.note.note2}, ${lesson.note.note3}, ${lesson.note.note4}`);
          console.log(`Dersi Alan Öğrenci:${lesson.student.studentName}`);
        }
      }
    });
  }
  logout() {
    this.teacherService.signout();
  }
  private validateAllFormFileds(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFileds(control);
      }
    });
  }
  onSave(){
    if(this.noteForm.valid){
      this.teacherService.saveNote(this.noteForm.value).subscribe({
        next: (response) => {
          console.log(response);
         this.toast.success({detail:"Not Başarıyla Kaydedildi",duration:5000,position:"top",type:"success"})
          this.noteForm.reset();
        }
      });
    }
  }


  filterTable(event:any){
    const semesterName=event.target.value;
    if(semesterName===""){
      this.filteredInfo=this.info;

    }else{
      this.filteredInfo=this.info.filter((info:any)=>info.semester.semesterName===semesterName);
    }
  }
}
