import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Products } from "../shared/Products";
import { DashboardService } from './dashboard.service';
import { Cart } from "../shared/Cart";
import { Wishlist } from '../shared/Wishlist';
import {ProductInfoService } from "../product-info/product-info.service";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() name:string;
  
  errorMessage:String;
  successMessage:String;
  displayName:string;
  loggedIn:String;
  listResult1: Products[];
  hideDeals:boolean=false;

  constructor(private router:Router,private dashboardService: DashboardService, private productinfoService: ProductInfoService) { }
  result: Products[];
  
  
  ngOnInit(){
    this.loggedIn=localStorage.getItem('loginStatus');
    this.dashboardService.view()
    .subscribe
    (
      data=>{ 
        console.log("Data",data);
        this.result=data;
        for(var i=0;i<this.result.length;i++){
          this.result[i].amount=this.result[i].price-((this.result[i].price*this.result[i].discount)/100);
          
        }
       
      }
    )
      console.log("In this.dashboardService", this.result)
    return this.result;
  };
  search(){
    //this.searchValue=(<HTMLInputElement>document.getElementById('searchBar')).value;
    if(this.displayName !=""){
     this.result=this.result.filter(res=>{
       return res.displayName.toLocaleLowerCase().match(this.displayName.toLocaleLowerCase());
     })
     if(this.result.length!=0){
       this.hideDeals=true;
     }
     
    }else if(this.displayName==""){
      this.hideDeals=false;
     this.ngOnInit();
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
  viewId(id){

    console.log("Id is:",id);
    this.productinfoService.viewId(id)
    .subscribe
    (
      data=>{
        console.log("Data Returned");
       this.listResult1=data;
        //this.successMessage=(JSON.stringify(data.bean)).replace(/\"/g,"")  ;
        //console.log(this.successMessage);
      },
      error=>{
        console.log(error)
        this.errorMessage=(JSON.stringify(error.message)).replace(/\"/g,"");
      }
    );
    return this.listResult1;
  }
}
