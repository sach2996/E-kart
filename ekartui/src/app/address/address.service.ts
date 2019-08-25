import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {throwError } from 'rxjs';
import { Address } from '../shared/Address';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdressService {
  errorMessage:String;

  constructor(private http:HttpClient, private router:Router) { }

  
  view(): Observable<any>{
    return this.http.get("http://localhost:1020/address");
  }

  modifyAddress(address:Address): Observable<any>{
    const header= new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post("http://localhost:1020/modifyAddress",address,{headers : header}).pipe
    (catchError(this.errorHandler));
  }
  
 addAddress(address:Address): Observable<any>{
  const header= new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  return this.http.post("http://localhost:1020/addAddress",address,{headers : header}).pipe
  (catchError(this.errorHandler));
}

delete(city): Observable<any>{
  return this.http.delete("http://localhost:1020/deleteAddress/"+city);
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
