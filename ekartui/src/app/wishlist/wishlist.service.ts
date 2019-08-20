import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {throwError } from 'rxjs';
import { Wishlist } from '../shared/Wishlist';
import { Cart } from '../shared/Cart';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  errorMessage:String;
  constructor(private http: HttpClient) { }

  viewWishlist(): Observable<any>{
return this.http.get("http://localhost:1020/viewWishlist");
  }
  addCart(cart:Cart): Observable<any>{
    const header= new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post("http://localhost:1020/addCart",cart,{headers : header}).pipe
    (catchError(this.errorHandler));
  }

delete(prodName): Observable<any>{
  return this.http.delete("http://localhost:1020/deleteWishlist/"+prodName);
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
