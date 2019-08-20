import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {throwError } from 'rxjs';
import { Users } from '../shared/Users';
import { Router } from '@angular/router';
//import {  } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  errorMessage: String;

  constructor(private http: HttpClient, private router:Router) { }

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  public productInfoLoggedIn: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  


  getData(users:Users): Observable<any>{
    const header= new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post("http://localhost:1020/login",users,{headers : header}).pipe
    (
     catchError(this.errorHandler))
   }
   errorHandler(error: HttpErrorResponse){
     console.error(error);
     if(error){
       try{
         this.errorMessage=JSON.stringify(error.error.message);
         
       } catch (error) {
         this.errorMessage=error.statusText;
         
       }
       return throwError(this.errorMessage || error || 'Server error');
     }
    return throwError(error.error|| error || "Server Error");
  }
  


  
}
