import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DersPrgoramiServiceService } from '../services/dersProgramiService/ders-prgorami-service.service';
import { DersProgrami } from './DersProgrami';
import { NgModel } from '@angular/forms';
import { OgretmenpostService } from '../services/ogretmenpost.service ';
import { Ogretmen } from '../ogretmen-kayit/ogretmen';

@Component({
  selector: 'app-ders-programi',
  templateUrl: './ders-programi.component.html',
  styleUrls: ['./ders-programi.component.css'],
  providers: [DersPrgoramiServiceService]
})
export class DersProgramiComponent {

  dersProgrami: DersProgrami = new DersProgrami();
  ogretmen: Ogretmen = new Ogretmen();
  constructor(private service: DersPrgoramiServiceService,
    private postTeache:OgretmenpostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.service.getDersProgrami().subscribe(data=>{
    //   //ne işe yarıyor bilmiyorm!!!
    //   this.dersProgrami=data[0];
    //   console.log(this.dersProgrami);
    // }
    //)
  }
  // onSubmit(form:NgForm){
  //   this.service.postDersProgrami(this.dersProgrami).subscribe(data=>{
  //     console.log(data);
  //     this.router.navigate(['ders-programi']);
  //   })
  // }
  onSubmit(form: NgForm) {
    this.service.postDersProgrami(form.value).subscribe(data => {
      console.log(data);         
    })
  }}

  