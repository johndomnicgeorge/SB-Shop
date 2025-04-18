import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { productApi } from '../config/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(productApi);
  }

  createProduct(product: Product): Observable<Array<Product>> {
    return this.httpClient.post<Array<Product>>(productApi, product);
  }
}
