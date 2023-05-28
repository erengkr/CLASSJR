import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { OgretmengetService } from '../services/ogretmenget.service';
import { Ogretmen } from './ogretmen';
import { OgretmenpostService } from '../services/ogretmenpost.service ';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-ogretmen-kayit',
  templateUrl: './ogretmen-kayit.component.html',
  styleUrls: ['./ogretmen-kayit.component.css'],
  providers: [OgretmengetService,OgretmengetService]
})
export class OgretmenKayitComponent {
ogretmen :Ogretmen =new Ogretmen();
signupForm!:FormGroup;
constructor(
  private apiPost:OgretmenpostService,
  private apiGet:OgretmengetService,
  private fb:FormBuilder,
  private router:Router,
  private toast:NgToastService,
  
  
)
{
  // this.apiGet.getTeache(this.ogretmen).subscribe(data=>{
  //   console.log(data);
  // })
}
ngOnInit(): void {  
  this.signupForm=this.fb.group({
    teacherName:['',Validators.required],
    teacherSurname:['',Validators.required],
    // schoolName:['', Validators.required],
    teacherMail:['',Validators.required],
    schoolLeaderID:['',Validators.required],

    teacherPassword:['',Validators.required]

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
    this.apiPost.signUp(this.signupForm.value)
    .subscribe({
      next: (response) => {
        this.toast.success({detail:"Kayıt Başarılı",duration:5000,position:"top",type:"success"})
        // alert(response.message)        
        this.signupForm.reset();
        this.router.navigate([""]);
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

// onSubmit (form:NgForm){
//   this.apiPost.addTeache(this.ogretmen).subscribe(data=>{
//     console.log("addTeache Triggered....")
//     console.log(data);
//   })
// }
// getOgretmen(){
//   this.apiGet.getTeache(this.ogretmen).subscribe(data=>{
//     console.log("getOgretmen Triggered....")
//     console.log(data);
//   })
// }

}



  
  
  
   