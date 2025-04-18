import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ ReactiveFormsModule, NgIf ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  addProductForm: FormGroup;
  private readonly productService = inject(ProductService);
  productCreated = false;

  constructor(private formBuilder: FormBuilder) {
    this.addProductForm = this.formBuilder.group({
      skuCode: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if(this.addProductForm.valid) {
      const product: Product = {
        skuCode: this.addProductForm.get('skuCode')?.value,
        name: this.addProductForm.get('name')?.value,
        description: this.addProductForm.get('description')?.value,
        price: this.addProductForm.get('price')?.value
      };
      this.productService.createProduct(product).subscribe(product => {
        this.productCreated = true;
        this.addProductForm.reset();
      });
    } else {
      console.log('Form is not valid');
    }
  }

  get skuCode() {
    return this.addProductForm.get('skuCode');
  }

  get name() {
    return this.addProductForm.get('name');
  }

  get description() {
    return this.addProductForm.get('description');
  }

  get price() {
    return this.addProductForm.get('price');
  }
}
