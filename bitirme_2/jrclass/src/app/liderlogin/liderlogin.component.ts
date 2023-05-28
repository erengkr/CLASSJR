import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LiderServiceService } from '../services/lider-service.service';
import { LeaderStoreService } from '../services/leaderStoreService/leader-store.service';


@Component({
  selector: 'app-liderlogin',
  templateUrl: './liderlogin.component.html',
  styleUrls: ['./liderlogin.component.css']
})
export class LiderloginComponent {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginFormLider!: FormGroup;


  constructor(private service: LiderServiceService, private router: Router, private http: HttpClient, private fb: FormBuilder,
    private toast: NgToastService,
    private storeService: LeaderStoreService,
 
  ) { }

  ngOnInit(): void {
    this.loginFormLider = this.fb.group({
      schoolLeaderMail: ['', Validators.required],
      schoolLeaderPassword: ['', Validators.required]
    })

  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);

      }
    });
  }


  onLogin() {
    if (this.loginFormLider.valid) {
      console.log(this.loginFormLider.value);
      this.service.login(this.loginFormLider.value).subscribe({
        next: (response) => {        

          this.service.schoolLeaderID=response.schoolLeaderID;
          this.service.schoolLeaderName=response.schoolLeaderName;
          this.service.schoolLeaderSurname=response.schoolLeaderSurname;
          this.service.schoolLeaderMail=response.schoolLeaderMail;  
          

          
          
          this.service.storeToken(response.token);
          this.loginFormLider.reset();
          const tokenPayload = this.service.decodedToken();
          this.storeService.setFullNameForStore(tokenPayload.name);
          this.storeService.setRoleForStore(tokenPayload.role);
          this.toast.success({ detail: "Giriş Başarılı", duration: 5000, position: "top", type: "success" })
          this.router.navigate(["/okul-lider-ogrenci"]);
        },
        error: (err) => {
          this.toast.error({ detail: "Giriş Başarısız", duration: 5000, position: "top", type: "error" });
          console.log(err);
        }
      })
    } else {
      this.validateAllFormFields(this.loginFormLider);
      this.toast.error({ detail: "Boş Bırakmayınız", duration: 5000, position: "top", type: "error" });
    }
  }

}