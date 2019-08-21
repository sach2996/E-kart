import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {throwError } from 'rxjs';
import { Users } from '../shared/Users';
import { Products } from '../shared/Products';
import { Cart } from '../shared/Cart';
import { Wishlist } from '../shared/Wishlist';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  errorMessage: String;

  constructor(private http: HttpClient) { }
  // Product recommendations is dependent on orders module. I haven't implemented Order module.
    // For now We are just displaying products with price greater than 60000
  recommendation(): Observable<any>{
    return this.http.get("http://localhost:1020/recommendations");
  }
  addCart(cart:Cart): Observable<any>{
   // console.log("Cart info",cart)
    const header= new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post("http://localhost:1020/addCart",cart,{headers : header}).pipe
    (catchError(this.errorHandler));
  }
  addWishlist(wishlist:Wishlist): Observable<any>{
    const header= new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post("http://localhost:1020/addWishlist",wishlist,{headers : header}).pipe
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
