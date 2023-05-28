import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LiderServiceService } from '../services/lider-service.service';
import { NgToastService } from 'ng-angular-popup';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private service:LiderServiceService,
    private toast:NgToastService,
    private router:Router
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken=this.service.getToken();
    if(myToken){
      request=request.clone({
        setHeaders:{Authorization:`Bearer ${myToken}`}
      })
    }
    return next.handle(request).pipe(
    catchError((err:any)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status===401){
          this.toast.warning({detail:"Token Geçersiz ",duration:5000,position:"top",type:"warning"});        
        }
      }
      return throwError(()=>new Error("Bir Hata Oluştu"))
    })
    );
  }
}
