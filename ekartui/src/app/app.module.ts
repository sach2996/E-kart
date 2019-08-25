import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from "@angular/common/http";
import { SignupService } from './signup/signup.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { DashboardService } from './dashboard/dashboard.service';
import { DealsComponent } from './deals/deals.component';
import { DealsService } from './deals/deals.service';
import { CartService } from './cart/cart.service';
import { SearchComponent } from './search/search.component';
import { SearchService } from './search/search.service';
import { WishlistComponent } from './wishlist/wishlist.component';
import { InfoComponent } from './info/info.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { AddressComponent } from './address/address.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';



@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    SignupComponent,
    DashboardComponent,
    LoginComponent,
    DealsComponent,
    SearchComponent,
    WishlistComponent,
    InfoComponent,
    ProductInfoComponent,
    AddressComponent,
    RecommendationsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,FormsModule, 
    NgbModule
  ],
  providers: [DashboardService, SignupService,LoginService, DealsService, CartService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
