import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {throwError } from 'rxjs';
import { Orders } from '../shared/Orders';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  errorMessage:String;

  constructor(private http:HttpClient, private router:Router) { }

  viewOrders(): Observable<any>{
    return this.http.get("http://localhost:1020/orders");
  }

  order(order:Orders): Observable<any>{
    const header= new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post("http://localhost:1020/order",order,{headers : header}).pipe
    (catchError(this.errorHandler));
  }
  cancelOrder(prodName): Observable<any>{
    console.log("PRod Name ",prodName);
    return this.http.get("http://localhost:1020/cancelOrder/"+prodName)
  }
  returnOrder(prodName): Observable<any>{
    return this.http.get("http://localhost:1020/returnOrder/"+prodName);
  }
  rateReview(order:Orders): Observable<any>{
    console.log("reviews ",order);
    
    const header= new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post("http://localhost:1020/rateReview",order,{headers : header}).pipe
    (catchError(this.errorHandler));
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
