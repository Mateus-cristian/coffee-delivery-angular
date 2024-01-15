import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/cart/cart.reducer';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'delivery',
    component: DeliveryComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      cart: cartReducer,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
