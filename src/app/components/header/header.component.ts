import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/Product';
import { CartModel, IAppState } from 'src/app/store/cart/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faCartShopping = faCartShopping;
  faTag = faTag;

  cart$: Observable<CartModel>;

  products: IProduct[] = [];

  constructor(private store: Store<IAppState>, private router: Router) {
    this.cart$ = this.store.select((state: IAppState) => state.cart);
  }

  ngOnInit(): void {
    this.cart$.subscribe((cart: CartModel) => {
      const products = cart.cart;

      this.products = products;
    });
  }

  navigateToCartCheckout(): void {
    this.router.navigate(['checkout']);
  }

  navigateToHome(): void {
    this.router.navigate(['']);
  }
}
