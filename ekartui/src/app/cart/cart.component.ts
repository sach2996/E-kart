import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Cart } from '../shared/Cart';
import { CartService} from './cart.service';
import { viewClassName } from '@angular/compiler';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  errorMessage:String;
  successMessage:String;
  cart:Cart;
 
  constructor(private cartService: CartService,private router:Router) { 
    
   }
  result: Cart[];
  total:number=0;
  ngOnInit() {
    
    this.view();
    }
    home(){
      this.router.navigate(['/dashboard']);
    }
    decrement(product){
        this.cartService.modifyCart(product)
      .subscribe
      (
        data=>{
          console.log("In decrement :",product);
          this.cart=data;
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
    increment(product){
      console.log("In increment :",product);
      this.cartService.addCart(product)
      .subscribe
      (
        data=>{
          this.cart=data;
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

    delete(prodname){
      this.cartService.delete(prodname)
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
    view(){
      this.cartService.view()
    .subscribe
    (
      data=>{
        this.result=data;
        for(var i=0;i<(this.result).length;i++){
          console.log("result",data);
          this.total=this.total+this.result[i].amount;
       }
      }
    )
    return this.result,this.total;
  
    }
  }
