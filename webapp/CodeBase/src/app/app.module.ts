import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
    import { CookieService } from 'ngx-cookie-service';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { PasswordPatternDirective } from './directives/password-pattern.directive';
import { ValidateUserNameDirective } from './directives/validate-user-name.directive';


import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



import { UserService } from './services/user.service';
import { AuthInterceptor } from './guards/auth.interceptor';
import { ProductsComponent } from './components/products/products.component';
import { AddproductComponent } from './components/products/addproduct/addproduct.component';
import { EditproductComponent } from './components/products/editproduct/editproduct.component';
import { DetailsComponent } from './components/products/details/details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './directives/table-sortable.directive';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SearchComponent } from './components/search/search.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NavbarComponent } from './components/Shared/navbar/navbar.component';
import { StoreComponent } from './components/store/store.component';
import { BestSellerComponent } from './components/home/best-seller/best-seller.component';
import { FeaturedProductsComponent } from './components/home/featured-products/featured-products.component';
import { ProductsSaleComponent } from './components/home/products-sale/products-sale.component';
import { CategoryCardsComponent } from './components/home/category-cards/category-cards.component';
import { CardComponent } from './components/card/card.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    
    RegisterComponent,
    
    
          AddproductComponent,
          EditproductComponent,
          DetailsComponent,
          SearchComponent,
    CartComponent,
    CheckoutComponent, NavbarComponent, StoreComponent, BestSellerComponent, FeaturedProductsComponent, ProductsSaleComponent, CategoryCardsComponent, CardComponent
          
          
    
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(), AutocompleteLibModule,
    BrowserModule, 
    AppRoutingModule, MatchPasswordDirective,
    PasswordPatternDirective,
    ValidateUserNameDirective,
    NgbdSortableHeader,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule,
    NgbModule,
    ProductsComponent,
    NgxSliderModule

  ],
  providers: [CookieService,UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }], 
  bootstrap: [AppComponent]
})
export class AppModule { }
