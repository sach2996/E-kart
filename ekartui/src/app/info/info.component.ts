import { Component, OnInit } from '@angular/core';
import { InfoService } from "./info.service";
import { Users } from "../shared/Users";
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { StringifyOptions } from 'querystring';
import { Router } from '@angular/router'
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  changePswrd: boolean=true;
  

  constructor(private fb: FormBuilder,private infoService:InfoService, private router:Router) { }
  submitted:boolean=false;
  errorMessage:String;
  errorMsg:String;
  successMessage: String;
  users: Users[];
  updateForm: FormGroup;
  name:string;
  loggedIn:string;
  ngOnInit() {
    this.updateForm=this.fb.group({
     
      name:['',[Validators.required,validateName]],
      password:['',[Validators.required,validatePassword]],
      confirmPassword:['',[validatePassword]]
     
    });
    this.loggedIn=localStorage.getItem('loginStatus');
    if(this.loggedIn){
      this.infoService.getUser()
    .subscribe
    (
      data=>{
        this.name=data;
        
        
      }
    )
    return this.name;
    }
    else{
    this.router.navigate(['/login']);
    }
    
  }
  changePassword(){
    if(this.changePswrd==true){
    this.changePswrd=false;
  }
  else{
    this.changePswrd=true;
  }
}

  update(){
    this.submitted=true;
    if(this.updateForm.invalid){
      console.log(this.updateForm.get('name').value);
      
      this.errorMsg="All the fields are mandatory";  
      return this.errorMsg;
    }
    var objUsers=new Users();
    objUsers.name=this.updateForm.get('name').value;
    objUsers.password=this.updateForm.get('password').value;
    console.log("Object of users:",objUsers);
     
    this.infoService.updateData(objUsers)
    .subscribe
    (
      data=>{
      this.users=data;
      this.successMessage=(JSON.stringify(data.message)).replace(/\"/g,"");
      },
      error=>{
        this.errorMessage=error.replace(/\"/g,"");
      }
      )
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
function validatePassword(c: FormControl) {
  let passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,20}$/;

  return passwordRegex.test(c.value)?null:{
    pValid:{
      valid:false
    }
  };
}

