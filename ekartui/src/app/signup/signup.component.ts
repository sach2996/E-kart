import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { SignupService } from "./signup.service";
import { Users } from '../shared/Users';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService]
})
export class SignupComponent implements OnInit {

  submitted:boolean=false;
  errorMessage:String;
  successMessage: String;
  signupForm: FormGroup;
  users:Users;
  

  constructor(private fb: FormBuilder, private signupService:SignupService) { }

  ngOnInit() {
    this.signupForm=this.fb.group({
      userid:['',Validators.required],
      name:['',[Validators.required,validateName]],
      email:['',[Validators.required,validateEmail]],
      password:['',[Validators.required,validatePassword]],
      confirmPassword:['',[Validators.required]]
      //phone:['',[Validators.required,validatePhone]]
    })
  }

  signup(){
    this.submitted=true;

    if(this.signupForm.invalid){
      return;
    }
    var objUsers=new Users();
    objUsers.userId=this.signupForm.get('userid').value;
    objUsers.name=this.signupForm.get('name').value;
    objUsers.email=this.signupForm.get('email').value;
    objUsers.password=this.signupForm.get('password').value;
    
   // objUsers.phone=parseInt(this.signupForm.get('phone').value);

    this.signupService.getData(objUsers)
    .subscribe
    (
      data=>{
      this.users=data;
      this.successMessage=(JSON.stringify(data.message)).replace(/\"/g,"");
      console.log(this.successMessage);
      },
      error=>{
        console.log("Error");
        this.errorMessage=error.replace(/\"/g,"");
      }
      )
      this.successMessage='';
      this.errorMessage='';
  }

}
//let passValue:string;
function validateName(c: FormControl) {
 
  let nameRegex=/^([A-Za-z ]+)$/;

  return nameRegex.test(c.value)?null:{
    fIdValid:{
      valid:false
    }
  };
}

function validateEmail(c: FormControl) {
 
  let emailRegex=/^[a-zA-Z0-9.&*#$]+@[a-zA-Z0-9-]+\.([a-zA-Z])+$/;

  return emailRegex.test(c.value)?null:{
    eIdValid:{
      valid:false
    }
  };
} 
function validatePassword(c: FormControl) {
 
  let passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,20}$/;
  //console.log("Password ",c.value);
  let password=c.value;
  return passwordRegex.test(c.value)?null:{
    pValid:{
      valid:false
    }
  };
}

