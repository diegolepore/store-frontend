import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListViewComponent } from './products-list-view/products-list-view.component'
import { ProductDetailViewComponent } from './product-detail-view/product-detail-view.component'
import { LoginViewComponent } from './login-view/login-view.component'
import { RegisterViewComponent } from './register-view/register-view.component'
import { CartViewComponent } from './cart-view/cart-view.component'
import { OrderConfirmationViewComponent } from './order-confirmation-view/order-confirmation-view.component'

const routes: Routes = [
  {
    path: '',
    component: ProductsListViewComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailViewComponent
  },
  {
    path: 'login',
    component: LoginViewComponent
  },
  {
    path: 'register',
    component: RegisterViewComponent
  },
  {
    path: 'cart',
    component: CartViewComponent
  },
  {
    path: 'order-confirmation',
    component: OrderConfirmationViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
