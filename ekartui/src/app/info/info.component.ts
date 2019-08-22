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
  changePswrd: boolean=false;
  

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
     
      name:['empty',[Validators.required,validateName]],
      password:['Password@12',[Validators.required,validatePassword]],
      confirmPassword:['Password@12',[validatePassword]]
     
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
      console.log("value ",this.updateForm.get('password').value);
      
      this.errorMsg="All the fields are mandatory";  
      return this.errorMsg;
    }
    var objUsers=new Users();
    if(this.updateForm.get('name').value=="empty"){
        objUsers.name=this.name;
    }else{
          objUsers.name=this.updateForm.get('name').value;
          }
    if(this.updateForm.get('password').value=="Password@12"){
      objUsers.password=null;
    }
    else{
    objUsers.password=this.updateForm.get('password').value;
    }
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
      this.successMessage="";
      this.errorMessage="";
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

