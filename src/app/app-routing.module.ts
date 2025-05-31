import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from './components/products/products.component';
import {CustomersComponent} from './components/customers/customers.component';
import {LoginComponent} from './auth/login/login.component';
import {AdminTemplateComponent} from './auth/admin-template/admin-template.component';
import {AuthenticationGuard} from './guards/authentication.guard';

const routes: Routes = [
  {path: 'login',component:LoginComponent},
  {path: '',component:LoginComponent},
  {path: 'admin',component:AdminTemplateComponent,canActivate:[AuthenticationGuard],
    children:[
      {path: 'products',component:ProductsComponent},
      {path: 'customers',component:CustomersComponent},
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
