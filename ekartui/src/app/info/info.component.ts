import { Component, OnInit } from '@angular/core';
import { InfoService } from "./info.service";
import { Users } from "../shared/Users";
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private fb: FormBuilder,private infoService:InfoService) { }
  submitted:boolean=false;
  errorMessage:String;
  successMessage: String;
  users: Users[];
  updateForm: FormGroup;
  userID:string;
  name:string="hu";

  ngOnInit() {
    this.updateForm=this.fb.group({
     
      name:['',[Validators.required,validateName]],
      password:['',[Validators.required,validatePassword]],
      confirmPassword:['',[Validators.required,validatePassword]]
     
    });

    this.infoService.getUser()
    .subscribe
    (
      data=>{
        console.log("returned data", data);
        this.name=data;
        
        
      }
    )
    return this.name;
  }
  
  update(){
    this.submitted=true;
    console.log("In update1");
    
    if(this.updateForm.invalid){
      return;
    }
    //console.log("In update2", this.updateForm.getRawValue().userId);
    var objUsers=new Users();
    //objUsers.userId=this.updateForm.get('userId').value;
    //console.log("User ID:::",objUsers.userId);
    
    
    objUsers.name=this.updateForm.get('name').value;
   // objUsers.email=this.updateForm.get('email').value;
    objUsers.password=this.updateForm.get('password').value;
   // objUsers.phone=parseInt(this.updateForm.get('phone').value);

    this.infoService.updateData(objUsers)
    .subscribe
    (
      data=>{
      this.users=data;
      console.log(this.users);
      this.successMessage=(JSON.stringify(data.message)).replace(/\"/g,"");
      console.log(this.successMessage);
      },
      error=>{
        console.log("Error");
        this.errorMessage=error.replace(/\"/g,"");
      }
      )
      //this.successMessage='';
      //this.errorMessage='';
  }

}

function validateName(c: FormControl) {
 
  let nameRegex=/^([A-Za-z ]+)$/;

  return nameRegex.test(c.value)?null:{
    fIdValid:{
      valid:false
    }
  };
}
/*
function validateEmail(c: FormControl) {
 
  let emailRegex=/^[a-zA-Z0-9.&*#$]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return emailRegex.test(c.value)?null:{
    eIdValid:{
      valid:false
    }
  };
} */
function validatePassword(c: FormControl) {
  if(c.value=="function validatePassword(c) {    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/;    return passwordRegex.test(c.value) ? null : {        pValid: {            valid: false        }    };}"){
    return false;
  }
  let passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/;

  return passwordRegex.test(c.value)?null:{
    pValid:{
      valid:false
    }
  };
}

function confirmPassword(c: FormControl) {
 
  //var password=(<HTMLInputElement>document.getElementById("password")).value;
  //var confirmPassword= ;
  if((<HTMLInputElement>document.getElementById("password")).value!=(<HTMLInputElement>document.getElementById("confirmPassword")).value){
    return false;}
    else{
      return true;
    }
    
  }

/*
function validatePhone(c: FormControl) {
 
  let phoneRegex=/^\d{10}$/;

  return phoneRegex.test(c.value)?null:{
    pValid:{
      valid:false
    }
  };
}*/
