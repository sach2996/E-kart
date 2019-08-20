import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {throwError } from 'rxjs';
import { Cart } from '../shared/Cart';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  errorMessage:String;

  constructor(private http:HttpClient, private router:Router) { }
  
  

  view(): Observable<any>{
    return this.http.get("http://localhost:1020/cart");
  }

  modifyCart(cart:Cart): Observable<any>{
    const header= new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post("http://localhost:1020/modifyCart",cart,{headers : header}).pipe
    (catchError(this.errorHandler));
  }
  
 addCart(cart:Cart): Observable<any>{
  const header= new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  return this.http.post("http://localhost:1020/addCart",cart,{headers : header}).pipe
  (catchError(this.errorHandler));
}

delete(prodName): Observable<any>{
  return this.http.delete("http://localhost:1020/delete/"+prodName);
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
