import { Component, OnInit } from '@angular/core';
import { IProduct, IProducts } from 'src/app/interfaces/Product';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  coffees: IProduct[] = [];

  baseApiUrl = environment.baseApiUrl;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((response) => {
      const data = response;

      this.coffees = data;
    });
  }
}
