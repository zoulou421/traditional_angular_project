import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {IProduct} from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products!: Array<IProduct>;

  constructor() {
    this.products = [
      {id: 1, name: "computer", price: 150000, promotion: true},
      {id: 3, name: "Printer", price: 30000, promotion: false},
      {id: 4, name: "Telephone", price: 10000, promotion: true},
      {id: 5, name: "Headphone", price: 5000, promotion: false},
      {id: 6, name: "Mouse", price: 1000, promotion: true},
    ]
  }

  /*getProducts(): Array<any> {
    return this.products;
  }*/

  getProducts(): Observable<IProduct[]> { //IProduct[]is the same with:Array<IProduct>
    let rnd = Math.random();
    if (rnd < 0.5) return throwError(() => new Error("Connexion Error!"))
    else return of([...this.products]);//this.products
  }

  deleteProduct(id: number): Observable<boolean> {
    this.products = this.products.filter(product => product.id !== id);
    return of(true);
  }

  setProductPromotion(id: number): Observable<boolean> {
    let p = this.products.find(product => product.id == id);
    if (p != undefined) {
      p.promotion = !p.promotion;
      return of(true);
    } else return throwError(() => new Error("Product not found"));
  }

  public searchProducts(keyword: string): Observable<Array<IProduct>> { //Observable<IProduct[]>
    this.products = this.products.filter(product => product.name.toLowerCase().includes(keyword));
    return of(this.products);
  }
}
