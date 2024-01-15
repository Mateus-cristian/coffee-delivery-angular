import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct, IProducts } from 'src/app/interfaces/Product';
import { ProductsService } from 'src/app/services/products.service';
import { updatePageProducts } from 'src/app/store/cart/cart.action';
import { CartModel, IAppState } from 'src/app/store/cart/cart.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  coffees: IProduct[] = [];

  baseApiUrl = environment.baseApiUrl;

  cart$: Observable<CartModel>;

  constructor(
    private store: Store<IAppState>,
    private productsService: ProductsService
  ) {
    this.cart$ = this.store.select((state: IAppState) => state.cart);
  }

  ngOnInit(): void {
    localStorage.setItem('@delivery', '');

    this.cart$.subscribe((cart) => {
      if (cart.products.length > 0) {
        this.coffees = cart.products;
        return;
      }
    });

    if(this.coffees.length === 0){
      this.productsService.getProducts().subscribe((response) => {
        const data = response;
  
        this.coffees = data;
        this.store.dispatch(updatePageProducts({ products: data }));
      });
    }
  }

  updateCountToProduct(event: { product: IProduct; type: string }) {
    this.coffees = this.coffees.map((product) => {
      if (product.id === event.product.id) {
        let updateQuantity = 0;

        if (product.quantity === 0 && event.type === 'remove') {
          updateQuantity = 0;
        } else {
          updateQuantity =
            event.type === 'add' ? product.quantity + 1 : product.quantity - 1;
        }
        return { ...product, quantity: updateQuantity };
      }
      return product;
    });
  }
}
