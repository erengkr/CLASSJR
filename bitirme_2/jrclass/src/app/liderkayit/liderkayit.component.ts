import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LiderServiceService } from '../services/lider-service.service';
import { LiderkayitService } from '../services/liderkayit.service';
import { OkulLider } from './okulLider';

@Component({
  selector: 'app-liderkayit',
  templateUrl: './liderkayit.component.html',
  styleUrls: ['./liderkayit.component.css']
})
export class LiderkayitComponent {

  type:string="password";
  isText:boolean=false;
  signupForm!:FormGroup;

constructor(
  private apiPost:LiderkayitService,
  private fb:FormBuilder,
  private liderkayit:LiderkayitService,
  private router:Router,
  private service:LiderServiceService,
  private toast:NgToastService  ){ }

  ngOnInit(): void {  
    this.signupForm=this.fb.group({
      schoolLeaderName:['',Validators.required],
      schoolLeaderSurname:['',Validators.required],
      // schoolName:['', Validators.required],
      schoolLeaderMail:['',Validators.required],
      schoolLeaderPassword:['',Validators.required]

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
        this.router.navigate(["/liderlogin"]);
      },
      error: (err => {
        alert(err?.error.message);
      })
    })
    console.log(this.signupForm.value);
  }else{
    this.validateAllFormFileds(this.signupForm);
    this.toast.error({detail:"Formu Eksiksiz Doldurunuz",duration:5000,position:"top",type:"error"})
    // alert("Boş Bırakmayınız");

  }
}

}
