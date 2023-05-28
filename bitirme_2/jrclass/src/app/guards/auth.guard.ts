import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LiderServiceService } from '../services/lider-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service:LiderServiceService,
    private router:Router,
    private toast:NgToastService
    ) { }
  canActivate():boolean{
    if(this.service.isLoggedIn()){
    return true
    }else{
      this.toast.error({detail:"Lütfen Giriş Yapınız",duration:5000,position:"top",type:"error"});
      this.router.navigate([""]);
      return false;
      
    }
  }
  
}
