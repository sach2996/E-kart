import { Component, OnInit } from '@angular/core';
import {ProductInfoService } from "./product-info.service";
import { DashboardService } from '../dashboard/dashboard.service';
import { Products } from '../shared/Products';
import { Router } from '@angular/router';
import {Cart } from "../shared/Cart";

import { LoginService } from '../login/login.service';
import { Wishlist } from '../shared/Wishlist';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  listResult1: Products[];
  errorMessage: string;
  successMessage: string;
  productInfo: string;
  loggedIn:String;
  productInfoLoggedIn:boolean;
  listResult2: any;
  constructor(private productinfoService: ProductInfoService,private dashboardService:DashboardService, private router:Router, private loginService: LoginService) {

    this.productinfoService.productInfo.subscribe(value=>{
      this.productInfo=value;
    })
    this.loginService.productInfoLoggedIn.subscribe(value=>{
      this.productInfoLoggedIn=value;
      console.log("Value of productInfoLoggedIn",this.productInfoLoggedIn);
    })
   }

  id:any;
  
  ngOnInit() {
    //this.loggedIn=localStorage.getItem('loginStatus');
    if(this.productInfo=="nourl"){
      this.router.navigate(['/dashboard']);
    }
    else{
      window.location.href;
    this.viewId(this.productInfo);
  }
}
  
addToCart(product){
  console.log("Resulted data" ,product.amount);

  var objCart=new Cart();
  objCart.prodName=product.displayName;
  objCart.category=product.category;
  objCart.price=product.price;
  objCart.discount=product.discount;
  objCart.deliveryCharge=product.deliveryCharge;
  
  if(product.amount ==null){
    objCart.amount=0;
  }
  console.log("Amount ",product.amount);
  
  this.dashboardService.addCart(objCart)
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
  viewId(id){

    console.log("Id is:",id);
    this.productinfoService.viewId(id)
    .subscribe
    (
      data=>{
        
        this.listResult1=[data];
        this.listResult2=data.reviews;
        console.log(" Reviews",this.listResult2);
        
        for(var i=0;i<this.listResult1.length;i++){
          this.listResult1[i].amount=this.listResult1[i].price-((this.listResult1[i].price*this.listResult1[i].discount)/100);
        }
      console.log(this.listResult1);
      
       },
      error=>{
        console.log(error)
        this.errorMessage=(JSON.stringify(error.message)).replace(/\"/g,"");
      }
    );
    return this.listResult1,this.listResult2;
  }
  addWishlist(product){
    console.log("Resulted data" ,product);

    var objWishlist=new Wishlist();
    objWishlist.prodName=product.displayName;
    objWishlist.category=product.category;
    objWishlist.price=product.price;
    objWishlist.discount=product.discount;
    objWishlist.deliveryCharge=product.deliveryCharge;
    
    this.dashboardService.addWishlist(objWishlist)
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
}
