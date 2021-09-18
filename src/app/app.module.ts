import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component'
import { ProductsListViewComponent } from './views/products-list-view/products-list-view.component'
import { ProductDetailViewComponent } from './views/product-detail-view/product-detail-view.component'
import { CartViewComponent } from './views/cart-view/cart-view.component'
import { OrderConfirmationViewComponent } from './views/order-confirmation-view/order-confirmation-view.component'
import { LoginViewComponent } from './views/login-view/login-view.component'
import { RegisterViewComponent } from './views/register-view/register-view.component'
import { NavigationComponent } from './components/navigation/navigation.component'
import { CookieService } from 'ngx-cookie-service'

import { StoreModule } from '@ngrx/store'
import { authReducer } from './store/auth/auth.reducer'
import { productsReducer } from './store/products/products.reducer'
import { userReducer } from './store/user/user.reducer'
import { cartReducer } from './store/cart/cart.reducer'
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component'
import { CartItemComponent } from './components/cart-item/cart-item.component'
import { SuccessOrderComponent } from './views/success-order/success-order.component'


@NgModule({
  declarations: [
    AppComponent,
    ProductsListViewComponent,
    ProductDetailViewComponent,
    CartViewComponent,
    OrderConfirmationViewComponent,
    LoginViewComponent,
    RegisterViewComponent,
    NavigationComponent,
    ProductListItemComponent,
    CartItemComponent,
    SuccessOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(
      { 
        authState: authReducer,
        productsState: productsReducer,
        userState: userReducer,
        cartState: cartReducer
      }
    )
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
