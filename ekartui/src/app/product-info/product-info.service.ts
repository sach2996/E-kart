import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import {Cart } from "../shared/Cart";
import{Wishlist} from "../shared/Wishlist";
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductInfoService {
  errorMessage: string;

  constructor(private http: HttpClient) { }


  public productInfo: BehaviorSubject<string>=new BehaviorSubject<string>("nourl");

  viewId(id) : Observable<any>{
    console.log("View Service :",id);
    return this.http.get("http://localhost:1020/viewProduct/"+id);
  }
  addCart(cart:Cart): Observable<any>{
    console.log("Cart info",cart)
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
