import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Address } from '../shared/Address';
import { AdressService } from "./address.service";
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  errorMessage:String;
  successMessage:String;
  address:Address;
  addressForm: FormGroup;
  result: Address[];
  errorMsg: string;
  submitted: boolean;
  newAddress: boolean=false;
  updateAddress: boolean=false;
  constructor(private fb: FormBuilder,private router:Router, private addressService:AdressService) { }

  ngOnInit() {
    this.view();
    
    this.addressForm=this.fb.group({
      city:['',[Validators.required,validateCity]],
      pin:['',[Validators.required,validatePin]],
      phone:['',[Validators.required,validatePhone]],
      state:['',[Validators.required]]
      })
  }
  newAdd(){
    this.newAddress=true;
    this.view();
  }
  viewAdd(){
    this.newAddress=false;
    this.view();
    this.updateAddress=false;
  }
  modify(add){
    this.updateAddress=true;
   this.result=add;
  }
  
  addAddress(){
    this.submitted=true;

    if(this.addressForm.invalid){
      this.errorMessage="All the fields are mandatory"; 
      return this.errorMessage;
    }
    
     var objAdd=new Address();
     objAdd.city=this.addressForm.get('city').value;
     objAdd.pin=this.addressForm.get('pin').value;
     objAdd.phone=this.addressForm.get('phone').value;
     objAdd.state=this.addressForm.get('state').value;
     this.addressService.addAddress(objAdd)
     .subscribe
     (
       data=>{
         this.successMessage=(JSON.stringify(data.message)).replace(/\"/g,"");
         console.log("Address added",data);
         
       },
       error=>{
         this.errorMessage=error.replace(/\"/g,"");
       }
       )
       this.successMessage='';
       this.errorMessage='';
 
   }
    modifyAddress(){
   
    this.submitted=true;
    
     var objAdd=new Address();
     objAdd.city=this.addressForm.get('city').value;
     objAdd.pin=this.addressForm.get('pin').value;
     objAdd.phone=this.addressForm.get('phone').value;
     objAdd.state=this.addressForm.get('state').value;
     console.log("Calling modify service");
     
     this.addressService.modifyAddress(objAdd)
     .subscribe
     (
       data=>{
         this.successMessage=(JSON.stringify(data.message)).replace(/\"/g,"");
         console.log("Address added",data);
         
       },
       error=>{
         this.errorMessage=error.replace(/\"/g,"");
       }
       )
       this.successMessage='';
       this.errorMessage='';
    
}



  delete(city){
    this.addressService.delete(city)
    .subscribe
    (
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
  view(){
    this.addressService.view()
  .subscribe
  (
    data=>{
      this.result=data;
      }
  )
  return this.result;

  }

}

function validateCity(c: FormControl) {
 
  let cityRegex=/^([A-Za-z ]+)$/;

  return cityRegex.test(c.value)?null:{
    pValid:{
      valid:false
    }
  };
}

function validatePin(c: FormControl) {
 
  let pinRegex=/^([0-9]){6}$/;

  return pinRegex.test(c.value)?null:{
    pValid:{
      valid:false
    }
  };
} 
function validatePhone(c: FormControl) {
 
  let phoneRegex=/^([0-9]){10}$/;
  return phoneRegex.test(c.value)?null:{
    pValid:{
      valid:false
    }
  };
}
