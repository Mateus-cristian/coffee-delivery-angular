import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  faMapMarkerAlt,
  faDollarSign,
  faCreditCard,
  faMoneyBillWave,
  faLandmark,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/Product';
import { removeProductCart, updateProductCart } from 'src/app/store/cart/cart.action';
import { CartModel, IAppState } from 'src/app/store/cart/cart.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  faMapMarkerAlt = faMapMarkerAlt;
  faDollarSign = faDollarSign;

  faCreditCard = faCreditCard;
  faLandmark = faLandmark;
  faMoneyBillWave = faMoneyBillWave;

  faTrashAlt = faTrashAlt;

  cartStore$: Observable<CartModel>;
  cartCheckout: IProduct[] = [];
  totalProducts: string = '0';

  constructor(
    private store: Store<IAppState>,
    private sanitizer: DomSanitizer
  ) {
    this.cartStore$ = this.store.select((state: IAppState) => state.cart);
  }

  ngOnInit(): void {
    this.cartStore$.subscribe((store) => {
      this.cartCheckout = store.cart;

      const formattedTotal = store.total.toFixed(2);
      this.totalProducts = formattedTotal;
    });
  }

  async removeItemToCheckout(product: IProduct) {
    this.store.dispatch(removeProductCart({ product }));
  }

  async addCountToItemCheckout(product: IProduct, method: 'add' | 'remove') {
    this.store.dispatch(updateProductCart({ product, method }));
  }

  getImageURL(imagePath: string) {
    return this.sanitizer.bypassSecurityTrustUrl(imagePath);
  }
}
