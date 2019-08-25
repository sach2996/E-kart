import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Products } from "../shared/Products";
import { DashboardService } from './dashboard.service';
import { Cart } from "../shared/Cart";
import { Wishlist } from '../shared/Wishlist';
import {ProductInfoService } from "../product-info/product-info.service";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
//import { CookieService } from 'ngx-cookie-service';

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
  cart:Cart[];
  obj=[];
    
  constructor(private router:Router,private dashboardService: DashboardService, private productinfoService: ProductInfoService) { }
  result: Products[]=[];
  
  
  ngOnInit(){
    this.loggedIn=localStorage.getItem('loginStatus');
    this.dashboardService.view()
    .subscribe
    (
      data=>{ 
       //console.log("Data",data);
        this.result=data;
        //console.log("Result",this.result);
        for(var i=0;i<this.result.length;i++){
          this.result[i].amount=this.result[i].price-((this.result[i].price*this.result[i].discount)/100);
          
        }
       
      }
    )
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
   // console.log("Resulted data" ,product.amount);
   
    var objCart=new Cart();
    objCart.prodName=product.displayName;
    objCart.category=product.category;
    objCart.price=product.price;
    objCart.quantity=1;
    objCart.discount=product.discount;
    objCart.deliveryCharge=product.deliveryCharge;
    console.log("Object cart",objCart);
    if(this.obj.some(data=>data.prodName===objCart.prodName)){
      console.log("Product already exists");
      this.obj.map((data,i)=>{
        if(data.prodName== objCart.prodName && data.quantity<5){
          data.quantity=data.quantity+1;
        }
      })
    }else{
    this.obj.push(objCart);
    }
    if(!this.loggedIn){
      localStorage.setItem("Product",JSON.stringify(this.obj));
      
    }
    
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
        this.errorMessage=error.replace(/\"/g,"");
      }
      )
      this.successMessage='';
      this.errorMessage='';

  }
  addWishlist(product){
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
        this.successMessage=(JSON.stringify(data.message)).replace(/\"/g,"");
      },
      error=>{
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
    // console.log("Id is:",id);
    this.productinfoService.viewId(id)
    .subscribe
    (
      data=>{
       this.listResult1=data;
      },
      error=>{
        this.errorMessage=(JSON.stringify(error.message)).replace(/\"/g,"");
      }
    );
    return this.listResult1;
  }
}
