import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
 products!:Array<any>;
 errorMessage!:string;

 constructor(private productsService:ProductsService) {
 }

 ngOnInit():void{
   this.productsService.getProducts().subscribe({
     next: (data) => {
       this.products=data;
     },
     error: (err) => {
       this.errorMessage=err;
     }
   })
 }

  handleDeleteProduct(product: any) {
    let index = this.products.indexOf(product);
    this.products.splice(index, 1);
  }
}
