import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Orders } from '../shared/Orders';
import { OrdersService } from "./orders.service";
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  errorMessage:String;
  successMessage:String;
  result:Orders[];
  displayForm: boolean=false;
  ratingForm: FormGroup;

  constructor(private fb: FormBuilder,private router:Router,private ordersService:OrdersService) { }

  ngOnInit() {
    this.view();
    this.ratingForm=this.fb.group({
      rating:[''],
      review:[''],
     
    })
     
  }
  view(){
  this.ordersService.viewOrders()
    .subscribe(
      data=>{
        this.result=data;
      }
    )
    return this.result;
  
}
cancelOrder(prodName){
  this.ordersService.cancelOrder(prodName)
  .subscribe(
    data=>{
      
      this.successMessage=(JSON.stringify(data.message)).replace(/\"/g,"");
          this.view();
        },
        error=>{
           this.errorMessage=error.replace(/\"/g,"");
        }
    )
    this.successMessage='';
    this.errorMessage='';
  }

  returnOrder(prodName){
    this.ordersService.returnOrder(prodName)
    .subscribe(
      data=>{
        
        this.successMessage=(JSON.stringify(data.message)).replace(/\"/g,"");
            this.view();
          },
          error=>{
             this.errorMessage=error.replace(/\"/g,"");
          }
      )
      this.successMessage='';
      this.errorMessage='';
    }
    rate(){
      if(this.displayForm==true){
         this.displayForm=false;
      }
      else {
        this.displayForm=true;
      }
          
    }
    
    rateReview(prodName){
      //
      var objOrders=new Orders();
      objOrders.prodName=prodName;
    objOrders.rating=this.ratingForm.get('rating').value;
    objOrders.review=this.ratingForm.get('review').value;
    console.log("Prdouct object ",objOrders);
      this.ordersService.rateReview(objOrders)
      .subscribe(
        data=>{
          
          this.successMessage=(JSON.stringify(data.message)).replace(/\"/g,"");
              this.view();
            },
            error=>{
               this.errorMessage=error.replace(/\"/g,"");
            }
        )
        this.successMessage='';
        this.errorMessage='';
      }
}