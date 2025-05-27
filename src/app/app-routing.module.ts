import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from './components/products/products.component';
import {CustomersComponent} from './components/customers/customers.component';
import {LoginComponent} from './auth/login/login.component';

const routes: Routes = [
  {path: 'auth/login',component:LoginComponent},
  {path: '',component:LoginComponent},
  {path: 'products',component:ProductsComponent},
  {path: 'customers',component:CustomersComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
