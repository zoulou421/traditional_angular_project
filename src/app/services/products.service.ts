import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {IProduct} from '../models/iproduct';
import {UUID} from 'angular2-uuid';
import {IpageProduct} from '../models/ipage-product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products!: Array<IProduct>;
  private pageProducts!: IpageProduct;

  constructor() {
    this.products = [
      {id: UUID.UUID(), name: "computer", price: 150000, promotion: true},
      {id: UUID.UUID(), name: "Printer", price: 30000, promotion: false},
      {id: UUID.UUID(), name: "Telephone", price: 10000, promotion: true},
      {id: UUID.UUID(), name: "Headphone", price: 5000, promotion: false},
      {id: UUID.UUID(), name: "Mouse", price: 1000, promotion: true},
    ]
    for(let i=0;i<10;i++){
        this.products.push({id: UUID.UUID(), name: "computer", price: 150000, promotion: true});
        this.products.push({id: UUID.UUID(), name: "Printer", price: 30000, promotion: false});
        this.products.push({id: UUID.UUID(), name: "Telephone", price: 10000, promotion: true});
        this.products.push({id: UUID.UUID(), name: "Headphone", price: 5000, promotion: false});
        this.products.push({id: UUID.UUID(), name: "Mouse", price: 1000, promotion: true});
    }
  }


  /*getProducts(): Array<any> {
    return this.products;
  }*/

  getProducts(): Observable<IProduct[]> { //IProduct[]is the same with:Array<IProduct>
    let rnd = Math.random();
    if (rnd < 0.5) return throwError(() => new Error("Connexion Error!"))
    else return of([...this.products]);//this.products
  }

  //with pagination
  getPageProducts(page:number,size:number): Observable<IpageProduct> {
   let index=page*size;
   //let totalPages = Math.ceil(this.products.length/size);
   let totalPages = ~~(this.products.length/size);
   //if(this.products.length>0){}
    if(this.products.length % size!=0)
      totalPages++;
    let pageProducts=this.products.slice(index,index+size);
    return of({page:page,size:size,totalPages:totalPages,products:pageProducts});

  }

  deleteProduct(id: string): Observable<boolean> {
    this.products = this.products.filter(product => product.id !== id);
    return of(true);
  }

  setProductPromotion(id: string): Observable<boolean> {
    let p = this.products.find(product => product.id == id);
    if (p != undefined) {
      p.promotion = !p.promotion;
      return of(true);
    } else return throwError(() => new Error("Product not found"));
  }

 /* public searchProducts(keyword: string): Observable<IProduct[]> { //Array<IProduct>
    this.products = this.products.filter(product => product.name.toLowerCase().includes(keyword));
    return of(this.products);
  }*/
  public searchProducts(keyword: string,page:number,size:number): Observable<IpageProduct> { //Array<IProduct>
    let result=this.products.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()));
    let index=page*size;
    let totalPages = ~~(result.length/size);
    if(this.products.length % size!=0)
      totalPages++;
    let pageProducts=this.products.slice(index,index+size);
    return of({page:page,size:size,totalPages:totalPages,products:pageProducts});
  }

  public addNewProduct(product:IProduct):Observable<IProduct>{
    product.id=UUID.UUID();
    this.products.push(product);
    return of(product);
  }

  public getProductById(id:string):Observable<IProduct>{
    let p=this.products.find(product => product.id == id);
    if(p == undefined) return throwError(() => new Error("Product not found"));
    return of(p);
  }

  public updateProduct(product:IProduct):Observable<IProduct>{
    this.products=this.products.map(p=>(p.id==product.id)?product:p);
    return of(product);
  }

}
