import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { OrderService } from '../services/order.service';
import { Order } from '../model/order';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    FormsModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly productService = inject(ProductService);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);
  isAuthenticated = false;
  products: Array<Product> = [];
  quantityIsNull = false;
  orderSuccess = false;
  orderFailed = false;

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;
        this.productService.getProducts().pipe().subscribe(product => {
          this.products = product;
        });
      }
    );
    console.log('isAuthenticated: ' + this.isAuthenticated);
  }

  goToCreateProductPage() {
    this.router.navigateByUrl('/add-product');
  }

  orderProduct(product: Product, quantity: string) {
    this.oidcSecurityService.userData$.subscribe(
      result => {
        const userDetails = {
          email: result.userData.email,
          firstName: result.userData.firstName,
          lastName: result.userData.lastName
        };

        if (!quantity) {
          this.orderFailed = true;
          this.orderSuccess = false;
          this.quantityIsNull = true;
        } else {
          const order: Order = {
            skuCode: product.skuCode,
            price: product.price,
            quantity: Number(quantity),
            userDetails: userDetails
          }
          this.orderFailed = false;
          this.orderSuccess = false;
          this.quantityIsNull = false;
          this.orderService.orderProduct(order).subscribe({
            next: () => {
              this.orderSuccess = true;
            }, error: () => {
              this.orderFailed = true;
            }
          })
        }
      }
    );
  }
}
