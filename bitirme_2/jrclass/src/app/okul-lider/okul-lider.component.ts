import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { OkulLider } from '../liderkayit/okulLider';
// import { Ogrenci } from '../ogrenci-liste/ogrenci-liste';
import { Ogrenci } from '../ogrenci-giris/ogrenci'

import { LeaderStoreService } from '../services/leaderStoreService/leader-store.service';
import { LiderServiceService } from '../services/lider-service.service';
import { OgrenciservicesGetService } from '../services/ogrenciservices-get.service';
import { Lesson } from '../ogrenci-giris/lesson';
import { Ogretmen } from '../ogretmen-kayit/ogretmen';
import { Parent } from '../veli-kayit/veli-kayit';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-okul-lider',
  templateUrl: './okul-lider.component.html',
  styleUrls: ['./okul-lider.component.css']
})
export class OkulLiderComponent implements OnInit {
  lesson = new Lesson;
  schoolLeaderID: number = 0;
  schoolLeaderName: string = "";
  schoolLeaderSurname: string = "";
  schoolLeaderMail: string = "";

  changeForm:boolean =true;
  loadingIconShow:boolean=false;





  
  public leaders: any = [];
  ogrenciv1: Ogrenci = new Ogrenci();
  ogrenci!: Ogrenci[];
  filteredStudents!: Ogrenci[];
  teachers!: Ogretmen[];
  filteredTeachers!: Ogretmen[];
  teacher: Ogretmen = new Ogretmen();
  studentSignupForm!: FormGroup;
  registerLessonForm!:FormGroup;
  updateSemesterForm!:FormGroup;

  info: any[] = [];
  veliler: Parent[] = [];
  

  constructor(private http: HttpClient,
    private apiPost: LiderServiceService,
    private fb: FormBuilder,
    private router: Router,
    private toast: NgToastService,

    private leaderStore: LeaderStoreService
  ) { }
  userId!: number;
  public id!: number;
  public fullName: string = "";
  filterTextStudent = "";
  filterTextTeacher = "";


  ngOnInit() {
    console.log(this.apiPost.schoolLeaderID)

    this.schoolLeaderID = this.apiPost.schoolLeaderID;
    this.schoolLeaderName = this.apiPost.schoolLeaderName;
    this.schoolLeaderSurname = this.apiPost.schoolLeaderSurname;
    this.schoolLeaderMail = this.apiPost.schoolLeaderMail;

    this.studentSignupForm = this.fb.group({
      studentName: ['', Validators.required],
      studentSurname: ['', Validators.required],
      studentClass: ['', Validators.required],
      studentNo: ['', Validators.required],
      parentID: ['', Validators.required],
      schoolLeaderID: ['', Validators.required],

      studentPassword: ['', Validators.required]
    })

    this.registerLessonForm=this.fb.group({
      lessonName:['',Validators.required],
      teacherID:['',Validators.required],
      studentID:['',Validators.required]
      


    })

    this.updateSemesterForm=this.fb.group({
      semesterName:['',Validators.required]
    })

    this.apiPost.getStudentsForLeader().subscribe({
      next: (res) => {
        console.log(res);
        this.ogrenci=res;
        this.filteredStudents = res;      
      
      }
    });
    this.apiPost.getTeachersForLeader().subscribe({
      next: (res) => {
        console.log(res);
        this.filteredTeachers = res;
        this.teachers = res;
        console.log(this.teachers)
        console.log("ogretmenler listelendi");
      }
    });

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
  
  onRegisterLesson(){
    if(this.registerLessonForm.valid){
      this.loadingIconShow=true;
      this.apiPost.registerLesson(this.registerLessonForm.value).subscribe({
        next:(response)=>{
          this.loadingIconShow=false;
          this.toast.success({ detail: "Ders Kaydı Başarılı", duration: 5000, position: "top", type: "success" })
          this.registerLessonForm.reset();
        },
        error:(err=>{
          this.loadingIconShow=false;
          alert(err.error.message)
        })
      })
      console.log(this.registerLessonForm.value);
    }else{
      this.validateAllFormFileds(this.registerLessonForm);
      this.toast.error({ detail: "Boş Bırakmayınız", duration: 5000, position: "top", type: "error" });
    }
  }
  

  filterStudent(studentClass: string) {
    if (studentClass === "") {
      this.filteredStudents = this.ogrenci;
    } else {
      this.filteredStudents = this.ogrenci.filter(ogrenci => ogrenci.studentClass === studentClass);
    }
  }
  
  excelExport() {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ogrenci);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Öğrenciler');

    /* save to file */
    XLSX.writeFile(wb, 'ogrenci-listesi.xlsx');
  }
  excelExport2() {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.teachers);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Öğretmenler');

    /* save to file */
    XLSX.writeFile(wb, 'öğretmen-listesi.xlsx');
  }
  fileExcelUpload(file: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(file.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      const data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      data.splice(0, 1);
      console.log(data);
      this.onPost(data);
    };
    reader.readAsBinaryString(target.files[0]);
    file.target.value = '';

  }
  postStudent(ogrenciv1: Ogrenci): Observable<Ogrenci> {
    console.log("postStudent Triggered!!!")
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    return this.http.post<Ogrenci>("https://localhost:7245/api/Students",
      ogrenciv1, httpOptions)
  }
  onPost(_data: Ogrenci[]) {
    this.postStudent(this.ogrenciv1).subscribe(data => {
      this.ogrenciv1 = data;
      console.log()
    })
  }
  deleteStudent(id: number): Observable<Ogrenci> {

    return this.http.delete<Ogrenci>("https://localhost:7245/api/Students" + "/" + id)
  }
  onClear() {
    return this.http.get("https://localhost:7245/api/Students").toPromise().then(res => this.ogrenci = res as Ogrenci[]);
  }
  onDelete(studentID: number) {
    console.log("onDelete Triggered!!!")
    this.deleteStudent(studentID).subscribe(
      res => {
        this.onClear();

      }
    )
  }
  updateStudentt(studentID: number): Observable<Ogrenci> {
    return this.http.put<Ogrenci>("https://localhost:7245/api/Students" + "/" + studentID, studentID)

  }
  onUpdate(ogrenciv1: Ogrenci) {
    console.log("updateçalıştı")
    this.updateStudentt(ogrenciv1.studentID).subscribe((ogrenciv1: Ogrenci) => this.updateStudentt(ogrenciv1.studentID))
  }
  populateForm(selectedRecord: Ogrenci) {
    this.ogrenciv1 = selectedRecord;
  }
  populateForm2(selectedRecord: Ogretmen) {
    this.teacher = selectedRecord;
  }
  resetForm(form: NgForm) {
    form.resetForm();
    this.ogrenciv1 = new Ogrenci();
  }
  logout() {
    this.apiPost.signout();
  }


  formChange(){
    this.changeForm=!this.changeForm;
  }
  onSignup() {
    
    if (this.studentSignupForm.valid) {
      this.loadingIconShow=true;
      this.apiPost.studentSignUp(this.studentSignupForm.value)
        .subscribe({
          next: (response) => {
            this.loadingIconShow=false;
            alert(response.message)
            this.studentSignupForm.reset();
           
          },
          error: (err => {
            this.loadingIconShow=false;
            alert(err.error.message)
          })
        })
      console.log(this.studentSignupForm.value);
    } else {
      this.validateAllFormFileds(this.studentSignupForm);
      this.toast.error({ detail: "Boş Bırakmayınız", duration: 5000, position: "top", type: "error" })
    }
  }
  updateClass() {
   if(this.updateSemesterForm.valid){
    this.loadingIconShow=true;
    this.apiPost.increaseClassLevels(this.updateSemesterForm.value)
    .subscribe({
      next: (response) => {
        this.loadingIconShow=false;
        this.toast.success({ detail: "Yeni Döneme Geçildi ",  duration: 5000, position: "top", type: "success" })
        this.updateSemesterForm.reset();
       
      },
      error: (err => {
        this.loadingIconShow=false;
        alert(err.error.message)
      })
    })
  }
  }
}






