import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { LiderServiceService } from '../services/lider-service.service';
import { OgretmenpostService } from '../services/ogretmenpost.service ';
import { Ogretmen } from '../ogretmen-kayit/ogretmen';
import { OgretmengetService } from '../services/ogretmenget.service';

@Component({
  selector: 'app-ogretmen-login',
  templateUrl: './ogretmen-login.component.html',
  styleUrls: ['./ogretmen-login.component.css']
})

export class OgretmenLoginComponent {
  loginFormTeacher!:FormGroup;
  constructor( private service:OgretmenpostService,
     private router:Router,
     private http:HttpClient,
     private fb:FormBuilder,
     private toast:NgToastService,
     private liderService:LiderServiceService,
     private getSerivce:OgretmengetService
     ) { }

  ngOnInit(): void {
    this.loginFormTeacher = this.fb.group({
    teacherMail: ['',Validators.required],
      teacherPassword: ['',Validators.required]     
    })
  }
  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control);

      }
    });

  }
  onLogin(){
    if(this.loginFormTeacher.valid){
      console.log(this.loginFormTeacher.value);
      this.service.login(this.loginFormTeacher.value).subscribe({
        next: (response) => {
          console.log(response);
          
          this.getSerivce.teacherID=response.teacherID;
          this.getSerivce.teacherName=response.teacherName;
          this.getSerivce.teacherSurname=response.teacherSurname;
          this.getSerivce.teacherMail=response.teacherMail;        
console.log(response.teacherName)
         
          this.service.storeToken(response.token);  
          this.loginFormTeacher.reset();
          this.service.decodedToken();
          this.toast.success({detail:"Giriş Başarılı",duration:5000,position:"top",type:"success"})
          localStorage.setItem("jwt",response.token);
          this.router.navigate(["/ogretmen-profile"]);
        },
        error: (err) => {
          // alert(err?.error.message);
          this.toast.error({detail:"Giriş Başarısız",duration:5000,position:"top",type:"error"});
        }
      })
    }else{
      this.validateAllFormFields(this.loginFormTeacher);
      alert("Boş Bırakmayınız");

    }
  }
}
