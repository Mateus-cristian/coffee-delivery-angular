// card-coffee.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { IProduct } from 'src/app/interfaces/Product';
import { addProductToCart } from 'src/app/store/cart/cart.action';


import { CartModel } from 'src/app/store/cart/cart.model';

@Component({
  selector: 'app-card-coffee',
  templateUrl: './card-coffee.component.html',
  styleUrls: ['./card-coffee.component.scss'],
})
export class CardCoffeeComponent implements OnInit {
  faCartShopping = faCartShopping;

  @Input() coffee: IProduct = {} as IProduct;
  @Output() eventUpdateCountToProduct = new EventEmitter();

  constructor(
    private sanitizer: DomSanitizer,
    private store: Store<CartModel>
  ) {}

  ngOnInit(): void {
    const { price, ...coffee } = this.coffee;
    const priceFormatted = Number(price).toFixed(2);

    const coffeeWithPriceFormatted = { ...coffee, price: priceFormatted };
    this.coffee = coffeeWithPriceFormatted;
  }

  getImageURL(imagePath: string) {
    return this.sanitizer.bypassSecurityTrustUrl(imagePath);
  }

  async addCountToProduct(product: IProduct) {
    this.eventUpdateCountToProduct.emit({ product: product, type: 'add' });
  }

  async removeCountToProduct(product: IProduct) {
    this.eventUpdateCountToProduct.emit({ product: product, type: 'remove' });
  }

  async add(product: IProduct) {
    this.store.dispatch(addProductToCart({ product }));
  }
}
