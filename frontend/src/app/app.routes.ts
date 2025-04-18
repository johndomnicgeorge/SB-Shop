import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AddProductComponent } from './add-product/add-product.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'add-product', component: AddProductComponent}
];
