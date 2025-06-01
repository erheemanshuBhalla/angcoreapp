import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    
    RegisterComponent,
    
    ProductsComponent,
          AddproductComponent,
          EditproductComponent,
          DetailsComponent
  ],
  imports: [
   
     BrowserModule,
    AppRoutingModule, MatchPasswordDirective,
    PasswordPatternDirective,
    ValidateUserNameDirective,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
