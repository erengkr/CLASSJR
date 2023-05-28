import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { OgrenciGirisComponent } from './ogrenci-giris/ogrenci-giris.component';
import { OgretmenKayitComponent } from './ogretmen-kayit/ogretmen-kayit.component';
import { VeliKayitComponent } from './veli-kayit/veli-kayit.component';
import { Parent } from './veli-kayit/veli-kayit';
import {NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { OgrenciListeComponent } from './ogrenci-liste/ogrenci-liste.component';
import { OkulLiderComponent } from './okul-lider/okul-lider.component';
import { LiderkayitComponent } from './liderkayit/liderkayit.component';
import { LiderOgretmenComponent } from './lider-ogretmen/lider-ogretmen.component';
import { OgrenciservicesPostService } from './services/ogrenciservices-post.service';
import { HomeComponent } from './home/home.component';
import { LiderloginComponent } from './liderlogin/liderlogin.component';
import { OgretmenLoginComponent } from './ogretmen-login/ogretmen-login.component';
import { VeliLoginComponent } from './veli-login/veli-login.component';
import { OgretmenProfileComponent } from './ogretmen-profile/ogretmen-profile.component';
import { DersProgramiComponent } from './ders-programi/ders-programi.component';
import { AuthGuard } from './guards/auth.guard';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { LessonRegisterComponent } from './lesson-register/lesson-register.component';
import { VeliProfileComponent } from './veli-profile/veli-profile.component';



const routes: Routes = [
 
  {path:'',component:HomeComponent},
  {path:'veli-kayit',component:VeliKayitComponent},
  {path:'ogrenci-giris',component:OgrenciGirisComponent},
  {path:'ogretmen-kayit',component:OgretmenKayitComponent},
  {path:'ogrenci-liste',component:OgrenciListeComponent,},
  {path:'okul-lider-ogrenci',component:OkulLiderComponent,canActivate:[AuthGuard]},
  {path:'liderkayit',component:LiderkayitComponent},
  {path:'okul-lider-ogretmen',component:LiderOgretmenComponent,canActivate:[AuthGuard]},
  {path:'content',component:ContentComponent},
  {path:'liderlogin',component:LiderloginComponent},
  {path:'ogretmen-login',component:OgretmenLoginComponent},
  {path:'veli-login',component:VeliLoginComponent},
  {path:'ogrenci-profile',component:StudentProfileComponent,canActivate:[AuthGuard]}, 
  {path:'lesson-register',component:LessonRegisterComponent},
  {path:'ogretmen-profile',component:OgretmenProfileComponent,canActivate:[AuthGuard]},
  {path:'dersProgrami',component:DersProgramiComponent},
  {path:'veli-profile',component:VeliProfileComponent,canActivate:[AuthGuard]},

  {path:'',redirectTo:'',pathMatch:'full'}
 
];

@NgModule({
  
  imports: [FormsModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
