import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {IProduct} from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products!:Array<IProduct>;
  constructor() {
    this.products =[
      {id:1,name:"computer",price:150000},
      {id:3,name:"Printer",price:30000},
      {id:4,name:"Telephone",price:10000},
      {id:5,name:"Headphone",price:5000},
      {id:6,name:"Mouse",price:1000},
    ]
  }

  /*getProducts(): Array<any> {
    return this.products;
  }*/

  getProducts(): Observable<IProduct[]> { //IProduct[]is the same with:Array<IProduct>
    let rnd=Math.random();
    if(rnd<0.5)return throwError(()=>new Error("Connexion Error!"))
    else return of(this.products);
  }
  deleteProduct(id: number): Observable<Boolean> {
    this.products = this.products.filter(product => product.id !== id);
    return of(true);
  }




}
