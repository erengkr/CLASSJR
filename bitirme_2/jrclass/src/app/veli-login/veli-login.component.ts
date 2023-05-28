import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { VeliservicesService } from '../services/veliservices.service';

@Component({
  selector: 'app-veli-login',
  templateUrl: './veli-login.component.html',
  styleUrls: ['./veli-login.component.css']
})
export class VeliLoginComponent {
  loginFormParent!: FormGroup;
  constructor(
    private service: VeliservicesService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private toast:NgToastService,
  ) { }

  ngOnInit(): void {
    this.loginFormParent = this.fb.group({
      parentMail: ['', Validators.required],
      parentPassword: ['', Validators.required]
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
    if (this.loginFormParent.valid) {
      console.log(this.loginFormParent.value);
      this.service.login(this.loginFormParent.value).subscribe({
        next: (response) => {

          this.service.parentID = response.parentID;
          this.service.parentName = response.parentName;
          this.service.parentSurname = response.parentSurname;
          this.service.parentMail = response.parentMail;

          this.service.storeToken(response.token);
          this.loginFormParent.reset();
          const tokenPayload=this.service.decodedToken();         
          
          this.toast.success({detail:"Giriş Başarılı",duration:5000,position:"top",type:"success"})
          // alert(response.message);
          localStorage.setItem("jwt", response.token);
          this.router.navigate(["veli-profile"]);
        },
        error: (err) => {
          alert(err?.error.message);
        }
      })
    } else {
      this.validateAllFormFields(this.loginFormParent);
      this.toast.error({detail:"Giriş Başarısız",duration:5000,position:"top",type:"error"});
      // alert("Boş Bırakmayınız");

    }
  }

}
