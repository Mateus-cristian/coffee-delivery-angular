import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-card-coffee',
  templateUrl: './card-coffee.component.html',
  styleUrls: ['./card-coffee.component.scss'],
})
export class CardCoffeeComponent implements OnInit {
  faCartShopping = faCartShopping;

  @Input() coffee: IProduct = {} as IProduct;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const { price, ...coffee } = this.coffee;
    const priceFormatted = Number(price).toFixed(2);

    const coffeeWithPriceFormatted = { ...coffee, price: priceFormatted };
    this.coffee = coffeeWithPriceFormatted;
  }

  getImageURL(imagePath: string) {
    return this.sanitizer.bypassSecurityTrustUrl(imagePath);
  }
}
