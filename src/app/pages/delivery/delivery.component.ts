import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAddress } from 'src/app/interfaces/Product';
import { clearCart } from 'src/app/store/cart/cart.action';
import { IAppState } from 'src/app/store/cart/cart.model';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  AddressClient?: IAddress;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    // Adiciona o endereço que está guardado no localStorage
    const addressInLocalStorage = localStorage.getItem('@delivery');

    if (addressInLocalStorage) {
      this.AddressClient = JSON.parse(addressInLocalStorage);
    }

    this.store.dispatch(clearCart());
  }
}
