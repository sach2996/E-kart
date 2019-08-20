import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {throwError } from 'rxjs';
import { Users } from '../shared/Users';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  errorMessage: string;

  constructor(private http: HttpClient) { }
  getUser(): Observable<any>{
    return this.http.get("http://localhost:1020/userInfo");
  }

  updateData(users:Users): Observable<any>{
    const header= new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post("http://localhost:1020/update",users,{headers : header}).pipe
    (catchError(this.errorHandler));
   }
   errorHandler(error: HttpErrorResponse){
     console.error(error);
     if(error){
       try{
         this.errorMessage=JSON.stringify(error.error.message);
         console.log("Try ",this.errorMessage);
       } catch (error) {
         this.errorMessage=error.statusText;
         console.log("Catch ",this.errorMessage);
       }
       return throwError(this.errorMessage || error || 'Server error');
     }
    return throwError(error.error|| error || "Server Error");
  }
}
