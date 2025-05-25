import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

 products!:Array<any>;

 ngOnInit():void{
   this.products =[
     {id:1,name:"computer",price:150000},
     {id:3,name:"Printer",price:30000},
     {id:4,name:"Telephone",price:10000},
     {id:5,name:"Headphone",price:5000},
     {id:6,name:"Mouse",price:1000},
   ]
 }

  handleDeleteProduct(product: any) {
    let index = this.products.indexOf(product);
    this.products.splice(index, 1);
  }
}
