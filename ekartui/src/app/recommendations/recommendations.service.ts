import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {throwError } from 'rxjs';
import { Users } from '../shared/Users';
import { Products } from '../shared/Products';
import { Cart } from '../shared/Cart';

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
}
