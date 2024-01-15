import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
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

  submitted = false;

  disabledButton = true;

  cartStore$: Observable<CartModel>;
  cartCheckout: IProduct[] = [];

  totalProducts: string = '0';
  totalProductsWithDelivery: string = '0';

  form: FormGroup = new FormGroup({
    cep: new FormControl('', [Validators.required]),
    rua: new FormControl('', [Validators.required]),
    bairro: new FormControl('', [Validators.required]),
    cidade: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    numero: new FormControl('', [Validators.required]),
    complemento: new FormControl('', [Validators.required]),
    methodPayment: new FormControl('', [Validators.required]),
  });

  constructor(
    private store: Store<IAppState>,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private router: Router
  ) {
    this.cartStore$ = this.store.select((state: IAppState) => state.cart);
  }

  ngOnInit(): void {
    this.cartStore$.subscribe((store) => {
      this.cartCheckout = store.cart;

      const total = store.total + 10;
      const formattedTotal = total.toFixed(2);
      const formattedTotalWithoutDelivery = store.total.toFixed(2);

      this.totalProductsWithDelivery = formattedTotalWithoutDelivery;
      this.totalProducts = formattedTotal;

      if (store.total > 0) {
        this.disabledButton = false;
      }
    });
  }

  // Função que busca o endereço pelo CEP
  getCepDetails(cep: string): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }

  onCepBlur() {
    const cepControl = this.form.get('cep');
    cepControl?.markAsTouched();
    const cep = cepControl?.value;

    if (cep.length !== 8) {
      this.form.patchValue({
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
      });
    } else {
      this.getCepDetails(cep).subscribe((data) => {
        this.form.patchValue({
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        });
      });
    }
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

  // Adiciona os erros aos campos
  get cepErrors() {
    const cepControl = this.form.get('cep');
    return (cepControl?.touched && cepControl?.errors) || {};
  }
  get ruaErrors() {
    const cepControl = this.form.get('rua');
    return (cepControl?.touched && cepControl?.errors) || {};
  }
  get bairroErrors() {
    const cepControl = this.form.get('bairro');
    return (cepControl?.touched && cepControl?.errors) || {};
  }
  get cidadeErrors() {
    const cepControl = this.form.get('cidade');
    return (cepControl?.touched && cepControl?.errors) || {};
  }
  get estadoErrors() {
    const cepControl = this.form.get('estado');
    return (cepControl?.touched && cepControl?.errors) || {};
  }
  get numeroErrors() {
    const cepControl = this.form.get('numero');
    return (cepControl?.touched && cepControl?.errors) || {};
  }

  get complementoErrors() {
    const cepControl = this.form.get('complemento');
    return (cepControl?.touched && cepControl?.errors) || {};
  }
  get methodPaymentErrors() {
    const cepControl = this.form.get('methodPayment');
    return (cepControl?.touched && cepControl?.errors) || {};
  }

  // --------

  submit() {
    this.form.markAllAsTouched();
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    // Se o formulário estiver completo guarda o mesmo no localStorage e vai para a página 
    const parseObj = JSON.stringify(this.form.value);
    localStorage.setItem('@delivery', parseObj);
    this.router.navigate(['delivery']);
  }
}
