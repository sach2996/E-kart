import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { DealsComponent } from './deals/deals.component';
import { SearchComponent } from './search/search.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { InfoComponent } from './info/info.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { AddressComponent } from './address/address.component';



const routes: Routes = [
  {path: '', component: DashboardComponent  },
  {path: 'dashboard', component:DashboardComponent},
  {path: 'signup', component:SignupComponent} ,
  {path: 'login', component:LoginComponent} ,
  {path: 'cart', component:CartComponent} ,
  {path: 'deals', component:DealsComponent},
  {path: 'search',component:SearchComponent},
  {path: 'wishlist', component:WishlistComponent},
  {path: 'info', component:InfoComponent},
  {path: 'productinfo', component:ProductInfoComponent},
  {path: 'address', component:AddressComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
