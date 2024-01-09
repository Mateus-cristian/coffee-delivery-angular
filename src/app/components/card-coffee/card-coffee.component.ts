import { Component, OnInit } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-coffee',
  templateUrl: './card-coffee.component.html',
  styleUrls: ['./card-coffee.component.scss'],
})
export class CardCoffeeComponent implements OnInit {
  faCartShopping = faCartShopping;

  constructor() {}

  ngOnInit(): void {}
}
