import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { VeliKayitComponent } from './veli-kayit/veli-kayit.component';
import { OgrenciGirisComponent } from './ogrenci-giris/ogrenci-giris.component';
import { OgretmenKayitComponent } from './ogretmen-kayit/ogretmen-kayit.component';
import {Component} from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OgrenciListeComponent } from './ogrenci-liste/ogrenci-liste.component';
import { Ogrenci } from './ogrenci-liste/ogrenci-liste';
import { OkulLiderComponent } from './okul-lider/okul-lider.component';
import { LiderkayitComponent } from './liderkayit/liderkayit.component';
import { LiderOgretmenComponent } from './lider-ogretmen/lider-ogretmen.component';
import { OgrenciFilterPipe } from './okul-lider/ogrenci-filter.pipe';
import { OgretmenFilterPipe } from './lider-ogretmen/ogretmen-filter.pipe';
import { JwtModule } from '@auth0/angular-jwt';
import { HomeComponent } from './home/home.component';
import { LiderloginComponent } from './liderlogin/liderlogin.component';
import { OgretmenLoginComponent } from './ogretmen-login/ogretmen-login.component';
import { VeliLoginComponent } from './veli-login/veli-login.component';
import { OgretmenProfileComponent } from './ogretmen-profile/ogretmen-profile.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DersProgramiComponent } from './ders-programi/ders-programi.component';
import { OgrenciListePipe } from './ogrenci-liste/ogrenci-liste.pipe';
import { NgToastModule } from 'ng-angular-popup'
import { TokenInterceptor } from './interceptors/token.interceptor';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { LessonRegisterComponent } from './lesson-register/lesson-register.component';
import { VeliProfileComponent } from './veli-profile/veli-profile.component';
import { TeacherFilterPipe } from './okul-lider/teacher-filter.pipe';
// import { TeachertokenInterceptor } from './interceptors/teachertoken.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    VeliKayitComponent,
    OgrenciGirisComponent,
    OgretmenKayitComponent,
    OgrenciListeComponent,
    OkulLiderComponent,
    LiderkayitComponent,
    LiderOgretmenComponent,
    OgrenciFilterPipe,
    OgretmenFilterPipe,  
    HomeComponent, LiderloginComponent, OgretmenLoginComponent, VeliLoginComponent, OgretmenProfileComponent, DersProgramiComponent, OgrenciListePipe, StudentProfileComponent, StudentRegisterComponent, LessonRegisterComponent, VeliProfileComponent, TeacherFilterPipe, 
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NzButtonModule,
    NgToastModule,
  
  ],
  providers: [HttpClientModule,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,    
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
