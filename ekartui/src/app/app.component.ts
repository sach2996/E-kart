import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "./login/login.service";
import { SignupService } from "./signup/signup.service";
import { SearchService} from './search/search.service';
import { Observable } from '../../node_modules/rxjs';
import { DashboardService } from './dashboard/dashboard.service';
import { Products } from "./shared/Products";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ekartui';
  isUserLoggedIn: boolean;
  loggedIn:String;
  searchValue:String;
  result :Products[];
  displayName:string;
  constructor(private router: Router,private dashboardService: DashboardService, private loginService: LoginService){ 
    this.loggedIn=localStorage.getItem('loginStatus');
    this.loginService.isUserLoggedIn.subscribe(value=>{
      this.isUserLoggedIn=value;
    })
  };
  logout(){
    localStorage.removeItem('loginStatus');
    this.isUserLoggedIn=false;
    this.loginService.productInfoLoggedIn.next(false);
    console.log("logged out successfully");
    window.location.href;
    
  }
   ngOnInit(){
     this.loggedIn=localStorage.getItem('loginStatus');
 
}
}