import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {IProduct} from '../../models/iproduct';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
 products!:IProduct[];//equivalent to Array<IProduct>

  currentPage:number=0;
  pageSize:number=5;
  totalPages:number=0;

  currentAction:string="all";

 errorMessage!:string;
 searchedFormProduct!:FormGroup;

 constructor(private productsService:ProductsService,private fb:FormBuilder,
             public authService:AuthenticationService) {
 }

 ngOnInit():void{
   this.searchedFormProduct = this.fb.group({
     keyword:this.fb.control(null),
   })
   //this.handleGetAllProducts();
   this.handleGetPageProducts();
 }
  handleGetPageProducts():void{
    this.productsService.getPageProducts(this.currentPage,this.pageSize).subscribe({
      next: (data) => {
        this.products=data.products;
        this.totalPages=data.totalPages;
      },
      error: (err) => {
        this.errorMessage=err;
      }
    })
  }
 handleGetAllProducts():void{
   this.productsService.getProducts().subscribe({
     next: (data) => {
       this.products=data;
     },
     error: (err) => {
       this.errorMessage=err;
     }
   })
 }

 /* handleDeleteProduct(product: any) {
    let index = this.products.indexOf(product);
    this.products.splice(index, 1);
  }*/

  handleDeleteProduct(product: IProduct) {
    let conf=confirm('Are you sure you want to delete this product?');
    if(!conf) return;
    this.productsService.deleteProduct(product.id).subscribe({
      next: (data:Boolean) => {
        //this.handleGetAllProducts();
        let i=this.products.indexOf(product);
        //let index = this.products.findIndex(product => product.id == product.id);
        this.products.splice(i, 1);
      }
    })
  }

  handleSetPromotion(product: IProduct) {
    let promo=product.promotion;
    this.productsService.setProductPromotion(product.id).subscribe({
      next: (data) => {
        product.promotion=!promo;
      },
      error: (err) => {
        this.errorMessage=err;
      }
    })

  }

  /*handleSearchedFormProduct() {
    let keyword=this.searchedFormProduct.value.keyword;
    this.productsService.searchProducts(keyword).subscribe({
      next: (data) => {
        this.products=data;
      },
      error: (err) => {
        this.errorMessage=err;
      }
    })
  }*/
  handleSearchedFormProduct() {

    this.currentAction="search";
    this.currentPage=0;

    let keyword=this.searchedFormProduct.value.keyword;
    this.productsService.searchProducts(keyword,this.currentPage,this.pageSize).subscribe({
      next: (data) => {
        this.products=data.products;
        this.totalPages=data.totalPages;
      },
      error: (err) => {
        this.errorMessage=err;
      }
    })
  }

  gotoPage(i:number) {
    this.currentPage = i;
    if(this.currentAction == "all")
      this.handleGetPageProducts();
    else
      this.handleSearchedFormProduct();
  }
}
