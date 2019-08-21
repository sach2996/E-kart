import { Component, OnInit } from '@angular/core';
import { Products } from "../shared/Products";
import { DealsService } from './deals.service';
import { DashboardService} from '../dashboard/dashboard.service';
import { Router } from "@angular/router";
import { Cart } from "../shared/Cart";
import {ProductInfoService } from "../product-info/product-info.service";
import { Wishlist } from '../shared/Wishlist';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {

  errorMessage: String;
  successMessage: String;
  loggedIn:String;
  constructor(private router:Router,private dealsService: DealsService, private dashboardService: DashboardService, private productinfoService: ProductInfoService) { }

  result: Products[];
  ngOnInit() {
    this.loggedIn=localStorage.getItem('loginStatus');
    this.dealsService.getDeals()
    .subscribe
    (
      data=>{
        this.result=data;
        for(var i=0;i<this.result.length;i++){
          
          //console.log("deliverycharge are ",this.result[i].price);
          this.result[i].amount=this.result[i].price-((this.result[i].price*this.result[i].discount)/100);
          //console.log("The discounted amount=",this.result[i].amount);
          
      }}
    );
    
    return this.result;
  };
  addToCart(product){
   // console.log("Resulted data" ,product);

    var objCart=new Cart();
    objCart.prodName=product.displayName;
    objCart.category=product.category;
    objCart.price=product.price;
    objCart.discount=product.discount;
    objCart.deliveryCharge=product.deliveryCharge;
    //console.log("Delivery Charge:",product.deliveryCharge);
    if(product.amount ==null){
      objCart.amount=0;
    }
    this.dashboardService.addCart(objCart)
    .subscribe
    (
      data=>{
        //product=data;
        this.successMessage=(JSON.stringify(data.message)).replace(/\"/g,"");
      },
      error=>{
       // console.log("Error");
        this.errorMessage=error.replace(/\"/g,"");
      }
      )
      this.successMessage='';
      this.errorMessage='';

}
addWishlist(product){
 // console.log("Resulted data" ,product);

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
    //  console.log("Error");
      this.errorMessage=error.replace(/\"/g,"");
    }
    )
    this.successMessage='';
    this.errorMessage='';

}
prodinfo(id){
  this.productinfoService.productInfo.next(id);
  this.router.navigate(['/productinfo']);

}
}