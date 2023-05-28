import { formatCurrency, NgTemplateOutlet } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { OgrenciservicesGetService } from '../services/ogrenciservices-get.service';
import { OgrenciservicesPostService } from '../services/ogrenciservices-post.service';
import { AuthenticatedResponse } from './auth';
import { Ogrenci } from './ogrenci';
import { StudentTokenServiceService } from '../services/studentService/student-token-service.service';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-ogrenci-giris',
  templateUrl: './ogrenci-giris.component.html',
  styleUrls: ['./ogrenci-giris.component.css'],
  providers: [OgrenciservicesGetService]
})
export class OgrenciGirisComponent {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  constructor(private router: Router,
    private http: HttpClient,
    private studentPost: OgrenciservicesPostService,
    private fb: FormBuilder,
    private toast: NgToastService,
    private tokenService: StudentTokenServiceService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      studentNo: ['', Validators.required],
      studentPassword: ['', Validators.required]
    })
  }

  private validateAllFormFileds(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFileds(control);

      }
    });
  } 
 
  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.studentPost.login(this.loginForm.value).subscribe({
        next: (res) => {

          this.studentPost.studentid = res.studentID;
          this.studentPost.studentName = res.studentName;
          this.studentPost.studentSurname = res.studentSurname;
          this.studentPost.studentClass = res.studentClass;
          console.log(res.studentClass)          
          console.log(this.studentPost.studentid);
          
          this.tokenService.storeToken(res.token);
          this.loginForm.reset();
          const tokenPayload = this.tokenService.decodedToken();
          this.tokenService.setFullNameForStore(tokenPayload.name);
          this.tokenService.setRoleForStore(tokenPayload.role);
          this.toast.success({ detail: "Giriş Başarılı", duration: 5000, position: "top", type: "success" })
          this.router.navigate(['/ogrenci-profile']);
        },
        error: (err) => {
          this.toast.error({ detail: "Giriş Başarısız", duration: 5000, position: "top", type: "error" })
          console.log(err);

        }
      })
    } else {
      this.validateAllFormFileds(this.loginForm);
      this.toast.error({ detail: "Boş Bırakmayınız", duration: 5000, position: "top", type: "error" });
    }
  }
}


