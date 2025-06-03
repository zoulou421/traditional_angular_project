import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IProduct} from '../../models/iproduct';
import {ProductsService} from '../../services/products.service';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-edit-product',
  standalone: false,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements  OnInit {
  productId!:string;
  product!:IProduct;
  editProductFormGroup!:FormGroup;
 constructor(private route:ActivatedRoute,private prodService:ProductsService,private fb:FormBuilder) {
   this.productId = route.snapshot.params['id'];
 }

  ngOnInit(): void {
   this.prodService.getProductById(this.productId).subscribe({
     next: (product:IProduct) => {
       this.product = product;
       //edit form
       this.editProductFormGroup = this.fb.group({
         //name: ['', [Validators.required, Validators.minLength(4)]]
         name:this.fb.control(this.product.name, [Validators.required, Validators.minLength(4)]),
         price:this.fb.control(this.product.price, [Validators.required,Validators.minLength(4)]),
         promotion:this.fb.control(this.product.promotion, [Validators.required]),

       });
     },
     error: (err:any) => {
       console.log(err);
     }
   })
  }

  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if (error['required']) {
      return fieldName + " is required";
    } else if (error['minlength']) {
      return fieldName + " should have at least " + error['minlength']['requiredLength'] + " characters!";
    } else if (error['min']) {
      return fieldName + " should be at least " + error['min']['min'];
    } else return "";
  }

  handleUpdateProduct() {
   let p=this.editProductFormGroup.value;
   p.id=this.product.id;
   this.prodService.updateProduct(p).subscribe({
     next: (product:IProduct) => {
       alert("Product updated successfully!");
     },
     error: (err:any) => {
       console.log(err);
     }
   });

  }
}
