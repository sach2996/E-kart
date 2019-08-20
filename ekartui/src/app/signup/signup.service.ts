import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {throwError } from 'rxjs';
import { Users } from '../shared/Users';


@Injectable()
export class SignupService {

  errorMessage: String;

  constructor(private http: HttpClient) { }

  getData(users:Users): Observable<any>{
    const header= new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post("http://localhost:1020/signup",users,{headers : header}).pipe
    (catchError(this.errorHandler));
   }
   errorHandler(error: HttpErrorResponse){
     console.error(error);
     if(error){
       try{
         this.errorMessage=JSON.stringify(error.error.message);
         //console.log(this.errorMessage);
       } catch (error) {
         this.errorMessage=error.statusText;
         //console.log(this.errorMessage);
       }
       return throwError(this.errorMessage || error || 'Server error');
     }
    return throwError(error.error|| error || "Server Error");
  }
 }
 