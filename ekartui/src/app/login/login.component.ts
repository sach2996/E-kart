import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from "./login.service";
import { Users } from '../shared/Users';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted:boolean=false;
  errorMessage:String;
  successMessage: String;
  loginForm: FormGroup;
  users:Users;
  loggedIn:boolean=false;
  productInfoLoggedIn:boolean;
  //router:Router;
  constructor(private fb: FormBuilder, private loginService:LoginService, private router:Router ) { }

  ngOnInit() {
    this.loginForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
     
    })
  }
  
  login(){
    this.submitted=true;

    if(this.loginForm.invalid){
      return;
    }

    var objUsers=new Users();
    objUsers.email=this.loginForm.get('email').value;
    objUsers.password=this.loginForm.get('password').value;
    
    this.loginService.getData(objUsers)
    .subscribe
    (
      data=>{
      this.users=data;
      
      this.successMessage=(JSON.stringify(data.message)).replace(/\"/g,"");
      if(this.successMessage!=null){
        this.loggedIn=true;
        this.loginService.productInfoLoggedIn.next(true);
        this.loginService.isUserLoggedIn.next(true);
        localStorage.setItem('loginStatus','true');
      }
      this.router.navigate(["./"]);
      
      },
      error=>{
        this.errorMessage=error.replace(/\"/g,"");
      }
      )
      this.successMessage='';
      this.errorMessage='';
  }
  }

