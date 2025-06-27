import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AddproductComponent } from './components/products/addproduct/addproduct.component';
import { EditproductComponent } from './components/products/editproduct/editproduct.component';
import { DetailsComponent } from './components/products/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegisterComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: 'home', component: HomeComponent},
  { path: 'products', component: ProductsComponent ,canActivate: [AuthGuard] },
  { path: 'products/add', component: AddproductComponent, canActivate: [AuthGuard] },
  { path: 'products/:id', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'products/edit/:id', component: EditproductComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  //{ path: 'items/delete/:id', component: ItemDetailsComponent }, // Delete an item (or use a separate component)
  /*{ path: 'Products', component: HomeComponent, canActivate: [AuthGuard] },*/
  { path: '**', redirectTo: '/user/login' } // Ensure this is the last route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
