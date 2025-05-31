import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-new-product',
  standalone: false,
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
   productFormGroup!:FormGroup;

   constructor(private fb:FormBuilder,private productService:ProductsService) {
   }
    ngOnInit(): void {
      this.productFormGroup = this.fb.group({
        //name: ['', [Validators.required, Validators.minLength(4)]]
        name:this.fb.control(null, [Validators.required, Validators.minLength(4)]),
        price:this.fb.control(null, [Validators.required,Validators.minLength(4)]),
        promotion:this.fb.control(false, [Validators.required]),

      })
    }

  handleAddProduct() {
    //console.log(this.productFormGroup.value);
    let product =this.productFormGroup.value;
      this.productService.addNewProduct(product).subscribe({
      next:(data)=>{
        alert("Product Added Successfully!");
        this.productFormGroup.reset();
      },
      error:(data)=>{
        alert("Product Added Failed!");
      }
    });
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

}
