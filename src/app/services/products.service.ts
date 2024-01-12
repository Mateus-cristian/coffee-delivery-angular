import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct, IProducts } from '../interfaces/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseApiUrl);
  }
}
