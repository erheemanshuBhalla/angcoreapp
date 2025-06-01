import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
@Component({
  selector: 'app-addproduct',
  standalone: false,
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent implements OnInit {
  productForm!: FormGroup;
  dropdownData: any[] = [];

  constructor(private fb: FormBuilder, private _productsservice: ProductsService) { }

  ngOnInit() {
   
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      tags: this.fb.array([]), // FormArray for tags
      inStock: [true],
      imageUrl: [''],
      additionalDetails: this.fb.group({ // Nested FormGroup
        manufacturer: [''],
        weight: [0]
      }),
      variants: this.fb.array([]) // FormArray for variants
    });

    this._productsservice.getCategories().subscribe(data => {


      this.dropdownData = data;
      console.log(this.dropdownData);
    });
  }

  get tagsArray() {
    return this.productForm.get('tags') as FormArray;
  }

  addTag() {
    this.tagsArray.push(new FormControl(''));
  }
  removeTag(index: number) {
    this.tagsArray.removeAt(index);
  }
  get variantsArray() {
    return this.productForm.get('variants') as FormArray;
  }

  createVariantFormGroup(): FormGroup {
    return this.fb.group({
      color: ['', Validators.required],
      size: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  addVariant() {
    this.variantsArray.push(this.createVariantFormGroup());
  }

  removeVariant(index: number) {
    this.variantsArray.removeAt(index);
  }
  
  onSubmit() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this._productsservice.saveProduct(this.productForm.value).subscribe(
        response => {
          console.log('POST request successful', response);
        },
        error => {
          console.error('Error during POST request', error);
        }
      );;
      // Handle form submission
    }
  }
}
