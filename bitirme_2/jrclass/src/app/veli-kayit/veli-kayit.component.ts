import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { VeliservicesService } from '../services/veliservices.service';
import { Parent } from './veli-kayit';
import { VeliservicesGet } from '../services/veliservicesGet';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-veli-kayit',
  templateUrl: './veli-kayit.component.html',
  styleUrls: ['./veli-kayit.component.css'],
  providers: [VeliservicesService, VeliservicesGet]
})
export class VeliKayitComponent {
  veli: Parent = new Parent();
  signupForm!: FormGroup;

  constructor(
    private apiPost: VeliservicesService,
    private apiGet: VeliservicesGet,
    private fb: FormBuilder,
    private router: Router,
    private service: VeliservicesService,
    private toast:NgToastService
  ) {
    this.apiGet.getVeli(this.veli).subscribe(data1 => {
      console.log(data1);
    })
  }
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      parentName: ['', Validators.required],
      parentSurname: ['', Validators.required],
      // schoolName:['', Validators.required],
      parentMail: ['', Validators.required],
      parentPassword: ['', Validators.required]
    })
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
  onSignup(){
    if(this.signupForm.valid){  
      this.service.signUp(this.signupForm.value)
      .subscribe({
        next: (response) => {
          this.toast.success({detail:"Kayıt Başarılı",duration:5000,position:"top",type:"success"})
          // alert(response.message)        
          this.signupForm.reset();
          this.router.navigate(["/veli-login"]);
        },
        error: (err => {
          alert(err?.error.message);
        })
      })
      console.log(this.signupForm.value);
    }else{
      this.validateAllFormFileds(this.signupForm);
      this.toast.error({detail:"Boş Bırakmayınız",duration:5000,position:"top",type:"error"})
      // alert("Boş Bırakmayınız");
  
    }
  }
  















  onSubmit(form: NgForm) {
    console.log("Onsubmit triggered..");
    console.log(form.value);
    this.apiPost.addParent(this.veli).subscribe(data => {

    });
  }

  getParent() {
    this.apiGet.getVeli(this.veli).subscribe(data1 => {
      console.log("getParent Triggerd")
      console.log(data1)
    })
  }
}



