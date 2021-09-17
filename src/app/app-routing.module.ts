import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListViewComponent } from './products-list-view/products-list-view.component'
import { ProductDetailViewComponent } from './product-detail-view/product-detail-view.component'
import { LoginViewComponent } from './login-view/login-view.component'
import { RegisterViewComponent } from './register-view/register-view.component'
import { CartViewComponent } from './cart-view/cart-view.component'
import { SuccessOrderComponent } from './success-order/success-order.component'
import { OrderConfirmationViewComponent } from './order-confirmation-view/order-confirmation-view.component'
import { AuthGuardService } from './services/routeGuards/auth/auth-guard.service'
import { CommonGuardService } from './services/routeGuards/common/common-guard.service'

const routes: Routes = [
  {
    path: '',
    component: ProductsListViewComponent,
    canActivate: [CommonGuardService]
  },
  {
    path: 'product/:id',
    component: ProductDetailViewComponent,
    canActivate: [CommonGuardService]
  },
  {
    path: 'login',
    component: LoginViewComponent,
    canActivate: [CommonGuardService]
  },
  {
    path: 'register',
    component: RegisterViewComponent,
    canActivate: [CommonGuardService]
  },
  {
    path: 'cart',
    component: CartViewComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'order-confirmation',
    component: OrderConfirmationViewComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'success-order',
    component: SuccessOrderComponent,
    canActivate : [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
