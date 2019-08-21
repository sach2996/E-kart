import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/Cart';
import { WishlistService} from './wishlist.service';
import { DashboardService} from '../dashboard/dashboard.service';
import { Router } from "@angular/router";
import {ProductInfoService } from "../product-info/product-info.service";
//import { runInThisContext } from 'vm';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  errorMessage:String;
  successMessage:String;
  cart: Cart;
  loggedIn:String;
  constructor(private productinfoService: ProductInfoService,private wishlistService:WishlistService ,private dashboardService: DashboardService, private router:Router) { }
  result:Cart[];

  
  ngOnInit() {
    this.loggedIn=localStorage.getItem('loginStatus');
    if(this.loggedIn){
      this.view();
    }
    else{
    this.router.navigate(['/login']);
    }
  }; 
  moveToCart(product){
    console.log("Resulted data" ,product);

    var objCart=new Cart();
    objCart.prodName=product.prodName;
    objCart.category=product.category;
    objCart.price=product.price;
    objCart.discount=product.discount;
    objCart.deliveryCharge=product.deliveryCharge;
    console.log("prodName ",objCart.prodName)
    this.wishlistService.addCart(objCart)
    .subscribe
    (
      data=>{
        //product=data;
        this.successMessage=(JSON.stringify(data.message)).replace(/\"/g,"");
      },
      error=>{
        console.log("Error");
        this.errorMessage=error.replace(/\"/g,"");
      }
      )
      this.successMessage='';
      this.errorMessage='';

  }
  continueShop(){
    this.router.navigate(['/dashboard']);
  }

  delete(prodname){
    this.wishlistService.delete(prodname)
    .subscribe
    (
      data=>{
        this.successMessage=(JSON.stringify(data.message)).replace(/\"/g,"");
        this.view();
      },
      error=>{
        console.log("Error");
        this.errorMessage=error.replace(/\"/g,"");
      }
      )
    this.successMessage='';
    this.errorMessage='';
  }
  prodinfo(id){
    console.log("in prod info ",id)
    this.productinfoService.productInfo.next(id);
    this.router.navigate(['/productinfo']);
  
  }
  view(){
    this.wishlistService.viewWishlist()
    .subscribe
    (
      data=>{
        this.result=data;
      }
    )
    return this.result;
  }

}
