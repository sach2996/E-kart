import { Component, OnInit } from '@angular/core';
import { Products } from "../shared/Products";
import { DealsService } from '../deals/deals.service';
import { DashboardService} from '../dashboard/dashboard.service';
import { Router } from "@angular/router";
import { Cart } from "../shared/Cart";
import {ProductInfoService } from "../product-info/product-info.service";
import { RecommendationsService } from "./recommendations.service";
import { Wishlist } from '../shared/Wishlist';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  errorMessage: String;
  successMessage: String;
  loggedIn:String;
  result: Products[];
  constructor(private recommendationsService:RecommendationsService,private router:Router,private dealsService: DealsService, private dashboardService: DashboardService, private productinfoService: ProductInfoService) { }

  ngOnInit() {
    // Product recommendations is dependent on orders module. I haven't implemented Order module.
    // For now We are just displaying products with price greater than 60000
    this.recommendationsService.recommendation()
    .subscribe
    (
      data=>{
        this.result=data;
        for(var i=0;i<this.result.length;i++){
          this.result[i].amount=this.result[i].price-((this.result[i].price*this.result[i].discount)/100);
          
        }}
        );
        
        return this.result;
      };

      addToCart(product){
        var objCart=new Cart();
        objCart.prodName=product.displayName;
        objCart.category=product.category;
        objCart.price=product.price;
        objCart.discount=product.discount;
        objCart.deliveryCharge=product.deliveryCharge;
        console.log("Delivery Charge:",product.deliveryCharge);
        if(product.amount ==null){
          objCart.amount=0;
        }
        this.dashboardService.addCart(objCart)
        .subscribe
        (
          data=>{
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
    prodinfo(id){
      this.productinfoService.productInfo.next(id);
      this.router.navigate(['/productinfo']);
    
    }
}
