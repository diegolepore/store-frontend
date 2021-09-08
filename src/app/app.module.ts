import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductsListViewComponent } from './products-list-view/products-list-view.component';
import { ProductDetailViewComponent } from './product-detail-view/product-detail-view.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { OrderConfirmationViewComponent } from './order-confirmation-view/order-confirmation-view.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { RegisterViewComponent } from './register-view/register-view.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListViewComponent,
    ProductDetailViewComponent,
    CartViewComponent,
    OrderConfirmationViewComponent,
    LoginViewComponent,
    RegisterViewComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
