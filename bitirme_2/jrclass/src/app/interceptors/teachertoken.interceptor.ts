// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { catchError, Observable, throwError } from 'rxjs';
// import { OgretmenpostService } from '../services/ogretmenpost.service ';
// import { Router } from '@angular/router';
// import { NgToastService } from 'ng-angular-popup';

// @Injectable()
// export class TeachertokenInterceptor implements HttpInterceptor {
//   constructor(
//     private service:OgretmenpostService,
//     private router:Router,
//     private toast:NgToastService
//   ) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const myToken2=this.service.getTokenTeacher();
//     if(myToken2){
//       request=request.clone({
//         setHeaders:{Authorization:`Bearer ${myToken2}`}
//       })        
//   }
//   return next.handle(request).pipe(
//     catchError((err:any)=>{
//       if(err instanceof HttpErrorResponse){
//         if(err.status===401){
//           this.toast.warning({detail:"Token GEÇERSİZ ÖĞRETMEN ",duration:5000,position:"top",type:"warning"});
//           this.router.navigate(["/ogretmen-login"]);
//         }
//       }
//       return throwError(()=>new Error("Bir Hata Oluştu"))
//     }
//     )
//   );
//   }
// }
