import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
@Component({
  selector: 'app-editproduct',
  standalone: false,
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.css'
})
export class EditproductComponent implements OnInit {
  itemId: number | null = null;
  ProductDetail: any = {}; // Initialize item object
  productForm!: FormGroup;
  dropdownData: any[] = [];

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private router: Router, private _productsservice: ProductsService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id:[''],
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

    this.itemId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.itemId) {
      this.fetchItemDetails(); // Fetch data based on ID
    }
  }
  fetchItemDetails(): void {

    this._productsservice.getProductDetails(this.itemId).subscribe((ProductDetail: any) => {
      
      //const formArray = this.productForm.get('tags') as FormArray;
      console.log(ProductDetail);
      this.productForm.patchValue(ProductDetail);

      if (ProductDetail.tags && ProductDetail.tags.length > 0) {
        //const itemForm: any[] = [];
        ProductDetail.tags.forEach((item: any) => {
          const newFormGroup = this.fb.group({
            tag:item.tag
          });
          this.tagsArray.push(newFormGroup);
        });
        console.log(this.tagsArray);
      }
      if (ProductDetail.variants && ProductDetail.variants.length > 0) {
        //const itemForm: any[] = [];
        ProductDetail.variants.forEach((item: any) => {
          const newFormGroup = this.fb.group({
            color: item.color,
            size: item.size,
            stock:item.stock
          });
          this.variantsArray.push(newFormGroup);
        });
        console.log(this.variantsArray);
      }

     
    });
    
  }
  UpdateProduct() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this._productsservice.updateProduct(this.itemId, this.productForm.value).subscribe(
        response => {
          console.log('Put request successful', response);
        },
        error => {
          console.error('Error during Put request', error);
        })
    }
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

    // Update item using this.item
    // Example: this.itemService.updateItem(this.item).subscribe(() => this.router.navigate(['/items']));
   // console.log('Item updated:', this.item);
    //this.router.navigate(['/items']);
  
}
